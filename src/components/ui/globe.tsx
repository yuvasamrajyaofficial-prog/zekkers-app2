"use client";

import React, { useEffect, useRef } from "react";
import createGlobe from "cobe";
import { cn } from "@/lib/utils";

interface GlobeProps {
  className?: string;
}

export const Globe: React.FC<GlobeProps> = ({ className }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let phi = 0;

    if (!canvasRef.current) return;

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: 800 * 2, // Reduced from 1000
      height: 800 * 2, // Reduced from 1000
      phi: 0,
      theta: 0,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.3, 0.3, 0.3],
      markerColor: [0.1, 0.8, 1],
      glowColor: [0.1, 0.1, 0.2],
      markers: [
        // Americas
        { location: [37.7595, -122.4367], size: 0.03 }, // San Francisco
        { location: [40.7128, -74.0060], size: 0.03 }, // New York
        { location: [-23.5505, -46.6333], size: 0.03 }, // Sao Paulo
        { location: [19.4326, -99.1332], size: 0.03 }, // Mexico City
        { location: [43.6532, -79.3832], size: 0.03 }, // Toronto
        // Europe
        { location: [51.5074, -0.1278], size: 0.03 }, // London
        { location: [52.5200, 13.4050], size: 0.03 }, // Berlin
        { location: [48.8566, 2.3522], size: 0.03 }, // Paris
        { location: [41.9028, 12.4964], size: 0.03 }, // Rome
        { location: [55.7558, 37.6173], size: 0.03 }, // Moscow
        // Asia
        { location: [35.6762, 139.6503], size: 0.03 }, // Tokyo
        { location: [28.6139, 77.2090], size: 0.03 }, // New Delhi
        { location: [1.3521, 103.8198], size: 0.03 }, // Singapore
        { location: [25.2048, 55.2708], size: 0.03 }, // Dubai
        { location: [31.2304, 121.4737], size: 0.03 }, // Shanghai
        { location: [13.7563, 100.5018], size: 0.03 }, // Bangkok
        // Africa & Oceania
        { location: [-33.8688, 151.2093], size: 0.03 }, // Sydney
        { location: [-1.2921, 36.8219], size: 0.03 }, // Nairobi
        { location: [-33.9249, 18.4241], size: 0.03 }, // Cape Town
        { location: [30.0444, 31.2357], size: 0.03 }, // Cairo
      ],
      onRender: (state) => {
        // Called on every animation frame.
        // `state` will be an empty object, return updated params.
        state.phi = phi;
        phi += 0.003;
      },
    });

    return () => {
      globe.destroy();
    };
  }, []);

  return (
    <div className={cn("w-full h-full flex items-center justify-center", className)}>
        <canvas
            ref={canvasRef}
            style={{ width: 800, height: 800, maxWidth: "100%", aspectRatio: 1 }}
        />
    </div>
  );
};
