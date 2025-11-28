"use client";

import { useState, useEffect } from "react";
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

// Script type
type ScriptOption = {
  id: string;
  name: string;
  description: string;
  tags: { label: string; color: string }[];
  icon: string;
  content: string;
};

// All available scripts
const SCRIPTS: ScriptOption[] = [
  {
    id: "sumo-script",
    name: "Sumo Script",
    description: "Fullstack project setup - Django + PostgreSQL + Next.js",
    tags: [
      { label: "Django", color: "bg-green-100 text-green-700" },
      { label: "PostgreSQL", color: "bg-blue-100 text-blue-700" },
      { label: "Next.js", color: "bg-purple-100 text-purple-700" },
      { label: "Tailwind", color: "bg-orange-100 text-orange-700" },
    ],
    icon: "🥋",
    content: `#!/bin/bash

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
    sed -i '' "/MIDDLEWARE = \\\\[/a\\\\
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

# Kill any existing processes on ports 8001 and 3000
kill_existing_servers() {
    echo ""
    echo "Checking for existing servers on ports 8001 and 3000..."

    # Kill processes on port 8001 (Django)
    if lsof -ti :8001 >/dev/null 2>&1; then
        echo "  - Killing existing Django server on port 8001..."
        lsof -ti :8001 | xargs kill -9 2>/dev/null || true
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
        do script \\"cd '$project_path/backend' && source venv/bin/activate && python manage.py runserver 8001\\" in front window
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
    echo "  - Backend running on: http://localhost:8001"
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
    if lsof -ti :8001 >/dev/null 2>&1; then
        echo "  ✓ Backend server is running on port 8001"
    else
        echo "  ⚠ Warning: Backend server not detected on port 8001"
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
    open -a "Brave Browser" http://localhost:8001
    sleep 1
    open -a "Brave Browser" http://localhost:8001/admin

    echo ""
    echo "✓ Browser opened with Frontend, Backend API, and Django Admin!"
}

# Project location (set by Build Studio)
project_location="{{PROJECT_PATH}}"

# Project name (set by Build Studio)
project_name="{{PROJECT_NAME}}"

# Display project location
echo ""
echo "============================================"
echo "Build Studio - Project Setup"
echo "============================================"
echo "Project Location: $project_location"
echo "Project Name: $project_name"
echo "============================================"
echo ""

# Validate project name
if [[ -z "$project_name" ]]; then
    echo "Error: Project name is not set."
    exit 1
fi

# Create project location directory if it doesn't exist
if [[ ! -d "$project_location" ]]; then
    echo "Creating directory: $project_location"
    mkdir -p "$project_location"
fi

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
echo "  URL: http://localhost:8001/admin"
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
echo "   Backend API:  http://localhost:8001"
echo "   Django Admin: http://localhost:8001/admin"
echo ""
echo "🔑 Django Admin Credentials:"
echo "   Username: sumo"
echo "   Password: sumo1234"
echo ""
echo "🔄 To restart servers manually:"
echo "   Frontend: cd $project_location/$project_name/frontend && npm run dev"
echo "   Backend:  cd $project_location/$project_name/backend && source venv/bin/activate && python manage.py runserver 8001"
echo ""
echo "📊 Terminal Tabs Overview:"
echo "   Tab 1: This script (completed)"
echo "   Tab 2: Django Backend (running on :8001)"
echo "   Tab 3: Next.js Frontend (running on :3000)"
echo "================================"`,
  },
  {
    id: "flask-react",
    name: "Flask React",
    description: "Fullstack project setup - Flask + MongoDB + React",
    tags: [
      { label: "Flask", color: "bg-gray-100 text-gray-700" },
      { label: "MongoDB", color: "bg-green-100 text-green-700" },
      { label: "React", color: "bg-cyan-100 text-cyan-700" },
      { label: "Vite", color: "bg-yellow-100 text-yellow-700" },
    ],
    icon: "🧪",
    content: `#!/bin/bash

# Exit on any error
set -e

# Flask + MongoDB + React Setup Script

setup_flask_mongodb() {
    local project_path=$1
    local app_name=$2

    echo "Setting up Flask backend with MongoDB..."

    # Create project directory
    mkdir -p "$project_path/backend"
    cd "$project_path/backend"

    # Create virtual environment
    python3 -m venv venv
    source venv/bin/activate

    # Install Flask and dependencies
    pip install --upgrade pip
    pip install flask flask-cors flask-pymongo python-dotenv gunicorn

    # Create Flask app structure
    mkdir -p app
    cat > app/__init__.py <<EOF
from flask import Flask
from flask_cors import CORS
from flask_pymongo import PyMongo

mongo = PyMongo()

def create_app():
    app = Flask(__name__)
    app.config["MONGO_URI"] = "mongodb://localhost:27017/$app_name"
    app.config["SECRET_KEY"] = "your-secret-key"

    CORS(app)
    mongo.init_app(app)

    from app.routes import main
    app.register_blueprint(main)

    return app
EOF

    cat > app/routes.py <<EOF
from flask import Blueprint, jsonify

main = Blueprint('main', __name__)

@main.route('/api/health')
def health():
    return jsonify({"status": "healthy", "message": "Flask API running!"})
EOF

    cat > run.py <<EOF
from app import create_app

app = create_app()

if __name__ == '__main__':
    app.run(debug=True, port=5000)
EOF

    echo "Flask backend setup complete!"
}

setup_react_frontend() {
    local project_path=$1
    cd "$project_path"

    echo "Creating React frontend with Vite..."

    npm create vite@latest frontend -- --template react-ts
    cd "$project_path/frontend"
    npm install
    npm install axios react-router-dom

    echo "React frontend setup complete!"
}

# Main execution
# Project location and name (will be set by Build Studio)
project_location="{{PROJECT_PATH}}"
project_name="{{PROJECT_NAME}}"

echo ""
echo "Setting up Flask + React project..."
echo "Location: $project_location/$project_name"
echo ""

setup_flask_mongodb "$project_location/$project_name" "$project_name"
setup_react_frontend "$project_location/$project_name"

echo ""
echo "✓ Flask + React project ready!"
echo "  Project: $project_location/$project_name"
echo "  Backend: cd backend && source venv/bin/activate && python run.py"
echo "  Frontend: cd frontend && npm run dev"`,
  },
  {
    id: "express-vue",
    name: "Express Vue",
    description: "Fullstack project setup - Express + MySQL + Vue",
    tags: [
      { label: "Express", color: "bg-gray-100 text-gray-700" },
      { label: "MySQL", color: "bg-blue-100 text-blue-700" },
      { label: "Vue.js", color: "bg-emerald-100 text-emerald-700" },
      { label: "TypeScript", color: "bg-indigo-100 text-indigo-700" },
    ],
    icon: "⚡",
    content: `#!/bin/bash

# Exit on any error
set -e

# Express + MySQL + Vue Setup Script

setup_express_mysql() {
    local project_path=$1
    local db_name=$2

    echo "Setting up Express backend with MySQL..."

    # Create project directory
    mkdir -p "$project_path/backend"
    cd "$project_path/backend"

    # Initialize Node.js project
    npm init -y
    npm install express cors mysql2 dotenv helmet morgan
    npm install -D typescript @types/node @types/express ts-node nodemon

    # Initialize TypeScript
    npx tsc --init

    # Create Express app structure
    mkdir -p src/routes src/controllers src/config

    cat > src/index.ts <<EOF
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy', message: 'Express API running!' });
});

app.listen(PORT, () => {
  console.log(\\\`Server running on http://localhost:\\\${PORT}\\\`);
});
EOF

    cat > src/config/database.ts <<EOF
import mysql from 'mysql2/promise';

export const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: '$db_name',
  waitForConnections: true,
  connectionLimit: 10,
});
EOF

    # Create MySQL database
    mysql -u root -e "CREATE DATABASE IF NOT EXISTS $db_name;"

    echo "Express backend setup complete!"
}

setup_vue_frontend() {
    local project_path=$1
    cd "$project_path"

    echo "Creating Vue.js frontend..."

    npm create vue@latest frontend -- --typescript --router --pinia
    cd "$project_path/frontend"
    npm install
    npm install axios

    echo "Vue.js frontend setup complete!"
}

# Main execution
# Project location and name (will be set by Build Studio)
project_location="{{PROJECT_PATH}}"
project_name="{{PROJECT_NAME}}"

echo ""
echo "Setting up Express + Vue project..."
echo "Location: $project_location/$project_name"
echo ""

setup_express_mysql "$project_location/$project_name" "$project_name"
setup_vue_frontend "$project_location/$project_name"

echo ""
echo "✓ Express + Vue project ready!"
echo "  Project: $project_location/$project_name"
echo "  Backend: cd backend && npm run dev"
echo "  Frontend: cd frontend && npm run dev"`,
  },
];

