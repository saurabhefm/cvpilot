"use client";

import React from "react";
import { motion } from "framer-motion";
import { Layout, CheckCircle2, Zap, ArrowRight, MousePointer2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

const FormatsPage = () => {
  return (
    <div className="min-h-screen bg-brand-charcoal text-white selection:bg-brand-mint/30">
      
      <main className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* ... Header ... */}
          <div className="text-center space-y-8 mb-32">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-mint/10 border border-brand-mint/20 text-brand-mint text-xs font-bold uppercase tracking-widest"
            >
              <Layout className="w-3 h-3" />
              Strategic Layouts
            </motion.div>
            <h1 className="text-6xl lg:text-8xl font-black tracking-tight leading-none text-white">
              The Perfect <span className="text-brand-mint">Format.</span>
            </h1>
            <p className="text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto font-medium">
              Don't leave your career to chance. Choose the structure that highlights your unique career story and beats the ATS algorithms.
            </p>
          </div>

          {/* Formats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                name: "Reverse Chronological", 
                tag: "Most Popular", 
                desc: "Focuses on your recent work history. The standard for most professionals.",
                pros: ["ATS friendly", "Recruiter preferred", "Clear growth path"]
              },
              { 
                name: "Functional Skills", 
                tag: "Career Pivot", 
                desc: "Highlights transferable skills over dates. Ideal for career changers.",
                pros: ["Emphasizes skills", "Hides employment gaps", "Ideal for students"]
              },
              { 
                name: "Hybrid / Combination", 
                tag: "Best for Tech", 
                desc: "Combines strict chronological order with a heavy skills focus.",
                pros: ["Modern impact", "Highly detailed", "Balanced visibility"]
              }
            ].map((f, i) => (
              <motion.div 
                key={f.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group p-8 rounded-[40px] bg-white/5 border border-white/10 hover:border-brand-mint/30 transition-all flex flex-col justify-between h-full"
              >
                <div className="space-y-6">
                  <div className="flex justify-between items-start">
                    <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-slate-400 group-hover:text-brand-mint transition-colors">
                      <Zap className="w-6 h-6" />
                    </div>
                    <span className="px-3 py-1 bg-brand-mint/10 text-brand-mint text-[10px] font-bold uppercase tracking-widest rounded-full">{f.tag}</span>
                  </div>
                  <h3 className="text-2xl font-black text-white">{f.name}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed font-medium">{f.desc}</p>
                  <div className="h-px w-full bg-white/5" />
                  <ul className="space-y-3">
                    {f.pros.map(pro => (
                      <li key={pro} className="flex items-center gap-3 text-xs font-bold text-slate-300">
                        <CheckCircle2 className="w-3 h-3 text-brand-mint" /> {pro}
                      </li>
                    ))}
                  </ul>
                </div>
                <Link href="/builder">
                  <Button variant="outline" className="w-full mt-10 h-12 border-white/10 hover:bg-white/5 font-bold uppercase tracking-widest text-[10px] gap-2">
                    Select Format <MousePointer2 className="w-3 h-3" />
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Expert Tip Section */}
          <div className="mt-32 p-16 rounded-[60px] bg-white border border-slate-200 text-brand-charcoal relative overflow-hidden flex flex-col lg:flex-row items-center gap-16">
             <div className="relative z-10 lg:w-1/2 space-y-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-charcoal/10 border border-brand-charcoal/10 text-brand-charcoal text-[10px] font-black uppercase tracking-widest">
                   <Zap className="w-3 h-3 fill-brand-charcoal" />
                   AI Expert Tip
                </div>
                <h2 className="text-4xl lg:text-5xl font-black tracking-tight leading-none">Which one is right for <span className="text-brand-mint">you?</span></h2>
                <p className="text-lg text-slate-600 leading-relaxed font-medium">95% of recruiters prefer the **Reverse Chronological** format. Unless you have a specific reason to hide your timeline, stick to the gold standard.</p>
                <Link href="/builder">
                  <button className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-brand-mint hover:gap-4 transition-all">
                    Take our Format Quiz <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
             </div>
             <div className="lg:w-1/2 relative">
                <div className="aspect-video bg-slate-100 rounded-3xl border-2 border-slate-200 border-dashed flex items-center justify-center relative overflow-hidden">
                   <Layout className="w-20 h-20 text-slate-200" />
                   {/* Animated particles or something */}
                   <div className="absolute inset-0 bg-brand-mint/5 pointer-events-none" />
                </div>
             </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FormatsPage;
