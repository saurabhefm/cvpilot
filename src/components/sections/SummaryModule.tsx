"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, Target, Zap, ArrowRight, Loader2, Check } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";

const SummaryModule = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [highlights, setHighlights] = useState("");
  const [jdContext, setJdContext] = useState("");
  const [variants, setVariants] = useState<string[]>([]);
  const [hasStoredResume, setHasStoredResume] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = sessionStorage.getItem("pending_resume");
      if (stored) setHasStoredResume(true);
    }
  }, []);

  const generateSummary = async () => {
    if (!highlights && !hasStoredResume && !jdContext) {
      alert("Please provide some career highlights or a job URL to get started!");
      return;
    }
    
    setIsGenerating(true);
    try {
      const storedResume = sessionStorage.getItem("pending_resume");
      const effectiveHighlights = highlights || (hasStoredResume ? "USE_STORED_RESUME" : "");

      const response = await fetch("/api/ai", {
        method: "POST",
        body: JSON.stringify({ 
          task: "SUMMARY_GEN", 
          content: JSON.stringify({ 
            highlights: effectiveHighlights === "USE_STORED_RESUME" ? storedResume : highlights, 
            context: jdContext 
          }) 
        })
      });
      
      const data = await response.json();
      if (Array.isArray(data)) {
        setVariants(data);
      } else if (data.error) {
        throw new Error(data.error);
      }
    } catch (err) {
      console.error("Summary generation failed:", err);
      alert("Failed to generate summary. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <section className="py-24 bg-white" id="summary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          
          <div className="lg:w-1/2">
            <div className="w-16 h-16 bg-brand-mint/10 rounded-2xl flex items-center justify-center text-brand-mint mb-8">
               <Sparkles className="w-8 h-8" />
            </div>
            <h2 className="text-4xl font-extrabold text-[#0F172A] mb-6">
              Recruiter-Focused <br />
              <span className="text-brand-mint">AI Summary Generator</span>
            </h2>
            <p className="text-slate-500 text-lg mb-8 leading-relaxed italic">
              Stop struggling with "About Me" sections. CVPilot analyzes your career highlights and the target role to craft a punchy, 3-sentence summary that grabs attention in <span className="font-bold text-[#0F172A]">under 6 seconds.</span>
            </p>
            
            <div className="space-y-6 mb-12">
              <div className="flex gap-4">
                <Target className="w-6 h-6 text-brand-mint flex-shrink-0" />
                <div>
                  <p className="font-bold text-[#0F172A]">Industry Keywords</p>
                  <p className="text-slate-500 text-sm italic">Naturally baked into every sentence.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Zap className="w-6 h-6 text-brand-mint flex-shrink-0" />
                <div>
                  <p className="font-bold text-[#0F172A]">Action-Oriented Tone</p>
                  <p className="text-slate-500 text-sm italic">Focused on outcomes and quantifiable results.</p>
                </div>
              </div>
            </div>

            <div className="p-8 bg-slate-50 border border-slate-200 rounded-[32px] space-y-6 shadow-sm">
               <div className="space-y-4">
                 <div className="space-y-2">
                   <div className="flex items-center justify-between">
                     <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Career Context</label>
                     {hasStoredResume && (
                       <span className="flex items-center gap-1 text-[10px] font-bold text-brand-mint bg-brand-mint/10 px-2 py-0.5 rounded-full animate-pulse">
                         <Check className="w-2.5 h-2.5" /> Smart Sync Active
                       </span>
                     )}
                   </div>
                   <textarea 
                    value={highlights}
                    onChange={(e) => setHighlights(e.target.value)}
                    placeholder={hasStoredResume ? "Optional: Add specific focus points or leave empty to use your uploaded resume..." : "e.g. 8+ years in Digital Marketing, managed $2M budget, scaled ROAS by 40%..."}
                    className="w-full h-32 p-4 bg-white border border-slate-200 rounded-2xl text-sm focus:ring-2 focus:ring-brand-mint outline-none transition-all placeholder:text-slate-300"
                   />
                 </div>
                 <div className="space-y-2">
                   <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Target Job (Text or URL)</label>
                   <input 
                    type="text"
                    value={jdContext}
                    onChange={(e) => setJdContext(e.target.value)}
                    placeholder="e.g. Senior Marketing Manager position at Google..."
                    className="w-full h-12 px-4 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-mint outline-none transition-all placeholder:text-slate-300"
                   />
                 </div>
               </div>

               <Button 
                variant="primary" 
                className="w-full justify-between h-14 rounded-2xl"
                onClick={generateSummary}
                disabled={isGenerating}
               >
                 {isGenerating ? (
                   <>Crafting Your Message... <Loader2 className="w-5 h-5 animate-spin" /></>
                 ) : (
                   <>Generate My Pro Summary <ArrowRight className="w-5 h-5" /></>
                 )}
               </Button>
            </div>
          </div>

          {/* Visual Showcase */}
          <div className="lg:w-1/2 w-full lg:sticky lg:top-32">
            <div className="bg-brand-charcoal rounded-[40px] p-12 shadow-2xl relative overflow-hidden min-h-[500px]">
               <div className="absolute top-0 right-0 w-32 h-32 bg-brand-mint/10 blur-3xl rounded-full" />
               
               <p className="text-white/40 text-xs font-bold uppercase tracking-[0.2em] mb-8">Dynamic Output Preview</p>
               
               <div className="space-y-6">
                 {variants.length > 0 ? (
                   variants.map((v, idx) => (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className={`p-6 border-l-4 rounded-r-2xl ${idx === 0 ? 'bg-brand-mint border-white' : 'bg-white/5 border-brand-mint'}`}
                    >
                      <p className={`text-sm italic font-medium leading-relaxed ${idx === 0 ? 'text-brand-charcoal' : 'text-white'}`}>
                        "{v}"
                      </p>
                    </motion.div>
                   ))
                 ) : (
                   <div className="space-y-6 flex flex-col items-center justify-center h-full pt-12">
                     <div className="w-20 h-20 bg-white/5 border border-dashed border-white/10 rounded-full flex items-center justify-center text-white/5 mb-4">
                        <Sparkles className="w-10 h-10" />
                     </div>
                     <p className="text-white/20 text-center text-sm italic max-w-[200px]">
                       Enter your highlights to see AI-crafted summaries here.
                     </p>
                     <div className="w-full space-y-4">
                        <div className="h-12 bg-white/5 rounded-xl animate-pulse" />
                        <div className="h-12 bg-white/5 rounded-xl animate-pulse opacity-50" />
                     </div>
                   </div>
                 )}
               </div>

               <div className="mt-12 pt-8 border-t border-white/10 flex justify-between items-center">
                 <span className="text-white/20 text-[10px] font-black uppercase tracking-widest">Generated by CVPilot v2.0</span>
                 <div className="flex gap-1">
                   {[1,2,3,4,5].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full bg-brand-mint" />)}
                 </div>
               </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default SummaryModule;
