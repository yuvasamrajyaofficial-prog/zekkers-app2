"use client";

import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface GlobeProps {
  className?: string;
}

export const Globe: React.FC<GlobeProps> = ({ className }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = canvas.width = canvas.offsetWidth;
    let height = canvas.height = canvas.offsetHeight;
    
    // Globe parameters
    const GLOBE_RADIUS = width < 600 ? width * 0.35 : 250;
    const DOT_RADIUS = 1.5;
    const DOT_COUNT = 600;
    const ROTATION_SPEED = 0.002;
    
    // Generate points on a sphere
    const points: { x: number; y: number; z: number; phi: number; theta: number }[] = [];
    for (let i = 0; i < DOT_COUNT; i++) {
      const phi = Math.acos(-1 + (2 * i) / DOT_COUNT);
      const theta = Math.sqrt(DOT_COUNT * Math.PI) * phi;
      
      points.push({
        x: GLOBE_RADIUS * Math.cos(theta) * Math.sin(phi),
        y: GLOBE_RADIUS * Math.sin(theta) * Math.sin(phi),
        z: GLOBE_RADIUS * Math.cos(phi),
        phi,
        theta
      });
    }

    let rotation = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Center of canvas
      const cx = width / 2;
      const cy = height / 2;

      rotation += ROTATION_SPEED;

      // Sort points by Z depth so back points are drawn first (or we can just fade them)
      const projectedPoints = points.map(p => {
        // Rotate around Y axis
        const x = p.x * Math.cos(rotation) - p.z * Math.sin(rotation);
        const z = p.x * Math.sin(rotation) + p.z * Math.cos(rotation);
        const y = p.y;

        // Simple perspective projection
        const scale = 400 / (400 - z);
        const alpha = (z + GLOBE_RADIUS) / (2 * GLOBE_RADIUS); // 0 to 1 based on depth

        return {
          x: cx + x, // Orthographic-ish for now, or add perspective
          y: cy + y,
          z: z,
          alpha: Math.max(0.1, alpha)
        };
      });

      // Draw points
      projectedPoints.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, DOT_RADIUS, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(100, 149, 237, ${p.alpha})`; // Cornflower blueish
        ctx.fill();
      });
      
      // Draw some connecting lines for "constellation" effect (optional, maybe too heavy)
      // Keeping it simple for performance: just dots for now to look like "universe" stars/cities

      requestAnimationFrame(render);
    };

    const handleResize = () => {
        if(canvas) {
            width = canvas.width = canvas.offsetWidth;
            height = canvas.height = canvas.offsetHeight;
        }
    };

    window.addEventListener('resize', handleResize);
    const animationId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={cn("w-full h-full opacity-60", className)}
      style={{ width: '100%', height: '100%' }}
    />
  );
};
