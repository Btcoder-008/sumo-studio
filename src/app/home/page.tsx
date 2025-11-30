"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// Floating app icon component
function FloatingIcon({ icon, style }: { icon: string; style: React.CSSProperties }) {
  return (
    <div
      className="absolute text-2xl md:text-4xl lg:text-5xl opacity-35 animate-float pointer-events-none"
      style={style}
    >
      {icon}
    </div>
  );
}

// App-related icons for floating background
const floatingIcons = [
  { icon: "📱", top: "5%", left: "10%", delay: "0s", duration: "6s" },
  { icon: "💻", top: "15%", right: "15%", delay: "1s", duration: "7s" },
  { icon: "🎮", top: "25%", left: "5%", delay: "2s", duration: "5s" },
  { icon: "📷", bottom: "30%", right: "10%", delay: "0.5s", duration: "8s" },
  { icon: "🎵", top: "40%", left: "15%", delay: "1.5s", duration: "6s" },
  { icon: "📧", bottom: "20%", left: "8%", delay: "3s", duration: "7s" },
  { icon: "🔔", top: "10%", right: "30%", delay: "2.5s", duration: "5s" },
  { icon: "⚙️", bottom: "15%", right: "25%", delay: "1s", duration: "6s" },
  { icon: "🛒", top: "60%", right: "5%", delay: "0s", duration: "7s" },
  { icon: "📊", bottom: "40%", left: "20%", delay: "2s", duration: "8s" },
  { icon: "🎬", top: "70%", left: "3%", delay: "1.5s", duration: "5s" },
  { icon: "🌐", top: "8%", left: "40%", delay: "3s", duration: "6s" },
  { icon: "💬", bottom: "10%", right: "40%", delay: "0.5s", duration: "7s" },
  { icon: "📅", top: "50%", right: "20%", delay: "2.5s", duration: "5s" },
  { icon: "🔍", bottom: "50%", left: "30%", delay: "1s", duration: "8s" },
  { icon: "☁️", top: "20%", left: "25%", delay: "0s", duration: "6s" },
];

