"use client";

import { useState, useEffect, useCallback } from "react";
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

// Pre-loaded fullstack script
const FULLSTACK_SCRIPT = `#!/bin/bash

# Exit on any error
set -e

# Setup Django and PostgreSQL
setup_django_postgres() {
    local project_path=$1
    local app_name=$2
    local pg_user=$3
    local pg_password=$4
    local pg_db=$5

    # Ensure PostgreSQL is running (macOS with Homebrew)
    brew services start postgresql@14 2>/dev/null || echo "PostgreSQL may already be running"

    # Add PostgreSQL to PATH for this session
    export PATH="/opt/homebrew/opt/postgresql@14/bin:$PATH"

    # Create PostgreSQL database and user
    /opt/homebrew/opt/postgresql@14/bin/psql postgres <<EOF
DROP DATABASE IF EXISTS $pg_db;
DROP USER IF EXISTS $pg_user;
CREATE USER $pg_user WITH PASSWORD '$pg_password';
CREATE DATABASE $pg_db;
ALTER DATABASE $pg_db OWNER TO $pg_user;
GRANT ALL PRIVILEGES ON DATABASE $pg_db TO $pg_user;
\\c $pg_db
GRANT ALL ON SCHEMA public TO $pg_user;
\\q
EOF

    # Navigate to project directory
    mkdir -p "$project_path/backend"
    cd "$project_path/backend"

    # Create virtual environment
    python3 -m venv venv
    source venv/bin/activate

    # Install Django and dependencies
    pip install --upgrade pip
    pip install django psycopg2-binary djangorestframework \\
                django-cors-headers django-environ gunicorn

    # Create Django project
    django-admin startproject myproject .
    python manage.py startapp "$app_name"

    # Configure settings.py
    settings_file="myproject/settings.py"

    # Update INSTALLED_APPS
    sed -i '' "/django.contrib.staticfiles'/a\\\\
    'rest_framework',\\\\
    'corsheaders',\\\\
    '$app_name'," "$settings_file"

    # Update MIDDLEWARE
    sed -i '' "/MIDDLEWARE = \\[/a\\\\
    'corsheaders.middleware.CorsMiddleware'," "$settings_file"

    # Configure database settings
    cat >> "$settings_file" <<EOF

# Database Configuration
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': '$pg_db',
        'USER': '$pg_user',
        'PASSWORD': '$pg_password',
        'HOST': 'localhost',
        'PORT': '5432',
    }
}

# CORS Settings
CORS_ORIGIN_ALLOW_ALL = True
EOF

    # Create .env file for sensitive configuration
    cat > .env <<EOF
SECRET_KEY=$(python3 -c "import secrets; print(secrets.token_hex(50))")
DEBUG=True
DATABASE_URL=postgresql://$pg_user:$pg_password@localhost:5432/$pg_db
EOF

    # Run database migrations
    python manage.py makemigrations
    python manage.py migrate

    # Create superuser automatically
    echo "Creating Django superuser..."
    DJANGO_SUPERUSER_PASSWORD=sumo1234 python manage.py createsuperuser \\
        --noinput \\
        --username sumo \\
        --email sumo@example.com

    echo ""
    echo "Django and PostgreSQL setup complete!"
    echo "Superuser created - Username: sumo, Password: sumo1234"
}

# Setup Next.js frontend
setup_nextjs_frontend() {
    local project_path=$1

    # Navigate to project directory
    cd "$project_path"

    echo "Creating Next.js frontend..."

    # Create Next.js app with all defaults (no prompts)
    # Automatically answer "yes" to React Compiler question
    echo "yes" | npx create-next-app@latest frontend \\
        --typescript \\
        --tailwind \\
        --eslint \\
        --app \\
        --src-dir \\
        --import-alias "@/*" \\
        --no-git

    # Navigate to frontend directory and install dependencies explicitly
    cd "$project_path/frontend"

    echo "Installing frontend dependencies..."
    npm install

    # Verify installation
    if [ -f "package.json" ] && [ -d "node_modules" ]; then
        echo "✓ Next.js frontend setup complete!"
        echo "✓ Dependencies installed successfully"
    else
        echo "⚠ Warning: Frontend setup may have issues"
        echo "Please check the frontend directory manually"
    fi
}

# Kill any existing processes on ports 8000 and 3000
kill_existing_servers() {
    echo ""
    echo "Checking for existing servers on ports 8000 and 3000..."

    # Kill processes on port 8000 (Django)
    if lsof -ti :8000 >/dev/null 2>&1; then
        echo "  - Killing existing Django server on port 8000..."
        lsof -ti :8000 | xargs kill -9 2>/dev/null || true
    fi

    # Kill processes on port 3000 (Next.js)
    if lsof -ti :3000 >/dev/null 2>&1; then
        echo "  - Killing existing Next.js server on port 3000..."
        lsof -ti :3000 | xargs kill -9 2>/dev/null || true
    fi

    echo "Ports cleared!"
}

# Start development servers in new terminal tabs (macOS)
start_dev_servers() {
    local project_path=$1

    echo ""
    echo "Starting development servers in new terminal tabs..."

    # Start Django backend in a new tab
    osascript -e "tell application \\"Terminal\\"
        tell application \\"System Events\\" to keystroke \\"t\\" using {command down}
        do script \\"cd '$project_path/backend' && source venv/bin/activate && python manage.py runserver\\" in front window
    end tell"

    # Wait for backend to start
    echo "  - Starting Django backend..."
    sleep 3

    # Start Next.js frontend in a new tab
    osascript -e "tell application \\"Terminal\\"
        tell application \\"System Events\\" to keystroke \\"t\\" using {command down}
        do script \\"cd '$project_path/frontend' && npm run dev\\" in front window
    end tell"

    # Wait for frontend to start
    echo "  - Starting Next.js frontend..."
    sleep 3

    echo "Development servers started!"
    echo "  - Backend running on: http://localhost:8000"
    echo "  - Frontend running on: http://localhost:3000"
}

# Open Brave browser with localhost tabs
open_browser() {
    echo ""
    echo "Opening Brave browser with development URLs..."

    # Wait for servers to fully start up
    echo "  - Waiting for servers to fully initialize..."
    sleep 5

    # Check if servers are running
    if lsof -ti :8000 >/dev/null 2>&1; then
        echo "  ✓ Backend server is running on port 8000"
    else
        echo "  ⚠ Warning: Backend server not detected on port 8000"
    fi

    if lsof -ti :3000 >/dev/null 2>&1; then
        echo "  ✓ Frontend server is running on port 3000"
    else
        echo "  ⚠ Warning: Frontend server not detected on port 3000"
    fi

    # Open Brave with all URLs in new tabs
    echo "  - Opening browser tabs..."
    open -a "Brave Browser" http://localhost:3000
    sleep 1
    open -a "Brave Browser" http://localhost:8000
    sleep 1
    open -a "Brave Browser" http://localhost:8000/admin

    echo ""
    echo "✓ Browser opened with Frontend, Backend API, and Django Admin!"
}

# Set default project location
project_location="/Users/thiyagarajanbalakrishnan/Documents/supersumo/MyApps"

# Project name will be set by the UI (replaced at runtime)
# PROJECT_NAME_PLACEHOLDER will be replaced with actual project name
project_name="PROJECT_NAME_PLACEHOLDER"

# Display project location
echo ""
echo "Projects will be created in: $project_location"
echo ""

# Auto-generate other values based on project name
app_name="\${project_name}app"
pg_user="\${project_name}user"
pg_password="sumo123"
pg_db="\${project_name}db"

echo ""
echo "=== Project Configuration ==="
echo "Project Path: $project_location/$project_name"
echo "App Name: $app_name"
echo "Database User: $pg_user"
echo "Database Password: $pg_password"
echo "Database Name: $pg_db"
echo "============================="
echo ""

# Execute setup
setup_django_postgres "$project_location/$project_name" "$app_name" "$pg_user" "$pg_password" "$pg_db"
setup_nextjs_frontend "$project_location/$project_name"

echo ""
echo "=== Setup Complete! ==="
echo "Backend: $project_location/$project_name/backend"
echo "Frontend: $project_location/$project_name/frontend"
echo ""
echo "Django Admin:"
echo "  URL: http://localhost:8000/admin"
echo "  Username: sumo"
echo "  Password: sumo1234"
echo "========================"
echo ""

# Kill any existing servers before starting new ones
kill_existing_servers

# Automatically start dev servers
start_dev_servers "$project_location/$project_name"

# Open Brave browser with both URLs
open_browser

echo ""
echo "================================"
echo "✓ All systems ready! Happy coding!"
echo "================================"
echo ""
echo "📍 Your Project Location:"
echo "   $project_location/$project_name"
echo ""
echo "🌐 Access URLs:"
echo "   Frontend:     http://localhost:3000"
echo "   Backend API:  http://localhost:8000"
echo "   Django Admin: http://localhost:8000/admin"
echo ""
echo "🔑 Django Admin Credentials:"
echo "   Username: sumo"
echo "   Password: sumo1234"
echo ""
echo "🔄 To restart servers manually:"
echo "   Frontend: cd $project_location/$project_name/frontend && npm run dev"
echo "   Backend:  cd $project_location/$project_name/backend && source venv/bin/activate && python manage.py runserver"
echo ""
echo "📊 Terminal Tabs Overview:"
echo "   Tab 1: This script (completed)"
echo "   Tab 2: Django Backend (running on :8000)"
echo "   Tab 3: Next.js Frontend (running on :3000)"
echo "================================"`;

