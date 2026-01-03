"use client";

import Link from "next/link";
import { MobileLayout } from "@/app/components/MobileLayout";

function FloatingIcon({ icon, style }: { icon: string; style: React.CSSProperties }) {
  return (
    <div className="absolute text-3xl md:text-4xl opacity-20 animate-float pointer-events-none" style={style}>
      {icon}
    </div>
  );
}

const floatingIcons = [
  { icon: "💻", top: "10%", left: "5%", delay: "0s", duration: "7s" },
  { icon: "🚀", top: "20%", right: "8%", delay: "1s", duration: "6s" },
  { icon: "⚡", top: "60%", left: "3%", delay: "2s", duration: "8s" },
  { icon: "🎯", bottom: "20%", right: "5%", delay: "0.5s", duration: "7s" },
  { icon: "✨", top: "40%", right: "3%", delay: "1.5s", duration: "5s" },
  { icon: "🔮", bottom: "30%", left: "8%", delay: "3s", duration: "6s" },
];

const navItems = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "CEO Automation", href: "/ceo-automation" },
  { label: "Services", href: "/services" },
  { label: "Employee", href: "/employee" },
  { label: "Accounts", href: "/accounts" },
  { label: "Reports", href: "/reports" },
  { label: "Settings", href: "/settings" },
];

// Settings cards
const settingsCards = [
  { id: "master", label: "Master", icon: "👑", href: "/master", color: "purple" },
  { id: "configuration", label: "Configuration", icon: "⚙️", href: "/configuration", color: "gray" },
];

export default function Settings() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-pink-50 overflow-hidden">
      {floatingIcons.map((item, index) => (
        <FloatingIcon key={index} icon={item.icon} style={{ top: item.top, left: item.left, right: item.right, bottom: item.bottom, animationDelay: item.delay, animationDuration: item.duration } as React.CSSProperties} />
      ))}

      <div className="absolute top-0 left-0 w-96 h-96 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-orange-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: "1s" }} />
      <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: "2s" }} />

      <MobileLayout title="Settings" backLink="/dashboard" navItems={navItems}>
        <div className="p-4 md:p-8">
          {/* Settings Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
            {settingsCards.map((card) => (
              <Link
                key={card.id}
                href={card.href}
                className="group"
              >
                <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/30 hover:shadow-yellow-200/50 transition-all duration-300 h-full flex flex-col items-center justify-center text-center hover:scale-105 cursor-pointer">
                  <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {card.icon}
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 group-hover:text-yellow-700 transition-colors">
                    {card.label}
                  </h3>
                  <p className="text-xs text-gray-500 mt-2">Open Now</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </MobileLayout>
    </div>
  );
}
