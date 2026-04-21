import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const PROMPT_EXTRACT = (text: string) => `
You are an advanced, precision-focused resume parser. 
TASK: Extract EVERY professional experience, educational milestone, and technical skill found in the text.

CRITICAL RULES:
1. NO TRUNCATION: If there are 10 jobs listed, you MUST return 10 objects in the experience array. Do not stop after the first page.
2. DATA INTEGRITY: Look for all sections (Experience, Work History, Employment, Education, Skills, Projects).
3. NO PLACEHOLDERS: NEVER use "No Information", "N/A", or "Unknown". If a field is actually missing from the text, return "" or [].
4. CLEANING: Remove artifact symbols like "@", "●", "•", or weird PDF characters.
5. Return ONLY a valid JSON object.

Example Output Structure (Ensure all jobs are captured):
{
  "experience": [
    { "company": "Co 1", "role": "Role 1", "period": "2020-2022", "bullets": ["...", "..."] },
    { "company": "Co 2", "role": "Role 2", "period": "2018-2020", "bullets": ["...", "..."] }
  ]
}

Raw Text Content:
${text}
`;

const PROMPT_POLISH = (text: string) => `
STRICT SYSTEM COMMAND: Return ONLY the polished version of the user's text. 
DO NOT speak to the user. DO NOT say "Here is the result". DO NOT use quotes.
ACT AS an expert resume writer. Improve the following:

"${text}"
`;

const PROMPT_COMPACT = (content: string) => `
STRICT SYSTEM COMMAND: Return ONLY the condensed JSON. 
ACT AS an expert resume editor. 
TASK: Condense the bullet points of this experience data to fit a single page.
RULES:
1. Keep ALL companies and dates.
2. Make every bullet point exactly 1 sentence long and extremely concise.
3. Return the data as a valid JSON array of experiences.

Data to condense:
${content}
`;

const PROMPT_TIPS = (content: string) => `
You are a career strategist. 
TASK: Analyze this resume and provide 3-4 ultra-concise, high-impact tips for improvement.
Focus on: quantifying results, skill gaps, or formatting impact.
RULES:
1. Return ONLY a JSON array of strings: ["Tip 1", "Tip 2", ...]
2. Keep tips under 15 words each.

Resume Data:
${content}
`;

const PROMPT_ATS = (content: string) => `
You are an expert Applicant Tracking System (ATS) auditor. 
TASK: Analyze the resume for ATS compatibility and recruiter impact.
DATA: ${content}

RULES:
1. Return ONLY a valid JSON object.
2. Provide a score (0-100) for overall impact.
3. Provide breakdown for Keywords, Impact, and Formatting.
4. Provide a list of strictly actionable improvements.

Output Structure:
{
  "score": 85,
  "categories": [
    { "name": "Keywords", "score": 90 },
    { "name": "Impact", "score": 75 },
    { "name": "Formatting", "score": 95 }
  ],
  "improvements": ["Add more quantified achievements", "Ensure contact info is at the top", "Use standard section headers"]
}
`;

function cleanData(data: any): any {
  if (typeof data === "string") {
    return data.replace(/@/g, "").trim();
  }
  if (Array.isArray(data)) {
    return data.map(cleanData);
  }
  if (typeof data === "object" && data !== null) {
    const cleaned: any = {};
    for (const key in data) {
      cleaned[key] = cleanData(data[key]);
    }
    return cleaned;
  }
  return data;
}

