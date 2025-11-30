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
  { icon: "🚀", top: "10%", left: "5%", delay: "0s", duration: "7s" },
  { icon: "☁️", top: "20%", right: "8%", delay: "1s", duration: "6s" },
  { icon: "🌐", top: "60%", left: "3%", delay: "2s", duration: "8s" },
  { icon: "📦", bottom: "20%", right: "5%", delay: "0.5s", duration: "7s" },
  { icon: "⚡", top: "40%", right: "3%", delay: "1.5s", duration: "5s" },
  { icon: "🔗", bottom: "30%", left: "8%", delay: "3s", duration: "6s" },
];

export default function DeployPage() {
  // Git commands state
  const [gitInitCopied, setGitInitCopied] = useState(false);
  const [gitRemoteCopied, setGitRemoteCopied] = useState(false);
  const [gitAddCopied, setGitAddCopied] = useState(false);
  const [gitPushCopied, setGitPushCopied] = useState(false);

  // Useful commands state
  const [secretKeyCopied, setSecretKeyCopied] = useState(false);
  const [backendDevCopied, setBackendDevCopied] = useState(false);
  const [frontendDevCopied, setFrontendDevCopied] = useState(false);

  // Render deploy state
  const [buildCmdCopied, setBuildCmdCopied] = useState(false);
  const [startCmdCopied, setStartCmdCopied] = useState(false);
  const [secretKeyNameCopied, setSecretKeyNameCopied] = useState(false);
  const [debugNameCopied, setDebugNameCopied] = useState(false);
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
      <div className="absolute top-0 left-0 w-96 h-96 bg-green-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-emerald-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: "1s" }} />
      <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-teal-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: "2s" }} />

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
            <Link
              href="/module-studio"
              className="px-4 py-2 text-gray-700 font-medium rounded-lg hover:bg-purple-100 hover:text-purple-700 transition-all"
            >
              Design Studio
            </Link>
            <Link
              href="/products"
              className="px-4 py-2 text-gray-700 font-medium rounded-lg hover:bg-blue-100 hover:text-blue-700 transition-all"
            >
              Products
            </Link>
            <Link
              href="/deploy"
              className="px-4 py-2 bg-green-100 text-green-700 font-medium rounded-lg transition-all"
            >
              Deploy
            </Link>
          </nav>
        </div>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Card 1: Push to GitHub */}
          <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-2xl p-6 border border-white/30 hover:shadow-green-200/50 transition-shadow duration-300">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <span className="text-2xl">📤</span>
                Step 1: Push to GitHub
              </h2>
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
                      : "bg-green-400 hover:bg-green-500 text-gray-800"
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
                      : "bg-green-400 hover:bg-green-500 text-gray-800"
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
                      : "bg-green-400 hover:bg-green-500 text-gray-800"
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
                      : "bg-green-400 hover:bg-green-500 text-gray-800"
                  }`}
                >
                  {gitPushCopied ? "✓" : "Copy"}
                </button>
              </div>
            </div>

            {/* GitHub Link */}
            <div className="pt-4 border-t border-gray-200">
              <a
                href="https://github.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full px-4 py-2 bg-gray-800 hover:bg-gray-900 text-white font-medium text-sm rounded-lg transition-all cursor-pointer text-center block"
              >
                Open GitHub
              </a>
            </div>
          </div>

          {/* Card 2: Deploy Frontend (Vercel) */}
          <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-2xl p-6 border border-white/30 hover:shadow-blue-200/50 transition-shadow duration-300">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <span className="text-2xl">▲</span>
                Step 2: Deploy Frontend (Vercel)
              </h2>
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

            {/* Vercel Links */}
            <div className="pt-4 mt-4 border-t border-gray-200 flex gap-2">
              <a
                href="https://vercel.com/new"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 px-4 py-2 bg-black hover:bg-gray-800 text-white font-medium text-sm rounded-lg transition-all cursor-pointer text-center"
              >
                New Project
              </a>
              <a
                href="https://vercel.com/dashboard"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 px-4 py-2 bg-green-400 hover:bg-green-500 text-gray-800 font-medium text-sm rounded-lg transition-all cursor-pointer text-center"
              >
                Dashboard
              </a>
            </div>
          </div>

          {/* Card 3: Deploy Backend (Render) */}
          <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-2xl p-6 border border-white/30 hover:shadow-purple-200/50 transition-shadow duration-300">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <span className="text-2xl">🔧</span>
                Step 3: Deploy Backend (Render)
              </h2>
            </div>

            {/* Database Steps */}
            <div className="mb-4">
              <h3 className="text-sm font-semibold text-gray-700 mb-2">Create PostgreSQL Database</h3>
              <div className="space-y-1 text-xs text-gray-600">
                <div>• New → PostgreSQL → Free plan</div>
                <div>• Wait for status: Available</div>
                <div>• Copy Internal Database URL</div>
              </div>
            </div>

            {/* Web Service Steps */}
            <div className="mb-4 pt-4 border-t border-gray-200">
              <h3 className="text-sm font-semibold text-gray-700 mb-2">Create Web Service</h3>
              <div className="space-y-2 text-xs text-gray-600">
                <div>• Root Directory: <code className="bg-gray-100 px-1 rounded">backend</code></div>
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
                        : "bg-green-400 hover:bg-green-500 text-gray-800"
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
                        : "bg-green-400 hover:bg-green-500 text-gray-800"
                    }`}
                  >
                    {startCmdCopied ? "✓" : "Copy"}
                  </button>
                </div>
              </div>
            </div>

            {/* Environment Variables */}
            <div className="mb-4 pt-4 border-t border-gray-200">
              <h3 className="text-sm font-semibold text-gray-700 mb-2">Environment Variables</h3>
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
                        : "bg-gray-100 hover:bg-green-400 text-gray-700"
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
                        : "bg-gray-100 hover:bg-green-400 text-gray-700"
                    }`}
                  >
                    {debugNameCopied ? "✓ DEBUG" : "DEBUG"}
                  </button>
                  <span>= False</span>
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
                        : "bg-gray-100 hover:bg-green-400 text-gray-700"
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
                        : "bg-gray-100 hover:bg-green-400 text-gray-700"
                    }`}
                  >
                    {frontendUrlNameCopied ? "✓ FRONTEND_URL" : "FRONTEND_URL"}
                  </button>
                  <span>= (Vercel URL)</span>
                </div>
              </div>
            </div>

            {/* Render Link */}
            <div className="pt-4 border-t border-gray-200">
              <a
                href="https://dashboard.render.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-medium text-sm rounded-lg transition-all cursor-pointer text-center block"
              >
                Open Render Dashboard
              </a>
            </div>
          </div>

        </div>

        {/* Second Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">

          {/* Card 4: Useful Commands */}
          <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-2xl p-6 border border-white/30 hover:shadow-yellow-200/50 transition-shadow duration-300">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <span className="text-2xl">⚡</span>
                Useful Commands
              </h2>
            </div>

            {/* Generate Secret Key */}
            <div className="mb-4">
              <h3 className="text-sm font-semibold text-gray-700 mb-2">Generate Django Secret Key</h3>
              <div className="flex items-center gap-2">
                <div className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg font-mono text-xs text-gray-600 truncate">
                  python -c "import secrets; print(secrets.token_urlsafe(50))"
                </div>
                <button
                  onClick={async () => {
                    const cmd = 'python -c "import secrets; print(secrets.token_urlsafe(50))"';
                    try {
                      await navigator.clipboard.writeText(cmd);
                      setSecretKeyCopied(true);
                    } catch {
                      const textArea = document.createElement("textarea");
                      textArea.value = cmd;
                      document.body.appendChild(textArea);
                      textArea.select();
                      document.execCommand("copy");
                      document.body.removeChild(textArea);
                      setSecretKeyCopied(true);
                    }
                    setTimeout(() => setSecretKeyCopied(false), 2000);
                  }}
                  className={`px-3 py-2 rounded-lg font-medium text-sm transition-all cursor-pointer ${
                    secretKeyCopied
                      ? "bg-green-500 text-white"
                      : "bg-green-400 hover:bg-green-500 text-gray-800"
                  }`}
                >
                  {secretKeyCopied ? "✓" : "Copy"}
                </button>
              </div>
            </div>

            {/* Local Development */}
            <div className="pt-4 border-t border-gray-200">
              <h3 className="text-sm font-semibold text-gray-700 mb-2">Local Development</h3>

              {/* Backend */}
              <div className="mb-3">
                <span className="text-xs text-gray-500">Backend:</span>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg font-mono text-xs text-gray-600">
                    source venv/bin/activate && python manage.py runserver
                  </div>
                  <button
                    onClick={async () => {
                      const cmd = "source venv/bin/activate && python manage.py runserver";
                      try {
                        await navigator.clipboard.writeText(cmd);
                        setBackendDevCopied(true);
                      } catch {
                        const textArea = document.createElement("textarea");
                        textArea.value = cmd;
                        document.body.appendChild(textArea);
                        textArea.select();
                        document.execCommand("copy");
                        document.body.removeChild(textArea);
                        setBackendDevCopied(true);
                      }
                      setTimeout(() => setBackendDevCopied(false), 2000);
                    }}
                    className={`px-3 py-2 rounded-lg font-medium text-sm transition-all cursor-pointer ${
                      backendDevCopied
                        ? "bg-green-500 text-white"
                        : "bg-green-400 hover:bg-green-500 text-gray-800"
                    }`}
                  >
                    {backendDevCopied ? "✓" : "Copy"}
                  </button>
                </div>
              </div>

              {/* Frontend */}
              <div>
                <span className="text-xs text-gray-500">Frontend:</span>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg font-mono text-xs text-gray-600">
                    npm run dev
                  </div>
                  <button
                    onClick={async () => {
                      const cmd = "npm run dev";
                      try {
                        await navigator.clipboard.writeText(cmd);
                        setFrontendDevCopied(true);
                      } catch {
                        const textArea = document.createElement("textarea");
                        textArea.value = cmd;
                        document.body.appendChild(textArea);
                        textArea.select();
                        document.execCommand("copy");
                        document.body.removeChild(textArea);
                        setFrontendDevCopied(true);
                      }
                      setTimeout(() => setFrontendDevCopied(false), 2000);
                    }}
                    className={`px-3 py-2 rounded-lg font-medium text-sm transition-all cursor-pointer ${
                      frontendDevCopied
                        ? "bg-green-500 text-white"
                        : "bg-green-400 hover:bg-green-500 text-gray-800"
                    }`}
                  >
                    {frontendDevCopied ? "✓" : "Copy"}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Card 5: Troubleshooting */}
          <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-2xl p-6 border border-white/30 hover:shadow-red-200/50 transition-shadow duration-300">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <span className="text-2xl">🔍</span>
                Troubleshooting
              </h2>
            </div>

            <div className="space-y-3 text-sm">
              <div className="p-3 bg-red-50 border border-red-100 rounded-lg">
                <div className="font-semibold text-red-700">CORS error</div>
                <div className="text-red-600 text-xs mt-1">Check FRONTEND_URL in backend env vars matches your Vercel URL</div>
              </div>

              <div className="p-3 bg-orange-50 border border-orange-100 rounded-lg">
                <div className="font-semibold text-orange-700">Failed to fetch</div>
                <div className="text-orange-600 text-xs mt-1">Check NEXT_PUBLIC_API_URL in frontend env vars</div>
              </div>

              <div className="p-3 bg-yellow-50 border border-yellow-100 rounded-lg">
                <div className="font-semibold text-yellow-700">requirements.txt not found</div>
                <div className="text-yellow-600 text-xs mt-1">Set Root Directory to backend in Render</div>
              </div>

              <div className="p-3 bg-blue-50 border border-blue-100 rounded-lg">
                <div className="font-semibold text-blue-700">No Next.js version detected</div>
                <div className="text-blue-600 text-xs mt-1">Set Root Directory to frontend in Vercel</div>
              </div>

              <div className="p-3 bg-purple-50 border border-purple-100 rounded-lg">
                <div className="font-semibold text-purple-700">502 Bad Gateway</div>
                <div className="text-purple-600 text-xs mt-1">Wait for backend to fully deploy, check logs</div>
              </div>
            </div>
          </div>

        </div>
      </main>

    </div>
  );
}
