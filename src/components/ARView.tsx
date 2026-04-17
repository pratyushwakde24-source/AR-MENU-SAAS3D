"use client";

import React, { Suspense, useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { 
  OrbitControls, 
  PerspectiveCamera, 
  Environment, 
  Float, 
  ContactShadows,
  MeshDistortMaterial
} from "@react-three/drei";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { motion as motion3d } from "framer-motion-3d";
import { ShoppingBag, ArrowLeft, ArrowRight, Cpu, ZoomIn, RotateCw, Camera } from "lucide-react";
import { createXRStore, XR, ARButton, useXRHitTest, Interactive, useXR, useXREvent } from "@react-three/xr";
import { useEffect } from "react";
import * as THREE from "three";

const store = createXRStore({
  sessionInit: {
    requiredFeatures: ['hit-test', 'local-floor'],
    optionalFeatures: ['dom-overlay'],
  }
});
const MotionDiv = motion.div as any;

function PizzaModel() {
  const ref = useRef<any>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y += 0.005;
    }
  });

  return (
    <group ref={ref} scale={1.2}>
       {/* Crust */}
       <mesh position={[0, -0.1, 0]}>
         <cylinderGeometry args={[2.5, 2.7, 0.4, 64]} />
         <meshStandardMaterial color="#c26a3e" roughness={0.8} />
       </mesh>
       {/* Sauce & Cheese */}
       <mesh position={[0, 0.11, 0]}>
         <cylinderGeometry args={[2.3, 2.3, 0.1, 64]} />
         <meshStandardMaterial color="#ffcc00" roughness={0.4} />
       </mesh>
       {/* Toppings (Pepperoni/Black Truffle) */}
       {[...Array(12)].map((_, i) => (
         <mesh key={i} position={[
           Math.cos(i * (Math.PI / 6) * 1) * 1.5,
           0.18,
           Math.sin(i * (Math.PI / 6) * 1) * 1.5
         ]}>
           <cylinderGeometry args={[0.3, 0.3, 0.05, 16]} />
           <meshStandardMaterial color="#331800" roughness={0.9} />
         </mesh>
       ))}
    </group>
  );
}

