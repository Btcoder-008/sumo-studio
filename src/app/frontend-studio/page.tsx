"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

// Checkbox option type
type CheckboxOption = {
  id: string;
  label: string;
  checked: boolean;
  icon: string;
};

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
  { icon: "🎨", top: "10%", left: "5%", delay: "0s", duration: "7s" },
  { icon: "💅", top: "20%", right: "8%", delay: "1s", duration: "6s" },
  { icon: "🖌️", top: "60%", left: "3%", delay: "2s", duration: "8s" },
  { icon: "📐", bottom: "20%", right: "5%", delay: "0.5s", duration: "7s" },
  { icon: "🎭", top: "40%", right: "3%", delay: "1.5s", duration: "5s" },
  { icon: "✨", bottom: "30%", left: "8%", delay: "3s", duration: "6s" },
];

export default function FrontendStudio() {
  // Form state
  const [projectName, setProjectName] = useState("");
  const [checkboxOptions, setCheckboxOptions] = useState<CheckboxOption[]>([
    { id: "admin-dashboard", label: "Admin Dashboard", checked: false, icon: "📊" },
    { id: "login-page", label: "Login Page", checked: false, icon: "🔐" },
    { id: "crud-operation", label: "CRUD Operation", checked: false, icon: "⚙️" },
    { id: "api-connect", label: "API Connect", checked: false, icon: "🔗" },
    { id: "responsive-design", label: "Responsive Design", checked: false, icon: "📱" },
    { id: "dark-mode", label: "Dark Mode", checked: false, icon: "🌙" },
  ]);
  const [forField, setForField] = useState("");
  const [dataDependency, setDataDependency] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");

  // Generated prompt state
  const [generatedPrompt, setGeneratedPrompt] = useState("");

  // Handle checkbox change
  const handleCheckboxChange = (id: string) => {
    setCheckboxOptions((prev) =>
      prev.map((option) =>
        option.id === id ? { ...option, checked: !option.checked } : option
      )
    );
  };

  // Generate the prompt
  const generatePrompt = () => {
    const selectedFeatures = checkboxOptions
      .filter((opt) => opt.checked)
      .map((opt) => opt.label);

    let prompt = `Create a Complete\n\n`;

    if (selectedFeatures.length > 0) {
      selectedFeatures.forEach((feature) => {
        prompt += `☑ ${feature}\n`;
      });
    }

    if (forField.trim()) {
      prompt += `\n---\n\nfor - ${forField}\n`;
    }

    if (dataDependency.trim()) {
      prompt += `\n---\n\nData Dependency Order - Add Foreign Key (FK)\n${dataDependency}\n`;
    }

    if (additionalNotes.trim()) {
      prompt += `\n---\n\nAdditional Notes:\n${additionalNotes}\n`;
    }

    if (projectName.trim()) {
      prompt = `Project: ${projectName}\n\n` + prompt;
    }

    setGeneratedPrompt(prompt);
  };

  // Clear form
  const clearForm = () => {
    setProjectName("");
    setCheckboxOptions((prev) => prev.map((opt) => ({ ...opt, checked: false })));
    setForField("");
    setDataDependency("");
    setAdditionalNotes("");
    setGeneratedPrompt("");
  };

  // Copy to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedPrompt);
  };

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

      {/* Header */}
      <header className="relative z-20 bg-white/80 backdrop-blur-md shadow-lg border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/super-sumo.png"
                alt="Super Sumo"
                width={80}
                height={80}
                className="cursor-pointer hover:scale-105 transition-transform drop-shadow-lg"
              />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Sumo Studio
              </h1>
              <p className="text-xs text-gray-500 tracking-tight">Build your app with Sumo</p>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="flex items-center gap-2">
            <Link
              href="/terminal"
              className="px-4 py-2 text-gray-700 font-medium rounded-lg hover:bg-yellow-100 hover:text-yellow-700 transition-all"
            >
              Terminal
            </Link>
            <Link
              href="/frontend-studio"
              className="px-4 py-2 bg-orange-100 text-orange-700 font-medium rounded-lg transition-all"
            >
              Frontend Studio
            </Link>
            <Link
              href="/backend-studio"
              className="px-4 py-2 text-gray-700 font-medium rounded-lg hover:bg-pink-100 hover:text-pink-700 transition-all"
            >
              Backend Studio
            </Link>
          </nav>
        </div>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-2xl p-6 border border-white/30 hover:shadow-orange-200/50 transition-shadow duration-300">
            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <span className="text-2xl">🎨</span>
              Fill in the Details
            </h2>

            {/* Project Name */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Project Name
              </label>
              <input
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="Enter project name"
                className="w-full px-4 py-3 bg-white/50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none transition-all hover:border-orange-300"
              />
            </div>

            {/* Create a Complete - Checkboxes */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Create a Complete
              </label>
              <div className="grid grid-cols-2 gap-3">
                {checkboxOptions.map((option) => (
                  <label
                    key={option.id}
                    className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-200 border-2 ${
                      option.checked
                        ? "bg-gradient-to-r from-orange-100 to-pink-100 border-orange-400 shadow-md"
                        : "bg-white/50 border-gray-200 hover:border-orange-300 hover:bg-orange-50"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={option.checked}
                      onChange={() => handleCheckboxChange(option.id)}
                      className="w-5 h-5 text-orange-500 border-gray-300 rounded focus:ring-orange-400 accent-orange-500"
                    />
                    <span className="text-lg">{option.icon}</span>
                    <span className="text-gray-700 text-sm font-medium">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* For Field */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                for -
              </label>
              <input
                type="text"
                value={forField}
                onChange={(e) => setForField(e.target.value)}
                placeholder="Short answer text"
                className="w-full px-4 py-3 bg-white/50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none transition-all hover:border-orange-300"
              />
            </div>

            {/* Data Dependency Order */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Data Dependency Order - Add Foreign Key (FK)
              </label>
              <input
                type="text"
                value={dataDependency}
                onChange={(e) => setDataDependency(e.target.value)}
                placeholder="Short answer text"
                className="w-full px-4 py-3 bg-white/50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none transition-all hover:border-orange-300"
              />
            </div>

            {/* Additional Notes */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Additional Notes
              </label>
              <textarea
                value={additionalNotes}
                onChange={(e) => setAdditionalNotes(e.target.value)}
                placeholder="Any additional requirements..."
                rows={3}
                className="w-full px-4 py-3 bg-white/50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none transition-all resize-none hover:border-orange-300"
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-4">
              <button
                onClick={generatePrompt}
                className="flex-1 bg-gradient-to-r from-orange-400 via-pink-400 to-red-400 hover:from-orange-500 hover:via-pink-500 hover:to-red-500 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
              >
                Generate Prompt
              </button>
              <button
                onClick={clearForm}
                className="px-6 py-3 bg-white/70 border-2 border-gray-300 text-gray-600 hover:bg-gray-100 hover:border-gray-400 rounded-xl transition-all font-semibold"
              >
                Clear
              </button>
            </div>
          </div>

          {/* Output Section */}
          <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-2xl p-6 border border-white/30 hover:shadow-pink-200/50 transition-shadow duration-300">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <span className="text-2xl">✨</span>
                Generated Prompt
              </h2>
              {generatedPrompt && (
                <button
                  onClick={copyToClipboard}
                  className="text-sm bg-gradient-to-r from-orange-400 to-pink-400 hover:from-orange-500 hover:to-pink-500 text-white font-semibold px-4 py-2 rounded-lg flex items-center gap-2 transition-all hover:scale-105 active:scale-95 shadow-md"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                  Copy
                </button>
              )}
            </div>

            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-5 min-h-[400px] border border-gray-700 shadow-inner">
              {generatedPrompt ? (
                <pre className="whitespace-pre-wrap text-green-400 font-mono text-sm leading-relaxed">
                  {generatedPrompt}
                </pre>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-gray-500 mt-16">
                  <span className="text-6xl mb-4 opacity-50">🎨</span>
                  <p className="text-center">
                    Fill in the form and click<br />
                    <span className="text-orange-400 font-semibold">&quot;Generate Prompt&quot;</span><br />
                    to see the magic here
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
