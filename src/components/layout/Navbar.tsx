"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { 
  ChevronDown, 
  FileText, 
  ShieldCheck, 
  Lightbulb, 
  Layout, 
  PenTool,
  ArrowRight
} from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { motion, AnimatePresence } from "framer-motion";
import { 
  SignInButton, 
  SignUpButton, 
  UserButton, 
  useUser 
} from "@clerk/nextjs";

const Navbar = () => {
  // const { isLoaded: clerkLoaded, isSignedIn: clerkSignedIn } = useUser();
  // Clerk Auth disabled for public testing
  const isLoaded = true;
  const isSignedIn = true;
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const toggleMenu = (menu: string) => {
    setActiveMenu(activeMenu === menu ? null : menu);
  };

  const scrollToSection = (id: string) => {
    // If not on home page, navigate to home page with hash
    if (window.location.pathname !== "/") {
      window.location.href = `/#${id}`;
      return;
    }

    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Navbar height
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      setActiveMenu(null);
    }
  };
  const megaMenus = {
    resume: {
      left: [
        { title: "AI Builder", icon: <PenTool className="w-5 h-5" />, href: "/builder" },
        { title: "ATS Checker", icon: <ShieldCheck className="w-5 h-5" />, href: "/checker" },
        { title: "CV Examples", icon: <Lightbulb className="w-5 h-5" />, href: "/examples" },
      ],
      middle: [
        { title: "Premium Templates", href: "/templates" },
        { title: "Writing Guides", href: "/guides" },
        { title: "Resume Formats", href: "/formats" },
      ],
      right: {
        title: "ATS-Friendly Preview",
        preview: "/preview-card.png" // Placeholder or illustration
      }
    }
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 border-b border-border backdrop-blur-md transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center gap-12">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-brand-mint rounded-lg flex items-center justify-center">
                <FileText className="text-white w-6 h-6" />
              </div>
              <span className="text-2xl font-bold tracking-tight text-foreground">
                CVPilot<span className="text-brand-mint">.</span>
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              <div 
                className="relative group"
              >
                <button 
                  onClick={() => toggleMenu("resume")}
                  className="flex items-center gap-1 text-sm font-medium text-foreground/80 hover:text-brand-mint transition-colors"
                >
                  Resume <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${activeMenu === "resume" ? "rotate-180" : ""}`} />
                </button>

                {/* Mega Menu */}
                <AnimatePresence>
                  {activeMenu === "resume" && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-0 mt-4 w-[700px] bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden text-slate-900"
                    >
                      <div className="grid grid-cols-3 gap-0">
                        {/* Left Column */}
                        <div className="p-8 bg-slate-50 border-r border-slate-200">
                          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-6">Tools</h3>
                          <div className="space-y-6">
                            {megaMenus.resume.left.map((item) => (
                              <Link 
                                key={item.title} 
                                href={item.href} 
                                onClick={() => setActiveMenu(null)}
                                className="flex items-center gap-4 group/item"
                              >
                                <div className="p-2 bg-white rounded-lg border border-slate-200 text-slate-600 group-hover/item:text-brand-mint group-hover/item:border-brand-mint transition-colors">
                                  {item.icon}
                                </div>
                                <span className="font-semibold group-hover/item:text-brand-mint transition-colors">{item.title}</span>
                              </Link>
                            ))}
                          </div>
                        </div>

                        {/* Middle Column */}
                        <div className="p-8">
                          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-6">Resources</h3>
                          <div className="space-y-4">
                            {megaMenus.resume.middle.map((item) => (
                              <Link 
                                key={item.title} 
                                href={item.href} 
                                onClick={() => setActiveMenu(null)}
                                className="block text-sm font-medium text-slate-600 hover:text-brand-mint transition-colors"
                              >
                                {item.title}
                              </Link>
                            ))}
                          </div>
                        </div>

                        {/* Right Column */}
                        <div className="p-8 bg-brand-charcoal text-white flex flex-col justify-between">
                          <div>
                            <h3 className="text-xs font-bold uppercase tracking-wider text-white/40 mb-4">{megaMenus.resume.right.title}</h3>
                            <div className="bg-white/10 rounded-xl aspect-[3/4] p-4 flex flex-col gap-2">
                              <div className="h-2 w-3/4 bg-white/20 rounded" />
                              <div className="h-2 w-full bg-white/20 rounded" />
                              <div className="h-2 w-1/2 bg-white/20 rounded" />
                              <div className="mt-4 grow border-2 border-dashed border-white/20 rounded flex items-center justify-center">
                                <Layout className="w-8 h-8 text-white/20" />
                              </div>
                            </div>
                          </div>
                          <button 
                            onClick={() => {
                              scrollToSection("templates");
                              setActiveMenu(null);
                            }}
                            className="mt-6 flex items-center justify-between text-sm font-bold text-brand-mint group/link w-full text-left"
                          >
                            Explore Templates <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <button 
                onClick={() => scrollToSection("summary")}
                className="text-sm font-medium text-foreground/80 hover:text-brand-mint transition-colors underline-offset-4 hover:underline"
              >
                Cover Letter
              </button>
              <button 
                onClick={() => scrollToSection("pricing")}
                className="text-sm font-medium text-foreground/80 hover:text-brand-mint transition-colors underline-offset-4 hover:underline"
              >
                Pricing
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4 lg:gap-6">
            <ThemeToggle />
            <div className="h-6 w-px bg-border hidden sm:block" />
            <ATSBadge />
            
            {/* {isLoaded && !isSignedIn && (
              <div className="hidden sm:flex items-center gap-6">
                <SignInButton mode="modal">
                  <button className="text-sm font-semibold text-foreground/80 hover:text-foreground transition-colors">
                    Log in
                  </button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <Button size="md" className="shadow-lg shadow-brand-mint/10">
                    Get Started
                  </Button>
                </SignUpButton>
              </div>
            )} */}

            {isLoaded && isSignedIn && (
              <div className="flex items-center gap-4">
                <Link href="/builder">
                  <Button variant="outline" size="sm" className="hidden lg:flex border-brand-mint/20 text-brand-mint hover:bg-brand-mint/5">
                    My Resumes
                  </Button>
                </Link>
                {/* <UserButton 
                  appearance={{
                    elements: {
                      userButtonAvatarBox: "w-10 h-10 border-2 border-brand-mint/20 hover:border-brand-mint transition-all",
                      userButtonPopoverCard: "bg-surface border border-border shadow-2xl",
                      userButtonPopoverActionButtonText: "text-foreground font-medium",
                    }
                  }}
                /> */}
                <div className="w-10 h-10 rounded-full bg-brand-mint/10 border-2 border-brand-mint/20 flex items-center justify-center text-brand-mint font-bold">G</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

const ATSBadge = () => {
  const [score, setScore] = useState<number | null>(null);

  useEffect(() => {
    const checkScore = () => {
      const stored = localStorage.getItem("ats_score");
      if (stored) setScore(parseInt(stored));
    };

    checkScore();
    window.addEventListener("storage", checkScore);
    window.addEventListener("storage_update", checkScore);
    return () => {
      window.removeEventListener("storage", checkScore);
      window.removeEventListener("storage_update", checkScore);
    };
  }, []);

  if (score === null) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="hidden lg:flex items-center gap-3 px-4 py-1.5 bg-white/5 border border-white/10 rounded-full group cursor-default hover:bg-brand-mint/5 hover:border-brand-mint/20 transition-all"
    >
      <div className="relative w-6 h-6">
        <svg className="w-full h-full transform -rotate-90">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2.5" fill="transparent" className="text-white/5" />
          <motion.circle 
            cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2.5" fill="transparent" strokeDasharray={62.83} 
            initial={{ strokeDashoffset: 62.83 }}
            animate={{ strokeDashoffset: 62.83 - (62.83 * score / 100) }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="text-brand-mint" 
          />
        </svg>
      </div>
      <div className="flex flex-col leading-none">
        <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 group-hover:text-brand-mint/60 transition-colors">ATS Match</span>
        <span className="text-sm font-black text-foreground">{score}%</span>
      </div>
    </motion.div>
  );
};

export default Navbar;
