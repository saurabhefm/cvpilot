"use client";

import React, { useState } from "react";
import { Upload, FileUp, Shield, Zap, Loader2, Check, ArrowRight, Wand2 } from "lucide-react";
import { motion } from "framer-motion";

interface UploadZoneProps {
  onFileUpload: (file: File) => void;
  onTextSubmit: (text: string) => void;
}

const UploadZone = ({ onFileUpload, onTextSubmit }: UploadZoneProps) => {
  const [isDragActive, setIsDragActive] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedName, setUploadedName] = useState<string | null>(null);
  const [activeMode, setActiveMode] = useState<"file" | "text">("file");
  const [pastedText, setPastedText] = useState("");
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedName(file.name);
      onFileUpload(file);
    }
  };

  const handleTextAnalyze = () => {
    if (pastedText.trim().length > 50) {
      onTextSubmit(pastedText);
    } else {
      alert("Please paste a more detailed resume text (at least 50 characters).");
    }
  };

  return (
    <section id="upload" className="py-24 bg-background transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="max-w-3xl mx-auto"
        >
          <h2 className="text-4xl font-extrabold text-foreground mb-6">
            Scan Your Resume in Seconds <br />
            <span className="text-brand-mint">— No Sign-up Required</span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-lg mb-12 font-medium">
            Upload your PDF or simply paste your existing CV text to start optimizing.
          </p>

          <div className="flex items-center justify-center gap-4 mb-8">
            <button 
              onClick={() => setActiveMode("file")}
              className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${activeMode === "file" ? "bg-foreground text-background shadow-lg" : "bg-slate-100 dark:bg-white/5 text-slate-500 hover:bg-slate-200 dark:hover:bg-white/10"}`}
            >
              Upload PDF / DOCX
            </button>
            <button 
              onClick={() => setActiveMode("text")}
              className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${activeMode === "text" ? "bg-foreground text-background shadow-lg" : "bg-slate-100 dark:bg-white/5 text-slate-500 hover:bg-slate-200 dark:hover:bg-white/10"}`}
            >
              Paste Your CV Text
            </button>
          </div>

          <div 
            onDragEnter={() => setIsDragActive(true)}
            onDragLeave={() => setIsDragActive(false)}
            onDrop={() => setIsDragActive(false)}
            className={`
              relative p-12 border-4 border-dashed rounded-3xl transition-all duration-300
              ${isDragActive ? "border-brand-mint bg-brand-mint/5" : "border-border dark:border-white/5 bg-slate-50 dark:bg-slate-900/40 hover:border-slate-300 dark:hover:border-white/20"}
            `}
          >
            <div className="flex flex-col items-center">
              {activeMode === "file" ? (
                <>
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    accept=".pdf,.docx" 
                    onChange={handleFileChange}
                  />
                  
                  <div className="w-20 h-20 bg-white rounded-2xl shadow-xl flex items-center justify-center mb-6">
                    {isUploading ? (
                      <Loader2 className="w-10 h-10 text-brand-mint animate-spin" />
                    ) : (
                      <FileUp className="w-10 h-10 text-brand-mint" />
                    )}
                  </div>
                  
                  {isUploading ? (
                    <div className="space-y-4 text-center">
                      <div className="flex justify-center">
                         <Loader2 className="w-12 h-12 text-brand-mint animate-spin" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-xl font-bold text-slate-900">Parsing Resume...</p>
                        <p className="text-slate-500">Extracting skills and experience with AI</p>
                      </div>
                    </div>
                  ) : uploadedName ? (
                    <motion.div 
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="space-y-6 text-center"
                    >
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-16 h-16 bg-brand-mint/10 rounded-full flex items-center justify-center text-brand-mint mb-2">
                          <Check className="w-8 h-8" />
                        </div>
                        <p className="text-xl font-bold text-slate-900">Successfully Uploaded!</p>
                        <p className="px-4 py-1 bg-slate-100 rounded-full text-slate-500 text-sm font-mono">{uploadedName}</p>
                      </div>
                      
                      <button 
                        onClick={() => document.getElementById("templates")?.scrollIntoView({ behavior: "smooth" })}
                        className="bg-brand-mint text-brand-charcoal px-10 py-4 rounded-full font-bold text-lg hover:bg-brand-mint/80 transition-colors flex items-center gap-3"
                      >
                        Continue to Templates
                        <ArrowRight className="w-5 h-5" />
                      </button>
                    </motion.div>
                  ) : (
                    <>
                      <p className="text-xl font-bold text-foreground mb-2">Drag and drop your resume</p>
                      <p className="text-slate-500 dark:text-slate-400 mb-8 font-medium">PDF or DOCX files accepted (Max 5MB)</p>
                      
                      <button 
                        onClick={() => fileInputRef.current?.click()}
                        className="bg-foreground text-background px-10 py-4 rounded-full font-bold text-lg hover:opacity-90 transition-all flex items-center gap-3"
                      >
                        <Upload className="w-5 h-5" />
                        Select File
                      </button>
                    </>
                  )}
                </>
              ) : (
                <div className="w-full space-y-4">
                  <div className="bg-white dark:bg-slate-900/60 rounded-2xl shadow-inner border border-border dark:border-white/10 p-4 transition-colors">
                    <textarea 
                      value={pastedText}
                      onChange={(e) => setPastedText(e.target.value)}
                      placeholder="Paste your resume content here (Work Experience, Education, Skills...)"
                      className="w-full h-64 bg-transparent border-none focus:ring-0 text-foreground text-sm placeholder:text-slate-400 font-medium"
                    />
                  </div>
                  <button 
                    onClick={handleTextAnalyze}
                    className="bg-foreground text-background px-10 py-4 rounded-full font-bold text-lg hover:opacity-90 transition-all flex items-center gap-3 mx-auto"
                  >
                    <Wand2 className="w-5 h-5 text-brand-mint" />
                    Analyze & Build
                  </button>
                </div>
              )}
            </div>
            
            {/* Trust Badges */}
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-8 bg-white dark:bg-[#020617] px-8 py-4 rounded-full shadow-lg border border-border dark:border-white/5 min-w-max transition-colors">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-slate-400" />
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Privacy Guaranteed</span>
              </div>
              <div className="h-4 w-[1px] bg-border" />
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-brand-mint" />
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Immediate Scrutiny</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default UploadZone;
