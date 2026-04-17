"use client";

import React from "react";
import { motion } from "framer-motion";
const MotionButton = motion.button as any;
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 px-6 py-4">
      <nav className="max-w-7xl mx-auto flex justify-between items-center glass rounded-full px-8 py-3 neon-border">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-primary animate-pulse">
            blur_on
          </span>
          <h1 className="text-xl font-headline font-bold tracking-tighter text-foreground">
            LUMINARY <span className="text-primary">AR</span>
          </h1>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium uppercase tracking-widest text-foreground/70">
          <Link href="#features" className="hover:text-primary transition-colors">
            Features
          </Link>
          <Link href="#menu" className="hover:text-primary transition-colors">
            Menu
          </Link>
          <Link href="#pricing" className="hover:text-primary transition-colors">
            Pricing
          </Link>
          <Link href="/dashboard" className="hover:text-primary transition-colors">
            Dashboard
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <MotionButton
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hidden sm:block text-xs font-bold uppercase tracking-widest text-primary/80"
          >
            Login
          </MotionButton>
          <MotionButton
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-primary text-background px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest shadow-[0_0_20px_rgba(207,150,255,0.4)] hover:brightness-110 transition-all"
          >
            Get Started
          </MotionButton>
        </div>
      </nav>
    </header>
  );
}
