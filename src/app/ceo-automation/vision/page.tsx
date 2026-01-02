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

interface GoalMetric {
  id: string;
  target: number;
  current: number;
  unit: string;
}

interface VisionForm {
  purpose: string;
  customerFocus: string;
  innovationAndResponsibility: string;
  fiveYearGoal: string;
  oneYearGoal: string;
}

export default function Vision() {
  const [formData, setFormData] = useState<VisionForm>({
    purpose: "",
    customerFocus: "",
    innovationAndResponsibility: "",
    fiveYearGoal: "",
    oneYearGoal: "",
  });

  const [metrics, setMetrics] = useState<GoalMetric[]>([
    { id: "1", target: 100, current: 25, unit: "%" },
  ]);

  const [newMetric, setNewMetric] = useState({ target: 0, current: 0, unit: "%" });
  const [savedVision, setSavedVision] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("ceoAutomation_vision_form");
    const savedMetricsData = localStorage.getItem("ceoAutomation_vision_metrics");
    const savedSummary = localStorage.getItem("ceoAutomation_vision_summary");

    if (saved) {
      setFormData(JSON.parse(saved));
    }
    if (savedMetricsData) {
      setMetrics(JSON.parse(savedMetricsData));
    }
    if (savedSummary) {
      setSavedVision(savedSummary);
      setIsSubmitted(true);
    }
  }, []);

  const handleInputChange = (field: keyof VisionForm, value: string) => {
    const updated = { ...formData, [field]: value };
    setFormData(updated);
    localStorage.setItem("ceoAutomation_vision_form", JSON.stringify(updated));
  };

  const handleSubmit = () => {
    const summary = `
Purpose: ${formData.purpose}
Customer Focus: ${formData.customerFocus}
Innovation & Responsibility: ${formData.innovationAndResponsibility}
5-Year Goal: ${formData.fiveYearGoal}
1-Year Goal: ${formData.oneYearGoal}
    `.trim();
    setSavedVision(summary);
    localStorage.setItem("ceoAutomation_vision_summary", summary);
    localStorage.setItem("ceoAutomation_vision_metrics", JSON.stringify(metrics));
    setIsSubmitted(true);
  };

  const addMetric = () => {
    if (newMetric.target > 0) {
      const metric: GoalMetric = {
        id: Date.now().toString(),
        ...newMetric,
      };
      const updated = [...metrics, metric];
      setMetrics(updated);
      localStorage.setItem("ceoAutomation_vision_metrics", JSON.stringify(updated));
      setNewMetric({ target: 0, current: 0, unit: "%" });
    }
  };

  const removeMetric = (id: string) => {
    const updated = metrics.filter((m) => m.id !== id);
    setMetrics(updated);
    localStorage.setItem("ceoAutomation_vision_metrics", JSON.stringify(updated));
  };

  const updateMetric = (id: string, field: string, value: number) => {
    const updated = metrics.map((m) =>
      m.id === id ? { ...m, [field]: value } : m
    );
    setMetrics(updated);
    localStorage.setItem("ceoAutomation_vision_metrics", JSON.stringify(updated));
  };

  const calculateProgress = (): number => {
    if (metrics.length === 0) return 0;
    const totalProgress = metrics.reduce((sum, m) => sum + (m.current / m.target) * 100, 0);
    return Math.round(totalProgress / metrics.length);
  };

  const progress = calculateProgress();

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 overflow-hidden">
      {floatingIcons.map((item, index) => (
        <FloatingIcon key={index} icon={item.icon} style={{ top: item.top, left: item.left, right: item.right, bottom: item.bottom, animationDelay: item.delay, animationDuration: item.duration } as React.CSSProperties} />
      ))}

      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: "1s" }} />
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
              <Link href="/ceo-automation" className="text-purple-400 hover:text-purple-500 transition-colors text-2xl cursor-pointer">
                ←
              </Link>
              <h2 className="text-3xl font-bold text-gray-800">Vision 🔭</h2>
            </div>
          </header>

          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column - Form */}
              <div className="lg:col-span-2">
                <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl p-8 border border-white/30">
                  <h3 className="text-2xl font-bold text-purple-800 mb-6">Vision Statement</h3>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Purpose</label>
                      <textarea
                        value={formData.purpose}
                        onChange={(e) => handleInputChange("purpose", e.target.value)}
                        className="w-full px-4 py-2 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                        rows={3}
                        placeholder="What is our core purpose?"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Customer Focus</label>
                      <textarea
                        value={formData.customerFocus}
                        onChange={(e) => handleInputChange("customerFocus", e.target.value)}
                        className="w-full px-4 py-2 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                        rows={3}
                        placeholder="How do we focus on our customers?"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Innovation & Responsibility</label>
                      <textarea
                        value={formData.innovationAndResponsibility}
                        onChange={(e) => handleInputChange("innovationAndResponsibility", e.target.value)}
                        className="w-full px-4 py-2 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                        rows={3}
                        placeholder="What is our innovation and responsibility strategy?"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">5-Year Goal</label>
                      <textarea
                        value={formData.fiveYearGoal}
                        onChange={(e) => handleInputChange("fiveYearGoal", e.target.value)}
                        className="w-full px-4 py-2 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                        rows={3}
                        placeholder="What do we want to achieve in 5 years?"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">1-Year Goal</label>
                      <textarea
                        value={formData.oneYearGoal}
                        onChange={(e) => handleInputChange("oneYearGoal", e.target.value)}
                        className="w-full px-4 py-2 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                        rows={3}
                        placeholder="What do we want to achieve in 1 year?"
                      />
                    </div>

                    <button
                      onClick={handleSubmit}
                      className="w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold rounded-lg hover:shadow-lg transition-all"
                    >
                      Save Vision
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Column - Progress & Summary */}
              <div className="space-y-6">
                {/* Progress Card */}
                <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-white/30">
                  <h4 className="text-lg font-bold text-purple-800 mb-4">Goal Progress</h4>

                  <div className="mb-6">
                    <div className="flex justify-between text-sm font-semibold mb-2">
                      <span>Overall Progress</span>
                      <span className="text-purple-600">{progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-gradient-to-r from-purple-400 to-blue-400 h-3 rounded-full transition-all"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    {metrics.map((metric) => (
                      <div key={metric.id} className="border border-purple-200 rounded-lg p-3">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-xs font-semibold text-gray-700">
                            Metric {metric.id}
                          </span>
                          <button
                            onClick={() => removeMetric(metric.id)}
                            className="text-red-500 hover:text-red-700 text-sm"
                          >
                            Remove
                          </button>
                        </div>
                        <div className="space-y-2 text-sm">
                          <div className="flex gap-2">
                            <span className="w-16">Current:</span>
                            <input
                              type="number"
                              value={metric.current}
                              onChange={(e) =>
                                updateMetric(metric.id, "current", parseInt(e.target.value))
                              }
                              className="w-full px-2 py-1 border border-purple-200 rounded text-sm"
                            />
                          </div>
                          <div className="flex gap-2">
                            <span className="w-16">Target:</span>
                            <input
                              type="number"
                              value={metric.target}
                              onChange={(e) =>
                                updateMetric(metric.id, "target", parseInt(e.target.value))
                              }
                              className="w-full px-2 py-1 border border-purple-200 rounded text-sm"
                            />
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-gradient-to-r from-purple-400 to-blue-400 h-2 rounded-full"
                              style={{
                                width: `${Math.min(
                                  (metric.current / metric.target) * 100,
                                  100
                                )}%`,
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 border-t border-purple-200 pt-4">
                    <h5 className="text-sm font-semibold text-gray-700 mb-3">Add Metric</h5>
                    <div className="space-y-2 text-sm">
                      <input
                        type="number"
                        placeholder="Target"
                        value={newMetric.target}
                        onChange={(e) =>
                          setNewMetric({ ...newMetric, target: parseInt(e.target.value) })
                        }
                        className="w-full px-2 py-1 border border-purple-200 rounded text-sm"
                      />
                      <input
                        type="number"
                        placeholder="Current"
                        value={newMetric.current}
                        onChange={(e) =>
                          setNewMetric({ ...newMetric, current: parseInt(e.target.value) })
                        }
                        className="w-full px-2 py-1 border border-purple-200 rounded text-sm"
                      />
                      <button
                        onClick={addMetric}
                        className="w-full px-3 py-1 bg-purple-500 text-white rounded text-sm hover:bg-purple-600"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>

                {/* Summary Card */}
                {isSubmitted && (
                  <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-white/30">
                    <h4 className="text-lg font-bold text-purple-800 mb-4">Vision Summary</h4>
                    <p className="text-sm text-gray-700 whitespace-pre-line">{savedVision}</p>
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
