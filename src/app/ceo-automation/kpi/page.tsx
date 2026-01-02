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

interface KPIForm {
  leadingKPI: string;
  laggingKPI: string;
  financialKPI: string;
  operationalKPI: string;
}

export default function KPI() {
  const [formData, setFormData] = useState<KPIForm>({
    leadingKPI: "",
    laggingKPI: "",
    financialKPI: "",
    operationalKPI: "",
  });

  const [savedKPI, setSavedKPI] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("ceoAutomation_kpi_form");
    const savedSummary = localStorage.getItem("ceoAutomation_kpi_summary");

    if (saved) {
      setFormData(JSON.parse(saved));
    }
    if (savedSummary) {
      setSavedKPI(savedSummary);
      setIsSubmitted(true);
    }
  }, []);

  const handleInputChange = (field: keyof KPIForm, value: string) => {
    const updated = { ...formData, [field]: value };
    setFormData(updated);
    localStorage.setItem("ceoAutomation_kpi_form", JSON.stringify(updated));
  };

  const handleSubmit = () => {
    const summary = `
LEADING KPI:
${formData.leadingKPI}

LAGGING KPI:
${formData.laggingKPI}

FINANCIAL KPI:
${formData.financialKPI}

OPERATIONAL KPI:
${formData.operationalKPI}
    `.trim();

    setSavedKPI(summary);
    localStorage.setItem("ceoAutomation_kpi_summary", summary);
    setIsSubmitted(true);
  };

  const kpiQuadrants = [
    {
      key: "leadingKPI" as const,
      label: "Leading KPI",
      icon: "📈",
      description: "Predictive indicators of future performance",
      bgColor: "bg-red-50",
      borderColor: "border-red-300",
      textColor: "text-red-800",
    },
    {
      key: "laggingKPI" as const,
      label: "Lagging KPI",
      icon: "📊",
      description: "Results of past activities",
      bgColor: "bg-rose-50",
      borderColor: "border-rose-300",
      textColor: "text-rose-800",
    },
    {
      key: "financialKPI" as const,
      label: "Financial KPI",
      icon: "💰",
      description: "Revenue, profit, margins, and financial health",
      bgColor: "bg-pink-50",
      borderColor: "border-pink-300",
      textColor: "text-pink-800",
    },
    {
      key: "operationalKPI" as const,
      label: "Operational KPI",
      icon: "⚙️",
      description: "Efficiency, productivity, and process metrics",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-300",
      textColor: "text-orange-800",
    },
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-red-50 via-rose-50 to-pink-50 overflow-hidden">
      {floatingIcons.map((item, index) => (
        <FloatingIcon key={index} icon={item.icon} style={{ top: item.top, left: item.left, right: item.right, bottom: item.bottom, animationDelay: item.delay, animationDuration: item.duration } as React.CSSProperties} />
      ))}

      <div className="absolute top-0 left-0 w-96 h-96 bg-red-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-rose-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: "1s" }} />
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
              <Link href="/ceo-automation" className="text-red-400 hover:text-red-500 transition-colors text-2xl cursor-pointer">
                ←
              </Link>
              <h2 className="text-3xl font-bold text-gray-800">KPI (Key Performance Indicators) 📈</h2>
            </div>
          </header>

          <div className="p-8">
            {/* KPI Grid */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">KPI Categories</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {kpiQuadrants.map((quadrant) => (
                  <div
                    key={quadrant.key}
                    className={`${quadrant.bgColor} border-2 ${quadrant.borderColor} rounded-2xl p-6 shadow-lg`}
                  >
                    <h4 className={`text-xl font-bold ${quadrant.textColor} mb-2 flex items-center gap-2`}>
                      <span>{quadrant.icon}</span>
                      {quadrant.label}
                    </h4>
                    <p className="text-xs text-gray-600 mb-4">{quadrant.description}</p>
                    <textarea
                      value={formData[quadrant.key]}
                      onChange={(e) => handleInputChange(quadrant.key, e.target.value)}
                      placeholder={`Enter ${quadrant.label.toLowerCase()}...`}
                      className={`w-full px-4 py-3 border-2 ${quadrant.borderColor} rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 bg-white/50 backdrop-blur text-gray-700`}
                      rows={5}
                    />
                  </div>
                ))}
              </div>

              {/* Submit Button */}
              <div className="flex justify-center mb-8">
                <button
                  onClick={handleSubmit}
                  className="px-8 py-3 bg-gradient-to-r from-red-500 to-rose-500 text-white font-semibold rounded-lg hover:shadow-lg transition-all"
                >
                  Save KPI
                </button>
              </div>

              {/* Summary */}
              {isSubmitted && (
                <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl p-8 border border-white/30">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">KPI Summary</h3>
                  <p className="text-sm text-gray-700 whitespace-pre-line">{savedKPI}</p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
