"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function UIDesignEffectsPage() {
  const [activeTab, setActiveTab] = useState("glassmorphism");

  const tabs = [
    { id: "glassmorphism", name: "Glassmorphism", icon: "🪟" },
    { id: "neumorphism", name: "Neumorphism", icon: "🔘" },
    { id: "gradients", name: "Gradients", icon: "🌈" },
    { id: "animations", name: "Animations", icon: "✨" },
    { id: "shadows", name: "Shadows & Depth", icon: "🎭" },
    { id: "hover", name: "Hover Effects", icon: "👆" },
    { id: "parallax", name: "Parallax Scrolling", icon: "🧵" },
    { id: "cursor-trail", name: "Cursor Trail", icon: "💫" },
    { id: "neon-glow", name: "Neon Glow", icon: "💡" },
    { id: "morphing", name: "Morphing", icon: "🔀" },
    { id: "typewriter", name: "Typewriter", icon: "⌨️" },
    { id: "ripple", name: "Ripple Effects", icon: "💧" },
    { id: "confetti", name: "Confetti", icon: "🎊" },
    { id: "aurora", name: "Aurora", icon: "🌌" },
    { id: "noise", name: "Noise Texture", icon: "📺" },
    { id: "card-flip", name: "Card Flip", icon: "🃏" },
    { id: "skeleton", name: "Skeleton Loading", icon: "💀" },
    { id: "shimmer", name: "Shimmer", icon: "✨" },
    { id: "wave", name: "Wave Animation", icon: "🌊" },
    { id: "spotlight", name: "Spotlight", icon: "🔦" },
    { id: "tilt-3d", name: "3D Tilt", icon: "📐" },
    { id: "blur-bg", name: "Blur Background", icon: "🌫️" },
    { id: "animated-borders", name: "Animated Borders", icon: "🔲" },
    { id: "text-reveal", name: "Text Reveal", icon: "📝" },
    { id: "sticky", name: "Sticky Elements", icon: "📌" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-pink-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-lg border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/super-sumo.png" alt="Super Sumo" width={80} height={80} className="cursor-pointer hover:scale-105 transition-transform drop-shadow-lg" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">UI Design Effects</h1>
              <p className="text-xs text-gray-500">Modern visual effects and animations</p>
            </div>
          </div>
          <Link href="/frontend-studio" className="px-4 py-2 bg-gradient-to-r from-orange-400 to-pink-400 hover:from-orange-500 hover:to-pink-500 text-white font-medium rounded-lg transition-all shadow-md hover:shadow-lg">
            Back to Frontend Studio
          </Link>
        </div>
      </header>

      {/* Tabs */}
      <div className="sticky top-[76px] z-40 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-1 py-3 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg font-semibold transition-all flex items-center gap-2 whitespace-nowrap ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg scale-105"
                    : "bg-white/70 text-gray-700 hover:bg-white hover:shadow-md"
                }`}
              >
                <span className="text-lg">{tab.icon}</span>
                {tab.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Glassmorphism */}
        {activeTab === "glassmorphism" && (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Glassmorphism Effects</h2>

            {/* Gradient Background with Glass Cards */}
            <div className="relative bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 rounded-2xl p-8 min-h-[400px] overflow-hidden">
              <div className="absolute top-10 left-10 w-32 h-32 bg-white/30 rounded-full blur-xl"></div>
              <div className="absolute bottom-10 right-10 w-40 h-40 bg-yellow-300/30 rounded-full blur-xl"></div>

              <div className="relative grid grid-cols-3 gap-6">
                <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-6 border border-white/30 shadow-xl">
                  <h3 className="text-white font-bold text-xl mb-2">Glass Card</h3>
                  <p className="text-white/80 text-sm">Beautiful frosted glass effect with backdrop blur.</p>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-xl">
                  <h3 className="text-white font-bold text-xl mb-2">Subtle Glass</h3>
                  <p className="text-white/70 text-sm">More transparent with lighter blur effect.</p>
                </div>
                <div className="bg-white/30 backdrop-blur-xl rounded-2xl p-6 border border-white/40 shadow-xl">
                  <h3 className="text-white font-bold text-xl mb-2">Strong Glass</h3>
                  <p className="text-white/90 text-sm">More opaque with stronger blur.</p>
                </div>
              </div>

              <div className="relative mt-6 bg-white/25 backdrop-blur-lg rounded-xl p-4 border border-white/30 max-w-md">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/30 rounded-full flex items-center justify-center text-2xl">👤</div>
                  <div>
                    <p className="text-white font-medium">John Doe</p>
                    <p className="text-white/70 text-sm">UI Designer</p>
                  </div>
                  <button className="ml-auto bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg text-sm transition-all">Follow</button>
                </div>
              </div>
            </div>

            {/* Dark Glass */}
            <div className="relative bg-gray-900 rounded-2xl p-8 min-h-[300px] overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl"></div>

              <div className="relative grid grid-cols-2 gap-6">
                <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
                  <h3 className="text-white font-bold text-xl mb-2">Dark Glass</h3>
                  <p className="text-gray-400 text-sm">Glassmorphism works beautifully on dark backgrounds too.</p>
                  <button className="mt-4 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg text-sm transition-all">Learn More</button>
                </div>
                <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
                  <h3 className="text-white font-bold text-xl mb-2">Gradient Glass</h3>
                  <p className="text-gray-400 text-sm">Combining glass with subtle gradients.</p>
                  <button className="mt-4 bg-blue-500/50 hover:bg-blue-500/70 text-white px-4 py-2 rounded-lg text-sm transition-all">Explore</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Neumorphism */}
        {activeTab === "neumorphism" && (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Neumorphism / Soft UI</h2>

            <div className="bg-gray-200 rounded-2xl p-8">
              <div className="grid grid-cols-3 gap-8">
                {/* Raised Card */}
                <div className="bg-gray-200 rounded-2xl p-6 shadow-[8px_8px_16px_#b8b8b8,-8px_-8px_16px_#ffffff]">
                  <h3 className="text-gray-700 font-bold text-lg mb-2">Raised Card</h3>
                  <p className="text-gray-500 text-sm">Classic neumorphic raised effect.</p>
                </div>

                {/* Inset Card */}
                <div className="bg-gray-200 rounded-2xl p-6 shadow-[inset_8px_8px_16px_#b8b8b8,inset_-8px_-8px_16px_#ffffff]">
                  <h3 className="text-gray-700 font-bold text-lg mb-2">Inset Card</h3>
                  <p className="text-gray-500 text-sm">Pressed or inset neumorphic style.</p>
                </div>

                {/* Flat Card */}
                <div className="bg-gray-200 rounded-2xl p-6 shadow-[4px_4px_8px_#b8b8b8,-4px_-4px_8px_#ffffff]">
                  <h3 className="text-gray-700 font-bold text-lg mb-2">Subtle Raise</h3>
                  <p className="text-gray-500 text-sm">Softer, subtler elevation.</p>
                </div>
              </div>

              {/* Neumorphic Buttons */}
              <div className="mt-8 flex gap-4">
                <button className="bg-gray-200 px-6 py-3 rounded-xl shadow-[4px_4px_8px_#b8b8b8,-4px_-4px_8px_#ffffff] hover:shadow-[inset_4px_4px_8px_#b8b8b8,inset_-4px_-4px_8px_#ffffff] transition-shadow text-gray-700 font-medium">
                  Click Me
                </button>
                <button className="bg-gray-200 px-6 py-3 rounded-full shadow-[4px_4px_8px_#b8b8b8,-4px_-4px_8px_#ffffff] hover:shadow-[inset_4px_4px_8px_#b8b8b8,inset_-4px_-4px_8px_#ffffff] transition-shadow text-gray-700 font-medium">
                  Rounded
                </button>
                <div className="bg-gray-200 w-14 h-14 rounded-full shadow-[4px_4px_8px_#b8b8b8,-4px_-4px_8px_#ffffff] flex items-center justify-center text-2xl">
                  ❤️
                </div>
              </div>

              {/* Neumorphic Form */}
              <div className="mt-8 max-w-md">
                <div className="bg-gray-200 rounded-xl p-1 shadow-[inset_4px_4px_8px_#b8b8b8,inset_-4px_-4px_8px_#ffffff]">
                  <input type="text" placeholder="Search..." className="w-full bg-transparent px-4 py-3 outline-none text-gray-700" />
                </div>
              </div>
            </div>

            {/* Dark Neumorphism */}
            <div className="bg-gray-800 rounded-2xl p-8">
              <h3 className="text-white font-bold text-xl mb-6">Dark Neumorphism</h3>
              <div className="grid grid-cols-3 gap-6">
                <div className="bg-gray-800 rounded-2xl p-6 shadow-[8px_8px_16px_#1a1a1a,-8px_-8px_16px_#363636]">
                  <p className="text-gray-300 font-medium">Raised Dark</p>
                </div>
                <div className="bg-gray-800 rounded-2xl p-6 shadow-[inset_8px_8px_16px_#1a1a1a,inset_-8px_-8px_16px_#363636]">
                  <p className="text-gray-300 font-medium">Inset Dark</p>
                </div>
                <div className="bg-gray-800 rounded-full w-16 h-16 shadow-[4px_4px_8px_#1a1a1a,-4px_-4px_8px_#363636] flex items-center justify-center">
                  <span className="text-2xl">🌙</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Gradients */}
        {activeTab === "gradients" && (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Gradient Effects</h2>

            {/* Linear Gradients */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Linear Gradients</h3>
              <div className="grid grid-cols-4 gap-4">
                <div className="h-32 bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl"></div>
                <div className="h-32 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl"></div>
                <div className="h-32 bg-gradient-to-r from-green-400 to-cyan-500 rounded-xl"></div>
                <div className="h-32 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl"></div>
                <div className="h-32 bg-gradient-to-br from-violet-500 to-orange-300 rounded-xl"></div>
                <div className="h-32 bg-gradient-to-tr from-emerald-500 to-lime-300 rounded-xl"></div>
                <div className="h-32 bg-gradient-to-bl from-rose-500 to-amber-500 rounded-xl"></div>
                <div className="h-32 bg-gradient-to-tl from-indigo-500 to-pink-500 rounded-xl"></div>
              </div>
            </div>

            {/* Radial Gradients */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Radial Gradients</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="h-40 bg-[radial-gradient(circle,_#f472b6_0%,_#7c3aed_100%)] rounded-xl"></div>
                <div className="h-40 bg-[radial-gradient(ellipse_at_top,_#fbbf24_0%,_#ef4444_100%)] rounded-xl"></div>
                <div className="h-40 bg-[radial-gradient(circle_at_bottom_left,_#06b6d4_0%,_#3b82f6_50%,_#8b5cf6_100%)] rounded-xl"></div>
              </div>
            </div>

            {/* Mesh Gradients */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Mesh Gradient Style</h3>
              <div className="h-64 rounded-xl overflow-hidden relative bg-gradient-to-br from-pink-300 via-purple-400 to-indigo-500">
                <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-yellow-300/50 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-cyan-400/50 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 w-1/3 h-1/3 bg-pink-400/50 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-white text-2xl font-bold">Mesh Gradient Effect</p>
                </div>
              </div>
            </div>

            {/* Animated Gradient */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Animated Gradient</h3>
              <div className="h-40 rounded-xl bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 bg-[length:200%_200%] animate-pulse flex items-center justify-center">
                <p className="text-white text-xl font-bold">Pulsing Gradient</p>
              </div>
            </div>
          </div>
        )}

        {/* Animations */}
        {activeTab === "animations" && (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Animation Effects</h2>

            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">CSS Animations</h3>
              <div className="grid grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-20 h-20 bg-blue-500 rounded-xl mx-auto animate-bounce"></div>
                  <p className="text-gray-600 mt-2 text-sm">Bounce</p>
                </div>
                <div className="text-center">
                  <div className="w-20 h-20 bg-green-500 rounded-xl mx-auto animate-pulse"></div>
                  <p className="text-gray-600 mt-2 text-sm">Pulse</p>
                </div>
                <div className="text-center">
                  <div className="w-20 h-20 bg-purple-500 rounded-xl mx-auto animate-spin"></div>
                  <p className="text-gray-600 mt-2 text-sm">Spin</p>
                </div>
                <div className="text-center">
                  <div className="w-20 h-20 bg-orange-500 rounded-xl mx-auto animate-ping"></div>
                  <p className="text-gray-600 mt-2 text-sm">Ping</p>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-8 min-h-[300px] relative overflow-hidden">
              <h3 className="text-xl font-bold text-white mb-4">Floating Elements</h3>
              <div className="absolute top-10 left-10 text-4xl animate-bounce" style={{ animationDuration: '3s' }}>🎈</div>
              <div className="absolute top-20 right-20 text-4xl animate-bounce" style={{ animationDuration: '2.5s', animationDelay: '0.5s' }}>⭐</div>
              <div className="absolute bottom-20 left-1/4 text-4xl animate-bounce" style={{ animationDuration: '3.5s', animationDelay: '1s' }}>🌟</div>
              <div className="absolute bottom-10 right-1/4 text-4xl animate-bounce" style={{ animationDuration: '2s', animationDelay: '0.3s' }}>✨</div>
            </div>

            {/* Loading Animations */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Loading Animations</h3>
              <div className="grid grid-cols-4 gap-8">
                {/* Spinner */}
                <div className="text-center">
                  <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin mx-auto"></div>
                  <p className="text-gray-600 mt-2 text-sm">Spinner</p>
                </div>
                {/* Dots */}
                <div className="text-center">
                  <div className="flex justify-center gap-1">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                  <p className="text-gray-600 mt-2 text-sm">Bouncing Dots</p>
                </div>
                {/* Pulse Ring */}
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-500 rounded-full animate-ping mx-auto opacity-75"></div>
                  <p className="text-gray-600 mt-2 text-sm">Pulse Ring</p>
                </div>
                {/* Skeleton */}
                <div className="text-center">
                  <div className="w-full h-4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="w-3/4 h-4 bg-gray-200 rounded animate-pulse mt-2"></div>
                  <p className="text-gray-600 mt-2 text-sm">Skeleton</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Shadows & Depth */}
        {activeTab === "shadows" && (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Shadows & Depth Effects</h2>

            <div className="bg-gray-100 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Shadow Elevation Levels</h3>
              <div className="grid grid-cols-5 gap-6">
                <div className="bg-white rounded-xl p-6 shadow-sm text-center">
                  <p className="text-gray-600 text-sm">shadow-sm</p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow text-center">
                  <p className="text-gray-600 text-sm">shadow</p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-md text-center">
                  <p className="text-gray-600 text-sm">shadow-md</p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-lg text-center">
                  <p className="text-gray-600 text-sm">shadow-lg</p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-2xl text-center">
                  <p className="text-gray-600 text-sm">shadow-2xl</p>
                </div>
              </div>
            </div>

            {/* Colored Shadows */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Colored Shadows</h3>
              <div className="grid grid-cols-4 gap-6">
                <div className="bg-blue-500 rounded-xl p-6 shadow-lg shadow-blue-500/50 text-white text-center">Blue Glow</div>
                <div className="bg-pink-500 rounded-xl p-6 shadow-lg shadow-pink-500/50 text-white text-center">Pink Glow</div>
                <div className="bg-green-500 rounded-xl p-6 shadow-lg shadow-green-500/50 text-white text-center">Green Glow</div>
                <div className="bg-purple-500 rounded-xl p-6 shadow-lg shadow-purple-500/50 text-white text-center">Purple Glow</div>
              </div>
            </div>

            {/* 3D Effects */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-6">3D Transform Effects</h3>
              <div className="grid grid-cols-3 gap-8">
                <div className="bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl p-6 text-white transform hover:rotate-3 transition-transform cursor-pointer">
                  <p className="font-bold">Rotate on Hover</p>
                  <p className="text-sm opacity-80">Hover me!</p>
                </div>
                <div className="bg-gradient-to-br from-pink-500 to-rose-500 rounded-xl p-6 text-white transform hover:scale-105 transition-transform cursor-pointer">
                  <p className="font-bold">Scale on Hover</p>
                  <p className="text-sm opacity-80">Hover me!</p>
                </div>
                <div className="bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl p-6 text-white transform hover:-translate-y-2 transition-transform cursor-pointer shadow-lg hover:shadow-xl">
                  <p className="font-bold">Lift on Hover</p>
                  <p className="text-sm opacity-80">Hover me!</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Hover Effects */}
        {activeTab === "hover" && (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Hover Effects</h2>

            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Button Hover Effects</h3>
              <div className="flex flex-wrap gap-4">
                <button className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">Color Change</button>
                <button className="px-6 py-3 bg-green-500 text-white rounded-lg hover:scale-105 transition-transform">Scale Up</button>
                <button className="px-6 py-3 bg-purple-500 text-white rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transition-shadow">Glow Effect</button>
                <button className="px-6 py-3 bg-pink-500 text-white rounded-lg hover:-translate-y-1 transition-transform">Lift Up</button>
                <button className="px-6 py-3 border-2 border-orange-500 text-orange-500 rounded-lg hover:bg-orange-500 hover:text-white transition-all">Fill Effect</button>
                <button className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:rounded-3xl transition-all">Shape Morph</button>
              </div>
            </div>

            {/* Card Hover Effects */}
            <div className="bg-gray-100 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Card Hover Effects</h3>
              <div className="grid grid-cols-3 gap-6">
                <div className="bg-white rounded-xl p-6 transition-all hover:shadow-xl hover:-translate-y-2 cursor-pointer">
                  <h4 className="font-bold text-gray-800">Lift & Shadow</h4>
                  <p className="text-gray-500 text-sm mt-2">Card lifts up with shadow on hover</p>
                </div>
                <div className="bg-white rounded-xl p-6 border-2 border-transparent hover:border-blue-500 transition-all cursor-pointer">
                  <h4 className="font-bold text-gray-800">Border Reveal</h4>
                  <p className="text-gray-500 text-sm mt-2">Border appears on hover</p>
                </div>
                <div className="bg-white rounded-xl p-6 hover:bg-gradient-to-br hover:from-purple-500 hover:to-pink-500 hover:text-white transition-all cursor-pointer group">
                  <h4 className="font-bold text-gray-800 group-hover:text-white">Color Fill</h4>
                  <p className="text-gray-500 text-sm mt-2 group-hover:text-white/80">Background changes on hover</p>
                </div>
              </div>
            </div>

            {/* Image Hover Effects */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Image/Content Hover Effects</h3>
              <div className="grid grid-cols-3 gap-6">
                <div className="relative h-48 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl overflow-hidden group cursor-pointer">
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <p className="text-white font-bold">Overlay Effect</p>
                  </div>
                </div>
                <div className="relative h-48 bg-gradient-to-br from-green-400 to-green-600 rounded-xl overflow-hidden group cursor-pointer">
                  <div className="absolute inset-0 flex items-center justify-center transform translate-y-full group-hover:translate-y-0 transition-transform bg-black/50">
                    <p className="text-white font-bold">Slide Up</p>
                  </div>
                </div>
                <div className="h-48 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl overflow-hidden group cursor-pointer">
                  <div className="w-full h-full transform group-hover:scale-110 transition-transform flex items-center justify-center">
                    <p className="text-white font-bold">Zoom In</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Parallax Scrolling */}
        {activeTab === "parallax" && (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Parallax Scrolling Effects</h2>
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Layered Parallax Demo</h3>
              <div className="relative h-64 rounded-xl overflow-hidden bg-gradient-to-b from-blue-400 to-blue-600">
                <div className="absolute inset-0 flex items-end justify-center pb-4">
                  <div className="w-20 h-32 bg-green-600 rounded-t-full"></div>
                  <div className="w-16 h-24 bg-green-500 rounded-t-full -ml-4"></div>
                  <div className="w-24 h-40 bg-green-700 rounded-t-full -ml-6"></div>
                </div>
                <div className="absolute top-10 left-10 w-16 h-16 bg-yellow-300 rounded-full shadow-lg"></div>
                <div className="absolute top-20 right-20 w-8 h-8 bg-white rounded-full opacity-80"></div>
                <div className="absolute top-32 right-40 w-12 h-6 bg-white rounded-full opacity-60"></div>
                <p className="absolute bottom-4 left-4 text-white text-sm">Layers move at different speeds on scroll</p>
              </div>
            </div>
            <div className="bg-gray-900 rounded-2xl p-8 text-center">
              <p className="text-gray-400 mb-4">Parallax creates depth by moving background layers slower than foreground</p>
              <div className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg">
                Scroll to see parallax in action
              </div>
            </div>
          </div>
        )}

        {/* Cursor Trail */}
        {activeTab === "cursor-trail" && (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Cursor Trail Effects</h2>
            <div className="bg-gradient-to-br from-purple-600 to-indigo-700 rounded-2xl p-8 min-h-[400px] relative overflow-hidden">
              <h3 className="text-xl font-bold text-white mb-4">Move your cursor here</h3>
              <p className="text-white/70">Cursor trail effects follow the mouse movement with delayed elements</p>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="flex gap-2">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-4 h-4 bg-yellow-400 rounded-full animate-pulse" style={{ animationDelay: `${i * 0.1}s`, opacity: 1 - i * 0.15 }}></div>
                  ))}
                </div>
              </div>
              <p className="absolute bottom-4 text-white/50 text-sm">Implementation requires JavaScript for actual cursor tracking</p>
            </div>
          </div>
        )}

        {/* Neon Glow */}
        {activeTab === "neon-glow" && (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Neon Glow Effects</h2>
            <div className="bg-gray-900 rounded-2xl p-8">
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center p-6 border-2 border-cyan-400 rounded-xl shadow-[0_0_20px_rgba(34,211,238,0.5)] hover:shadow-[0_0_40px_rgba(34,211,238,0.8)] transition-shadow">
                  <p className="text-cyan-400 font-bold text-xl">Cyan Neon</p>
                </div>
                <div className="text-center p-6 border-2 border-pink-400 rounded-xl shadow-[0_0_20px_rgba(244,114,182,0.5)] hover:shadow-[0_0_40px_rgba(244,114,182,0.8)] transition-shadow">
                  <p className="text-pink-400 font-bold text-xl">Pink Neon</p>
                </div>
                <div className="text-center p-6 border-2 border-green-400 rounded-xl shadow-[0_0_20px_rgba(74,222,128,0.5)] hover:shadow-[0_0_40px_rgba(74,222,128,0.8)] transition-shadow">
                  <p className="text-green-400 font-bold text-xl">Green Neon</p>
                </div>
              </div>
              <div className="mt-8 text-center">
                <h3 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400" style={{ textShadow: '0 0 20px rgba(168,85,247,0.5), 0 0 40px rgba(168,85,247,0.3)' }}>
                  NEON TEXT
                </h3>
              </div>
              <div className="mt-8 flex justify-center gap-4">
                <button className="px-6 py-3 bg-transparent border-2 border-yellow-400 text-yellow-400 rounded-lg shadow-[0_0_15px_rgba(250,204,21,0.5)] hover:shadow-[0_0_30px_rgba(250,204,21,0.8)] hover:bg-yellow-400/10 transition-all">
                  Neon Button
                </button>
                <button className="px-6 py-3 bg-transparent border-2 border-red-400 text-red-400 rounded-lg shadow-[0_0_15px_rgba(248,113,113,0.5)] hover:shadow-[0_0_30px_rgba(248,113,113,0.8)] hover:bg-red-400/10 transition-all">
                  Glow Button
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Morphing */}
        {activeTab === "morphing" && (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Morphing / Shape Shifting</h2>
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="grid grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto bg-gradient-to-r from-blue-500 to-purple-500 rounded-full hover:rounded-xl transition-all duration-500 cursor-pointer"></div>
                  <p className="text-gray-600 mt-4 text-sm">Circle to Square</p>
                </div>
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl hover:rounded-full transition-all duration-500 cursor-pointer"></div>
                  <p className="text-gray-600 mt-4 text-sm">Square to Circle</p>
                </div>
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg hover:scale-150 hover:rotate-45 transition-all duration-500 cursor-pointer"></div>
                  <p className="text-gray-600 mt-4 text-sm">Scale & Rotate</p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-8">
              <h3 className="text-white font-bold text-xl mb-4">Blob Morphing</h3>
              <div className="flex justify-center">
                <div className="w-32 h-32 bg-white/30 rounded-[60%_40%_30%_70%/60%_30%_70%_40%] animate-pulse"></div>
              </div>
            </div>
          </div>
        )}

        {/* Typewriter */}
        {activeTab === "typewriter" && (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Typewriter Effect</h2>
            <div className="bg-gray-900 rounded-2xl p-8">
              <div className="font-mono text-green-400 text-xl">
                <span className="border-r-2 border-green-400 pr-1 animate-pulse">Hello, World! Welcome to the typewriter effect...</span>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Terminal Style</h3>
              <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm">
                <p className="text-gray-500">$ npm install typewriter-effect</p>
                <p className="text-green-400 mt-2">Installing packages...</p>
                <p className="text-white mt-1">+ typewriter-effect@2.21.0</p>
                <p className="text-gray-500 mt-2">$ <span className="border-r border-white animate-pulse"></span></p>
              </div>
            </div>
          </div>
        )}

        {/* Ripple Effects */}
        {activeTab === "ripple" && (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Ripple Effects</h2>
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Material Design Ripple</h3>
              <div className="flex gap-4">
                <button className="relative overflow-hidden px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                  Click Me
                  <span className="absolute inset-0 bg-white/30 scale-0 rounded-full animate-ping"></span>
                </button>
                <button className="relative overflow-hidden px-6 py-3 bg-purple-500 text-white rounded-lg">
                  Ripple Button
                </button>
              </div>
            </div>
            <div className="bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl p-8">
              <h3 className="text-white font-bold text-xl mb-4">Water Ripple</h3>
              <div className="flex justify-center items-center h-40">
                <div className="relative">
                  <div className="w-4 h-4 bg-white rounded-full"></div>
                  <div className="absolute inset-0 w-4 h-4 bg-white/50 rounded-full animate-ping"></div>
                  <div className="absolute -inset-4 w-12 h-12 border-2 border-white/30 rounded-full animate-ping" style={{ animationDelay: '0.2s' }}></div>
                  <div className="absolute -inset-8 w-20 h-20 border-2 border-white/20 rounded-full animate-ping" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Confetti */}
        {activeTab === "confetti" && (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Confetti / Celebration Effects</h2>
            <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl p-8 min-h-[400px] relative overflow-hidden">
              <div className="absolute inset-0">
                {[...Array(30)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-3 h-3 animate-bounce"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      backgroundColor: ['#ff6b6b', '#ffd93d', '#6bcb77', '#4d96ff', '#ff6bd6'][i % 5],
                      borderRadius: i % 2 === 0 ? '50%' : '0',
                      animationDelay: `${Math.random() * 2}s`,
                      animationDuration: `${1 + Math.random() * 2}s`,
                    }}
                  ></div>
                ))}
              </div>
              <div className="relative text-center">
                <h3 className="text-4xl font-bold text-white mb-4">Congratulations!</h3>
                <p className="text-white/80">Celebration confetti animation</p>
              </div>
            </div>
          </div>
        )}

        {/* Aurora */}
        {activeTab === "aurora" && (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Aurora / Northern Lights</h2>
            <div className="relative bg-gray-900 rounded-2xl min-h-[400px] overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent z-10"></div>
              <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-r from-green-400/30 via-cyan-400/30 to-purple-400/30 blur-3xl animate-pulse"></div>
              <div className="absolute top-10 left-1/4 w-1/2 h-48 bg-gradient-to-r from-pink-400/20 via-purple-400/20 to-blue-400/20 blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
              <div className="absolute top-20 right-0 w-1/3 h-32 bg-gradient-to-l from-emerald-400/30 to-transparent blur-3xl animate-pulse" style={{ animationDelay: '0.5s' }}></div>
              <div className="relative z-20 p-8">
                <h3 className="text-2xl font-bold text-white text-center mt-20">Aurora Borealis Effect</h3>
                <p className="text-gray-400 text-center mt-2">Beautiful northern lights animation</p>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-gray-900 to-transparent"></div>
            </div>
          </div>
        )}

        {/* Noise Texture */}
        {activeTab === "noise" && (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Noise / Grain Texture</h2>
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Film Grain Effect</h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="h-48 bg-gradient-to-br from-orange-400 to-pink-500 rounded-xl relative overflow-hidden">
                  <p className="absolute bottom-4 left-4 text-white font-medium">Without Noise</p>
                </div>
                <div className="h-48 bg-gradient-to-br from-orange-400 to-pink-500 rounded-xl relative overflow-hidden" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'0.15\'/%3E%3C/svg%3E")' }}>
                  <p className="absolute bottom-4 left-4 text-white font-medium">With Noise Overlay</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Card Flip */}
        {activeTab === "card-flip" && (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Card Flip Animation</h2>
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="grid grid-cols-3 gap-8">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="group h-48 [perspective:1000px]">
                    <div className="relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center [backface-visibility:hidden]">
                        <p className="text-white font-bold text-xl">Front {i}</p>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-br from-pink-500 to-orange-500 rounded-xl flex items-center justify-center [backface-visibility:hidden] [transform:rotateY(180deg)]">
                        <p className="text-white font-bold text-xl">Back {i}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-gray-500 text-center mt-4 text-sm">Hover over cards to flip</p>
            </div>
          </div>
        )}

        {/* Skeleton Loading */}
        {activeTab === "skeleton" && (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Skeleton Loading</h2>
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Card Skeleton</h3>
              <div className="grid grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="border rounded-xl p-4 animate-pulse">
                    <div className="h-32 bg-gray-200 rounded-lg mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">List Skeleton</h3>
              <div className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-center gap-4 animate-pulse">
                    <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Shimmer */}
        {activeTab === "shimmer" && (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Shimmer Effect</h2>
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="h-48 bg-gray-200 rounded-xl relative overflow-hidden">
                  <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent"></div>
                </div>
                <div className="space-y-4">
                  <div className="h-6 bg-gray-200 rounded relative overflow-hidden">
                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent"></div>
                  </div>
                  <div className="h-6 bg-gray-200 rounded w-3/4 relative overflow-hidden">
                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                  <div className="h-6 bg-gray-200 rounded w-1/2 relative overflow-hidden">
                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Wave Animation */}
        {activeTab === "wave" && (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Wave Animation</h2>
            <div className="bg-gradient-to-b from-cyan-400 to-blue-600 rounded-2xl min-h-[400px] relative overflow-hidden">
              <div className="absolute bottom-0 left-0 right-0">
                <svg viewBox="0 0 1440 320" className="w-full">
                  <path fill="rgba(255,255,255,0.3)" d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z">
                    <animate attributeName="d" dur="10s" repeatCount="indefinite" values="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z;M0,128L48,154.7C96,181,192,235,288,234.7C384,235,480,181,576,181.3C672,181,768,235,864,250.7C960,267,1056,245,1152,229.3C1248,213,1344,203,1392,197.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z;M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"/>
                  </path>
                </svg>
              </div>
              <div className="absolute bottom-0 left-0 right-0">
                <svg viewBox="0 0 1440 320" className="w-full">
                  <path fill="rgba(255,255,255,0.5)" d="M0,256L48,240C96,224,192,192,288,186.7C384,181,480,203,576,218.7C672,235,768,245,864,234.7C960,224,1056,192,1152,186.7C1248,181,1344,203,1392,213.3L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                </svg>
              </div>
              <div className="relative z-10 p-8 text-center pt-20">
                <h3 className="text-3xl font-bold text-white">Ocean Waves</h3>
                <p className="text-white/70 mt-2">Animated SVG wave effect</p>
              </div>
            </div>
          </div>
        )}

        {/* Spotlight */}
        {activeTab === "spotlight" && (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Spotlight Effect</h2>
            <div className="bg-gray-900 rounded-2xl min-h-[400px] relative overflow-hidden group">
              <div className="absolute inset-0 bg-[radial-gradient(circle_200px_at_50%_50%,rgba(255,255,255,0.1),transparent)] group-hover:bg-[radial-gradient(circle_200px_at_var(--mouse-x,50%)_var(--mouse-y,50%),rgba(255,255,255,0.15),transparent)] transition-all"></div>
              <div className="relative z-10 p-8 text-center pt-32">
                <h3 className="text-3xl font-bold text-white">Spotlight follows cursor</h3>
                <p className="text-gray-400 mt-2">Move your mouse to see the spotlight effect</p>
              </div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-radial from-white/10 to-transparent rounded-full blur-xl"></div>
            </div>
          </div>
        )}

        {/* 3D Tilt */}
        {activeTab === "tilt-3d" && (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">3D Tilt on Hover</h2>
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="grid grid-cols-3 gap-8">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="group [perspective:1000px]">
                    <div className="h-48 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl p-6 transition-transform duration-300 group-hover:[transform:rotateX(10deg)_rotateY(-10deg)] shadow-xl">
                      <p className="text-white font-bold text-xl">Card {i}</p>
                      <p className="text-white/70 text-sm mt-2">Hover for 3D tilt effect</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Blur Background */}
        {activeTab === "blur-bg" && (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Blur Background Effects</h2>
            <div className="relative rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-600"></div>
              <div className="absolute inset-0 backdrop-blur-sm"></div>
              <div className="relative p-8">
                <div className="bg-white/20 backdrop-blur-md rounded-xl p-6 border border-white/30">
                  <h3 className="text-white font-bold text-xl">Backdrop Blur</h3>
                  <p className="text-white/80 mt-2">Content with blurred background</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Blur Levels</h3>
              <div className="grid grid-cols-4 gap-4">
                {['blur-sm', 'blur', 'blur-md', 'blur-xl'].map((blur) => (
                  <div key={blur} className="relative h-32 bg-gradient-to-r from-orange-400 to-pink-500 rounded-xl overflow-hidden">
                    <div className={`absolute inset-0 ${blur} bg-white/30`}></div>
                    <p className="absolute bottom-2 left-2 text-white text-xs font-medium z-10">{blur}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Animated Borders */}
        {activeTab === "animated-borders" && (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Animated Border Effects</h2>
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="grid grid-cols-3 gap-8">
                <div className="relative p-6 rounded-xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 animate-spin" style={{ animationDuration: '3s' }}></div>
                  <div className="absolute inset-[2px] bg-white rounded-lg"></div>
                  <div className="relative text-center">
                    <p className="font-bold text-gray-800">Rotating Border</p>
                  </div>
                </div>
                <div className="p-6 rounded-xl border-2 border-transparent bg-clip-padding" style={{ backgroundImage: 'linear-gradient(white, white), linear-gradient(90deg, #f472b6, #818cf8, #f472b6)', backgroundOrigin: 'border-box', backgroundClip: 'padding-box, border-box' }}>
                  <p className="font-bold text-gray-800 text-center">Gradient Border</p>
                </div>
                <div className="p-6 rounded-xl border-2 border-dashed border-gray-300 hover:border-purple-500 transition-colors duration-300">
                  <p className="font-bold text-gray-800 text-center">Hover Border</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Text Reveal */}
        {activeTab === "text-reveal" && (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Text Reveal Animation</h2>
            <div className="bg-gray-900 rounded-2xl p-8">
              <div className="overflow-hidden">
                <h3 className="text-4xl font-bold text-white animate-pulse">
                  <span className="inline-block" style={{ animation: 'slideUp 0.5s ease forwards' }}>Reveal</span>{' '}
                  <span className="inline-block" style={{ animation: 'slideUp 0.5s ease forwards', animationDelay: '0.1s' }}>Text</span>{' '}
                  <span className="inline-block" style={{ animation: 'slideUp 0.5s ease forwards', animationDelay: '0.2s' }}>Animation</span>
                </h3>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Gradient Text Reveal</h3>
              <p className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">
                Beautiful Gradient Text
              </p>
            </div>
          </div>
        )}

        {/* Sticky Elements */}
        {activeTab === "sticky" && (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Sticky Elements</h2>
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <p className="text-gray-600 mb-4">Sticky elements remain fixed while scrolling within their container.</p>
              <div className="h-64 overflow-y-auto border rounded-xl">
                <div className="sticky top-0 bg-gradient-to-r from-blue-500 to-purple-500 text-white p-4 z-10">
                  <p className="font-bold">Sticky Header</p>
                </div>
                <div className="p-4 space-y-4">
                  {[...Array(10)].map((_, i) => (
                    <div key={i} className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-gray-700">Content item {i + 1}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
