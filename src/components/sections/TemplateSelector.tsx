"use client";

import React from "react";
import { Layout, Check, Eye } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";

const templates = [
  {
    id: "modern",
    name: "Modern Executive",
    description: "Multi-column layout with high density for experienced pros.",
    color: "bg-slate-900"
  },
  {
    id: "minimal",
    name: "Clean Minimalist",
    description: "Focus on white space and readability. Best for ATS.",
    color: "bg-slate-100 border border-slate-200"
  },
  {
    id: "creative",
    name: "Creative Pulse",
    description: "Bold highlights and unique typography for designers.",
    color: "bg-brand-mint/10 border-2 border-brand-mint/20"
  },
  {
    id: "professional",
    name: "Classic Pro",
    description: "Standard Harvard-style layout for finance and law.",
    color: "bg-white border border-slate-200 shadow-sm"
  }
];

interface TemplateSelectorProps {
  selectedTemplate: string | null;
  onSelect: (id: string) => void;
}

const TemplateSelector = ({ selectedTemplate, onSelect }: TemplateSelectorProps) => {
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex p-3 bg-brand-mint/10 rounded-2xl text-brand-mint mb-6">
            <Layout className="w-8 h-8" />
          </div>
          <h2 className="text-4xl font-extrabold text-[#0F172A] mb-4">Select Your Template</h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            Choose from our recruiter-verified templates designed to beat the ATS.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {templates.map((template) => (
            <motion.div
              key={template.id}
              whileHover={{ y: -10 }}
              className={`
                group relative bg-white rounded-3xl p-6 border-2 transition-all duration-300
                ${selectedTemplate === template.id ? "border-brand-mint ring-4 ring-brand-mint/5" : "border-transparent shadow-xl shadow-slate-200/50 hover:border-slate-200"}
              `}
            >
              <div className={`aspect-[3/4] rounded-2xl mb-6 p-4 ${template.color} relative overflow-hidden flex flex-col gap-3 group-hover:scale-[1.02] transition-transform duration-500`}>
                {/* Visual Skeleton - Layout Specific */}
                {template.id === 'modern' && (
                  <div className="flex gap-3 h-full w-full">
                    {/* Sidebar Left - High Contrast */}
                    <div className="w-[30%] h-full bg-slate-200/50 rounded-lg flex flex-col gap-3 p-3 border-r border-slate-200">
                       <div className="w-10 h-10 rounded-full bg-slate-300 mx-auto" />
                       <div className="space-y-2 mt-4">
                          <div className="h-1 w-full bg-slate-300 rounded" />
                          <div className="h-1 w-2/3 bg-slate-300 rounded" />
                       </div>
                       <div className="mt-auto space-y-1">
                          <div className="h-0.5 w-full bg-slate-300 rounded" />
                          <div className="h-0.5 w-full bg-slate-300 rounded" />
                       </div>
                    </div>
                    {/* Content Area */}
                    <div className="w-[70%] h-full flex flex-col gap-4 p-2">
                       <div className="h-4 w-3/4 bg-slate-400 rounded" />
                       <div className="h-1.5 w-1/2 bg-slate-300 rounded" />
                       <div className="mt-6 space-y-3">
                         <div className="h-1.5 w-full bg-slate-200 rounded" />
                         <div className="h-1 w-full bg-slate-100 rounded" />
                         <div className="h-1 w-5/6 bg-slate-100 rounded" />
                       </div>
                       <div className="mt-4 space-y-3">
                         <div className="h-1.5 w-full bg-slate-200 rounded" />
                         <div className="h-1 w-full bg-slate-100 rounded" />
                       </div>
                    </div>
                  </div>
                )}

                {template.id === 'minimal' && (
                  <div className="h-full w-full flex flex-col items-center p-6 gap-6 bg-white border border-slate-100 shadow-inner">
                    <div className="h-5 w-1/2 bg-slate-400 rounded" />
                    <div className="w-full flex justify-center gap-3">
                       <div className="h-1.5 w-16 bg-slate-200 rounded" />
                       <div className="h-1.5 w-16 bg-slate-200 rounded" />
                    </div>
                    <div className="w-full space-y-4 mt-6">
                       <div className="h-2 w-full bg-slate-300 rounded" />
                       <div className="space-y-2">
                          <div className="h-1.5 w-full bg-slate-200 rounded" />
                          <div className="h-1.5 w-3/4 bg-slate-200 rounded" />
                       </div>
                    </div>
                    <div className="w-full grow" />
                    <div className="w-full h-2 bg-slate-100 rounded" />
                  </div>
                )}

                {template.id === 'creative' && (
                  <div className="h-full w-full flex flex-col p-3 gap-4">
                    {/* Gradient Header */}
                    <div className="w-full h-16 bg-brand-mint rounded-2xl flex items-center px-4">
                       <div className="h-3 w-1/3 bg-brand-charcoal/20 rounded" />
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                       <div className="h-24 bg-white/60 rounded-2xl border border-brand-mint/20" />
                       <div className="h-24 bg-white/60 rounded-2xl border border-brand-mint/20" />
                    </div>
                    <div className="space-y-3 mt-2">
                       <div className="h-1.5 w-full bg-white/60 rounded" />
                       <div className="h-1.5 w-5/6 bg-white/60 rounded" />
                    </div>
                  </div>
                )}

                {template.id === 'professional' && (
                  <div className="h-full w-full flex flex-col p-6 gap-4 bg-white border border-slate-100 shadow-sm">
                    {/* Traditional Harvard Header */}
                    <div className="text-center space-y-2">
                       <div className="h-4 w-1/2 bg-slate-500 rounded mx-auto" />
                       <div className="h-1.5 w-3/4 bg-slate-300 rounded mx-auto" />
                    </div>
                    <div className="h-px w-full bg-slate-300 mt-2" />
                    
                    {[1,2,3].map(i => (
                      <div key={i} className="space-y-2 mt-4">
                        <div className="flex justify-between items-center">
                          <div className="h-2 w-1/3 bg-slate-400 rounded" />
                          <div className="h-1.5 w-1/4 bg-slate-300 rounded" />
                        </div>
                        <div className="space-y-1.5">
                           <div className="h-1 w-full bg-slate-200 rounded" />
                           <div className="h-1 w-5/6 bg-slate-200 rounded" />
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="absolute inset-0 bg-brand-charcoal/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                   <Button 
                    variant="primary" 
                    size="sm" 
                    className="gap-2"
                    onClick={(e: React.MouseEvent) => {
                      e.stopPropagation();
                      onSelect(template.id);
                    }}
                   >
                     <Eye className="w-4 h-4" /> Select & Preview
                   </Button>
                </div>
              </div>

              <h3 className="text-lg font-bold text-slate-900 mb-2">{template.name}</h3>
              <p className="text-slate-500 text-sm mb-6 leading-relaxed">
                {template.description}
              </p>

              <button
                onClick={() => onSelect(template.id)}
                className={`
                  w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all
                  ${selectedTemplate === template.id 
                    ? "bg-brand-mint text-white" 
                    : "bg-slate-50 text-slate-400 hover:bg-slate-100 hover:text-slate-900"}
                `}
              >
                {selectedTemplate === template.id ? (
                  <>
                    <Check className="w-5 h-5" /> Selected
                  </>
                ) : (
                  "Choose Template"
                )}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TemplateSelector;
