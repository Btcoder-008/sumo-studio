"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

// Types
type CheckboxOption = {
  id: string;
  label: string;
  checked: boolean;
  icon: string;
};

type ReferenceLink = {
  id: string;
  url: string;
  description: string;
};

type UploadedImage = {
  id: string;
  name: string;
  preview: string;
  description: string;
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
  { icon: "⚙️", top: "10%", left: "5%", delay: "0s", duration: "7s" },
  { icon: "🗄️", top: "20%", right: "8%", delay: "1s", duration: "6s" },
  { icon: "🔧", top: "60%", left: "3%", delay: "2s", duration: "8s" },
  { icon: "🔌", bottom: "20%", right: "5%", delay: "0.5s", duration: "7s" },
  { icon: "🛡️", top: "40%", right: "3%", delay: "1.5s", duration: "5s" },
  { icon: "📡", bottom: "30%", left: "8%", delay: "3s", duration: "6s" },
];

// API Type options
const apiTypeOptions: CheckboxOption[] = [
  { id: "rest", label: "REST API", checked: false, icon: "🔗" },
  { id: "graphql", label: "GraphQL", checked: false, icon: "◼️" },
  { id: "grpc", label: "gRPC", checked: false, icon: "📡" },
  { id: "websocket", label: "WebSocket", checked: false, icon: "🔌" },
  { id: "webhook", label: "Webhooks", checked: false, icon: "🪝" },
];

// Authentication options
const authOptions: CheckboxOption[] = [
  { id: "jwt", label: "JWT Authentication", checked: false, icon: "🔐" },
  { id: "oauth2", label: "OAuth 2.0", checked: false, icon: "🔑" },
  { id: "session", label: "Session-based Auth", checked: false, icon: "🍪" },
  { id: "api-key", label: "API Key Auth", checked: false, icon: "🗝️" },
  { id: "social-auth", label: "Social Login (Google, Facebook)", checked: false, icon: "👥" },
  { id: "2fa", label: "Two-Factor Authentication", checked: false, icon: "📱" },
  { id: "sso", label: "Single Sign-On (SSO)", checked: false, icon: "🔓" },
];

// Model/Entity options
const modelOptions: CheckboxOption[] = [
  { id: "user", label: "User Model", checked: false, icon: "👤" },
  { id: "profile", label: "Profile Model", checked: false, icon: "📋" },
  { id: "product", label: "Product Model", checked: false, icon: "📦" },
  { id: "order", label: "Order Model", checked: false, icon: "🛒" },
  { id: "payment", label: "Payment Model", checked: false, icon: "💳" },
  { id: "category", label: "Category Model", checked: false, icon: "📁" },
  { id: "comment", label: "Comment Model", checked: false, icon: "💬" },
  { id: "notification", label: "Notification Model", checked: false, icon: "🔔" },
  { id: "file", label: "File/Media Model", checked: false, icon: "📎" },
  { id: "settings", label: "Settings Model", checked: false, icon: "⚙️" },
  { id: "audit-log", label: "Audit Log Model", checked: false, icon: "📝" },
  { id: "custom", label: "Custom Models", checked: false, icon: "✨" },
];

// Feature options
const featureOptions: CheckboxOption[] = [
  { id: "crud", label: "CRUD Operations", checked: false, icon: "📝" },
  { id: "pagination", label: "Pagination", checked: false, icon: "📄" },
  { id: "search", label: "Search & Filtering", checked: false, icon: "🔍" },
  { id: "sorting", label: "Sorting", checked: false, icon: "↕️" },
  { id: "file-upload", label: "File Upload", checked: false, icon: "📤" },
  { id: "email", label: "Email Service", checked: false, icon: "📧" },
  { id: "caching", label: "Caching", checked: false, icon: "💾" },
  { id: "rate-limiting", label: "Rate Limiting", checked: false, icon: "⏱️" },
  { id: "logging", label: "Logging & Monitoring", checked: false, icon: "📊" },
  { id: "validation", label: "Input Validation", checked: false, icon: "✅" },
  { id: "error-handling", label: "Error Handling", checked: false, icon: "⚠️" },
  { id: "background-tasks", label: "Background Tasks/Jobs", checked: false, icon: "⏰" },
  { id: "scheduling", label: "Task Scheduling (Cron)", checked: false, icon: "📅" },
  { id: "notifications", label: "Push Notifications", checked: false, icon: "🔔" },
];

