"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls, MeshDistortMaterial, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

function RotatingFood() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.2;
    }
  });

  return (
    <group>
      {/* Pizza Base (Torus) */}
      <mesh ref={meshRef}>
        <torusGeometry args={[2, 0.4, 16, 100]} />
        <MeshDistortMaterial
          color="#cf96ff"
          speed={2}
          distort={0.3}
          radius={1}
        />
      </mesh>
      
      {/* HUD Rings */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2.5, 2.6, 64]} />
        <meshBasicMaterial color="#00e3fd" transparent opacity={0.3} side={THREE.DoubleSide} />
      </mesh>

      <mesh rotation={[Math.PI / 2, 0, 1]}>
        <ringGeometry args={[2.8, 2.85, 3]} />
        <meshBasicMaterial color="#ffd16c" transparent opacity={0.5} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

export default function Hero3D() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 8]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#cf96ff" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#00e3fd" />
        
        <Float speed={2} rotationIntensity={1} floatIntensity={1}>
          <RotatingFood />
        </Float>

        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  );
}
