"use client";

import React, { useState } from "react";
import { X, Sparkles, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { motion, AnimatePresence } from "framer-motion";

interface SnippetModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  placeholder: string;
  actionLabel: string;
}

const SnippetModal = ({ isOpen, onClose, title, placeholder, actionLabel }: SnippetModalProps) => {
  const [input, setInput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleAction = () => {
    setIsProcessing(true);
    // Simulate AI processing
    setTimeout(() => {
      setIsProcessing(false);
      setResult(`This is your optimized ${title.toLowerCase()} result. It has been refined for impact and clarity.`);
    }, 2000);
  };

  const reset = () => {
    setInput("");
    setResult(null);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={reset}
            className="absolute inset-0 bg-brand-charcoal/80 backdrop-blur-sm" 
          />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg bg-white rounded-[32px] overflow-hidden shadow-2xl"
          >
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-brand-charcoal">{title}</h3>
                  <p className="text-slate-500 text-sm mt-1">AI-powered optimization for your resume snippets.</p>
                </div>
                <button onClick={reset} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                  <X className="w-6 h-6 text-slate-400" />
                </button>
              </div>

              {!result ? (
                <div className="space-y-6">
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={placeholder}
                    className="w-full h-40 bg-slate-50 border border-slate-100 rounded-2xl p-4 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-mint/20 transition-all resize-none"
                  />
                  <Button 
                    onClick={handleAction} 
                    disabled={!input || isProcessing}
                    className="w-full h-14 gap-2"
                  >
                    {isProcessing ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <Sparkles className="w-5 h-5" />
                    )}
                    {actionLabel}
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="p-6 bg-brand-mint/5 border border-brand-mint/20 rounded-2xl">
                    <p className="text-brand-charcoal font-medium leading-relaxed italic">"{result}"</p>
                  </div>
                  <div className="flex gap-4">
                    <Button variant="outline" className="flex-1" onClick={() => setResult(null)}>
                      Try Again
                    </Button>
                    <Button variant="primary" className="flex-1" onClick={reset}>
                      Copy & Close
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default SnippetModal;
