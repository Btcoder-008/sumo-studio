"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface SplashScreenProps {
  onComplete?: () => void;
  duration?: number;
}

export default function SplashScreen({
  onComplete,
  duration = 2500
}: SplashScreenProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setIsFading(true);
    }, duration - 500);

    const hideTimer = setTimeout(() => {
      setIsVisible(false);
      onComplete?.();
    }, duration);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, [duration, onComplete]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-white transition-opacity duration-500 ${
        isFading ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="flex flex-col items-center">
        <div className="animate-pulse">
          <Image
            src="/splash-logo.png"
            alt="Super Sumo"
            width={300}
            height={300}
            priority
            className="drop-shadow-xl"
          />
        </div>
        <div className="mt-8 flex space-x-2">
          <div className="h-3 w-3 rounded-full bg-orange-400 animate-bounce" style={{ animationDelay: "0ms" }}></div>
          <div className="h-3 w-3 rounded-full bg-orange-500 animate-bounce" style={{ animationDelay: "150ms" }}></div>
          <div className="h-3 w-3 rounded-full bg-orange-600 animate-bounce" style={{ animationDelay: "300ms" }}></div>
        </div>
      </div>
    </div>
  );
}
