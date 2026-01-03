"use client";

import Link from "next/link";
import { MobileLayout } from "../../components/MobileLayout";
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

interface SWOTForm {
  strengths: string;
  weaknesses: string;
  opportunities: string;
  threats: string;
}

const suggestedTags = {
  strengths: ["Partnerships", "Brand Awareness", "Training", "Talent", "Leadership", "Innovation"],
  weaknesses: ["Systems", "Hiring", "Automation", "Budget", "Training", "Outsourcing"],
  opportunities: ["Markets", "Campaigns", "Alliances", "Launches", "Expansion", "R&D"],
  threats: ["Risk Assessment", "Competitor Analysis", "Contingency", "Diversification", "Legal", "Pricing"],
};

export default function SWOT() {
  const [formData, setFormData] = useState<SWOTForm>({
    strengths: "",
    weaknesses: "",
    opportunities: "",
    threats: "",
  });

  const [howToBetter, setHowToBetter] = useState<SWOTForm>({
    strengths: "",
    weaknesses: "",
    opportunities: "",
    threats: "",
  });

  const [selectedTags, setSelectedTags] = useState<Record<string, string[]>>({
    strengths: [],
    weaknesses: [],
    opportunities: [],
    threats: [],
  });

  const [savedSWOT, setSavedSWOT] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("ceoAutomation_swot_form");
    const savedBetter = localStorage.getItem("ceoAutomation_swot_howToBetter");
    const savedTags = localStorage.getItem("ceoAutomation_swot_tags");
    const savedSummary = localStorage.getItem("ceoAutomation_swot_summary");

    if (saved) {
      setFormData(JSON.parse(saved));
    }
    if (savedBetter) {
      setHowToBetter(JSON.parse(savedBetter));
    }
    if (savedTags) {
      setSelectedTags(JSON.parse(savedTags));
    }
    if (savedSummary) {
      setSavedSWOT(savedSummary);
      setIsSubmitted(true);
    }
  }, []);

  const handleFormChange = (field: keyof SWOTForm, value: string) => {
    const updated = { ...formData, [field]: value };
    setFormData(updated);
    localStorage.setItem("ceoAutomation_swot_form", JSON.stringify(updated));
  };

  const handleBetterChange = (field: keyof SWOTForm, value: string) => {
    const updated = { ...howToBetter, [field]: value };
    setHowToBetter(updated);
    localStorage.setItem("ceoAutomation_swot_howToBetter", JSON.stringify(updated));
  };

  const toggleTag = (category: keyof SWOTForm, tag: string) => {
    const updated = { ...selectedTags };
    if (updated[category]?.includes(tag)) {
      updated[category] = updated[category].filter((t) => t !== tag);
    } else {
      updated[category] = [...(updated[category] || []), tag];
    }
    setSelectedTags(updated);
    localStorage.setItem("ceoAutomation_swot_tags", JSON.stringify(updated));
  };

  const handleSubmit = () => {
    const summary = `
STRENGTHS:
${formData.strengths}

How to Better: ${howToBetter.strengths}
Tags: ${selectedTags.strengths?.join(", ") || "None"}

WEAKNESSES:
${formData.weaknesses}

How to Better: ${howToBetter.weaknesses}
Tags: ${selectedTags.weaknesses?.join(", ") || "None"}

OPPORTUNITIES:
${formData.opportunities}

How to Better: ${howToBetter.opportunities}
Tags: ${selectedTags.opportunities?.join(", ") || "None"}

THREATS:
${formData.threats}

How to Better: ${howToBetter.threats}
Tags: ${selectedTags.threats?.join(", ") || "None"}
    `.trim();

    setSavedSWOT(summary);
    localStorage.setItem("ceoAutomation_swot_summary", summary);
    setIsSubmitted(true);
  };

  const swotQuadrants = [
    {
      key: "strengths" as const,
      label: "Strengths",
      icon: "💪",
      bgColor: "bg-green-50",
      borderColor: "border-green-300",
      textColor: "text-green-800",
    },
    {
      key: "weaknesses" as const,
      label: "Weaknesses",
      icon: "⚠️",
      bgColor: "bg-red-50",
      borderColor: "border-red-300",
      textColor: "text-red-800",
    },
    {
      key: "opportunities" as const,
      label: "Opportunities",
      icon: "🚀",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-300",
      textColor: "text-blue-800",
    },
    {
      key: "threats" as const,
      label: "Threats",
      icon: "🔥",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-300",
      textColor: "text-orange-800",
    },
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 overflow-hidden">
      {floatingIcons.map((item, index) => (
        <FloatingIcon key={index} icon={item.icon} style={{ top: item.top, left: item.left, right: item.right, bottom: item.bottom, animationDelay: item.delay, animationDuration: item.duration } as React.CSSProperties} />
      ))}

      <div className="absolute top-0 left-0 w-96 h-96 bg-green-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-emerald-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: "1s" }} />
      <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-teal-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: "2s" }} />

      <MobileLayout title="SWOT Analysis 📊" backLink="/ceo-automation" navItems={navItems}>
        <div className="p-4 md:p-8">
          {/* SWOT Grid */}
          <div className="mb-8">
            <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-6">SWOT Quadrants</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                {swotQuadrants.map((quadrant) => (
                  <div
                    key={quadrant.key}
                    className={`${quadrant.bgColor} border-2 ${quadrant.borderColor} rounded-2xl p-6 shadow-lg`}
                  >
                    <h4 className={`text-xl font-bold ${quadrant.textColor} mb-4 flex items-center gap-2`}>
                      <span>{quadrant.icon}</span>
                      {quadrant.label}
                    </h4>
                    <textarea
                      value={formData[quadrant.key]}
                      onChange={(e) => handleFormChange(quadrant.key, e.target.value)}
                      placeholder={`Enter ${quadrant.label.toLowerCase()}...`}
                      className={`w-full px-4 py-3 border-2 ${quadrant.borderColor} rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 bg-white/50 backdrop-blur text-gray-700`}
                      rows={6}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* How to Better Section */}
            <div className="mb-8">
              <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-6">How to Better</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                {swotQuadrants.map((quadrant) => (
                  <div
                    key={`better-${quadrant.key}`}
                    className={`${quadrant.bgColor} border-2 ${quadrant.borderColor} rounded-2xl p-6 shadow-lg`}
                  >
                    <h4 className={`text-lg font-semibold ${quadrant.textColor} mb-3`}>
                      How to Better {quadrant.label}
                    </h4>
                    <textarea
                      value={howToBetter[quadrant.key]}
                      onChange={(e) => handleBetterChange(quadrant.key, e.target.value)}
                      placeholder={`Action items for ${quadrant.label.toLowerCase()}...`}
                      className={`w-full px-4 py-2 border-2 ${quadrant.borderColor} rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 bg-white/50 backdrop-blur text-gray-700 text-sm`}
                      rows={3}
                    />

                    {/* Tags */}
                    <div className="mt-4">
                      <p className="text-xs font-semibold text-gray-600 mb-2">Suggested Tags:</p>
                      <div className="flex flex-wrap gap-2">
                        {suggestedTags[quadrant.key].map((tag) => (
                          <button
                            key={tag}
                            onClick={() => toggleTag(quadrant.key, tag)}
                            className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                              selectedTags[quadrant.key]?.includes(tag)
                                ? `${quadrant.bgColor} border-2 ${quadrant.borderColor} ${quadrant.textColor}`
                                : "bg-gray-200 text-gray-600 border-2 border-gray-300"
                            }`}
                          >
                            {tag}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center mb-8">
              <button
                onClick={handleSubmit}
                className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold rounded-lg hover:shadow-lg transition-all"
              >
                Save SWOT Analysis
              </button>
            </div>

            {/* Summary */}
            {isSubmitted && (
              <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl p-6 md:p-8 border border-white/30">
                <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">SWOT Summary</h3>
                <p className="text-sm text-gray-700 whitespace-pre-line">{savedSWOT}</p>
              </div>
            )}
        </div>
      </MobileLayout>
    </div>
  );
}
