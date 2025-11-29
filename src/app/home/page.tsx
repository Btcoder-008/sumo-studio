"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

// App-related icons for marquee
const marqueeIcons = [
  "📱", "💻", "🎮", "📷", "🎵", "📧", "🔔", "⚙️",
  "🛒", "📊", "🎬", "🌐", "💬", "📅", "🔍", "☁️",
];

// Studio cards data
const studioCards = [
  {
    title: "Terminal",
    icon: "🚀",
    href: "/terminal",
    description: "Create new projects",
    bgColor: "from-green-400 to-emerald-500",
    hoverColor: "hover:shadow-green-300/50",
  },
  {
    title: "Frontend Studio",
    icon: "🎨",
    href: "/frontend-studio",
    description: "Design UI components",
    bgColor: "from-orange-400 to-pink-500",
    hoverColor: "hover:shadow-orange-300/50",
  },
  {
    title: "Backend Studio",
    icon: "⚙️",
    href: "/backend-studio",
    description: "Build APIs & services",
    bgColor: "from-pink-400 to-purple-500",
    hoverColor: "hover:shadow-pink-300/50",
  },
  {
    title: "Module Studio",
    icon: "🧩",
    href: "/module-studio",
    description: "Create reusable modules",
    bgColor: "from-purple-400 to-indigo-500",
    hoverColor: "hover:shadow-purple-300/50",
  },
  {
    title: "Products",
    icon: "📦",
    href: "/products",
    description: "Build from products",
    bgColor: "from-blue-400 to-indigo-500",
    hoverColor: "hover:shadow-blue-300/50",
  },
  {
    title: "Deploy",
    icon: "🚀",
    href: "/deploy",
    description: "Deploy to production",
    bgColor: "from-green-400 to-emerald-500",
    hoverColor: "hover:shadow-green-300/50",
  },
];

// Marquee component with center focus effect
function IconMarquee() {
  const [activeIndex, setActiveIndex] = useState(0);
  const totalIcons = marqueeIcons.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % totalIcons);
    }, 2000); // 2 second hold for each center icon

    return () => clearInterval(interval);
  }, [totalIcons]);

  // Create a doubled array for seamless looping
  const displayIcons = [...marqueeIcons, ...marqueeIcons, ...marqueeIcons];

  return (
    <div className="relative w-full overflow-hidden py-8">
      {/* Gradient fade on sides */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-yellow-50 via-yellow-50/80 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-pink-50 via-pink-50/80 to-transparent z-10 pointer-events-none" />

      <div
        className="flex items-center justify-center gap-8 transition-transform duration-1000 ease-in-out"
        style={{
          transform: `translateX(${-activeIndex * 80}px)`,
        }}
      >
        {displayIcons.map((icon, index) => {
          const actualIndex = index % totalIcons;
          const isCenter = actualIndex === activeIndex;
          const isNearCenter =
            actualIndex === (activeIndex - 1 + totalIcons) % totalIcons ||
            actualIndex === (activeIndex + 1) % totalIcons;

          return (
            <div
              key={index}
              className={`flex-shrink-0 transition-all duration-500 ease-out ${
                isCenter
                  ? "text-7xl md:text-8xl scale-125 opacity-100 drop-shadow-2xl"
                  : isNearCenter
                    ? "text-5xl md:text-6xl scale-100 opacity-70"
                    : "text-4xl md:text-5xl scale-90 opacity-40"
              }`}
              style={{
                filter: isCenter ? "drop-shadow(0 0 20px rgba(251, 146, 60, 0.5))" : "none",
              }}
            >
              {icon}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-yellow-50 via-orange-50 to-pink-50">
      {/* Gradient orbs for futuristic effect */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-orange-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: "1s" }} />
      <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: "2s" }} />

      {/* Header */}
      <header className="relative z-20 bg-white/80 backdrop-blur-md shadow-lg border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/super-sumo.png"
                alt="Super Sumo"
                width={80}
                height={80}
                className="cursor-pointer hover:scale-105 transition-transform drop-shadow-lg"
              />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Sumo Studio
              </h1>
              <p className="text-xs text-gray-500 tracking-tight">Build your app with Sumo</p>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="flex items-center gap-2">
            <Link
              href="/terminal"
              className="px-4 py-2 text-gray-700 font-medium rounded-lg hover:bg-yellow-100 hover:text-yellow-700 transition-all"
            >
              Terminal
            </Link>
            <Link
              href="/frontend-studio"
              className="px-4 py-2 text-gray-700 font-medium rounded-lg hover:bg-orange-100 hover:text-orange-700 transition-all"
            >
              Frontend Studio
            </Link>
            <Link
              href="/backend-studio"
              className="px-4 py-2 text-gray-700 font-medium rounded-lg hover:bg-pink-100 hover:text-pink-700 transition-all"
            >
              Backend Studio
            </Link>
            <Link
              href="/module-studio"
              className="px-4 py-2 text-gray-700 font-medium rounded-lg hover:bg-purple-100 hover:text-purple-700 transition-all"
            >
              Module Studio
            </Link>
            <Link
              href="/products"
              className="px-4 py-2 text-gray-700 font-medium rounded-lg hover:bg-blue-100 hover:text-blue-700 transition-all"
            >
              Products
            </Link>
            <Link
              href="/deploy"
              className="px-4 py-2 text-gray-700 font-medium rounded-lg hover:bg-green-100 hover:text-green-700 transition-all"
            >
              Deploy
            </Link>
          </nav>
        </div>
      </header>

      {/* Main content */}
      <main className="relative z-10 flex flex-col items-center justify-center px-4 py-8">
        {/* Marquee Icons */}
        <div className="w-full max-w-5xl mb-8">
          <IconMarquee />
        </div>

        {/* Studio cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 max-w-7xl w-full">
          {studioCards.map((card) => (
            <Link
              key={card.title}
              href={card.href}
              className={`group relative bg-white/70 backdrop-blur-lg rounded-2xl p-6 border border-white/30 shadow-xl ${card.hoverColor} hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-2`}
            >
              <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${card.bgColor} flex items-center justify-center mb-4 mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <span className="text-3xl">{card.icon}</span>
              </div>
              <h2 className="text-lg font-bold text-gray-800 text-center mb-1">
                {card.title}
              </h2>
              <p className="text-sm text-gray-500 text-center">
                {card.description}
              </p>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
