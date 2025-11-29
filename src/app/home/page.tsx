"use client";

import Image from "next/image";
import Link from "next/link";

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
    title: "Module Studio",
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
      <main className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-100px)]">
        {/* Marquee container */}
        <div className="w-full overflow-hidden py-10 group/marquee">
          <div className="flex gap-10 animate-marquee group-hover/marquee:[animation-play-state:paused]">
            {/* First set of cards */}
            {studioCards.map((card, index) => (
              <Link
                key={`first-${card.title}-${index}`}
                href={card.href}
                className={`group flex-shrink-0 w-52 h-52 bg-white/70 backdrop-blur-lg rounded-3xl p-8 border border-white/30 shadow-xl ${card.hoverColor} hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-2 flex flex-col items-center justify-center`}
              >
                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${card.bgColor} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <span className="text-4xl">{card.icon}</span>
                </div>
                <h2 className="text-base font-bold text-gray-800 text-center whitespace-nowrap">
                  {card.title}
                </h2>
              </Link>
            ))}
            {/* Second set of cards (duplicate for seamless loop) */}
            {studioCards.map((card, index) => (
              <Link
                key={`second-${card.title}-${index}`}
                href={card.href}
                className={`group flex-shrink-0 w-52 h-52 bg-white/70 backdrop-blur-lg rounded-3xl p-8 border border-white/30 shadow-xl ${card.hoverColor} hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-2 flex flex-col items-center justify-center`}
              >
                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${card.bgColor} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <span className="text-4xl">{card.icon}</span>
                </div>
                <h2 className="text-base font-bold text-gray-800 text-center whitespace-nowrap">
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
