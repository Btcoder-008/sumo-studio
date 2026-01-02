"use client";

import Link from "next/link";
import Image from "next/image";

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

const ceoAutomationCards = [
  { id: "vision", label: "Vision", icon: "🔭", href: "/ceo-automation/vision", color: "blue" },
  { id: "swot", label: "SWOT", icon: "📊", href: "/ceo-automation/swot", color: "purple" },
  { id: "okr", label: "OKR", icon: "🎯", href: "/ceo-automation/okr", color: "green" },
  { id: "kpi", label: "KPI", icon: "📈", href: "/ceo-automation/kpi", color: "orange" },
  { id: "4dx", label: "4DX", icon: "🔄", href: "/ceo-automation/4dx", color: "red" },
  { id: "lean", label: "Lean Management", icon: "⚙️", href: "/ceo-automation/lean", color: "indigo" },
];

export default function CEOAutomation() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-pink-50 overflow-hidden">
      {floatingIcons.map((item, index) => (
        <FloatingIcon key={index} icon={item.icon} style={{ top: item.top, left: item.left, right: item.right, bottom: item.bottom, animationDelay: item.delay, animationDuration: item.duration } as React.CSSProperties} />
      ))}

      <div className="absolute top-0 left-0 w-96 h-96 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-orange-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: "1s" }} />
      <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: "2s" }} />

      <div className="relative z-10 flex min-h-screen">
        <aside className="w-64 bg-white/80 backdrop-blur-md shadow-lg border-r border-white/20 flex flex-col">
          <div className="p-6 border-b border-white/20">
            <Link href="/" className="flex items-center gap-3">
              <Image src="/super-sumo.png" alt="Super Sumo" width={60} height={60} className="cursor-pointer hover:scale-105 transition-transform drop-shadow-lg" />
              <div>
                <h1 className="text-xl font-bold text-gray-800">Super Sumo</h1>
                <p className="text-xs text-gray-500">Build with Sumo</p>
              </div>
            </Link>
          </div>
          <nav className="flex-1 p-4 space-y-2">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="block px-4 py-3 text-gray-700 font-medium rounded-lg hover:bg-yellow-100 hover:text-yellow-700 transition-all">
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="p-4 border-t border-white/20 text-xs text-gray-500 text-center">
            <p>© 2025 Super Sumo</p>
          </div>
        </aside>

        <main className="flex-1 overflow-auto">
          <header className="bg-white/80 backdrop-blur-md shadow-lg border-b border-white/20 p-6">
            <div className="flex items-center gap-4">
              <Link href="/dashboard" className="text-yellow-400 hover:text-yellow-500 transition-colors text-2xl cursor-pointer">
                ←
              </Link>
              <h2 className="text-3xl font-bold text-gray-800">CEO Automation</h2>
            </div>
          </header>
          <div className="p-8">
            {/* CEO Automation Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ceoAutomationCards.map((card) => (
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
                    <p className="text-xs text-gray-500 mt-2">with Reports</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
