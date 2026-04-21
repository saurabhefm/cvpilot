"use client";

import React from "react";
import { Layout, Check, Eye, CircleUser } from "lucide-react";
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
              <div className={`aspect-[3/4] rounded-2xl mb-6 p-3 ${template.color} relative overflow-hidden flex items-center justify-center group-hover:scale-[1.02] transition-transform duration-500`}>
                {/* Visual Preview - High Fidelity CSS */}
                {template.id === 'modern' && (
                  <div className="w-[90%] h-[92%] bg-white rounded-sm shadow-lg border border-slate-200 overflow-hidden text-[6px] flex ring-1 ring-slate-900/5">
                    {/* Sidebar Left - Professional Contrast */}
                    <div className="w-[32%] h-full bg-[#1e293b] text-white flex flex-col gap-3 p-3">
                       <div className="w-10 h-10 rounded-full bg-slate-700 mx-auto flex items-center justify-center border border-white/20 overflow-hidden">
                          <CircleUser className="w-5 h-5 text-slate-400" />
                       </div>
                       <div className="space-y-3 mt-1">
                          <div className="space-y-1">
                            <p className="font-bold text-brand-mint uppercase text-[4px] tracking-tighter">Contact</p>
                            <div className="h-0.5 w-full bg-white/20 rounded-full" />
                            <div className="h-0.5 w-2/3 bg-white/20 rounded-full" />
                          </div>
                          <div className="space-y-1">
                            <p className="font-bold text-brand-mint uppercase text-[4px] tracking-tighter">Hard Skills</p>
                            <div className="flex flex-wrap gap-0.5">
                               {['UI/UX', 'Strategy', 'Growth', 'Agile'].map(s => <div key={s} className="px-0.5 py-0.5 bg-white/10 rounded-[1px] transform scale-90">S</div>)}
                            </div>
                          </div>
                       </div>
                    </div>
                    {/* Content Area */}
                    <div className="w-[68%] h-full flex flex-col gap-4 p-4 bg-white text-slate-800">
                       <div className="space-y-0.5">
                         <h4 className="text-[9px] font-black leading-tight text-slate-900 tracking-tighter uppercase">ALEX RIVERA</h4>
                         <p className="text-[5px] text-brand-mint font-bold uppercase tracking-widest leading-none">Senior Product Director</p>
                       </div>
                       <div className="space-y-3 mt-1">
                         <div className="space-y-1">
                           <p className="font-black border-b-[0.5px] border-slate-200 pb-0.5 text-[5px] uppercase tracking-widest text-slate-400">Professional Experience</p>
                           <div className="space-y-1">
                              <div className="flex justify-between items-center font-bold text-slate-900 text-[5px]">
                                <span>Global Tech Corp</span>
                                <span className="opacity-40 text-[4px]">2020 - PRES</span>
                              </div>
                              <p className="text-slate-500 leading-[1.3] text-[4.5px]">Led 15% revenue growth by optimizing cross-platform user funnels and spearheading AI integration across 4 core products.</p>
                           </div>
                         </div>
                       </div>
                    </div>
                  </div>
                )}

                {template.id === 'minimal' && (
                  <div className="w-[90%] h-[92%] bg-[#fafafa] flex flex-col items-center p-6 gap-5 shadow-lg border border-slate-200 text-center font-serif ring-1 ring-slate-900/5">
                    <div className="space-y-1.5 border-b border-slate-100 pb-4 w-full">
                       <h4 className="text-[11px] font-medium text-slate-900 tracking-[0.05em] leading-none uppercase">JORDAN BLAKE</h4>
                       <div className="flex justify-center gap-3 text-slate-400 text-[4px] font-sans font-bold uppercase tracking-widest scale-90">
                          <span>j.blake@email.com</span>
                          <span className="w-0.5 h-0.5 bg-slate-300 rounded-full my-auto" />
                          <span>San Francisco, CA</span>
                       </div>
                    </div>
                    <div className="w-full space-y-5 text-left pt-2 px-2">
                       <div className="space-y-2">
                          <p className="text-[5px] font-black text-slate-900 tracking-widest uppercase mb-1">Work History</p>
                          <div className="space-y-2">
                             <div className="flex justify-between text-[5px] items-baseline">
                                <span className="font-bold text-slate-800 italic underline-offset-2 decoration-slate-200 underline">Creative Strategist, Agency X</span>
                                <span className="text-slate-400 font-sans text-[4px]">2018 — 2024</span>
                             </div>
                             <p className="text-slate-500 text-[5px] leading-relaxed font-sans pr-2">Developed award-winning campaigns for Fortune 500 clients, resulting in $5M+ incremental revenue over 2 years.</p>
                          </div>
                       </div>
                    </div>
                  </div>
                )}

                {template.id === 'creative' && (
                  <div className="w-[90%] h-[92%] bg-white shadow-lg border border-brand-mint/20 rounded-md overflow-hidden font-sans ring-1 ring-slate-900/5 flex flex-col">
                    {/* Vibrant Header */}
                    <div className="w-full h-16 bg-[#0f172a] flex flex-col justify-center px-4 gap-0.5 relative overflow-hidden">
                       <div className="absolute -top-4 -right-4 w-12 h-12 bg-brand-mint/30 blur-2xl rounded-full" />
                       <h4 className="text-[10px] font-black text-white leading-none tracking-tight">CASEY CHEN</h4>
                       <p className="text-[4px] text-brand-mint font-bold uppercase tracking-[0.2em] italic">Visual Storyteller & UI/UX</p>
                    </div>
                    <div className="p-4 flex-1 flex flex-col gap-4">
                      <div className="grid grid-cols-2 gap-3">
                         <div className="p-2 bg-slate-50 rounded-lg border border-slate-100 space-y-1.5">
                            <p className="text-[4px] font-black text-brand-mint uppercase tracking-widest">Toolkit</p>
                            <div className="flex flex-wrap gap-0.5">
                               {['UX', 'Code', 'AI'].map(s => <span key={s} className="px-1 py-0.5 bg-brand-mint/20 text-brand-mint rounded-[1px] text-[3px] font-bold">{s}</span>)}
                            </div>
                         </div>
                         <div className="p-2 bg-slate-50 rounded-lg border border-slate-100 flex flex-col justify-center gap-1.5">
                            <div className="h-0.5 w-full bg-slate-200 rounded-full" />
                            <div className="h-0.5 w-3/4 bg-slate-200 rounded-full" />
                         </div>
                      </div>
                      <div className="space-y-1.5 px-0.5">
                         <p className="text-[6px] font-black text-slate-800 uppercase tracking-tighter">Impact Statement</p>
                         <p className="text-[4.5px] text-slate-500 leading-normal italic pr-1 border-l-2 border-brand-mint/30 pl-2">Designing interfaces that feel like magic. 5 years of shipping high-impact products to 1M+ active users globally.</p>
                      </div>
                    </div>
                  </div>
                )}

                {template.id === 'professional' && (
                  <div className="w-[90%] h-[92%] bg-white flex flex-col p-5 gap-3 shadow-lg border border-slate-200 text-[5px] font-serif leading-none ring-1 ring-slate-900/5">
                    {/* Traditional Harvard Header */}
                    <div className="text-center space-y-1.5 pb-2 border-b border-slate-900">
                       <h4 className="text-[10px] font-bold text-slate-900 tracking-tight">MORGAN S. HARPER</h4>
                       <div className="flex justify-center gap-3 text-slate-500 font-sans text-[4px] font-bold uppercase tracking-wider">
                          <span>555.0101</span>
                          <span className="opacity-30">|</span>
                          <span>mharper.pro</span>
                          <span className="opacity-30">|</span>
                          <span>New York, NY</span>
                       </div>
                    </div>
                    
                    {[
                      { 
                        title: "ACADEMIC BACKGROUND", 
                        rows: [{ l: "Wharton School of Business", r: "MBA, 2022" }]
                      },
                      { 
                        title: "PROFESSIONAL EXPERIENCE", 
                        rows: [
                          { l: "Goldman Sachs - Senior Analyst", r: "2020 - PRES" },
                          { l: "Executed $15B+ in technology sector M&A transactions...", r: "" },
                          { l: "Built predictive valuation models using...", r: "" }
                        ]
                      },
                      { 
                        title: "TECHNICAL QUALIFICATIONS", 
                        rows: [{ l: "Python, SQL, Financial Modeling, Tableau", r: "" }]
                      }
                    ].map((sec, i) => (
                      <div key={i} className="space-y-1.5 mt-0.5">
                        <p className="font-bold border-b border-slate-200 pb-0.5 text-[5.5px] tracking-tight text-slate-900 uppercase">{sec.title}</p>
                        {sec.rows.map((row, j) => (
                          <div key={j} className="flex justify-between items-start font-sans">
                             <div className="w-3/4 pr-2 text-slate-800">
                                <p className={j === 0 ? "font-bold italic" : "text-slate-500 leading-relaxed"}>{row.l}</p>
                             </div>
                             {row.r && <div className="w-1/4 text-right text-slate-400 font-black">{row.r}</div>}
                          </div>
                        ))}
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
