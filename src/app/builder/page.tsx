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
  Loader2,
  Trash2,
  X,
  Type
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import jsPDF from "jspdf";
import { toPng } from "html-to-image";

const BuilderPage = () => {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState("content");
  const [isExporting, setIsExporting] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(384); // 96 * 4 (w-96 default)
  const isResizing = useRef(false);
  const resumeRef = useRef<HTMLDivElement>(null);
  
  const [resumeData, setResumeData] = useState({
    name: "Saurabh Sahu",
    email: "saurabhsahu143@gmail.com",
    phone: "+91 9392495712",
    location: "Pune, India (Remote)",
    jobTitle: "CI/CD & DevOps Engineer",
    summary: "Hands-on DevOps Engineer with a focus on CI/CD automation and pipeline deployment support. Proficient in building automated workflows using Jenkins, Git, and ArgoCD to streamline application delivery in cloud-native environments.",
    experience: [
      { 
        company: "NTT DATA", 
        role: "DevOps Engineer", 
        period: "Feb 2025 - Present",
        bullets: [
          "Pipeline Automation: Implementing and maintaining end-to-end CI/CD processes using Jenkins, ArgoCD & Actions.",
          "Deployment Support: Managing infrastructure and application deployments using CICD tool.",
          "Version Control: Managing source code repositories and branching strategies through Bitbucket, Git, and GitHub."
        ]
      }
    ],
    education: [
      { school: "Premier Engineering College", degree: "B.Tech Computer Science", year: "2022" }
    ],
    skills: ["Kubernetes", "Docker", "ArgoCD", "Jenkins", "Terraform", "Git", "Bitbucket", "Ansible", "YAML", "Shell Scripting"],
    matchScore: "92"
  });
  const [selectedTemplate, setSelectedTemplate] = useState("modern");
  const [isCompacting, setIsCompacting] = useState(false);
  const [aiTips, setAiTips] = useState<string[]>([]);
  const [isLoadingTips, setIsLoadingTips] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [docSettings, setDocSettings] = useState({
    fontFamily: "'Inter', sans-serif",
    fontSize: 14,
    lineHeight: 1.6,
  });

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const storedProfile = localStorage.getItem("cv_full_profile");
      const storedScore = localStorage.getItem("cv_match_score");
      const storedTemplate = localStorage.getItem("cv_selected_template");
      
      if (storedTemplate) setSelectedTemplate(storedTemplate);

      if (storedProfile) {
        try {
          const profile = JSON.parse(storedProfile);
          
          // Safety Sanitizer: Ensure critical fields are always arrays
          const sanitizedProfile = {
            ...profile,
            experience: Array.isArray(profile.experience) ? profile.experience : [],
            education: Array.isArray(profile.education) ? profile.education : [],
            skills: Array.isArray(profile.skills) ? profile.skills : 
                    (typeof profile.skills === "string" ? profile.skills.split(",").map((s: string) => s.trim()).filter(Boolean) : [])
          };

          setResumeData(prev => ({
            ...prev,
            ...sanitizedProfile,
            matchScore: storedScore || prev.matchScore
          }));
        } catch (err) {
          console.error("Critical: Failed to parse or sanitize stored profile", err);
        }
      }

      // Sidebar resizing logic
      const handleMouseMove = (e: MouseEvent) => {
        if (!isResizing.current) return;
        const newWidth = Math.min(Math.max(300, e.clientX), 600);
        setSidebarWidth(newWidth);
      };

      const handleMouseUp = () => {
        isResizing.current = false;
        document.body.style.cursor = "default";
      };

      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, []);

  // Handle incoming resume from ATS Checker
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const pendingText = sessionStorage.getItem("pending_resume");
      const pendingName = sessionStorage.getItem("pending_filename");
      
      if (pendingText) {
        const triggerExtraction = async () => {
          setIsLoadingTips(true);
          try {
            const response = await fetch("/api/ai", {
              method: "POST",
              body: JSON.stringify({ task: "EXTRACT", content: pendingText })
            });
            const data = await response.json();
            
            if (data.experience) {
              setResumeData(prev => ({
                ...prev,
                ...data,
                name: pendingName && pendingName !== "Pasted Content" 
                  ? pendingName.split(".")[0].replace(/[_-]/g, " ") 
                  : prev.name
              }));
              // Success - clear the pending content
              sessionStorage.removeItem("pending_resume");
              sessionStorage.removeItem("pending_filename");
            }
          } catch (e) {
            console.error("Auto-extraction from Checker failed:", e);
          } finally {
            setIsLoadingTips(false);
          }
        };
        triggerExtraction();
      }
    }
  }, []);

  const handleDownloadPDF = async () => {
    if (!resumeRef.current) return;
    
    setIsDownloading(true);
    try {
      const element = resumeRef.current;
      const elementWidth = element.offsetWidth;
      const elementHeight = element.offsetHeight;
      
      // Calculate A4 height in pixels relative to the 800px width
      // A4 ratio is ~1.414. 800 * 1.414 = 1131.2
      const a4Height = 1131;

      // Capture high-quality PNG of the entire content
      const dataUrl = await toPng(element, { 
        quality: 1, 
        pixelRatio: 2,
        backgroundColor: "#ffffff"
      });

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: [elementWidth, a4Height] // Standard A4-ish page
      });

      // Add the first page
      pdf.addImage(dataUrl, "PNG", 0, 0, elementWidth, elementHeight);
      
      let heightLeft = elementHeight - a4Height;
      let pageNumber = 1;

      // If content is longer than one page, add more pages
      while (heightLeft > 0) {
        let position = -(a4Height * pageNumber);
        pdf.addPage([elementWidth, a4Height], "portrait");
        pdf.addImage(dataUrl, "PNG", 0, position, elementWidth, elementHeight);
        heightLeft -= a4Height;
        pageNumber++;
      }
      
      pdf.save(`Resume_${resumeData.name.replace(/\s+/g, "_")}.pdf`);
    } catch (error) {
      console.error("PDF Generation failed:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleSmartCompact = async () => {
    setIsCompacting(true);
    try {
      const response = await fetch("/api/ai", {
        method: "POST",
        body: JSON.stringify({ 
          task: "COMPACT", 
          content: JSON.stringify(resumeData.experience) 
        })
      });
      if (!response.ok) throw new Error("Compacting failed");
      const result = await response.json();
      if (Array.isArray(result)) {
        setResumeData(prev => ({ ...prev, experience: result }));
      }
    } catch (e) {
      console.error("Compact error:", e);
    } finally {
      setIsCompacting(false);
    }
  };

  const fetchAITips = async () => {
    setIsLoadingTips(true);
    try {
      const response = await fetch("/api/ai", {
        method: "POST",
        body: JSON.stringify({ 
          task: "TIPS", 
          content: JSON.stringify(resumeData) 
        })
      });
      const data = await response.json();
      if (Array.isArray(data)) {
        setAiTips(data);
      }
    } catch (e) {
      console.error("Failed to fetch tips", e);
    } finally {
      setIsLoadingTips(false);
    }
  };

  // Fetch tips on first load of AI tab
  React.useEffect(() => {
    if (activeTab === "ai" && aiTips.length === 0) {
      fetchAITips();
    }
  }, [activeTab]);

  const [polishingIndex, setPolishingIndex] = useState<{exp: number, bullet: number} | null>(null);

  const updateData = (field: string, value: any) => {
    setResumeData(prev => ({ ...prev, [field]: value }));
  };

  const updateExperience = (index: number, field: string, value: any) => {
    const updatedExperience = [...resumeData.experience];
    updatedExperience[index] = { ...updatedExperience[index], [field]: value };
    updateData("experience", updatedExperience);
  };

  const updateBullet = (expIndex: number, bulletIndex: number, value: string) => {
    const updatedExperience = [...resumeData.experience];
    updatedExperience[expIndex].bullets[bulletIndex] = value;
    updateData("experience", updatedExperience);
  };

  const handleAIPolish = async (expIndex: number, bulletIndex: number) => {
    const currentText = resumeData.experience[expIndex].bullets[bulletIndex];
    if (!currentText || currentText.trim() === "") return;

    setPolishingIndex({ exp: expIndex, bullet: bulletIndex });
    
    try {
      const response = await fetch("/api/ai", {
        method: "POST",
        body: JSON.stringify({ task: "POLISH", content: currentText })
      });
      const data = await response.json();
      if (data.result) {
        updateBullet(expIndex, bulletIndex, data.result);
      }
    } catch (error) {
      console.error("AI Polish failed:", error);
    } finally {
      setPolishingIndex(null);
    }
  };

  const addExperience = () => {
    updateData("experience", [
      ...resumeData.experience, 
      { company: "New Company", role: "Job Title", period: "2024 - Present", bullets: ["New responsibility..."] }
    ]);
  };

  const removeExperience = (index: number) => {
    updateData("experience", resumeData.experience.filter((_, i) => i !== index));
  };

  const addBullet = (expIndex: number) => {
    const updatedExperience = [...resumeData.experience];
    updatedExperience[expIndex].bullets.push("Enhanced core system reliability...");
    updateData("experience", updatedExperience);
  };

  const removeBullet = (expIndex: number, bulletIndex: number) => {
    const updatedExperience = [...resumeData.experience];
    updatedExperience[expIndex].bullets = updatedExperience[expIndex].bullets.filter((_, i) => i !== bulletIndex);
    updateData("experience", updatedExperience);
  };

  const updateSkill = (index: number, value: string) => {
    const updatedSkills = [...resumeData.skills];
    updatedSkills[index] = value;
    updateData("skills", updatedSkills);
  };

  const addSkill = () => updateData("skills", [...resumeData.skills, "New Skill"]);
  const removeSkill = (index: number) => updateData("skills", resumeData.skills.filter((_, i) => i !== index));

  const updateEducation = (index: number, field: string, value: string) => {
    const updatedEducation = [...resumeData.education];
    updatedEducation[index] = { ...updatedEducation[index], [field]: value };
    updateData("education", updatedEducation);
  };

  const addEducation = () => {
    updateData("education", [
      ...resumeData.education,
      { school: "New Institution", degree: "Certification / Degree", year: "2024" }
    ]);
  };

  const removeEducation = (index: number) => {
    updateData("education", resumeData.education.filter((_, i) => i !== index));
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

      {/* Modern Sidebar */}
      <motion.aside 
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        style={{ width: sidebarWidth }}
        className="bg-white dark:bg-[#020617] text-foreground dark:text-white flex flex-col z-50 shadow-2xl no-print relative transition-colors duration-300 border-r border-border"
      >
        {/* Premium Resize Handle */}
        <div 
          onMouseDown={(e) => {
            isResizing.current = true;
            document.body.style.cursor = "col-resize";
            e.preventDefault();
          }}
          className="absolute top-0 -right-2 w-4 h-full cursor-col-resize z-[60] group flex items-center justify-center transition-all"
        >
          <div className="w-[1px] h-full bg-white/5 group-hover:bg-brand-mint/50 transition-colors" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-12 bg-white/10 rounded-full group-hover:bg-brand-mint/80 border border-white/5 opacity-0 group-hover:opacity-100 transition-all blur-[1px] group-hover:blur-0" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-0.5 h-8 bg-white/20 rounded-full group-hover:bg-white group-hover:shadow-[0_0_10px_#2DD4BF]" />
        </div>

        <div className="p-6 flex items-center justify-between border-b border-border">
          <Link href="/" className="flex items-center gap-2 group">
            <ChevronLeft className="w-4 h-4 text-slate-500 group-hover:text-brand-mint transition-colors" />
            <span className="font-black text-xl tracking-tighter text-foreground dark:text-white">CV<span className="text-brand-mint">PILOT</span></span>
          </Link>
          <button 
            onClick={() => setIsSettingsOpen(true)}
            className="w-9 h-9 bg-slate-100 dark:bg-white/5 rounded-xl flex items-center justify-center hover:bg-brand-mint/20 hover:text-brand-mint transition-all border border-border dark:border-white/5 group"
          >
             <Settings className="w-4 h-4 text-slate-400 group-hover:rotate-90 transition-transform duration-500" />
          </button>
        </div>

        <AnimatePresence>
          {isSettingsOpen && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsSettingsOpen(false)}
                className="absolute inset-0 bg-brand-charcoal/80 backdrop-blur-sm" 
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative w-full max-w-lg bg-white dark:bg-[#020617] border border-border dark:border-white/10 rounded-[32px] shadow-2xl overflow-hidden"
              >
                <div className="p-8 border-b border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-brand-mint/10 rounded-xl flex items-center justify-center">
                      <Settings className="w-5 h-5 text-brand-mint" />
                    </div>
                    <div>
                      <h2 className="text-xl font-black text-white tracking-tight">Document Settings</h2>
                      <p className="text-xs text-slate-500 uppercase font-bold tracking-widest mt-0.5">Control Typography & Layout</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setIsSettingsOpen(false)}
                    className="p-2 hover:bg-white/5 rounded-lg text-slate-500 transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="p-8 space-y-8 max-h-[60vh] overflow-y-auto custom-scrollbar">
                  {/* Font Family Section */}
                  <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 flex items-center gap-2">
                       <Type className="w-3 h-3" /> Typography Style
                    </label>
                    <div className="grid grid-cols-1 gap-3">
                       {[
                         { id: "modern", name: "Modern Sans (Inter)", font: "'Inter', sans-serif" },
                         { id: "serif", name: "Classic Serif (Playfair)", font: "'Playfair Display', serif" },
                         { id: "clean", name: "Clean Mono (Roboto)", font: "'Roboto Mono', monospace" }
                       ].map((font) => (
                         <button 
                           key={font.id}
                           onClick={() => setDocSettings(prev => ({ ...prev, fontFamily: font.font }))}
                           className={`w-full p-4 rounded-2xl text-left border-2 transition-all flex items-center justify-between group ${docSettings.fontFamily === font.font ? "border-brand-mint bg-brand-mint/10" : "border-white/5 bg-white/5 hover:border-white/10"}`}
                         >
                           <span className={`font-bold ${docSettings.fontFamily === font.font ? "text-brand-mint" : "text-slate-400 group-hover:text-white"}`} style={{ fontFamily: font.font }}>
                             {font.name}
                           </span>
                           {docSettings.fontFamily === font.font && <CheckCircle2 className="w-5 h-5 text-brand-mint" />}
                         </button>
                       ))}
                    </div>
                  </div>

                  {/* Font Size Section */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Base Font Size</label>
                      <span className="text-brand-mint font-black text-xs">{docSettings.fontSize}px</span>
                    </div>
                    <input 
                      type="range" 
                      min="10" 
                      max="18" 
                      step="0.5"
                      value={docSettings.fontSize}
                      onChange={(e) => setDocSettings(prev => ({ ...prev, fontSize: parseFloat(e.target.value) }))}
                      className="w-full h-1.5 bg-white/5 rounded-lg appearance-none cursor-pointer accent-brand-mint"
                    />
                    <div className="flex justify-between text-[8px] font-black text-slate-600 uppercase tracking-widest">
                       <span>Small</span>
                       <span>Standard</span>
                       <span>Large</span>
                    </div>
                  </div>

                  {/* Line Height Section */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Line Spacing</label>
                      <span className="text-brand-mint font-black text-xs">{docSettings.lineHeight}x</span>
                    </div>
                    <input 
                      type="range" 
                      min="1" 
                      max="2" 
                      step="0.1"
                      value={docSettings.lineHeight}
                      onChange={(e) => setDocSettings(prev => ({ ...prev, lineHeight: parseFloat(e.target.value) }))}
                      className="w-full h-1.5 bg-white/5 rounded-lg appearance-none cursor-pointer accent-brand-mint"
                    />
                  </div>
                </div>

                <div className="p-8 bg-brand-mint/5 border-t border-white/5">
                   <Button variant="primary" className="w-full h-14 font-black uppercase text-sm tracking-widest" onClick={() => setIsSettingsOpen(false)}>
                      Apply & Save Settings
                   </Button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Tab Navigation */}
        <div className="flex border-b border-border">
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
             <div className="space-y-10">
                {/* Personal Header */}
                <div className="space-y-4">
                  <h3 className="text-xs font-black uppercase tracking-widest text-slate-500 flex items-center gap-2">
                    Profile Identity <div className="h-px grow bg-white/5" />
                  </h3>
                  <div className="space-y-4">
                    <div className="relative group/field">
                      <input 
                        type="text" 
                        placeholder="Name"
                        value={resumeData.name || ""} 
                        onChange={(e) => updateData("name", e.target.value)}
                        className="w-full bg-slate-50 dark:bg-white/5 border border-border dark:border-white/10 rounded-xl px-4 py-3 text-sm focus:border-brand-mint focus:outline-none transition-all pr-10 text-foreground dark:text-white"
                      />
                      <button 
                        onClick={() => updateData("name", "")}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-600 hover:text-red-400 opacity-0 group-hover/field:opacity-100 transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="relative group/field">
                      <input 
                        type="text" 
                        placeholder="Job Title"
                        value={resumeData.jobTitle || ""} 
                        onChange={(e) => updateData("jobTitle", e.target.value)}
                        className="w-full bg-slate-50 dark:bg-white/5 border border-border dark:border-white/10 rounded-xl px-4 py-3 text-sm focus:border-brand-mint focus:outline-none transition-all pr-10 text-foreground dark:text-white"
                      />
                      <button 
                        onClick={() => updateData("jobTitle", "")}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-600 hover:text-red-400 opacity-0 group-hover/field:opacity-100 transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="relative group/field">
                      <textarea 
                        rows={4}
                        placeholder="Professional Summary"
                        value={resumeData.summary || ""} 
                        onChange={(e) => updateData("summary", e.target.value)}
                        className="w-full bg-slate-50 dark:bg-white/5 border border-border dark:border-white/10 rounded-xl px-4 py-3 text-xs leading-relaxed focus:border-brand-mint focus:outline-none transition-all resize-none pr-10 text-foreground dark:text-white"
                      />
                      <button 
                        onClick={() => updateData("summary", "")}
                        className="absolute right-3 top-4 text-slate-400 hover:text-red-400 opacity-0 group-hover/field:opacity-100 transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Contact Section */}
                <div className="space-y-4">
                  <h3 className="text-xs font-black uppercase tracking-widest text-slate-500 flex items-center gap-2">
                    Contact Details <div className="h-px grow bg-white/5" />
                  </h3>
                  <div className="grid grid-cols-1 gap-3">
                    <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-2">
                      <Mail className="w-4 h-4 text-slate-500" />
                      <input 
                        type="text" 
                        value={resumeData.email} 
                        onChange={(e) => updateData("email", e.target.value)}
                        className="bg-transparent border-none p-0 text-sm w-full focus:ring-0 text-slate-300"
                        placeholder="Email"
                      />
                    </div>
                    <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-2">
                      <Phone className="w-4 h-4 text-slate-500" />
                      <input 
                        type="text" 
                        value={resumeData.phone} 
                        onChange={(e) => updateData("phone", e.target.value)}
                        className="bg-transparent border-none p-0 text-sm w-full focus:ring-0 text-slate-300"
                        placeholder="Phone"
                      />
                    </div>
                    <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-2">
                      <MapPin className="w-4 h-4 text-slate-500" />
                      <input 
                        type="text" 
                        value={resumeData.location} 
                        onChange={(e) => updateData("location", e.target.value)}
                        className="bg-transparent border-none p-0 text-sm w-full focus:ring-0 text-slate-300"
                        placeholder="Location"
                      />
                    </div>
                  </div>
                </div>

                {/* Experience List */}
                <div className="space-y-6">
                  <h3 className="text-xs font-black uppercase tracking-widest text-slate-500 flex items-center justify-between">
                    Experience
                    <button onClick={addExperience} className="p-1 hover:text-brand-mint transition-colors">
                      <Plus className="w-4 h-4" />
                    </button>
                  </h3>
                  
                  { (resumeData.experience || []).map((exp: any, expIdx: number) => (
                    <div key={expIdx} className="p-4 bg-white/5 rounded-2xl space-y-4 relative group/exp">
                       <button 
                        onClick={() => removeExperience(expIdx)}
                        className="absolute top-4 right-4 text-slate-600 hover:text-red-400 opacity-0 group-hover/exp:opacity-100 transition-all"
                        title="Remove Experience"
                       >
                         <Trash2 className="w-4 h-4" />
                       </button>

                       <input 
                        value={exp.company || ""}
                        onChange={(e) => updateExperience(expIdx, "company", e.target.value)}
                        className="w-full bg-transparent border-none p-0 text-sm font-bold focus:ring-0 text-white"
                        placeholder="Company Name"
                       />
                       <input 
                        value={exp.role || ""}
                        onChange={(e) => updateExperience(expIdx, "role", e.target.value)}
                        className="w-full bg-transparent border-none p-0 text-xs text-brand-mint focus:ring-0"
                        placeholder="Role / Title"
                       />

                       <div className="space-y-3 pt-2">
                          {exp.bullets?.map((bullet: string, bullIdx: number) => (
                            <div key={bullIdx} className="flex gap-2 items-start group/bullet">
                               <textarea 
                                value={bullet || ""}
                                onChange={(e) => updateBullet(expIdx, bullIdx, e.target.value)}
                                className="flex-1 bg-white/5 border border-white/5 rounded-lg px-2 py-1.5 text-[10px] leading-relaxed resize-none focus:border-brand-mint/30 focus:outline-none text-slate-300"
                                rows={2}
                               />
                               <div className="flex flex-col gap-1 opacity-0 group-hover/bullet:opacity-100 transition-all">
                                 <button 
                                   onClick={() => handleAIPolish(expIdx, bullIdx)} 
                                   title="AI Polish" 
                                   disabled={polishingIndex !== null}
                                   className={`hover:scale-110 transition-transform ${polishingIndex?.exp === expIdx && polishingIndex?.bullet === bullIdx ? "text-brand-mint animate-pulse" : "text-brand-mint"}`}
                                 >
                                   {polishingIndex?.exp === expIdx && polishingIndex?.bullet === bullIdx ? (
                                     <Loader2 className="w-3 h-3 animate-spin" />
                                   ) : (
                                     <Zap className="w-3 h-3" />
                                   )}
                                 </button>
                                 <button onClick={() => removeBullet(expIdx, bullIdx)} className="text-slate-600 hover:text-red-400"><Trash2 className="w-3 h-3" /></button>
                               </div>
                            </div>
                          ))}
                          <button onClick={() => addBullet(expIdx)} className="text-[10px] text-slate-500 font-bold hover:text-white transition-colors flex items-center gap-1">
                            <Plus className="w-3 h-3" /> Add Responsibility
                          </button>
                       </div>
                    </div>
                  ))}
                </div>

                {/* Technical Skills */}
                <div className="space-y-4">
                  <h3 className="text-xs font-black uppercase tracking-widest text-slate-500 flex items-center justify-between">
                    Skills Arsenal
                    <button onClick={addSkill} className="p-1 hover:text-brand-mint transition-colors">
                      <Plus className="w-4 h-4" />
                    </button>
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                     {(resumeData.skills || []).map((skill: string, i: number) => (
                       <div key={i} className="flex items-center gap-2 bg-white/5 rounded-lg p-2 border border-white/5">
                          <input 
                            value={skill || ""}
                            onChange={(e) => updateSkill(i, e.target.value)}
                            className="bg-transparent border-none p-0 text-[10px] w-full focus:ring-0 text-slate-300"
                          />
                          <button 
                            onClick={() => removeSkill(i)}
                            className="text-slate-600 hover:text-red-400 transition-colors"
                            title="Remove Skill"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                       </div>
                     ))}
                  </div>
                </div>

                {/* Education Section */}
                <div className="space-y-4">
                  <h3 className="text-xs font-black uppercase tracking-widest text-slate-500 flex items-center justify-between">
                    Education
                    <button onClick={addEducation} className="p-1 hover:text-brand-mint transition-colors">
                      <Plus className="w-4 h-4" />
                    </button>
                  </h3>
                  {resumeData.education.map((edu, i) => (
                    <div key={i} className="p-4 bg-white/5 border border-white/10 rounded-2xl relative group/edu">
                       <button 
                        onClick={() => removeEducation(i)}
                        className="absolute top-3 right-3 text-slate-600 hover:text-red-400 opacity-0 group-hover/edu:opacity-100 transition-all"
                        title="Remove Education"
                       >
                         <Trash2 className="w-3 h-3" />
                       </button>
                       <input 
                        value={edu.school || ""}
                        onChange={(e) => updateEducation(i, "school", e.target.value)}
                        className="w-full bg-transparent border-none p-0 text-[11px] font-bold focus:ring-0 text-white mb-1"
                        placeholder="School / University"
                       />
                       <input 
                        value={edu.degree || ""}
                        onChange={(e) => updateEducation(i, "degree", e.target.value)}
                        className="w-full bg-transparent border-none p-0 text-[10px] focus:ring-0 text-brand-mint mb-1"
                        placeholder="Degree"
                       />
                       <input 
                        value={edu.year || ""}
                        onChange={(e) => updateEducation(i, "year", e.target.value)}
                        className="w-full bg-transparent border-none p-0 text-[9px] focus:ring-0 text-slate-500 font-bold"
                        placeholder="Year"
                       />
                    </div>
                  ))}
                </div>
             </div>
           )}

           {activeTab === "design" && (
               <div className="space-y-6">
                  <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                     <p className="text-[10px] font-bold text-slate-500 uppercase mb-4">Active Template</p>
                     <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-brand-mint/20 rounded-lg flex items-center justify-center text-brand-mint uppercase font-black text-xs">
                           {selectedTemplate[0]}
                        </div>
                        <div>
                           <p className="text-sm font-bold text-white uppercase">{selectedTemplate}</p>
                           <p className="text-[10px] text-slate-500 uppercase tracking-widest">Recruiter Verified</p>
                        </div>
                     </div>
                  </div>

                  <div className="space-y-4">
                     <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-500">Pick A Style</h3>
                     <div className="grid grid-cols-1 gap-3">
                        {[
                           { id: "modern", name: "Modern Sidebar", desc: "High-impact for Tech/Design" },
                           { id: "professional", name: "Classic Corporate", desc: "Trusted for Finance/Legal" },
                           { id: "minimal", name: "Minimalist", desc: "Clean & Focused" }
                        ].map((t) => (
                           <button 
                              key={t.id}
                              onClick={() => setSelectedTemplate(t.id)}
                              className={`w-full p-4 rounded-xl text-left border-2 transition-all group ${selectedTemplate === t.id ? "border-brand-mint bg-brand-mint/5" : "border-white/5 bg-white/5 hover:border-white/20"}`}
                           >
                              <div className="flex items-center justify-between mb-1">
                                 <span className={`text-xs font-bold uppercase tracking-widest ${selectedTemplate === t.id ? "text-brand-mint" : "text-white group-hover:text-brand-mint"}`}>{t.name}</span>
                                 {selectedTemplate === t.id && <CheckCircle2 className="w-4 h-4 text-brand-mint" />}
                              </div>
                              <p className="text-[10px] text-slate-500">{t.desc}</p>
                           </button>
                        ))}
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
                  </div>
                  <div className="space-y-4">
                     <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-500">AI Improvements</h3>
                     <div className="space-y-3">
                        {isLoadingTips ? (
                           [1,2,3].map(i => (
                              <div key={i} className="h-12 bg-white/5 animate-pulse rounded-xl" />
                           ))
                        ) : aiTips.length > 0 ? (
                           aiTips.map((tip, i) => (
                              <div key={i} className="p-3 bg-brand-mint/5 border border-brand-mint/20 rounded-xl flex gap-3">
                                 <div className="w-5 h-5 bg-brand-mint/20 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                                    <Zap className="w-3 h-3 text-brand-mint" />
                                 </div>
                                 <p className="text-[11px] text-slate-300 leading-relaxed font-medium">{tip}</p>
                              </div>
                           ))
                        ) : (
                           <div className="p-4 text-center border border-dashed border-white/10 rounded-xl">
                              <p className="text-[10px] text-slate-500">No active tips. Add more experience for deeper insights.</p>
                           </div>
                        )}
                        <button 
                           onClick={fetchAITips}
                           disabled={isLoadingTips}
                           className="w-full py-2 text-[10px] font-bold uppercase tracking-widest text-slate-500 hover:text-brand-mint transition-colors"
                        >
                           {isLoadingTips ? "Analyzing..." : "Refresh Suggestions"}
                        </button>
                     </div>

                     <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-500 mt-6">Resume Strategy</h3>
                     <button 
                      onClick={handleSmartCompact}
                      disabled={isCompacting}
                      className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-left hover:border-brand-mint/50 transition-all group"
                     >
                        <div className="flex items-center justify-between mb-1">
                           <span className="text-xs font-bold text-white group-hover:text-brand-mint transition-colors">Smart Compact</span>
                           {isCompacting ? <Loader2 className="w-4 h-4 animate-spin text-brand-mint" /> : <ChevronLeft className="w-4 h-4 text-slate-600 group-hover:translate-x-[-2px] transition-transform" />}
                        </div>
                        <p className="text-[10px] text-slate-500 leading-relaxed">Condense all roles to fit on a single page while keeping all names and dates mandatory.</p>
                     </button>

                    <div className="p-4 bg-white/5 border border-dashed border-white/10 rounded-xl">
                       <div className="flex items-center gap-2 text-slate-400 mb-2">
                          <AlertCircle className="w-3 h-3" />
                          <span className="text-[9px] font-bold uppercase tracking-widest">Growth Detected</span>
                       </div>
                       <p className="text-[10px] text-slate-500">Your resume is currently {resumeRef.current && resumeRef.current.offsetHeight > 1131 ? "multi-page" : "single-page"}. Use compact mode to slim it down.</p>
                    </div>
                 </div>
              </div>
           )}
        </div>

        <div className="p-6 border-t border-border bg-white dark:bg-[#020617] no-print">
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
      <main className="flex-1 flex flex-col relative overflow-hidden bg-background">
        {/* Header toolbar */}
        <header className="h-16 bg-background border-b border-border flex items-center justify-between px-8 z-40 no-print transition-colors duration-300">
           <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 bg-slate-100 dark:bg-white/5 border border-border rounded-lg px-3 py-1.5 cursor-pointer hover:bg-slate-200 dark:hover:bg-white/10 transition-all">
                 <Search className="w-4 h-4 text-slate-400" />
                 <span className="text-sm text-slate-500 font-medium">Search Content...</span>
              </div>
           </div>

           <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-slate-400 text-xs font-bold px-4 border-r border-border">
                 <Eye className="w-4 h-4" /> Reader View
              </div>
              <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-white/10 border border-border flex items-center justify-center font-bold text-slate-600 dark:text-white uppercase text-xs transition-colors">
                 {resumeData.name.charAt(0)}
              </div>
           </div>
        </header>

        <div className="flex-1 overflow-y-auto bg-slate-100/50 p-12 flex justify-center custom-scrollbar canvas-container">
           <motion.div 
             ref={resumeRef}
             initial={{ y: 20, opacity: 0 }}
             animate={{ y: 0, opacity: 1 }}
             style={{ 
                fontFamily: docSettings.fontFamily,
                fontSize: `${docSettings.fontSize}px`,
                lineHeight: docSettings.lineHeight
             }}
             className={`resume-paper w-[800px] h-fit min-h-[1132px] bg-white shadow-[0_10px_40px_rgba(0,0,0,0.1)] rounded-sm overflow-hidden flex ${selectedTemplate === 'modern' ? 'flex-row' : 'flex-col'}`}
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

                     <div className="space-y-4">
                        <h2 className="text-xs font-black uppercase tracking-widest text-slate-400 border-b border-slate-200 pb-2">Education</h2>
                        <div className="space-y-4">
                           {resumeData.education.map((edu, i) => (
                             <div key={i} className="space-y-0.5">
                                <h3 className="text-[10px] font-bold text-slate-800 uppercase">{edu.school}</h3>
                                <p className="text-[9px] text-brand-mint font-bold italic">{edu.degree}</p>
                                <p className="text-[8px] text-slate-400 font-bold">{edu.year}</p>
                             </div>
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
                                   <h3>{exp.role} <span className="text-slate-300 font-light mx-2">|</span> {exp.company}</h3>
                                   <span className="text-xs text-slate-400">{exp.period}</span>
                                </div>
                                <ul className="list-disc list-inside text-slate-600 space-y-2 ml-2 font-medium">
                                   {exp.bullets?.map((bullet: string, bIdx: number) => (
                                     <li key={bIdx}>{bullet}</li>
                                   ))}
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
                      <h1 className="text-4xl font-black text-slate-900 tracking-tighter">{resumeData.name || ""}</h1>
                      <div className="flex justify-center gap-4 text-xs font-bold text-slate-500 uppercase tracking-widest">
                         <span>{resumeData.email || ""}</span>
                         <span>•</span>
                         <span>{resumeData.phone || ""}</span>
                         <span>•</span>
                         <span>{resumeData.location || ""}</span>
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
                                    <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">{exp.company}</p>
                                 </div>
                                 <span className="text-xs">{exp.period}</span>
                              </div>
                              <ul className="list-disc list-inside text-sm text-slate-600 space-y-2 ml-4 font-medium">
                                 {exp.bullets?.map((bullet: string, bIdx: number) => (
                                   <li key={bIdx}>{bullet}</li>
                                 ))}
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

                   <section className="space-y-4">
                      <h2 className="text-xs font-black uppercase tracking-widest text-slate-400 border-b border-slate-100 pb-1">Education Journey</h2>
                      <div className="grid grid-cols-2 gap-8">
                         {resumeData.education.map((edu, i) => (
                           <div key={i} className="space-y-1">
                              <h3 className="text-sm font-bold text-slate-900">{edu.school}</h3>
                              <p className="text-xs text-brand-mint font-bold">{edu.degree}</p>
                              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{edu.year}</p>
                           </div>
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
