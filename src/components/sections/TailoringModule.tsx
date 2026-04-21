"use client";

import React, { useState } from "react";
import { FileText, AlignLeft, ArrowRight, Wand2, CheckCircle2, Loader2, Cpu, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";

interface TailoringModuleProps {
  hasFile: boolean;
  onGenerate: (score: number) => void;
}

const TailoringModule = ({ hasFile, onGenerate }: TailoringModuleProps) => {
  const router = useRouter();
  const [jobDescription, setJobDescription] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [tailoredResult, setTailoredResult] = useState<string | null>(null);

  const handleGenerate = () => {
    setIsGenerating(true);
    // Simulate complex AI tailoring
    setTimeout(() => {
      const resultText = `Tailored Optimization Complete. 
      - Keywords Added: "Multi-channel scaling", "Revenue optimization", "SaaS Growth".
      - Bullet Point Refinement: 3 experiences optimized for impact.`;
      
      setIsGenerating(false);
      setTailoredResult(resultText);
      onGenerate(92);

      if (typeof window !== "undefined") {
        localStorage.setItem("cv_tailored_content", resultText);
        localStorage.setItem("cv_match_score", "92");
      }
      // Removed auto-scroll here to let user see the result
    }, 3000);
  };

  return (
    <section className="py-24 bg-brand-charcoal overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center lg:text-left">
          <h2 className="text-4xl font-extrabold text-white mb-4">Precision Tailoring</h2>
          <p className="text-slate-400 text-lg">Align your career history with any job post using AI-driven semantics.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-px bg-white/10 border border-white/10 rounded-[40px] overflow-hidden shadow-2xl">
          {/* Left: Uploader */}
          <div className="p-12 hover:bg-white/5 transition-colors">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-12 h-12 bg-brand-mint rounded-2xl flex items-center justify-center text-white">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">1. Upload Your Resume</h3>
                <p className="text-slate-500 text-sm italic">Existing PDF or master copy</p>
              </div>
            </div>
            
            <div className="h-64 border-2 border-dashed border-white/10 rounded-3xl flex flex-col items-center justify-center gap-4 bg-white/5 relative overflow-hidden">
               {hasFile ? (
                 <motion.div 
                   initial={{ scale: 0.8, opacity: 0 }}
                   animate={{ scale: 1, opacity: 1 }}
                   className="flex flex-col items-center gap-2"
                 >
                   <CheckCircle2 className="w-12 h-12 text-brand-mint" />
                   <p className="text-white font-bold">Resume Uploaded</p>
                   <p className="text-slate-500 text-xs">Ready for tailoring</p>
                 </motion.div>
               ) : (
                 <>
                   <FileText className="w-12 h-12 text-white/20" />
                   <p className="text-slate-400 text-sm font-medium">No resume uploaded</p>
                   <button 
                    onClick={() => document.getElementById("upload")?.scrollIntoView({ behavior: "smooth" })}
                    className="text-brand-mint text-xs underline underline-offset-4 font-bold"
                   >
                     Upload now
                   </button>
                 </>
               )}
            </div>
          </div>

          {/* Right: Job Description */}
          <div className="p-12 bg-brand-mint text-brand-charcoal">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-12 h-12 bg-brand-charcoal rounded-2xl flex items-center justify-center text-white">
                <AlignLeft className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold">2. Paste Job Description</h3>
                <p className="text-brand-charcoal/60 text-sm italic italic">The target role requirements</p>
              </div>
            </div>

            <textarea 
               value={jobDescription}
               onChange={(e) => setJobDescription(e.target.value)}
               placeholder="Paste the job description here..."
               className="w-full h-64 bg-white/40 border border-brand-charcoal/10 rounded-3xl p-6 text-brand-charcoal placeholder:text-brand-charcoal/40 font-medium focus:outline-none focus:bg-white transition-all shadow-inner"
            />
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center">
            {tailoredResult ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-4xl bg-white rounded-[32px] p-10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] relative overflow-hidden border border-slate-100"
              >
                <div className="absolute top-0 right-0 p-6">
                  <div className="bg-brand-mint/10 text-brand-mint text-xs font-black px-4 py-2 rounded-full uppercase tracking-widest flex items-center gap-2">
                    <Cpu className="w-3 h-3" /> AI Tailoring Success
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-10">
                  <div className="flex-1">
                    <h3 className="text-3xl font-black text-brand-charcoal mb-6 flex items-center gap-3">
                      Output Generated <Wand2 className="w-6 h-6 text-brand-mint" />
                    </h3>
                    <div className="space-y-6">
                      <div className="p-6 bg-slate-50 border border-slate-100 rounded-3xl">
                        <p className="text-brand-charcoal text-sm leading-relaxed whitespace-pre-line font-medium leading-relaxed">
                          {tailoredResult}
                        </p>
                      </div>
                      <div className="flex items-center gap-4 text-slate-400 text-xs font-bold uppercase tracking-widest">
                        <ShieldCheck className="w-4 h-4 text-brand-mint" /> ATS-Compatibility Scanned
                        <CheckCircle2 className="w-4 h-4 text-brand-mint" /> Keyword Match: 92%
                      </div>
                    </div>
                  </div>

                  <div className="md:w-64 flex flex-col justify-center gap-4 border-t md:border-t-0 md:border-l border-slate-100 pt-8 md:pt-0 md:pl-10">
                    <Button 
                      variant="primary" 
                      className="w-full h-14 text-lg"
                      onClick={() => router.push("/builder")}
                    >
                      Open Editor
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full h-14 text-lg"
                      onClick={() => setTailoredResult(null)}
                    >
                      Redo
                    </Button>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="flex flex-col items-center">
                <Button 
                  size="lg" 
                  className="h-16 px-12 text-xl gap-3"
                  disabled={!hasFile || !jobDescription || isGenerating}
                  onClick={handleGenerate}
                >
                  {isGenerating ? (
                    <>Analyzing Matrix... <Loader2 className="w-6 h-6 animate-spin" /></>
                  ) : (
                    <>Generate Tailored Resume <Wand2 className="w-6 h-6" /></>
                  )}
                </Button>
                
                {!isGenerating && hasFile && !jobDescription && (
                  <button 
                    onClick={() => router.push("/builder")}
                    className="mt-6 text-slate-400 text-sm font-bold uppercase tracking-widest hover:text-white transition-colors"
                  >
                    Skip & Build with Existing Resume 
                  </button>
                )}
              </div>
            )}
        </div>
      </div>
    </section>
  );
};

export default TailoringModule;
