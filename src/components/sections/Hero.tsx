"use client";

import React from "react";
import { Button } from "@/components/ui/Button";
import { Check, Sparkles, Wand2, FileSearch, RefreshCcw, Star, Zap, Upload, Loader2, ShieldCheck, FileUp, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface HeroProps {
  matchScore: number;
  openModal: (title: string, placeholder: string, action: string) => void;
}

const Hero = ({ matchScore: propScore, openModal }: HeroProps) => {
  const [matchScore, setMatchScore] = React.useState(propScore);

  React.useEffect(() => {
    if (propScore > 0) {
      setMatchScore(propScore);
    } else {
      const stored = localStorage.getItem("ats_score");
      if (stored) setMatchScore(parseInt(stored));
    }
  }, [propScore]);

  const scrollToUpload = () => {
    document.getElementById("upload")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative pt-32 pb-20 overflow-hidden dark-hero">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-brand-mint/5 blur-[100px] rounded-full" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-blue-500/5 blur-[100px] rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Side: Content */}
          <div className="space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-5xl lg:text-7xl font-extrabold leading-tight">
                Build a Resume that <br />
                <span className="gradient-text tracking-tight">Gets You Hired.</span>
              </h1>
              <p className="mt-6 text-xl text-slate-500 dark:text-slate-400 max-w-xl">
                CVPilot uses advanced AI to tailor your resume to specific job descriptions in seconds. Beat the ATS and land more interviews.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-brand-mint/20 rounded-full flex items-center justify-center text-brand-mint">
                  <Check className="w-4 h-4" />
                </div>
                <span className="text-lg text-slate-600 dark:text-slate-300 font-medium">95% Higher Interview Rate with AI Tailoring</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-brand-mint/20 rounded-full flex items-center justify-center text-brand-mint">
                  <Check className="w-4 h-4" />
                </div>
                <span className="text-lg text-slate-600 dark:text-slate-300 font-medium">ATS-Optimized Templates & Keywords</span>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <Button 
                size="lg" 
                className="h-16 px-10 text-xl"
                onClick={scrollToUpload}
              >
                Build Your Resume With AI
              </Button>
              <button className="flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-foreground transition-colors px-6 h-16 font-semibold">
                <div className="w-10 h-10 border border-border dark:border-slate-700 rounded-full flex items-center justify-center">
                  <Sparkles className="w-5 h-5" />
                </div>
                See How It Works
              </button>
            </motion.div>
          </div>

          {/* Right Side: Quick Scan Card */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative max-w-md mx-auto w-full min-h-[400px] flex items-center"
            >
              <HeroUploadCard onScoreUpdate={setMatchScore} />
              
              {/* Decorative Glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-brand-mint/10 blur-[100px] -z-10" />
            </motion.div>
          </div>

        </div>

        {/* Micro-Tool Bar */}
        <div className="mt-24 pt-12 border-t border-white/5">
          <p className="text-center text-slate-500 text-sm font-bold uppercase tracking-[0.2em] mb-8">Quick AI Actions</p>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { 
                label: "Tailor Resume", 
                icon: <PenTool className="w-4 h-4" />,
                onClick: () => document.getElementById("tailor")?.scrollIntoView({ behavior: "smooth" })
              },
              { 
                label: "Generate Summary", 
                icon: <Sparkles className="w-4 h-4" />,
                onClick: () => document.getElementById("summary")?.scrollIntoView({ behavior: "smooth" })
              },
              { 
                label: "Rewrite Bullets", 
                icon: <RefreshCcw className="w-4 h-4" />,
                onClick: () => openModal("Rewrite Bullets", "Paste your current resume bullet points here...", "Optimize Bullets")
              },
              { 
                label: "Highlight Strengths", 
                icon: <Star className="w-4 h-4" />,
                onClick: () => openModal("Highlight Strengths", "Paste your experience snippet or achievement here...", "Extract Strengths")
              },
              { 
                label: "Extract Skills", 
                icon: <Zap className="w-4 h-4" />,
                onClick: () => openModal("Extract Skills", "Paste a job description or your bio here...", "Extract Keywords")
              }
            ].map((pill, idx) => (
              <motion.button
                key={pill.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + idx * 0.1 }}
                onClick={pill.onClick}
                className="flex items-center gap-2 px-6 py-3 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-full text-slate-600 dark:text-slate-300 text-sm font-semibold hover:bg-brand-mint/10 hover:border-brand-mint/30 hover:text-brand-mint transition-all"
              >
                {pill.icon}
                {pill.label}
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const HeroUploadCard = ({ onScoreUpdate }: { onScoreUpdate: (s: number) => void }) => {
  const [status, setStatus] = React.useState<"idle" | "scanning" | "result">("idle");
  const [progress, setProgress] = React.useState(0);
  const [score, setScore] = React.useState<number | null>(null);
  
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setStatus("scanning");
    setProgress(10);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfjs = await import("pdfjs-dist");
      pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
      
      const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;
      let fullText = "";
      
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        fullText += textContent.items.map((it: any) => it.str).join(" ") + "\n";
      }

      setProgress(40);
      
      // Perform AI Scan directly here
      const response = await fetch("/api/ai", {
        method: "POST",
        body: JSON.stringify({ task: "ATS_SCAN", content: fullText })
      });
      
      setProgress(80);
      const data = await response.json();
      
      if (data.score !== undefined) {
        setScore(data.score);
        onScoreUpdate(data.score);
        
        // Persist for global use and for Checker Page detailed view
        localStorage.setItem("ats_score", data.score.toString());
        localStorage.setItem("ats_full_result", JSON.stringify(data));
        sessionStorage.setItem("pending_resume", fullText);
        sessionStorage.setItem("pending_filename", file.name);
        
        // Notify other components
        window.dispatchEvent(new Event("storage_update"));

        setProgress(100);
        setTimeout(() => setStatus("result"), 500);
      } else {
        throw new Error("Invalid scan result");
      }
    } catch (err) {
      console.error("Scanning failed:", err);
      alert("Failed to scan resume. Please try again.");
      setStatus("idle");
    }
  };

  return (
    <div className="w-full bg-slate-50 dark:bg-white/5 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-[32px] p-8 shadow-2xl relative overflow-hidden group min-h-[380px] flex flex-col justify-center">
      <AnimatePresence mode="wait">
        {status === "idle" && (
          <motion.div 
            key="idle"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6 text-center"
          >
            <div className="absolute top-0 right-0 p-4">
              <div className="w-12 h-12 bg-brand-mint/10 rounded-full flex items-center justify-center text-brand-mint animate-pulse">
                <Zap className="w-6 h-6 fill-current" />
              </div>
            </div>

            <div className="w-20 h-20 bg-brand-mint rounded-3xl flex items-center justify-center text-brand-charcoal mx-auto shadow-[0_0_30px_rgba(45,212,191,0.3)]">
              <FileUp className="w-10 h-10" />
            </div>
            
            <div className="space-y-2">
              <h3 className="text-2xl font-black text-foreground">Free ATS Audit</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Instant scan. Zero signup. Beat the algorithm.</p>
            </div>

            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept=".pdf"
              onChange={handleFileUpload}
            />

            <Button 
              onClick={() => fileInputRef.current?.click()}
              className="w-full h-14 rounded-2xl font-bold gap-2 text-lg"
            >
              Upload Resume
            </Button>

            <div className="flex items-center justify-center gap-6 opacity-40">
              <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  <ShieldCheck className="w-3 h-3 text-brand-mint" /> Secure
              </div>
              <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  <Check className="w-3 h-3 text-brand-mint" /> Private
              </div>
            </div>
          </motion.div>
        )}

        {status === "scanning" && (
          <motion.div 
            key="scanning"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="space-y-8 text-center py-8"
          >
            <div className="relative w-24 h-24 mx-auto">
              <div className="absolute inset-0 border-4 border-white/5 rounded-full" />
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border-4 border-brand-mint border-t-transparent rounded-full"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                 <span className="text-sm font-black text-brand-mint">{progress}%</span>
              </div>
            </div>
            
            <div className="space-y-3">
              <h3 className="text-xl font-black text-foreground tracking-tight">AI Scanning...</h3>
              <p className="text-[10px] uppercase font-black tracking-[0.2em] text-slate-400 dark:text-slate-500 animate-pulse">Analyzing Performance Data</p>
            </div>
          </motion.div>
        )}

        {status === "result" && (
          <motion.div 
            key="result"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-8 text-center"
          >
            <div className="relative w-32 h-32 mx-auto">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-white/5" />
                <motion.circle 
                  cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray={364.42} 
                  initial={{ strokeDashoffset: 364.42 }}
                  animate={{ strokeDashoffset: 364.42 - (364.42 * (score || 0) / 100) }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="text-brand-mint shadow-[0_0_20px_rgba(45,212,191,0.5)]" 
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-black text-foreground">{score}%</span>
                <span className="text-[8px] font-black uppercase text-slate-500 tracking-widest leading-none">Match</span>
              </div>
            </div>

            <div className="space-y-4">
               <div className="space-y-1">
                 <h3 className="text-xl font-black text-foreground">Analysis Complete</h3>
                 <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">We identified 4 high-impact improvements.</p>
               </div>
               
               <div className="flex flex-col gap-3">
                  <Link href="/checker">
                    <Button className="w-full h-12 rounded-xl font-bold gap-2 text-sm bg-brand-mint text-brand-charcoal hover:bg-brand-mint/90">
                      View Detailed Report <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                  <button 
                    onClick={() => setStatus("idle")}
                    className="text-[10px] font-bold uppercase tracking-widest text-slate-500 hover:text-white transition-colors"
                  >
                    Scan Another Resume
                  </button>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Internal icons helper to avoid import overhead for simple needs
const PenTool = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
);

export default Hero;
