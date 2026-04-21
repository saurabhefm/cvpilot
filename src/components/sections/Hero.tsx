"use client";

import React from "react";
import { Button } from "@/components/ui/Button";
import { Check, Sparkles, Wand2, FileSearch, RefreshCcw, Star, Zap } from "lucide-react";
import { motion } from "framer-motion";

interface HeroProps {
  matchScore: number;
  openModal: (title: string, placeholder: string, action: string) => void;
}

const Hero = ({ matchScore, openModal }: HeroProps) => {
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
              <p className="mt-6 text-xl text-slate-400 max-w-xl">
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
                <span className="text-lg text-slate-300 font-medium">95% Higher Interview Rate with AI Tailoring</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-brand-mint/20 rounded-full flex items-center justify-center text-brand-mint">
                  <Check className="w-4 h-4" />
                </div>
                <span className="text-lg text-slate-300 font-medium">ATS-Optimized Templates & Keywords</span>
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
              <button className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors px-6 h-16 font-semibold">
                <div className="w-10 h-10 border border-slate-700 rounded-full flex items-center justify-center">
                  <Sparkles className="w-5 h-5" />
                </div>
                See How It Works
              </button>
            </motion.div>
          </div>

          {/* Right Side: Floating UI Graphic */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative aspect-square max-w-md mx-auto"
            >
              {/* Score Circle - Animating Wrapper */}
              <div className="absolute -top-6 -right-6 z-20">
                <motion.div 
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  transition={{ delay: 1, duration: 1 }}
                  className="w-32 h-32 bg-slate-900 border-4 border-slate-800 rounded-full flex flex-col items-center justify-center shadow-2xl"
                >
                   <svg className="absolute w-full h-full">
                    <circle
                      cx="64" cy="64" r="58"
                      stroke="#10B981" strokeWidth="4"
                      fill="transparent"
                      strokeDasharray="364"
                      strokeDashoffset="36" // Approx 90%
                      className="opacity-20"
                    />
                      <motion.circle
                      cx="64" cy="64" r="58"
                      stroke="#10B981" strokeWidth="4"
                      fill="transparent"
                      strokeDasharray="364"
                      initial={{ strokeDashoffset: 364 }}
                      animate={{ strokeDashoffset: 364 - (364 * matchScore / 100) }}
                      transition={{ delay: 0.5, duration: 1.5 }}
                      strokeLinecap="round"
                    />
                  </svg>
                  <span className="text-3xl font-black text-brand-mint">{matchScore}%</span>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Job Match</span>
                </motion.div>
              </div>

              {/* Main "Resume" Page UI */}
              <div className="w-full h-full bg-white rounded-2xl shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] p-8 overflow-hidden relative">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-slate-100 rounded-full overflow-hidden flex items-center justify-center">
                      <Star className="text-slate-300 w-8 h-8" />
                    </div>
                    <div className="space-y-2">
                      <div className="h-4 w-32 bg-slate-200 rounded-full" />
                      <div className="h-3 w-48 bg-slate-100 rounded-full" />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="h-2 w-full bg-slate-100 rounded-full" />
                    <div className="h-2 w-full bg-slate-100 rounded-full" />
                    <div className="h-2 w-3/4 bg-slate-100 rounded-full" />
                  </div>
                  <div className="pt-4 space-y-4">
                    <div className="h-6 w-24 bg-slate-200 rounded-full" />
                    <div className="space-y-2">
                      <div className="h-2 w-full bg-slate-100 rounded-full" />
                      <div className="h-2 w-5/6 bg-slate-100 rounded-full" />
                    </div>
                  </div>
                </div>

                {/* AI Overlay Assistant */}
                <motion.div 
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="absolute bottom-8 right-8 left-8 bg-[#0F172A]/90 backdrop-blur-md rounded-2xl p-4 border border-white/10 shadow-2xl"
                >
                  <div className="flex items-center justify-between mb-3 text-brand-mint">
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 fill-current" />
                      <span className="text-xs font-bold uppercase tracking-wider">AI Assistant</span>
                    </div>
                    <span className="text-[10px] text-white/50">Optimizing...</span>
                  </div>
                  <p className="text-sm text-white/90 leading-relaxed italic">
                    "Tailoring your experience section for <span className="text-brand-mint font-bold underline">Senior Software Engineer</span> roles. High impact keywords detected."
                  </p>
                </motion.div>
              </div>
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
                className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-full text-slate-300 text-sm font-semibold hover:bg-brand-mint/10 hover:border-brand-mint/30 hover:text-brand-mint transition-all"
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

// Internal icons helper to avoid import overhead for simple needs
const PenTool = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
);

export default Hero;
