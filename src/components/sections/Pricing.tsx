import React, { useState } from "react";
import { Check, CreditCard, Wallet, Apple, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";

const plans = [
  {
    name: "Free Plan",
    price: "0",
    period: "7-day validity",
    description: "Perfect for a quick update to start your job hunt.",
    features: [
      "Basic Templates",
      "PDF Downloads (with branding)",
      "Standard ATS Check",
      "7-day access duration"
    ],
    buttonText: "Start for Free",
    recommended: false
  },
  {
    name: "Pro Plan",
    price: "663",
    period: "/mo (billed quarterly)",
    description: "The ultimate power-up for serious career growth.",
    features: [
      "150 Resumes & Letters",
      "Real-time Content Suggestions",
      "Advanced ATS Scrutiny",
      "No CVPilot Branding",
      "Multi-device Sync"
    ],
    buttonText: "Upgrade to Pro",
    recommended: true
  }
];

const Pricing = () => {
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      alert("Redirecting to Stripe secure checkout...");
      setIsCheckingOut(false);
    }, 1500);
  };

  return (
    <section className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-[#0F172A] mb-4">Invest in Your Career</h2>
          <p className="text-slate-500 text-lg">Choose the plan that fits your professional needs.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className={`
                relative p-10 rounded-[32px] border-2 transition-all duration-300
                ${plan.recommended ? "border-brand-mint bg-slate-50 shadow-xl" : "border-slate-100 bg-white"}
              `}
            >
              {plan.recommended && (
                <div className="absolute top-0 right-10 -translate-y-1/2 bg-brand-mint text-white px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest">
                  Recommended
                </div>
              )}
              
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-[#0F172A] mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-black text-[#0F172A]">₹{plan.price}</span>
                  <span className="text-slate-400 font-medium">{plan.period}</span>
                </div>
                <p className="mt-4 text-slate-500 text-sm leading-relaxed">{plan.description}</p>
              </div>

              <div className="space-y-4 mb-10">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-5 h-5 bg-brand-mint/10 rounded-full flex items-center justify-center text-brand-mint">
                      <Check className="w-3 h-3" />
                    </div>
                    <span className="text-slate-700 font-medium text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              <Button 
                variant={plan.recommended ? "primary" : "secondary"} 
                className="w-full h-14 text-lg"
                onClick={handleCheckout}
                disabled={isCheckingOut}
              >
                {isCheckingOut ? <Loader2 className="w-5 h-5 animate-spin" /> : plan.buttonText}
              </Button>
            </motion.div>
          ))}
        </div>

        {/* Payment Icons */}
        <div className="mt-20 flex flex-col items-center">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Secure Payments via</p>
          <div className="flex gap-8 opacity-20 hover:opacity-100 transition-opacity duration-500 grayscale hover:grayscale-0">
             {/* Simple SVG Placeholders for major providers */}
             <PaymentIcon name="Visa" />
             <PaymentIcon name="Mastercard" />
             <PaymentIcon name="Amex" />
             <PaymentIcon name="PayPal" />
          </div>
        </div>
      </div>
    </section>
  );
};

const PaymentIcon = ({ name }: { name: string }) => (
  <div className="flex items-center gap-2 group cursor-default">
    <div className="w-12 h-8 bg-slate-200 rounded flex items-center justify-center font-black text-[10px] text-slate-500 border border-slate-300">
      {name.toUpperCase()}
    </div>
  </div>
)

export default Pricing;
