"use client";

import React from "react";
import { motion } from "framer-motion";
import { BookOpen, PenTool, Search, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

const GuidesPage = () => {
  return (
    <div className="min-h-screen bg-brand-charcoal text-white selection:bg-brand-mint/30">
      
      <main className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-mint/10 border border-brand-mint/20 text-brand-mint text-xs font-bold uppercase tracking-widest">
                <BookOpen className="w-3 h-3" />
                Expert Knowledge Base
              </div>
              <h1 className="text-6xl lg:text-8xl font-black tracking-tight leading-none">
                Master the art of <span className="text-brand-mint">Writing.</span>
              </h1>
              <p className="text-xl text-slate-400 leading-relaxed font-medium">
                Step-by-step guides, industry secrets, and recruiter-proven strategies to make your resume impossible to ignore.
              </p>
              <div className="relative group max-w-md">
                 <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-brand-mint transition-colors" />
                 <input 
                  type="text" 
                  placeholder="Search guides (e.g., 'Power Verbs')..." 
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-brand-mint/50 transition-all font-medium"
                 />
              </div>
            </div>
            
            <div className="hidden lg:grid grid-cols-2 gap-4">
               {[
                  { title: "Power Verbs", color: "bg-blue-500/10 text-blue-400" },
                  { title: "ATS Filtering", color: "bg-brand-mint/10 text-brand-mint" },
                  { title: "Summary AI", color: "bg-purple-500/10 text-purple-400" },
                  { title: "Interview Prep", color: "bg-orange-500/10 text-orange-400" }
               ].map((tag, i) => (
                  <motion.div 
                    key={tag.title}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className={`p-10 rounded-3xl border border-white/5 flex flex-col justify-between aspect-square group cursor-pointer hover:bg-white/5 transition-all`}
                  >
                     <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${tag.color}`}>
                        <PenTool className="w-5 h-5" />
                     </div>
                     <h3 className="text-xl font-bold">{tag.title}</h3>
                  </motion.div>
               ))}
            </div>
          </div>

          {/* Guide Sections */}
          <div className="space-y-32">
             <section className="space-y-12">
                <div className="flex items-center justify-between">
                   <h2 className="text-3xl font-black">Popular Guides</h2>
                   <Link href="/builder" className="text-sm font-bold text-brand-mint flex items-center gap-2 hover:translate-x-2 transition-transform">
                      View All <ArrowRight className="w-4 h-4" />
                   </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                   {[
                      { title: "How to use AI to build a resume in 2024", cat: "Basics" },
                      { title: "10 Metrics that Recruiters actually care about", cat: "Strategy" },
                      { title: "The ultimate guide to LinkedIn SEO", cat: "Digital" }
                   ].map((guide, i) => (
                      <div key={i} className="group p-2 rounded-[32px] bg-white/5 border border-white/10 hover:border-brand-mint/30 transition-all cursor-pointer">
                         <div className="h-48 bg-brand-charcoal rounded-[24px] mb-6 flex items-center justify-center text-white/5">
                            <BookOpen className="w-12 h-12 group-hover:scale-110 transition-transform duration-500" />
                         </div>
                         <div className="p-4 pt-0">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-brand-mint">{guide.cat}</span>
                            <h3 className="text-xl font-bold mt-2 leading-tight group-hover:text-brand-mint transition-colors">{guide.title}</h3>
                            <Link href="/builder" className="mt-6 flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest hover:text-white transition-colors">
                               Read Guide <ArrowRight className="w-3 h-3 text-brand-mint" />
                            </Link>
                         </div>
                      </div>
                   ))}
                </div>
             </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default GuidesPage;