function PaneerButterMasalaModel() {
  const ref = useRef<any>(null);
  useFrame((state) => { if (ref.current) ref.current.rotation.y += 0.005; });

  return (
    <group ref={ref} scale={1.4}>
      {/* Bowl */}
      <mesh position={[0, -0.6, 0]}>
        <cylinderGeometry args={[1.5, 1.2, 0.6, 32]} />
        <meshStandardMaterial color="#fff" roughness={0.5} />
      </mesh>
      {/* Gravy */}
      <mesh position={[0, -0.3, 0]}>
        <cylinderGeometry args={[1.4, 1.4, 0.1, 32]} />
        <meshStandardMaterial color="#e85d04" roughness={0.3} />
      </mesh>
      {/* Paneer Cubes */}
      {[...Array(6)].map((_, i) => (
        <mesh key={i} position={[
          (Math.random() - 0.5) * 1.5,
          -0.2,
          (Math.random() - 0.5) * 1.5
        ]} rotation={[0, Math.random(), 0]}>
          <boxGeometry args={[0.4, 0.4, 0.4]} />
          <meshStandardMaterial color="#fefae0" />
        </mesh>
      ))}
      {/* Cream Swirl */}
      {[...Array(12)].map((_, i) => (
        <mesh key={i} position={[
          Math.cos(i * 0.5) * 0.6,
          -0.24,
          Math.sin(i * 0.5) * 0.6
        ]}>
          <sphereGeometry args={[0.05]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
      ))}
    </group>
  );
}

function MatchaDessertModel() {
  const ref = useRef<any>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y += 0.005;
    }
  });

  return (
    <group ref={ref} scale={1.3}>
       {/* Plate */}
       <mesh position={[0, -0.8, 0]}>
          <cylinderGeometry args={[2, 2.2, 0.1, 32]} />
          <meshStandardMaterial color="#f8f9fa" />
       </mesh>
       {/* Cake Body */}
       <mesh position={[0, -0.2, 0]}>
          <cylinderGeometry args={[1.2, 1.2, 1.2, 32]} />
          <meshStandardMaterial color="#2d6a4f" roughness={0.8} />
       </mesh>
       {/* Cream Top */}
       <mesh position={[0, 0.5, 0]}>
          <sphereGeometry args={[0.6, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial color="#ffffff" />
       </mesh>
       {/* Gold Leaf Accents */}
       {[...Array(5)].map((_, i) => (
         <mesh key={i} position={[
           Math.cos(i) * 0.7,
           0.4 + Math.random() * 0.2,
           Math.sin(i) * 0.7
         ]}>
           <boxGeometry args={[0.2, 0.01, 0.2]} />
           <meshStandardMaterial color="#ffcc00" metalness={1} roughness={0.2} />
         </mesh>
       ))}
    </group>
  );
}
function PaneerTikkaModel() {
  const ref = useRef<any>(null);
  useFrame((state) => { if (ref.current) ref.current.rotation.y += 0.005; });
  return (
    <group ref={ref} scale={1.5}>
       {/* Textured Stone Plate */}
       <mesh position={[0, -0.6, 0]}>
          <cylinderGeometry args={[2, 2.1, 0.2, 32]} />
          <meshStandardMaterial color="#111" roughness={0.9} metalness={0.2} />
       </mesh>
       {/* Individual Charred Cubes */}
       {[...Array(5)].map((_, i) => (
         <group key={i} position={[Math.cos(i * 1.2) * 0.9, -0.1, Math.sin(i * 1.2) * 0.9]} rotation={[0, i, 0]}>
            <mesh>
              <boxGeometry args={[0.7, 0.7, 0.7]} />
              <meshStandardMaterial color="#fefae0" roughness={0.6} />
            </mesh>
            {/* Random Char Dots */}
            {[...Array(6)].map((_, j) => (
               <mesh key={j} position={[
                 (Math.random() - 0.5) * 0.71,
                 (Math.random() - 0.5) * 0.71,
                 (Math.random() - 0.5) * 0.71
               ]}>
                 <sphereGeometry args={[0.1]} />
                 <meshStandardMaterial color="#331800" />
               </mesh>
            ))}
         </group>
       ))}
       {/* Bell Peppers & Onions */}
       {[...Array(8)].map((_, i) => (
         <mesh 
           key={i} 
           position={[Math.cos(i) * 0.5, -0.3, Math.sin(i) * 0.5]} 
           rotation={[Math.random(), Math.random(), Math.random()]}
         >
            <boxGeometry args={[0.5, 0.05, 0.4]} />
            <meshStandardMaterial color={i % 3 === 0 ? "#d00000" : i % 3 === 1 ? "#386641" : "#fff"} roughness={0.3} />
         </mesh>
       ))}
    </group>
  );
}

function ButterChickenModel() {
  const ref = useRef<any>(null);
  useFrame((state) => { if (ref.current) ref.current.rotation.y += 0.005; });
  return (
    <group ref={ref} scale={1.4}>
       <mesh position={[0, -0.4, 0]}>
          <cylinderGeometry args={[1.5, 1, 1, 32]} />
          <meshStandardMaterial color="#b87333" metalness={0.8} roughness={0.2} />
       </mesh>
       <mesh position={[0, 0.1, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.5, 0.05, 16, 32]} />
          <meshStandardMaterial color="#b87333" metalness={0.8} />
       </mesh>
       <mesh position={[0, 0.05, 0]}>
          <cylinderGeometry args={[1.4, 1.4, 0.1, 32]} />
          <meshStandardMaterial color="#e85d04" roughness={0.3} />
       </mesh>
       {[...Array(20)].map((_, i) => (
         <mesh key={i} position={[Math.cos(i * 0.5) * (i * 0.06), 0.12, Math.sin(i * 0.5) * (i * 0.06)]}>
           <sphereGeometry args={[0.04]} />
           <meshStandardMaterial color="#ffffff" />
         </mesh>
       ))}
       {[...Array(5)].map((_, i) => (
         <mesh key={i} position={[Math.random() - 0.5, 0.15, Math.random() - 0.5]}>
           <planeGeometry args={[0.2, 0.2]} />
           <meshStandardMaterial color="#2d6a4f" side={2} />
         </mesh>
       ))}
    </group>
  );
}


function SushiModel() {
  const ref = useRef<any>(null);
  useFrame((state) => { if (ref.current) ref.current.rotation.y += 0.005; });
  return (
    <group ref={ref} scale={1.8}>
       {/* Slate Plate */}
       <mesh position={[0, -0.4, 0]}>
          <boxGeometry args={[2.5, 0.1, 1.5]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.8} />
       </mesh>
       {/* Clumpy Rice & Fish */}
       {[...Array(3)].map((_, i) => (
         <group key={i} position={[(i - 1) * 0.7, -0.1, 0]}>
            <group>
               {/* Rice cluster */}
               {[...Array(20)].map((_, j) => (
                 <mesh key={j} position={[
                   (Math.random() - 0.5) * 0.3,
                   (Math.random() - 0.5) * 0.2,
                   (Math.random() - 0.5) * 0.4
                 ]}>
                    <sphereGeometry args={[0.08, 8, 8]} />
                    <meshStandardMaterial color="#fff" roughness={1} />
                 </mesh>
               ))}
               {/* Translucent Salmon Slice */}
               <mesh position={[0, 0.15, 0]}>
                  <boxGeometry args={[0.4, 0.1, 0.6]} />
                  <meshStandardMaterial color="#ff7b54" roughness={0.3} metalness={0.1} transparent opacity={0.9} />
               </mesh>
               {/* White Stripes on Salmon */}
               <mesh position={[0, 0.21, 0]}>
                  <boxGeometry args={[0.42, 0.01, 0.5]} />
                  <meshStandardMaterial color="#fff" opacity={0.3} transparent />
               </mesh>
            </group>
         </group>
       ))}
    </group>
  );
}

function CholeBhatureModel() {
  const ref = useRef<any>(null);
  useFrame((state) => { if (ref.current) ref.current.rotation.y += 0.005; });
  return (
    <group ref={ref} scale={1.5}>
       {/* Brass Platter */}
       <mesh position={[0, -0.5, 0]}>
          <cylinderGeometry args={[2.5, 2.5, 0.1, 32]} />
          <meshStandardMaterial color="#d4af37" metalness={0.8} roughness={0.2} />
       </mesh>
       {/* Bhatura 1 */}
       <mesh position={[-0.8, -0.1, 0]} rotation={[0.2, 0, 0.1]}>
          <sphereGeometry args={[1, 32, 16]} scale={[1.2, 0.4, 1.2]} />
          <meshStandardMaterial color="#e9c46a" roughness={0.8} />
       </mesh>
       {/* Bhatura 2 */}
       <mesh position={[0.4, -0.1, 0.6]} rotation={[-0.1, 0.5, 0]}>
          <sphereGeometry args={[0.9, 32, 16]} scale={[1.1, 0.35, 1.1]} />
          <meshStandardMaterial color="#e9c46a" roughness={0.8} />
       </mesh>
       {/* Chole Bowl */}
       <mesh position={[0.8, -0.1, -0.8]}>
          <cylinderGeometry args={[0.8, 0.6, 0.6, 32]} />
          <meshStandardMaterial color="#fff" />
       </mesh>
       <mesh position={[0.8, 0.15, -0.8]}>
          <cylinderGeometry args={[0.7, 0.7, 0.1, 32]} />
          <meshStandardMaterial color="#432818" />
       </mesh>
    </group>
  );
}

function BiryaniModel() {
  const ref = useRef<any>(null);
  useFrame((state) => { if (ref.current) ref.current.rotation.y += 0.005; });
  return (
    <group ref={ref} scale={1.4}>
       {/* Traditional Copper Handi */}
       <mesh position={[0, -0.6, 0]}>
          <cylinderGeometry args={[1.8, 1.4, 0.8, 32]} />
          <meshStandardMaterial color="#b87333" metalness={0.7} roughness={0.3} />
       </mesh>
       <mesh position={[0, -0.2, 0]}>
          <cylinderGeometry args={[1.7, 1.7, 0.1, 32]} />
          <meshStandardMaterial color="#e9c46a" roughness={0.9} />
       </mesh>
       {/* Individual Spice & Rice Grains */}
       {[...Array(50)].map((_, i) => (
         <mesh 
           key={i} 
           position={[
              (Math.random() - 0.5) * 2.8, 
              (Math.random() - 0.5) * 0.2, 
              (Math.random() - 0.5) * 2.8
           ]} 
           rotation={[Math.random(), Math.random(), Math.random()]}
         >
            <boxGeometry args={[0.1, 0.05, 0.05]} />
            <meshStandardMaterial color={i % 5 === 0 ? "#ff9f1c" : i % 8 === 0 ? "#70e000" : "#fff"} />
         </mesh>
       ))}
       {/* Meat Chunks */}
       {[...Array(4)].map((_, i) => (
         <mesh key={i} position={[Math.cos(i) * 0.8, 0, Math.sin(i) * 0.8]}>
            <sphereGeometry args={[0.3, 8, 8]} />
            <meshStandardMaterial color="#432818" roughness={1} />
         </mesh>
       ))}
    </group>
  );
}

function SamosaModel() {
  const ref = useRef<any>(null);
  useFrame((state) => { if (ref.current) ref.current.rotation.y += 0.005; });
  return (
    <group ref={ref} scale={2}>
       {[...Array(3)].map((_, i) => (
         <group key={i} position={[(i - 1) * 0.8, -0.2, 0]} rotation={[0, i, 0]}>
            <mesh>
               <coneGeometry args={[0.4, 0.6, 3]} />
               <MeshDistortMaterial color="#dda15e" distort={0.2} speed={0} />
            </mesh>
            {/* Pastry Bubbles */}
            {[...Array(5)].map((_, j) => (
              <mesh key={j} position={[Math.random() * 0.2 - 0.1, Math.random() * 0.4 - 0.2, 0.1]}>
                <sphereGeometry args={[0.03]} />
                <meshStandardMaterial color="#bc8a5f" />
              </mesh>
            ))}
         </group>
       ))}
    </group>
  );
}

function MalaiKoftaModel() {
  const ref = useRef<any>(null);
  useFrame((state) => { if (ref.current) ref.current.rotation.y += 0.005; });
  return (
    <group ref={ref} scale={1.4}>
       {/* Ceramic Bowl */}
       <mesh>
          <cylinderGeometry args={[1.5, 1, 0.8, 32]} />
          <meshStandardMaterial color="#fff" side={2} roughness={0.2} />
       </mesh>
       {/* Creamy Gravy */}
       <mesh position={[0, 0.1, 0]}>
          <cylinderGeometry args={[1.4, 1.4, 0.1, 32]} />
          <meshStandardMaterial color="#fca311" roughness={0.3} />
       </mesh>
       {/* Kofta Balls */}
       {[...Array(3)].map((_, i) => (
          <mesh key={i} position={[
            Math.cos(i * 2.1) * 0.6,
            0.2,
            Math.sin(i * 2.1) * 0.6
          ]}>
             <sphereGeometry args={[0.35, 16, 16]} />
             <meshStandardMaterial color="#dda15e" />
          </mesh>
       ))}
       {/* Cashew bits */}
       {[...Array(8)].map((_, i) => (
          <mesh key={i} position={[
            (Math.random() - 0.5) * 1.5,
            0.25,
            (Math.random() - 0.5) * 1.5
          ]} rotation={[Math.random(), Math.random(), Math.random()]}>
             <boxGeometry args={[0.1, 0.05, 0.15]} />
             <meshStandardMaterial color="#fff" />
          </mesh>
       ))}
    </group>
  );
}

function LambRoganJoshModel() {
  const ref = useRef<any>(null);
  useFrame((state) => { if (ref.current) ref.current.rotation.y += 0.005; });
  return (
    <group ref={ref} scale={1.5}>
       {/* Copper Handi */}
       <mesh position={[0, -0.4, 0]}>
          <cylinderGeometry args={[1.5, 1, 1.2, 32]} />
          <meshStandardMaterial color="#b87333" metalness={0.8} roughness={0.2} />
       </mesh>
       {/* Red Gravy */}
       <mesh position={[0, 0.2, 0]}>
          <cylinderGeometry args={[1.4, 1.4, 0.1, 32]} />
          <meshStandardMaterial color="#9b2226" roughness={0.4} />
       </mesh>
       {/* Lamb Chunks */}
       {[...Array(5)].map((_, i) => (
         <mesh key={i} position={[
           (Math.random() - 0.5) * 1.5,
           0.3,
           (Math.random() - 0.5) * 1.5
         ]} rotation={[Math.random(), Math.random(), Math.random()]}>
            <sphereGeometry args={[0.3, 8, 8]} />
            <meshStandardMaterial color="#432818" />
         </mesh>
       ))}
    </group>
  );
}

function PancakeModel() {
  const ref = useRef<any>(null);
  useFrame((state) => { if (ref.current) ref.current.rotation.y += 0.005; });
  return (
    <group ref={ref} scale={1.8}>
       {/* Fluffy Pancake Stack */}
       {[...Array(4)].map((_, i) => (
         <mesh key={i} position={[0, i * 0.18 - 0.4, 0]}>
            <cylinderGeometry args={[1, 1, 0.15, 32]} />
            <meshStandardMaterial color="#dda15e" roughness={0.8} />
         </mesh>
       ))}
       {/* Realistic Melting Butter */}
       <mesh position={[0, 0.35, 0]}>
          <boxGeometry args={[0.3, 0.15, 0.3]} />
          <meshStandardMaterial color="#ffcc00" roughness={0.1} metalness={0.1} />
       </mesh>
       {/* Scattered Blueberries */}
       {[...Array(10)].map((_, i) => (
         <mesh key={i} position={[
           Math.cos(i) * 0.7,
           0.2 + Math.random() * 0.2,
           Math.sin(i) * 0.7
         ]}>
            <sphereGeometry args={[0.08]} />
            <meshStandardMaterial color="#3c096c" roughness={0.3} />
         </mesh>
       ))}
    </group>
  );
}

function DalMakhaniModel() {
  const ref = useRef<any>(null);
  useFrame((state) => { if (ref.current) ref.current.rotation.y += 0.005; });
  return (
     <group ref={ref} scale={1.4}>
       {/* Clay Pot */}
       <mesh position={[0, -0.4, 0]}>
          <cylinderGeometry args={[1.5, 1.2, 1, 32]} />
          <meshStandardMaterial color="#2b1a10" roughness={0.9} />
       </mesh>
       {/* Dal surface */}
       <mesh position={[0, 0.1, 0]}>
          <cylinderGeometry args={[1.4, 1.4, 0.1, 32]} />
          <meshStandardMaterial color="#432818" roughness={0.3} />
       </mesh>
       {/* Butter Dollop */}
       <mesh position={[0, 0.2, 0]} rotation={[0.2, 0.4, 0]}>
          <boxGeometry args={[0.4, 0.2, 0.4]} />
          <meshStandardMaterial color="#ffcc00" roughness={0.1} />
       </mesh>
       {/* Cream swirl */}
       {[...Array(10)].map((_, i) => (
         <mesh key={i} position={[
           Math.cos(i) * 0.8,
           0.16,
           Math.sin(i) * 0.8
         ]}>
            <sphereGeometry args={[0.06]} />
            <meshStandardMaterial color="#fff" />
         </mesh>
       ))}
     </group>
  );
}

function SaladModel() {
  const ref = useRef<any>(null);
  useFrame((state) => { if (ref.current) ref.current.rotation.y += 0.005; });
  return (
    <group ref={ref} scale={1.5}>
       {/* Wooden Salad Bowl */}
       <mesh position={[0, -0.4, 0]}>
          <cylinderGeometry args={[1.5, 1.2, 0.7, 32, 1, true]} />
          <meshStandardMaterial color="#432818" side={2} roughness={0.8} />
       </mesh>
       <mesh position={[0, -0.7, 0]}>
          <cylinderGeometry args={[1.2, 1.2, 0.05, 32]} />
          <meshStandardMaterial color="#432818" />
       </mesh>

       {/* Leafy Greens Base */}
       {[...Array(30)].map((_, i) => (
         <mesh 
           key={i} 
           position={[(Math.random() - 0.5) * 1.8, (Math.random() * 0.3) - 0.2, (Math.random() - 0.5) * 1.8]} 
           rotation={[Math.random(), Math.random(), Math.random()]}
         >
            <boxGeometry args={[0.5, 0.02, 0.4]} />
            <meshStandardMaterial color="#386641" roughness={1} />
         </mesh>
       ))}

       {/* Feta Cheese Cubes */}
       {[...Array(8)].map((_, i) => (
         <mesh key={i} position={[
           (Math.random() - 0.5) * 1.4,
           0.2,
           (Math.random() - 0.5) * 1.4
         ]} rotation={[0, Math.random(), 0]}>
            <boxGeometry args={[0.2, 0.2, 0.2]} />
            <meshStandardMaterial color="#fffef2" />
         </mesh>
       ))}

       {/* Kalamata Olives */}
       {[...Array(6)].map((_, i) => (
         <mesh key={i} position={[
           (Math.random() - 0.5) * 1.2,
           0.15,
           (Math.random() - 0.5) * 1.2
         ]}>
            <sphereGeometry args={[0.12, 16, 16]} scale={[0.8, 1, 0.8]} />
            <meshStandardMaterial color="#2b1a10" roughness={0.3} />
         </mesh>
       ))}

       {/* Cherry Tomatoes */}
       {[...Array(6)].map((_, i) => (
         <mesh key={i} position={[
           (Math.random() - 0.5) * 1.4,
           0.1,
           (Math.random() - 0.5) * 1.4
         ]}>
            <sphereGeometry args={[0.15, 16, 16]} />
            <meshStandardMaterial color="#d00000" roughness={0.2} />
         </mesh>
       ))}
    </group>
  );
}


function ChocolateCakeModel() {
  const ref = useRef<any>(null);
  useFrame((state) => { if (ref.current) ref.current.rotation.y += 0.005; });
  return (
    <group ref={ref} scale={1.6}>
       {/* Premium Ceramic Plate */}
       <mesh position={[0, -0.6, 0]}>
          <cylinderGeometry args={[2, 2.2, 0.1, 32]} />
          <meshStandardMaterial color="#fafafa" roughness={0.2} />
       </mesh>
       
       {/* Cake Body */}
       <mesh position={[0, -0.1, 0]}>
          <cylinderGeometry args={[1, 1, 0.9, 32]} />
          <meshStandardMaterial color="#2b1a10" roughness={0.8} />
       </mesh>
       
       {/* Molten Top / Ganache */}
       <mesh position={[0, 0.35, 0]}>
          <cylinderGeometry args={[1.02, 1.02, 0.1, 32]} />
          <meshStandardMaterial color="#1a0f0a" roughness={0.2} metalness={0.1} />
       </mesh>

       {/* Drip Effect */}
       {[...Array(12)].map((_, i) => (
         <mesh key={i} position={[
           Math.cos(i * 0.5) * 1,
           0.1,
           Math.sin(i * 0.5) * 1
         ]}>
            <capsuleGeometry args={[0.05, 0.4, 4, 8]} />
            <meshStandardMaterial color="#1a0f0a" roughness={0.2} />
         </mesh>
       ))}

       {/* Cocoa Dusting (Particles) */}
       {[...Array(20)].map((_, i) => (
         <mesh key={i} position={[
           (Math.random() - 0.5) * 1.8,
           0.41,
           (Math.random() - 0.5) * 1.8
         ]}>
            <sphereGeometry args={[0.02]} />
            <meshStandardMaterial color="#432818" />
         </mesh>
       ))}
    </group>
  );
}


function DosaModel() {
  const ref = useRef<any>(null);
  useFrame((state) => { if (ref.current) ref.current.rotation.y += 0.005; });
  return (
    <group ref={ref} scale={1.8}>
       <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.4, 0.4, 3, 32]} />
          <meshStandardMaterial color="#dda15e" />
       </mesh>
       {[...Array(2)].map((_, i) => (
         <mesh key={i} position={[i === 0 ? 0.8 : -0.8, -0.4, 0]}>
            <cylinderGeometry args={[0.3, 0.3, 0.2, 16]} />
            <meshStandardMaterial color={i === 0 ? "#fff" : "#ff9f1c"} />
         </mesh>
       ))}
    </group>
  );
}

