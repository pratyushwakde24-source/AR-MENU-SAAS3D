"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { 
  Users, 
  Store, 
  CreditCard, 
  ChevronRight, 
  Search, 
  Filter, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  MoreVertical,
  Activity,
  ShieldCheck,
  Calendar,
  Zap,
  LogOut
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

export default function SuperAdminDashboard() {
  const [restaurants, setRestaurants] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedRestaurant, setSelectedRestaurant] = useState<any>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchRestaurants();
  }, []);

  async function fetchRestaurants() {
    setLoading(true);
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });

    if (data) setRestaurants(data);
    setLoading(false);
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/admin/login");
  }

  async function updateSubscription(restaurantId: string, updates: any) {
    const { error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', restaurantId);

    if (!error) {
      await fetchRestaurants();
      setIsEditModalOpen(false);
    }
  }

  const stats = [
    { label: "Total Partners", value: restaurants.length, icon: Store, color: "primary" },
    { label: "Active Subs", value: restaurants.filter(r => r.subscription_status === 'active').length, icon: Activity, color: "secondary" },
    { label: "Revenue (MTD)", value: `$${restaurants.filter(r => r.subscription_status === 'active').length * 49}`, icon: CreditCard, color: "tertiary" },
    { label: "System Health", value: "99.9%", icon: ShieldCheck, color: "primary" },
  ];

  const filteredRestaurants = restaurants.filter(r => 
    r.restaurant_name?.toLowerCase().includes(search.toLowerCase()) || 
    r.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      {/* Top Navigation */}
      <nav className="border-b border-white/5 bg-[#050505]/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-[1600px] mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
             <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center border border-primary/20">
                <ShieldCheck className="w-6 h-6 text-primary" />
             </div>
             <div>
                <h1 className="text-xl font-headline font-bold tracking-tight">Luminary <span className="text-primary italic">OS</span></h1>
                <p className="text-[8px] uppercase tracking-[0.3em] text-foreground/40 font-bold">Consolidated Control Panel</p>
             </div>
          </div>

          <div className="flex items-center gap-6">
             <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/5">
                <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-foreground/60">Live Environment</span>
             </div>
             <button onClick={handleLogout} className="text-foreground/40 hover:text-white transition-colors">
                <LogOut className="w-5 h-5" />
             </button>
          </div>
        </div>
      </nav>

      <main className="max-w-[1600px] mx-auto p-6 md:p-10 space-y-10">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="glass p-8 rounded-[2.5rem] border border-white/5 relative overflow-hidden group"
            >
              <div className="relative z-10">
                <div className={`w-12 h-12 rounded-2xl bg-${stat.color}/10 flex items-center justify-center mb-6`}>
                  <stat.icon className={`w-6 h-6 text-${stat.color}`} />
                </div>
                <p className="text-foreground/40 text-[10px] font-bold uppercase tracking-[0.2em] mb-2">{stat.label}</p>
                <p className="text-3xl font-headline font-bold leading-tight">{stat.value}</p>
              </div>
              <div className={`absolute -right-4 -bottom-4 w-24 h-24 bg-${stat.color}/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity`} />
            </motion.div>
          ))}
        </div>

        {/* Management Board */}
        <div className="glass rounded-[3rem] border border-white/5 overflow-hidden">
           <div className="p-8 border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <h2 className="text-2xl font-headline font-bold mb-1 tracking-tight">Partner Ecosystem</h2>
                <p className="text-foreground/40 text-sm">Manage restaurant access and subscription levels.</p>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                 <div className="relative flex-grow md:flex-grow-0">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" />
                    <input 
                      type="text"
                      placeholder="Search restaurants..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-6 outline-none focus:border-primary/50 transition-all text-sm min-w-[300px]"
                    />
                 </div>
                 <button className="p-3 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all">
                    <Filter className="w-5 h-5 text-foreground/60" />
                 </button>
              </div>
           </div>

           <div className="overflow-x-auto">
              <table className="w-full text-left">
                 <thead>
                    <tr className="border-b border-white/5 text-[10px] uppercase tracking-widest text-foreground/40 font-bold">
                       <th className="px-8 py-6">Restaurant</th>
                       <th className="px-8 py-6">Status</th>
                       <th className="px-8 py-6">Plan</th>
                       <th className="px-8 py-6">Owner</th>
                       <th className="px-8 py-6 text-right">Actions</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-white/5">
                    {loading ? (
                       <tr>
                          <td colSpan={5} className="px-8 py-20 text-center">
                             <div className="flex flex-col items-center gap-4">
                                <Activity className="w-8 h-8 text-primary animate-pulse" />
                                <p className="text-xs uppercase tracking-[0.3em] text-foreground/40">Synchronizing Data...</p>
                             </div>
                          </td>
                       </tr>
                    ) : (
                       filteredRestaurants.map((res) => (
                          <motion.tr 
                            key={res.id} 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="group hover:bg-white/[0.02] transition-colors"
                          >
                             <td className="px-8 py-6">
                                <div className="flex items-center gap-4">
                                   <div className="w-12 h-12 glass rounded-2xl flex items-center justify-center text-xl">
                                      {res.restaurant_name?.[0] || <Store className="w-5 h-5 opacity-20" />}
                                   </div>
                                   <div>
                                      <p className="font-bold">{res.restaurant_name || "Untitled Kitchen"}</p>
                                      <p className="text-[10px] text-foreground/40 font-bold uppercase mt-0.5 tracking-wider">{res.id.slice(0, 8)}</p>
                                   </div>
                                </div>
                             </td>
                             <td className="px-8 py-6">
                                <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                                  res.subscription_status === 'active' ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 
                                  res.subscription_status === 'expired' ? 'bg-orange-500/10 text-orange-500 border border-orange-500/20' : 
                                  'bg-red-500/10 text-red-500 border border-red-500/20'
                                }`}>
                                   {res.subscription_status === 'active' ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                                   {res.subscription_status}
                                </div>
                             </td>
                             <td className="px-8 py-6">
                                <div className="flex items-center gap-2">
                                   <Zap className={`w-3 h-3 ${res.plan === 'premium' ? 'text-tertiary' : res.plan === 'pro' ? 'text-primary' : 'text-foreground/40'}`} />
                                   <span className="text-sm font-medium capitalize">{res.plan}</span>
                                </div>
                             </td>
                             <td className="px-8 py-6">
                                <p className="text-sm text-foreground/60">{res.email}</p>
                             </td>
                             <td className="px-8 py-6 text-right">
                                <button 
                                  onClick={() => {
                                    setSelectedRestaurant(res);
                                    setIsEditModalOpen(true);
                                  }}
                                  className="p-2 hover:bg-white/10 rounded-xl transition-all"
                                >
                                   <MoreVertical className="w-5 h-5 text-foreground/40" />
                                </button>
                             </td>
                          </motion.tr>
                       ))
                    )}
                 </tbody>
              </table>
           </div>
        </div>
      </main>

      {/* Edit Modal */}
      <AnimatePresence>
        {isEditModalOpen && selectedRestaurant && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsEditModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg glass border border-white/10 rounded-[3rem] p-10 overflow-hidden"
            >
              <div className="mb-8">
                 <h3 className="text-3xl font-headline font-bold mb-2">Subscription <span className="text-primary italic">Control</span></h3>
                 <p className="text-foreground/40 text-sm">Update {selectedRestaurant.restaurant_name}&apos;s access.</p>
              </div>

              <div className="space-y-8">
                 <div className="space-y-3">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-foreground/40 px-2">Access Status</label>
                    <div className="grid grid-cols-3 gap-3">
                       {['active', 'expired', 'disabled'].map((status) => (
                         <button
                           key={status}
                           onClick={() => setSelectedRestaurant({...selectedRestaurant, subscription_status: status})}
                           className={`py-3 rounded-2xl text-[10px] font-bold uppercase tracking-widest border transition-all ${
                             selectedRestaurant.subscription_status === status 
                             ? 'bg-primary text-background border-primary shadow-[0_0_20px_rgba(207,150,255,0.3)]' 
                             : 'bg-white/5 border-white/5 text-foreground/40 hover:bg-white/10'
                           }`}
                         >
                           {status}
                         </button>
                       ))}
                    </div>
                 </div>

                 <div className="space-y-3">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-foreground/40 px-2">SaaS Plan</label>
                    <div className="grid grid-cols-3 gap-3">
                       {['basic', 'pro', 'premium'].map((plan) => (
                         <button
                           key={plan}
                           onClick={() => setSelectedRestaurant({...selectedRestaurant, plan: plan})}
                           className={`py-3 rounded-2xl text-[10px] font-bold uppercase tracking-widest border transition-all ${
                             selectedRestaurant.plan === plan 
                             ? 'bg-secondary text-background border-secondary shadow-[0_0_20px_rgba(0,227,253,0.3)]' 
                             : 'bg-white/5 border-white/5 text-foreground/40 hover:bg-white/10'
                           }`}
                         >
                           {plan}
                         </button>
                       ))}
                    </div>
                 </div>

                 <div className="pt-6 flex gap-4">
                    <button 
                       onClick={() => setIsEditModalOpen(false)}
                       className="flex-grow py-4 rounded-2xl border border-white/10 text-[10px] font-bold uppercase tracking-widest hover:bg-white/5 transition-all"
                    >
                       Cancel
                    </button>
                    <button 
                       onClick={() => updateSubscription(selectedRestaurant.id, {
                         subscription_status: selectedRestaurant.subscription_status,
                         plan: selectedRestaurant.plan
                       })}
                       className="flex-grow py-4 rounded-2xl bg-white text-background text-[10px] font-bold uppercase tracking-widest hover:brightness-110 transition-all font-headline"
                    >
                       Apply Changes
                    </button>
                 </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
