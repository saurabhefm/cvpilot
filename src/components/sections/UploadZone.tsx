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
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="max-w-3xl mx-auto"
        >
          <h2 className="text-4xl font-extrabold text-[#0F172A] mb-6">
            Scan Your Resume in Seconds <br />
            <span className="text-brand-mint">— No Sign-up Required</span>
          </h2>
          <p className="text-slate-500 text-lg mb-12">
            Upload your PDF or simply paste your existing CV text to start optimizing.
          </p>

          <div className="flex items-center justify-center gap-4 mb-8">
            <button 
              onClick={() => setActiveMode("file")}
              className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${activeMode === "file" ? "bg-brand-charcoal text-white shadow-lg" : "bg-slate-100 text-slate-500 hover:bg-slate-200"}`}
            >
              Upload PDF / DOCX
            </button>
            <button 
              onClick={() => setActiveMode("text")}
              className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${activeMode === "text" ? "bg-brand-charcoal text-white shadow-lg" : "bg-slate-100 text-slate-500 hover:bg-slate-200"}`}
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
              ${isDragActive ? "border-brand-mint bg-brand-mint/5" : "border-slate-100 bg-slate-50 hover:border-slate-300"}
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
                      <p className="text-xl font-bold text-slate-900 mb-2">Drag and drop your resume</p>
                      <p className="text-slate-500 mb-8">PDF or DOCX files accepted (Max 5MB)</p>
                      
                      <button 
                        onClick={() => fileInputRef.current?.click()}
                        className="bg-[#0F172A] text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-slate-800 transition-colors flex items-center gap-3"
                      >
                        <Upload className="w-5 h-5" />
                        Select File
                      </button>
                    </>
                  )}
                </>
              ) : (
                <div className="w-full space-y-4">
                  <div className="bg-white rounded-2xl shadow-inner border border-slate-200 p-4">
                    <textarea 
                      value={pastedText}
                      onChange={(e) => setPastedText(e.target.value)}
                      placeholder="Paste your resume content here (Work Experience, Education, Skills...)"
                      className="w-full h-64 bg-transparent border-none focus:ring-0 text-slate-700 text-sm placeholder:text-slate-400"
                    />
                  </div>
                  <button 
                    onClick={handleTextAnalyze}
                    className="bg-[#0F172A] text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-slate-800 transition-colors flex items-center gap-3 mx-auto"
                  >
                    <Wand2 className="w-5 h-5 text-brand-mint" />
                    Analyze & Build
                  </button>
                </div>
              )}
            </div>
            
            {/* Trust Badges */}
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-8 bg-white px-8 py-4 rounded-full shadow-lg border border-slate-100 min-w-max">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-slate-400" />
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Privacy Guaranteed</span>
              </div>
              <div className="h-4 w-[1px] bg-slate-200" />
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