// Security options
const securityOptions: CheckboxOption[] = [
  { id: "cors", label: "CORS Configuration", checked: false, icon: "🌐" },
  { id: "csrf", label: "CSRF Protection", checked: false, icon: "🛡️" },
  { id: "xss", label: "XSS Prevention", checked: false, icon: "🚫" },
  { id: "sql-injection", label: "SQL Injection Prevention", checked: false, icon: "💉" },
  { id: "encryption", label: "Data Encryption", checked: false, icon: "🔒" },
  { id: "https", label: "HTTPS/SSL", checked: false, icon: "🔐" },
  { id: "input-sanitization", label: "Input Sanitization", checked: false, icon: "🧹" },
  { id: "audit-trail", label: "Audit Trail", checked: false, icon: "📋" },
];

// Deployment options
const deploymentOptions: CheckboxOption[] = [
  { id: "docker", label: "Docker", checked: false, icon: "🐳" },
  { id: "kubernetes", label: "Kubernetes", checked: false, icon: "☸️" },
  { id: "aws", label: "AWS", checked: false, icon: "☁️" },
  { id: "gcp", label: "Google Cloud", checked: false, icon: "🌥️" },
  { id: "azure", label: "Azure", checked: false, icon: "🔵" },
  { id: "railway", label: "Railway", checked: false, icon: "🚂" },
  { id: "heroku", label: "Heroku", checked: false, icon: "🟣" },
  { id: "vercel", label: "Vercel", checked: false, icon: "▲" },
];

// Testing options
const testingOptions: CheckboxOption[] = [
  { id: "unit-tests", label: "Unit Tests", checked: false, icon: "🧪" },
  { id: "integration-tests", label: "Integration Tests", checked: false, icon: "🔗" },
  { id: "e2e-tests", label: "E2E Tests", checked: false, icon: "🎯" },
  { id: "api-tests", label: "API Tests", checked: false, icon: "📡" },
  { id: "load-tests", label: "Load/Performance Tests", checked: false, icon: "📈" },
  { id: "mocking", label: "Mocking & Fixtures", checked: false, icon: "🎭" },
];

