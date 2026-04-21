"use client";

import React from "react";
import { Zap, Target, Download, LayoutDashboard } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    title: "Fast Job Match",
    description: "Align your profile with specific job descriptions in under 60 seconds.",
    icon: <Zap className="w-8 h-8 text-brand-mint" />
  },
  {
    title: "Keyword Matching",
    description: "Identify and integrate high-relevance keywords to beat the applicant tracking systems.",
    icon: <Target className="w-8 h-8 text-brand-mint" />
  },
  {
    title: "Unlimited Downloads",
    description: "Download your polished resume as many times as you need in PDF or DOCX.",
    icon: <Download className="w-8 h-8 text-brand-mint" />
  },
  {
    title: "Auto Formatting",
    description: "Forget about margins and spacing. Our engine handles the layout automatically.",
    icon: <LayoutDashboard className="w-8 h-8 text-brand-mint" />
  }
];

const FeatureGrid = () => {
  return (
    <section className="py-24 bg-slate-50 dark:bg-[#020617]/50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {features.map((feature, idx) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white dark:bg-slate-900/40 p-8 rounded-3xl border border-slate-100 dark:border-white/5 shadow-sm hover:shadow-xl transition-all group"
            >
              <div className="mb-6 p-4 bg-slate-50 dark:bg-white/5 w-fit rounded-2xl group-hover:bg-brand-mint/10 transition-colors">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4">{feature.title}</h3>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureGrid;
