"use client";

import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const MENU_ITEMS = [
  { id: 0, name: "Truffle Pizza", price: "$24", description: "Black truffle shavings, fior di latte, aged parmesan.", color: "#cf96ff", rating: "4.8", reviews: "124", image: "/items/pizza.png" },
  { id: 1, name: "Paneer Butter Masala", price: "$18", description: "Soft paneer cubes in a rich, creamy tomato and butter gravy.", color: "#ff9f1c", rating: "4.9", reviews: "210", image: "/items/paneer_butter_masala.png" },
  { id: 2, name: "Matcha Dessert", price: "$14", description: "Organic premium matcha mousse, white chocolate ganache.", color: "#ffd16c", rating: "4.7", reviews: "86", image: "/items/matcha.png" },
  { id: 3, name: "Paneer Tikka", price: "$20", description: "Hand-crafted cottage cheese marinated in yogurt and spices.", color: "#ff9f1c", rating: "4.9", reviews: "342", image: "/items/paneer_tikka.png" },
  { id: 4, name: "Butter Chicken", price: "$22", description: "Tender chicken pieces simmered in a velvety tomato gravy.", color: "#d00000", rating: "5.0", reviews: "512", image: "/items/butter_chicken.png" },
  { id: 5, name: "Sushi Platter", price: "$28", description: "Fresh Atlantic salmon, seasoned rice, and nori with wasabi.", color: "#ff4d6d", rating: "4.9", reviews: "156", image: "/items/sushi.png" },
  { id: 6, name: "Chole Bhature", price: "$16", description: "Spicy chickpeas served with fluffy, deep-fried puffed bread.", color: "#ee9b00", rating: "4.8", reviews: "156", image: "/items/chole_bhature.png" },
  { id: 7, name: "Hyderabadi Biryani", price: "$24", description: "Fragrant basmati rice layered with spiced meat and saffron.", color: "#fca311", rating: "5.0", reviews: "820", image: "/items/biryani.png" },
  { id: 8, name: "Crispy Samosas", price: "$10", description: "Triangular pastry filled with spiced potatoes and peas.", color: "#ee9b00", rating: "4.8", reviews: "420", image: "/items/samosa.png" },
  { id: 9, name: "Malai Kofta", price: "$19", description: "Fried potato and paneer dumplings in a rich, creamy golden gravy.", color: "#ffd16c", rating: "4.8", reviews: "235", image: "/items/malai_kofta.png" },
  { id: 10, name: "Lamb Rogan Josh", price: "$45", description: "Kashmiri style lamb curry with aromatic spices and red chili.", color: "#9b2226", rating: "4.9", reviews: "128", image: "/items/lamb_rogan_josh.png" },
  { id: 11, name: "Blueberry Pancakes", price: "$15", description: "Fluffy stack of pancakes served with maple syrup and butter.", color: "#4895ef", rating: "4.5", reviews: "167", image: "/items/pancakes.png" },
  { id: 12, name: "Dal Makhani", price: "$21", description: "Slow-cooked black lentils with butter, cream, and spices.", color: "#432818", rating: "4.9", reviews: "312", image: "/items/dal_makhani.png" },
  { id: 13, name: "Greek Salad", price: "$14", description: "Fresh cucumbers, olives, feta cheese, and balsamic glaze.", color: "#70e000", rating: "4.4", reviews: "89", image: "/items/salad.png" },
  { id: 14, name: "Chocolate Fudge", price: "$12", description: "Decadent dark chocolate cake with a molten lava center.", color: "#2b1a10", rating: "4.9", reviews: "453", image: "/items/cake.png" },
  { id: 15, name: "Masala Dosa", price: "$16", description: "Thin rice crepe filled with tempered potato masala.", color: "#d4a373", rating: "4.8", reviews: "654", image: "/items/dosa.png" },
  { id: 16, name: "Fish & Chips", price: "$18", description: "Beer-battered cod served with chunky fries and tartar sauce.", color: "#ffb703", rating: "4.7", reviews: "219", image: "/items/fish_chips.png" },
  { id: 17, name: "Tandoori Chicken", price: "$22", description: "Clay-oven roasted chicken marinated in spicy yogurt.", color: "#ae2012", rating: "4.9", reviews: "387", image: "/items/tandoori.png" },
  { id: 18, name: "Gulab Jamun", price: "$8", description: "Soft milk solids dumplings soaked in cardamom syrup.", color: "#9b2226", rating: "5.0", reviews: "943", image: "/items/gulab_jamun.png" },
  { id: 19, name: "Grilled Lobster", price: "$52", description: "Whole lobster grilled with garlic butter and herbs.", color: "#e63946", rating: "4.8", reviews: "76", image: "/items/lobster.png" },
];


function MenuCard({ item }: { item: typeof MENU_ITEMS[0] }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-100, 100], [15, -15]), { stiffness: 100, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-100, 100], [-15, 15]), { stiffness: 100, damping: 30 });

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(event.clientX - centerX);
    y.set(event.clientY - centerY);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative group cursor-pointer"
    >
      <div className="glass p-6 rounded-[2.5rem] border border-white/5 shadow-2xl transition-all duration-500 group-hover:border-primary/50 group-hover:shadow-[0_0_50px_rgba(207,150,255,0.1)]">
        <div 
          style={{ 
            transform: "translateZ(50px)",
            background: `linear-gradient(135deg, ${item.color}33 0%, ${item.color}11 100%)`
          }} 
          className="mb-6 aspect-square w-full rounded-2xl flex items-center justify-center relative overflow-hidden"
        >
          <img 
            src={item.image} 
            alt={item.name} 
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 brightness-[0.9] group-hover:brightness-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
          
          <div className="absolute top-4 right-4 glass px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-primary border border-primary/20">
             3D Model
          </div>
          
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
             <span className="text-[8px] uppercase tracking-[0.3em] text-white/40">Loading Visual...</span>
          </div>
        </div>

        <div style={{ transform: "translateZ(30px)" }}>
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-headline font-bold tracking-tight">{item.name}</h3>
            <span className="text-lg font-headline font-bold text-tertiary">{item.price}</span>
          </div>
          <div className="flex items-center gap-1 mb-4">
             <span className="text-[10px] text-tertiary font-bold">{item.rating}</span>
             <div className="flex text-[8px]">
                {[1,2,3,4,5].map(i => (
                  <span key={i} className={`material-symbols-outlined text-[10px] ${i <= Math.floor(parseFloat(item.rating)) ? 'text-tertiary' : 'text-white/20'}`} style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                ))}
             </div>
             <span className="text-[8px] text-white/30 ml-1">({item.reviews})</span>
          </div>
          <p className="text-xs text-foreground/50 font-light mb-6 line-clamp-2">
            {item.description}
          </p>
          
          <Link href={`/ar?id=${item.id}`} className="block">
            <button className="w-full py-4 rounded-xl border border-white/10 text-[10px] font-heavy uppercase tracking-widest hover:bg-primary hover:text-background transition-all hover:border-transparent">
              Explore in 3D
            </button>
          </Link>
        </div>

      </div>
    </motion.div>
  );
}



export default function InteractiveMenu() {
  return (
    <section id="menu" className="py-24 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-6xl font-headline font-bold mb-4 tracking-tighter">
          Interactive <span className="text-primary italic">Menu</span>
        </h2>
        <p className="text-foreground/40 text-sm uppercase tracking-[0.4em]">
          Explore dishes in immersive 3D
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {MENU_ITEMS.map((item) => (
          <MenuCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