function FishChipsModel() {
  const ref = useRef<any>(null);
  useFrame((state) => { if (ref.current) ref.current.rotation.y += 0.005; });
  return (
    <group ref={ref} scale={1.6}>
       {/* Newspaper Wrapping (Simulated) */}
       <mesh position={[0, -0.5, 0]}>
          <boxGeometry args={[2.5, 0.05, 2]} />
          <meshStandardMaterial color="#eeeeee" roughness={0.9} />
       </mesh>
       
       {/* Crispy Cod Fillet */}
       <mesh position={[0, -0.1, 0.4]} rotation={[0.1, 0, 0.05]}>
          <capsuleGeometry args={[0.3, 1.2, 4, 16]} scale={[1, 0.5, 1.5]} />
          <MeshDistortMaterial color="#dda15e" distort={0.3} speed={0} roughness={0.7} />
       </mesh>
       
       {/* Golden Chips */}
       {[...Array(12)].map((_, i) => (
         <mesh 
           key={i} 
           position={[(i * 0.15) - 0.8, -0.2, -0.3 + (Math.random() * 0.2)]} 
           rotation={[Math.random(), Math.random(), Math.random()]}
         >
            <boxGeometry args={[0.12, 0.12, 0.8]} />
            <meshStandardMaterial color="#ffcc00" roughness={0.4} />
         </mesh>
       ))}

       {/* Ramekin of Tartar Sauce */}
       <mesh position={[0.8, -0.2, -0.6]}>
          <cylinderGeometry args={[0.3, 0.25, 0.4, 16]} />
          <meshStandardMaterial color="#ffffff" roughness={0.2} />
       </mesh>
       <mesh position={[0.8, 0.01, -0.6]}>
          <cylinderGeometry args={[0.25, 0.25, 0.05, 16]} />
          <meshStandardMaterial color="#f8f9fa" />
       </mesh>
    </group>
  );
}


