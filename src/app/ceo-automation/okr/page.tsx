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

interface OKRForm {
  objective: string;
  keyResult1: string;
  keyResult2: string;
  keyResult3: string;
}

export default function OKR() {
  const [formData, setFormData] = useState<OKRForm>({
    objective: "",
    keyResult1: "",
    keyResult2: "",
    keyResult3: "",
  });

  const [savedOKR, setSavedOKR] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("ceoAutomation_okr_form");
    const savedSummary = localStorage.getItem("ceoAutomation_okr_summary");

    if (saved) {
      setFormData(JSON.parse(saved));
    }
    if (savedSummary) {
      setSavedOKR(savedSummary);
      setIsSubmitted(true);
    }
  }, []);

  const handleInputChange = (field: keyof OKRForm, value: string) => {
    const updated = { ...formData, [field]: value };
    setFormData(updated);
    localStorage.setItem("ceoAutomation_okr_form", JSON.stringify(updated));
  };

  const handleSubmit = () => {
    const summary = `
OBJECTIVE:
${formData.objective}

KEY RESULTS:
1. ${formData.keyResult1}
2. ${formData.keyResult2}
3. ${formData.keyResult3}
    `.trim();

    setSavedOKR(summary);
    localStorage.setItem("ceoAutomation_okr_summary", summary);
    setIsSubmitted(true);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 overflow-hidden">
      {floatingIcons.map((item, index) => (
        <FloatingIcon key={index} icon={item.icon} style={{ top: item.top, left: item.left, right: item.right, bottom: item.bottom, animationDelay: item.delay, animationDuration: item.duration } as React.CSSProperties} />
      ))}

      <div className="absolute top-0 left-0 w-96 h-96 bg-orange-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-amber-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: "1s" }} />
      <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: "2s" }} />

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
              <Link href="/ceo-automation" className="text-orange-400 hover:text-orange-500 transition-colors text-2xl cursor-pointer">
                ←
              </Link>
              <h2 className="text-3xl font-bold text-gray-800">OKR (Objectives & Key Results) 🎯</h2>
            </div>
          </header>

          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column - Form */}
              <div className="lg:col-span-2">
                <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl p-8 border border-white/30">
                  <h3 className="text-2xl font-bold text-orange-800 mb-8">Set Your OKR</h3>

                  <div className="space-y-8">
                    {/* Objective */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Objective
                      </label>
                      <textarea
                        value={formData.objective}
                        onChange={(e) => handleInputChange("objective", e.target.value)}
                        placeholder="What do we want to achieve? (Inspirational, qualitative)"
                        className="w-full px-4 py-3 border-2 border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white/50"
                        rows={4}
                      />
                      <p className="text-xs text-gray-500 mt-2">Inspirational and qualitative goal</p>
                    </div>

                    {/* Key Results */}
                    <div className="border-t border-orange-200 pt-8">
                      <h4 className="text-lg font-bold text-orange-800 mb-6">Key Results</h4>

                      {[1, 2, 3].map((index) => (
                        <div key={index} className="mb-6">
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Key Result {index}
                          </label>
                          <textarea
                            value={formData[`keyResult${index}` as keyof OKRForm]}
                            onChange={(e) =>
                              handleInputChange(`keyResult${index}` as keyof OKRForm, e.target.value)
                            }
                            placeholder={`Measurable outcome for KR ${index} (quantitative)`}
                            className="w-full px-4 py-2 border-2 border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white/50"
                            rows={2}
                          />
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={handleSubmit}
                      className="w-full px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold rounded-lg hover:shadow-lg transition-all"
                    >
                      Save OKR
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Column - Summary */}
              <div>
                {isSubmitted && (
                  <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-white/30 sticky top-8">
                    <h4 className="text-lg font-bold text-orange-800 mb-4">OKR Summary</h4>
                    <p className="text-sm text-gray-700 whitespace-pre-line">{savedOKR}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
