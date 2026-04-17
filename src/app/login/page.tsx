"use client";

import React, { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Store, 
  Mail, 
  Lock, 
  ArrowRight, 
  Loader2, 
  Sparkles, 
  ChefHat, 
  CheckCircle2 
} from "lucide-react";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [restaurantName, setRestaurantName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  async function handleAuth(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (isLogin) {
        const { error: authError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (authError) throw authError;
        router.push("/dashboard");
      } else {
        const { error: authError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              restaurant_name: restaurantName,
            },
          },
        });
        if (authError) throw authError;
        setSuccess(true);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-primary/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-secondary/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />

      <div className="w-full max-w-[1100px] grid grid-cols-1 lg:grid-cols-2 gap-12 items-center z-10">
        
        {/* Left Side: Branding/Intro */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="hidden lg:block space-y-8"
        >
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full border border-primary/30">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-primary">Join the Future of Dining</span>
          </div>
          
          <h1 className="text-6xl font-headline font-bold leading-none tracking-tighter">
            Build Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-tertiary">Digital Legacy</span>
          </h1>
          
          <p className="text-xl text-foreground/50 font-light leading-relaxed max-w-md">
            The world's most advanced 3D AR menu system for modern restaurateurs. Increase engagement by 300%.
          </p>

          <div className="grid grid-cols-2 gap-6 pt-8">
             {[
               { label: "3D Scanning", icon: Sparkles },
               { label: "AR View", icon: ChefHat },
               { label: "SaaS Control", icon: Store },
               { label: "Smart Analytics", icon: CheckCircle2 },
             ].map((f) => (
               <div key={f.label} className="flex items-center gap-3 text-sm text-foreground/40 font-medium">
                  <f.icon className="w-5 h-5 text-secondary" />
                  {f.label}
               </div>
             ))}
          </div>
        </motion.div>

        {/* Right Side: Auth Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md mx-auto"
        >
          <div className="glass p-10 rounded-[3rem] border border-white/10 shadow-2xl relative overflow-hidden">
             {/* Success State */}
             <AnimatePresence>
               {success && (
                 <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 z-50 bg-[#050505] flex flex-col items-center justify-center p-8 text-center"
                 >
                    <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mb-6">
                       <CheckCircle2 className="w-10 h-10 text-green-500" />
                    </div>
                    <h3 className="text-2xl font-headline font-bold mb-4">Check Your Email</h3>
                    <p className="text-foreground/50 text-sm mb-8">We've sent a magic link to activate your restaurant portal.</p>
                    <button 
                      onClick={() => setSuccess(false)}
                      className="text-primary text-xs font-bold uppercase tracking-widest"
                    >
                      Back to Login
                    </button>
                 </motion.div>
               )}
             </AnimatePresence>

             <div className="text-center mb-10">
                <h2 className="text-3xl font-headline font-bold mb-2">
                  {isLogin ? "Welcome " : "Create "}
                  <span className="text-primary italic">{isLogin ? "Back" : "Account"}</span>
                </h2>
                <div className="flex items-center justify-center gap-2 mt-4">
                  <button 
                    type="button"
                    onClick={() => setIsLogin(true)}
                    className={`text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full transition-all ${isLogin ? 'bg-primary text-background' : 'text-foreground/40'}`}
                  >
                    Login
                  </button>
                  <button 
                    type="button"
                    onClick={() => setIsLogin(false)}
                    className={`text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full transition-all ${!isLogin ? 'bg-primary text-background' : 'text-foreground/40'}`}
                  >
                    Register
                  </button>
                </div>
             </div>

             <form onSubmit={handleAuth} className="space-y-6">
                {!isLogin && (
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-foreground/40 px-2">Restaurant Name</label>
                    <div className="relative group">
                      <Store className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/20 group-focus-within:text-primary transition-colors" />
                      <input
                        type="text"
                        placeholder="The Gourmet Kitchen"
                        value={restaurantName}
                        onChange={(e) => setRestaurantName(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-primary/50 focus:bg-primary/5 transition-all text-sm"
                        required
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-foreground/40 px-2">Business Email</label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/20 group-focus-within:text-primary transition-colors" />
                    <input
                      type="email"
                      placeholder="chef@restaurant.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-primary/50 focus:bg-primary/5 transition-all text-sm"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-foreground/40 px-2">Password</label>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/20 group-focus-within:text-primary transition-colors" />
                    <input
                      type="password"
                      placeholder="••••••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-primary/50 focus:bg-primary/5 transition-all text-sm"
                      required
                    />
                  </div>
                </div>

                {error && (
                  <p className="text-red-500 text-[10px] font-bold uppercase text-center bg-red-500/10 py-2 rounded-lg border border-red-500/20 px-4">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary text-background py-5 rounded-2xl font-headline font-bold text-sm tracking-widest uppercase shadow-[0_10px_30px_rgba(207,150,255,0.3)] hover:brightness-110 active:scale-95 transition-all disabled:opacity-50 flex items-center justify-center gap-3"
                >
                  {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      {isLogin ? "Enter Dashboard" : "Create Restaurant Profile"}
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
             </form>
          </div>
          
          <p className="text-center mt-8 text-[10px] text-foreground/20 uppercase font-bold tracking-[0.3em]">
             Luminary OS v1.0 • Secure Auth
          </p>
        </motion.div>
      </div>
    </div>
  );
}