function TandooriChickenModel() {
  const ref = useRef<any>(null);
  useFrame((state) => { if (ref.current) ref.current.rotation.y += 0.005; });
  return (
    <group ref={ref} scale={1.5}>
       <mesh rotation={[0, 0, 0.5]}>
          <capsuleGeometry args={[0.4, 1, 4, 16]} />
          <meshStandardMaterial color="#d00000" roughness={0.8} />
       </mesh>
       <mesh position={[0.5, 0.5, 0]} rotation={[0, 0, 0.5]}>
          <cylinderGeometry args={[0.1, 0.1, 0.8]} />
          <meshStandardMaterial color="#eee" />
       </mesh>
    </group>
  );
}

function GulabJamunModel() {
  const ref = useRef<any>(null);
  useFrame((state) => { if (ref.current) ref.current.rotation.y += 0.005; });
  return (
    <group ref={ref} scale={1.8}>
       {/* Ornate Brass Bowl */}
       <mesh position={[0, -0.4, 0]}>
          <cylinderGeometry args={[1.2, 0.9, 0.6, 32]} />
          <meshStandardMaterial color="#d4af37" metalness={0.8} roughness={0.2} />
       </mesh>
       <mesh position={[0, -0.1, 0]}>
          <cylinderGeometry args={[1.3, 1.3, 0.05, 32]} />
          <meshStandardMaterial color="#d4af37" metalness={0.9} />
       </mesh>
       
       {/* Syrup Surface */}
       <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[1.1, 1.1, 0.1, 32]} />
          <meshStandardMaterial color="#603808" transparent opacity={0.6} roughness={0.1} />
       </mesh>

       {/* Soft Dumplings */}
       {[...Array(3)].map((_, i) => (
         <mesh key={i} position={[
           Math.cos(i * (Math.PI * 2 / 3)) * 0.45, 
           0.15, 
           Math.sin(i * (Math.PI * 2 / 3)) * 0.45
         ]}>
            <sphereGeometry args={[0.35, 32, 32]} />
            <MeshDistortMaterial color="#432818" distort={0.2} speed={0} roughness={0.3} />
         </mesh>
       ))}

       {/* Pistachio Garnish */}
       {[...Array(12)].map((_, i) => (
         <mesh key={i} position={[
           (Math.random() - 0.5) * 1.2,
           0.4,
           (Math.random() - 0.5) * 1.2
         ]} rotation={[Math.random(), Math.random(), Math.random()]}>
            <boxGeometry args={[0.08, 0.02, 0.04]} />
            <meshStandardMaterial color="#70e000" />
         </mesh>
       ))}
    </group>
  );
}


