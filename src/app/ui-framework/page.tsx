"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function UIFrameworkPage() {
  const [activeTab, setActiveTab] = useState("buttons");

  const componentTabs = [
    { id: "buttons", name: "Buttons", icon: "🔘" },
    { id: "cards", name: "Cards", icon: "🃏" },
    { id: "forms", name: "Forms", icon: "📝" },
    { id: "alerts", name: "Alerts", icon: "🔔" },
    { id: "badges", name: "Badges", icon: "🏷️" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-pink-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-lg border-b border-white/20 sticky top-0 z-50">
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
              <h1 className="text-2xl font-bold text-gray-800">UI Framework Examples</h1>
              <p className="text-xs text-gray-500">Compare components across different frameworks</p>
            </div>
          </div>
          <Link
            href="/frontend-studio"
            className="px-4 py-2 bg-gradient-to-r from-orange-400 to-pink-400 hover:from-orange-500 hover:to-pink-500 text-white font-medium rounded-lg transition-all shadow-md hover:shadow-lg"
          >
            Back to Frontend Studio
          </Link>
        </div>
      </header>

      {/* Component Type Tabs */}
      <div className="sticky top-[76px] z-40 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-1 py-3">
            {componentTabs.map((tab) => (
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
        {/* Buttons Comparison */}
        {activeTab === "buttons" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Buttons - Framework Comparison</h2>

            {/* Tailwind CSS */}
            <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-cyan-200">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">🎨</span>
                <h3 className="text-xl font-bold text-gray-800">Tailwind CSS</h3>
              </div>
              <div className="flex flex-wrap gap-3">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Primary</button>
                <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">Secondary</button>
                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Success</button>
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Danger</button>
                <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded">Warning</button>
                <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">Outline</button>
                <button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-2 px-4 rounded-full">Gradient</button>
              </div>
            </div>

            {/* Bootstrap */}
            <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-purple-200">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">🅱️</span>
                <h3 className="text-xl font-bold text-gray-800">Bootstrap</h3>
              </div>
              <div className="flex flex-wrap gap-3">
                <button className="bg-[#0d6efd] hover:bg-[#0b5ed7] text-white py-2 px-4 rounded-md transition-colors">Primary</button>
                <button className="bg-[#6c757d] hover:bg-[#5c636a] text-white py-2 px-4 rounded-md transition-colors">Secondary</button>
                <button className="bg-[#198754] hover:bg-[#157347] text-white py-2 px-4 rounded-md transition-colors">Success</button>
                <button className="bg-[#dc3545] hover:bg-[#bb2d3b] text-white py-2 px-4 rounded-md transition-colors">Danger</button>
                <button className="bg-[#ffc107] hover:bg-[#ffca2c] text-black py-2 px-4 rounded-md transition-colors">Warning</button>
                <button className="bg-[#0dcaf0] hover:bg-[#31d2f2] text-black py-2 px-4 rounded-md transition-colors">Info</button>
                <button className="bg-white border border-[#0d6efd] text-[#0d6efd] hover:bg-[#0d6efd] hover:text-white py-2 px-4 rounded-md transition-colors">Outline</button>
              </div>
            </div>

            {/* Material UI */}
            <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-blue-200">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">🎯</span>
                <h3 className="text-xl font-bold text-gray-800">Material UI</h3>
              </div>
              <div className="flex flex-wrap gap-3">
                <button className="bg-[#1976d2] hover:bg-[#1565c0] text-white py-2 px-4 rounded uppercase text-sm font-medium tracking-wide shadow-md hover:shadow-lg transition-all">Contained</button>
                <button className="border-2 border-[#1976d2] text-[#1976d2] hover:bg-blue-50 py-2 px-4 rounded uppercase text-sm font-medium tracking-wide transition-all">Outlined</button>
                <button className="text-[#1976d2] hover:bg-blue-50 py-2 px-4 rounded uppercase text-sm font-medium tracking-wide transition-all">Text</button>
                <button className="bg-[#9c27b0] hover:bg-[#7b1fa2] text-white py-2 px-4 rounded uppercase text-sm font-medium tracking-wide shadow-md">Secondary</button>
                <button className="bg-[#d32f2f] hover:bg-[#c62828] text-white py-2 px-4 rounded uppercase text-sm font-medium tracking-wide shadow-md">Error</button>
                <button className="bg-[#1976d2] hover:bg-[#1565c0] text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"/></svg>
                </button>
              </div>
            </div>

            {/* Ant Design */}
            <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-indigo-200">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">🐜</span>
                <h3 className="text-xl font-bold text-gray-800">Ant Design</h3>
              </div>
              <div className="flex flex-wrap gap-3">
                <button className="bg-[#1677ff] hover:bg-[#4096ff] text-white py-1.5 px-4 rounded-md text-sm transition-colors shadow-sm">Primary</button>
                <button className="bg-white border border-gray-300 hover:border-[#1677ff] hover:text-[#1677ff] text-gray-700 py-1.5 px-4 rounded-md text-sm transition-colors">Default</button>
                <button className="bg-white border border-dashed border-gray-300 hover:border-[#1677ff] hover:text-[#1677ff] text-gray-700 py-1.5 px-4 rounded-md text-sm transition-colors">Dashed</button>
                <button className="text-[#1677ff] hover:text-[#4096ff] py-1.5 px-4 text-sm transition-colors">Text</button>
                <button className="text-[#1677ff] hover:text-[#4096ff] py-1.5 px-4 text-sm transition-colors underline">Link</button>
                <button className="bg-[#1677ff] hover:bg-[#4096ff] text-white py-1.5 px-4 rounded-full text-sm transition-colors shadow-sm">Round</button>
                <button className="bg-red-500 hover:bg-red-400 text-white py-1.5 px-4 rounded-md text-sm transition-colors shadow-sm">Danger</button>
              </div>
            </div>

            {/* Chakra UI */}
            <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-teal-200">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">⚡</span>
                <h3 className="text-xl font-bold text-gray-800">Chakra UI</h3>
              </div>
              <div className="flex flex-wrap gap-3">
                <button className="bg-[#3182ce] hover:bg-[#2b6cb0] text-white font-semibold py-2 px-4 rounded-md transition-colors">Solid</button>
                <button className="border-2 border-[#3182ce] text-[#3182ce] hover:bg-[#ebf8ff] font-semibold py-2 px-4 rounded-md transition-colors">Outline</button>
                <button className="text-[#3182ce] hover:bg-[#ebf8ff] font-semibold py-2 px-4 rounded-md transition-colors">Ghost</button>
                <button className="bg-[#38a169] hover:bg-[#2f855a] text-white font-semibold py-2 px-4 rounded-md transition-colors">Green</button>
                <button className="bg-[#e53e3e] hover:bg-[#c53030] text-white font-semibold py-2 px-4 rounded-md transition-colors">Red</button>
                <button className="bg-[#805ad5] hover:bg-[#6b46c1] text-white font-semibold py-2 px-4 rounded-md transition-colors">Purple</button>
                <button className="bg-[#dd6b20] hover:bg-[#c05621] text-white font-semibold py-2 px-4 rounded-md transition-colors">Orange</button>
              </div>
            </div>

            {/* shadcn/ui */}
            <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">🎭</span>
                <h3 className="text-xl font-bold text-gray-800">shadcn/ui</h3>
              </div>
              <div className="flex flex-wrap gap-3">
                <button className="bg-[#18181b] hover:bg-[#27272a] text-white h-10 px-4 py-2 rounded-md text-sm font-medium transition-colors">Default</button>
                <button className="bg-[#f4f4f5] hover:bg-[#e4e4e7] text-[#18181b] h-10 px-4 py-2 rounded-md text-sm font-medium transition-colors">Secondary</button>
                <button className="bg-[#ef4444] hover:bg-[#dc2626] text-white h-10 px-4 py-2 rounded-md text-sm font-medium transition-colors">Destructive</button>
                <button className="border border-[#e4e4e7] bg-white hover:bg-[#f4f4f5] text-[#18181b] h-10 px-4 py-2 rounded-md text-sm font-medium transition-colors">Outline</button>
                <button className="hover:bg-[#f4f4f5] text-[#18181b] h-10 px-4 py-2 rounded-md text-sm font-medium transition-colors">Ghost</button>
                <button className="text-[#18181b] underline-offset-4 hover:underline h-10 px-4 py-2 text-sm font-medium">Link</button>
              </div>
            </div>

            {/* Plain CSS */}
            <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-orange-200">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">📄</span>
                <h3 className="text-xl font-bold text-gray-800">Plain CSS</h3>
              </div>
              <div className="flex flex-wrap gap-3">
                <button style={{ backgroundColor: '#4CAF50', border: 'none', color: 'white', padding: '12px 24px', cursor: 'pointer', borderRadius: '4px', fontSize: '14px' }}>Primary</button>
                <button style={{ backgroundColor: '#008CBA', border: 'none', color: 'white', padding: '12px 24px', cursor: 'pointer', borderRadius: '4px', fontSize: '14px' }}>Info</button>
                <button style={{ backgroundColor: '#f44336', border: 'none', color: 'white', padding: '12px 24px', cursor: 'pointer', borderRadius: '4px', fontSize: '14px' }}>Danger</button>
                <button style={{ backgroundColor: '#555555', border: 'none', color: 'white', padding: '12px 24px', cursor: 'pointer', borderRadius: '4px', fontSize: '14px' }}>Dark</button>
                <button style={{ backgroundColor: 'white', border: '2px solid #4CAF50', color: '#4CAF50', padding: '10px 22px', cursor: 'pointer', borderRadius: '4px', fontSize: '14px' }}>Outline</button>
                <button style={{ backgroundColor: '#4CAF50', border: 'none', color: 'white', padding: '12px 24px', cursor: 'pointer', borderRadius: '50px', fontSize: '14px' }}>Rounded</button>
              </div>
            </div>

            {/* Styled Components */}
            <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-pink-200">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">💅</span>
                <h3 className="text-xl font-bold text-gray-800">Styled Components</h3>
              </div>
              <div className="flex flex-wrap gap-3">
                <button className="bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all hover:scale-105">Gradient</button>
                <button className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all hover:scale-105">Purple</button>
                <button className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all hover:scale-105">Cool</button>
                <button className="bg-gradient-to-r from-yellow-400 to-red-500 hover:from-yellow-500 hover:to-red-600 text-white font-semibold py-3 px-6 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105">Rounded</button>
                <button className="border-2 border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-white font-semibold py-3 px-6 rounded-lg transition-all">Outline</button>
              </div>
            </div>
          </div>
        )}

        {/* Cards Comparison */}
        {activeTab === "cards" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Cards - Framework Comparison</h2>

            {/* Tailwind CSS */}
            <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-cyan-200">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">🎨</span>
                <h3 className="text-xl font-bold text-gray-800">Tailwind CSS</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="rounded overflow-hidden shadow-lg bg-white">
                  <div className="h-32 bg-gradient-to-r from-cyan-400 to-blue-500"></div>
                  <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">Card Title</div>
                    <p className="text-gray-700 text-base">Some quick example text to build on the card.</p>
                  </div>
                  <div className="px-6 pt-2 pb-4">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white text-sm py-1 px-3 rounded">Action</button>
                  </div>
                </div>
                <div className="rounded-xl overflow-hidden shadow-xl bg-white border-t-4 border-purple-500">
                  <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2 text-purple-600">Featured Card</div>
                    <p className="text-gray-700 text-base">This card has a colored top border accent.</p>
                  </div>
                  <div className="px-6 pb-4">
                    <span className="inline-block bg-purple-100 rounded-full px-3 py-1 text-sm font-semibold text-purple-700 mr-2">#tag1</span>
                    <span className="inline-block bg-purple-100 rounded-full px-3 py-1 text-sm font-semibold text-purple-700">#tag2</span>
                  </div>
                </div>
                <div className="rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
                  <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">Gradient Card</div>
                    <p className="text-indigo-100">A beautiful gradient card with modern design.</p>
                  </div>
                  <div className="px-6 pb-4">
                    <button className="bg-white text-indigo-600 font-bold py-2 px-4 rounded-lg hover:bg-indigo-100">Learn More</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Bootstrap */}
            <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-purple-200">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">🅱️</span>
                <h3 className="text-xl font-bold text-gray-800">Bootstrap</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-md border border-gray-200 shadow-sm">
                  <div className="h-32 bg-gray-200 rounded-t-md"></div>
                  <div className="p-4">
                    <h5 className="text-lg font-medium mb-2">Card title</h5>
                    <p className="text-gray-600 text-sm mb-4">Some quick example text to build on the card title.</p>
                    <button className="bg-[#0d6efd] hover:bg-[#0b5ed7] text-white py-1.5 px-3 rounded-md text-sm">Go somewhere</button>
                  </div>
                </div>
                <div className="bg-white rounded-md border border-gray-200 shadow-sm">
                  <div className="bg-gray-100 px-4 py-3 border-b border-gray-200 font-medium">Featured</div>
                  <div className="p-4">
                    <h5 className="text-lg font-medium mb-2">Special title</h5>
                    <p className="text-gray-600 text-sm mb-4">With supporting text below as a natural lead-in.</p>
                    <button className="bg-[#0d6efd] hover:bg-[#0b5ed7] text-white py-1.5 px-3 rounded-md text-sm">Go somewhere</button>
                  </div>
                </div>
                <div className="bg-[#0d6efd] rounded-md text-white">
                  <div className="px-4 py-3 border-b border-blue-400 font-medium">Header</div>
                  <div className="p-4">
                    <h5 className="text-lg font-medium mb-2">Primary card</h5>
                    <p className="text-blue-100 text-sm">Some quick example text to build on the card title.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Material UI */}
            <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-blue-200">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">🎯</span>
                <h3 className="text-xl font-bold text-gray-800">Material UI</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded shadow-md hover:shadow-lg transition-shadow">
                  <div className="h-36 bg-gradient-to-r from-blue-400 to-blue-600"></div>
                  <div className="p-4">
                    <h5 className="text-lg font-medium mb-1">Card Title</h5>
                    <p className="text-gray-500 text-sm mb-4">Lizards are a widespread group of squamate reptiles.</p>
                    <div className="flex gap-2">
                      <button className="text-[#1976d2] hover:bg-blue-50 py-1 px-2 rounded uppercase text-sm font-medium">Share</button>
                      <button className="text-[#1976d2] hover:bg-blue-50 py-1 px-2 rounded uppercase text-sm font-medium">Learn More</button>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded shadow-md overflow-hidden">
                  <div className="p-4 border-b">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center text-white font-medium">R</div>
                      <div>
                        <p className="font-medium">Shrimp and Chorizo</p>
                        <p className="text-gray-500 text-sm">September 14, 2024</p>
                      </div>
                    </div>
                  </div>
                  <div className="h-32 bg-gray-200"></div>
                  <div className="p-4">
                    <p className="text-gray-600 text-sm">This impressive paella is a perfect party dish.</p>
                  </div>
                </div>
                <div className="bg-white rounded shadow-md p-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                      <span className="text-2xl">🎵</span>
                    </div>
                    <div>
                      <p className="font-medium">Media Card</p>
                      <p className="text-gray-500 text-sm">Artist Name</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <button className="p-2 hover:bg-gray-100 rounded-full">⏮️</button>
                    <button className="p-3 bg-[#1976d2] text-white rounded-full hover:bg-[#1565c0]">▶️</button>
                    <button className="p-2 hover:bg-gray-100 rounded-full">⏭️</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Ant Design */}
            <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-indigo-200">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">🐜</span>
                <h3 className="text-xl font-bold text-gray-800">Ant Design</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="h-32 bg-gradient-to-r from-indigo-400 to-blue-500 rounded-t-lg"></div>
                  <div className="p-4">
                    <h5 className="font-medium mb-2">Card title</h5>
                    <p className="text-gray-500 text-sm">This is the description</p>
                  </div>
                </div>
                <div className="bg-white rounded-lg border border-gray-200">
                  <div className="px-4 py-3 border-b border-gray-200 flex justify-between items-center">
                    <span className="font-medium">Card title</span>
                    <a href="#" className="text-[#1677ff] text-sm hover:text-[#4096ff]">More</a>
                  </div>
                  <div className="p-4">
                    <p className="text-gray-600 text-sm">Card content</p>
                    <p className="text-gray-600 text-sm">Card content</p>
                    <p className="text-gray-600 text-sm">Card content</p>
                  </div>
                </div>
                <div className="bg-white rounded-lg border border-gray-200 p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-2xl">👤</div>
                    <div>
                      <p className="font-medium">Card Meta Title</p>
                      <p className="text-gray-400 text-sm">This is the description</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Chakra UI */}
            <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-teal-200">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">⚡</span>
                <h3 className="text-xl font-bold text-gray-800">Chakra UI</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="h-32 bg-gradient-to-r from-teal-400 to-cyan-500"></div>
                  <div className="p-5">
                    <h5 className="text-lg font-bold mb-2">Card Title</h5>
                    <p className="text-gray-600 text-sm mb-4">With Chakra UI, you can create beautiful interfaces.</p>
                    <p className="text-[#3182ce] text-xl font-bold">$450</p>
                  </div>
                  <div className="px-5 pb-5">
                    <button className="w-full bg-[#3182ce] hover:bg-[#2b6cb0] text-white font-semibold py-2 rounded-md">Buy now</button>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow-md p-5">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-teal-500 rounded-full flex items-center justify-center text-white font-bold">S</div>
                    <div>
                      <p className="font-bold">Segun Adebayo</p>
                      <p className="text-gray-500 text-sm">Creator, Chakra UI</p>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm">&quot;Chakra UI makes building accessible React apps a breeze.&quot;</p>
                </div>
                <div className="bg-white rounded-xl shadow-lg border-t-4 border-[#38a169] p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-2xl">✅</span>
                    <h5 className="text-lg font-bold text-[#38a169]">Success</h5>
                  </div>
                  <p className="text-gray-600 text-sm">Your payment has been processed successfully!</p>
                </div>
              </div>
            </div>

            {/* shadcn/ui */}
            <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">🎭</span>
                <h3 className="text-xl font-bold text-gray-800">shadcn/ui</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg border border-[#e4e4e7] shadow-sm">
                  <div className="p-6">
                    <h5 className="text-lg font-semibold tracking-tight mb-1">Card Title</h5>
                    <p className="text-[#71717a] text-sm">Card Description</p>
                  </div>
                  <div className="p-6 pt-0">
                    <p className="text-sm">Card Content goes here.</p>
                  </div>
                  <div className="p-6 pt-0 flex justify-between">
                    <button className="border border-[#e4e4e7] bg-white hover:bg-[#f4f4f5] text-[#18181b] h-9 px-3 rounded-md text-sm font-medium">Cancel</button>
                    <button className="bg-[#18181b] hover:bg-[#27272a] text-white h-9 px-3 rounded-md text-sm font-medium">Deploy</button>
                  </div>
                </div>
                <div className="bg-white rounded-lg border border-[#e4e4e7] shadow-sm p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-gray-700 to-gray-900 rounded-full"></div>
                    <div>
                      <p className="font-semibold text-sm">shadcn</p>
                      <p className="text-[#71717a] text-xs">@shadcn</p>
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-gray-700">The React Framework – created and maintained by @vercel.</p>
                </div>
                <div className="bg-white rounded-lg border border-[#e4e4e7] shadow-sm">
                  <div className="p-6">
                    <h5 className="text-lg font-semibold mb-1">Notifications</h5>
                    <p className="text-[#71717a] text-sm">You have 3 unread messages.</p>
                  </div>
                  <div className="p-6 pt-0 space-y-3">
                    <div className="flex items-center gap-3 p-2 rounded-md bg-[#f4f4f5]">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm">New message received</span>
                    </div>
                    <div className="flex items-center gap-3 p-2 rounded-md hover:bg-[#f4f4f5]">
                      <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                      <span className="text-sm text-gray-500">Your call has been confirmed</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Plain CSS */}
            <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-orange-200">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">📄</span>
                <h3 className="text-xl font-bold text-gray-800">Plain CSS</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div style={{ boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)', borderRadius: '8px', overflow: 'hidden', backgroundColor: 'white' }}>
                  <div style={{ height: '120px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}></div>
                  <div style={{ padding: '16px' }}>
                    <h4 style={{ margin: '0 0 8px 0', fontSize: '18px', fontWeight: 'bold' }}>Card Title</h4>
                    <p style={{ margin: '0 0 16px 0', color: '#666', fontSize: '14px' }}>Some description text for this card.</p>
                    <button style={{ backgroundColor: '#4CAF50', border: 'none', color: 'white', padding: '8px 16px', cursor: 'pointer', borderRadius: '4px', fontSize: '14px' }}>Read More</button>
                  </div>
                </div>
                <div style={{ border: '1px solid #ddd', borderRadius: '8px', overflow: 'hidden', backgroundColor: 'white' }}>
                  <div style={{ padding: '16px', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>Header</div>
                  <div style={{ padding: '16px' }}>
                    <p style={{ margin: '0', color: '#666', fontSize: '14px' }}>This is a simple card with header and content sections using plain CSS.</p>
                  </div>
                </div>
                <div style={{ boxShadow: '0 8px 16px 0 rgba(0,0,0,0.2)', borderRadius: '8px', padding: '20px', backgroundColor: 'white', borderLeft: '4px solid #4CAF50' }}>
                  <h4 style={{ margin: '0 0 8px 0', fontSize: '18px', fontWeight: 'bold', color: '#4CAF50' }}>Accent Card</h4>
                  <p style={{ margin: '0', color: '#666', fontSize: '14px' }}>Card with left border accent using pure CSS styling.</p>
                </div>
              </div>
            </div>

            {/* Styled Components */}
            <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-pink-200">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">💅</span>
                <h3 className="text-xl font-bold text-gray-800">Styled Components</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow group">
                  <div className="h-32 bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-500 group-hover:scale-105 transition-transform"></div>
                  <div className="p-5">
                    <h5 className="text-xl font-bold mb-2 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">Gradient Card</h5>
                    <p className="text-gray-600 text-sm">Beautiful gradient styling with hover effects.</p>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-purple-600 to-blue-500 rounded-2xl shadow-xl p-6 text-white">
                  <div className="text-4xl mb-3">🚀</div>
                  <h5 className="text-xl font-bold mb-2">Feature Card</h5>
                  <p className="text-purple-100 text-sm">Dynamic theming with styled-components.</p>
                </div>
                <div className="bg-white rounded-2xl shadow-xl p-6 border-2 border-transparent hover:border-pink-400 transition-colors">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full flex items-center justify-center text-white text-xl">💅</div>
                    <div>
                      <p className="font-bold">Styled Card</p>
                      <p className="text-gray-500 text-sm">CSS-in-JS magic</p>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm">Hover to see the border animation!</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Forms Comparison */}
        {activeTab === "forms" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Forms - Framework Comparison</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Tailwind CSS */}
              <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-cyan-200">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">🎨</span>
                  <h3 className="text-lg font-bold text-gray-800">Tailwind CSS</h3>
                </div>
                <div className="bg-white p-4 rounded-xl shadow">
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Username</label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500" type="text" placeholder="Username" />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500" type="email" placeholder="Email" />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500" type="password" placeholder="Password" />
                  </div>
                  <button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Sign In</button>
                </div>
              </div>

              {/* Bootstrap */}
              <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-purple-200">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">🅱️</span>
                  <h3 className="text-lg font-bold text-gray-800">Bootstrap</h3>
                </div>
                <div className="bg-white p-4 rounded-md border border-gray-200">
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm mb-1">Email address</label>
                    <input className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#0d6efd] focus:border-[#0d6efd]" type="email" placeholder="name@example.com" />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm mb-1">Password</label>
                    <input className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#0d6efd] focus:border-[#0d6efd]" type="password" placeholder="Password" />
                  </div>
                  <div className="mb-4 flex items-center">
                    <input type="checkbox" className="w-4 h-4 text-[#0d6efd] border-gray-300 rounded" />
                    <label className="ml-2 text-sm text-gray-700">Remember me</label>
                  </div>
                  <button className="w-full bg-[#0d6efd] hover:bg-[#0b5ed7] text-white py-2 px-4 rounded-md">Submit</button>
                </div>
              </div>

              {/* Material UI */}
              <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-blue-200">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">🎯</span>
                  <h3 className="text-lg font-bold text-gray-800">Material UI</h3>
                </div>
                <div className="bg-white p-4 rounded shadow-md">
                  <div className="mb-5 relative">
                    <input type="text" placeholder=" " className="peer w-full border-2 border-gray-300 rounded py-3 px-3 focus:outline-none focus:border-[#1976d2] transition-colors" />
                    <label className="absolute left-3 -top-2.5 bg-white px-1 text-sm text-gray-500 peer-focus:text-[#1976d2]">Username</label>
                  </div>
                  <div className="mb-5 relative">
                    <input type="email" placeholder=" " className="peer w-full border-2 border-gray-300 rounded py-3 px-3 focus:outline-none focus:border-[#1976d2] transition-colors" />
                    <label className="absolute left-3 -top-2.5 bg-white px-1 text-sm text-gray-500 peer-focus:text-[#1976d2]">Email</label>
                  </div>
                  <div className="mb-5 relative">
                    <input type="password" placeholder=" " className="peer w-full border-2 border-gray-300 rounded py-3 px-3 focus:outline-none focus:border-[#1976d2] transition-colors" />
                    <label className="absolute left-3 -top-2.5 bg-white px-1 text-sm text-gray-500 peer-focus:text-[#1976d2]">Password</label>
                  </div>
                  <button className="w-full bg-[#1976d2] hover:bg-[#1565c0] text-white py-2.5 px-4 rounded uppercase text-sm font-medium tracking-wide shadow-md">Sign In</button>
                </div>
              </div>

              {/* Ant Design */}
              <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-indigo-200">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">🐜</span>
                  <h3 className="text-lg font-bold text-gray-800">Ant Design</h3>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm mb-1">Username <span className="text-red-500">*</span></label>
                    <input className="w-full border border-gray-300 rounded-md py-1.5 px-3 focus:outline-none focus:border-[#1677ff] focus:shadow-[0_0_0_2px_rgba(22,119,255,0.1)] transition-all" type="text" placeholder="Please input username" />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm mb-1">Password <span className="text-red-500">*</span></label>
                    <input className="w-full border border-gray-300 rounded-md py-1.5 px-3 focus:outline-none focus:border-[#1677ff] focus:shadow-[0_0_0_2px_rgba(22,119,255,0.1)] transition-all" type="password" placeholder="Please input password" />
                  </div>
                  <div className="mb-4 flex items-center">
                    <input type="checkbox" className="w-4 h-4 text-[#1677ff] border-gray-300 rounded" />
                    <label className="ml-2 text-sm text-gray-700">Remember me</label>
                  </div>
                  <button className="bg-[#1677ff] hover:bg-[#4096ff] text-white py-1.5 px-4 rounded-md text-sm transition-colors w-full">Submit</button>
                </div>
              </div>

              {/* Chakra UI */}
              <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-teal-200">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">⚡</span>
                  <h3 className="text-lg font-bold text-gray-800">Chakra UI</h3>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md">
                  <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">Email address</label>
                    <input className="w-full border-2 border-gray-200 rounded-md py-2 px-4 focus:outline-none focus:border-[#3182ce] transition-colors" type="email" placeholder="Enter email" />
                    <p className="text-gray-500 text-xs mt-1">We&apos;ll never share your email.</p>
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">Password</label>
                    <input className="w-full border-2 border-gray-200 rounded-md py-2 px-4 focus:outline-none focus:border-[#3182ce] transition-colors" type="password" placeholder="Enter password" />
                  </div>
                  <button className="w-full bg-[#319795] hover:bg-[#2c7a7b] text-white font-semibold py-2.5 rounded-md transition-colors">Sign In</button>
                </div>
              </div>

              {/* shadcn/ui */}
              <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-gray-200">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">🎭</span>
                  <h3 className="text-lg font-bold text-gray-800">shadcn/ui</h3>
                </div>
                <div className="bg-white p-4 rounded-lg border border-[#e4e4e7] shadow-sm">
                  <div className="mb-4">
                    <label className="text-sm font-medium mb-2 block">Email</label>
                    <input className="flex h-10 w-full rounded-md border border-[#e4e4e7] bg-white px-3 py-2 text-sm placeholder:text-[#a1a1aa] focus:outline-none focus:ring-2 focus:ring-[#18181b] focus:ring-offset-2" type="email" placeholder="m@example.com" />
                  </div>
                  <div className="mb-4">
                    <label className="text-sm font-medium mb-2 block">Password</label>
                    <input className="flex h-10 w-full rounded-md border border-[#e4e4e7] bg-white px-3 py-2 text-sm placeholder:text-[#a1a1aa] focus:outline-none focus:ring-2 focus:ring-[#18181b] focus:ring-offset-2" type="password" />
                  </div>
                  <button className="w-full bg-[#18181b] hover:bg-[#27272a] text-white h-10 rounded-md text-sm font-medium">Sign In</button>
                </div>
              </div>

              {/* Plain CSS */}
              <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-orange-200">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">📄</span>
                  <h3 className="text-lg font-bold text-gray-800">Plain CSS</h3>
                </div>
                <div style={{ backgroundColor: 'white', padding: '16px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', fontSize: '14px' }}>Username</label>
                    <input type="text" placeholder="Enter username" style={{ width: '100%', padding: '10px 12px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '14px', boxSizing: 'border-box' }} />
                  </div>
                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', fontSize: '14px' }}>Email</label>
                    <input type="email" placeholder="Enter email" style={{ width: '100%', padding: '10px 12px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '14px', boxSizing: 'border-box' }} />
                  </div>
                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', fontSize: '14px' }}>Password</label>
                    <input type="password" placeholder="Enter password" style={{ width: '100%', padding: '10px 12px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '14px', boxSizing: 'border-box' }} />
                  </div>
                  <button style={{ width: '100%', backgroundColor: '#4CAF50', border: 'none', color: 'white', padding: '12px', cursor: 'pointer', borderRadius: '4px', fontSize: '14px', fontWeight: '500' }}>Submit</button>
                </div>
              </div>

              {/* Styled Components */}
              <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-pink-200">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">💅</span>
                  <h3 className="text-lg font-bold text-gray-800">Styled Components</h3>
                </div>
                <div className="bg-white p-4 rounded-2xl shadow-xl">
                  <div className="mb-5">
                    <label className="block text-gray-700 font-medium mb-2">Email</label>
                    <input className="w-full border-2 border-gray-200 rounded-xl py-3 px-4 focus:outline-none focus:border-pink-400 transition-colors" type="email" placeholder="Enter your email" />
                  </div>
                  <div className="mb-5">
                    <label className="block text-gray-700 font-medium mb-2">Password</label>
                    <input className="w-full border-2 border-gray-200 rounded-xl py-3 px-4 focus:outline-none focus:border-pink-400 transition-colors" type="password" placeholder="Enter password" />
                  </div>
                  <button className="w-full bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]">Sign In</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Alerts Comparison */}
        {activeTab === "alerts" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Alerts - Framework Comparison</h2>

            {/* Tailwind CSS */}
            <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-cyan-200">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">🎨</span>
                <h3 className="text-xl font-bold text-gray-800">Tailwind CSS</h3>
              </div>
              <div className="space-y-3">
                <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 rounded" role="alert">
                  <p className="font-bold">Info</p>
                  <p>This is an informational alert message.</p>
                </div>
                <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded" role="alert">
                  <p className="font-bold">Success</p>
                  <p>Your action was completed successfully!</p>
                </div>
                <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded" role="alert">
                  <p className="font-bold">Warning</p>
                  <p>Please review before proceeding.</p>
                </div>
                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded" role="alert">
                  <p className="font-bold">Error</p>
                  <p>Something went wrong. Please try again.</p>
                </div>
              </div>
            </div>

            {/* Bootstrap */}
            <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-purple-200">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">🅱️</span>
                <h3 className="text-xl font-bold text-gray-800">Bootstrap</h3>
              </div>
              <div className="space-y-3">
                <div className="bg-[#cfe2ff] border border-[#b6d4fe] text-[#084298] px-4 py-3 rounded-md">
                  <strong>Info!</strong> A simple primary alert.
                </div>
                <div className="bg-[#d1e7dd] border border-[#badbcc] text-[#0f5132] px-4 py-3 rounded-md">
                  <strong>Success!</strong> A simple success alert.
                </div>
                <div className="bg-[#fff3cd] border border-[#ffecb5] text-[#664d03] px-4 py-3 rounded-md">
                  <strong>Warning!</strong> A simple warning alert.
                </div>
                <div className="bg-[#f8d7da] border border-[#f5c2c7] text-[#842029] px-4 py-3 rounded-md">
                  <strong>Danger!</strong> A simple danger alert.
                </div>
              </div>
            </div>

            {/* Material UI */}
            <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-blue-200">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">🎯</span>
                <h3 className="text-xl font-bold text-gray-800">Material UI</h3>
              </div>
              <div className="space-y-3">
                <div className="bg-[#e3f2fd] text-[#1976d2] px-4 py-3 rounded flex items-center gap-3">
                  <span className="text-xl">ℹ️</span>
                  <span>This is an info alert — check it out!</span>
                </div>
                <div className="bg-[#e8f5e9] text-[#2e7d32] px-4 py-3 rounded flex items-center gap-3">
                  <span className="text-xl">✅</span>
                  <span>This is a success alert — check it out!</span>
                </div>
                <div className="bg-[#fff3e0] text-[#ed6c02] px-4 py-3 rounded flex items-center gap-3">
                  <span className="text-xl">⚠️</span>
                  <span>This is a warning alert — check it out!</span>
                </div>
                <div className="bg-[#ffebee] text-[#d32f2f] px-4 py-3 rounded flex items-center gap-3">
                  <span className="text-xl">❌</span>
                  <span>This is an error alert — check it out!</span>
                </div>
              </div>
            </div>

            {/* Ant Design */}
            <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-indigo-200">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">🐜</span>
                <h3 className="text-xl font-bold text-gray-800">Ant Design</h3>
              </div>
              <div className="space-y-3">
                <div className="bg-[#e6f4ff] border border-[#91caff] text-[#1677ff] px-4 py-3 rounded-lg flex items-center gap-3">
                  <span className="text-lg">ℹ️</span>
                  <span>Informational Notes</span>
                </div>
                <div className="bg-[#f6ffed] border border-[#b7eb8f] text-[#52c41a] px-4 py-3 rounded-lg flex items-center gap-3">
                  <span className="text-lg">✅</span>
                  <span>Success Tips</span>
                </div>
                <div className="bg-[#fffbe6] border border-[#ffe58f] text-[#faad14] px-4 py-3 rounded-lg flex items-center gap-3">
                  <span className="text-lg">⚠️</span>
                  <span>Warning</span>
                </div>
                <div className="bg-[#fff2f0] border border-[#ffccc7] text-[#ff4d4f] px-4 py-3 rounded-lg flex items-center gap-3">
                  <span className="text-lg">❌</span>
                  <span>Error</span>
                </div>
              </div>
            </div>

            {/* Chakra UI */}
            <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-teal-200">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">⚡</span>
                <h3 className="text-xl font-bold text-gray-800">Chakra UI</h3>
              </div>
              <div className="space-y-3">
                <div className="bg-[#ebf8ff] border-l-4 border-[#3182ce] text-[#2c5282] px-4 py-3 rounded-md">
                  <p className="font-bold">Info</p>
                  <p className="text-sm">Chakra is going live on August 30th. Get ready!</p>
                </div>
                <div className="bg-[#c6f6d5] border-l-4 border-[#38a169] text-[#276749] px-4 py-3 rounded-md">
                  <p className="font-bold">Success</p>
                  <p className="text-sm">Data uploaded to the server. Fire on!</p>
                </div>
                <div className="bg-[#fefcbf] border-l-4 border-[#d69e2e] text-[#975a16] px-4 py-3 rounded-md">
                  <p className="font-bold">Warning</p>
                  <p className="text-sm">Seems your account is about to expire, upgrade now.</p>
                </div>
                <div className="bg-[#fed7d7] border-l-4 border-[#e53e3e] text-[#c53030] px-4 py-3 rounded-md">
                  <p className="font-bold">Error</p>
                  <p className="text-sm">There was an error processing your request.</p>
                </div>
              </div>
            </div>

            {/* shadcn/ui */}
            <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">🎭</span>
                <h3 className="text-xl font-bold text-gray-800">shadcn/ui</h3>
              </div>
              <div className="space-y-3">
                <div className="border border-[#e4e4e7] bg-white text-[#18181b] px-4 py-3 rounded-lg">
                  <p className="font-semibold">Heads up!</p>
                  <p className="text-sm text-[#71717a]">You can add components to your app using the cli.</p>
                </div>
                <div className="border border-[#86efac] bg-[#f0fdf4] text-[#166534] px-4 py-3 rounded-lg">
                  <p className="font-semibold">Success</p>
                  <p className="text-sm">Your message has been sent.</p>
                </div>
                <div className="border border-[#fcd34d] bg-[#fefce8] text-[#a16207] px-4 py-3 rounded-lg">
                  <p className="font-semibold">Warning</p>
                  <p className="text-sm">Your session is about to expire.</p>
                </div>
                <div className="border border-[#fca5a5] bg-[#fef2f2] text-[#dc2626] px-4 py-3 rounded-lg">
                  <p className="font-semibold">Error</p>
                  <p className="text-sm">Your session has expired. Please log in again.</p>
                </div>
              </div>
            </div>

            {/* Plain CSS */}
            <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-orange-200">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">📄</span>
                <h3 className="text-xl font-bold text-gray-800">Plain CSS</h3>
              </div>
              <div className="space-y-3">
                <div style={{ padding: '16px', backgroundColor: '#cce5ff', border: '1px solid #b8daff', borderRadius: '4px', color: '#004085' }}>
                  <strong>Info!</strong> This is an info alert.
                </div>
                <div style={{ padding: '16px', backgroundColor: '#d4edda', border: '1px solid #c3e6cb', borderRadius: '4px', color: '#155724' }}>
                  <strong>Success!</strong> This is a success alert.
                </div>
                <div style={{ padding: '16px', backgroundColor: '#fff3cd', border: '1px solid #ffeeba', borderRadius: '4px', color: '#856404' }}>
                  <strong>Warning!</strong> This is a warning alert.
                </div>
                <div style={{ padding: '16px', backgroundColor: '#f8d7da', border: '1px solid #f5c6cb', borderRadius: '4px', color: '#721c24' }}>
                  <strong>Error!</strong> This is an error alert.
                </div>
              </div>
            </div>

            {/* Styled Components */}
            <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-pink-200">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">💅</span>
                <h3 className="text-xl font-bold text-gray-800">Styled Components</h3>
              </div>
              <div className="space-y-3">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500 text-blue-800 px-4 py-3 rounded-lg shadow-sm">
                  <p className="font-bold">Info</p>
                  <p className="text-sm">This is a styled info alert with gradients.</p>
                </div>
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500 text-green-800 px-4 py-3 rounded-lg shadow-sm">
                  <p className="font-bold">Success</p>
                  <p className="text-sm">Your styled action was successful!</p>
                </div>
                <div className="bg-gradient-to-r from-yellow-50 to-amber-50 border-l-4 border-yellow-500 text-yellow-800 px-4 py-3 rounded-lg shadow-sm">
                  <p className="font-bold">Warning</p>
                  <p className="text-sm">This is a styled warning alert.</p>
                </div>
                <div className="bg-gradient-to-r from-red-50 to-pink-50 border-l-4 border-red-500 text-red-800 px-4 py-3 rounded-lg shadow-sm">
                  <p className="font-bold">Error</p>
                  <p className="text-sm">This is a styled error alert.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Badges Comparison */}
        {activeTab === "badges" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Badges - Framework Comparison</h2>

            {/* Tailwind CSS */}
            <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-cyan-200">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">🎨</span>
                <h3 className="text-xl font-bold text-gray-800">Tailwind CSS</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">Blue</span>
                <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">Green</span>
                <span className="bg-red-100 text-red-800 text-sm font-medium px-3 py-1 rounded-full">Red</span>
                <span className="bg-yellow-100 text-yellow-800 text-sm font-medium px-3 py-1 rounded-full">Yellow</span>
                <span className="bg-purple-100 text-purple-800 text-sm font-medium px-3 py-1 rounded-full">Purple</span>
                <span className="bg-pink-100 text-pink-800 text-sm font-medium px-3 py-1 rounded-full">Pink</span>
                <span className="bg-indigo-100 text-indigo-800 text-sm font-medium px-3 py-1 rounded-full">Indigo</span>
                <span className="bg-gray-100 text-gray-800 text-sm font-medium px-3 py-1 rounded-full">Gray</span>
              </div>
            </div>

            {/* Bootstrap */}
            <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-purple-200">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">🅱️</span>
                <h3 className="text-xl font-bold text-gray-800">Bootstrap</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="bg-[#0d6efd] text-white text-sm px-2.5 py-1 rounded-md">Primary</span>
                <span className="bg-[#6c757d] text-white text-sm px-2.5 py-1 rounded-md">Secondary</span>
                <span className="bg-[#198754] text-white text-sm px-2.5 py-1 rounded-md">Success</span>
                <span className="bg-[#dc3545] text-white text-sm px-2.5 py-1 rounded-md">Danger</span>
                <span className="bg-[#ffc107] text-black text-sm px-2.5 py-1 rounded-md">Warning</span>
                <span className="bg-[#0dcaf0] text-black text-sm px-2.5 py-1 rounded-md">Info</span>
                <span className="bg-[#f8f9fa] text-black text-sm px-2.5 py-1 rounded-md">Light</span>
                <span className="bg-[#212529] text-white text-sm px-2.5 py-1 rounded-md">Dark</span>
              </div>
            </div>

            {/* Material UI */}
            <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-blue-200">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">🎯</span>
                <h3 className="text-xl font-bold text-gray-800">Material UI (Chips)</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="bg-gray-200 text-gray-800 text-sm px-3 py-1 rounded-full">Basic</span>
                <span className="bg-[#e3f2fd] text-[#1976d2] text-sm px-3 py-1 rounded-full">Primary</span>
                <span className="bg-[#f3e5f5] text-[#9c27b0] text-sm px-3 py-1 rounded-full">Secondary</span>
                <span className="bg-[#e8f5e9] text-[#2e7d32] text-sm px-3 py-1 rounded-full">Success</span>
                <span className="bg-[#ffebee] text-[#d32f2f] text-sm px-3 py-1 rounded-full">Error</span>
                <span className="border border-[#1976d2] text-[#1976d2] text-sm px-3 py-1 rounded-full">Outlined</span>
              </div>
            </div>

            {/* Ant Design */}
            <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-indigo-200">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">🐜</span>
                <h3 className="text-xl font-bold text-gray-800">Ant Design (Tags)</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="bg-[#fafafa] border border-gray-300 text-gray-700 text-xs px-2 py-0.5 rounded">Tag 1</span>
                <span className="bg-[#e6f4ff] border border-[#91caff] text-[#1677ff] text-xs px-2 py-0.5 rounded">Processing</span>
                <span className="bg-[#f6ffed] border border-[#b7eb8f] text-[#52c41a] text-xs px-2 py-0.5 rounded">Success</span>
                <span className="bg-[#fff2f0] border border-[#ffccc7] text-[#ff4d4f] text-xs px-2 py-0.5 rounded">Error</span>
                <span className="bg-[#fffbe6] border border-[#ffe58f] text-[#faad14] text-xs px-2 py-0.5 rounded">Warning</span>
                <span className="bg-[#f0f5ff] border border-[#adc6ff] text-[#2f54eb] text-xs px-2 py-0.5 rounded">Geek Blue</span>
                <span className="bg-[#fff0f6] border border-[#ffadd2] text-[#eb2f96] text-xs px-2 py-0.5 rounded">Magenta</span>
                <span className="bg-[#f9f0ff] border border-[#d3adf7] text-[#722ed1] text-xs px-2 py-0.5 rounded">Purple</span>
              </div>
            </div>

            {/* Chakra UI */}
            <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-teal-200">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">⚡</span>
                <h3 className="text-xl font-bold text-gray-800">Chakra UI</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="bg-gray-100 text-gray-800 text-xs font-bold px-2 py-1 rounded uppercase">Default</span>
                <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded uppercase">Success</span>
                <span className="bg-red-100 text-red-800 text-xs font-bold px-2 py-1 rounded uppercase">Removed</span>
                <span className="bg-purple-500 text-white text-xs font-bold px-2 py-1 rounded uppercase">New</span>
                <span className="bg-teal-500 text-white text-xs font-bold px-2 py-1 rounded uppercase">Teal</span>
                <span className="bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded uppercase">Orange</span>
                <span className="bg-cyan-500 text-white text-xs font-bold px-2 py-1 rounded uppercase">Cyan</span>
              </div>
            </div>

            {/* shadcn/ui */}
            <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">🎭</span>
                <h3 className="text-xl font-bold text-gray-800">shadcn/ui</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="bg-[#18181b] text-white text-xs font-semibold px-2.5 py-0.5 rounded-full">Default</span>
                <span className="bg-[#f4f4f5] text-[#18181b] text-xs font-semibold px-2.5 py-0.5 rounded-full">Secondary</span>
                <span className="bg-[#ef4444] text-white text-xs font-semibold px-2.5 py-0.5 rounded-full">Destructive</span>
                <span className="border border-[#e4e4e7] text-[#18181b] text-xs font-semibold px-2.5 py-0.5 rounded-full">Outline</span>
              </div>
            </div>

            {/* Plain CSS */}
            <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-orange-200">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">📄</span>
                <h3 className="text-xl font-bold text-gray-800">Plain CSS</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                <span style={{ backgroundColor: '#4CAF50', color: 'white', padding: '4px 12px', borderRadius: '4px', fontSize: '12px' }}>Success</span>
                <span style={{ backgroundColor: '#2196F3', color: 'white', padding: '4px 12px', borderRadius: '4px', fontSize: '12px' }}>Info</span>
                <span style={{ backgroundColor: '#ff9800', color: 'white', padding: '4px 12px', borderRadius: '4px', fontSize: '12px' }}>Warning</span>
                <span style={{ backgroundColor: '#f44336', color: 'white', padding: '4px 12px', borderRadius: '4px', fontSize: '12px' }}>Danger</span>
                <span style={{ backgroundColor: '#9c27b0', color: 'white', padding: '4px 12px', borderRadius: '4px', fontSize: '12px' }}>Purple</span>
                <span style={{ backgroundColor: '#607d8b', color: 'white', padding: '4px 12px', borderRadius: '4px', fontSize: '12px' }}>Gray</span>
              </div>
            </div>

            {/* Styled Components */}
            <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-pink-200">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">💅</span>
                <h3 className="text-xl font-bold text-gray-800">Styled Components</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="bg-gradient-to-r from-pink-500 to-orange-500 text-white text-sm font-medium px-4 py-1.5 rounded-full shadow-md">Gradient</span>
                <span className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white text-sm font-medium px-4 py-1.5 rounded-full shadow-md">Purple</span>
                <span className="bg-gradient-to-r from-green-400 to-cyan-500 text-white text-sm font-medium px-4 py-1.5 rounded-full shadow-md">Teal</span>
                <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-sm font-medium px-4 py-1.5 rounded-full shadow-md">Warm</span>
                <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-medium px-4 py-1.5 rounded-full shadow-md">Cool</span>
                <span className="border-2 border-pink-500 text-pink-500 text-sm font-medium px-4 py-1.5 rounded-full">Outline</span>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
