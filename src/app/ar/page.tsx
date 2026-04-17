"use client";

import React, { useEffect, useState, Suspense } from "react";
import ARView from "@/components/ARView";
import { supabase } from "@/lib/supabase";
import { useSearchParams } from "next/navigation";
import { AlertCircle, Lock, Zap } from "lucide-react";
import Link from "next/link";

function ARContent() {
  const searchParams = useSearchParams();
  const menuId = searchParams.get("id");
  const [loading, setLoading] = useState(true);
  const [subscriptionActive, setSubscriptionActive] = useState(true);
  const [menuData, setMenuData] = useState<any>(null);

  useEffect(() => {
    async function verifySubscription() {
      if (!menuId) {
        setLoading(false);
        return;
      }

      // 1. Fetch menu and its owner
      const { data: menu, error: menuError } = await supabase
        .from('menus')
        .select('*, profiles!menus_user_id_fkey(*)')
        .eq('id', menuId)
        .single();

      if (menu) {
        setMenuData(menu);
        const profile = menu.profiles;
        
        // 2. Check if owner subscription is active
        if (profile) {
          const isActive = profile.subscription_status === 'active' && 
                          (!profile.subscription_end_date || new Date(profile.subscription_end_date) > new Date());
          setSubscriptionActive(isActive);
        }
      }
      setLoading(false);
    }

    verifySubscription();
  }, [menuId]);

  if (loading) {
     return (
        <div className="min-h-screen bg-black flex items-center justify-center">
           <Zap className="w-8 h-8 text-primary animate-pulse" />
        </div>
     );
  }

  if (!subscriptionActive) {
     return (
        <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 text-center">
           <div className="max-w-md space-y-8">
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-primary/10 border border-primary/20 mb-4">
                 <Lock className="w-10 h-10 text-primary" />
              </div>
              <h1 className="text-4xl font-headline font-bold tracking-tighter">
                Subscription <span className="text-primary italic">Expired</span>
              </h1>
              <p className="text-foreground/60 text-lg leading-relaxed">
                The restaurant's digital menu license has ended. Please visit the counter or contact support to continue.
              </p>
              <div className="pt-8">
                 <Link href="/" className="inline-block px-10 py-4 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-white/10 transition-all">
                    Return to Home
                 </Link>
              </div>
           </div>
        </div>
     );
  }

  return <ARView defaultIndex={menuId ? parseInt(menuId) : 0} />;
}

export default function ARPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black flex items-center justify-center">
         <Zap className="w-8 h-8 text-primary animate-pulse" />
      </div>
    }>
      <ARContent />
    </Suspense>
  );
}