export default function BackendStudio() {
  // Form state
  const [reviewEntireProject, setReviewEntireProject] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [apiTypes, setApiTypes] = useState<CheckboxOption[]>(apiTypeOptions);
  const [authMethods, setAuthMethods] = useState<CheckboxOption[]>(authOptions);
  const [models, setModels] = useState<CheckboxOption[]>(modelOptions);
  const [customModels, setCustomModels] = useState("");
  const [features, setFeatures] = useState<CheckboxOption[]>(featureOptions);
  const [security, setSecurity] = useState<CheckboxOption[]>(securityOptions);
  const [deployment, setDeployment] = useState<CheckboxOption[]>(deploymentOptions);
  const [testing, setTesting] = useState<CheckboxOption[]>(testingOptions);

  const [referenceLinks, setReferenceLinks] = useState<ReferenceLink[]>([
    { id: "1", url: "", description: "" }
  ]);
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);

  const [additionalNotes, setAdditionalNotes] = useState("");

  // Generated prompt state
  const [generatedPrompt, setGeneratedPrompt] = useState("");
  const [copied, setCopied] = useState(false);

  // File input refs
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle checkbox change for any checkbox group
  const handleCheckboxChange = (
    id: string,
    setter: React.Dispatch<React.SetStateAction<CheckboxOption[]>>
  ) => {
    setter((prev) =>
      prev.map((option) =>
        option.id === id ? { ...option, checked: !option.checked } : option
      )
    );
  };

  // Add new reference link
  const addReferenceLink = () => {
    setReferenceLinks((prev) => [
      ...prev,
      { id: Date.now().toString(), url: "", description: "" }
    ]);
  };

  // Remove reference link
  const removeReferenceLink = (id: string) => {
    if (referenceLinks.length > 1) {
      setReferenceLinks((prev) => prev.filter((link) => link.id !== id));
    }
  };

  // Update reference link
  const updateReferenceLink = (id: string, field: "url" | "description", value: string) => {
    setReferenceLinks((prev) =>
      prev.map((link) =>
        link.id === id ? { ...link, [field]: value } : link
      )
    );
  };

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setUploadedImages((prev) => [
            ...prev,
            {
              id: Date.now().toString() + Math.random(),
              name: file.name,
              preview: reader.result as string,
              description: ""
            }
          ]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  // Remove uploaded image
  const removeImage = (id: string) => {
    setUploadedImages((prev) => prev.filter((img) => img.id !== id));
  };

  // Update image description
  const updateImageDescription = (id: string, description: string) => {
    setUploadedImages((prev) =>
      prev.map((img) =>
        img.id === id ? { ...img, description } : img
      )
    );
  };

  // Check if custom models is selected
  const showCustomModels = models.find((m) => m.id === "custom")?.checked;

  // Generate the prompt
  const generatePrompt = () => {
    const selectedApiTypes = apiTypes.filter((opt) => opt.checked).map((opt) => opt.label);
    const selectedAuth = authMethods.filter((opt) => opt.checked).map((opt) => opt.label);
    const selectedModels = models.filter((opt) => opt.checked).map((opt) => opt.label);
    const selectedFeatures = features.filter((opt) => opt.checked).map((opt) => opt.label);
    const selectedSecurity = security.filter((opt) => opt.checked).map((opt) => opt.label);
    const selectedDeployment = deployment.filter((opt) => opt.checked).map((opt) => opt.label);
    const selectedTesting = testing.filter((opt) => opt.checked).map((opt) => opt.label);
    const validLinks = referenceLinks.filter((link) => link.url.trim());

    let prompt = "";

    // Review Entire Project
    if (reviewEntireProject.trim()) {
      prompt += `## Review Entire Project\n`;
      prompt += `${reviewEntireProject}\n\n`;
    }

    // Project Description
    if (projectDescription.trim()) {
      prompt += `## Project Description\n`;
      prompt += `${projectDescription}\n\n`;
    }

    prompt += `## Backend Design Request\n\n`;

    // API Types
    if (selectedApiTypes.length > 0) {
      prompt += `### API Type(s)\n`;
      selectedApiTypes.forEach((api) => {
        prompt += `- ${api}\n`;
      });
      prompt += `\n`;
    }

    // Authentication
    if (selectedAuth.length > 0) {
      prompt += `### Authentication Methods\n`;
      selectedAuth.forEach((auth) => {
        prompt += `- ${auth}\n`;
      });
      prompt += `\n`;
    }

    // Models/Entities
    if (selectedModels.length > 0) {
      prompt += `### Data Models/Entities\n`;
      selectedModels.forEach((model) => {
        prompt += `- ${model}\n`;
      });
      if (showCustomModels && customModels.trim()) {
        prompt += `Custom models: ${customModels}\n`;
      }
      prompt += `\n`;
    }

    // Features
    if (selectedFeatures.length > 0) {
      prompt += `### Features Required\n`;
      selectedFeatures.forEach((feature) => {
        prompt += `- ${feature}\n`;
      });
      prompt += `\n`;
    }

    // Security
    if (selectedSecurity.length > 0) {
      prompt += `### Security Requirements\n`;
      selectedSecurity.forEach((sec) => {
        prompt += `- ${sec}\n`;
      });
      prompt += `\n`;
    }

    // Deployment
    if (selectedDeployment.length > 0) {
      prompt += `### Deployment Platform(s)\n`;
      selectedDeployment.forEach((dep) => {
        prompt += `- ${dep}\n`;
      });
      prompt += `\n`;
    }

    // Testing
    if (selectedTesting.length > 0) {
      prompt += `### Testing Requirements\n`;
      selectedTesting.forEach((test) => {
        prompt += `- ${test}\n`;
      });
      prompt += `\n`;
    }

    // Reference Links
    if (validLinks.length > 0) {
      prompt += `### Reference Links\n`;
      validLinks.forEach((link, index) => {
        prompt += `${index + 1}. ${link.url}`;
        if (link.description.trim()) {
          prompt += ` - ${link.description}`;
        }
        prompt += `\n`;
      });
      prompt += `\n`;
    }

    // Reference Images
    if (uploadedImages.length > 0) {
      prompt += `### Reference Diagrams/Images\n`;
      prompt += `(${uploadedImages.length} image(s) uploaded for reference)\n`;
      uploadedImages.forEach((img, index) => {
        prompt += `${index + 1}. ${img.name}`;
        if (img.description.trim()) {
          prompt += ` - ${img.description}`;
        }
        prompt += `\n`;
      });
      prompt += `\n`;
    }

    // Additional Notes
    if (additionalNotes.trim()) {
      prompt += `### Additional Requirements\n`;
      prompt += `${additionalNotes}\n\n`;
    }

    // Footer instructions
    prompt += `---\n\n`;
    prompt += `Please create a complete, production-ready backend implementation with:\n`;
    prompt += `1. Clean, well-organized code structure\n`;
    prompt += `2. Proper separation of concerns (models, views/controllers, services)\n`;
    prompt += `3. Type safety and proper typing\n`;
    prompt += `4. Comprehensive error handling\n`;
    prompt += `5. API documentation (OpenAPI/Swagger)\n`;
    prompt += `6. Database migrations\n`;
    prompt += `7. Environment configuration\n`;

    setGeneratedPrompt(prompt);
  };

  // Clear form
  const clearForm = () => {
    setReviewEntireProject("");
    setProjectDescription("");
    setApiTypes(apiTypeOptions.map((opt) => ({ ...opt, checked: false })));
    setAuthMethods(authOptions.map((opt) => ({ ...opt, checked: false })));
    setModels(modelOptions.map((opt) => ({ ...opt, checked: false })));
    setCustomModels("");
    setFeatures(featureOptions.map((opt) => ({ ...opt, checked: false })));
    setSecurity(securityOptions.map((opt) => ({ ...opt, checked: false })));
    setDeployment(deploymentOptions.map((opt) => ({ ...opt, checked: false })));
    setTesting(testingOptions.map((opt) => ({ ...opt, checked: false })));
    setReferenceLinks([{ id: "1", url: "", description: "" }]);
    setUploadedImages([]);
    setAdditionalNotes("");
    setGeneratedPrompt("");
  };

  // Copy to clipboard
  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(generatedPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
              className="px-4 py-2 bg-pink-100 text-pink-700 font-medium rounded-lg transition-all"
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-2xl p-6 border border-white/30 hover:shadow-pink-200/50 transition-shadow duration-300 max-h-[calc(100vh-150px)] overflow-y-auto">
            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <span className="text-2xl">⚙️</span>
              Backend Studio
            </h2>

            {/* Review Entire Project */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Review Entire Project
              </label>
              <input
                type="url"
                value={reviewEntireProject}
                onChange={(e) => setReviewEntireProject(e.target.value)}
                placeholder="Paste entire project link here"
                className="w-full px-4 py-3 bg-white/50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-400 focus:border-pink-400 outline-none transition-all hover:border-pink-300"
              />
            </div>

            {/* Project Description */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Describe Project Core Concept
              </label>
              <textarea
                value={projectDescription}
                onChange={(e) => setProjectDescription(e.target.value)}
                placeholder="Describe your backend requirements, business logic, and main functionality..."
                rows={3}
                className="w-full px-4 py-3 bg-white/50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-400 focus:border-pink-400 outline-none transition-all resize-none hover:border-pink-300"
              />
            </div>

            {/* API Type - Checklist */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                API Type
              </label>
              <div className="grid grid-cols-2 gap-3">
                {apiTypes.map((option) => (
                  <label
                    key={option.id}
                    className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-200 border-2 ${
                      option.checked
                        ? "bg-gradient-to-r from-pink-100 to-purple-100 border-pink-400 shadow-md"
                        : "bg-white/50 border-gray-200 hover:border-pink-300 hover:bg-pink-50"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={option.checked}
                      onChange={() => handleCheckboxChange(option.id, setApiTypes)}
                      className="w-5 h-5 text-pink-500 border-gray-300 rounded focus:ring-pink-400 accent-pink-500"
                    />
                    <span className="text-lg">{option.icon}</span>
                    <span className="text-gray-700 text-sm font-medium">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Authentication - Checklist */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Authentication Methods
              </label>
              <div className="grid grid-cols-2 gap-3">
                {authMethods.map((option) => (
                  <label
                    key={option.id}
                    className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-200 border-2 ${
                      option.checked
                        ? "bg-gradient-to-r from-pink-100 to-purple-100 border-pink-400 shadow-md"
                        : "bg-white/50 border-gray-200 hover:border-pink-300 hover:bg-pink-50"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={option.checked}
                      onChange={() => handleCheckboxChange(option.id, setAuthMethods)}
                      className="w-5 h-5 text-pink-500 border-gray-300 rounded focus:ring-pink-400 accent-pink-500"
                    />
                    <span className="text-lg">{option.icon}</span>
                    <span className="text-gray-700 text-sm font-medium">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Data Models - Checklist */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Data Models / Entities
              </label>
              <div className="grid grid-cols-2 gap-3">
                {models.map((option) => (
                  <label
                    key={option.id}
                    className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-200 border-2 ${
                      option.checked
                        ? "bg-gradient-to-r from-pink-100 to-purple-100 border-pink-400 shadow-md"
                        : "bg-white/50 border-gray-200 hover:border-pink-300 hover:bg-pink-50"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={option.checked}
                      onChange={() => handleCheckboxChange(option.id, setModels)}
                      className="w-5 h-5 text-pink-500 border-gray-300 rounded focus:ring-pink-400 accent-pink-500"
                    />
                    <span className="text-lg">{option.icon}</span>
                    <span className="text-gray-700 text-sm font-medium">{option.label}</span>
                  </label>
                ))}
              </div>

              {/* Conditional: Custom models description */}
              {showCustomModels && (
                <textarea
                  value={customModels}
                  onChange={(e) => setCustomModels(e.target.value)}
                  placeholder="Describe your custom models with fields and relationships..."
                  rows={3}
                  className="w-full mt-3 px-4 py-3 bg-white/50 border-2 border-pink-200 rounded-xl focus:ring-2 focus:ring-pink-400 focus:border-pink-400 outline-none transition-all resize-none"
                />
              )}
            </div>

            {/* Features - Checklist */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Features
              </label>
              <div className="grid grid-cols-2 gap-3">
                {features.map((option) => (
                  <label
                    key={option.id}
                    className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-200 border-2 ${
                      option.checked
                        ? "bg-gradient-to-r from-pink-100 to-purple-100 border-pink-400 shadow-md"
                        : "bg-white/50 border-gray-200 hover:border-pink-300 hover:bg-pink-50"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={option.checked}
                      onChange={() => handleCheckboxChange(option.id, setFeatures)}
                      className="w-5 h-5 text-pink-500 border-gray-300 rounded focus:ring-pink-400 accent-pink-500"
                    />
                    <span className="text-lg">{option.icon}</span>
                    <span className="text-gray-700 text-sm font-medium">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Security - Checklist */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Security Requirements
              </label>
              <div className="grid grid-cols-2 gap-3">
                {security.map((option) => (
                  <label
                    key={option.id}
                    className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-200 border-2 ${
                      option.checked
                        ? "bg-gradient-to-r from-pink-100 to-purple-100 border-pink-400 shadow-md"
                        : "bg-white/50 border-gray-200 hover:border-pink-300 hover:bg-pink-50"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={option.checked}
                      onChange={() => handleCheckboxChange(option.id, setSecurity)}
                      className="w-5 h-5 text-pink-500 border-gray-300 rounded focus:ring-pink-400 accent-pink-500"
                    />
                    <span className="text-lg">{option.icon}</span>
                    <span className="text-gray-700 text-sm font-medium">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Deployment - Checklist */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Deployment Platform
              </label>
              <div className="grid grid-cols-2 gap-3">
                {deployment.map((option) => (
                  <label
                    key={option.id}
                    className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-200 border-2 ${
                      option.checked
                        ? "bg-gradient-to-r from-pink-100 to-purple-100 border-pink-400 shadow-md"
                        : "bg-white/50 border-gray-200 hover:border-pink-300 hover:bg-pink-50"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={option.checked}
                      onChange={() => handleCheckboxChange(option.id, setDeployment)}
                      className="w-5 h-5 text-pink-500 border-gray-300 rounded focus:ring-pink-400 accent-pink-500"
                    />
                    <span className="text-lg">{option.icon}</span>
                    <span className="text-gray-700 text-sm font-medium">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Testing - Checklist */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Testing Requirements
              </label>
              <div className="grid grid-cols-2 gap-3">
                {testing.map((option) => (
                  <label
                    key={option.id}
                    className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-200 border-2 ${
                      option.checked
                        ? "bg-gradient-to-r from-pink-100 to-purple-100 border-pink-400 shadow-md"
                        : "bg-white/50 border-gray-200 hover:border-pink-300 hover:bg-pink-50"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={option.checked}
                      onChange={() => handleCheckboxChange(option.id, setTesting)}
                      className="w-5 h-5 text-pink-500 border-gray-300 rounded focus:ring-pink-400 accent-pink-500"
                    />
                    <span className="text-lg">{option.icon}</span>
                    <span className="text-gray-700 text-sm font-medium">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Reference Links */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <span className="text-lg">🔗</span>
                Reference Links
              </label>
              {referenceLinks.map((link) => (
                <div key={link.id} className="flex gap-2 mb-3">
                  <div className="flex-1 space-y-2">
                    <input
                      type="url"
                      value={link.url}
                      onChange={(e) => updateReferenceLink(link.id, "url", e.target.value)}
                      placeholder="https://example.com/api-reference"
                      className="w-full px-4 py-2 bg-white/50 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-pink-400 outline-none transition-all hover:border-pink-300 text-sm"
                    />
                    <input
                      type="text"
                      value={link.description}
                      onChange={(e) => updateReferenceLink(link.id, "description", e.target.value)}
                      placeholder="What to take from this reference?"
                      className="w-full px-4 py-2 bg-white/50 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-pink-400 outline-none transition-all hover:border-pink-300 text-sm"
                    />
                  </div>
                  {referenceLinks.length > 1 && (
                    <button
                      onClick={() => removeReferenceLink(link.id)}
                      className="self-start px-3 py-2 text-red-500 hover:bg-red-50 rounded-lg transition-all"
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
              <button
                onClick={addReferenceLink}
                className="text-sm text-pink-600 hover:text-pink-700 font-medium flex items-center gap-1 mt-2"
              >
                <span>+</span> Add another link
              </button>
            </div>

            {/* Image Upload */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <span className="text-lg">🖼️</span>
                Reference Diagrams / ERD
              </label>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="hidden"
              />

              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full py-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-pink-400 hover:bg-pink-50 transition-all text-gray-500 hover:text-pink-600 flex flex-col items-center gap-2"
              >
                <span className="text-3xl">📤</span>
                <span className="text-sm font-medium">Click to upload diagrams</span>
                <span className="text-xs text-gray-400">ERD, Architecture diagrams, etc.</span>
              </button>

              {/* Uploaded images preview */}
              {uploadedImages.length > 0 && (
                <div className="mt-4 space-y-3">
                  {uploadedImages.map((img) => (
                    <div key={img.id} className="flex gap-3 p-3 bg-white/50 rounded-xl border border-gray-200">
                      <img
                        src={img.preview}
                        alt={img.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-700 truncate">{img.name}</p>
                        <input
                          type="text"
                          value={img.description}
                          onChange={(e) => updateImageDescription(img.id, e.target.value)}
                          placeholder="Describe this diagram..."
                          className="w-full mt-2 px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-pink-400 focus:border-pink-400 outline-none"
                        />
                      </div>
                      <button
                        onClick={() => removeImage(img.id)}
                        className="self-start text-red-500 hover:bg-red-50 p-2 rounded-lg transition-all"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Additional Notes */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Additional Notes / Requirements
              </label>
              <textarea
                value={additionalNotes}
                onChange={(e) => setAdditionalNotes(e.target.value)}
                placeholder="Any specific requirements, constraints, business logic details..."
                rows={4}
                className="w-full px-4 py-3 bg-white/50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-400 focus:border-pink-400 outline-none transition-all resize-none hover:border-pink-300"
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-4 sticky bottom-0 bg-white/70 py-4 -mx-6 px-6 border-t border-gray-200">
              <button
                onClick={generatePrompt}
                className="flex-1 bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 hover:from-pink-500 hover:via-purple-500 hover:to-indigo-500 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
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
          <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-2xl p-6 border border-white/30 hover:shadow-purple-200/50 transition-shadow duration-300">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <span className="text-2xl">✨</span>
                Generated Prompt
              </h2>
              {generatedPrompt && (
                <button
                  onClick={copyToClipboard}
                  className={`text-sm font-semibold px-4 py-2 rounded-lg flex items-center gap-2 transition-all hover:scale-105 active:scale-95 shadow-md ${
                    copied
                      ? "bg-green-500 text-white"
                      : "bg-gradient-to-r from-pink-400 to-purple-400 hover:from-pink-500 hover:to-purple-500 text-white"
                  }`}
                >
                  {copied ? (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Copied!
                    </>
                  ) : (
                    <>
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
                    </>
                  )}
                </button>
              )}
            </div>

            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-5 min-h-[500px] max-h-[calc(100vh-250px)] overflow-y-auto border border-gray-700 shadow-inner">
              {generatedPrompt ? (
                <pre className="whitespace-pre-wrap text-green-400 font-mono text-sm leading-relaxed">
                  {generatedPrompt}
                </pre>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-gray-500 mt-24">
                  <span className="text-6xl mb-4 opacity-50">⚙️</span>
                  <p className="text-center">
                    Fill in the form and click<br />
                    <span className="text-pink-400 font-semibold">&quot;Generate Prompt&quot;</span><br />
                    to create your Claude prompt
                  </p>
                  <p className="text-xs text-gray-600 mt-4 text-center">
                    The generated prompt will be structured<br />
                    for optimal Claude understanding
                  </p>
                </div>
              )}
            </div>

            {/* Tip box */}
            {generatedPrompt && (
              <div className="mt-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200">
                <p className="text-sm text-purple-800 flex items-start gap-2">
                  <span className="text-lg">💡</span>
                  <span>
                    <strong>Tip:</strong> If you uploaded ERD or architecture diagrams, paste them along with this prompt in Claude for better context.
                  </span>
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
