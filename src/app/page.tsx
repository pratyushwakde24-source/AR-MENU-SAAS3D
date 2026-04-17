import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import InteractiveMenu from "@/components/InteractiveMenu";
import Pricing from "@/components/Pricing";
import AIAssistant from "@/components/AIAssistant";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground selection:bg-primary/30">
      <Navbar />
      
      <main className="flex-grow">
        <Hero />
        
        {/* Features Preview / Intro */}
        <section id="features" className="py-24 px-6 max-w-7xl mx-auto border-t border-white/5">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
              <div>
                 <h2 className="text-4xl md:text-6xl font-headline font-bold mb-8 tracking-tighter leading-tight">
                    Experience Food Like <br />
                    <span className="text-primary italic">Never Before</span>
                 </h2>
                 <p className="text-foreground/60 text-lg mb-8 leading-relaxed font-light">
                    Our platform uses cutting-edge WebXR technology to place high-fidelity 3D scans of your dishes 
                    directly in the customer&apos;s environment. No app download required.
                 </p>
                 <div className="space-y-6">
                    {[
                      { title: "Real-time Lighting", desc: "Dishes adapt to the customer's room lighting for maximum realism." },
                      { title: "Interactive Textures", desc: "Zoom in to see every delicious detail of the ingredients." },
                      { title: "Seamless Checkout", desc: "Order directly from the AR view with one tap." }
                    ].map((feature, i) => (
                      <div key={i} className="flex gap-4">
                         <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary text-[10px] font-bold">0{i+1}</div>
                         <div>
                            <h4 className="font-bold mb-1">{feature.title}</h4>
                            <p className="text-sm text-foreground/40">{feature.desc}</p>
                         </div>
                      </div>
                    ))}
                 </div>
              </div>
              
              <div className="relative">
                 <div className="aspect-square glass rounded-[3rem] p-2 neon-border overflow-hidden rotate-3 hover:rotate-0 transition-transform duration-700">
                    <img 
                      src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=1000" 
                      alt="3D Pizza Preview" 
                      className="w-full h-full object-cover rounded-[2.5rem] brightness-[0.8]"
                    />
                 </div>
                 <div className="absolute -bottom-10 -left-10 glass p-6 rounded-3xl animate-float">
                    <div className="flex items-center gap-3">
                       <span className="material-symbols-outlined text-secondary">view_in_ar</span>
                       <p className="text-[10px] font-bold uppercase tracking-widest">3D Scan Verified</p>
                    </div>
                 </div>
              </div>
           </div>
        </section>

        <InteractiveMenu />
        
        <Pricing />
        
        {/* CTA Section */}
        <section className="py-24 px-6 text-center relative overflow-hidden">
           <div className="absolute inset-0 bg-primary/5 -skew-y-3 translate-y-20" />
           <div className="relative z-10 max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-7xl font-headline font-bold mb-8 tracking-tighter">
                Ready to Bring Your <br />
                <span className="text-secondary italic">Menu to Life?</span>
              </h2>
              <p className="text-lg text-foreground/50 mb-12 max-w-2xl mx-auto">
                Join 500+ restaurants already using Luminary AR to increase order value by up to 35%.
              </p>
              <Link 
                href="/dashboard"
                className="inline-block bg-primary text-background px-12 py-6 rounded-full font-headline font-bold text-sm tracking-widest uppercase shadow-[0_0_50px_rgba(207,150,255,0.4)] hover:scale-105 transition-all"
              >
                Get Started Now
              </Link>
           </div>
        </section>
      </main>

      <footer className="py-12 border-t border-white/5 text-center flex flex-col items-center gap-4">
         <p className="text-foreground/20 text-[10px] uppercase font-bold tracking-[0.5em]">
            &copy; 2026 LUMINARY AR SYSTEMS . ALL RIGHTS RESERVED
         </p>
         <Link href="/admin/login" className="text-[8px] text-foreground/10 uppercase tracking-widest hover:text-primary transition-colors">
            System Admin Access
         </Link>
      </footer>

      <AIAssistant />
    </div>
  );
}
