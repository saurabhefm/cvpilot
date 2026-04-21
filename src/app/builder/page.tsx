"use client";

import React, { useState, useRef } from "react";
import { 
  Layout, 
  FileText, 
  Settings, 
  Wand2, 
  Download, 
  Eye, 
  ChevronLeft,
  Search,
  Plus,
  Zap,
  CheckCircle2,
  AlertCircle,
  Phone,
  Mail,
  MapPin,
  Loader2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import jsPDF from "jspdf";
import { toPng } from "html-to-image";

const BuilderPage = () => {
  const [activeTab, setActiveTab] = useState("content");
  const [isExporting, setIsExporting] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const resumeRef = useRef<HTMLDivElement>(null);
  
  const [resumeData, setResumeData] = useState({
    name: "Saurabh Sahu",
    email: "saurabhsahu143@gmail.com",
    phone: "+91 9392495712",
    location: "Pune, India (Remote)",
    jobTitle: "CI/CD & DevOps Engineer",
    summary: "Hands-on DevOps Engineer with a focus on CI/CD automation...",
    experience: [],
    education: [],
    skills: [],
    matchScore: "92"
  });
  const [selectedTemplate, setSelectedTemplate] = useState("modern");

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const storedProfile = localStorage.getItem("cv_full_profile");
      const storedScore = localStorage.getItem("cv_match_score");
      const storedTemplate = localStorage.getItem("cv_selected_template");
      
      if (storedTemplate) setSelectedTemplate(storedTemplate);

      if (storedProfile) {
        const profile = JSON.parse(storedProfile);
        setResumeData(prev => ({
          ...prev,
          ...profile,
          matchScore: storedScore || prev.matchScore
        }));
      }
    }
  }, []);

  const handleDownloadPDF = async () => {
    if (!resumeRef.current) return;
    
    setIsDownloading(true);
    try {
      const element = resumeRef.current;
      
      // Capture high-quality PNG
      const dataUrl = await toPng(element, { 
        quality: 1, 
        pixelRatio: 2,
        backgroundColor: "#ffffff"
      });

      // Calculate PDF dimensions based on the element size
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: [element.offsetWidth, element.offsetHeight]
      });
      
      pdf.addImage(dataUrl, "PNG", 0, 0, element.offsetWidth, element.offsetHeight);
      pdf.save(`Resume_${resumeData.name.replace(/\s+/g, "_")}.pdf`);
    } catch (error) {
      console.error("PDF Generation failed:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  const updateData = (field: string, value: any) => {
    setResumeData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden">
      <style jsx global>{`
        @media print {
          aside, header, .no-print { display: none !important; }
          main { width: 100% !important; height: auto !important; padding: 0 !important; background: white !important; }
          .canvas-container { padding: 0 !important; background: white !important; display: block !important; }
          .resume-paper { shadow: none !important; border: none !important; width: 100% !important; margin: 0 !important; }
          @page { margin: 0; }
        }
      `}</style>

      {/* Dark Sidebar */}
      <motion.aside 
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        className="w-96 bg-brand-charcoal text-white flex flex-col z-50 shadow-2xl no-print"
      >
        <div className="p-6 flex items-center justify-between border-b border-white/5">
          <Link href="/" className="flex items-center gap-2 group">
            <ChevronLeft className="w-4 h-4 text-slate-500 group-hover:text-brand-mint transition-colors" />
            <span className="font-black text-xl tracking-tighter">CV<span className="text-brand-mint">PILOT</span></span>
          </Link>
          <div className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center">
             <Settings className="w-4 h-4 text-slate-400" />
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-white/5">
           {[
             { id: "content", icon: FileText, label: "Content" },
             { id: "design", icon: Layout, label: "Design" },
             { id: "ai", icon: Wand2, label: "AI Tips" }
           ].map(tab => (
             <button
               key={tab.id}
               onClick={() => setActiveTab(tab.id)}
               className={`flex-1 py-4 flex flex-col items-center gap-1 border-b-2 transition-all ${activeTab === tab.id ? "border-brand-mint text-brand-mint bg-white/5" : "border-transparent text-slate-500 hover:text-white"}`}
             >
               <tab.icon className="w-4 h-4" />
               <span className="text-[10px] uppercase font-bold tracking-widest">{tab.label}</span>
             </button>
           ))}
        </div>

        {/* Sidebar Content */}
        <div className="p-6 grow overflow-y-auto custom-scrollbar space-y-8">
           {activeTab === "content" && (
             <div className="space-y-6">
                <div className="space-y-2">
                   <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Full Name</label>
                   <input 
                    type="text" 
                    value={resumeData.name} 
                    onChange={(e) => updateData("name", e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-brand-mint focus:outline-none transition-all"
                   />
                </div>
                <div className="space-y-2">
                   <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Job Title</label>
                   <input 
                    type="text" 
                    value={resumeData.jobTitle} 
                    onChange={(e) => updateData("jobTitle", e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-brand-mint focus:outline-none transition-all"
                   />
                </div>
                <div className="space-y-2">
                   <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Resume Summary</label>
                   <textarea 
                    rows={6}
                    value={resumeData.summary} 
                    onChange={(e) => updateData("summary", e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs leading-relaxed focus:border-brand-mint focus:outline-none transition-all resize-none"
                   />
                </div>
             </div>
           )}

           {activeTab === "design" && (
              <div className="space-y-6">
                 <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                    <p className="text-[10px] font-bold text-slate-500 uppercase mb-4">Active Template</p>
                    <div className="flex items-center gap-3">
                       <div className="w-12 h-12 bg-brand-mint/20 rounded-lg flex items-center justify-center text-brand-mint">
                          <Layout className="w-6 h-6" />
                       </div>
                       <div>
                          <p className="text-sm font-bold text-white uppercase">{selectedTemplate}</p>
                          <p className="text-[10px] text-slate-500 uppercase tracking-widest">Recruiter Verified</p>
                       </div>
                    </div>
                 </div>
              </div>
           )}

           {activeTab === "ai" && (
              <div className="space-y-6">
                 <div className="p-4 bg-brand-mint/10 border border-brand-mint/20 rounded-2xl">
                    <div className="flex items-center gap-2 text-brand-mint mb-2">
                       <Zap className="w-3 h-3" />
                       <span className="text-[10px] font-bold uppercase tracking-widest">Live Score: {resumeData.matchScore}%</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed italic">"Your summary is highly optimized for DevOps roles. Add 2 more technical certifications to hit 98%."</p>
                 </div>
              </div>
           )}
        </div>

        <div className="p-6 border-t border-white/5 bg-brand-charcoal no-print">
           <Button 
            className="w-full h-12 gap-2" 
            variant="primary"
            onClick={handleDownloadPDF}
            disabled={isDownloading}
           >
             {isDownloading ? (
               <>
                 <Loader2 className="w-4 h-4 animate-spin" /> 
                 Saving Local...
               </>
             ) : (
               <>
                 <Download className="w-4 h-4" /> Download PDF
               </>
             )}
           </Button>
           
           <button 
            onClick={() => window.print()}
            className="w-full mt-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest hover:text-brand-mint transition-colors"
           >
              Or Open Print Dialog
           </button>
        </div>
      </motion.aside>

      {/* Main Workspace */}
      <main className="flex-1 flex flex-col relative overflow-hidden">
        {/* Header toolbar */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 z-40 no-print">
           <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 cursor-pointer hover:bg-slate-100 transition-all">
                 <Search className="w-4 h-4 text-slate-400" />
                 <span className="text-sm text-slate-500 font-medium">Search Content...</span>
              </div>
           </div>

           <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-slate-400 text-xs font-bold px-4 border-r border-slate-200">
                 <Eye className="w-4 h-4" /> Reader View
              </div>
              <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-slate-600 uppercase text-xs">
                 {resumeData.name.charAt(0)}
              </div>
           </div>
        </header>

        <div className="flex-1 overflow-y-auto bg-slate-100/50 p-12 flex justify-center custom-scrollbar canvas-container">
           <motion.div 
             ref={resumeRef}
             initial={{ y: 20, opacity: 0 }}
             animate={{ y: 0, opacity: 1 }}
             className={`resume-paper w-[800px] min-h-[1132px] bg-white shadow-[0_10px_40px_rgba(0,0,0,0.1)] rounded-sm overflow-hidden flex ${selectedTemplate === 'modern' ? 'flex-row' : 'flex-col'}`}
           >
              {/* --- MODERN TEMPLATE (SIDEBAR LEFT) --- */}
              {selectedTemplate === 'modern' && (
                <>
                  {/* Left Sidebar */}
                  <div className="w-[32%] bg-slate-50 border-r border-slate-100 p-10 flex flex-col gap-8">
                     <div className="space-y-4">
                        <div className="w-24 h-24 bg-slate-200 rounded-full mx-auto border-4 border-white shadow-sm" />
                        <div className="text-center">
                           <h2 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4 border-b border-slate-200 pb-2">Contact Details</h2>
                           <div className="space-y-2 text-[10px] text-slate-600 font-medium overflow-hidden">
                              <p className="flex items-center gap-2"><Phone className="w-3 h-3 text-brand-mint" /> {resumeData.phone}</p>
                              <p className="flex items-start gap-2 break-all text-left"><Mail className="w-3 h-3 text-brand-mint mt-0.5 shrink-0" /> {resumeData.email}</p>
                              <p className="flex items-center gap-2"><MapPin className="w-3 h-3 text-brand-mint" /> {resumeData.location}</p>
                           </div>
                        </div>
                     </div>

                     <div className="space-y-4">
                        <h2 className="text-xs font-black uppercase tracking-widest text-slate-400 border-b border-slate-200 pb-2">Technical Arsenal</h2>
                        <div className="flex flex-wrap gap-1.5">
                           {resumeData.skills.map(skill => (
                             <span key={skill} className="px-2 py-0.5 bg-white border border-slate-200 rounded text-[9px] font-bold text-slate-700">
                               {skill}
                             </span>
                           ))}
                        </div>
                     </div>
                  </div>

                  {/* Main content */}
                  <div className="w-[68%] p-12 flex flex-col gap-10">
                     <div className="space-y-1">
                        <h1 className="text-4xl font-black text-slate-900 tracking-tighter">{resumeData.name}</h1>
                        <p className="text-lg text-brand-mint font-bold uppercase tracking-widest">{resumeData.jobTitle}</p>
                     </div>

                     <section className="space-y-3">
                        <h2 className="text-xs font-black uppercase tracking-widest text-slate-400 border-b border-slate-100 pb-1">Professional Mission</h2>
                        <p className="text-sm text-slate-600 leading-relaxed font-medium italic">
                          {resumeData.summary}
                        </p>
                     </section>

                     <section className="space-y-6">
                        <h2 className="text-xs font-black uppercase tracking-widest text-slate-400 border-b border-slate-100 pb-1">Professional Experience</h2>
                        <div className="space-y-8 text-sm">
                           {resumeData.experience.map((exp: any, i: number) => (
                             <div key={i} className="space-y-2">
                                <div className="flex justify-between font-bold text-slate-800">
                                   <h3>{exp.role} <span className="text-brand-mint">@</span> {exp.company}</h3>
                                   <span className="text-xs">{exp.period}</span>
                                </div>
                                <ul className="list-disc list-inside text-slate-600 space-y-1.5 ml-2 font-medium">
                                   <li>Optimized CI/CD automation pipelines reducing deployment time by {15 + i * 5}%.</li>
                                   <li>Ensured high-availability for production systems utilizing {resumeData.skills[i % 5]}.</li>
                                </ul>
                             </div>
                           ))}
                        </div>
                     </section>
                  </div>
                </>
              )}

              {/* --- CLASSIC PRO / MINIMAL TEMPLATE --- */}
              {selectedTemplate !== 'modern' && (
                <div className="p-16 flex flex-col gap-10">
                   <div className="text-center space-y-3">
                      <h1 className="text-4xl font-black text-slate-900 tracking-tighter">{resumeData.name}</h1>
                      <div className="flex justify-center gap-4 text-xs font-bold text-slate-500 uppercase tracking-widest">
                         <span>{resumeData.email}</span>
                         <span>•</span>
                         <span>{resumeData.phone}</span>
                         <span>•</span>
                         <span>{resumeData.location}</span>
                      </div>
                      <div className="h-px w-full bg-slate-200 mt-4" />
                   </div>

                   <section className="space-y-3">
                      <h2 className="text-xs font-black uppercase tracking-widest text-slate-400">Professional Summary</h2>
                      <p className="text-sm text-slate-700 leading-relaxed font-medium">
                        {resumeData.summary}
                      </p>
                   </section>

                   <section className="space-y-6">
                      <h2 className="text-xs font-black uppercase tracking-widest text-slate-400 border-b border-slate-100 pb-1">Experience</h2>
                      <div className="space-y-8">
                         {resumeData.experience.map((exp: any, i: number) => (
                           <div key={i} className="space-y-2">
                              <div className="flex justify-between font-bold text-slate-900 border-l-4 border-brand-mint pl-4">
                                 <div>
                                    <h3 className="text-base">{exp.role}</h3>
                                    <p className="text-xs text-slate-500 uppercase tracking-widest">{exp.company}</p>
                                 </div>
                                 <span className="text-xs">{exp.period}</span>
                              </div>
                              <ul className="list-disc list-inside text-sm text-slate-600 space-y-1.5 ml-4 font-medium">
                                 <li>Spearheaded automation initiatives using {resumeData.skills[i % 5]}.</li>
                                 <li>Collaborated with cross-functional teams to deliver stable release cycles.</li>
                              </ul>
                           </div>
                         ))}
                      </div>
                   </section>

                   <section className="space-y-4">
                      <h2 className="text-xs font-black uppercase tracking-widest text-slate-400 border-b border-slate-100 pb-1">Technical Matrix</h2>
                      <div className="flex flex-wrap gap-4 text-sm font-medium text-slate-600">
                         {resumeData.skills.map((skill, index) => (
                           <span key={skill} className="flex items-center gap-2">
                              {index > 0 && <span className="w-1 h-1 bg-slate-300 rounded-full" />}
                              {skill}
                           </span>
                         ))}
                      </div>
                   </section>
                </div>
              )}
           </motion.div>
        </div>
      </main>
    </div>
  );
};

export default BuilderPage;
