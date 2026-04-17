import { NextResponse } from 'next/server';

// This is the System Prompt that gives Lumina its "personality" and knowledge
const SYSTEM_PROMPT = `
You are Lumina, the official AI assistant for Luminary AR, a 3D Restaurant Menu SaaS. 
Your goal is to help restaurant owners (Chefs) manage their 3D menus and help customers understand the AR experience.

We currently have a signature "Global-Indian Fusion" menu featuring:
- Indian Classics: Paneer Butter Masala, Butter Chicken, Hyderabadi Biryani, Chole Bhature, Malai Kofta, Lamb Rogan Josh, Dal Makhani, Masala Dosa, Tandoori Chicken, and Gulab Jamun.
- Global Premium: Truffle Pizza, Matcha Dessert, Sushi Platter, Blueberry Pancakes, Greek Salad, Chocolate Fudge Cake, Fish & Chips, and our signature Grilled Lobster.

Key Features of Luminary AR to mention:
- WebXR Technology: No app download required, works in mobile browsers.
- Real-time Lighting: 3D models adapt to the room's lighting.
- Interactive Textures: Zoom in to see ingredients in high detail.
- Seamless Checkout: Order directly from the AR view.
- Dashboard: Manage menus, track views, and analytics.

Style: Professional, tech-forward, and helpful. Use food icons occasionally.
`;


export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { content: "AI Error: Please add OPENAI_API_KEY to your .env.local file to enable my brain! 🧠" },
        { status: 200 } // Returning 200 to show the message in chat
      );
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...messages
        ],
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      console.error('OpenAI API Error:', data);
      return NextResponse.json({ content: `AI Error: ${data.error?.message || 'Unknown error'}` });
    }

    return NextResponse.json({ content: data.choices[0].message.content });
  } catch (error) {
    console.error('Chat API Route Error:', error);
    return NextResponse.json({ error: 'Failed to fetch AI response' }, { status: 500 });
  }
}
