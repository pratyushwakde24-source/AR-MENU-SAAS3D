"use client";

import React, { useState, useEffect } from "react";
import { 
  LayoutDashboard, 
  Menu, 
  Plus, 
  TrendingUp, 
  Users, 
  Settings, 
  Bell,
  Eye,
  MousePointer2,
  ShoppingCart,
  AlertCircle,
  Zap,
  Lock
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { useProfile } from "@/lib/useProfile";
import Link from "next/link";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [menus, setMenus] = useState<any[]>([]);
  const { profile, loading: profileLoading, isSubscribed } = useProfile();

  useEffect(() => {
    async function fetchMenus() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('menus')
        .select('*')
        .eq('user_id', user.id);
      
      if (data) setMenus(data);
    }
    fetchMenus();
  }, [profile]);

  const stats = [
    { label: "Total Views", value: isSubscribed ? "12,482" : "---", icon: Eye, color: "primary" },
    { label: "AR Interaction", value: isSubscribed ? "4,210" : "---", icon: MousePointer2, color: "secondary" },
    { label: "Projected Revenue", value: isSubscribed ? "$45,210" : "---", icon: TrendingUp, color: "tertiary" },
    { label: "Avg. Duration", value: isSubscribed ? "2m 45s" : "---", icon: ShoppingCart, color: "primary" },
  ];

  if (profileLoading) {
     return (
        <div className="min-h-screen bg-background flex items-center justify-center">
           <Zap className="w-8 h-8 text-primary animate-pulse" />
        </div>
     );
  }

  return (
    <div className="flex min-h-screen bg-background text-foreground pt-20">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/5 p-6 space-y-8 hidden lg:block">
        <div className="space-y-2">
          <p className="px-4 text-[10px] uppercase font-bold tracking-widest text-foreground/40 mb-4">Main Menu</p>
          {[
            { id: "overview", label: "Dashboard", icon: LayoutDashboard },
            { id: "menu", label: "Menu Editor", icon: Menu },
            { id: "analytics", label: "Analytics", icon: TrendingUp },
            { id: "customers", label: "Customers", icon: Users },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => isSubscribed && setActiveTab(item.id)}
              disabled={!isSubscribed && item.id !== "overview"}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                activeTab === item.id ? 'bg-primary/10 text-primary border border-primary/20' : 'text-foreground/50 hover:bg-white/5'
              } ${!isSubscribed && item.id !== "overview" ? 'opacity-30 cursor-not-allowed' : ''}`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
              {!isSubscribed && item.id !== "overview" && <Lock className="w-3 h-3 ml-auto opacity-50" />}
            </button>
          ))}
        </div>

        <div className="space-y-2">
          <p className="px-4 text-[10px] uppercase font-bold tracking-widest text-foreground/40 mb-4">Account</p>
          {[
            { id: "settings", label: "Settings", icon: Settings },
            { id: "notifications", label: "Notifications", icon: Bell },
          ].map((item) => (
            <button
              key={item.id}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-foreground/50 hover:bg-white/5 transition-all"
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </button>
          ))}
        </div>

        <div className="pt-8 pt-auto">
           <div className={`glass p-6 rounded-2xl text-center border ${isSubscribed ? 'border-white/5' : 'border-primary/30'}`}>
              <p className="text-xs font-bold mb-2">{isSubscribed ? 'Plan: ' + profile.plan : 'Subscription Expired'}</p>
              <p className="text-[10px] text-foreground/50 mb-4">
                {isSubscribed ? 'Enjoy unlimited 3D scans and premium AR.' : 'Your access has been limited. Please renew to continue.'}
              </p>
              <Link
                href="/pricing"
                className="block w-full bg-primary text-background py-2 rounded-lg text-xs font-bold uppercase tracking-widest hover:brightness-110 transition-all"
              >
                {isSubscribed ? 'Upgrade' : 'Renew Now'}
              </Link>
           </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-6 lg:p-10 max-w-7xl mx-auto space-y-10 overflow-y-auto">
        {/* Subscription Alert */}
        {!isSubscribed && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-primary/10 border border-primary/30 rounded-2xl flex items-center justify-between gap-4"
          >
            <div className="flex items-center gap-3">
               <AlertCircle className="w-6 h-6 text-primary" />
               <div>
                  <p className="text-sm font-bold">Subscription Inactive</p>
                  <p className="text-xs text-foreground/60">Your restaurant profile is currently limited. Clients cannot view your AR menu.</p>
               </div>
            </div>
            <Link href="/pricing" className="px-6 py-2 bg-primary text-background rounded-xl text-xs font-bold uppercase tracking-widest">
               Renew
            </Link>
          </motion.div>
        )}

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h2 className="text-3xl font-headline font-bold">Welcome back, <span className="text-primary italic">{profile?.restaurant_name || 'Chef'}!</span></h2>
            <p className="text-foreground/40 text-sm">Here's how your AR Menu is performing today.</p>
          </div>
          <button 
            disabled={!isSubscribed}
            className={`flex items-center gap-2 bg-secondary text-background px-6 py-3 rounded-xl font-bold text-sm tracking-wide shadow-[0_0_20px_rgba(0,227,253,0.3)] hover:brightness-110 active:scale-95 transition-all ${!isSubscribed ? 'opacity-50 grayscale cursor-not-allowed' : ''}`}
          >
            <Plus className="w-4 h-4" />
            Upload 3D Model
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="glass p-6 rounded-[2rem] border border-white/5 relative overflow-hidden"
            >
              {!isSubscribed && <div className="absolute inset-0 bg-background/40 backdrop-blur-[2px] z-10 flex items-center justify-center">
                 <Lock className="w-6 h-6 text-foreground/20" />
              </div>}
              <div className={`w-10 h-10 rounded-full bg-${stat.color}/10 flex items-center justify-center mb-4`}>
                <stat.icon className={`w-5 h-5 text-${stat.color}`} />
              </div>
              <p className="text-foreground/40 text-xs font-bold uppercase tracking-wider mb-1">{stat.label}</p>
              <p className="text-2xl font-headline font-bold">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Recent Activity & Models */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           <div className="lg:col-span-2 glass p-8 rounded-[2.5rem] border border-white/5 relative">
              {!isSubscribed && <div className="absolute inset-0 bg-background/40 backdrop-blur-[2px] z-20 flex flex-col items-center justify-center rounded-[2.5rem]">
                 <Lock className="w-12 h-12 text-foreground/20 mb-4" />
                 <p className="text-sm font-bold uppercase tracking-widest text-foreground/40">Analytics Locked</p>
              </div>}
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-headline font-bold">Menu Performance</h3>
                <div className="flex gap-2">
                   <span className="text-[10px] font-bold text-secondary px-2 py-1 bg-secondary/10 rounded-md">LIVE</span>
                </div>
              </div>
              <div className="h-64 flex items-end gap-3 px-4">
                 {[40, 60, 45, 90, 75, 40, 100, 55, 80].map((h, i) => (
                   <motion.div 
                    key={i}
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    transition={{ delay: i * 0.05, duration: 1 }}
                    className="flex-grow bg-gradient-to-t from-primary/20 to-primary rounded-t-lg relative group"
                   >
                     <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-surface p-2 rounded text-[10px] opacity-0 group-hover:opacity-100 transition-opacity">
                       {h*120} views
                     </div>
                   </motion.div>
                 ))}
              </div>
           </div>

           <div className="glass p-8 rounded-[2.5rem] border border-white/5">
              <h3 className="text-xl font-headline font-bold mb-8">Your Menu</h3>
              <div className="space-y-6">
                 {menus.length === 0 ? (
                   <div className="text-center py-10">
                      <p className="text-sm text-foreground/40">No menu items yet.</p>
                   </div>
                 ) : (
                   menus.map((model) => (
                     <div key={model.id} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl hover:bg-white/10 transition-colors">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 glass rounded-xl flex items-center justify-center text-xl overflow-hidden">
                             {model.image_url ? <img src={model.image_url} className="w-full h-full object-cover" /> : "🍽️"}
                          </div>
                          <div>
                             <p className="text-sm font-bold">{model.name}</p>
                             <p className="text-[10px] text-foreground/40 font-bold uppercase">{model.status}</p>
                          </div>
                        </div>
                        <div className="text-right">
                           <p className="text-sm font-bold">{model.views || 0}</p>
                           <p className="text-[10px] text-foreground/40 font-bold uppercase">Views</p>
                        </div>
                     </div>
                   ))
                 )}
              </div>
           </div>
        </div>
      </main>
    </div>
  );
}

