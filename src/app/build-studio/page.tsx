"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

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

export default function BuildStudio() {
  const [isCreating, setIsCreating] = useState(false);
  const [status, setStatus] = useState("");
  const [copied1, setCopied1] = useState(false);
  const [copied2, setCopied2] = useState(false);
  const [copied3, setCopied3] = useState(false);

  const handleCreateProject = async () => {
    setIsCreating(true);
    setStatus("Starting project creation...");

    try {
      const response = await fetch("http://localhost:4000/run-script", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          scriptPath: "/Users/thiyagarajanbalakrishnan/Documents/supersumo/fullstack.sh",
        }),
      });

      const data = await response.json();

      if (data.success) {
        setStatus("Project creation started! Check your terminal.");
      } else {
        setStatus(data.message || "Failed to start project creation.");
      }
    } catch {
      setStatus("Error: Local server not running. Start it with: npm run local-server");
    }

    setIsCreating(false);
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
              href="/build-studio"
              className="px-4 py-2 bg-orange-100 text-orange-700 font-medium rounded-lg transition-all"
            >
              Build Studio
            </Link>
            <Link
              href="/frontend-studio"
              className="px-4 py-2 text-gray-700 font-medium rounded-lg hover:bg-orange-100 hover:text-orange-700 transition-all"
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
        {/* Page Title */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 flex items-center justify-center gap-3">
            <span className="text-4xl">🏗️</span>
            Build Studio
          </h2>
          <p className="text-gray-600 mt-2">Create and manage your projects</p>
        </div>

        {/* Create Project Card */}
        <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/30 hover:shadow-yellow-200/50 transition-shadow duration-300">
          <div className="text-center">
            <span className="text-6xl mb-4 block">🚀</span>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Create New Project</h3>
            <p className="text-gray-600 mb-6">Set up a fullstack project with Django + PostgreSQL + Next.js</p>

            <button
              onClick={handleCreateProject}
              disabled={isCreating}
              className={`px-8 py-4 font-bold text-lg rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 ${
                isCreating
                  ? "bg-gray-400 text-white"
                  : "bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 hover:from-green-500 hover:via-blue-600 hover:to-purple-700 text-white"
              }`}
            >
              {isCreating ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-6 w-6" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Creating...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <span>🏗️</span>
                  Create Project
                </span>
              )}
            </button>

            {status && (
              <div className={`mt-6 p-4 rounded-lg font-medium ${
                status.includes("Error") || status.includes("Failed")
                  ? "bg-red-100 text-red-700"
                  : status.includes("started")
                  ? "bg-green-100 text-green-700"
                  : "bg-blue-100 text-blue-700"
              }`}>
                {status}
              </div>
            )}

            {/* Clipboard Commands */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h4 className="text-lg font-semibold text-gray-700 mb-4">Run Backend Server</h4>

              {/* Clipboard 1: cd path */}
              <div className="mb-3">
                <div className="flex items-center gap-2">
                  <div className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg font-mono text-xs text-gray-600 truncate">
                    cd /Users/thiyagarajanbalakrishnan/Documents/supersumo/MyApps/sumo/backend
                  </div>
                  <button
                    onClick={async () => {
                      const text = "cd /Users/thiyagarajanbalakrishnan/Documents/supersumo/MyApps/sumo/backend";
                      try {
                        await navigator.clipboard.writeText(text);
                        setCopied1(true);
                      } catch {
                        const textArea = document.createElement("textarea");
                        textArea.value = text;
                        document.body.appendChild(textArea);
                        textArea.select();
                        document.execCommand("copy");
                        document.body.removeChild(textArea);
                        setCopied1(true);
                      }
                      setTimeout(() => setCopied1(false), 2000);
                    }}
                    className={`px-3 py-2 rounded-lg font-medium text-sm transition-all cursor-pointer ${
                      copied1
                        ? "bg-green-500 text-white"
                        : "bg-yellow-400 hover:bg-yellow-500 text-gray-800"
                    }`}
                  >
                    {copied1 ? "✓" : "Copy"}
                  </button>
                </div>
              </div>

              {/* Clipboard 2: source venv */}
              <div className="mb-3">
                <div className="flex items-center gap-2">
                  <div className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg font-mono text-xs text-gray-600">
                    source venv/bin/activate
                  </div>
                  <button
                    onClick={async () => {
                      const text = "source venv/bin/activate";
                      try {
                        await navigator.clipboard.writeText(text);
                        setCopied2(true);
                      } catch {
                        const textArea = document.createElement("textarea");
                        textArea.value = text;
                        document.body.appendChild(textArea);
                        textArea.select();
                        document.execCommand("copy");
                        document.body.removeChild(textArea);
                        setCopied2(true);
                      }
                      setTimeout(() => setCopied2(false), 2000);
                    }}
                    className={`px-3 py-2 rounded-lg font-medium text-sm transition-all cursor-pointer ${
                      copied2
                        ? "bg-green-500 text-white"
                        : "bg-yellow-400 hover:bg-yellow-500 text-gray-800"
                    }`}
                  >
                    {copied2 ? "✓" : "Copy"}
                  </button>
                </div>
              </div>

              {/* Clipboard 3: python manage.py runserver */}
              <div className="mb-3">
                <div className="flex items-center gap-2">
                  <div className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg font-mono text-xs text-gray-600">
                    python3 manage.py runserver
                  </div>
                  <button
                    onClick={async () => {
                      const text = "python3 manage.py runserver";
                      try {
                        await navigator.clipboard.writeText(text);
                        setCopied3(true);
                      } catch {
                        const textArea = document.createElement("textarea");
                        textArea.value = text;
                        document.body.appendChild(textArea);
                        textArea.select();
                        document.execCommand("copy");
                        document.body.removeChild(textArea);
                        setCopied3(true);
                      }
                      setTimeout(() => setCopied3(false), 2000);
                    }}
                    className={`px-3 py-2 rounded-lg font-medium text-sm transition-all cursor-pointer ${
                      copied3
                        ? "bg-green-500 text-white"
                        : "bg-yellow-400 hover:bg-yellow-500 text-gray-800"
                    }`}
                  >
                    {copied3 ? "✓" : "Copy"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
