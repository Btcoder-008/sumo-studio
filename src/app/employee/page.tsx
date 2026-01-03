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

const employeeModules = [
  {
    id: "attendance",
    label: "Attendance",
    icon: "👔",
    description: "Track employee attendance and working hours",
    href: "/employee/attendance",
    color: "bg-blue-500",
  },
  {
    id: "payroll",
    label: "Payroll",
    icon: "💰",
    description: "Manage employee salaries and payments",
    href: "/employee/payroll",
    color: "bg-green-500",
  },
  {
    id: "performance",
    label: "Performance",
    icon: "📊",
    description: "View employee performance reports",
    href: "/employee/performance",
    color: "bg-purple-500",
  },
  {
    id: "tasks",
    label: "Tasks",
    icon: "✓",
    description: "View and manage all tasks and assignments",
    href: "/employee/tasks",
    color: "bg-orange-500",
  },
];

export default function Employee() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-pink-50 overflow-hidden">
      {floatingIcons.map((item, index) => (
        <FloatingIcon key={index} icon={item.icon} style={{ top: item.top, left: item.left, right: item.right, bottom: item.bottom, animationDelay: item.delay, animationDuration: item.duration } as React.CSSProperties} />
      ))}

      <div className="absolute top-0 left-0 w-96 h-96 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-orange-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: "1s" }} />
      <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: "2s" }} />

      <MobileLayout title="Employee Management" backLink="/dashboard" navItems={navItems}>
        <div className="p-4 md:p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {employeeModules.map((module) => (
              <Link key={module.id} href={module.href}>
                <div className="group relative bg-white/70 backdrop-blur-lg rounded-2xl shadow-lg p-8 border border-white/30 cursor-pointer hover:shadow-2xl hover:scale-105 transition-all duration-300">
                  {/* Background gradient circle */}
                  <div className={`absolute inset-0 ${module.color} rounded-2xl opacity-10 group-hover:opacity-20 transition-opacity`} />

                  {/* Icon container */}
                  <div className={`relative ${module.color} w-16 h-16 rounded-xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <span className="text-4xl">{module.icon}</span>
                  </div>

                  {/* Content */}
                  <div className="relative">
                    <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2 group-hover:text-gray-900 transition-colors">
                      {module.label}
                    </h3>
                    <p className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors">
                      {module.description}
                    </p>
                  </div>

                  {/* Hover arrow */}
                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-2xl text-gray-400 group-hover:text-gray-600">→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </MobileLayout>
    </div>
  );
}