function LobsterModel() {
  const ref = useRef<any>(null);
  useFrame((state) => { if (ref.current) ref.current.rotation.y += 0.005; });
  return (
    <group ref={ref} scale={1.4}>
       {/* Premium White Plate */}
       <mesh position={[0, -0.6, 0]}>
          <cylinderGeometry args={[2.5, 2.7, 0.1, 64]} />
          <meshStandardMaterial color="#ffffff" roughness={0.2} />
       </mesh>
       
       {/* Lobster Body */}
       <mesh rotation={[0, 0, Math.PI / 2]} position={[0, -0.2, 0]}>
          <capsuleGeometry args={[0.4, 2.2, 8, 32]} />
          <meshStandardMaterial color="#e63946" roughness={0.4} metalness={0.1} />
       </mesh>
       
       {/* Tail segments */}
       {[...Array(5)].map((_, i) => (
         <mesh key={i} position={[-1.2 - (i * 0.2), -0.2, 0]} rotation={[0, 0, Math.PI / 2]}>
            <sphereGeometry args={[0.4 - (i * 0.05), 32, 32]} scale={[1, 0.5, 1.2]} />
            <meshStandardMaterial color="#d90429" />
         </mesh>
       ))}

       {/* Claws */}
       <group position={[1.2, -0.1, 0.5]} rotation={[0.2, 0.5, 0]}>
          <mesh>
             <sphereGeometry args={[0.4, 32, 32]} scale={[1.5, 0.6, 1]} />
             <meshStandardMaterial color="#e63946" />
          </mesh>
       </group>
       <group position={[1.2, -0.1, -0.5]} rotation={[-0.2, -0.5, 0]}>
          <mesh>
             <sphereGeometry args={[0.4, 32, 32]} scale={[1.5, 0.6, 1]} />
             <meshStandardMaterial color="#e63946" />
          </mesh>
       </group>

       {/* Garlic Butter & Parsley Garnishes */}
       {[...Array(15)].map((_, i) => (
         <mesh key={i} position={[
           (Math.random() - 0.5) * 2,
           0.2,
           (Math.random() - 0.5) * 0.8
         ]}>
            <sphereGeometry args={[0.03]} />
            <meshStandardMaterial color={i % 2 === 0 ? "#ffcc00" : "#386641"} />
         </mesh>
       ))}
    </group>
  );
}


