"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play, Scan, MousePointer2, Camera, Smartphone } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

const MotionDiv = motion.div as any;

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DemoModal({ onClose }: DemoModalProps) {
  return (
    <>
      {/* Backdrop */}
      <MotionDiv
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-xl"
      />

      {/* Modal Container */}
      <MotionDiv
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none"
      >
        <div className="bg-[#15161c] w-full max-w-5xl rounded-[2.5rem] border border-white/10 shadow-2xl overflow-hidden pointer-events-auto flex flex-col md:flex-row h-[90vh] md:h-auto max-h-[800px]">
          
          {/* Left: Video Section */}
          <div className="flex-1 relative bg-black flex items-center justify-center min-h-[300px]">
            <video 
              autoPlay 
              loop 
              muted 
              playsInline
              className="w-full h-full object-cover"
              poster="https://images.pexels.com/photos/3760924/pexels-photo-3760924.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            >
              <source src="https://v1.pexels.com/video-files/3760924/3760924-uhd_2160_3840_25fps.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
            
            <div className="absolute bottom-8 left-8 right-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                <span className="text-[8px] uppercase tracking-widest font-bold text-primary">Live Experience Demo</span>
              </div>
              <h3 className="text-2xl font-headline font-bold text-white mb-2">AR-Menu Ecosystem</h3>
              <p className="text-sm text-white/50 font-light">See how our QR-to-AR pipeline transforms the dining experience.</p>
            </div>

            <button 
              onClick={onClose}
              className="absolute top-6 left-6 p-2 rounded-full glass hover:bg-white/10 transition-colors md:hidden"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Right: Steps Section */}
          <div className="w-full md:w-[400px] p-8 md:p-12 flex flex-col justify-center border-l border-white/5">
            <div className="hidden md:flex justify-end mb-8">
              <button 
                onClick={onClose}
                className="p-2 rounded-full glass hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-primary mb-8">How it Works</h4>
            
            <div className="space-y-10">
              {/* @ts-ignore */}
              {[
                { icon: <Scan className="w-5 h-5" />, title: "Scan QR", desc: "User scans the unique QR code on their table using their phone camera." },
                { icon: <MousePointer2 className="w-5 h-5" />, title: "Choose Dish", desc: "The interactive 3D menu opens instantly. Select any dish to explore." },
                { icon: <Camera className="w-5 h-5" />, title: "Start AR", desc: "Click 'Start AR View' to project the life-sized dish onto the table." }
              ].map((step, i) => (
                <MotionDiv 
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + (i * 0.1) }}
                  className="flex gap-6"
                >
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-primary shrink-0 shadow-xl">
                    {step.icon}
                  </div>
                  <div>
                    <h5 className="font-bold text-white mb-1">{step.title}</h5>
                    <p className="text-xs text-foreground/40 leading-relaxed">{step.desc}</p>
                  </div>
                </MotionDiv>
              ))}
            </div>

            <div className="mt-12 p-6 rounded-3xl bg-white/5 border border-white/10 flex flex-col items-center">
              <div className="bg-white p-3 rounded-2xl mb-4 shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                <QRCodeSVG 
                  value={typeof window !== 'undefined' ? window.location.href : 'https://ar-menu.com'} 
                  size={120}
                  level="H"
                  includeMargin={false}
                />
              </div>
              <div className="flex items-center gap-2 mb-1">
                <Smartphone className="w-3 h-3 text-primary" />
                <p className="text-[10px] font-bold text-white uppercase tracking-widest">Scan to try on phone</p>
              </div>
              <p className="text-[9px] text-foreground/40 text-center">Open this website on your mobile to unlock the full AR camera experience.</p>
            </div>

            <button 
              onClick={onClose}
              className="mt-8 w-full bg-primary text-background py-4 rounded-xl font-headline font-bold tracking-widest uppercase text-[10px] shadow-lg hover:brightness-110 transition-all"
            >
              Got It, Thanks!
            </button>
          </div>
        </div>
      </MotionDiv>
    </>
  );
}
