"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
const MotionDiv = motion.div as any;
import { Check, Loader2, Zap } from "lucide-react";
import { useProfile } from "@/lib/useProfile";
import { useRouter } from "next/navigation";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function Pricing() {
  const [isYearly, setIsYearly] = useState(false);
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const { profile } = useProfile();
  const router = useRouter();

  const plans = [
    {
      name: "Starter",
      id: "starter",
      description: "Perfect for local cafes",
      price: isYearly ? "$49" : "$59",
      features: ["Up to 10 3D Models", "Basic AR Viewer", "Core Analytics", "Email Support"],
      highlight: false,
    },
    {
      name: "Pro",
      id: "pro",
      description: "Best for growing restaurants",
      price: isYearly ? "$99" : "$129",
      features: [
        "Unlimited 3D Models",
        "Custom Branding",
        "Advanced Analytics",
        "AI Menu Suggestions",
        "Priority Support",
      ],
      highlight: true,
    },
    {
      name: "Premium",
      id: "premium",
      description: "For large chains & franchises",
      price: isYearly ? "$199" : "$249",
      features: [
        "White Label Solution",
        "API & SDK Access",
        "Dedicated Manager",
        "Custom 3D Scanning",
        "SLA Guarantee",
      ],
      highlight: false,
    },
  ];

  async function handleCheckout(planName: string) {
    if (!profile) {
      router.push("/login");
      return;
    }

    setLoadingPlan(planName);

    try {
      const response = await fetch("/api/razorpay/subscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          planId: planName,
          restaurantName: profile.restaurant_name,
        }),
      });

      const data = await response.json();

      if (data.error) throw new Error(data.error);

      const options = {
        key: data.keyId,
        subscription_id: data.subscriptionId,
        name: "Luminary AR",
        description: `${planName} Subscription`,
        image: "https://cfxvgbkbhflbjaimmitb.supabase.co/storage/v1/object/public/assets/logo.png",
        handler: function (response: any) {
          // Success! Redirect to dashboard
          router.push("/dashboard?payment=success");
        },
        prefill: {
          name: profile.restaurant_name,
          email: profile.email,
        },
        theme: {
          color: "#cf96ff",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error: any) {
      alert("Payment initiation failed: " + error.message);
    } finally {
      setLoadingPlan(null);
    }
  }

  return (
    <section id="pricing" className="py-24 px-6 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-secondary/5 blur-[120px] rounded-full" />
      
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-headline font-bold mb-8 tracking-tighter">
            Choose Your <span className="text-secondary italic">Power</span>
          </h2>
          
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className={`text-sm ${!isYearly ? 'text-foreground' : 'text-foreground/40'}`}>Monthly</span>
            <button 
              onClick={() => setIsYearly(!isYearly)}
              className="w-14 h-8 bg-surface-bright rounded-full p-1 relative transition-colors"
            >
              <MotionDiv 
                animate={{ x: isYearly ? 24 : 0 }}
                className="w-6 h-6 bg-primary rounded-full shadow-[0_0_10px_rgba(207,150,255,0.5)]"
              />
            </button>
            <span className={`text-sm ${isYearly ? 'text-foreground' : 'text-foreground/40'}`}>Yearly (Save 20%)</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, idx) => (
            <MotionDiv
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className={`relative glass p-10 rounded-[2.5rem] flex flex-col ${
                plan.highlight ? 'border-secondary shadow-[0_0_50px_rgba(0,227,253,0.1)]' : 'border-white/5'
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-secondary text-background px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
                   Most Popular
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-2xl font-headline font-bold mb-2">{plan.name}</h3>
                <p className="text-sm text-foreground/40">{plan.description}</p>
              </div>

              <div className="mb-8 flex items-baseline gap-2">
                <span className="text-5xl font-headline font-bold">{plan.price}</span>
                <span className="text-foreground/40 text-sm">/mo</span>
              </div>

              <div className="space-y-4 mb-10 flex-grow">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-3 text-sm text-foreground/70">
                    <Check className="w-4 h-4 text-primary" />
                    {feature}
                  </div>
                ))}
              </div>

              <button 
                onClick={() => handleCheckout(plan.id)}
                disabled={loadingPlan === plan.id}
                className={`w-full py-4 rounded-2xl font-headline font-bold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${
                  plan.highlight 
                  ? 'bg-secondary text-background shadow-[0_0_20px_rgba(0,227,253,0.3)] hover:brightness-110' 
                  : 'glass hover:bg-white/10'
                }`}
              >
                {loadingPlan === plan.id ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <Zap className="w-4 h-4" />
                    {profile?.plan === plan.id ? 'Current Plan' : 'Subscribe Now'}
                  </>
                )}
              </button>
            </MotionDiv>
          ))}
        </div>
      </div>
    </section>
  );
}