const MENU_ITEMS = [
  { id: 0, name: "Truffle Pizza", price: "$24", description: "Black truffle shavings, fior di latte, aged parmesan.", model: <PizzaModel />, color: "#cf96ff", rating: "4.8", reviews: "124", image: "/items/pizza.png" },
  { id: 1, name: "Paneer Butter Masala", price: "$18", description: "Soft paneer cubes in a rich, creamy tomato and butter gravy.", model: <PaneerButterMasalaModel />, color: "#ff9f1c", rating: "4.9", reviews: "210", image: "/items/paneer_butter_masala.png" },
  { id: 2, name: "Matcha Dessert", price: "$14", description: "Organic premium matcha mousse, white chocolate ganache.", model: <MatchaDessertModel />, color: "#ffd16c", rating: "4.7", reviews: "86", image: "/items/matcha.png" },
  { id: 3, name: "Paneer Tikka", price: "$20", description: "Hand-crafted cottage cheese marinated in yogurt and spices.", model: <PaneerTikkaModel />, color: "#ff9f1c", rating: "4.9", reviews: "342", image: "/items/paneer_tikka.png" },
  { id: 4, name: "Butter Chicken", price: "$22", description: "Tender chicken pieces simmered in a velvety tomato gravy.", model: <ButterChickenModel />, color: "#d00000", rating: "5.0", reviews: "512", image: "/items/butter_chicken.png" },
  { id: 5, name: "Sushi Platter", price: "$28", description: "Fresh Atlantic salmon, seasoned rice, and nori with wasabi.", model: <SushiModel />, color: "#ff4d6d", rating: "4.9", reviews: "156", image: "/items/sushi.png" },
  { id: 6, name: "Chole Bhature", price: "$16", description: "Spicy chickpeas served with fluffy, deep-fried puffed bread.", model: <CholeBhatureModel />, color: "#ee9b00", rating: "4.8", reviews: "156", image: "/items/chole_bhature.png" },
  { id: 7, name: "Hyderabadi Biryani", price: "$24", description: "Fragrant basmati rice layered with spiced meat and saffron.", model: <BiryaniModel />, color: "#fca311", rating: "5.0", reviews: "820", image: "/items/biryani.png" },
  { id: 8, name: "Crispy Samosas", price: "$10", description: "Triangular pastry filled with spiced potatoes and peas.", model: <SamosaModel />, color: "#ee9b00", rating: "4.8", reviews: "420", image: "/items/samosa.png" },
  { id: 9, name: "Malai Kofta", price: "$19", description: "Fried potato and paneer dumplings in a rich, creamy golden gravy.", model: <MalaiKoftaModel />, color: "#ffd16c", rating: "4.8", reviews: "235", image: "/items/malai_kofta.png" },
  { id: 10, name: "Lamb Rogan Josh", price: "$45", description: "Kashmiri style lamb curry with aromatic spices and red chili.", model: <LambRoganJoshModel />, color: "#9b2226", rating: "4.9", reviews: "128", image: "/items/lamb_rogan_josh.png" },
  { id: 11, name: "Blueberry Pancakes", price: "$15", description: "Fluffy stack of pancakes served with maple syrup and butter.", model: <PancakeModel />, color: "#4895ef", rating: "4.5", reviews: "167", image: "/items/pancakes.png" },
  { id: 12, name: "Dal Makhani", price: "$21", description: "Slow-cooked black lentils with butter, cream, and spices.", model: <DalMakhaniModel />, color: "#432818", rating: "4.9", reviews: "312", image: "/items/dal_makhani.png" },
  { id: 13, name: "Greek Salad", price: "$14", description: "Fresh cucumbers, olives, feta cheese, and balsamic glaze.", model: <SaladModel />, color: "#70e000", rating: "4.4", reviews: "89", image: "/items/salad.png" },
  { id: 14, name: "Chocolate Fudge", price: "$12", description: "Decadent dark chocolate cake with a molten lava center.", model: <ChocolateCakeModel />, color: "#2b1a10", rating: "4.9", reviews: "453", image: "/items/cake.png" },
  { id: 15, name: "Masala Dosa", price: "$16", description: "Thin rice crepe filled with tempered potato masala.", model: <DosaModel />, color: "#d4a373", rating: "4.8", reviews: "654", image: "/items/dosa.png" },
  { id: 16, name: "Fish & Chips", price: "$18", description: "Beer-battered cod served with chunky fries and tartar sauce.", model: <FishChipsModel />, color: "#ffb703", rating: "4.7", reviews: "219", image: "/items/fish_chips.png" },
  { id: 17, name: "Tandoori Chicken", price: "$22", description: "Clay-oven roasted chicken marinated in spicy yogurt.", model: <TandooriChickenModel />, color: "#ae2012", rating: "4.9", reviews: "387", image: "/items/tandoori.png" },
  { id: 18, name: "Gulab Jamun", price: "$8", description: "Soft milk solids dumplings soaked in cardamom syrup.", model: <GulabJamunModel />, color: "#9b2226", rating: "5.0", reviews: "943", image: "/items/gulab_jamun.png" },
  { id: 19, name: "Grilled Lobster", price: "$52", description: "Whole lobster grilled with garlic butter and herbs.", model: <LobsterModel />, color: "#e63946", rating: "4.8", reviews: "76", image: "/items/lobster.png" },
];

