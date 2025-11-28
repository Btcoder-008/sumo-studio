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

export default function CreatePage() {
  const [isCopied, setIsCopied] = useState(false);
  const [isCopied2, setIsCopied2] = useState(false);
  const [bothCopied, setBothCopied] = useState({ path: false, npm: false });

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
              className="px-4 py-2 bg-yellow-100 text-yellow-700 font-medium rounded-lg transition-all"
            >
              Terminal
            </Link>
            <Link
              href="/build-studio"
              className="px-4 py-2 text-gray-700 font-medium rounded-lg hover:bg-yellow-100 hover:text-yellow-700 transition-all"
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
        <div className="max-w-xl mx-auto">
          {/* Use Terminal Section */}
          <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-2xl p-6 border border-white/30 hover:shadow-yellow-200/50 transition-shadow duration-300">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <span className="text-2xl">🚀</span>
                Create Project
              </h2>
            </div>

            {/* Copy Path Clipboard */}
            <div className="mb-4">
              <div className="flex items-center gap-2">
                <div className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg font-mono text-xs text-gray-600 truncate">
                  cd /Users/thiyagarajanbalakrishnan/Documents/supersumo/MyApps/sumo/frontend
                </div>
                <button
                  onClick={async () => {
                    const path = "cd /Users/thiyagarajanbalakrishnan/Documents/supersumo/MyApps/sumo/frontend";
                    try {
                      await navigator.clipboard.writeText(path);
                      setIsCopied(true);
                      setBothCopied(prev => ({ ...prev, path: true }));
                    } catch {
                      // Fallback for older browsers
                      const textArea = document.createElement("textarea");
                      textArea.value = path;
                      document.body.appendChild(textArea);
                      textArea.select();
                      document.execCommand("copy");
                      document.body.removeChild(textArea);
                      setIsCopied(true);
                      setBothCopied(prev => ({ ...prev, path: true }));
                    }
                    setTimeout(() => setIsCopied(false), 2000);
                  }}
                  className={`px-3 py-2 rounded-lg font-medium text-sm transition-all cursor-pointer ${
                    isCopied
                      ? "bg-green-500 text-white"
                      : "bg-yellow-400 hover:bg-yellow-500 text-gray-800"
                  }`}
                >
                  {isCopied ? "✓ Copied!" : "Copy"}
                </button>
              </div>
              {isCopied && (
                <p className="text-green-600 text-sm mt-2 font-medium flex items-center gap-1">
                  <span>✓</span> Path copied to clipboard!
                </p>
              )}
            </div>

            {/* Copy npm run dev Clipboard */}
            <div className="mb-4">
              <div className="flex items-center gap-2">
                <div className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg font-mono text-xs text-gray-600">
                  npm run dev
                </div>
                <button
                  onClick={async () => {
                    const cmd = "npm run dev";
                    try {
                      await navigator.clipboard.writeText(cmd);
                      setIsCopied2(true);
                      setBothCopied(prev => ({ ...prev, npm: true }));
                    } catch {
                      const textArea = document.createElement("textarea");
                      textArea.value = cmd;
                      document.body.appendChild(textArea);
                      textArea.select();
                      document.execCommand("copy");
                      document.body.removeChild(textArea);
                      setIsCopied2(true);
                      setBothCopied(prev => ({ ...prev, npm: true }));
                    }
                    setTimeout(() => setIsCopied2(false), 2000);
                  }}
                  className={`px-3 py-2 rounded-lg font-medium text-sm transition-all cursor-pointer ${
                    isCopied2
                      ? "bg-green-500 text-white"
                      : "bg-yellow-400 hover:bg-yellow-500 text-gray-800"
                  }`}
                >
                  {isCopied2 ? "✓ Copied!" : "Copy"}
                </button>
              </div>
              {isCopied2 && (
                <p className="text-green-600 text-sm mt-2 font-medium flex items-center gap-1">
                  <span>✓</span> Command copied to clipboard!
                </p>
              )}
            </div>

            {/* Run Local Button */}
            <div className="mb-4">
              <a
                href="http://localhost:3001"
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-block px-4 py-2 font-medium text-sm rounded-lg transition-all cursor-pointer ${
                  bothCopied.path && bothCopied.npm
                    ? "bg-green-500 hover:bg-green-600 text-white"
                    : "bg-yellow-400 hover:bg-yellow-500 text-gray-800"
                }`}
              >
                Run Local
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