// Studio cards data
const studioCards = [
  {
    title: "Terminal",
    icon: "🚀",
    href: "/terminal",
    bgColor: "from-green-400 to-emerald-500",
    hoverColor: "hover:shadow-green-300/50",
  },
  {
    title: "Frontend Studio",
    icon: "🎨",
    href: "/frontend-studio",
    bgColor: "from-orange-400 to-pink-500",
    hoverColor: "hover:shadow-orange-300/50",
  },
  {
    title: "Backend Studio",
    icon: "⚙️",
    href: "/backend-studio",
    bgColor: "from-pink-400 to-purple-500",
    hoverColor: "hover:shadow-pink-300/50",
  },
  {
    title: "Design Studio",
    icon: "🧩",
    href: "/module-studio",
    bgColor: "from-purple-400 to-indigo-500",
    hoverColor: "hover:shadow-purple-300/50",
  },
  {
    title: "Products",
    icon: "📦",
    href: "/products",
    bgColor: "from-blue-400 to-indigo-500",
    hoverColor: "hover:shadow-blue-300/50",
  },
  {
    title: "Deploy",
    icon: "☁️",
    href: "/deploy",
    bgColor: "from-sky-400 to-cyan-500",
    hoverColor: "hover:shadow-sky-300/50",
  },
];

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-yellow-50 via-orange-50 to-pink-50">
      {/* Floating app icons background - hidden on mobile */}
      <div className="hidden md:block">
        {floatingIcons.map((item, index) => (
          <FloatingIcon
            key={index}
            icon={item.icon}
            style={{
              top: item.top,
              left: item.left,
              right: item.right,
              bottom: item.bottom,
              animationDelay: item.delay,
              animationDuration: item.duration,
            } as React.CSSProperties}
          />
        ))}
      </div>

      {/* Gradient orbs for futuristic effect */}
      <div className="absolute top-0 left-0 w-48 md:w-96 h-48 md:h-96 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
      <div className="absolute top-1/2 right-0 w-48 md:w-96 h-48 md:h-96 bg-orange-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: "1s" }} />
      <div className="absolute bottom-0 left-1/3 w-48 md:w-96 h-48 md:h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: "2s" }} />

      {/* Header */}
      <header className="relative z-20 bg-white/80 backdrop-blur-md shadow-lg border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2 flex-shrink-0">
              <Image
                src="/super-sumo.png"
                alt="Super Sumo"
                width={80}
                height={80}
                className="cursor-pointer hover:scale-105 transition-transform drop-shadow-lg w-12 h-12 md:w-20 md:h-20"
              />
            </Link>
            <div>
              <h1 className="text-lg md:text-2xl font-bold text-gray-800">
                Sumo Studio
              </h1>
              <p className="text-gray-500 tracking-tight text-xs md:text-sm hidden sm:block" style={{ fontSize: '10pt' }}>Build your app with Sumo</p>
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {/* Desktop Navigation Menu */}
          <nav className="hidden md:flex items-center gap-2">
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
              Design Studio
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

        {/* Mobile Navigation Menu */}
        {menuOpen && (
          <nav className="md:hidden bg-white/95 backdrop-blur-md border-t border-gray-100 px-4 py-2">
            <div className="grid grid-cols-2 gap-2">
              <Link
                href="/terminal"
                className="px-4 py-3 text-gray-700 font-medium rounded-lg hover:bg-yellow-100 hover:text-yellow-700 transition-all text-center"
                onClick={() => setMenuOpen(false)}
              >
                Terminal
              </Link>
              <Link
                href="/frontend-studio"
                className="px-4 py-3 text-gray-700 font-medium rounded-lg hover:bg-orange-100 hover:text-orange-700 transition-all text-center"
                onClick={() => setMenuOpen(false)}
              >
                Frontend
              </Link>
              <Link
                href="/backend-studio"
                className="px-4 py-3 text-gray-700 font-medium rounded-lg hover:bg-pink-100 hover:text-pink-700 transition-all text-center"
                onClick={() => setMenuOpen(false)}
              >
                Backend
              </Link>
              <Link
                href="/module-studio"
                className="px-4 py-3 text-gray-700 font-medium rounded-lg hover:bg-purple-100 hover:text-purple-700 transition-all text-center"
                onClick={() => setMenuOpen(false)}
              >
                Module
              </Link>
              <Link
                href="/products"
                className="px-4 py-3 text-gray-700 font-medium rounded-lg hover:bg-blue-100 hover:text-blue-700 transition-all text-center"
                onClick={() => setMenuOpen(false)}
              >
                Products
              </Link>
              <Link
                href="/deploy"
                className="px-4 py-3 text-gray-700 font-medium rounded-lg hover:bg-green-100 hover:text-green-700 transition-all text-center"
                onClick={() => setMenuOpen(false)}
              >
                Deploy
              </Link>
            </div>
          </nav>
        )}
      </header>

      {/* Main content */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-100px)]">
        {/* Marquee container */}
        <div className="w-full overflow-hidden py-6 md:py-10 group/marquee">
          <div className="flex gap-4 md:gap-10 animate-marquee group-hover/marquee:[animation-play-state:paused]">
            {/* First set of cards */}
            {studioCards.map((card, index) => (
              <Link
                key={`first-${card.title}-${index}`}
                href={card.href}
                className={`group flex-shrink-0 w-32 h-32 md:w-52 md:h-52 bg-white/70 backdrop-blur-lg rounded-2xl md:rounded-3xl p-4 md:p-8 border border-white/30 shadow-xl ${card.hoverColor} hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-2 flex flex-col items-center justify-center`}
              >
                <div className={`w-12 h-12 md:w-20 md:h-20 rounded-xl md:rounded-2xl bg-gradient-to-br ${card.bgColor} flex items-center justify-center mb-2 md:mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <span className="text-2xl md:text-4xl">{card.icon}</span>
                </div>
                <h2 className="text-xs md:text-base font-bold text-gray-800 text-center whitespace-nowrap">
                  {card.title}
                </h2>
              </Link>
            ))}
            {/* Second set of cards (duplicate for seamless loop) */}
            {studioCards.map((card, index) => (
              <Link
                key={`second-${card.title}-${index}`}
                href={card.href}
                className={`group flex-shrink-0 w-32 h-32 md:w-52 md:h-52 bg-white/70 backdrop-blur-lg rounded-2xl md:rounded-3xl p-4 md:p-8 border border-white/30 shadow-xl ${card.hoverColor} hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-2 flex flex-col items-center justify-center`}
              >
                <div className={`w-12 h-12 md:w-20 md:h-20 rounded-xl md:rounded-2xl bg-gradient-to-br ${card.bgColor} flex items-center justify-center mb-2 md:mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <span className="text-2xl md:text-4xl">{card.icon}</span>
                </div>
                <h2 className="text-xs md:text-base font-bold text-gray-800 text-center whitespace-nowrap">
                  {card.title}
                </h2>
              </Link>
            ))}
          </div>
        </div>
      </main>

      {/* Marquee animation styles */}
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-50% - 20px));
          }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </div>
  );
}
