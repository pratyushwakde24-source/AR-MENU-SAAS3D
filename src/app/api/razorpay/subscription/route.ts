import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(req: Request) {
  try {
    const { planId, restaurantName } = await req.json();

    // 1. Get User Session
    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value
          },
        },
      }
    );

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 2. Map local plan name to Razorpay Plan ID
    let rzpPlanId = '';
    switch (planId.toLowerCase()) {
      case 'starter': rzpPlanId = process.env.RAZORPAY_PLAN_STARTER_ID!; break;
      case 'pro': rzpPlanId = process.env.RAZORPAY_PLAN_PRO_ID!; break;
      case 'premium': rzpPlanId = process.env.RAZORPAY_PLAN_PREMIUM_ID!; break;
      default: return NextResponse.json({ error: 'Invalid plan' }, { status: 400 });
    }

    // 3. Create Razorpay Subscription
    const subscription = await razorpay.subscriptions.create({
      plan_id: rzpPlanId,
      customer_notify: 1,
      total_count: 12, // For a year, or adjust as needed
      notes: {
        user_id: user.id,
        restaurant_name: restaurantName,
      },
    });

    // 4. Store subscription pending ID in DB
    await supabase.from('profiles').update({
       razorpay_subscription_id: subscription.id,
       payment_status: 'pending'
    }).eq('id', user.id);

    return NextResponse.json({
      subscriptionId: subscription.id,
      keyId: process.env.RAZORPAY_KEY_ID
    });
  } catch (error: any) {
    console.error('Razorpay Subscription Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
