"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

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

interface LeanForm {
  value: string;
  valueStream: string;
  flow: string;
  pull: string;
  perfection: string;
}

export default function Lean() {
  const [formData, setFormData] = useState<LeanForm>({
    value: "",
    valueStream: "",
    flow: "",
    pull: "",
    perfection: "",
  });

  const [savedLean, setSavedLean] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("ceoAutomation_lean_form");
    const savedSummary = localStorage.getItem("ceoAutomation_lean_summary");

    if (saved) {
      setFormData(JSON.parse(saved));
    }
    if (savedSummary) {
      setSavedLean(savedSummary);
      setIsSubmitted(true);
    }
  }, []);

  const handleInputChange = (field: keyof LeanForm, value: string) => {
    const updated = { ...formData, [field]: value };
    setFormData(updated);
    localStorage.setItem("ceoAutomation_lean_form", JSON.stringify(updated));
  };

  const handleSubmit = () => {
    const summary = `
PRINCIPLE 1: DEFINE VALUE
${formData.value}

PRINCIPLE 2: MAP VALUE STREAM
${formData.valueStream}

PRINCIPLE 3: CREATE FLOW
${formData.flow}

PRINCIPLE 4: ESTABLISH PULL
${formData.pull}

PRINCIPLE 5: PURSUE PERFECTION
${formData.perfection}
    `.trim();

    setSavedLean(summary);
    localStorage.setItem("ceoAutomation_lean_summary", summary);
    setIsSubmitted(true);
  };

  const principles = [
    {
      key: "value" as const,
      number: "1",
      title: "Define Value",
      icon: "💎",
      description: "Understand what customers value",
      bgColor: "bg-pink-50",
      borderColor: "border-pink-300",
      textColor: "text-pink-800",
    },
    {
      key: "valueStream" as const,
      number: "2",
      title: "Map Value Stream",
      icon: "🗺️",
      description: "Identify all steps in the process",
      bgColor: "bg-fuchsia-50",
      borderColor: "border-fuchsia-300",
      textColor: "text-fuchsia-800",
    },
    {
      key: "flow" as const,
      number: "3",
      title: "Create Flow",
      icon: "💧",
      description: "Eliminate waste and ensure smooth flow",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-300",
      textColor: "text-purple-800",
    },
    {
      key: "pull" as const,
      number: "4",
      title: "Establish Pull",
      icon: "🎣",
      description: "Let demand pull products and services",
      bgColor: "bg-violet-50",
      borderColor: "border-violet-300",
      textColor: "text-violet-800",
    },
    {
      key: "perfection" as const,
      number: "5",
      title: "Pursue Perfection",
      icon: "⭐",
      description: "Continuous improvement mindset",
      bgColor: "bg-indigo-50",
      borderColor: "border-indigo-300",
      textColor: "text-indigo-800",
    },
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 overflow-hidden">
      {floatingIcons.map((item, index) => (
        <FloatingIcon key={index} icon={item.icon} style={{ top: item.top, left: item.left, right: item.right, bottom: item.bottom, animationDelay: item.delay, animationDuration: item.duration } as React.CSSProperties} />
      ))}

      <div className="absolute top-0 left-0 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: "1s" }} />
      <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: "2s" }} />

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
              <Link href="/ceo-automation" className="text-pink-400 hover:text-pink-500 transition-colors text-2xl cursor-pointer">
                ←
              </Link>
              <h2 className="text-3xl font-bold text-gray-800">Lean Management ⚙️</h2>
            </div>
          </header>

          <div className="p-8">
            <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl p-8 border border-white/30 mb-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-8">The 5 Principles of Lean</h3>

              <div className="space-y-6">
                {principles.map((principle) => (
                  <div
                    key={principle.key}
                    className={`${principle.bgColor} border-2 ${principle.borderColor} rounded-xl p-6`}
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-lg bg-white border-2 border-inherit">
                        <span className="text-2xl">{principle.icon}</span>
                      </div>
                      <div>
                        <h4 className={`text-lg font-bold ${principle.textColor}`}>
                          Principle {principle.number}: {principle.title}
                        </h4>
                        <p className="text-xs text-gray-600 mt-1">{principle.description}</p>
                      </div>
                    </div>
                    <textarea
                      value={formData[principle.key]}
                      onChange={(e) => handleInputChange(principle.key, e.target.value)}
                      placeholder={`Enter details for ${principle.title}...`}
                      className={`w-full px-4 py-3 border-2 ${principle.borderColor} rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 bg-white/50 text-gray-700`}
                      rows={4}
                    />
                  </div>
                ))}
              </div>

              <button
                onClick={handleSubmit}
                className="w-full mt-8 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold rounded-lg hover:shadow-lg transition-all"
              >
                Save Lean Management
              </button>
            </div>

            {/* Summary */}
            {isSubmitted && (
              <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl p-8 border border-white/30">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Lean Management Summary</h3>
                <p className="text-sm text-gray-700 whitespace-pre-line">{savedLean}</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