function ARScene({ 
  model, 
  placed, 
  setPlaced, 
  placement,
  setPlacement
}: { 
  model: React.ReactNode, 
  placed: boolean, 
  setPlaced: (v: boolean) => void, 
  placement: { position: THREE.Vector3, quaternion: THREE.Quaternion } | null,
  setPlacement: (p: { position: THREE.Vector3, quaternion: THREE.Quaternion }) => void
}) {
  const reticleRef = useRef<THREE.Group>(null);
  const isPresenting = useXR((state) => !!state.session);

  useXRHitTest((results, getWorldMatrix) => {
    if (isPresenting && !placed && reticleRef.current) {
      if (results.length > 0) {
        reticleRef.current.visible = true;
        getWorldMatrix(reticleRef.current.matrix, results[0]);
        reticleRef.current.matrix.decompose(reticleRef.current.position, reticleRef.current.quaternion, reticleRef.current.scale);
      } else {
        reticleRef.current.visible = false;
      }
    }
  }, 'viewer');

  const handleSelect = () => {
    if (reticleRef.current && !placed && reticleRef.current.visible) {
      setPlacement({
        position: reticleRef.current.position.clone(),
        quaternion: reticleRef.current.quaternion.clone()
      });
      setPlaced(true);
    }
  };

  // Register select event for placement
  useXREvent('select', handleSelect);

  // If not in AR session, show the floating preview
  if (!isPresenting) {
    return (
      <group>
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
          {model}
        </Float>
        <ContactShadows opacity={0.4} scale={10} blur={2} far={4.5} />
      </group>
    );
  }

  return (
    <>
      {!placed ? (
        <group ref={reticleRef} visible={false}>
          <mesh rotation-x={-Math.PI / 2}>
            <ringGeometry args={[0.1, 0.12, 32]} />
            <meshStandardMaterial color="#00e3fd" emissive="#00e3fd" emissiveIntensity={2} transparent opacity={0.8} />
          </mesh>
          {/* Add a small center dot for better targeting */}
          <mesh rotation-x={-Math.PI / 2}>
            <circleGeometry args={[0.02, 32]} />
            <meshStandardMaterial color="#00e3fd" emissive="#00e3fd" emissiveIntensity={2} />
          </mesh>
        </group>
      ) : (
        <group 
          position={placement?.position} 
          quaternion={placement?.quaternion}
        >
          <Float speed={2} rotationIntensity={0.5} floatIntensity={0.2}>
            {model}
          </Float>
          {/* Add a subtle shadow for the placed object */}
          <ContactShadows 
            position={[0, 0, 0]}
            opacity={0.6} 
            scale={5} 
            blur={2.5} 
            far={1} 
          />
        </group>
      )}
      
      <ambientLight intensity={1} />
      <directionalLight position={[5, 5, 5]} intensity={1.5} />
    </>
  );
}

function ARStateSync({ setIsPresenting }: { setIsPresenting: (v: boolean) => void }) {
  const session = useXR((state) => state.session);
  useEffect(() => {
    setIsPresenting(!!session);
  }, [session, setIsPresenting]);
  return null;
}

