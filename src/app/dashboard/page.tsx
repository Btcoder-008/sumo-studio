"use client";

import Link from "next/link";
import { MobileLayout } from "@/app/components/MobileLayout";

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
  { label: "CEO Automation", href: "/ceo-automation" },
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

      <MobileLayout title="Welcome to Super Sumo" navItems={navItems}>
        <div className="p-4 md:p-8 flex items-center justify-center min-h-[calc(100vh-150px)]">
          <div className="text-center">
            <div className="text-6xl md:text-8xl mb-4 md:mb-6">📊</div>
            <h2 className="text-2xl md:text-4xl font-bold text-gray-800 mb-2 md:mb-4">Welcome</h2>
            <p className="text-gray-500 text-base md:text-lg">Coming Soon</p>
          </div>
        </div>
      </MobileLayout>
    </div>
  );
}