export default function CreateStudio() {
  const [isRunning, setIsRunning] = useState(false);
  const [status, setStatus] = useState("");
  const [projectName, setProjectName] = useState("");
  const [serverRunning, setServerRunning] = useState<boolean | null>(null);

  // Check if local server is running
  const checkServerStatus = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:4000/health", {
        method: "GET",
      });
      const data = await response.json();
      setServerRunning(data.status === "running");
    } catch {
      setServerRunning(false);
    }
  }, []);

  // Check server status on mount and periodically
  useEffect(() => {
    checkServerStatus();
    const interval = setInterval(checkServerStatus, 5000); // Check every 5 seconds
    return () => clearInterval(interval);
  }, [checkServerStatus]);

  const handleRunScript = async () => {
    // Check if server is running first
    if (!serverRunning) {
      setStatus("Waiting for local server... Run: npm run local-server");
      return;
    }

    // Validate project name
    if (!projectName.trim()) {
      setStatus("Error: Please enter a project name.");
      return;
    }

    // Validate project name format (no slashes, backslashes, or spaces)
    if (/[/\\:\s]/.test(projectName)) {
      setStatus("Error: Project name cannot contain slashes, backslashes, colons, or spaces.");
      return;
    }

    setIsRunning(true);
    setStatus("Running script...");

    // Generate the script with the project name (replace all occurrences)
    const scriptWithProjectName = FULLSTACK_SCRIPT.replaceAll(
      "PROJECT_NAME_PLACEHOLDER",
      projectName.trim()
    );

    try {
      const response = await fetch("http://localhost:4000/run-script", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: scriptWithProjectName,
          projectName: projectName.trim(),
        }),
      });

      const data = await response.json();

      if (data.success) {
        setStatus(`Script is running for project "${projectName}"! Check your terminal.`);
      } else {
        setStatus(data.message || "Failed to run script.");
      }
    } catch {
      // Re-check server status
      await checkServerStatus();
      setStatus("Connection failed. Please ensure local server is running.");
    }

    setIsRunning(false);
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
              href="/sumo-studio"
              className="px-4 py-2 text-gray-700 font-medium rounded-lg hover:bg-yellow-100 hover:text-yellow-700 transition-all"
            >
              Sumo Studio
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
              href="/design-studio"
              className="px-4 py-2 text-gray-700 font-medium rounded-lg hover:bg-purple-100 hover:text-purple-700 transition-all"
            >
              Design Studio
            </Link>
            <Link
              href="/script-studio"
              className="px-4 py-2 text-gray-700 font-medium rounded-lg hover:bg-green-100 hover:text-green-700 transition-all"
            >
              Script Studio
            </Link>
          </nav>
        </div>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Form */}
          <div>
            {/* Page Title */}
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl">🏗️</span>
              <h2 className="text-2xl font-bold text-gray-800">Create Project</h2>
            </div>

            {/* Server Status Indicator */}
            <div className={`flex items-center gap-2 p-3 rounded-lg mb-4 ${
              serverRunning === null
                ? "bg-gray-100 text-gray-600"
                : serverRunning
                ? "bg-green-100 text-green-700"
                : "bg-yellow-100 text-yellow-700"
            }`}>
              <span className={`w-3 h-3 rounded-full ${
                serverRunning === null
                  ? "bg-gray-400 animate-pulse"
                  : serverRunning
                  ? "bg-green-500"
                  : "bg-yellow-500 animate-pulse"
              }`} />
              <span className="font-medium text-sm">
                {serverRunning === null
                  ? "Checking local server..."
                  : serverRunning
                  ? "Local server connected"
                  : "Local server offline - Run: npm run local-server"}
              </span>
            </div>

            {/* Project Name Input */}
            <div className="mb-4">
              <label htmlFor="projectName" className="block text-base font-semibold text-gray-800 mb-1">
                Project Name
              </label>
              <p className="text-sm text-gray-500 mb-3 flex items-center gap-2">
                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-blue-100 text-blue-600 text-xs font-medium">i</span>
                Use lowercase letters only & no numbers. New tab will open automatically — be patient.
              </p>
              <input
                type="text"
                id="projectName"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="e.g., myapp, blog, ecommerce"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-gray-800 placeholder-gray-400 bg-gray-50 hover:bg-white hover:border-gray-300"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mb-4">
              <button
                onClick={handleRunScript}
                disabled={isRunning}
                className={`flex-1 px-6 py-3 font-medium text-sm rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 ${
                  isRunning
                    ? "bg-gray-400 text-white"
                    : "bg-yellow-400 hover:bg-yellow-500 text-gray-800"
                }`}
              >
                {isRunning ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Running...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <span>🚀</span>
                    Run Script
                  </span>
                )}
              </button>

              <a
                href="https://sumo-studio.vercel.app/sumo-studio"
                className="flex-1 px-6 py-3 font-medium text-sm rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] bg-yellow-400 hover:bg-yellow-500 text-gray-800 flex items-center justify-center gap-2"
              >
                <span>🥋</span>
                Go to Sumo Studio
              </a>
            </div>

            {status && (
              <div className={`p-4 rounded-lg font-medium ${
                status.includes("Error") || status.includes("Failed")
                  ? "bg-red-100 text-red-700"
                  : status.includes("running") || status.includes("Running")
                  ? "bg-green-100 text-green-700"
                  : "bg-blue-100 text-blue-700"
              }`}>
                {status}
              </div>
            )}
          </div>

          {/* Right Column - Script Preview */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">📄</span>
              <h3 className="text-xl font-bold text-gray-800">Script Preview</h3>
            </div>
            <p className="text-gray-600 text-sm mb-4">Django + PostgreSQL + Next.js</p>

            {/* Script Preview */}
            <div className="bg-slate-900 rounded-2xl p-4 text-left h-[500px] overflow-auto">
              <pre className="text-green-400 text-xs font-mono whitespace-pre-wrap">
                {FULLSTACK_SCRIPT}
              </pre>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
