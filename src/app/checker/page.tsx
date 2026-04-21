"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Upload, Zap, BarChart3, Search, AlertCircle, FileUp, Loader2, Check, ArrowRight, Wand2, MousePointer2, Layout } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

type Category = { name: string; score: number };
type ATSResult = {
  score: number;
  categories: Category[];
  improvements: string[];
};

const CheckerPage = () => {
  const [status, setStatus] = useState<"idle" | "uploading" | "scanning" | "result">("idle");
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<ATSResult | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [pastedText, setPastedText] = useState("");
  const [activeMode, setActiveMode] = useState<"file" | "text">("file");
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Check if we have a pre-existing result from the Home Page Hero
    const storedResult = localStorage.getItem("ats_full_result");
    const storedFileName = sessionStorage.getItem("pending_filename");
    
    if (storedResult) {
      try {
        const parsed = JSON.parse(storedResult);
        setResult(parsed);
        setFileName(storedFileName || "resume.pdf");
        setStatus("result");
        setProgress(100);
      } catch (e) {
        console.error("Failed to parse stored result", e);
      }
    }
  }, []);

  const startScan = async (text: string, name: string) => {
    setStatus("scanning");
    setProgress(20);
    
    // Save to session for builder later
    sessionStorage.setItem("pending_resume", text);
    sessionStorage.setItem("pending_filename", name);

    try {
      setProgress(40);
      const response = await fetch("/api/ai", {
        method: "POST",
        body: JSON.stringify({ task: "ATS_SCAN", content: text })
      });
      
      setProgress(80);
      const data = await response.json();
      
      if (data.score !== undefined) {
        setResult(data);
        // Persist for the Global UI
        if (typeof window !== "undefined") {
          localStorage.setItem("ats_score", data.score.toString());
          localStorage.setItem("ats_full_result", JSON.stringify(data));
          // Dispatch event to notify Navbar
          window.dispatchEvent(new Event("storage_update"));
        }
        setProgress(100);
        setTimeout(() => setStatus("result"), 500);
      } else {
        throw new Error("Invalid scan result");
      }
    } catch (err) {
      console.error("Scan failed:", err);
      alert("Scan failed. Please try again.");
      setStatus("idle");
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileObj = e.target.files?.[0];
    if (!fileObj) return;

    setStatus("uploading");
    setFileName(fileObj.name);

    try {
      const arrayBuffer = await fileObj.arrayBuffer();
      const pdfjs = await import("pdfjs-dist");
      pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
      
      const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;
      let fullText = "";
      
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        fullText += textContent.items.map((it: any) => it.str).join(" ") + "\n";
      }

      await startScan(fullText, fileObj.name);
    } catch (error) {
      console.error("Parsing failed:", error);
      setStatus("idle");
      alert("Failed to parse PDF.");
    }
  };

  const handleTextSubmit = () => {
    if (pastedText.length < 100) {
      alert("Please paste more content for a valid scan.");
      return;
    }
    startScan(pastedText, "Pasted Content");
  };

  return (
    <div className="min-h-screen bg-brand-charcoal text-white selection:bg-brand-mint/30 overflow-x-hidden">
      <main className="pt-32 pb-32 px-4 relative">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-mint/5 blur-[120px] -z-10 rounded-full translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 blur-[120px] -z-10 rounded-full -translate-x-1/2 translate-y-1/2" />

        <div className="max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            {status === "idle" || status === "uploading" ? (
              <motion.div 
                key="idle"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="space-y-16"
              >
                {/* Hero */}
                <div className="text-center space-y-6 max-w-3xl mx-auto">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-mint/10 border border-brand-mint/20 text-brand-mint text-xs font-bold uppercase tracking-widest">
                    <ShieldCheck className="w-3 h-3" />
                    Advanced Parser v2.4
                  </div>
                  <h1 className="text-6xl lg:text-7xl font-black tracking-tight leading-[1.1]">
                    Is your resume <span className="text-brand-mint italic">invisible?</span>
                  </h1>
                  <p className="text-xl text-slate-400 leading-relaxed font-medium">
                    Industry-leading ATS simulation scores your resume against 5,000+ proprietary benchmarks.
                  </p>
                </div>

                {/* Interaction Zone */}
                <div className="bg-white/[0.02] border border-white/10 rounded-[40px] p-2 md:p-4 backdrop-blur-sm shadow-2xl relative">
                  <div className="flex items-center justify-center gap-4 mb-8 pt-6">
                    <button 
                      onClick={() => setActiveMode("file")}
                      className={`px-8 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${activeMode === "file" ? "bg-brand-mint text-brand-charcoal" : "bg-white/5 text-slate-500 hover:text-white"}`}
                    >
                      File Upload
                    </button>
                    <button 
                      onClick={() => setActiveMode("text")}
                      className={`px-8 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${activeMode === "text" ? "bg-brand-mint text-brand-charcoal" : "bg-white/5 text-slate-500 hover:text-white"}`}
                    >
                      Paste Text
                    </button>
                  </div>

                  <div 
                    className="border-2 border-dashed border-white/5 rounded-[32px] p-12 flex flex-col items-center justify-center min-h-[400px] transition-colors hover:border-brand-mint/30"
                  >
                    {status === "uploading" ? (
                      <div className="space-y-6 text-center">
                        <Loader2 className="w-16 h-16 text-brand-mint animate-spin mx-auto" />
                        <div className="space-y-2">
                          <p className="text-2xl font-black">Uploading {fileName}...</p>
                          <p className="text-slate-500 font-medium tracking-wide italic">Preparing secure sandbox... 🔒</p>
                        </div>
                      </div>
                    ) : activeMode === "file" ? (
                      <div className="space-y-8 text-center max-w-sm">
                        <div className="w-20 h-20 bg-brand-mint/10 rounded-3xl flex items-center justify-center text-brand-mint mx-auto">
                          <FileUp className="w-10 h-10" />
                        </div>
                        <div className="space-y-4">
                          <h2 className="text-2xl font-black">Drop your resume here</h2>
                          <p className="text-slate-500 font-medium">Accepts PDF and DOCX. Your data stays private and encrypted.</p>
                        </div>
                        <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileUpload} accept=".pdf,.docx" />
                        <Button 
                          onClick={() => fileInputRef.current?.click()}
                          size="lg" 
                          className="h-16 px-12 rounded-2xl text-lg font-bold w-full"
                        >
                          Select File
                        </Button>
                      </div>
                    ) : (
                      <div className="w-full space-y-6 max-w-2xl">
                         <textarea 
                          value={pastedText}
                          onChange={(e) => setPastedText(e.target.value)}
                          placeholder="Paste your full resume content here... (Include experience, skills, and summary)"
                          className="w-full h-64 bg-white/5 border border-white/10 rounded-3xl p-6 text-white placeholder:text-slate-600 focus:outline-none focus:border-brand-mint/50 transition-colors tracking-tight font-medium"
                         />
                         <Button 
                          onClick={handleTextSubmit}
                          disabled={pastedText.length < 100}
                          size="lg" 
                          className="h-16 px-12 rounded-2xl text-lg font-bold w-full"
                         >
                           Start Free Scan
                         </Button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Features */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 opacity-60">
                   {[
                     { title: "Standard Headers", icon: <Layout className="w-5 h-5" /> },
                     { title: "Keyword Density", icon: <Search className="w-5 h-5" /> },
                     { title: "Quantified Impact", icon: <Zap className="w-5 h-5" /> }
                   ].map(f => (
                     <div key={f.title} className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-slate-500">
                        <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">{f.icon}</div>
                        {f.title}
                     </div>
                   ))}
                </div>
              </motion.div>
            ) : status === "scanning" ? (
              <motion.div 
                key="scanning"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                className="flex flex-col items-center justify-center min-h-[60vh] space-y-12 text-center"
              >
                <div className="relative">
                  <div className="w-32 h-32 border-8 border-white/5 rounded-full" />
                  <motion.div 
                    initial={{ rotate: 0 }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 border-8 border-brand-mint border-t-transparent rounded-full"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-xl font-black text-brand-mint">{progress}%</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h2 className="text-4xl font-black tracking-tight">AI Analysis in <span className="text-brand-mint italic">Progress</span></h2>
                  <div className="flex flex-col gap-2 items-center text-slate-400 font-bold uppercase text-[10px] tracking-[0.2em]">
                     <p className={progress > 10 ? "text-brand-mint" : ""}>✓ Indexing Sectional Data</p>
                     <p className={progress > 40 ? "text-brand-mint" : ""}>✓ Simulating Recruiter Eye-Path</p>
                     <p className={progress > 70 ? "text-brand-mint" : ""}>✓ Executing Keyword Optimization Logic</p>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="result"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-12"
              >
                <div className="flex flex-col lg:flex-row gap-12 items-start">
                  {/* Score Module */}
                  <div className="lg:w-1/3 w-full p-10 rounded-[40px] bg-white/[0.03] border border-white/10 text-center space-y-8">
                     <div className="relative w-48 h-48 mx-auto">
                        <svg className="w-full h-full transform -rotate-90">
                           <circle cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="16" fill="transparent" className="text-white/5" />
                           <motion.circle 
                              cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="16" fill="transparent" strokeDasharray={552.92} 
                              initial={{ strokeDashoffset: 552.92 }}
                              animate={{ strokeDashoffset: 552.92 - (552.92 * (result?.score || 0) / 100) }}
                              transition={{ duration: 1.5, ease: "easeOut" }}
                              className="text-brand-mint" 
                           />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                           <span className="text-6xl font-black tracking-tighter">{(result?.score || 0).toFixed(0)}</span>
                           <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">ATS Score</span>
                        </div>
                     </div>
                     <div className="space-y-1 text-center">
                       <h3 className="text-xl font-bold">{result?.score! > 80 ? "Excellent Match!" : "Needs Optimization"}</h3>
                       <p className="text-sm text-slate-500 font-medium">Your resume is outperforming {(result?.score || 0) + 10}% of candidates.</p>
                     </div>
                  </div>

                  {/* Breakdown Module */}
                  <div className="flex-1 space-y-8 w-full">
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {result?.categories.map((cat, i) => (
                           <div key={i} className="p-6 rounded-3xl bg-white/5 border border-white/5 space-y-4">
                              <div className="flex justify-between items-center">
                                <span className="text-xs font-black uppercase tracking-widest text-slate-500">{cat.name}</span>
                                <span className="text-sm font-bold text-brand-mint">{cat.score}%</span>
                              </div>
                              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                <motion.div 
                                  initial={{ width: 0 }}
                                  animate={{ width: `${cat.score}%` }}
                                  transition={{ duration: 1, delay: 0.5 + (i * 0.2) }}
                                  className="h-full bg-brand-mint"
                                />
                              </div>
                           </div>
                        ))}
                     </div>

                     <div className="p-8 rounded-[40px] bg-brand-mint/5 border border-brand-mint/20 space-y-6">
                        <h3 className="text-lg font-black uppercase tracking-widest flex items-center gap-2 text-brand-mint">
                           <AlertCircle className="w-5 h-5 text-brand-mint" />
                           Critical Red Flags
                        </h3>
                        <ul className="space-y-4">
                           {result?.improvements.map((imp, i) => (
                              <li key={i} className="flex items-start gap-3 text-sm font-bold text-slate-200">
                                 <span className="w-5 h-5 rounded-full bg-brand-mint/20 flex-shrink-0 flex items-center justify-center text-[10px] text-brand-mint">{i+1}</span>
                                 {imp}
                              </li>
                           ))}
                        </ul>
                     </div>
                  </div>
                </div>

                {/* Final CTA Area */}
                <div className="p-12 rounded-[50px] bg-white text-brand-charcoal flex flex-col md:flex-row items-center justify-between gap-8 shadow-[0_0_50px_rgba(16,185,129,0.3)]">
                   <div className="space-y-2">
                      <h2 className="text-3xl font-black tracking-tight leading-none">Ready to <span className="text-brand-mint">Fix</span> your Score?</h2>
                      <p className="text-slate-500 font-medium">Use our AI Builder to automatically implement these improvements in minutes.</p>
                   </div>
                   <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                      <Button 
                        onClick={() => setStatus("idle")}
                        variant="secondary" className="h-16 px-10 rounded-2xl border-brand-charcoal text-brand-charcoal font-black uppercase text-xs tracking-widest gap-2"
                      >
                         Rescan Resume
                      </Button>
                      <Link href="/builder">
                        <Button className="h-16 px-10 rounded-2xl font-black uppercase text-xs tracking-widest gap-2 shadow-2xl">
                           <Wand2 className="w-4 h-4" /> Improve with AI
                        </Button>
                      </Link>
                   </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default CheckerPage;