export async function POST(req: Request) {
  try {
    const { task, content } = await req.json();
    const provider = process.env.AI_PROVIDER || "OLLAMA";
    
    console.log(`[AI API] Task: ${task}, Provider: ${provider}, Input Length: ${content?.length || 0}`);

    let resultText = "";

    if (provider === "GEMINI") {
      const modelName = process.env.GEMINI_MODEL || "gemini-2.0-flash";
      console.log(`[AI API] Using Gemini Model: ${modelName}`);
      
      const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
      const model = genAI.getGenerativeModel({ model: modelName });
      
      let prompt = "";
      if (task === "EXTRACT") prompt = PROMPT_EXTRACT(content);
      else if (task === "COMPACT") prompt = PROMPT_COMPACT(content);
      else if (task === "TIPS") prompt = PROMPT_TIPS(content);
      else if (task === "ATS_SCAN") prompt = PROMPT_ATS(content);
      else prompt = PROMPT_POLISH(content);
      
      try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        resultText = response.text();
        console.log(`[AI API] Raw Response Length: ${resultText.length}`);
      } catch (err: any) {
        console.error("Gemini Execution Error:", err);
        throw new Error(`Gemini failed: ${err.message}. Try changing GEMINI_MODEL in .env (e.g., gemini-2.0-flash, gemini-1.5-pro, gemini-2.0-flash-lite-preview-02-05)`);
      }
    } else {
      // OLLAMA Logic (same as before)
      const defaultModel = process.env.OLLAMA_MODEL || "llama3.1:latest";
      const polishModel = process.env.OLLAMA_POLISH_MODEL || defaultModel;
      const modelToUse = task === "EXTRACT" ? defaultModel : polishModel;

      console.log(`[AI API] Using Ollama Model: ${modelToUse}`);
      
      let prompt = "";
      if (task === "EXTRACT") prompt = PROMPT_EXTRACT(content);
      else if (task === "COMPACT") prompt = PROMPT_COMPACT(content);
      else if (task === "ATS_SCAN") prompt = PROMPT_ATS(content);
      else prompt = PROMPT_POLISH(content);

      const response = await fetch(`${process.env.OLLAMA_BASE_URL}/api/generate`, {
        method: "POST",
        body: JSON.stringify({
          model: modelToUse,
          prompt: prompt,
          stream: false
        })
      });
      const data = await response.json();
      resultText = data.response;
      console.log(`[AI API] Raw Response Length: ${resultText.length}`);
    }

    if (task === "EXTRACT" || task === "COMPACT" || task === "TIPS" || task === "ATS_SCAN") {
      console.log(`[AI API] Attempting to parse JSON from response...`);
      // Extract JSON block from markdown response if LLM returns it wrapped in ```json
      const jsonMatch = resultText.match(/\{[\s\S]*\}|\[[\s\S]*\]/);
      if (!jsonMatch) {
         console.error("[AI API] No JSON found in response!");
         console.log("[AI API] Full response text:", resultText);
         return NextResponse.json({ error: "No JSON found in response" }, { status: 500 });
      }
      
      try {
        const extractedJson = JSON.parse(jsonMatch[0]);
        const cleaned = cleanData(extractedJson);
        console.log(`[AI API] Successfully extracted ${cleaned.experience?.length || 0} experiences and ${cleaned.education?.length || 0} education entries.`);
        return NextResponse.json(cleaned);
      } catch (e) {
        console.error("[AI API] JSON Parse Error:", e);
        console.log("[AI API] Target string for parsing:", jsonMatch[0]);
        return NextResponse.json({ error: "Failed to parse AI response" }, { status: 500 });
      }
    }

    // Task: POLISH cleanup
    let finalPolish = resultText.trim();
    
    // Split into lines to filter out "AI thoughts" or "Intros"
    const lines = finalPolish.split('\n');
    let cleanestLine = "";
    
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed) continue;
      
      // Skip lines that look like AI self-introductions or metadata
      const isIntro = /^(here is|sure|i have|this is|alright|re-written|polished|improved|output|revised|version|bullet)/i.test(trimmed);
      const hasLength = trimmed.length > 5;
      const isJustQuotes = /^["'].*["']$/.test(trimmed);
      
      if (!isIntro && hasLength) {
        cleanestLine = trimmed.replace(/^["']|["']$/g, "").trim(); // Remove wrapping quotes
        break; 
      }
    }

    // Fallback if our line-filter was too aggressive
    if (!cleanestLine) cleanestLine = finalPolish.replace(/^["']|["']$/g, "").trim();
    
    return NextResponse.json({ result: cleanestLine });
  } catch (error: any) {
    console.error("AI API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
