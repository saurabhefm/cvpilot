"use client";

import React from "react";
import Link from "next/link";
import { FileText, Code, Globe, MessageSquare } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-brand-charcoal text-white py-20 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12">
          {/* Logo & Brand */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-brand-mint rounded flex items-center justify-center">
                <FileText className="text-white w-5 h-5" />
              </div>
              <span className="text-xl font-bold tracking-tight">CVPilot<span className="text-brand-mint">.</span></span>
            </Link>
            <p className="text-slate-400 text-sm max-w-xs leading-relaxed italic">
              Empowering professionals with AI-driven resume optimization and career tools designed for the modern job market.
            </p>
            <div className="flex gap-4 mt-8">
               <SocialLink href="#" icon={<Globe className="w-5 h-5" />} />
               <SocialLink href="#" icon={<MessageSquare className="w-5 h-5" />} />
               <SocialLink href="#" icon={<Code className="w-5 h-5" />} />
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest mb-6">Product</h4>
            <ul className="space-y-4">
              <FooterLink href="#tailor">AI Builder</FooterLink>
              <FooterLink href="#hero">ATS Checker</FooterLink>
              <FooterLink href="#tailor">Templates</FooterLink>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest mb-6">Resources</h4>
            <ul className="space-y-4">
              <FooterLink href="#summary">Career Blog</FooterLink>
              <FooterLink href="#features">CV Examples</FooterLink>
              <FooterLink href="#hero">Help Center</FooterLink>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest mb-6">Legal</h4>
            <ul className="space-y-4">
              <FooterLink href="#">Privacy Policy</FooterLink>
              <FooterLink href="#">Terms of Service</FooterLink>
            </ul>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
           <p className="text-slate-500 text-xs">© 2026 CVPilot AI. All rights reserved.</p>
           <div className="flex gap-8">
              <p className="text-slate-500 text-xs font-medium">Built with Precision for High-Achievers.</p>
           </div>
        </div>
      </div>
    </footer>
  );
};

const FooterLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <li>
    <Link href={href} className="text-slate-400 hover:text-brand-mint transition-colors text-sm font-medium italic">
      {children}
    </Link>
  </li>
);

const SocialLink = ({ href, icon }: { href: string; icon: React.ReactNode }) => (
  <Link href={href} className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center text-slate-400 hover:bg-brand-mint hover:text-white transition-all">
    {icon}
  </Link>
);

export default Footer;
