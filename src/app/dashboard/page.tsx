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
  { icon: "💻", top: "10%", left: "5%", delay: "0s", duration: "7s" },
  { icon: "🚀", top: "20%", right: "8%", delay: "1s", duration: "6s" },
  { icon: "⚡", top: "60%", left: "3%", delay: "2s", duration: "8s" },
  { icon: "🎯", bottom: "20%", right: "5%", delay: "0.5s", duration: "7s" },
  { icon: "✨", top: "40%", right: "3%", delay: "1.5s", duration: "5s" },
  { icon: "🔮", bottom: "30%", left: "8%", delay: "3s", duration: "6s" },
];

// Dashboard cards
const dashboardCards = [
  { id: "sumo-studio", label: "Sumo Studio", icon: "🏛️", href: "/sumo-studio", color: "yellow" },
  { id: "super-coder", label: "Super Coder", icon: "💻", href: "/super-coder", color: "blue" },
  { id: "master", label: "Master", icon: "👑", href: "/master", color: "purple" },
  { id: "services", label: "Services", icon: "⚡", href: "/services", color: "orange" },
  { id: "employee", label: "Employee", icon: "👤", href: "/employee", color: "green" },
  { id: "accounts", label: "Accounts", icon: "💰", href: "/accounts", color: "pink" },
  { id: "reports", label: "Reports", icon: "📊", href: "/reports", color: "indigo" },
  { id: "settings", label: "Settings", icon: "⚙️", href: "/settings", color: "gray" },
];

// Navigation items
const navItems = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Services", href: "/services" },
  { label: "Employee", href: "/employee" },
  { label: "Accounts", href: "/accounts" },
  { label: "Reports", href: "/reports" },
  { label: "Settings", href: "/settings" },
];

export default function Dashboard() {
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

      <div className="relative z-10 flex min-h-screen">
        {/* Left Sidebar Navigation */}
        <aside className="w-64 bg-white/80 backdrop-blur-md shadow-lg border-r border-white/20 flex flex-col">
          {/* Logo and Title */}
          <div className="p-6 border-b border-white/20">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/super-sumo.png"
                alt="Super Sumo"
                width={60}
                height={60}
                className="cursor-pointer hover:scale-105 transition-transform drop-shadow-lg"
              />
              <div>
                <h1 className="text-xl font-bold text-gray-800">Super Sumo</h1>
                <p className="text-xs text-gray-500">Build with Sumo</p>
              </div>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 p-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block px-4 py-3 text-gray-700 font-medium rounded-lg hover:bg-yellow-100 hover:text-yellow-700 transition-all"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-white/20 text-xs text-gray-500 text-center">
            <p>© 2025 Super Sumo</p>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto">
          {/* Header */}
          <header className="bg-white/80 backdrop-blur-md shadow-lg border-b border-white/20 p-6">
            <h2 className="text-3xl font-bold text-gray-800">Welcome to Super Sumo</h2>
          </header>

          {/* Content */}
          <div className="p-8 flex items-center justify-center min-h-[calc(100vh-150px)]">
            <div className="text-center">
              <div className="text-8xl mb-6">📊</div>
              <h2 className="text-4xl font-bold text-gray-800 mb-4">Welcome</h2>
              <p className="text-gray-500 text-lg">Coming Soon</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
