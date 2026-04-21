"use client";

import React, { useState } from "react";
import { Sparkles, Target, Zap, ArrowRight, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";

const SummaryModule = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasSummary, setHasSummary] = useState(false);

  const generateSummary = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setHasSummary(true);
    }, 2000);
  };
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
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

            <div className="p-6 bg-slate-50 border border-slate-100 rounded-3xl">
               <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Start Here</p>
               <Button 
                variant="primary" 
                className="w-full justify-between h-14"
                onClick={generateSummary}
                disabled={isGenerating}
               >
                 {isGenerating ? (
                   <>Crafting... <Loader2 className="w-5 h-5 animate-spin" /></>
                 ) : (
                   <>Generate My Pro Summary <ArrowRight className="w-5 h-5" /></>
                 )}
               </Button>
            </div>
          </div>

          {/* Visual Showcase */}
          <div className="lg:w-1/2 w-full">
            <div className="bg-brand-charcoal rounded-[40px] p-12 shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-brand-mint/10 blur-3xl rounded-full" />
               
               <p className="text-white/40 text-xs font-bold uppercase tracking-[0.2em] mb-8">Dynamic Output Preview</p>
               
               <div className="space-y-6">
                 {hasSummary ? (
                   <>
                    <motion.div 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="p-4 bg-brand-mint border-l-4 border-white rounded-r-xl"
                    >
                      <p className="text-brand-charcoal font-bold italic">"Expert Marketing Strategist with 10+ years experience in multi-channel scaling..."</p>
                    </motion.div>
                    <motion.div 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                      className="p-4 bg-white/10 border-l-4 border-brand-mint rounded-r-xl"
                    >
                      <p className="text-white font-medium italic italic">"Proven record of driving 50% YoY growth for high-traffic SaaS products."</p>
                    </motion.div>
                   </>
                 ) : (
                   <>
                    <div className="h-16 bg-white/5 rounded-xl border border-dashed border-white/10 flex items-center justify-center">
                       <p className="text-white/20 text-sm italic italic">Sample snippet will appear here...</p>
                    </div>
                    <div className="h-16 bg-white/5 rounded-xl border border-dashed border-white/10" />
                   </>
                 )}
               </div>

               <div className="mt-12 pt-8 border-t border-white/10 flex justify-between items-center">
                 <span className="text-white/20 text-xs font-bold italic">Generated by CVPilot v2.0</span>
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
