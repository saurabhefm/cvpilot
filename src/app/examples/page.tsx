"use client";

import React from "react";
import { motion } from "framer-motion";
import { Lightbulb, Search, Filter, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

const ExamplesPage = () => {
  const categories = ["All Roles", "Tech", "Finance", "Healthcare", "Creative", "Executive"];
  
  return (
    <div className="min-h-screen bg-brand-charcoal text-white selection:bg-brand-mint/30">
      
      <main className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* ... Header ... */}
          <div className="text-center space-y-6 mb-16">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-mint/10 border border-brand-mint/20 text-brand-mint text-xs font-bold uppercase tracking-widest"
            >
              <Lightbulb className="w-3 h-3" />
              Inspiration Hub
            </motion.div>
            <h1 className="text-5xl lg:text-7xl font-black tracking-tight">
              Real-World <span className="text-brand-mint">CV Examples.</span>
            </h1>
            <p className="text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto">
              Explore 500+ recruiter-approved resume examples tailored for any industry, level, or situation.
            </p>
          </div>

          {/* Search & Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-12">
            <div className="flex-1 relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-brand-mint transition-colors" />
              <input 
                type="text" 
                placeholder="Search job titles (e.g., Software Engineer)..." 
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-brand-mint/50 transition-all font-medium"
              />
            </div>
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {categories.map((cat, i) => (
                <button 
                  key={cat}
                  className={`px-6 py-4 rounded-2xl text-xs font-bold uppercase tracking-widest transition-all whitespace-nowrap border ${i === 0 ? "bg-brand-mint text-white border-brand-mint shadow-[0_0_20px_rgba(16,185,129,0.3)]" : "bg-white/5 border-white/10 text-slate-400 hover:border-white/20 hover:text-white"}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Examples Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <motion.div 
                key={item}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: item * 0.1 }}
                className="group relative"
              >
                <div className="rounded-3xl overflow-hidden bg-white shadow-2xl transition-transform duration-500 hover:scale-[1.02] cursor-pointer relative aspect-[3/4]">
                   {/* Placeholder for resume image */}
                   <img 
                    src="/cv_examples_grid_1776768626896.png" 
                    alt="Resume Example"
                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-8">
                      <Link href="/builder">
                        <Button className="w-full h-12 font-bold gap-2">
                          View Example <ArrowRight className="w-4 h-4" />
                        </Button>
                      </Link>
                   </div>
                </div>
                <div className="mt-4 px-2">
                   <h3 className="text-lg font-bold group-hover:text-brand-mint transition-colors">Senior Software Engineer</h3>
                   <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">Google • 8 Years Exp</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Call to action */}
          <div className="mt-32 p-12 rounded-[40px] bg-brand-mint/5 border border-brand-mint/10 text-center relative overflow-hidden">
             <div className="relative z-10 space-y-6">
                <h2 className="text-3xl font-black text-white">Find your dream role today?</h2>
                <p className="text-slate-400 max-w-md mx-auto leading-relaxed">Stop staring at a blank page. Use these examples as your foundation and build a winning CV in minutes.</p>
                <Link href="/builder">
                  <Button size="lg" className="h-14 px-10 text-lg font-bold shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                    Start Building Now
                  </Button>
                </Link>
             </div>
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] bg-brand-mint/5 blur-[120px] pointer-events-none" />
          </div>
        </div>
      </main>
    </div>
  );
};

export default ExamplesPage;
