"use client";

import { useState, useRef } from "react";
import Link from "next/link";

export default function FeaturesPage() {
  const [activeTab, setActiveTab] = useState("responsive");

  const tabs = [
    { id: "responsive", label: "Responsive Design" },
    { id: "darkmode", label: "Dark Mode" },
    { id: "animations", label: "Animations" },
    { id: "validation", label: "Form Validation" },
    { id: "search", label: "Search" },
    { id: "filters", label: "Filters & Sorting" },
    { id: "pagination", label: "Pagination" },
    { id: "loading", label: "Loading States" },
    { id: "notifications", label: "Notifications" },
    { id: "dragdrop", label: "Drag & Drop" },
    { id: "charts", label: "Charts" },
    { id: "fileupload", label: "File Upload" },
  ];

  // State for various interactive examples
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "", name: "" });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [filterCategory, setFilterCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [notifications, setNotifications] = useState<{ id: number; type: string; message: string }[]>([]);
  const [dragItems, setDragItems] = useState(["Item 1", "Item 2", "Item 3", "Item 4"]);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sample data for filters/search
  const sampleProducts = [
    { id: 1, name: "Laptop Pro", category: "electronics", price: 1299 },
    { id: 2, name: "Wireless Mouse", category: "accessories", price: 49 },
    { id: 3, name: "USB-C Hub", category: "accessories", price: 79 },
    { id: 4, name: "Mechanical Keyboard", category: "electronics", price: 159 },
    { id: 5, name: "Monitor 27\"", category: "electronics", price: 399 },
    { id: 6, name: "Webcam HD", category: "accessories", price: 89 },
    { id: 7, name: "Desk Lamp", category: "furniture", price: 45 },
    { id: 8, name: "Office Chair", category: "furniture", price: 299 },
  ];

  // Form validation
  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formData.name.trim()) errors.name = "Name is required";
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Invalid email format";
    }
    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 8) {
      errors.password = "Password must be at least 8 characters";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Filter and search products
  const filteredProducts = sampleProducts
    .filter((p) => filterCategory === "all" || p.category === filterCategory)
    .filter((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      return 0;
    });

  // Add notification
  const addNotification = (type: string, message: string) => {
    const id = Date.now();
    setNotifications((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 3000);
  };

  // Simulate loading
  const simulateLoading = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  // Handle drag start
  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  // Handle drag over
  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;

    const newItems = [...dragItems];
    const draggedItem = newItems[draggedIndex];
    newItems.splice(draggedIndex, 1);
    newItems.splice(index, 0, draggedItem);
    setDragItems(newItems);
    setDraggedIndex(index);
  };

  // Handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const fileNames = Array.from(files).map((f) => f.name);
      setUploadedFiles((prev) => [...prev, ...fileNames]);
      addNotification("success", `${files.length} file(s) uploaded successfully!`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Features Examples
              </h1>
              <p className="text-gray-600 text-sm mt-1">
                Live interactive examples of common web features
              </p>
            </div>
            <Link
              href="/frontend-studio"
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Frontend Studio
            </Link>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-1 overflow-x-auto py-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-md"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Notifications Container */}
        <div className="fixed top-4 right-4 z-50 space-y-2">
          {notifications.map((notif) => (
            <div
              key={notif.id}
              className={`px-4 py-3 rounded-lg shadow-lg animate-in slide-in-from-right ${
                notif.type === "success"
                  ? "bg-green-500 text-white"
                  : notif.type === "error"
                  ? "bg-red-500 text-white"
                  : notif.type === "warning"
                  ? "bg-yellow-500 text-white"
                  : "bg-blue-500 text-white"
              }`}
            >
              {notif.message}
            </div>
          ))}
        </div>

        {/* Responsive Design */}
        {activeTab === "responsive" && (
          <div className="space-y-8">
            <h2 className="text-xl font-bold text-gray-800">Responsive Design Examples</h2>

            {/* Grid Responsive */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-4 border-b bg-gray-50">
                <h3 className="font-semibold text-gray-700">Responsive Grid (resize window to see changes)</h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                    <div key={i} className="bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg p-6 text-white text-center">
                      Item {i}
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-500 mt-4">1 col on mobile → 2 cols on sm → 3 cols on md → 4 cols on lg</p>
              </div>
            </div>

            {/* Responsive Navigation */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-4 border-b bg-gray-50">
                <h3 className="font-semibold text-gray-700">Responsive Navigation (Desktop vs Mobile)</h3>
              </div>
              <div className="space-y-4 p-6">
                {/* Desktop Nav */}
                <div className="border rounded-lg overflow-hidden">
                  <div className="p-2 bg-gray-100 text-xs text-gray-500">Desktop View (hidden on mobile)</div>
                  <div className="bg-gray-900 p-4">
                    <div className="hidden md:flex items-center justify-between">
                      <span className="text-white font-bold">Logo</span>
                      <nav className="flex gap-6">
                        <a href="#" className="text-white">Home</a>
                        <a href="#" className="text-gray-400">About</a>
                        <a href="#" className="text-gray-400">Services</a>
                        <a href="#" className="text-gray-400">Contact</a>
                      </nav>
                      <button className="px-4 py-2 bg-indigo-600 text-white rounded">Sign Up</button>
                    </div>
                    <div className="md:hidden text-gray-400 text-sm text-center py-2">
                      (View on larger screen to see desktop nav)
                    </div>
                  </div>
                </div>

                {/* Mobile Nav */}
                <div className="border rounded-lg overflow-hidden">
                  <div className="p-2 bg-gray-100 text-xs text-gray-500">Mobile View (hamburger menu)</div>
                  <div className="bg-gray-900 p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-white font-bold">Logo</span>
                      <button className="text-white p-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Responsive Typography */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-4 border-b bg-gray-50">
                <h3 className="font-semibold text-gray-700">Responsive Typography</h3>
              </div>
              <div className="p-6 space-y-4">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
                  Responsive Heading
                </h1>
                <p className="text-sm sm:text-base md:text-lg text-gray-600">
                  This text scales with the viewport. On mobile it is small, on tablet it is medium, and on desktop it is large.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Dark Mode */}
        {activeTab === "darkmode" && (
          <div className="space-y-8">
            <h2 className="text-xl font-bold text-gray-800">Dark Mode Toggle Examples</h2>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-4 border-b bg-gray-50 flex items-center justify-between">
                <h3 className="font-semibold text-gray-700">Interactive Dark Mode Preview</h3>
                <button
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  {isDarkMode ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    </svg>
                  )}
                  Toggle Dark Mode
                </button>
              </div>
              <div className={`p-6 transition-colors ${isDarkMode ? "bg-gray-900" : "bg-white"}`}>
                <div className={`rounded-xl p-6 ${isDarkMode ? "bg-gray-800" : "bg-gray-100"}`}>
                  <h4 className={`text-lg font-semibold mb-4 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                    Dashboard Card
                  </h4>
                  <p className={`mb-4 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                    This card automatically adapts to the current theme mode.
                  </p>
                  <div className="flex gap-3">
                    <button className={`px-4 py-2 rounded-lg ${isDarkMode ? "bg-indigo-600 text-white" : "bg-indigo-600 text-white"}`}>
                      Primary
                    </button>
                    <button className={`px-4 py-2 rounded-lg ${isDarkMode ? "bg-gray-700 text-white" : "bg-gray-200 text-gray-900"}`}>
                      Secondary
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Toggle Styles */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-4 border-b bg-gray-50">
                <h3 className="font-semibold text-gray-700">Different Toggle Styles</h3>
              </div>
              <div className="p-6 space-y-6">
                {/* Switch Toggle */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <span className="font-medium">Switch Style</span>
                  <button
                    onClick={() => setIsDarkMode(!isDarkMode)}
                    className={`relative w-14 h-8 rounded-full transition-colors ${isDarkMode ? "bg-indigo-600" : "bg-gray-300"}`}
                  >
                    <div className={`absolute w-6 h-6 bg-white rounded-full top-1 transition-transform ${isDarkMode ? "translate-x-7" : "translate-x-1"}`}></div>
                  </button>
                </div>

                {/* Icon Toggle */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <span className="font-medium">Icon Button Style</span>
                  <button
                    onClick={() => setIsDarkMode(!isDarkMode)}
                    className={`p-3 rounded-full transition-colors ${isDarkMode ? "bg-gray-800 text-yellow-400" : "bg-gray-200 text-gray-600"}`}
                  >
                    {isDarkMode ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                      </svg>
                    )}
                  </button>
                </div>

                {/* Segmented Control */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <span className="font-medium">Segmented Control</span>
                  <div className="flex bg-gray-200 rounded-lg p-1">
                    <button
                      onClick={() => setIsDarkMode(false)}
                      className={`px-4 py-2 rounded-md text-sm transition-colors ${!isDarkMode ? "bg-white shadow text-gray-900" : "text-gray-600"}`}
                    >
                      Light
                    </button>
                    <button
                      onClick={() => setIsDarkMode(true)}
                      className={`px-4 py-2 rounded-md text-sm transition-colors ${isDarkMode ? "bg-white shadow text-gray-900" : "text-gray-600"}`}
                    >
                      Dark
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Animations */}
        {activeTab === "animations" && (
          <div className="space-y-8">
            <h2 className="text-xl font-bold text-gray-800">Animation & Transition Examples</h2>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-4 border-b bg-gray-50">
                <h3 className="font-semibold text-gray-700">CSS Animations</h3>
              </div>
              <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-indigo-500 rounded-lg mx-auto animate-bounce"></div>
                  <p className="mt-2 text-sm text-gray-600">Bounce</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-pink-500 rounded-lg mx-auto animate-pulse"></div>
                  <p className="mt-2 text-sm text-gray-600">Pulse</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-500 rounded-lg mx-auto animate-spin"></div>
                  <p className="mt-2 text-sm text-gray-600">Spin</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-yellow-500 rounded-lg mx-auto animate-ping"></div>
                  <p className="mt-2 text-sm text-gray-600">Ping</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-4 border-b bg-gray-50">
                <h3 className="font-semibold text-gray-700">Hover Transitions</h3>
              </div>
              <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-6">
                <button className="px-6 py-3 bg-indigo-500 text-white rounded-lg hover:scale-110 transition-transform duration-200">
                  Scale
                </button>
                <button className="px-6 py-3 bg-pink-500 text-white rounded-lg hover:-translate-y-2 transition-transform duration-200">
                  Lift
                </button>
                <button className="px-6 py-3 bg-green-500 text-white rounded-lg hover:rotate-12 transition-transform duration-200">
                  Rotate
                </button>
                <button className="px-6 py-3 bg-yellow-500 text-white rounded-lg opacity-100 hover:opacity-50 transition-opacity duration-200">
                  Fade
                </button>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-4 border-b bg-gray-50">
                <h3 className="font-semibold text-gray-700">Card Hover Effects</h3>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-100 rounded-xl p-6 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer">
                  <h4 className="font-semibold text-gray-900">Lift & Shadow</h4>
                  <p className="text-gray-600 text-sm mt-2">Hover to see the lift effect</p>
                </div>
                <div className="bg-gray-100 rounded-xl p-6 hover:bg-gradient-to-r hover:from-indigo-500 hover:to-purple-500 hover:text-white transition-all duration-300 cursor-pointer group">
                  <h4 className="font-semibold text-gray-900 group-hover:text-white">Color Change</h4>
                  <p className="text-gray-600 text-sm mt-2 group-hover:text-white/80">Hover to see color transition</p>
                </div>
                <div className="relative bg-gray-100 rounded-xl p-6 overflow-hidden cursor-pointer group">
                  <div className="absolute inset-0 bg-indigo-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                  <div className="relative z-10">
                    <h4 className="font-semibold text-gray-900 group-hover:text-white">Slide Up</h4>
                    <p className="text-gray-600 text-sm mt-2 group-hover:text-white/80">Hover to see slide effect</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Form Validation */}
        {activeTab === "validation" && (
          <div className="space-y-8">
            <h2 className="text-xl font-bold text-gray-800">Form Validation Examples</h2>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-4 border-b bg-gray-50">
                <h3 className="font-semibold text-gray-700">Live Form Validation</h3>
              </div>
              <div className="p-6">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (validateForm()) {
                      addNotification("success", "Form submitted successfully!");
                      setFormData({ email: "", password: "", name: "" });
                      setFormErrors({});
                    }
                  }}
                  className="max-w-md space-y-4"
                >
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                        formErrors.name ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-indigo-500"
                      }`}
                      placeholder="John Doe"
                    />
                    {formErrors.name && <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                        formErrors.email ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-indigo-500"
                      }`}
                      placeholder="you@example.com"
                    />
                    {formErrors.email && <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                    <input
                      type="password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                        formErrors.password ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-indigo-500"
                      }`}
                      placeholder="••••••••"
                    />
                    {formErrors.password && <p className="text-red-500 text-sm mt-1">{formErrors.password}</p>}
                    <p className="text-gray-500 text-xs mt-1">Must be at least 8 characters</p>
                  </div>
                  <button
                    type="submit"
                    className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>

            {/* Validation States */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-4 border-b bg-gray-50">
                <h3 className="font-semibold text-gray-700">Input Validation States</h3>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Default</label>
                  <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg" placeholder="Default input" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Success</label>
                  <div className="relative">
                    <input type="text" value="valid@email.com" readOnly className="w-full px-4 py-2 border-2 border-green-500 rounded-lg bg-green-50 pr-10" />
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 absolute right-3 top-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-green-600 text-sm mt-1">Looks good!</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Error</label>
                  <div className="relative">
                    <input type="text" value="invalid" readOnly className="w-full px-4 py-2 border-2 border-red-500 rounded-lg bg-red-50 pr-10" />
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500 absolute right-3 top-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <p className="text-red-600 text-sm mt-1">Please enter a valid email address</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Warning</label>
                  <input type="text" value="username" readOnly className="w-full px-4 py-2 border-2 border-yellow-500 rounded-lg bg-yellow-50" />
                  <p className="text-yellow-600 text-sm mt-1">Username may already be taken</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Search */}
        {activeTab === "search" && (
          <div className="space-y-8">
            <h2 className="text-xl font-bold text-gray-800">Search Examples</h2>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-4 border-b bg-gray-50">
                <h3 className="font-semibold text-gray-700">Live Search</h3>
              </div>
              <div className="p-6">
                <div className="relative max-w-md mb-6">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search products..."
                    className="w-full px-4 py-3 pl-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 absolute left-4 top-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  {searchQuery && (
                    <button onClick={() => setSearchQuery("")} className="absolute right-4 top-4 text-gray-400 hover:text-gray-600">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>

                <div className="space-y-2">
                  {filteredProducts.length === 0 ? (
                    <p className="text-gray-500 py-8 text-center">No products found matching &quot;{searchQuery}&quot;</p>
                  ) : (
                    filteredProducts.map((product) => (
                      <div key={product.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100">
                        <div>
                          <h4 className="font-medium text-gray-900">{product.name}</h4>
                          <span className="text-sm text-gray-500 capitalize">{product.category}</span>
                        </div>
                        <span className="font-semibold text-gray-900">${product.price}</span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* Search Styles */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-4 border-b bg-gray-50">
                <h3 className="font-semibold text-gray-700">Different Search Styles</h3>
              </div>
              <div className="p-6 space-y-6">
                <div>
                  <label className="text-sm text-gray-600 mb-2 block">Pill Style</label>
                  <input type="text" placeholder="Search..." className="w-full px-6 py-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
                <div>
                  <label className="text-sm text-gray-600 mb-2 block">With Button</label>
                  <div className="flex">
                    <input type="text" placeholder="Search..." className="flex-1 px-4 py-3 border border-r-0 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                    <button className="px-6 py-3 bg-indigo-600 text-white rounded-r-lg hover:bg-indigo-700">Search</button>
                  </div>
                </div>
                <div>
                  <label className="text-sm text-gray-600 mb-2 block">Command Palette Style</label>
                  <div className="relative bg-gray-900 rounded-lg p-4">
                    <input type="text" placeholder="Type a command or search..." className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:border-indigo-500" />
                    <div className="absolute right-6 top-7 text-gray-500 text-sm">
                      <kbd className="px-2 py-1 bg-gray-700 rounded">⌘K</kbd>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Filters & Sorting */}
        {activeTab === "filters" && (
          <div className="space-y-8">
            <h2 className="text-xl font-bold text-gray-800">Filters & Sorting Examples</h2>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-4 border-b bg-gray-50">
                <h3 className="font-semibold text-gray-700">Product Filter & Sort</h3>
              </div>
              <div className="p-6">
                <div className="flex flex-wrap gap-4 mb-6">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Category</label>
                    <select
                      value={filterCategory}
                      onChange={(e) => setFilterCategory(e.target.value)}
                      className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="all">All Categories</option>
                      <option value="electronics">Electronics</option>
                      <option value="accessories">Accessories</option>
                      <option value="furniture">Furniture</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Sort By</label>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="name">Name (A-Z)</option>
                      <option value="price-asc">Price: Low to High</option>
                      <option value="price-desc">Price: High to Low</option>
                    </select>
                  </div>
                </div>

                <p className="text-sm text-gray-500 mb-4">Showing {filteredProducts.length} products</p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {filteredProducts.map((product) => (
                    <div key={product.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="h-24 bg-gray-100 rounded mb-3"></div>
                      <h4 className="font-medium text-gray-900">{product.name}</h4>
                      <span className="text-xs text-gray-500 capitalize bg-gray-100 px-2 py-0.5 rounded">{product.category}</span>
                      <p className="text-lg font-bold text-gray-900 mt-2">${product.price}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Filter Tags */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-4 border-b bg-gray-50">
                <h3 className="font-semibold text-gray-700">Filter Tags Style</h3>
              </div>
              <div className="p-6">
                <div className="flex flex-wrap gap-2">
                  {["All", "New", "Popular", "Sale", "Featured"].map((tag, i) => (
                    <button
                      key={tag}
                      className={`px-4 py-2 rounded-full text-sm transition-colors ${
                        i === 0 ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Pagination */}
        {activeTab === "pagination" && (
          <div className="space-y-8">
            <h2 className="text-xl font-bold text-gray-800">Pagination Examples</h2>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-4 border-b bg-gray-50">
                <h3 className="font-semibold text-gray-700">Basic Pagination</h3>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-center gap-2">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-2 border rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  {[1, 2, 3, 4, 5].map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-4 py-2 rounded-lg ${
                        currentPage === page ? "bg-indigo-600 text-white" : "border hover:bg-gray-100"
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  <button
                    onClick={() => setCurrentPage(Math.min(5, currentPage + 1))}
                    disabled={currentPage === 5}
                    className="px-3 py-2 border rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>

            {/* More Pagination Styles */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-4 border-b bg-gray-50">
                <h3 className="font-semibold text-gray-700">Pagination Variations</h3>
              </div>
              <div className="p-6 space-y-8">
                {/* Simple */}
                <div>
                  <p className="text-sm text-gray-600 mb-3">Simple Navigation</p>
                  <div className="flex items-center gap-4">
                    <button className="flex items-center gap-1 text-indigo-600 hover:text-indigo-800">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                      Previous
                    </button>
                    <span className="text-gray-600">Page {currentPage} of 5</span>
                    <button className="flex items-center gap-1 text-indigo-600 hover:text-indigo-800">
                      Next
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Pill Style */}
                <div>
                  <p className="text-sm text-gray-600 mb-3">Pill Style</p>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`w-10 h-10 rounded-full ${
                          currentPage === page ? "bg-indigo-600 text-white" : "hover:bg-gray-100"
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>
                </div>

                {/* With Dots */}
                <div>
                  <p className="text-sm text-gray-600 mb-3">With Ellipsis</p>
                  <div className="flex items-center gap-2">
                    <button className="px-3 py-2 border rounded hover:bg-gray-100">&lt;</button>
                    <button className="px-3 py-2 bg-indigo-600 text-white rounded">1</button>
                    <button className="px-3 py-2 border rounded hover:bg-gray-100">2</button>
                    <button className="px-3 py-2 border rounded hover:bg-gray-100">3</button>
                    <span className="px-2">...</span>
                    <button className="px-3 py-2 border rounded hover:bg-gray-100">10</button>
                    <button className="px-3 py-2 border rounded hover:bg-gray-100">&gt;</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Loading States */}
        {activeTab === "loading" && (
          <div className="space-y-8">
            <h2 className="text-xl font-bold text-gray-800">Loading State Examples</h2>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-4 border-b bg-gray-50 flex items-center justify-between">
                <h3 className="font-semibold text-gray-700">Interactive Loading Demo</h3>
                <button
                  onClick={simulateLoading}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  Trigger Loading
                </button>
              </div>
              <div className="p-6">
                {isLoading ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-600">Content loaded! Click button to see loading state.</div>
                )}
              </div>
            </div>

            {/* Spinner Styles */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-4 border-b bg-gray-50">
                <h3 className="font-semibold text-gray-700">Spinner Variations</h3>
              </div>
              <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="w-10 h-10 border-4 border-gray-200 border-t-indigo-600 rounded-full animate-spin mx-auto"></div>
                  <p className="text-sm text-gray-600 mt-2">Circle</p>
                </div>
                <div className="text-center">
                  <div className="flex gap-1 justify-center">
                    <div className="w-3 h-3 bg-indigo-600 rounded-full animate-bounce"></div>
                    <div className="w-3 h-3 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                    <div className="w-3 h-3 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">Dots</p>
                </div>
                <div className="text-center">
                  <div className="w-10 h-10 border-4 border-indigo-600 border-dashed rounded-full animate-spin mx-auto"></div>
                  <p className="text-sm text-gray-600 mt-2">Dashed</p>
                </div>
                <div className="text-center">
                  <div className="w-10 h-10 bg-indigo-600 rounded animate-pulse mx-auto"></div>
                  <p className="text-sm text-gray-600 mt-2">Pulse</p>
                </div>
              </div>
            </div>

            {/* Skeleton Loading */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-4 border-b bg-gray-50">
                <h3 className="font-semibold text-gray-700">Skeleton Loading</h3>
              </div>
              <div className="p-6 space-y-6">
                {/* Card Skeleton */}
                <div className="border rounded-lg p-4 animate-pulse">
                  <div className="h-40 bg-gray-200 rounded mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>

                {/* List Skeleton */}
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center gap-4 animate-pulse">
                      <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                      <div className="flex-1">
                        <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Notifications */}
        {activeTab === "notifications" && (
          <div className="space-y-8">
            <h2 className="text-xl font-bold text-gray-800">Notification Examples</h2>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-4 border-b bg-gray-50">
                <h3 className="font-semibold text-gray-700">Trigger Notifications (appears top-right)</h3>
              </div>
              <div className="p-6 flex flex-wrap gap-4">
                <button
                  onClick={() => addNotification("success", "Operation completed successfully!")}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                >
                  Success
                </button>
                <button
                  onClick={() => addNotification("error", "Something went wrong!")}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  Error
                </button>
                <button
                  onClick={() => addNotification("warning", "Please review your input.")}
                  className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                >
                  Warning
                </button>
                <button
                  onClick={() => addNotification("info", "Here is some information.")}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Info
                </button>
              </div>
            </div>

            {/* Static Notification Styles */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-4 border-b bg-gray-50">
                <h3 className="font-semibold text-gray-700">Notification Styles (Static)</h3>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-start gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <h4 className="font-medium text-green-800">Success!</h4>
                    <p className="text-green-700 text-sm">Your changes have been saved successfully.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-600 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <div>
                    <h4 className="font-medium text-red-800">Error!</h4>
                    <p className="text-red-700 text-sm">There was a problem processing your request.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-600 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <div>
                    <h4 className="font-medium text-yellow-800">Warning!</h4>
                    <p className="text-yellow-700 text-sm">Please review your information before continuing.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <h4 className="font-medium text-blue-800">Info</h4>
                    <p className="text-blue-700 text-sm">Here is some helpful information for you.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Drag & Drop */}
        {activeTab === "dragdrop" && (
          <div className="space-y-8">
            <h2 className="text-xl font-bold text-gray-800">Drag & Drop Examples</h2>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-4 border-b bg-gray-50">
                <h3 className="font-semibold text-gray-700">Reorderable List</h3>
              </div>
              <div className="p-6">
                <p className="text-sm text-gray-600 mb-4">Drag items to reorder them:</p>
                <div className="space-y-2 max-w-md">
                  {dragItems.map((item, index) => (
                    <div
                      key={item}
                      draggable
                      onDragStart={() => handleDragStart(index)}
                      onDragOver={(e) => handleDragOver(e, index)}
                      onDragEnd={() => setDraggedIndex(null)}
                      className={`flex items-center gap-3 p-4 bg-gray-50 rounded-lg cursor-move hover:bg-gray-100 transition-colors ${
                        draggedIndex === index ? "opacity-50" : ""
                      }`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
                      </svg>
                      <span className="font-medium text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Drag zones */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-4 border-b bg-gray-50">
                <h3 className="font-semibold text-gray-700">Drop Zone (Static Preview)</h3>
              </div>
              <div className="p-6">
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center hover:border-indigo-500 hover:bg-indigo-50 transition-colors cursor-pointer">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <p className="text-gray-600 font-medium">Drop files here</p>
                  <p className="text-gray-400 text-sm mt-1">or click to browse</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Charts */}
        {activeTab === "charts" && (
          <div className="space-y-8">
            <h2 className="text-xl font-bold text-gray-800">Chart Examples (CSS-based)</h2>

            {/* Bar Chart */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-4 border-b bg-gray-50">
                <h3 className="font-semibold text-gray-700">Bar Chart</h3>
              </div>
              <div className="p-6">
                <div className="flex items-end gap-4 h-48">
                  {[60, 80, 45, 90, 70, 85, 55].map((height, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center">
                      <div
                        className="w-full bg-gradient-to-t from-indigo-600 to-indigo-400 rounded-t transition-all hover:from-indigo-700 hover:to-indigo-500"
                        style={{ height: `${height}%` }}
                      ></div>
                      <span className="text-xs text-gray-500 mt-2">{["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i]}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Progress Bars */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-4 border-b bg-gray-50">
                <h3 className="font-semibold text-gray-700">Progress Bars</h3>
              </div>
              <div className="p-6 space-y-6">
                {[
                  { label: "React", value: 85, color: "from-cyan-500 to-blue-500" },
                  { label: "Vue", value: 70, color: "from-green-500 to-emerald-500" },
                  { label: "Angular", value: 60, color: "from-red-500 to-pink-500" },
                  { label: "Svelte", value: 45, color: "from-orange-500 to-yellow-500" },
                ].map((item) => (
                  <div key={item.label}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">{item.label}</span>
                      <span className="text-sm text-gray-500">{item.value}%</span>
                    </div>
                    <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${item.color} rounded-full transition-all`}
                        style={{ width: `${item.value}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Donut Chart */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-4 border-b bg-gray-50">
                <h3 className="font-semibold text-gray-700">Donut Chart (CSS)</h3>
              </div>
              <div className="p-6 flex items-center justify-center">
                <div className="relative w-48 h-48">
                  <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                    <circle cx="18" cy="18" r="15.9155" fill="none" stroke="#e5e7eb" strokeWidth="3" />
                    <circle
                      cx="18"
                      cy="18"
                      r="15.9155"
                      fill="none"
                      stroke="#6366f1"
                      strokeWidth="3"
                      strokeDasharray="75, 100"
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <span className="text-3xl font-bold text-gray-900">75%</span>
                      <p className="text-sm text-gray-500">Complete</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* File Upload */}
        {activeTab === "fileupload" && (
          <div className="space-y-8">
            <h2 className="text-xl font-bold text-gray-800">File Upload Examples</h2>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-4 border-b bg-gray-50">
                <h3 className="font-semibold text-gray-700">Drag & Drop Upload</h3>
              </div>
              <div className="p-6">
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center hover:border-indigo-500 hover:bg-indigo-50 transition-colors cursor-pointer"
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                  <p className="text-gray-600 font-medium">Click to upload or drag and drop</p>
                  <p className="text-gray-400 text-sm mt-1">PNG, JPG, PDF up to 10MB</p>
                </div>

                {uploadedFiles.length > 0 && (
                  <div className="mt-6">
                    <h4 className="font-medium text-gray-700 mb-3">Uploaded Files:</h4>
                    <div className="space-y-2">
                      {uploadedFiles.map((file, i) => (
                        <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <span className="text-sm text-gray-700">{file}</span>
                          </div>
                          <button
                            onClick={() => setUploadedFiles(uploadedFiles.filter((_, idx) => idx !== i))}
                            className="text-red-500 hover:text-red-700"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Upload Button Styles */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-4 border-b bg-gray-50">
                <h3 className="font-semibold text-gray-700">Upload Button Styles</h3>
              </div>
              <div className="p-6 flex flex-wrap gap-4">
                <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                  Upload File
                </button>
                <button className="flex items-center gap-2 px-4 py-2 border-2 border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add Files
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                  </svg>
                  Attach
                </button>
              </div>
            </div>

            {/* Upload Progress */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-4 border-b bg-gray-50">
                <h3 className="font-semibold text-gray-700">Upload Progress (Static Preview)</h3>
              </div>
              <div className="p-6 space-y-4">
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <div>
                        <p className="font-medium text-gray-700">document.pdf</p>
                        <p className="text-sm text-gray-500">2.4 MB</p>
                      </div>
                    </div>
                    <span className="text-sm text-indigo-600">65%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-600 rounded-full w-2/3"></div>
                  </div>
                </div>

                <div className="border rounded-lg p-4 border-green-200 bg-green-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <div>
                        <p className="font-medium text-gray-700">image.png</p>
                        <p className="text-sm text-green-600">Upload complete</p>
                      </div>
                    </div>
                    <button className="text-gray-400 hover:text-gray-600">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
