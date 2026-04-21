"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lightbulb, Search, Filter, ArrowRight, CircleUser, Check, Heart, Trophy, Code, Briefcase, Stethoscope, Palette } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

const MiniPreview = ({ type, data }: { type: string, data: any }) => {
  const commonClasses = "w-[1240px] h-[1754px] bg-white shadow-2xl border border-slate-200 overflow-hidden text-slate-800 p-16 flex flex-col shrink-0 transform scale-[0.28] origin-center";
  
  if (type === 'modern') {
    return (
      <div className={commonClasses}>
        <div className="flex h-full w-full gap-16">
          <div className="w-[35%] h-full bg-slate-900 text-white p-12 flex flex-col gap-12">
             <div className="w-48 h-48 rounded-full bg-slate-700 mx-auto flex items-center justify-center border-4 border-white/20">
                <CircleUser className="w-24 h-24 text-slate-400" />
             </div>
             <div className="space-y-8">
                <div className="space-y-4">
                  <p className="font-black text-brand-mint uppercase text-[24px] tracking-widest border-b-2 border-brand-mint/30 pb-2">Contact</p>
                  <div className="space-y-2 text-[18px] opacity-70">
                    <p>+1 555-010-99</p>
                    <p>hello@cvpilot.ai</p>
                    <p>San Francisco, CA</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <p className="font-black text-brand-mint uppercase text-[24px] tracking-widest border-b-2 border-brand-mint/30 pb-2">Hard Skills</p>
                  <div className="flex flex-wrap gap-2">
                     {['React', 'Node', 'AWS', 'Python', 'Go', 'Docker', 'K8s', 'SQL'].map(s => <div key={s} className="px-3 py-1.5 bg-white/10 rounded-md text-[18px]">{s}</div>)}
                  </div>
                </div>
                <div className="space-y-4">
                  <p className="font-black text-brand-mint uppercase text-[24px] tracking-widest border-b-2 border-brand-mint/30 pb-2">Languages</p>
                  <div className="space-y-2 text-[18px] opacity-70">
                    <p>English (Native)</p>
                    <p>Spanish (Fluent)</p>
                  </div>
                </div>
             </div>
          </div>
          <div className="w-[65%] h-full flex flex-col gap-12 p-8">
             <div className="space-y-2">
               <h4 className="text-[72px] font-black text-slate-900 leading-none tracking-tighter">{data.name}</h4>
               <p className="text-[32px] text-brand-mint font-bold uppercase tracking-[0.3em]">{data.role}</p>
             </div>
             <div className="space-y-8">
               <div className="space-y-4">
                 <p className="font-black border-b-4 border-slate-100 pb-2 text-[26px] uppercase tracking-widest text-slate-400">Professional Experience</p>
                 {[1,2,3].map(i => (
                   <div key={i} className="space-y-3">
                      <div className="flex justify-between items-center font-black text-slate-900 text-[24px]">
                        <span>{data.company} - {i === 1 ? 'Senior' : 'Adv.'} Lead Engineer</span>
                        <span className="opacity-40 text-[18px]">202{4-i} - PRESENT</span>
                      </div>
                      <ul className="text-slate-500 text-[18px] leading-relaxed list-disc ml-6 space-y-1">
                        <li>{data.highlights}.</li>
                        <li>Automated CI/CD pipelines reducing deployment time by 45%.</li>
                        <li>Mentored a team of 10+ junior developers across multiple projects.</li>
                      </ul>
                   </div>
                 ))}
               </div>
               <div className="space-y-4 pt-4">
                 <p className="font-black border-b-4 border-slate-100 pb-2 text-[26px] uppercase tracking-widest text-slate-400">Education & Certificates</p>
                 <div className="flex justify-between items-baseline">
                    <p className="font-bold text-slate-900 text-[22px]">Stanford University • BSCS</p>
                    <p className="text-slate-400 text-[18px]">Class of 2018</p>
                 </div>
                 <p className="text-slate-500 text-[18px]">AWS Certified Solutions Architect Professional</p>
               </div>
             </div>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'professional') {
    return (
      <div className={commonClasses + " font-serif"}>
        <div className="text-center space-y-4 pb-8 border-b-4 border-slate-900 uppercase">
           <h4 className="text-[64px] font-bold text-slate-900 tracking-tight">{data.name}</h4>
           <div className="text-slate-500 font-sans text-[20px] font-bold tracking-[0.5em]">mharper@email.pro | 555-010-999 | NY, NY</div>
        </div>
        <div className="space-y-12 mt-12">
          {[
            { t: 'PROFESSIONAL SUMMARY', c: data.highlights + " and managed complex portfolios with 99.9% accuracy rate." },
            { t: 'EXPERIENCE', c: data.highlights },
            { t: 'ACADEMIC BACKGROUND', c: "University of Pennsylvania - Wharton School" },
            { t: 'ADDITIONAL INFORMATION', c: "Financial Modeling, VBA, SQL, Bloomberg Terminal Expert" }
          ].map((sec, i) => (
            <div key={i} className="space-y-6">
              <p className="font-bold border-b-2 border-slate-300 pb-2 text-[26px] uppercase tracking-tighter text-slate-900">{sec.t}</p>
              {[1,2].map(j => (
                <div key={j} className="space-y-3 font-sans">
                   <div className="flex justify-between text-[22px]">
                      <span className="font-black italic text-slate-800">{data.company} — {j === 1 ? 'Senior Associate' : 'Analyst'}</span>
                      <span className="text-slate-400 font-bold tracking-widest">201{i+j} - 202{i+j}</span>
                   </div>
                   <p className="text-slate-600 leading-relaxed text-[19px] font-medium pr-10">{sec.c}. Optimized workflows saving 500+ man-hours annually.</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (type === 'creative') {
    return (
      <div className={commonClasses + " p-0"}>
        <div className="w-full h-[25%] bg-[#0f172a] flex flex-col justify-center px-16 gap-2 relative">
           <div className="absolute -top-32 -right-32 w-128 h-128 bg-brand-mint/20 blur-[120px] rounded-full" />
           <h4 className="text-[72px] font-black text-white leading-none tracking-tighter uppercase">{data.name}</h4>
           <p className="text-[28px] text-brand-mint font-bold uppercase tracking-[0.5em] italic">{data.role}</p>
        </div>
        <div className="p-16 flex-1 flex flex-col gap-12 bg-slate-50">
           <div className="grid grid-cols-2 gap-12">
              <div className="p-8 bg-white rounded-3xl shadow-xl border border-brand-mint/10 space-y-6">
                 <p className="text-[24px] font-black text-brand-mint uppercase tracking-widest border-b-2 border-brand-mint/10 pb-4">Specialized In</p>
                 <div className="flex flex-wrap gap-3">
                    {['UX Design', 'Motion', 'Swift', 'React', 'AI', 'Storyboarding'].map(s => <span key={s} className="px-4 py-2 bg-brand-mint/10 text-brand-mint rounded-lg text-[18px] font-black">{s}</span>)}
                 </div>
              </div>
              <div className="p-8 bg-white rounded-3xl shadow-xl border border-brand-mint/10 space-y-4 flex flex-col justify-center">
                 {[1,2,3,4].map(k => <div key={k} className="h-2 w-full bg-slate-100 rounded-full" />)}
              </div>
           </div>
           <div className="space-y-6 px-4">
              <p className="text-[32px] font-black text-slate-800 uppercase tracking-tighter">Impact & Vision</p>
              {[1,2].map(m => (
                <p key={m} className="text-[22px] text-slate-500 leading-relaxed italic border-l-8 border-brand-mint/30 pl-8 pr-12">
                  {data.highlights}. Dedicated to pushing the boundaries of what is possible through human-centered design.
                </p>
              ))}
           </div>
        </div>
      </div>
    );
  }

  return (
    <div className={commonClasses + " font-serif items-center"}>
      <div className="space-y-4 border-b-2 border-slate-100 pb-12 w-full text-center uppercase">
         <h4 className="text-[64px] font-medium text-slate-900 tracking-[0.2em]">{data.name}</h4>
         <p className="text-slate-400 text-[24px] font-sans font-bold tracking-[0.5em]">{data.role}</p>
      </div>
      <div className="w-full space-y-12 text-left pt-12 px-12 uppercase">
         {['Summary', 'History', 'Skills'].map(label => (
           <div key={label} className="space-y-6">
              <p className="text-[28px] font-black text-slate-900 tracking-widest border-b-2 border-slate-100 pb-2">{label}</p>
              <p className="text-slate-600 text-[18px] leading-[1.8] font-sans normal-case pr-20">{data.highlights}. Continuous improvement focused individual with deep expertise in managing complex workflows and delivering high-quality outputs across multiple platforms.</p>
           </div>
         ))}
      </div>
    </div>
  );
};

const EXAMPLES_DATA = [
  {
    id: 1,
    title: "Senior Software Engineer",
    company: "Google",
    exp: "8 Years Exp",
    category: "Tech",
    template: "modern",
    name: "ALEX RIVERA",
    role: "Senior Product Director",
    highlights: "Led 15% revenue growth by optimizing cross-platform user funnels."
  },
  {
    id: 2,
    title: "Investment Banker",
    company: "Goldman Sachs",
    exp: "5 Years Exp",
    category: "Finance",
    template: "professional",
    name: "MORGAN HARPER",
    role: "Senior Analyst",
    highlights: "Executed $15B+ in technology sector M&A transactions."
  },
  {
    id: 3,
    title: "ICU Registered Nurse",
    company: "Mayo Clinic",
    exp: "6 Years Exp",
    category: "Healthcare",
    template: "minimal",
    name: "JORDAN BLAKE",
    role: "Registered Nurse",
    highlights: "Managed high-acuity patient care with zero incident rate."
  },
  {
    id: 4,
    title: "Lead UI/UX Designer",
    company: "Airbnb",
    exp: "7 Years Exp",
    category: "Creative",
    template: "creative",
    name: "CASEY CHEN",
    role: "Visual Storyteller",
    highlights: "Redesigned core booking flow improving conversion by 22%."
  },
  {
    id: 5,
    title: "Chief of Staff",
    company: "Stripe",
    exp: "10 Years Exp",
    category: "Executive",
    template: "modern",
    name: "SAMANTHA REED",
    role: "Chief of Staff",
    highlights: "Managed executive operations for 2,000+ employee organization."
  },
  {
    id: 6,
    title: "Full Stack Developer",
    company: "Vercel",
    exp: "4 Years Exp",
    category: "Tech",
    template: "creative",
    name: "LIAM NGUYEN",
    role: "Frontend Architect",
    highlights: "Optimized Next.js builds reducing load times by 40%."
  }
];

const ExamplesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Roles");
  const categories = ["All Roles", "Tech", "Finance", "Healthcare", "Creative", "Executive"];

  const filteredExamples = useMemo(() => {
    return EXAMPLES_DATA.filter(ex => {
      const matchesSearch = ex.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           ex.company.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "All Roles" || ex.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);
  
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
          <div className="flex flex-col lg:flex-row gap-6 mb-16">
            <div className="flex-1 relative group">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-500 group-focus-within:text-brand-mint transition-colors" />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search job titles (e.g., Software Engineer)..." 
                className="w-full bg-white/5 border border-white/10 rounded-3xl py-5 pl-14 pr-4 text-lg focus:outline-none focus:border-brand-mint/50 transition-all font-medium placeholder:text-slate-600"
              />
            </div>
            <div className="flex items-center gap-3 overflow-x-auto pb-2 no-scrollbar">
              {categories.map((cat) => (
                <button 
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-8 py-5 rounded-3xl text-sm font-black uppercase tracking-widest transition-all whitespace-nowrap border-2 ${selectedCategory === cat ? "bg-brand-mint text-white border-brand-mint shadow-[0_0_30px_rgba(16,185,129,0.4)]" : "bg-white/5 border-white/10 text-slate-500 hover:border-white/20 hover:text-white"}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Examples Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            <AnimatePresence mode="popLayout">
              {filteredExamples.map((item) => (
                <motion.div 
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="group"
                >
                  <div className="rounded-[40px] overflow-hidden bg-[#0f172a] border border-white/5 p-4 transition-all duration-500 hover:border-brand-mint/30 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] cursor-pointer relative">
                     <div className="aspect-[3/4] rounded-[32px] overflow-hidden bg-slate-800/50 flex items-center justify-center relative p-2 border border-white/5">
                        <div className="w-full h-full relative flex items-center justify-center overflow-hidden rounded-[24px]">
                           <MiniPreview type={item.template} data={item} />
                        </div>
                        
                        <div className="absolute inset-0 bg-brand-charcoal/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center backdrop-blur-[4px] z-20">
                           <Link href="/builder" className="w-[80%] transform translate-y-4 group-hover:translate-y-0 transition-transform">
                             <Button className="w-full h-14 font-black gap-2 text-md rounded-2xl shadow-2xl">
                               Use This Context <ArrowRight className="w-5 h-5" />
                             </Button>
                           </Link>
                        </div>
                     </div>
                     <div className="mt-8 px-4 pb-4">
                        <div className="flex justify-between items-start mb-2">
                           <h3 className="text-xl font-black group-hover:text-brand-mint transition-colors tracking-tight leading-none">{item.title}</h3>
                           <span className="p-1.5 bg-brand-mint/10 rounded-lg text-brand-mint">
                              {item.category === 'Tech' && <Code className="w-4 h-4" />}
                              {item.category === 'Finance' && <Briefcase className="w-4 h-4" />}
                              {item.category === 'Healthcare' && <Stethoscope className="w-4 h-4" />}
                              {item.category === 'Creative' && <Palette className="w-4 h-4" />}
                              {item.category === 'Executive' && <Trophy className="w-4 h-4" />}
                           </span>
                        </div>
                        <p className="text-xs text-slate-500 font-bold uppercase tracking-[0.2em]">{item.company} • {item.exp}</p>
                     </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filteredExamples.length === 0 && (
            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               className="text-center py-32 space-y-4"
            >
               <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-8 border border-white/10">
                  <Search className="w-10 h-10 text-slate-600" />
               </div>
               <h3 className="text-2xl font-black text-white">No matches found</h3>
               <p className="text-slate-500 max-w-sm mx-auto">We couldn't find any CV examples matching "{searchQuery}". Try a different role or category.</p>
               <Button variant="outline" onClick={() => {setSearchQuery(""); setSelectedCategory("All Roles")}} className="mt-8">
                  Reset Filters
               </Button>
            </motion.div>
          )}

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
