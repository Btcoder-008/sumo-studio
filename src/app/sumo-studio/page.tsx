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

export default function TerminalPage() {
  // Create Project state
  const [createCopied1, setCreateCopied1] = useState(false);
  const [createCopied2, setCreateCopied2] = useState(false);
  const [createCopied3, setCreateCopied3] = useState(false);
  const [createAllCopied, setCreateAllCopied] = useState({ path: false, npm: false, localServer: false });

  // Run Backend Server state (in Create Project card)
  const [backendPath, setBackendPath] = useState(false);
  const [backendVenv, setBackendVenv] = useState(false);
  const [backendRunserver, setBackendRunserver] = useState(false);
  const [backendAllCopied, setBackendAllCopied] = useState({ path: false, venv: false, runserver: false });

  // Edit Project state
  const [editCopied1, setEditCopied1] = useState(false);
  const [editCopied2, setEditCopied2] = useState(false);
  const [editCopied3, setEditCopied3] = useState(false);
  const [editCopied4, setEditCopied4] = useState(false);
  const [editBothCopied, setEditBothCopied] = useState({ path: false, npm: false, cmd: false });
  const [spotlightBabyCopied, setSpotlightBabyCopied] = useState(false);

  // Run Backend state
  const [backendCopied1, setBackendCopied1] = useState(false);
  const [backendCopied2, setBackendCopied2] = useState(false);
  const [backendCopied3, setBackendCopied3] = useState(false);
  const [backendCopied4, setBackendCopied4] = useState(false);
  const [backendBothCopied, setBackendBothCopied] = useState({ path: false, cmd: false });

  // Deploy - Git commands state
  const [gitInitCopied, setGitInitCopied] = useState(false);
  const [gitRemoteCopied, setGitRemoteCopied] = useState(false);
  const [gitAddCopied, setGitAddCopied] = useState(false);
  const [gitPushCopied, setGitPushCopied] = useState(false);

  // Deploy - Render deploy state
  const [backendRootCopied, setBackendRootCopied] = useState(false);
  const [buildCmdCopied, setBuildCmdCopied] = useState(false);
  const [startCmdCopied, setStartCmdCopied] = useState(false);
  const [secretKeyNameCopied, setSecretKeyNameCopied] = useState(false);
  const [debugNameCopied, setDebugNameCopied] = useState(false);
  const [debugValueCopied, setDebugValueCopied] = useState(false);
  const [databaseUrlNameCopied, setDatabaseUrlNameCopied] = useState(false);
  const [frontendUrlNameCopied, setFrontendUrlNameCopied] = useState(false);

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
              href="/sumo-studio"
              className="px-4 py-2 bg-yellow-100 text-yellow-700 font-medium rounded-lg transition-all"
            >
              Sumo Studio
            </Link>
            <Link
              href="/frontend-studio"
              className="px-4 py-2 text-gray-700 font-medium rounded-lg hover:bg-yellow-100 hover:text-yellow-700 transition-all"
            >
              Frontend Studio
            </Link>
            <Link
              href="/backend-studio"
              className="px-4 py-2 text-gray-700 font-medium rounded-lg hover:bg-yellow-100 hover:text-yellow-700 transition-all"
            >
              Backend Studio
            </Link>
            <Link
              href="/script-studio"
              className="px-4 py-2 text-gray-700 font-medium rounded-lg hover:bg-yellow-100 hover:text-yellow-700 transition-all"
            >
              Script Studio
            </Link>
          </nav>
        </div>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Card 1: Step 1 - Run Sumo Script */}
          <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-2xl p-6 border border-white/30 hover:shadow-green-200/50 transition-shadow duration-300">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <span className="text-2xl">🚀</span>
                Step 1: Run Sumo Script
              </h2>
            </div>

            {/* Parent Terminal Section with Buttons */}
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-gray-700">Parent Terminal</h3>
              <div className="flex gap-2">
                <a
                  href="http://localhost:3001/create-studio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`px-3 py-1 font-medium text-xs rounded-lg transition-all cursor-pointer text-center whitespace-nowrap ${
                    createAllCopied.path && createAllCopied.npm && createAllCopied.localServer
                      ? "bg-green-500 hover:bg-green-600 text-white"
                      : "bg-yellow-400 hover:bg-yellow-500 text-gray-800"
                  }`}
                >
                  Create Project
                </a>
                <a
                  href="http://127.0.0.1:8001/admin"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`px-3 py-1 font-medium text-xs rounded-lg transition-all cursor-pointer text-center whitespace-nowrap ${
                    backendAllCopied.path && backendAllCopied.venv && backendAllCopied.runserver
                      ? "bg-blue-500 hover:bg-blue-600 text-white"
                      : "bg-yellow-400 hover:bg-yellow-500 text-gray-800"
                  }`}
                >
                  Admin Django
                </a>
              </div>
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
                      setCreateCopied1(true);
                      setCreateAllCopied(prev => ({ ...prev, path: true }));
                    } catch {
                      const textArea = document.createElement("textarea");
                      textArea.value = path;
                      document.body.appendChild(textArea);
                      textArea.select();
                      document.execCommand("copy");
                      document.body.removeChild(textArea);
                      setCreateCopied1(true);
                      setCreateAllCopied(prev => ({ ...prev, path: true }));
                    }
                    setTimeout(() => setCreateCopied1(false), 2000);
                  }}
                  className={`px-3 py-2 rounded-lg font-medium text-sm transition-all cursor-pointer ${
                    createCopied1
                      ? "bg-green-500 text-white"
                      : "bg-yellow-400 hover:bg-yellow-500 text-gray-800"
                  }`}
                >
                  {createCopied1 ? "✓" : "Copy"}
                </button>
              </div>
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
                      setCreateCopied2(true);
                      setCreateAllCopied(prev => ({ ...prev, npm: true }));
                    } catch {
                      const textArea = document.createElement("textarea");
                      textArea.value = cmd;
                      document.body.appendChild(textArea);
                      textArea.select();
                      document.execCommand("copy");
                      document.body.removeChild(textArea);
                      setCreateCopied2(true);
                      setCreateAllCopied(prev => ({ ...prev, npm: true }));
                    }
                    setTimeout(() => setCreateCopied2(false), 2000);
                  }}
                  className={`px-3 py-2 rounded-lg font-medium text-sm transition-all cursor-pointer ${
                    createCopied2
                      ? "bg-green-500 text-white"
                      : "bg-yellow-400 hover:bg-yellow-500 text-gray-800"
                  }`}
                >
                  {createCopied2 ? "✓" : "Copy"}
                </button>
              </div>
            </div>

            {/* Copy npm run local-server Clipboard */}
            <div className="mb-4">
              <div className="flex items-center gap-2">
                <div className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg font-mono text-xs text-gray-600">
                  npm run local-server
                </div>
                <button
                  onClick={async () => {
                    const cmd = "npm run local-server";
                    try {
                      await navigator.clipboard.writeText(cmd);
                      setCreateCopied3(true);
                      setCreateAllCopied(prev => ({ ...prev, localServer: true }));
                    } catch {
                      const textArea = document.createElement("textarea");
                      textArea.value = cmd;
                      document.body.appendChild(textArea);
                      textArea.select();
                      document.execCommand("copy");
                      document.body.removeChild(textArea);
                      setCreateCopied3(true);
                      setCreateAllCopied(prev => ({ ...prev, localServer: true }));
                    }
                    setTimeout(() => setCreateCopied3(false), 2000);
                  }}
                  className={`px-3 py-2 rounded-lg font-medium text-sm transition-all cursor-pointer ${
                    createCopied3
                      ? "bg-green-500 text-white"
                      : "bg-yellow-400 hover:bg-yellow-500 text-gray-800"
                  }`}
                >
                  {createCopied3 ? "✓" : "Copy"}
                </button>
              </div>
            </div>

            {/* Run Backend Server Section */}
            <div className="pt-4 border-t border-gray-200">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Run Backend Server</h3>

              {/* Backend cd path */}
              <div className="mb-2">
                <div className="flex items-center gap-2">
                  <div className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg font-mono text-xs text-gray-600 truncate">
                    cd /Users/thiyagarajanbalakrishnan/Documents/supersumo/MyApps/sumo/backend
                  </div>
                  <button
                    onClick={async () => {
                      const text = "cd /Users/thiyagarajanbalakrishnan/Documents/supersumo/MyApps/sumo/backend";
                      try {
                        await navigator.clipboard.writeText(text);
                        setBackendPath(true);
                        setBackendAllCopied(prev => ({ ...prev, path: true }));
                      } catch {
                        const textArea = document.createElement("textarea");
                        textArea.value = text;
                        document.body.appendChild(textArea);
                        textArea.select();
                        document.execCommand("copy");
                        document.body.removeChild(textArea);
                        setBackendPath(true);
                        setBackendAllCopied(prev => ({ ...prev, path: true }));
                      }
                      setTimeout(() => setBackendPath(false), 2000);
                    }}
                    className={`px-3 py-2 rounded-lg font-medium text-sm transition-all cursor-pointer ${
                      backendPath
                        ? "bg-green-500 text-white"
                        : "bg-yellow-400 hover:bg-yellow-500 text-gray-800"
                    }`}
                  >
                    {backendPath ? "✓" : "Copy"}
                  </button>
                </div>
              </div>

              {/* source venv */}
              <div className="mb-2">
                <div className="flex items-center gap-2">
                  <div className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg font-mono text-xs text-gray-600">
                    source venv/bin/activate
                  </div>
                  <button
                    onClick={async () => {
                      const text = "source venv/bin/activate";
                      try {
                        await navigator.clipboard.writeText(text);
                        setBackendVenv(true);
                        setBackendAllCopied(prev => ({ ...prev, venv: true }));
                      } catch {
                        const textArea = document.createElement("textarea");
                        textArea.value = text;
                        document.body.appendChild(textArea);
                        textArea.select();
                        document.execCommand("copy");
                        document.body.removeChild(textArea);
                        setBackendVenv(true);
                        setBackendAllCopied(prev => ({ ...prev, venv: true }));
                      }
                      setTimeout(() => setBackendVenv(false), 2000);
                    }}
                    className={`px-3 py-2 rounded-lg font-medium text-sm transition-all cursor-pointer ${
                      backendVenv
                        ? "bg-green-500 text-white"
                        : "bg-yellow-400 hover:bg-yellow-500 text-gray-800"
                    }`}
                  >
                    {backendVenv ? "✓" : "Copy"}
                  </button>
                </div>
              </div>

              {/* python3 manage.py runserver */}
              <div className="mb-4">
                <div className="flex items-center gap-2">
                  <div className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg font-mono text-xs text-gray-600">
                    python3 manage.py runserver 8001
                  </div>
                  <button
                    onClick={async () => {
                      const text = "python3 manage.py runserver 8001";
                      try {
                        await navigator.clipboard.writeText(text);
                        setBackendRunserver(true);
                        setBackendAllCopied(prev => ({ ...prev, runserver: true }));
                      } catch {
                        const textArea = document.createElement("textarea");
                        textArea.value = text;
                        document.body.appendChild(textArea);
                        textArea.select();
                        document.execCommand("copy");
                        document.body.removeChild(textArea);
                        setBackendRunserver(true);
                        setBackendAllCopied(prev => ({ ...prev, runserver: true }));
                      }
                      setTimeout(() => setBackendRunserver(false), 2000);
                    }}
                    className={`px-3 py-2 rounded-lg font-medium text-sm transition-all cursor-pointer ${
                      backendRunserver
                        ? "bg-green-500 text-white"
                        : "bg-yellow-400 hover:bg-yellow-500 text-gray-800"
                    }`}
                  >
                    {backendRunserver ? "✓" : "Copy"}
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* Card 2: Step 2 - Configure Frontend */}
          <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-2xl p-6 border border-white/30 hover:shadow-blue-200/50 transition-shadow duration-300">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <span className="text-2xl">✏️</span>
                Step 2: Configure Frontend
              </h2>
            </div>

            {/* Spotlight Section */}
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Spotlight Project Path</h3>

            {/* Copy Path Clipboard */}
            <div className="mb-4">
              <div className="flex items-center gap-2">
                <div className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg font-mono text-xs text-gray-600 truncate">
                  /Users/thiyagarajanbalakrishnan/Documents/supersumo/MyApps
                </div>
                <button
                  onClick={async () => {
                    const path = "/Users/thiyagarajanbalakrishnan/Documents/supersumo/MyApps";
                    try {
                      await navigator.clipboard.writeText(path);
                      setEditCopied1(true);
                    } catch {
                      const textArea = document.createElement("textarea");
                      textArea.value = path;
                      document.body.appendChild(textArea);
                      textArea.select();
                      document.execCommand("copy");
                      document.body.removeChild(textArea);
                      setEditCopied1(true);
                    }
                    setTimeout(() => setEditCopied1(false), 2000);
                  }}
                  className={`px-3 py-2 rounded-lg font-medium text-sm transition-all cursor-pointer ${
                    editCopied1
                      ? "bg-green-500 text-white"
                      : "bg-yellow-400 hover:bg-yellow-500 text-gray-800"
                  }`}
                >
                  {editCopied1 ? "✓" : "Copy"}
                </button>
              </div>
            </div>

            {/* Baby Terminal Section */}
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Baby Terminal - cd Baby Project - claude</h3>

            {/* What frameworks clipboard */}
            <div className="mb-4">
              <div className="flex items-center gap-2">
                <div className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg font-mono text-xs text-gray-600 truncate">
                  What frameworks used in this project
                </div>
                <button
                  onClick={async () => {
                    const text = "What frameworks used in this project";
                    try {
                      await navigator.clipboard.writeText(text);
                      setEditCopied2(true);
                    } catch {
                      const textArea = document.createElement("textarea");
                      textArea.value = text;
                      document.body.appendChild(textArea);
                      textArea.select();
                      document.execCommand("copy");
                      document.body.removeChild(textArea);
                      setEditCopied2(true);
                    }
                    setTimeout(() => setEditCopied2(false), 2000);
                  }}
                  className={`px-3 py-2 rounded-lg font-medium text-sm transition-all cursor-pointer ${
                    editCopied2
                      ? "bg-green-500 text-white"
                      : "bg-yellow-400 hover:bg-yellow-500 text-gray-800"
                  }`}
                >
                  {editCopied2 ? "✓" : "Copy"}
                </button>
              </div>
            </div>

            {/* Baby Terminal - cd drag frontend - claude Section */}
            <div className="pt-4 border-t border-gray-200 mb-3">
              <div className="flex items-center gap-2">
                <div className="flex-1 text-sm font-semibold text-gray-700">
                  Baby Terminal - cd drag frontend - claude
                </div>
                <a
                  href="/frontend-studio"
                  className="px-3 py-2 bg-green-500 hover:bg-green-600 text-white text-sm font-medium rounded-lg transition-colors whitespace-nowrap min-w-[52px] text-center"
                >
                  GO!
                </a>
              </div>
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
                      setEditCopied3(true);
                      setEditBothCopied(prev => ({ ...prev, npm: true }));
                    } catch {
                      const textArea = document.createElement("textarea");
                      textArea.value = cmd;
                      document.body.appendChild(textArea);
                      textArea.select();
                      document.execCommand("copy");
                      document.body.removeChild(textArea);
                      setEditCopied3(true);
                      setEditBothCopied(prev => ({ ...prev, npm: true }));
                    }
                    setTimeout(() => setEditCopied3(false), 2000);
                  }}
                  className={`px-3 py-2 rounded-lg font-medium text-sm transition-all cursor-pointer ${
                    editCopied3
                      ? "bg-green-500 text-white"
                      : "bg-yellow-400 hover:bg-yellow-500 text-gray-800"
                  }`}
                >
                  {editCopied3 ? "✓" : "Copy"}
                </button>
              </div>
            </div>

            {/* Copy npm run build Clipboard */}
            <div className="mb-4">
              <div className="flex items-center gap-2">
                <div className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg font-mono text-xs text-gray-600">
                  npm run build
                </div>
                <button
                  onClick={async () => {
                    const cmd = "npm run build";
                    try {
                      await navigator.clipboard.writeText(cmd);
                      setEditCopied4(true);
                      setEditBothCopied(prev => ({ ...prev, cmd: true }));
                    } catch {
                      const textArea = document.createElement("textarea");
                      textArea.value = cmd;
                      document.body.appendChild(textArea);
                      textArea.select();
                      document.execCommand("copy");
                      document.body.removeChild(textArea);
                      setEditCopied4(true);
                      setEditBothCopied(prev => ({ ...prev, cmd: true }));
                    }
                    setTimeout(() => setEditCopied4(false), 2000);
                  }}
                  className={`px-3 py-2 rounded-lg font-medium text-sm transition-all cursor-pointer ${
                    editCopied4
                      ? "bg-green-500 text-white"
                      : "bg-yellow-400 hover:bg-yellow-500 text-gray-800"
                  }`}
                >
                  {editCopied4 ? "✓" : "Copy"}
                </button>
              </div>
            </div>

          </div>

          {/* Card 3: Step 3 - Configure Backend */}
          <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-2xl p-6 border border-white/30 hover:shadow-purple-200/50 transition-shadow duration-300">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <span className="text-2xl">⚙️</span>
                Step 3: Configure Backend
              </h2>
            </div>

            {/* Copy Path Clipboard */}
            <div className="mb-4">
              <div className="flex items-center gap-2">
                <div className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg font-mono text-xs text-gray-600 truncate">
                  /Users/thiyagarajanbalakrishnan/Documents/supersumo/MyApps
                </div>
                <button
                  onClick={async () => {
                    const path = "/Users/thiyagarajanbalakrishnan/Documents/supersumo/MyApps";
                    try {
                      await navigator.clipboard.writeText(path);
                      setBackendCopied1(true);
                      setBackendBothCopied(prev => ({ ...prev, path: true }));
                    } catch {
                      const textArea = document.createElement("textarea");
                      textArea.value = path;
                      document.body.appendChild(textArea);
                      textArea.select();
                      document.execCommand("copy");
                      document.body.removeChild(textArea);
                      setBackendCopied1(true);
                      setBackendBothCopied(prev => ({ ...prev, path: true }));
                    }
                    setTimeout(() => setBackendCopied1(false), 2000);
                  }}
                  className={`px-3 py-2 rounded-lg font-medium text-sm transition-all cursor-pointer ${
                    backendCopied1
                      ? "bg-green-500 text-white"
                      : "bg-yellow-400 hover:bg-yellow-500 text-gray-800"
                  }`}
                >
                  {backendCopied1 ? "✓" : "Copy"}
                </button>
              </div>
            </div>

            {/* cd Child Terminal Backend Section */}
            <div className="pt-4 border-t border-gray-200">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">cd Child Terminal Backend</h3>
            </div>

            {/* Copy claude Clipboard */}
            <div className="mb-4">
              <div className="flex items-center gap-2">
                <div className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg font-mono text-xs text-gray-600">
                  claude
                </div>
                <button
                  onClick={async () => {
                    const cmd = "claude";
                    try {
                      await navigator.clipboard.writeText(cmd);
                      setBackendCopied2(true);
                    } catch {
                      const textArea = document.createElement("textarea");
                      textArea.value = cmd;
                      document.body.appendChild(textArea);
                      textArea.select();
                      document.execCommand("copy");
                      document.body.removeChild(textArea);
                      setBackendCopied2(true);
                    }
                    setTimeout(() => setBackendCopied2(false), 2000);
                  }}
                  className={`px-3 py-2 rounded-lg font-medium text-sm transition-all cursor-pointer ${
                    backendCopied2
                      ? "bg-green-500 text-white"
                      : "bg-yellow-400 hover:bg-yellow-500 text-gray-800"
                  }`}
                >
                  {backendCopied2 ? "✓" : "Copy"}
                </button>
              </div>
            </div>

            {/* Use Backend Studio Section */}
            <div className="pt-4 border-t border-gray-200">
              <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                Use Backend Studio
                <a
                  href="/backend-studio"
                  className="text-blue-500 hover:text-blue-600 transition-colors"
                >
                  🔗
                </a>
              </h3>
            </div>

            {/* Copy python runserver Clipboard */}
            <div className="mb-4">
              <div className="flex items-center gap-2">
                <div className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg font-mono text-xs text-gray-600">
                  python3 manage.py runserver 8001
                </div>
                <button
                  onClick={async () => {
                    const cmd = "python3 manage.py runserver 8001";
                    try {
                      await navigator.clipboard.writeText(cmd);
                      setBackendCopied3(true);
                    } catch {
                      const textArea = document.createElement("textarea");
                      textArea.value = cmd;
                      document.body.appendChild(textArea);
                      textArea.select();
                      document.execCommand("copy");
                      document.body.removeChild(textArea);
                      setBackendCopied3(true);
                    }
                    setTimeout(() => setBackendCopied3(false), 2000);
                  }}
                  className={`px-3 py-2 rounded-lg font-medium text-sm transition-all cursor-pointer ${
                    backendCopied3
                      ? "bg-green-500 text-white"
                      : "bg-yellow-400 hover:bg-yellow-500 text-gray-800"
                  }`}
                >
                  {backendCopied3 ? "✓" : "Copy"}
                </button>
              </div>
            </div>

            {/* Copy python migrate Clipboard */}
            <div className="mb-4">
              <div className="flex items-center gap-2">
                <div className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg font-mono text-xs text-gray-600">
                  python3 manage.py migrate
                </div>
                <button
                  onClick={async () => {
                    const cmd = "python3 manage.py migrate";
                    try {
                      await navigator.clipboard.writeText(cmd);
                      setBackendCopied4(true);
                    } catch {
                      const textArea = document.createElement("textarea");
                      textArea.value = cmd;
                      document.body.appendChild(textArea);
                      textArea.select();
                      document.execCommand("copy");
                      document.body.removeChild(textArea);
                      setBackendCopied4(true);
                    }
                    setTimeout(() => setBackendCopied4(false), 2000);
                  }}
                  className={`px-3 py-2 rounded-lg font-medium text-sm transition-all cursor-pointer ${
                    backendCopied4
                      ? "bg-green-500 text-white"
                      : "bg-yellow-400 hover:bg-yellow-500 text-gray-800"
                  }`}
                >
                  {backendCopied4 ? "✓" : "Copy"}
                </button>
              </div>
            </div>

          </div>

        </div>

        {/* Deploy Section - Row 2 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">

          {/* Card 4: Step 4 - Push to GitHub */}
          <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-2xl p-6 border border-white/30 hover:shadow-green-200/50 transition-shadow duration-300">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <span className="text-2xl">📤</span>
                Step 4: Push to GitHub
              </h2>
              <a
                href="https://github.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1 font-medium text-xs rounded-lg transition-all cursor-pointer text-center whitespace-nowrap bg-green-500 hover:bg-green-600 text-white"
              >
                Github
              </a>
            </div>

            {/* git init */}
            <div className="mb-3">
              <div className="flex items-center gap-2">
                <div className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg font-mono text-xs text-gray-600">
                  git init
                </div>
                <button
                  onClick={async () => {
                    const cmd = "git init";
                    try {
                      await navigator.clipboard.writeText(cmd);
                      setGitInitCopied(true);
                    } catch {
                      const textArea = document.createElement("textarea");
                      textArea.value = cmd;
                      document.body.appendChild(textArea);
                      textArea.select();
                      document.execCommand("copy");
                      document.body.removeChild(textArea);
                      setGitInitCopied(true);
                    }
                    setTimeout(() => setGitInitCopied(false), 2000);
                  }}
                  className={`px-3 py-2 rounded-lg font-medium text-sm transition-all cursor-pointer ${
                    gitInitCopied
                      ? "bg-green-500 text-white"
                      : "bg-yellow-400 hover:bg-yellow-500 text-gray-800"
                  }`}
                >
                  {gitInitCopied ? "✓" : "Copy"}
                </button>
              </div>
            </div>

            {/* git remote add */}
            <div className="mb-3">
              <div className="flex items-center gap-2">
                <div className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg font-mono text-xs text-gray-600 truncate">
                  git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
                </div>
                <button
                  onClick={async () => {
                    const cmd = "git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git";
                    try {
                      await navigator.clipboard.writeText(cmd);
                      setGitRemoteCopied(true);
                    } catch {
                      const textArea = document.createElement("textarea");
                      textArea.value = cmd;
                      document.body.appendChild(textArea);
                      textArea.select();
                      document.execCommand("copy");
                      document.body.removeChild(textArea);
                      setGitRemoteCopied(true);
                    }
                    setTimeout(() => setGitRemoteCopied(false), 2000);
                  }}
                  className={`px-3 py-2 rounded-lg font-medium text-sm transition-all cursor-pointer ${
                    gitRemoteCopied
                      ? "bg-green-500 text-white"
                      : "bg-yellow-400 hover:bg-yellow-500 text-gray-800"
                  }`}
                >
                  {gitRemoteCopied ? "✓" : "Copy"}
                </button>
              </div>
            </div>

            {/* git add & commit */}
            <div className="mb-3">
              <div className="flex items-center gap-2">
                <div className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg font-mono text-xs text-gray-600">
                  git add -A && git commit -m "Initial commit"
                </div>
                <button
                  onClick={async () => {
                    const cmd = 'git add -A && git commit -m "Initial commit"';
                    try {
                      await navigator.clipboard.writeText(cmd);
                      setGitAddCopied(true);
                    } catch {
                      const textArea = document.createElement("textarea");
                      textArea.value = cmd;
                      document.body.appendChild(textArea);
                      textArea.select();
                      document.execCommand("copy");
                      document.body.removeChild(textArea);
                      setGitAddCopied(true);
                    }
                    setTimeout(() => setGitAddCopied(false), 2000);
                  }}
                  className={`px-3 py-2 rounded-lg font-medium text-sm transition-all cursor-pointer ${
                    gitAddCopied
                      ? "bg-green-500 text-white"
                      : "bg-yellow-400 hover:bg-yellow-500 text-gray-800"
                  }`}
                >
                  {gitAddCopied ? "✓" : "Copy"}
                </button>
              </div>
            </div>

            {/* git push */}
            <div className="mb-4">
              <div className="flex items-center gap-2">
                <div className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg font-mono text-xs text-gray-600">
                  git push -u origin main
                </div>
                <button
                  onClick={async () => {
                    const cmd = "git push -u origin main";
                    try {
                      await navigator.clipboard.writeText(cmd);
                      setGitPushCopied(true);
                    } catch {
                      const textArea = document.createElement("textarea");
                      textArea.value = cmd;
                      document.body.appendChild(textArea);
                      textArea.select();
                      document.execCommand("copy");
                      document.body.removeChild(textArea);
                      setGitPushCopied(true);
                    }
                    setTimeout(() => setGitPushCopied(false), 2000);
                  }}
                  className={`px-3 py-2 rounded-lg font-medium text-sm transition-all cursor-pointer ${
                    gitPushCopied
                      ? "bg-green-500 text-white"
                      : "bg-yellow-400 hover:bg-yellow-500 text-gray-800"
                  }`}
                >
                  {gitPushCopied ? "✓" : "Copy"}
                </button>
              </div>
            </div>

          </div>

          {/* Card 5: Step 5 - Deploy Frontend (Vercel) */}
          <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-2xl p-6 border border-white/30 hover:shadow-blue-200/50 transition-shadow duration-300">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <span className="text-2xl">▲</span>
                Step 5: Deploy on Vercel
              </h2>
              <a
                href="https://vercel.com/dashboard"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1 font-medium text-xs rounded-lg transition-all cursor-pointer text-center whitespace-nowrap bg-green-500 hover:bg-green-600 text-white"
              >
                Vercel
              </a>
            </div>

            {/* Steps Table */}
            <div className="space-y-2 text-sm">
              <div className="flex gap-2">
                <span className="font-semibold text-gray-700 w-8">2.1</span>
                <span className="text-gray-600">Go to vercel.com → Add New Project</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-gray-700 w-8">2.2</span>
                <span className="text-gray-600">Import your GitHub repository</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-gray-700 w-8">2.3</span>
                <span className="text-gray-600">Set Root Directory → <code className="bg-gray-100 px-1 rounded">frontend</code></span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-gray-700 w-8">2.4</span>
                <span className="text-gray-600">Framework Preset → Next.js</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-gray-700 w-8">2.5</span>
                <span className="text-gray-600">Add Environment Variable:</span>
              </div>
              <div className="ml-10 px-2 py-1 bg-gray-50 border border-gray-200 rounded font-mono text-xs text-gray-600">
                NEXT_PUBLIC_API_URL = https://your-backend.onrender.com/api
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-gray-700 w-8">2.6</span>
                <span className="text-gray-600">Click Deploy</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-gray-700 w-8">2.7</span>
                <span className="text-gray-600">Copy your Vercel URL</span>
              </div>
            </div>

          </div>

          {/* Card 6: Step 6 - Deploy Backend (Render) */}
          <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-2xl p-6 border border-white/30 hover:shadow-purple-200/50 transition-shadow duration-300">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <span className="text-2xl">🔧</span>
                Step 6: Deploy on Render
              </h2>
              <a
                href="https://dashboard.render.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1 font-medium text-xs rounded-lg transition-all cursor-pointer text-center whitespace-nowrap bg-green-500 hover:bg-green-600 text-white"
              >
                Render
              </a>
            </div>

            {/* Web Service Steps */}
            <div className="mb-4 pt-4 border-t border-gray-200">
              <h3 className="text-sm font-semibold text-gray-700 mb-2">Create Postgre & Create Web Service</h3>
              <div className="space-y-2 text-xs text-gray-600">
                <div className="flex items-center gap-1">
                  <span>• Root Directory:</span>
                  <button
                    onClick={async () => {
                      const value = "backend";
                      try {
                        await navigator.clipboard.writeText(value);
                        setBackendRootCopied(true);
                      } catch {
                        const textArea = document.createElement("textarea");
                        textArea.value = value;
                        document.body.appendChild(textArea);
                        textArea.select();
                        document.execCommand("copy");
                        document.body.removeChild(textArea);
                        setBackendRootCopied(true);
                      }
                      setTimeout(() => setBackendRootCopied(false), 2000);
                    }}
                    className={`px-2 py-0.5 rounded font-mono text-xs transition-all cursor-pointer ${
                      backendRootCopied
                        ? "bg-green-500 text-white"
                        : "bg-gray-100 hover:bg-yellow-400 text-gray-700"
                    }`}
                  >
                    {backendRootCopied ? "✓ backend" : "backend"}
                  </button>
                </div>
                <div>• Runtime: Python 3</div>
                <div className="flex items-center gap-2">
                  <span>• Build:</span>
                  <div className="flex-1 px-2 py-1 bg-gray-50 border border-gray-200 rounded font-mono text-[10px] text-gray-600 truncate">
                    pip install -r requirements.txt && python manage.py migrate
                  </div>
                  <button
                    onClick={async () => {
                      const cmd = "pip install -r requirements.txt && python manage.py migrate";
                      try {
                        await navigator.clipboard.writeText(cmd);
                        setBuildCmdCopied(true);
                      } catch {
                        const textArea = document.createElement("textarea");
                        textArea.value = cmd;
                        document.body.appendChild(textArea);
                        textArea.select();
                        document.execCommand("copy");
                        document.body.removeChild(textArea);
                        setBuildCmdCopied(true);
                      }
                      setTimeout(() => setBuildCmdCopied(false), 2000);
                    }}
                    className={`px-2 py-1 rounded-lg font-medium text-xs transition-all cursor-pointer ${
                      buildCmdCopied
                        ? "bg-green-500 text-white"
                        : "bg-yellow-400 hover:bg-yellow-500 text-gray-800"
                    }`}
                  >
                    {buildCmdCopied ? "✓" : "Copy"}
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <span>• Start:</span>
                  <div className="flex-1 px-2 py-1 bg-gray-50 border border-gray-200 rounded font-mono text-[10px] text-gray-600 truncate">
                    gunicorn myproject.wsgi:application
                  </div>
                  <button
                    onClick={async () => {
                      const cmd = "gunicorn myproject.wsgi:application";
                      try {
                        await navigator.clipboard.writeText(cmd);
                        setStartCmdCopied(true);
                      } catch {
                        const textArea = document.createElement("textarea");
                        textArea.value = cmd;
                        document.body.appendChild(textArea);
                        textArea.select();
                        document.execCommand("copy");
                        document.body.removeChild(textArea);
                        setStartCmdCopied(true);
                      }
                      setTimeout(() => setStartCmdCopied(false), 2000);
                    }}
                    className={`px-2 py-1 rounded-lg font-medium text-xs transition-all cursor-pointer ${
                      startCmdCopied
                        ? "bg-green-500 text-white"
                        : "bg-yellow-400 hover:bg-yellow-500 text-gray-800"
                    }`}
                  >
                    {startCmdCopied ? "✓" : "Copy"}
                  </button>
                </div>
              </div>
            </div>

            {/* Click Box to Copy Environment Variables */}
            <div className="mb-4 pt-4 border-t border-gray-200">
              <h3 className="text-sm font-semibold text-gray-700 mb-2">Click Box to Copy Environment Variables</h3>
              <div className="space-y-2 text-xs text-gray-600">
                <div className="flex items-center gap-2">
                  <button
                    onClick={async () => {
                      const name = "SECRET_KEY";
                      try {
                        await navigator.clipboard.writeText(name);
                        setSecretKeyNameCopied(true);
                      } catch {
                        const textArea = document.createElement("textarea");
                        textArea.value = name;
                        document.body.appendChild(textArea);
                        textArea.select();
                        document.execCommand("copy");
                        document.body.removeChild(textArea);
                        setSecretKeyNameCopied(true);
                      }
                      setTimeout(() => setSecretKeyNameCopied(false), 2000);
                    }}
                    className={`px-2 py-1 rounded font-mono text-xs transition-all cursor-pointer ${
                      secretKeyNameCopied
                        ? "bg-green-500 text-white"
                        : "bg-gray-100 hover:bg-yellow-400 text-gray-700"
                    }`}
                  >
                    {secretKeyNameCopied ? "✓ SECRET_KEY" : "SECRET_KEY"}
                  </button>
                  <span>= your-random-key</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={async () => {
                      const name = "DEBUG";
                      try {
                        await navigator.clipboard.writeText(name);
                        setDebugNameCopied(true);
                      } catch {
                        const textArea = document.createElement("textarea");
                        textArea.value = name;
                        document.body.appendChild(textArea);
                        textArea.select();
                        document.execCommand("copy");
                        document.body.removeChild(textArea);
                        setDebugNameCopied(true);
                      }
                      setTimeout(() => setDebugNameCopied(false), 2000);
                    }}
                    className={`px-2 py-1 rounded font-mono text-xs transition-all cursor-pointer ${
                      debugNameCopied
                        ? "bg-green-500 text-white"
                        : "bg-gray-100 hover:bg-yellow-400 text-gray-700"
                    }`}
                  >
                    {debugNameCopied ? "✓ DEBUG" : "DEBUG"}
                  </button>
                  <span>=</span>
                  <button
                    onClick={async () => {
                      const value = "False";
                      try {
                        await navigator.clipboard.writeText(value);
                        setDebugValueCopied(true);
                      } catch {
                        const textArea = document.createElement("textarea");
                        textArea.value = value;
                        document.body.appendChild(textArea);
                        textArea.select();
                        document.execCommand("copy");
                        document.body.removeChild(textArea);
                        setDebugValueCopied(true);
                      }
                      setTimeout(() => setDebugValueCopied(false), 2000);
                    }}
                    className={`px-2 py-1 rounded font-mono text-xs transition-all cursor-pointer ${
                      debugValueCopied
                        ? "bg-green-500 text-white"
                        : "bg-gray-100 hover:bg-yellow-400 text-gray-700"
                    }`}
                  >
                    {debugValueCopied ? "✓ False" : "False"}
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={async () => {
                      const name = "DATABASE_URL";
                      try {
                        await navigator.clipboard.writeText(name);
                        setDatabaseUrlNameCopied(true);
                      } catch {
                        const textArea = document.createElement("textarea");
                        textArea.value = name;
                        document.body.appendChild(textArea);
                        textArea.select();
                        document.execCommand("copy");
                        document.body.removeChild(textArea);
                        setDatabaseUrlNameCopied(true);
                      }
                      setTimeout(() => setDatabaseUrlNameCopied(false), 2000);
                    }}
                    className={`px-2 py-1 rounded font-mono text-xs transition-all cursor-pointer ${
                      databaseUrlNameCopied
                        ? "bg-green-500 text-white"
                        : "bg-gray-100 hover:bg-yellow-400 text-gray-700"
                    }`}
                  >
                    {databaseUrlNameCopied ? "✓ DATABASE_URL" : "DATABASE_URL"}
                  </button>
                  <span>= (from DB)</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={async () => {
                      const name = "FRONTEND_URL";
                      try {
                        await navigator.clipboard.writeText(name);
                        setFrontendUrlNameCopied(true);
                      } catch {
                        const textArea = document.createElement("textarea");
                        textArea.value = name;
                        document.body.appendChild(textArea);
                        textArea.select();
                        document.execCommand("copy");
                        document.body.removeChild(textArea);
                        setFrontendUrlNameCopied(true);
                      }
                      setTimeout(() => setFrontendUrlNameCopied(false), 2000);
                    }}
                    className={`px-2 py-1 rounded font-mono text-xs transition-all cursor-pointer ${
                      frontendUrlNameCopied
                        ? "bg-green-500 text-white"
                        : "bg-gray-100 hover:bg-yellow-400 text-gray-700"
                    }`}
                  >
                    {frontendUrlNameCopied ? "✓ FRONTEND_URL" : "FRONTEND_URL"}
                  </button>
                  <span>= (Vercel URL)</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </main>

    </div>
  );
}
