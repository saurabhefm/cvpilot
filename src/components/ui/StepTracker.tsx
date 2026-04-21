"use client";

import React from "react";
import { Check, ArrowRight, ShieldCheck, MapPin, Cpu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Step {
  id: number;
  label: string;
}

interface StepTrackerProps {
  currentStep: number;
  steps: Step[];
  onStepClick: (stepId: number) => void;
}

const StepTracker = ({ currentStep, steps, onStepClick }: StepTrackerProps) => {
  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] w-full max-w-2xl px-4">
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-[#0F172A]/90 backdrop-blur-xl border border-white/10 rounded-full p-2 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex items-center justify-between"
      >
        <div className="flex items-center gap-1 px-2">
          {steps.map((step, idx) => (
            <React.Fragment key={step.id}>
              <button
                onClick={() => onStepClick(step.id)}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300
                  ${currentStep === step.id 
                    ? "bg-brand-mint text-brand-charcoal font-bold" 
                    : currentStep > step.id 
                    ? "text-brand-mint/60 hover:text-brand-mint"
                    : "text-white/40 hover:text-white"}
                `}
              >
                <div className={`
                  w-6 h-6 rounded-full flex items-center justify-center text-[10px] border
                  ${currentStep === step.id 
                    ? "bg-brand-charcoal/10 border-transparent" 
                    : currentStep > step.id
                    ? "bg-brand-mint/10 border-brand-mint/30"
                    : "bg-white/5 border-white/10"}
                `}>
                  {currentStep > step.id ? <Check className="w-3 h-3" /> : step.id}
                </div>
                <span className="text-xs uppercase tracking-widest hidden sm:block whitespace-nowrap">
                  {step.label}
                </span>
              </button>
              {idx < steps.length - 1 && (
                <div className="w-4 h-px bg-white/10" />
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="flex items-center gap-2 pl-4 pr-2 border-l border-white/10 ml-2">
           <AnimatePresence mode="wait">
             <motion.div
               key={currentStep}
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               exit={{ opacity: 0, x: -20 }}
               className="text-[10px] text-white/40 font-bold uppercase tracking-tighter"
             >
               {currentStep === 1 && "Start here"}
               {currentStep === 2 && "Choose Look"}
               {currentStep === 3 && "Optimizing"}
             </motion.div>
           </AnimatePresence>
           <div className="w-8 h-8 bg-brand-mint rounded-full flex items-center justify-center animate-pulse shadow-[0_0_15px_rgba(16,185,129,0.4)]">
             <ArrowRight className="w-4 h-4 text-brand-charcoal" />
           </div>
        </div>
      </motion.div>
    </div>
  );
};

export default StepTracker;
