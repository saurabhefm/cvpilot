"use client";

import React from "react";
import { motion } from "framer-motion";
import { Layout, CheckCircle2, Zap, Palette, Star } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

const TemplatesPage = () => {
  return (
    <div className="min-h-screen bg-brand-charcoal text-white selection:bg-brand-mint/30">
      
      <main className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center space-y-8 mb-24">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-mint/10 border border-brand-mint/20 text-brand-mint text-xs font-bold uppercase tracking-widest"
            >
              <Star className="w-3 h-3 fill-brand-mint" />
              Award Winning Designs
            </motion.div>
            <h1 className="text-6xl lg:text-8xl font-black tracking-tight leading-none text-white">
              Designs That <span className="text-brand-mint">Deliver.</span>
            </h1>
            <p className="text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto font-medium">
              Every template is algorithmically optimized to pass ATS filters while visually stunning recruiters.
            </p>
          </div>

          {/* Featured Showcase */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-32">
             <div className="p-10 rounded-[40px] bg-white/5 border border-white/10 flex flex-col justify-between group overflow-hidden relative min-h-[450px]">
                <div className="relative z-10">
                   <div className="w-12 h-12 bg-brand-mint/20 rounded-2xl flex items-center justify-center text-brand-mint mb-6">
                      <Layout className="w-6 h-6" />
                   </div>
                   <h2 className="text-3xl font-black text-white mb-4">The Modern Sidebar</h2>
                   <p className="text-slate-400 leading-relaxed max-w-sm mb-8">Perfect for technology and creative roles. Our most popular design since launch.</p>
                   <ul className="space-y-3 mb-10">
                      {["Dual column impact", "AI Summary ready", "Technical skills focus"].map(item => (
                         <li key={item} className="flex items-center gap-3 text-sm font-bold text-slate-300">
                            <CheckCircle2 className="w-4 h-4 text-brand-mint" /> {item}
                         </li>
                      ))}
                   </ul>
                   <Link href="/builder">
                      <Button variant="primary" className="h-14 px-10 rounded-2xl font-bold tracking-widest uppercase text-xs">
                          Try Template
                      </Button>
                   </Link>
                </div>
                {/* Visual Preview */}
                <div className="absolute right-0 bottom-0 w-[240px] h-full bg-white translate-x-12 translate-y-24 rotate-[-6deg] rounded-t-2xl shadow-2xl p-6 transition-transform group-hover:rotate-[-3deg] group-hover:translate-y-16 duration-500">
                   <div className="flex gap-4 mb-4">
                      <div className="w-10 h-10 bg-brand-mint/10 rounded-full" />
                      <div className="flex-1 space-y-1.5">
                         <div className="h-2 w-3/4 bg-slate-200 rounded" />
                         <div className="h-1.5 w-1/2 bg-slate-100 rounded" />
                      </div>
                   </div>
                   <div className="flex gap-4">
                      <div className="w-1/4 space-y-2.5">
                         <div className="h-1 w-full bg-brand-mint/20 rounded" />
                         <div className="h-1 w-full bg-brand-mint/20 rounded" />
                         <div className="h-1 w-full bg-brand-mint/20 rounded" />
                      </div>
                      <div className="flex-1 space-y-2">
                         <div className="h-1.5 w-full bg-slate-100 rounded" />
                         <div className="h-1.5 w-full bg-slate-100 rounded" />
                         <div className="h-1.5 w-3/4 bg-slate-100 rounded" />
                         <div className="h-16 w-full border border-dashed border-slate-200 rounded mt-4" />
                      </div>
                   </div>
                </div>
             </div>

             <div className="p-10 rounded-[40px] bg-brand-mint/10 border border-brand-mint/20 flex flex-col justify-between relative overflow-hidden group min-h-[450px]">
                <div className="relative z-10">
                   <div className="w-12 h-12 bg-brand-mint rounded-2xl flex items-center justify-center text-white mb-6">
                      <Zap className="w-6 h-6" />
                   </div>
                   <h2 className="text-3xl font-black text-white mb-4">The Classic Corporate</h2>
                   <p className="text-slate-200/60 leading-relaxed max-w-sm mb-8">Trusted by executives and professionals in finance, legal, and traditional roles.</p>
                   <ul className="space-y-3 mb-10">
                      {["Clean hierarchy", "ATS Gold standard", "Metric oriented"].map(item => (
                         <li key={item} className="flex items-center gap-3 text-sm font-bold text-white">
                            <CheckCircle2 className="w-4 h-4" /> {item}
                         </li>
                      ))}
                   </ul>
                   <Link href="/builder">
                      <Button className="h-14 px-10 rounded-2xl bg-white text-brand-charcoal hover:bg-white/90 font-bold tracking-widest uppercase text-xs">
                          Try Template
                      </Button>
                   </Link>
                </div>
                {/* Visual Preview */}
                <div className="absolute right-0 bottom-0 w-[240px] h-full bg-slate-50 translate-x-12 translate-y-24 rotate-[6deg] rounded-t-2xl shadow-2xl p-6 transition-transform group-hover:rotate-[3deg] group-hover:translate-y-16 duration-500">
                   <div className="space-y-3 mb-4">
                      <div className="h-3 w-2/3 bg-slate-800 rounded mx-auto" />
                      <div className="flex justify-center gap-1.5">
                         <div className="h-1 w-8 bg-slate-200 rounded" />
                         <div className="h-1 w-8 bg-slate-200 rounded" />
                         <div className="h-1 w-8 bg-slate-200 rounded" />
                      </div>
                   </div>
                   <div className="space-y-3">
                      <div className="h-1.5 w-full bg-slate-200 rounded" />
                      <div className="space-y-1.5">
                         <div className="h-1 w-full bg-slate-100 rounded" />
                         <div className="h-1 w-full bg-slate-100 rounded" />
                         <div className="h-1 w-3/4 bg-slate-100 rounded" />
                      </div>
                      <div className="h-20 w-full border border-slate-200 rounded bg-white shadow-sm" />
                   </div>
                </div>
             </div>
          </div>

          {/* Grid list */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
             {["Hybrid", "Minimalist", "Executive", "Creative", "Modern 2.0", "Basic", "Designer", "Lead"].map((name, i) => (
                <Link key={name} href="/builder">
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="aspect-square rounded-3xl bg-white/5 border border-white/5 flex flex-col items-center justify-center gap-4 hover:border-brand-mint/50 hover:bg-white/10 lg:hover:-translate-y-2 transition-all group cursor-pointer"
                  >
                    <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-slate-500 group-hover:text-brand-mint transition-colors">
                        <Palette className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-widest text-slate-400 group-hover:text-white transition-colors">{name}</span>
                  </motion.div>
                </Link>
             ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default TemplatesPage;
