"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
const MotionDiv = motion.div as any;
const MotionH1 = motion.h1 as any;
const MotionP = motion.p as any;
import Hero3D from "./Hero3D";
import DemoModal from "./DemoModal";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  const [isDemoOpen, setIsDemoOpen] = useState(false);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Gradients */}
      <div className="absolute inset-0 bg-[#0d0e12]">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <Hero3D />

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full border border-primary/30 mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
          <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-primary">
            Next-Gen Restaurant Tech
          </span>
        </MotionDiv>

        <MotionH1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-8xl font-headline font-bold mb-6 tracking-tighter leading-none"
        >
          Turn Your Menu Into a <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-tertiary neon-text-primary">
            3D AR Experience
          </span>
        </MotionH1>

        <MotionP
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl text-foreground/60 mb-12 max-w-2xl mx-auto font-light leading-relaxed"
        >
          Let customers see food on their table before ordering. Boost conversion
          rates and engagement with premium Augmented Reality visualization.
        </MotionP>

        <MotionDiv
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <button 
            onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}
            className="w-full sm:w-auto bg-primary text-background px-10 py-5 rounded-full font-headline font-bold text-sm tracking-widest uppercase shadow-[0_0_30px_rgba(207,150,255,0.4)] hover:brightness-110 active:scale-95 transition-all"
          >
            View Menu in Your Room
          </button>
          <button 
            onClick={() => setIsDemoOpen(true)}
            className="w-full sm:w-auto glass text-foreground px-10 py-5 rounded-full font-headline font-bold text-sm tracking-widest uppercase hover:bg-white/10 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            Try Live Demo
            <ArrowRight className="w-4 h-4 text-primary" />
          </button>

          <AnimatePresence>
            {isDemoOpen && (
              <DemoModal isOpen={isDemoOpen} onClose={() => setIsDemoOpen(false)} />
            )}
          </AnimatePresence>
        </MotionDiv>

        <MotionDiv
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-16 pt-8 border-t border-white/5"
        >
          <p className="text-[10px] uppercase tracking-[0.2em] font-medium text-foreground/30 mb-4">
            Trusted by 500+ restaurants worldwide
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 opacity-40 grayscale contrast-125">
             <span className="text-xl font-bold italic">INDIAN GRILL</span>
             <span className="text-xl font-bold">STEAKHOUSE</span>
             <span className="text-xl font-bold">PIZZERIA</span>
             <span className="text-xl font-bold">SUSHI BAR</span>
             <span className="text-xl font-bold">BISTRO_</span>

          </div>
        </MotionDiv>
      </div>
      
      {/* Scroll Indicator */}
      <MotionDiv 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30"
      >
        <span className="text-[8px] uppercase tracking-widest">Scroll</span>
        <div className="w-[1px] h-10 bg-gradient-to-b from-primary to-transparent" />
      </MotionDiv>
    </section>
  );
}
