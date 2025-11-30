"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function ColorSchemePage() {
  const [activeTab, setActiveTab] = useState("light");

  const tabs = [
    { id: "light", name: "Light Theme", icon: "☀️" },
    { id: "dark", name: "Dark Theme", icon: "🌙" },
    { id: "both", name: "Both (Toggle)", icon: "🔄" },
    { id: "custom", name: "Custom Colors", icon: "🎨" },
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
              <h1 className="text-2xl font-bold text-gray-800">Color Scheme Examples</h1>
              <p className="text-xs text-gray-500">Explore different color themes and palettes</p>
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
          <div className="flex gap-1 py-3">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all flex items-center gap-2 ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-orange-400 to-pink-400 text-white shadow-lg scale-105"
                    : "bg-white/70 text-gray-700 hover:bg-white hover:shadow-md"
                }`}
              >
                <span className="text-xl">{tab.icon}</span>
                {tab.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Light Theme */}
        {activeTab === "light" && (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Light Theme Examples</h2>

            {/* Clean White */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Clean White Theme</h3>
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
                  <h4 className="text-lg font-semibold text-gray-900">Dashboard</h4>
                  <div className="flex gap-2">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm">Primary</button>
                    <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm">Secondary</button>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                    <p className="text-gray-500 text-sm">Total Users</p>
                    <p className="text-2xl font-bold text-gray-900">12,345</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                    <p className="text-gray-500 text-sm">Revenue</p>
                    <p className="text-2xl font-bold text-green-600">$54,321</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                    <p className="text-gray-500 text-sm">Orders</p>
                    <p className="text-2xl font-bold text-blue-600">1,234</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Warm Light */}
            <div className="bg-amber-50 rounded-2xl shadow-xl p-6 border border-amber-100">
              <h3 className="text-xl font-bold text-amber-900 mb-4">Warm Light Theme</h3>
              <div className="bg-orange-50 rounded-xl p-6">
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-amber-200">
                  <h4 className="text-lg font-semibold text-amber-900">Welcome Back!</h4>
                  <button className="bg-amber-500 text-white px-4 py-2 rounded-lg text-sm">Get Started</button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <p className="text-amber-700 font-medium">Morning Greeting</p>
                    <p className="text-amber-600 text-sm mt-1">Have a productive day!</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <p className="text-amber-700 font-medium">Tasks Today</p>
                    <p className="text-2xl font-bold text-amber-800">8 items</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Cool Light */}
            <div className="bg-sky-50 rounded-2xl shadow-xl p-6 border border-sky-100">
              <h3 className="text-xl font-bold text-sky-900 mb-4">Cool Light Theme</h3>
              <div className="bg-blue-50 rounded-xl p-6">
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-sky-200">
                  <h4 className="text-lg font-semibold text-sky-900">Analytics Overview</h4>
                  <button className="bg-sky-500 text-white px-4 py-2 rounded-lg text-sm">View Report</button>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <p className="text-sky-600 text-sm">Page Views</p>
                    <p className="text-2xl font-bold text-sky-900">45.2K</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <p className="text-sky-600 text-sm">Bounce Rate</p>
                    <p className="text-2xl font-bold text-sky-900">32%</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <p className="text-sky-600 text-sm">Session Duration</p>
                    <p className="text-2xl font-bold text-sky-900">4:32</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Dark Theme */}
        {activeTab === "dark" && (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Dark Theme Examples</h2>

            {/* Pure Dark */}
            <div className="bg-gray-900 rounded-2xl shadow-xl p-6 border border-gray-800">
              <h3 className="text-xl font-bold text-white mb-4">Pure Dark Theme</h3>
              <div className="bg-gray-800 rounded-xl p-6">
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-700">
                  <h4 className="text-lg font-semibold text-white">Dashboard</h4>
                  <div className="flex gap-2">
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm">Primary</button>
                    <button className="bg-gray-700 text-gray-300 px-4 py-2 rounded-lg text-sm">Secondary</button>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
                    <p className="text-gray-400 text-sm">Total Users</p>
                    <p className="text-2xl font-bold text-white">12,345</p>
                  </div>
                  <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
                    <p className="text-gray-400 text-sm">Revenue</p>
                    <p className="text-2xl font-bold text-green-400">$54,321</p>
                  </div>
                  <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
                    <p className="text-gray-400 text-sm">Orders</p>
                    <p className="text-2xl font-bold text-blue-400">1,234</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Dark Blue */}
            <div className="bg-slate-900 rounded-2xl shadow-xl p-6 border border-slate-700">
              <h3 className="text-xl font-bold text-white mb-4">Dark Blue Theme</h3>
              <div className="bg-slate-800 rounded-xl p-6">
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-600">
                  <h4 className="text-lg font-semibold text-slate-100">Project Overview</h4>
                  <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm">New Project</button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
                    <p className="text-slate-400">Active Projects</p>
                    <p className="text-3xl font-bold text-indigo-400">24</p>
                  </div>
                  <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
                    <p className="text-slate-400">Team Members</p>
                    <p className="text-3xl font-bold text-cyan-400">18</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Dark Purple */}
            <div className="bg-violet-950 rounded-2xl shadow-xl p-6 border border-violet-800">
              <h3 className="text-xl font-bold text-white mb-4">Dark Purple Theme</h3>
              <div className="bg-violet-900/50 rounded-xl p-6">
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-violet-700">
                  <h4 className="text-lg font-semibold text-violet-100">Creative Studio</h4>
                  <button className="bg-fuchsia-600 text-white px-4 py-2 rounded-lg text-sm">Create New</button>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-violet-900 p-4 rounded-lg border border-violet-700">
                    <p className="text-violet-300 text-sm">Designs</p>
                    <p className="text-2xl font-bold text-fuchsia-400">156</p>
                  </div>
                  <div className="bg-violet-900 p-4 rounded-lg border border-violet-700">
                    <p className="text-violet-300 text-sm">Downloads</p>
                    <p className="text-2xl font-bold text-pink-400">2.4K</p>
                  </div>
                  <div className="bg-violet-900 p-4 rounded-lg border border-violet-700">
                    <p className="text-violet-300 text-sm">Likes</p>
                    <p className="text-2xl font-bold text-purple-400">8.9K</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Both Theme Toggle */}
        {activeTab === "both" && (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Theme Toggle Examples</h2>

            <div className="grid grid-cols-2 gap-6">
              {/* Light Version */}
              <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-800">Light Mode</h3>
                  <div className="bg-gray-100 p-2 rounded-full">
                    <span className="text-xl">☀️</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-600 text-sm">Welcome message</p>
                    <p className="text-gray-900 font-medium">Good morning, User!</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="flex-1 bg-blue-500 text-white py-2 rounded-lg text-sm">Action</button>
                    <button className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg text-sm">Cancel</button>
                  </div>
                </div>
              </div>

              {/* Dark Version */}
              <div className="bg-gray-900 rounded-2xl shadow-xl p-6 border border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-white">Dark Mode</h3>
                  <div className="bg-gray-800 p-2 rounded-full">
                    <span className="text-xl">🌙</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-gray-800 p-4 rounded-lg">
                    <p className="text-gray-400 text-sm">Welcome message</p>
                    <p className="text-white font-medium">Good evening, User!</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg text-sm">Action</button>
                    <button className="flex-1 bg-gray-700 text-gray-300 py-2 rounded-lg text-sm">Cancel</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Toggle Component Example */}
            <div className="bg-gradient-to-r from-gray-100 to-gray-900 rounded-2xl shadow-xl p-6 overflow-hidden">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Interactive Toggle Preview</h3>
              <div className="flex items-center justify-center gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center text-3xl shadow-lg">☀️</div>
                  <p className="text-gray-700 mt-2 font-medium">Light</p>
                </div>
                <div className="w-20 h-10 bg-gray-300 rounded-full p-1 flex items-center">
                  <div className="w-8 h-8 bg-white rounded-full shadow-md transform translate-x-10 transition-transform"></div>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-indigo-900 rounded-full flex items-center justify-center text-3xl shadow-lg">🌙</div>
                  <p className="text-white mt-2 font-medium">Dark</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Custom Colors */}
        {activeTab === "custom" && (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Custom Color Palettes</h2>

            {/* Brand Colors */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Popular Brand Color Palettes</h3>

              <div className="grid grid-cols-2 gap-6">
                {/* Spotify */}
                <div className="space-y-3">
                  <p className="font-semibold text-gray-700">Spotify</p>
                  <div className="flex gap-2">
                    <div className="w-12 h-12 bg-[#1DB954] rounded-lg" title="#1DB954"></div>
                    <div className="w-12 h-12 bg-[#191414] rounded-lg" title="#191414"></div>
                    <div className="w-12 h-12 bg-[#FFFFFF] rounded-lg border" title="#FFFFFF"></div>
                  </div>
                </div>

                {/* Twitter/X */}
                <div className="space-y-3">
                  <p className="font-semibold text-gray-700">Twitter / X</p>
                  <div className="flex gap-2">
                    <div className="w-12 h-12 bg-[#1DA1F2] rounded-lg" title="#1DA1F2"></div>
                    <div className="w-12 h-12 bg-[#14171A] rounded-lg" title="#14171A"></div>
                    <div className="w-12 h-12 bg-[#657786] rounded-lg" title="#657786"></div>
                  </div>
                </div>

                {/* Instagram */}
                <div className="space-y-3">
                  <p className="font-semibold text-gray-700">Instagram</p>
                  <div className="flex gap-2">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#F77737] rounded-lg"></div>
                    <div className="w-12 h-12 bg-[#C13584] rounded-lg" title="#C13584"></div>
                    <div className="w-12 h-12 bg-[#E1306C] rounded-lg" title="#E1306C"></div>
                  </div>
                </div>

                {/* Slack */}
                <div className="space-y-3">
                  <p className="font-semibold text-gray-700">Slack</p>
                  <div className="flex gap-2">
                    <div className="w-12 h-12 bg-[#4A154B] rounded-lg" title="#4A154B"></div>
                    <div className="w-12 h-12 bg-[#36C5F0] rounded-lg" title="#36C5F0"></div>
                    <div className="w-12 h-12 bg-[#2EB67D] rounded-lg" title="#2EB67D"></div>
                    <div className="w-12 h-12 bg-[#E01E5A] rounded-lg" title="#E01E5A"></div>
                    <div className="w-12 h-12 bg-[#ECB22E] rounded-lg" title="#ECB22E"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Color Harmony */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Color Harmony Examples</h3>

              <div className="grid grid-cols-3 gap-6">
                {/* Complementary */}
                <div className="space-y-3">
                  <p className="font-semibold text-gray-700">Complementary</p>
                  <div className="flex gap-2">
                    <div className="w-16 h-16 bg-blue-500 rounded-lg"></div>
                    <div className="w-16 h-16 bg-orange-500 rounded-lg"></div>
                  </div>
                  <p className="text-xs text-gray-500">Opposite colors on the wheel</p>
                </div>

                {/* Analogous */}
                <div className="space-y-3">
                  <p className="font-semibold text-gray-700">Analogous</p>
                  <div className="flex gap-2">
                    <div className="w-12 h-16 bg-blue-500 rounded-lg"></div>
                    <div className="w-12 h-16 bg-cyan-500 rounded-lg"></div>
                    <div className="w-12 h-16 bg-teal-500 rounded-lg"></div>
                  </div>
                  <p className="text-xs text-gray-500">Adjacent colors on the wheel</p>
                </div>

                {/* Triadic */}
                <div className="space-y-3">
                  <p className="font-semibold text-gray-700">Triadic</p>
                  <div className="flex gap-2">
                    <div className="w-12 h-16 bg-red-500 rounded-lg"></div>
                    <div className="w-12 h-16 bg-yellow-500 rounded-lg"></div>
                    <div className="w-12 h-16 bg-blue-500 rounded-lg"></div>
                  </div>
                  <p className="text-xs text-gray-500">Three evenly spaced colors</p>
                </div>
              </div>
            </div>

            {/* Gradient Palettes */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Gradient Palettes</h3>

              <div className="grid grid-cols-2 gap-4">
                <div className="h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white font-medium">Purple to Pink</div>
                <div className="h-24 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center text-white font-medium">Cyan to Blue</div>
                <div className="h-24 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center text-white font-medium">Orange to Red</div>
                <div className="h-24 bg-gradient-to-r from-green-400 to-emerald-600 rounded-xl flex items-center justify-center text-white font-medium">Green to Emerald</div>
                <div className="h-24 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-xl flex items-center justify-center text-white font-medium">Violet to Indigo</div>
                <div className="h-24 bg-gradient-to-r from-rose-400 to-orange-300 rounded-xl flex items-center justify-center text-white font-medium">Rose to Orange</div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
