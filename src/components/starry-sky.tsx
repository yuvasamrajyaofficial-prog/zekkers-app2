'use client';

import React, { useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

const StarrySky = ({ className }: { className?: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let animationFrameId: number;

    const resizeCanvas = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const stars: { x: number; y: number; radius: number; alpha: number; dying: boolean }[] = [];

    const createStars = (count: number) => {
        for (let i = 0; i < count; i++) {
            stars.push({
                x: Math.random() * width,
                y: Math.random() * height,
                radius: Math.random() * 1.1,
                alpha: Math.random() * 0.5 + 0.5,
                dying: false
            });
        }
    };

    const drawStars = () => {
        ctx.clearRect(0, 0, width, height);
        
        stars.forEach(star => {
            // Calculate distance to mouse
            const dx = star.x - mouse.x;
            const dy = star.y - mouse.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            // Interaction radius
            const hoverRadius = 150;
            
            let alpha = star.alpha;
            let radius = star.radius;

            if (distance < hoverRadius) {
                // Calculate intensity based on proximity (0 to 1)
                const intensity = 1 - (distance / hoverRadius);
                // Boost alpha up to 1.0
                alpha = Math.min(1, star.alpha + intensity * 0.8);
                // Boost radius slightly
                radius = star.radius * (1 + intensity * 0.5);
            }

            ctx.beginPath();
            ctx.arc(star.x, star.y, radius, 0, 2 * Math.PI);
            ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
            ctx.fill();
        });
    };

    const updateStars = () => {
        stars.forEach(star => {
            if (star.dying) {
                star.alpha -= 0.02;
            } else {
                star.alpha += (Math.random() - 0.5) * 0.05;
            }

            if(star.alpha <= 0) {
                 star.alpha = 0;
                 star.x = Math.random() * width;
                 star.y = -10; // Respawn at top
                 star.dying = false;
                 star.alpha = Math.random() * 0.5 + 0.5;
            } else if (star.alpha > 1) {
                 star.alpha = 1;
            }
            
            star.y += 0.2; // slow fall
            if (star.y > height) {
                star.y = -10;
                star.x = Math.random() * width;
            }
        });
    };
    
    let mouse = { x: -100, y: -100 };
    const handleMouseMove = (event: MouseEvent) => {
        mouse.x = event.clientX;
        mouse.y = event.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);


    const animate = () => {
        drawStars();
        updateStars();
        animationFrameId = requestAnimationFrame(animate);
    };

    createStars(200);
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className={cn("fixed top-0 left-0 w-full h-full -z-10", className)} />;
};

export default StarrySky;
