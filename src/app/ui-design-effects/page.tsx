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
      </main>
    </div>
  );
}
