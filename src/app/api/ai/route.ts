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

async function fetchJobContent(url: string) {
  try {
    const response = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36" }
    });
    const html = await response.text();
    // Basic HTML stripping
    return html.replace(/<[^>]*>?/gm, " ").replace(/\s+/g, " ").trim().substring(0, 5000);
  } catch (err) {
    console.error("Scraping failed:", err);
    return url; // Fallback to raw URL if fetch fails
  }
}

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

const PROMPT_SUMMARY = (content: string) => {
  const data = JSON.parse(content);
  return `
You are a world-class executive resume writer. 
TASK: Generate 3 distinct, high-impact professional summaries based on the following context.

CAREER HIGHLIGHTS: ${data.highlights}
TARGET JOB DETAILS: ${data.context}

RULES:
1. Return ONLY a valid JSON array of strings: ["Summary 1", "Summary 2", "Summary 3"]
2. Summaries must be exactly 3 sentences long.
3. Use a different "hook" for each: 
   - Variant 1: Focused on Years of Experience & Core Expertise.
   - Variant 2: Focused on a major Quantifiable Achievement.
   - Variant 3: Focused on unique "Soft Power" or Leadership qualities.
4. Keep tone professional, energetic, and ATS-optimized.
`;
};

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

    let processedContent = content;
    if (task === "SUMMARY_GEN") {
      try {
        const data = JSON.parse(content);
        // Detect if context is a URL
        const urlRegex = /^(https?:\/\/[^\s]+)$/;
        if (data.context && urlRegex.test(data.context.trim())) {
          console.log(`[AI API] Detected URL in summary context, scraping...`);
          const scraped = await fetchJobContent(data.context.trim());
          processedContent = JSON.stringify({ ...data, context: scraped });
        }
      } catch (e) {
        console.error("Failed to parse summary content for URL detection", e);
      }
    }

    let resultText = "";

    if (provider === "GEMINI") {
      const modelName = process.env.GEMINI_MODEL || "gemini-2.0-flash";
      console.log(`[AI API] Using Gemini Model: ${modelName}`);
      
      const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
      const model = genAI.getGenerativeModel({ model: modelName });
      
      let prompt = "";
      if (task === "EXTRACT") prompt = PROMPT_EXTRACT(processedContent);
      else if (task === "COMPACT") prompt = PROMPT_COMPACT(processedContent);
      else if (task === "TIPS") prompt = PROMPT_TIPS(processedContent);
      else if (task === "ATS_SCAN") prompt = PROMPT_ATS(processedContent);
      else if (task === "SUMMARY_GEN") prompt = PROMPT_SUMMARY(processedContent);
      else prompt = PROMPT_POLISH(processedContent);
      
      console.log(`\n--- PROMPT START ---\n${prompt}\n--- PROMPT END ---\n`);
      
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
      if (task === "EXTRACT") prompt = PROMPT_EXTRACT(processedContent);
      else if (task === "COMPACT") prompt = PROMPT_COMPACT(processedContent);
      else if (task === "ATS_SCAN") prompt = PROMPT_ATS(processedContent);
      else if (task === "SUMMARY_GEN") prompt = PROMPT_SUMMARY(processedContent);
      else prompt = PROMPT_POLISH(processedContent);

      console.log(`\n--- OLLAMA PROMPT START ---\n${prompt}\n--- OLLAMA PROMPT END ---\n`);

      const response = await fetch(`${process.env.OLLAMA_BASE_URL}/api/generate`, {
        method: "POST",
        body: JSON.stringify({
          model: modelToUse,
          prompt: prompt,
          stream: true
        })
      });

      if (!response.body) throw new Error("No response body from Ollama");
      
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      
      process.stdout.write(`[AI API] Ollama Generating: `);
      
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n");
        
        for (const line of lines) {
          if (!line.trim()) continue;
          try {
            const json = JSON.parse(line);
            if (json.response) {
              resultText += json.response;
              process.stdout.write(json.response);
            }
            if (json.done) break;
          } catch (e) {
            // Partial JSON line
          }
        }
      }
      process.stdout.write("\n");
      console.log(`[AI API] Raw Response Length: ${resultText.length}`);
    }

    if (task === "EXTRACT" || task === "COMPACT" || task === "TIPS" || task === "ATS_SCAN" || task === "SUMMARY_GEN") {
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
