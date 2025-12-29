"use client";

import Link from "next/link";
import Image from "next/image";

// Floating icon component
function FloatingIcon({ icon, style }: { icon: string; style: React.CSSProperties }) {
  return (
    <div
      className="absolute text-3xl md:text-4xl opacity-20 animate-float pointer-events-none"
      style={style}
    >
      {icon}
    </div>
  );
}

// Floating icons for background
const floatingIcons = [
  { icon: "📝", top: "10%", left: "5%", delay: "0s", duration: "7s" },
  { icon: "📋", top: "20%", right: "8%", delay: "1s", duration: "6s" },
  { icon: "🎯", top: "60%", left: "3%", delay: "2s", duration: "8s" },
  { icon: "⚡", bottom: "20%", right: "5%", delay: "0.5s", duration: "7s" },
  { icon: "🔧", top: "40%", right: "3%", delay: "1.5s", duration: "5s" },
  { icon: "📈", bottom: "30%", left: "8%", delay: "3s", duration: "6s" },
];

// All page types available in the project
const allPageTypes = [
  { id: "accounts-page", label: "Accounts Page", icon: "💰" },
  { id: "admin-page", label: "Admin Page", icon: "⚙️" },
  { id: "blog-page", label: "Blog Page", icon: "📝" },
  { id: "contact-page", label: "Contact Page", icon: "📞" },
  { id: "customer-page", label: "Customer Page", icon: "👥" },
  { id: "dashboard-page", label: "Dashboard Page", icon: "📊" },
  { id: "e-commerce-page", label: "E-Commerce Page", icon: "🛒" },
  { id: "employee-page", label: "Employee Page", icon: "👔" },
  { id: "error-page", label: "Error Page", icon: "❌" },
  { id: "form-page", label: "Form Page", icon: "📋" },
  { id: "gallery-page", label: "Gallery Page", icon: "🖼️" },
  { id: "inventory-page", label: "Inventory Page", icon: "📦" },
  { id: "landing-page", label: "Landing Page", icon: "🏠" },
  { id: "login-page", label: "Login Page", icon: "🔐" },
  { id: "portfolio-page", label: "Portfolio Page", icon: "💼" },
  { id: "reports-dashboard", label: "Reports Dashboard", icon: "📈" },
  { id: "service-page", label: "Service Page", icon: "🛠️" },
  { id: "settings-page", label: "Settings Page", icon: "🔧" },
];

export default function ScriptStudio() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-pink-50 overflow-hidden">
      {/* Animated background elements */}
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
              href="/dashboard"
              className="px-4 py-2 text-gray-700 font-medium rounded-lg hover:bg-yellow-100 hover:text-yellow-700 transition-all"
            >
              Dashboard
            </Link>
            <Link
              href="/sumo-studio"
              className="px-4 py-2 text-gray-700 font-medium rounded-lg hover:bg-yellow-100 hover:text-yellow-700 transition-all"
            >
              Sumo Studio
            </Link>
            <Link
              href="/frontend-studio"
              className="px-4 py-2 text-gray-700 font-medium rounded-lg hover:bg-yellow-100 hover:text-yellow-700 transition-all"
            >
              Frontend Studio
            </Link>
            <Link
              href="/backend-studio"
              className="px-4 py-2 text-gray-700 font-medium rounded-lg hover:bg-yellow-100 hover:text-yellow-700 transition-all"
            >
              Backend Studio
            </Link>
            <Link
              href="/script-studio"
              className="px-4 py-2 bg-yellow-100 text-yellow-700 font-medium rounded-lg transition-all"
            >
              Script Studio
            </Link>
          </nav>
        </div>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-gray-800">
            Script Studio
          </h2>
        </div>

        {/* All Page Types List - 3 Columns */}
        <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/30 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-3">
            {allPageTypes.map((pageType) => (
              <Link
                key={pageType.id}
                href={`/script-studio/${pageType.id}`}
                className="flex items-center justify-between px-6 py-4 hover:bg-green-50 transition-all duration-200 cursor-pointer border-b border-r border-gray-200 last:border-b-0 md:[&:nth-child(3n)]:border-r-0 md:[&:nth-last-child(-n+3)]:border-b-0"
              >
                <div className="flex items-center gap-4">
                  <span className="text-2xl">{pageType.icon}</span>
                  <span className="text-lg font-medium text-gray-800">
                    {pageType.label}
                  </span>
                </div>
                <span className="text-green-500 text-xl">→</span>
              </Link>
            ))}
          </div>
        </div>

      </main>
    </div>
  );
}
