"use client";

import { useState } from "react";
import Link from "next/link";

export default function LayoutComponentsPage() {
  const [activeTab, setActiveTab] = useState("sidebar");

  const tabs = [
    { id: "sidebar", label: "Sidebar Navigation" },
    { id: "topnav", label: "Top Navigation" },
    { id: "footer", label: "Footer" },
    { id: "breadcrumb", label: "Breadcrumb" },
    { id: "hero", label: "Hero Section" },
    { id: "cardsgrid", label: "Cards Grid" },
    { id: "datatable", label: "Data Table" },
    { id: "modal", label: "Modal/Popup" },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                Layout Components Examples
              </h1>
              <p className="text-gray-600 text-sm mt-1">
                Live examples of common layout patterns
              </p>
            </div>
            <Link
              href="/frontend-studio"
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Frontend Studio
            </Link>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-1 overflow-x-auto py-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-md"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Sidebar Navigation */}
        {activeTab === "sidebar" && (
          <div className="space-y-8">
            <h2 className="text-xl font-bold text-gray-800">Sidebar Navigation Examples</h2>

            {/* Example 1: Classic Sidebar */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-4 border-b bg-gray-50">
                <h3 className="font-semibold text-gray-700">Classic Sidebar</h3>
              </div>
              <div className="flex h-80">
                <div className={`${isSidebarCollapsed ? 'w-16' : 'w-64'} bg-gray-900 text-white transition-all duration-300`}>
                  <div className="p-4 border-b border-gray-700 flex items-center justify-between">
                    {!isSidebarCollapsed && <span className="font-bold">Dashboard</span>}
                    <button
                      onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                      className="p-1 hover:bg-gray-700 rounded"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isSidebarCollapsed ? "M13 5l7 7-7 7M5 5l7 7-7 7" : "M11 19l-7-7 7-7m8 14l-7-7 7-7"} />
                      </svg>
                    </button>
                  </div>
                  <nav className="p-2">
                    {[
                      { icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6", label: "Home" },
                      { icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z", label: "Profile" },
                      { icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z", label: "Settings" },
                      { icon: "M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z", label: "Help" },
                    ].map((item, i) => (
                      <a key={i} href="#" className={`flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-700 transition-colors ${i === 0 ? 'bg-gray-700' : ''}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                        </svg>
                        {!isSidebarCollapsed && <span>{item.label}</span>}
                      </a>
                    ))}
                  </nav>
                </div>
                <div className="flex-1 p-6 bg-gray-50">
                  <p className="text-gray-600">Main content area</p>
                </div>
              </div>
            </div>

            {/* Example 2: Colored Sidebar with Icons */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-4 border-b bg-gray-50">
                <h3 className="font-semibold text-gray-700">Gradient Sidebar with Badges</h3>
              </div>
              <div className="flex h-80">
                <div className="w-64 bg-gradient-to-b from-indigo-600 to-purple-700 text-white">
                  <div className="p-4 border-b border-white/20">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                        <span className="font-bold">A</span>
                      </div>
                      <div>
                        <p className="font-semibold">Acme Inc</p>
                        <p className="text-xs text-white/70">Pro Plan</p>
                      </div>
                    </div>
                  </div>
                  <nav className="p-3 space-y-1">
                    {[
                      { label: "Dashboard", badge: null, active: true },
                      { label: "Messages", badge: "5", active: false },
                      { label: "Analytics", badge: null, active: false },
                      { label: "Team", badge: "New", active: false },
                    ].map((item, i) => (
                      <a key={i} href="#" className={`flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${item.active ? 'bg-white/20' : 'hover:bg-white/10'}`}>
                        <span>{item.label}</span>
                        {item.badge && (
                          <span className={`px-2 py-0.5 text-xs rounded-full ${item.badge === "New" ? 'bg-green-400 text-green-900' : 'bg-red-400 text-red-900'}`}>
                            {item.badge}
                          </span>
                        )}
                      </a>
                    ))}
                  </nav>
                </div>
                <div className="flex-1 p-6 bg-gray-50">
                  <p className="text-gray-600">Main content area</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Top Navigation */}
        {activeTab === "topnav" && (
          <div className="space-y-8">
            <h2 className="text-xl font-bold text-gray-800">Top Navigation Examples</h2>

            {/* Example 1: Simple Nav */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-4 border-b bg-gray-50">
                <h3 className="font-semibold text-gray-700">Simple Navigation Bar</h3>
              </div>
              <div className="bg-white shadow">
                <div className="max-w-6xl mx-auto px-4">
                  <div className="flex items-center justify-between h-16">
                    <div className="font-bold text-xl text-indigo-600">Logo</div>
                    <nav className="hidden md:flex items-center gap-8">
                      <a href="#" className="text-gray-900 font-medium">Home</a>
                      <a href="#" className="text-gray-600 hover:text-gray-900">Products</a>
                      <a href="#" className="text-gray-600 hover:text-gray-900">About</a>
                      <a href="#" className="text-gray-600 hover:text-gray-900">Contact</a>
                    </nav>
                    <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                      Get Started
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Example 2: Nav with Dropdown */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-4 border-b bg-gray-50">
                <h3 className="font-semibold text-gray-700">Navigation with Search & User Menu</h3>
              </div>
              <div className="bg-gray-900">
                <div className="max-w-6xl mx-auto px-4">
                  <div className="flex items-center justify-between h-16">
                    <div className="flex items-center gap-8">
                      <div className="font-bold text-xl text-white">Brand</div>
                      <nav className="hidden md:flex items-center gap-6">
                        <a href="#" className="text-white">Dashboard</a>
                        <a href="#" className="text-gray-400 hover:text-white">Projects</a>
                        <a href="#" className="text-gray-400 hover:text-white">Team</a>
                      </nav>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <input type="text" placeholder="Search..." className="w-64 px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:border-indigo-500" />
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 absolute right-3 top-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </div>
                      <button className="p-2 text-gray-400 hover:text-white relative">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                        </svg>
                        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                      </button>
                      <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Example 3: Transparent Nav */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-4 border-b bg-gray-50">
                <h3 className="font-semibold text-gray-700">Transparent Hero Navigation</h3>
              </div>
              <div className="relative h-64 bg-gradient-to-r from-purple-600 to-indigo-600">
                <div className="absolute inset-x-0 top-0">
                  <div className="max-w-6xl mx-auto px-4">
                    <div className="flex items-center justify-between h-16">
                      <div className="font-bold text-xl text-white">Brand</div>
                      <nav className="hidden md:flex items-center gap-8">
                        <a href="#" className="text-white/90 hover:text-white">Features</a>
                        <a href="#" className="text-white/90 hover:text-white">Pricing</a>
                        <a href="#" className="text-white/90 hover:text-white">About</a>
                      </nav>
                      <div className="flex items-center gap-4">
                        <a href="#" className="text-white/90 hover:text-white">Sign In</a>
                        <button className="px-4 py-2 bg-white text-indigo-600 rounded-lg font-medium hover:bg-gray-100">
                          Get Started
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-center h-full">
                  <h1 className="text-3xl font-bold text-white">Hero Content</h1>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        {activeTab === "footer" && (
          <div className="space-y-8">
            <h2 className="text-xl font-bold text-gray-800">Footer Examples</h2>

            {/* Example 1: Simple Footer */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-4 border-b bg-gray-50">
                <h3 className="font-semibold text-gray-700">Simple Footer</h3>
              </div>
              <footer className="bg-gray-900 text-white py-8">
                <div className="max-w-6xl mx-auto px-4">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="font-bold text-xl">Brand</div>
                    <nav className="flex items-center gap-6">
                      <a href="#" className="text-gray-400 hover:text-white">Privacy</a>
                      <a href="#" className="text-gray-400 hover:text-white">Terms</a>
                      <a href="#" className="text-gray-400 hover:text-white">Contact</a>
                    </nav>
                    <p className="text-gray-400 text-sm">© 2024 Brand. All rights reserved.</p>
                  </div>
                </div>
              </footer>
            </div>

            {/* Example 2: Multi-column Footer */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-4 border-b bg-gray-50">
                <h3 className="font-semibold text-gray-700">Multi-Column Footer</h3>
              </div>
              <footer className="bg-gray-900 text-white py-12">
                <div className="max-w-6xl mx-auto px-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
                    <div>
                      <h4 className="font-semibold mb-4">Product</h4>
                      <ul className="space-y-2 text-gray-400">
                        <li><a href="#" className="hover:text-white">Features</a></li>
                        <li><a href="#" className="hover:text-white">Pricing</a></li>
                        <li><a href="#" className="hover:text-white">API</a></li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-4">Company</h4>
                      <ul className="space-y-2 text-gray-400">
                        <li><a href="#" className="hover:text-white">About</a></li>
                        <li><a href="#" className="hover:text-white">Blog</a></li>
                        <li><a href="#" className="hover:text-white">Careers</a></li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-4">Resources</h4>
                      <ul className="space-y-2 text-gray-400">
                        <li><a href="#" className="hover:text-white">Documentation</a></li>
                        <li><a href="#" className="hover:text-white">Help Center</a></li>
                        <li><a href="#" className="hover:text-white">Community</a></li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-4">Legal</h4>
                      <ul className="space-y-2 text-gray-400">
                        <li><a href="#" className="hover:text-white">Privacy</a></li>
                        <li><a href="#" className="hover:text-white">Terms</a></li>
                        <li><a href="#" className="hover:text-white">Cookie Policy</a></li>
                      </ul>
                    </div>
                  </div>
                  <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-gray-400 text-sm">© 2024 Brand. All rights reserved.</p>
                    <div className="flex items-center gap-4">
                      <a href="#" className="text-gray-400 hover:text-white">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                      </a>
                      <a href="#" className="text-gray-400 hover:text-white">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                      </a>
                      <a href="#" className="text-gray-400 hover:text-white">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                      </a>
                    </div>
                  </div>
                </div>
              </footer>
            </div>

            {/* Example 3: CTA Footer */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-4 border-b bg-gray-50">
                <h3 className="font-semibold text-gray-700">Footer with Newsletter CTA</h3>
              </div>
              <footer className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-12">
                <div className="max-w-6xl mx-auto px-4 text-center">
                  <h3 className="text-2xl font-bold mb-4">Stay Updated</h3>
                  <p className="text-white/80 mb-6">Subscribe to our newsletter for the latest updates.</p>
                  <div className="flex max-w-md mx-auto gap-2">
                    <input type="email" placeholder="Enter your email" className="flex-1 px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50" />
                    <button className="px-6 py-3 bg-white text-indigo-600 rounded-lg font-semibold hover:bg-gray-100">
                      Subscribe
                    </button>
                  </div>
                </div>
              </footer>
            </div>
          </div>
        )}

        {/* Breadcrumb */}
        {activeTab === "breadcrumb" && (
          <div className="space-y-8">
            <h2 className="text-xl font-bold text-gray-800">Breadcrumb Examples</h2>

            {/* Example 1: Simple Breadcrumb */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-4 border-b bg-gray-50">
                <h3 className="font-semibold text-gray-700">Simple Breadcrumb</h3>
              </div>
              <div className="p-6">
                <nav className="flex items-center text-sm">
                  <a href="#" className="text-gray-500 hover:text-gray-700">Home</a>
                  <span className="mx-2 text-gray-400">/</span>
                  <a href="#" className="text-gray-500 hover:text-gray-700">Products</a>
                  <span className="mx-2 text-gray-400">/</span>
                  <a href="#" className="text-gray-500 hover:text-gray-700">Electronics</a>
                  <span className="mx-2 text-gray-400">/</span>
                  <span className="text-gray-900 font-medium">Laptops</span>
                </nav>
              </div>
            </div>

            {/* Example 2: Breadcrumb with Icons */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-4 border-b bg-gray-50">
                <h3 className="font-semibold text-gray-700">Breadcrumb with Icons</h3>
              </div>
              <div className="p-6">
                <nav className="flex items-center text-sm">
                  <a href="#" className="text-gray-500 hover:text-gray-700 flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    Home
                  </a>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mx-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  <a href="#" className="text-gray-500 hover:text-gray-700">Settings</a>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mx-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  <span className="text-indigo-600 font-medium">Account</span>
                </nav>
              </div>
            </div>

            {/* Example 3: Breadcrumb with Background */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-4 border-b bg-gray-50">
                <h3 className="font-semibold text-gray-700">Breadcrumb with Background</h3>
              </div>
              <div className="p-6">
                <nav className="flex items-center text-sm bg-gray-100 rounded-lg px-4 py-2 w-fit">
                  <a href="#" className="text-gray-600 hover:text-gray-900 px-2 py-1 rounded hover:bg-gray-200">Home</a>
                  <span className="text-gray-400">›</span>
                  <a href="#" className="text-gray-600 hover:text-gray-900 px-2 py-1 rounded hover:bg-gray-200">Library</a>
                  <span className="text-gray-400">›</span>
                  <span className="text-gray-900 font-medium px-2 py-1 bg-white rounded shadow-sm">Data</span>
                </nav>
              </div>
            </div>
          </div>
        )}

        {/* Hero Section */}
        {activeTab === "hero" && (
          <div className="space-y-8">
            <h2 className="text-xl font-bold text-gray-800">Hero Section Examples</h2>

            {/* Example 1: Centered Hero */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-4 border-b bg-gray-50">
                <h3 className="font-semibold text-gray-700">Centered Hero</h3>
              </div>
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 py-20 px-4">
                <div className="max-w-3xl mx-auto text-center">
                  <h1 className="text-4xl font-bold text-white mb-4">Build Amazing Products</h1>
                  <p className="text-lg text-white/80 mb-8">Create stunning websites with our powerful platform. No coding required.</p>
                  <div className="flex justify-center gap-4">
                    <button className="px-6 py-3 bg-white text-indigo-600 rounded-lg font-semibold hover:bg-gray-100">Get Started</button>
                    <button className="px-6 py-3 bg-white/20 text-white rounded-lg font-semibold hover:bg-white/30 border border-white/30">Learn More</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Example 2: Split Hero */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-4 border-b bg-gray-50">
                <h3 className="font-semibold text-gray-700">Split Hero with Image</h3>
              </div>
              <div className="bg-gray-900 py-16 px-4">
                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
                  <div>
                    <span className="text-indigo-400 font-medium">Introducing 2.0</span>
                    <h1 className="text-4xl font-bold text-white mt-2 mb-4">The Future of Development</h1>
                    <p className="text-gray-400 mb-8">Experience the next generation of tools designed to help you build faster and smarter.</p>
                    <div className="flex gap-4">
                      <button className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700">Start Free Trial</button>
                      <button className="px-6 py-3 text-white rounded-lg font-semibold hover:bg-white/10 flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Watch Demo
                      </button>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl h-64 flex items-center justify-center">
                    <span className="text-white/50 text-lg">Image Placeholder</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Example 3: Hero with Stats */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-4 border-b bg-gray-50">
                <h3 className="font-semibold text-gray-700">Hero with Stats</h3>
              </div>
              <div className="bg-white py-16 px-4">
                <div className="max-w-6xl mx-auto">
                  <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Trusted by Thousands</h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">Join the community of developers and businesses using our platform.</p>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {[
                      { value: "10K+", label: "Active Users" },
                      { value: "500+", label: "Companies" },
                      { value: "99.9%", label: "Uptime" },
                      { value: "24/7", label: "Support" },
                    ].map((stat, i) => (
                      <div key={i} className="text-center">
                        <div className="text-3xl font-bold text-indigo-600">{stat.value}</div>
                        <div className="text-gray-600">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Cards Grid */}
        {activeTab === "cardsgrid" && (
          <div className="space-y-8">
            <h2 className="text-xl font-bold text-gray-800">Cards Grid Layout Examples</h2>

            {/* Example 1: Product Grid */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-4 border-b bg-gray-50">
                <h3 className="font-semibold text-gray-700">Product Cards Grid</h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    { name: "Product 1", price: "$99", color: "from-pink-500 to-rose-500" },
                    { name: "Product 2", price: "$149", color: "from-blue-500 to-cyan-500" },
                    { name: "Product 3", price: "$79", color: "from-green-500 to-emerald-500" },
                    { name: "Product 4", price: "$199", color: "from-purple-500 to-indigo-500" },
                  ].map((product, i) => (
                    <div key={i} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                      <div className={`h-40 bg-gradient-to-br ${product.color}`}></div>
                      <div className="p-4">
                        <h4 className="font-semibold text-gray-900">{product.name}</h4>
                        <p className="text-gray-600">{product.price}</p>
                        <button className="mt-3 w-full py-2 bg-gray-900 text-white rounded-lg text-sm hover:bg-gray-800">Add to Cart</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Example 2: Feature Grid */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-4 border-b bg-gray-50">
                <h3 className="font-semibold text-gray-700">Feature Cards Grid</h3>
              </div>
              <div className="p-6 bg-gray-50">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { icon: "M13 10V3L4 14h7v7l9-11h-7z", title: "Lightning Fast", desc: "Optimized for speed and performance" },
                    { icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z", title: "Secure", desc: "Enterprise-grade security built-in" },
                    { icon: "M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z", title: "Flexible", desc: "Customize to fit your needs" },
                  ].map((feature, i) => (
                    <div key={i} className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
                      <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={feature.icon} />
                        </svg>
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-2">{feature.title}</h4>
                      <p className="text-gray-600 text-sm">{feature.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Example 3: Team Grid */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-4 border-b bg-gray-50">
                <h3 className="font-semibold text-gray-700">Team Cards Grid</h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    { name: "Alice Johnson", role: "CEO", color: "from-pink-400 to-rose-400" },
                    { name: "Bob Smith", role: "CTO", color: "from-blue-400 to-cyan-400" },
                    { name: "Carol Davis", role: "Designer", color: "from-purple-400 to-indigo-400" },
                    { name: "Dan Wilson", role: "Developer", color: "from-green-400 to-emerald-400" },
                  ].map((person, i) => (
                    <div key={i} className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition-shadow">
                      <div className={`w-20 h-20 mx-auto rounded-full bg-gradient-to-br ${person.color} mb-4`}></div>
                      <h4 className="font-semibold text-gray-900">{person.name}</h4>
                      <p className="text-gray-600 text-sm">{person.role}</p>
                      <div className="flex justify-center gap-3 mt-4">
                        <a href="#" className="text-gray-400 hover:text-gray-600">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                        </a>
                        <a href="#" className="text-gray-400 hover:text-gray-600">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Data Table */}
        {activeTab === "datatable" && (
          <div className="space-y-8">
            <h2 className="text-xl font-bold text-gray-800">Data Table Examples</h2>

            {/* Example 1: Simple Table */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-4 border-b bg-gray-50">
                <h3 className="font-semibold text-gray-700">Simple Data Table</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {[
                      { name: "John Doe", email: "john@example.com", status: "Active", role: "Admin" },
                      { name: "Jane Smith", email: "jane@example.com", status: "Active", role: "User" },
                      { name: "Bob Johnson", email: "bob@example.com", status: "Inactive", role: "User" },
                    ].map((row, i) => (
                      <tr key={i} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{row.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{row.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs rounded-full ${row.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                            {row.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{row.role}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Example 2: Table with Actions */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-4 border-b bg-gray-50 flex items-center justify-between">
                <h3 className="font-semibold text-gray-700">Table with Search & Actions</h3>
                <div className="flex items-center gap-3">
                  <input type="text" placeholder="Search..." className="px-3 py-1.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                  <button className="px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700">Add New</button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left">
                        <input type="checkbox" className="rounded" />
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {[
                      { product: "Laptop Pro", category: "Electronics", price: "$1,299", stock: 45 },
                      { product: "Wireless Mouse", category: "Accessories", price: "$49", stock: 120 },
                      { product: "USB-C Hub", category: "Accessories", price: "$79", stock: 8 },
                    ].map((row, i) => (
                      <tr key={i} className="hover:bg-gray-50">
                        <td className="px-6 py-4"><input type="checkbox" className="rounded" /></td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{row.product}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{row.category}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">{row.price}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`text-sm ${row.stock < 10 ? 'text-red-600' : 'text-gray-600'}`}>{row.stock} units</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <button className="text-indigo-600 hover:text-indigo-900 mr-3">Edit</button>
                          <button className="text-red-600 hover:text-red-900">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="px-6 py-4 bg-gray-50 border-t flex items-center justify-between">
                <p className="text-sm text-gray-600">Showing 1 to 3 of 12 results</p>
                <div className="flex gap-2">
                  <button className="px-3 py-1 border rounded text-sm hover:bg-gray-100">Previous</button>
                  <button className="px-3 py-1 bg-indigo-600 text-white rounded text-sm">1</button>
                  <button className="px-3 py-1 border rounded text-sm hover:bg-gray-100">2</button>
                  <button className="px-3 py-1 border rounded text-sm hover:bg-gray-100">3</button>
                  <button className="px-3 py-1 border rounded text-sm hover:bg-gray-100">Next</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal/Popup */}
        {activeTab === "modal" && (
          <div className="space-y-8">
            <h2 className="text-xl font-bold text-gray-800">Modal/Popup Examples</h2>

            {/* Trigger Buttons */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-4 border-b bg-gray-50">
                <h3 className="font-semibold text-gray-700">Modal Examples</h3>
              </div>
              <div className="p-6 space-y-4">
                <p className="text-gray-600 mb-4">Click the button below to see a modal example:</p>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  Open Modal
                </button>
              </div>
            </div>

            {/* Static Modal Previews */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-4 border-b bg-gray-50">
                <h3 className="font-semibold text-gray-700">Modal Style Previews (Static)</h3>
              </div>
              <div className="p-6 space-y-6">
                {/* Simple Modal */}
                <div className="border rounded-xl overflow-hidden">
                  <div className="p-4 bg-gray-50 text-sm font-medium text-gray-600">Simple Confirmation Modal</div>
                  <div className="p-6 bg-gray-900/50">
                    <div className="bg-white rounded-xl shadow-2xl max-w-md mx-auto">
                      <div className="p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Confirm Action</h3>
                        <p className="text-gray-600 mb-6">Are you sure you want to proceed? This action cannot be undone.</p>
                        <div className="flex justify-end gap-3">
                          <button className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">Cancel</button>
                          <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">Delete</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Form Modal */}
                <div className="border rounded-xl overflow-hidden">
                  <div className="p-4 bg-gray-50 text-sm font-medium text-gray-600">Form Modal</div>
                  <div className="p-6 bg-gray-900/50">
                    <div className="bg-white rounded-xl shadow-2xl max-w-md mx-auto">
                      <div className="p-6 border-b">
                        <h3 className="text-lg font-semibold text-gray-900">Create Account</h3>
                      </div>
                      <div className="p-6 space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                          <input type="email" className="w-full px-3 py-2 border rounded-lg" placeholder="you@example.com" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                          <input type="password" className="w-full px-3 py-2 border rounded-lg" placeholder="••••••••" />
                        </div>
                      </div>
                      <div className="p-6 border-t bg-gray-50 flex justify-end gap-3">
                        <button className="px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-lg">Cancel</button>
                        <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">Create</button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Success Modal */}
                <div className="border rounded-xl overflow-hidden">
                  <div className="p-4 bg-gray-50 text-sm font-medium text-gray-600">Success Modal</div>
                  <div className="p-6 bg-gray-900/50">
                    <div className="bg-white rounded-xl shadow-2xl max-w-sm mx-auto text-center">
                      <div className="p-8">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Success!</h3>
                        <p className="text-gray-600 mb-6">Your action has been completed successfully.</p>
                        <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">Continue</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setIsModalOpen(false)}></div>
          <div className="relative bg-white rounded-xl shadow-2xl max-w-md w-full mx-4 animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Modal Title</h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1 hover:bg-gray-100 rounded">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6">
              <p className="text-gray-600">This is a live modal example. You can add any content here including forms, images, or other components.</p>
            </div>
            <div className="p-6 border-t bg-gray-50 flex justify-end gap-3 rounded-b-xl">
              <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-lg">Cancel</button>
              <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">Confirm</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