export default function BuildStudio() {
  const [selectedScript, setSelectedScript] = useState<string | null>(null);
  const [projectName, setProjectName] = useState<string>("");
  const [projectPath, setProjectPath] = useState<string>("");
  const [isBuilding, setIsBuilding] = useState(false);
  const [buildStatus, setBuildStatus] = useState<string>("");
  const [editedContent, setEditedContent] = useState<string>("");
  const [isEditing, setIsEditing] = useState(false);
  const [isLocalServer, setIsLocalServer] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  // Check if local server is running on mount
  useEffect(() => {
    const checkServer = async () => {
      try {
        const response = await fetch("http://localhost:4000/health", {
          method: "GET",
          signal: AbortSignal.timeout(2000),
        });
        setIsLocalServer(response.ok);
      } catch {
        setIsLocalServer(false);
      }
    };
    checkServer();
  }, []);

  // Get original script content
  const getOriginalScriptContent = () => {
    const script = SCRIPTS.find((s) => s.id === selectedScript);
    return script?.content || "";
  };

  // Replace placeholders with user-provided values in script
  const injectProjectValues = (content: string, path: string, name: string) => {
    let updatedContent = content;
    // Replace placeholders with actual values
    updatedContent = updatedContent.split('{{PROJECT_PATH}}').join(path);
    updatedContent = updatedContent.split('{{PROJECT_NAME}}').join(name);
    return updatedContent;
  };

  // Get current script content (edited or original)
  const getSelectedScriptContent = () => {
    if (isEditing && editedContent) {
      return editedContent;
    }
    return getOriginalScriptContent();
  };

  // Get selected script name
  const getSelectedScriptName = () => {
    const script = SCRIPTS.find((s) => s.id === selectedScript);
    return script?.name || "No script selected";
  };

  // Local server URL (runs on user's machine)
  const LOCAL_SERVER_URL = "http://localhost:4000";

  // Check if local server is running
  const checkLocalServer = async (): Promise<boolean> => {
    try {
      const response = await fetch(`${LOCAL_SERVER_URL}/health`, {
        method: "GET",
        signal: AbortSignal.timeout(2000), // 2 second timeout
      });
      return response.ok;
    } catch {
      return false;
    }
  };

  // Download script as file (fallback)
  const downloadScript = (content: string, filename: string) => {
    const blob = new Blob([content], { type: "text/x-shellscript" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Handle build - Sends to local server to open Terminal
  const handleBuild = async () => {
    if (!projectName.trim()) {
      setBuildStatus("Please enter a project name!");
      return;
    }

    // Validate project name (no spaces or special characters)
    if (/[/\\:\s]/.test(projectName)) {
      setBuildStatus("Project name cannot contain spaces or special characters!");
      return;
    }

    if (!projectPath.trim()) {
      setBuildStatus("Please enter a project path!");
      return;
    }

    // Validate project path (should be an absolute path)
    if (!projectPath.startsWith("/") && !projectPath.match(/^[A-Za-z]:\\/)) {
      setBuildStatus("Please enter a valid absolute path (e.g., /Users/name/projects or C:\\Users\\name\\projects)");
      return;
    }

    if (!selectedScript) {
      setBuildStatus("Please select a script first!");
      return;
    }

    setIsBuilding(true);
    setBuildStatus("Checking local server connection...");

    // Use edited content if available, otherwise use original
    let scriptContent = editedContent || getOriginalScriptContent();

    // Inject the user-provided project path and name into the script
    const cleanPath = projectPath.trim().replace(/\/+$/, ""); // Remove trailing slashes
    const cleanName = projectName.trim();
    scriptContent = injectProjectValues(scriptContent, cleanPath, cleanName);

    // Try local server first
    const localServerRunning = await checkLocalServer();

    if (localServerRunning) {
      try {
        setBuildStatus("Opening Terminal...");
        const response = await fetch(`${LOCAL_SERVER_URL}/run-script`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            content: scriptContent,
            projectName: cleanName,
          }),
        });

        const data = await response.json();

        if (data.success) {
          setBuildStatus("Terminal opened! Script is running...");
        } else {
          setBuildStatus(data.message || "Failed to open Terminal.");
        }
      } catch (error) {
        console.error("Error:", error);
        setBuildStatus("Error connecting to local server.");
      }
    } else {
      // Fallback: download script
      setBuildStatus("Local server not running. Downloading script instead...");
      const filename = `${cleanName}-setup.sh`;
      downloadScript(scriptContent, filename);
      setBuildStatus(`Script downloaded! Run: bash ~/Downloads/${filename} | Start local server: npm run local-server`);
    }

    setIsBuilding(false);
  };

  // Handle script selection
  const handleSelectScript = (scriptId: string) => {
    if (selectedScript === scriptId) {
      setSelectedScript(null);
      setEditedContent("");
      setIsEditing(false);
    } else {
      setSelectedScript(scriptId);
      const script = SCRIPTS.find((s) => s.id === scriptId);
      setEditedContent(script?.content || "");
      setIsEditing(false);
    }
    setBuildStatus("");
  };

  // Handle edit mode toggle
  const handleToggleEdit = () => {
    if (!isEditing) {
      setEditedContent(getOriginalScriptContent());
    }
    setIsEditing(!isEditing);
  };

  // Handle reset to original
  const handleResetScript = () => {
    setEditedContent(getOriginalScriptContent());
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
              href="/build-studio"
              className="px-4 py-2 bg-yellow-100 text-yellow-700 font-medium rounded-lg transition-all"
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Script Selection Section */}
          <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-2xl p-6 border border-white/30 hover:shadow-yellow-200/50 transition-shadow duration-300">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <span className="text-2xl">🥋</span>
                Build Studio
              </h2>
              {isLocalServer && (
                <p className="text-sm text-green-600 mt-1 flex items-center gap-1">
                  <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  Open Terminal
                </p>
              )}
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
                      setIsCopied(true);
                    } catch {
                      // Fallback for older browsers
                      const textArea = document.createElement("textarea");
                      textArea.value = path;
                      document.body.appendChild(textArea);
                      textArea.select();
                      document.execCommand("copy");
                      document.body.removeChild(textArea);
                      setIsCopied(true);
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

            {/* Project Name Input */}
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Project Name
              </label>
              <input
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="Enter project name (e.g., myapp, ecommerce)"
                className="w-full px-4 py-3 bg-white/50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition-all hover:border-yellow-300"
              />
              <p className="text-xs text-gray-500 mt-1">No spaces or special characters</p>
            </div>

            {/* Project Path Input */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Project Path
              </label>
              <input
                type="text"
                value={projectPath}
                onChange={(e) => setProjectPath(e.target.value)}
                placeholder="Paste your project folder path (e.g., /Users/name/projects)"
                className="w-full px-4 py-3 bg-white/50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition-all hover:border-yellow-300 font-mono text-sm"
              />
              <p className="text-xs text-gray-500 mt-1">
                Full path where project will be created (e.g., /Users/name/projects or C:\Users\name\projects)
              </p>
            </div>

            {/* Script Cards */}
            <div className="space-y-4 max-h-[350px] overflow-y-auto pr-2">
              {SCRIPTS.map((script) => (
                <label
                  key={script.id}
                  className={`block p-4 rounded-xl cursor-pointer transition-all duration-300 border-2 ${
                    selectedScript === script.id
                      ? "bg-gradient-to-r from-yellow-100 to-orange-100 border-yellow-400 shadow-lg"
                      : "bg-white/50 border-gray-200 hover:border-yellow-300 hover:bg-yellow-50"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <input
                      type="checkbox"
                      checked={selectedScript === script.id}
                      onChange={() => handleSelectScript(script.id)}
                      className="w-6 h-6 mt-1 text-yellow-500 border-gray-300 rounded focus:ring-yellow-400 accent-yellow-500"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-2xl">{script.icon}</span>
                        <h3 className="text-lg font-bold text-gray-800">{script.name}</h3>
                      </div>
                      <p className="text-gray-600 text-sm mb-3">
                        {script.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {script.tags.map((tag) => (
                          <span
                            key={tag.label}
                            className={`px-2 py-1 text-xs rounded-full font-medium ${tag.color}`}
                          >
                            {tag.label}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </label>
              ))}
            </div>

            {/* Build Button */}
            <div className="mt-6">
              <button
                onClick={handleBuild}
                disabled={isBuilding || !selectedScript || !projectName.trim() || !projectPath.trim()}
                className={`w-full relative overflow-hidden font-bold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 ${
                  isBuilding
                    ? "bg-gray-400"
                    : "bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 hover:from-green-500 hover:via-blue-600 hover:to-purple-700"
                } text-white`}
              >
                <span className="relative z-10 flex items-center justify-center gap-2 text-lg">
                  {isBuilding ? (
                    <>
                      <svg className="animate-spin h-6 w-6" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Building...
                    </>
                  ) : (
                    <>
                      <span className="text-2xl">🚀</span>
                      Build Project
                    </>
                  )}
                </span>
              </button>
            </div>

            {/* Build Status */}
            {buildStatus && (
              <div className={`mt-4 p-4 rounded-lg text-center font-medium ${
                buildStatus.includes("downloaded")
                  ? "bg-green-100 text-green-700"
                  : buildStatus.includes("Please") || buildStatus.includes("cannot")
                  ? "bg-yellow-100 text-yellow-700"
                  : buildStatus.includes("Error") || buildStatus.includes("Failed")
                  ? "bg-red-100 text-red-700"
                  : "bg-blue-100 text-blue-700"
              }`}>
                {buildStatus}
              </div>
            )}
          </div>

          {/* Script Editor Section */}
          <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-2xl p-6 border border-white/30 hover:shadow-orange-200/50 transition-shadow duration-300">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <span className="text-2xl">{isEditing ? "✏️" : "📜"}</span>
                {selectedScript ? `${getSelectedScriptName()} ${isEditing ? "Editor" : "Preview"}` : "Script Editor"}
              </h2>
              {selectedScript && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                    {getSelectedScriptContent().split('\n').length} lines
                  </span>
                </div>
              )}
            </div>

            {/* Edit Controls */}
            {selectedScript && (
              <div className="flex items-center gap-2 mb-4">
                <button
                  onClick={handleToggleEdit}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${
                    isEditing
                      ? "bg-green-100 text-green-700 hover:bg-green-200"
                      : "bg-blue-100 text-blue-700 hover:bg-blue-200"
                  }`}
                >
                  {isEditing ? (
                    <>
                      <span>👁️</span> Preview Mode
                    </>
                  ) : (
                    <>
                      <span>✏️</span> Edit Script
                    </>
                  )}
                </button>
                {isEditing && (
                  <button
                    onClick={handleResetScript}
                    className="px-4 py-2 rounded-lg font-medium bg-red-100 text-red-700 hover:bg-red-200 transition-all duration-200 flex items-center gap-2"
                  >
                    <span>🔄</span> Reset to Original
                  </button>
                )}
                {isEditing && editedContent !== getOriginalScriptContent() && (
                  <span className="text-sm text-orange-600 bg-orange-100 px-3 py-1 rounded-full font-medium">
                    Modified
                  </span>
                )}
              </div>
            )}

            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl min-h-[400px] max-h-[500px] overflow-hidden border border-gray-700 shadow-inner">
              {selectedScript ? (
                isEditing ? (
                  <textarea
                    value={editedContent}
                    onChange={(e) => setEditedContent(e.target.value)}
                    className="w-full h-[460px] bg-transparent text-green-400 font-mono text-sm leading-relaxed p-5 resize-none outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-inset"
                    spellCheck={false}
                    placeholder="Edit your script here..."
                  />
                ) : (
                  <pre className="whitespace-pre-wrap text-green-400 font-mono text-sm leading-relaxed p-5 h-[460px] overflow-auto">
                    {getSelectedScriptContent()}
                  </pre>
                )
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-gray-500 min-h-[400px]">
                  <span className="text-6xl mb-4 opacity-50">👈</span>
                  <p className="text-center">
                    Select a script from the left<br />
                    <span className="text-yellow-400 font-semibold">to edit and build</span>
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