export default function ARView({ defaultIndex = 0 }: { defaultIndex?: number }) {
  const [currentIndex, setCurrentIndex] = useState(defaultIndex);
  const [placed, setPlaced] = useState(false);
  const [isPresenting, setIsPresenting] = useState(false);
  const [placement, setPlacement] = useState<{ position: THREE.Vector3, quaternion: THREE.Quaternion } | null>(null);
  const currentItem = MENU_ITEMS[currentIndex];

  const nextItem = () => {
    setCurrentIndex((prev) => (prev + 1) % MENU_ITEMS.length);
    setPlaced(false);
    setPlacement(null);
  };
  const prevItem = () => {
    setCurrentIndex((prev) => (prev - 1 + MENU_ITEMS.length) % MENU_ITEMS.length);
    setPlaced(false);
    setPlacement(null);
  };

  return (
    <div className="relative h-screen bg-surface-dim overflow-hidden font-body">
      {/* Background (Simulated World - Hidden in AR) */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <AnimatePresence>
          <MotionDiv
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full h-full"
          >
            <img 
              src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=2000" 
              alt="Restaurant Table" 
              className="w-full h-full object-cover grayscale-[0.2] brightness-[0.5]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/20"></div>
          </MotionDiv>
        </AnimatePresence>
      </div>

      {/* Top App Bar */}
      <header className="fixed top-0 w-full z-50 bg-[#0d0e12]/40 backdrop-blur-xl border-b border-white/10 flex justify-between items-center px-6 py-4">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-primary">blur_on</span>
          <h1 className="text-xl font-headline font-bold tracking-tighter text-foreground uppercase">AR MENU EXPERT</h1>
        </div>
        <div className="w-10 h-10 rounded-full border border-primary/30 overflow-hidden shadow-[0_0_15px_rgba(207,150,255,0.3)]">
          <img src="https://i.pravatar.cc/150?u=chef" alt="Profile" className="w-full h-full object-cover" />
        </div>
      </header>

      {/* 3D Canvas */}
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <Canvas shadows>
          <XR store={store}>
            <ARStateSync setIsPresenting={setIsPresenting} />
            <PerspectiveCamera makeDefault position={[0, 4, 8]} fov={45} />
            <ambientLight intensity={0.7} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
            <Environment preset="city" />
            
              <Suspense fallback={null}>
                <ARScene 
                  model={currentItem.model} 
                  placed={placed} 
                  setPlaced={setPlaced} 
                  placement={placement}
                  setPlacement={setPlacement}
                />
              </Suspense>

            <OrbitControls enablePan={false} maxPolarAngle={Math.PI / 2.2} />
          </XR>
        </Canvas>
      </div>

      {/* HUD Overlay */}
      <div className="absolute inset-0 z-20 pointer-events-none flex flex-col justify-between p-6">
        {/* Interaction Prompt */}
        <div className="flex justify-center mt-20">
          <MotionDiv 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="glass px-6 py-3 rounded-full flex items-center gap-6 border border-white/10"
          >
            <div className="flex items-center gap-2 text-foreground/60 text-[10px] uppercase font-bold tracking-widest">
              <ZoomIn className="w-3 h-3 text-secondary" />
              <span>Pinch to zoom</span>
            </div>
            <div className="w-[1px] h-3 bg-white/10" />
            <div className="flex items-center gap-2 text-foreground/60 text-[10px] uppercase font-bold tracking-widest">
              <RotateCw className="w-3 h-3 text-secondary" />
              <span>Swipe to rotate</span>
            </div>
          </MotionDiv>
        </div>

        {/* Tracking Status & Instructions */}
        <div className="fixed top-24 left-1/2 -translate-x-1/2 w-full px-6 flex flex-col items-center gap-4">
          <AnimatePresence>
            {!placed && isPresenting && (
              <MotionDiv 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-primary/20 backdrop-blur-xl border border-primary/40 px-6 py-4 rounded-2xl text-center shadow-[0_0_30px_rgba(207,150,255,0.2)]"
              >
                <div className="flex items-center justify-center gap-3 mb-1">
                   <div className="w-2 h-2 rounded-full bg-primary animate-ping" />
                   <span className="text-xs font-headline font-bold uppercase tracking-[0.2em] text-primary">Scanning Surface</span>
                </div>
                <p className="text-[10px] text-foreground/80 font-light">Point your camera at a table or floor</p>
              </MotionDiv>
            )}
          </AnimatePresence>

          <div className="flex items-center gap-2 glass px-4 py-2 rounded-xl border-l-4 border-secondary shadow-lg">
             <Cpu className="w-4 h-4 text-secondary" />
             <span className="text-[10px] font-headline font-bold uppercase tracking-widest text-secondary">
               {isPresenting ? 'Spatial Tracking Active' : '3D Preview Mode'}
             </span>
          </div>
        </div>

        {/* Info Card */}
        <div className="w-full max-w-lg mx-auto pointer-events-auto space-y-6 mb-4">
           <div className="flex items-center gap-4">
              <button 
                onClick={prevItem}
                className="w-14 h-14 flex items-center justify-center rounded-full glass border border-white/10 hover:bg-white/5 active:scale-90 transition-all group"
              >
                <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
              </button>
              
              <div className="flex-grow glass p-6 rounded-[2.5rem] relative overflow-hidden group shadow-2xl">
                 <div className="absolute top-4 right-6">
                    <span className="text-10px uppercase tracking-widest text-primary font-bold">Interactive View</span>
                 </div>
                 <MotionDiv
                   key={currentIndex}
                   initial={{ x: 20, opacity: 0 }}
                   animate={{ x: 0, opacity: 1 }}
                   transition={{ duration: 0.3 }}
                 >
                   <h2 className="text-xl font-headline font-bold mb-1 tracking-tight">{currentItem.name}</h2>
                   <p className="text-foreground/50 text-xs font-light pr-12 leading-relaxed">
                     {currentItem.description}
                   </p>
                   <div className="mt-4 flex items-center gap-1">
                      {[1,2,3,4,5].map(i => (
                        <span key={i} className="material-symbols-outlined text-tertiary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                      ))}
                      <span className="text-[10px] text-foreground/30 ml-2 uppercase font-bold tracking-tight">{currentItem.rating} ({currentItem.reviews} reviews)</span>
                   </div>
                 </MotionDiv>
              </div>

              <button 
                onClick={nextItem}
                className="w-14 h-14 flex items-center justify-center rounded-full glass border border-white/10 hover:bg-white/5 active:scale-90 transition-all group"
              >
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </button>
           </div>

            <div className="flex gap-3">
              <ARButton 
                store={store}
                className="flex-1 bg-white/10 backdrop-blur-md border border-white/20 py-5 rounded-full font-headline font-bold text-white tracking-[0.2em] uppercase text-[10px] shadow-2xl hover:bg-white/20 transition-all flex items-center justify-center gap-2"
              >
                <Camera className="w-4 h-4 text-primary" />
                Start AR View
              </ARButton>

              <button className="flex-1 bg-gradient-to-r from-primary to-primary-dim py-5 rounded-full font-headline font-bold text-background tracking-[0.2em] uppercase text-[10px] shadow-[0_0_40px_rgba(207,150,255,0.4)] hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2">
                <ShoppingBag className="w-4 h-4" />
                Order Now
              </button>
            </div>
        </div>
      </div>

      {/* Decorative HUD Details */}
      <div className="fixed top-1/2 left-6 -translate-y-1/2 flex flex-col items-center gap-4 opacity-30 pointer-events-none">
         <div className="w-1 h-32 glass relative overflow-hidden rounded-full">
            <MotionDiv 
               animate={{ top: ['0%', '100%', '0%'] }}
               transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
               className="absolute top-0 w-full h-8 bg-secondary shadow-[0_0_10px_#00e3fd]" 
            />
         </div>
         <span className="text-[8px] font-bold tracking-[0.3em] uppercase vertical-text">Signal Intensity</span>
      </div>
      
      <div className="fixed top-24 right-6 space-y-2 opacity-30 pointer-events-none text-right">
         <div className="glass p-3 rounded-xl border border-white/5 space-y-1">
            <div className="flex items-center justify-end gap-2">
               <span className="text-[8px] font-bold tracking-widest">LENS_01</span>
               <div className="w-1 h-1 rounded-full bg-secondary" />
            </div>
            <div className="flex items-center justify-end gap-2">
               <span className="text-[8px] font-bold tracking-widest">FOV 85°</span>
               <div className="w-1 h-1 rounded-full bg-secondary" />
            </div>
            <div className="flex items-center justify-end gap-2">
               <span className="text-[8px] font-bold tracking-widest">60 FPS</span>
               <div className="w-1 h-1 rounded-full bg-tertiary" />
            </div>
         </div>
      </div>

      <style jsx>{`
        .vertical-text {
          writing-mode: vertical-rl;
          transform: rotate(180deg);
        }
      `}</style>
    </div>
  );
}

