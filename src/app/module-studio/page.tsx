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
  { icon: "📊", top: "10%", left: "5%", delay: "0s", duration: "7s" },
  { icon: "📋", top: "20%", right: "8%", delay: "1s", duration: "6s" },
  { icon: "🎯", top: "60%", left: "3%", delay: "2s", duration: "8s" },
  { icon: "⚡", bottom: "20%", right: "5%", delay: "0.5s", duration: "7s" },
  { icon: "🔧", top: "40%", right: "3%", delay: "1.5s", duration: "5s" },
  { icon: "📈", bottom: "30%", left: "8%", delay: "3s", duration: "6s" },
];

// Module/Page Type options
const moduleTypeOptions: CheckboxOption[] = [
  { id: "dashboard", label: "Dashboard", checked: false, icon: "📊" },
  { id: "admin-panel", label: "Admin Panel", checked: false, icon: "⚙️" },
  { id: "user-management", label: "User Management", checked: false, icon: "👥" },
  { id: "analytics", label: "Analytics & Reports", checked: false, icon: "📈" },
  { id: "settings", label: "Settings Page", checked: false, icon: "🔧" },
  { id: "profile", label: "Profile Page", checked: false, icon: "👤" },
  { id: "inventory", label: "Inventory Management", checked: false, icon: "📦" },
  { id: "orders", label: "Orders Management", checked: false, icon: "🛒" },
  { id: "customers", label: "Customer Management", checked: false, icon: "🤝" },
  { id: "products", label: "Product Management", checked: false, icon: "🏷️" },
  { id: "billing", label: "Billing & Invoices", checked: false, icon: "💳" },
  { id: "calendar", label: "Calendar/Scheduling", checked: false, icon: "📅" },
  { id: "messages", label: "Messages/Chat", checked: false, icon: "💬" },
  { id: "notifications", label: "Notifications Center", checked: false, icon: "🔔" },
  { id: "file-manager", label: "File Manager", checked: false, icon: "📁" },
  { id: "crm", label: "CRM Module", checked: false, icon: "📇" },
];

// Dashboard Widget options
const dashboardWidgetOptions: CheckboxOption[] = [
  { id: "stats-cards", label: "Statistics Cards", checked: false, icon: "📊" },
  { id: "line-chart", label: "Line Charts", checked: false, icon: "📈" },
  { id: "bar-chart", label: "Bar Charts", checked: false, icon: "📊" },
  { id: "pie-chart", label: "Pie/Donut Charts", checked: false, icon: "🥧" },
  { id: "area-chart", label: "Area Charts", checked: false, icon: "📉" },
  { id: "recent-activity", label: "Recent Activity Feed", checked: false, icon: "🕐" },
  { id: "quick-actions", label: "Quick Actions Panel", checked: false, icon: "⚡" },
  { id: "progress-bars", label: "Progress Bars", checked: false, icon: "📏" },
  { id: "calendar-widget", label: "Calendar Widget", checked: false, icon: "📅" },
  { id: "todo-list", label: "To-Do List", checked: false, icon: "✅" },
  { id: "weather-widget", label: "Weather Widget", checked: false, icon: "🌤️" },
  { id: "notifications-widget", label: "Notifications Widget", checked: false, icon: "🔔" },
  { id: "user-list", label: "User List/Grid", checked: false, icon: "👥" },
  { id: "map-widget", label: "Map Widget", checked: false, icon: "🗺️" },
  { id: "data-table", label: "Data Table", checked: false, icon: "📋" },
  { id: "kpi-indicators", label: "KPI Indicators", checked: false, icon: "🎯" },
];

// Table/List Features
const tableFeatureOptions: CheckboxOption[] = [
  { id: "pagination", label: "Pagination", checked: false, icon: "📄" },
  { id: "sorting", label: "Column Sorting", checked: false, icon: "↕️" },
  { id: "filtering", label: "Advanced Filtering", checked: false, icon: "🔍" },
  { id: "search", label: "Search Bar", checked: false, icon: "🔎" },
  { id: "bulk-actions", label: "Bulk Actions", checked: false, icon: "☑️" },
  { id: "row-selection", label: "Row Selection", checked: false, icon: "✔️" },
  { id: "inline-editing", label: "Inline Editing", checked: false, icon: "✏️" },
  { id: "expandable-rows", label: "Expandable Rows", checked: false, icon: "➕" },
  { id: "export-csv", label: "Export to CSV", checked: false, icon: "📥" },
  { id: "export-pdf", label: "Export to PDF", checked: false, icon: "📑" },
  { id: "column-visibility", label: "Column Visibility Toggle", checked: false, icon: "👁️" },
  { id: "sticky-header", label: "Sticky Header", checked: false, icon: "📌" },
  { id: "row-actions", label: "Row Actions (Edit/Delete)", checked: false, icon: "⚙️" },
  { id: "status-badges", label: "Status Badges", checked: false, icon: "🏷️" },
];

// Form Features
const formFeatureOptions: CheckboxOption[] = [
  { id: "validation", label: "Form Validation", checked: false, icon: "✅" },
  { id: "multi-step", label: "Multi-Step Form", checked: false, icon: "📝" },
  { id: "file-upload", label: "File Upload", checked: false, icon: "📤" },
  { id: "image-upload", label: "Image Upload with Preview", checked: false, icon: "🖼️" },
  { id: "rich-text", label: "Rich Text Editor", checked: false, icon: "📄" },
  { id: "date-picker", label: "Date Picker", checked: false, icon: "📅" },
  { id: "time-picker", label: "Time Picker", checked: false, icon: "🕐" },
  { id: "color-picker", label: "Color Picker", checked: false, icon: "🎨" },
  { id: "autocomplete", label: "Autocomplete/Typeahead", checked: false, icon: "🔤" },
  { id: "dropdown", label: "Dropdown Select", checked: false, icon: "📋" },
  { id: "multi-select", label: "Multi-Select", checked: false, icon: "☑️" },
  { id: "tags-input", label: "Tags Input", checked: false, icon: "🏷️" },
  { id: "slider", label: "Range Slider", checked: false, icon: "📏" },
  { id: "toggle-switch", label: "Toggle Switches", checked: false, icon: "🔘" },
  { id: "conditional-fields", label: "Conditional Fields", checked: false, icon: "🔀" },
  { id: "autosave", label: "Auto-Save Draft", checked: false, icon: "💾" },
];

// Modal/Dialog Features
const modalFeatureOptions: CheckboxOption[] = [
  { id: "create-modal", label: "Create/Add Modal", checked: false, icon: "➕" },
  { id: "edit-modal", label: "Edit Modal", checked: false, icon: "✏️" },
  { id: "view-modal", label: "View Details Modal", checked: false, icon: "👁️" },
  { id: "delete-confirm", label: "Delete Confirmation", checked: false, icon: "🗑️" },
  { id: "image-preview", label: "Image Preview Modal", checked: false, icon: "🖼️" },
  { id: "drawer", label: "Side Drawer", checked: false, icon: "📋" },
  { id: "full-screen", label: "Full-Screen Modal", checked: false, icon: "🖥️" },
  { id: "nested-modal", label: "Nested Modals", checked: false, icon: "📦" },
];

// Navigation Features
const navigationFeatureOptions: CheckboxOption[] = [
  { id: "sidebar", label: "Collapsible Sidebar", checked: false, icon: "📋" },
  { id: "top-nav", label: "Top Navigation Bar", checked: false, icon: "🔝" },
  { id: "breadcrumbs", label: "Breadcrumbs", checked: false, icon: "🧭" },
  { id: "tabs", label: "Tab Navigation", checked: false, icon: "📑" },
  { id: "dropdown-menu", label: "Dropdown Menus", checked: false, icon: "📋" },
  { id: "mega-menu", label: "Mega Menu", checked: false, icon: "📊" },
  { id: "nested-menu", label: "Nested/Accordion Menu", checked: false, icon: "📁" },
  { id: "search-nav", label: "Search in Navigation", checked: false, icon: "🔍" },
  { id: "user-menu", label: "User Profile Menu", checked: false, icon: "👤" },
  { id: "notifications-dropdown", label: "Notifications Dropdown", checked: false, icon: "🔔" },
];

// Data Display Features
const dataDisplayOptions: CheckboxOption[] = [
  { id: "cards-grid", label: "Cards Grid Layout", checked: false, icon: "🃏" },
  { id: "list-view", label: "List View", checked: false, icon: "📋" },
  { id: "kanban", label: "Kanban Board", checked: false, icon: "📊" },
  { id: "timeline", label: "Timeline View", checked: false, icon: "📅" },
  { id: "tree-view", label: "Tree View", checked: false, icon: "🌳" },
  { id: "masonry", label: "Masonry Grid", checked: false, icon: "🧱" },
  { id: "carousel", label: "Carousel/Slider", checked: false, icon: "🎠" },
  { id: "gallery", label: "Image Gallery", checked: false, icon: "🖼️" },
  { id: "accordion", label: "Accordion/Collapsible", checked: false, icon: "📋" },
  { id: "infinite-scroll", label: "Infinite Scroll", checked: false, icon: "♾️" },
];

// User Interaction Features
const interactionOptions: CheckboxOption[] = [
  { id: "drag-drop", label: "Drag & Drop", checked: false, icon: "🖐️" },
  { id: "drag-reorder", label: "Drag to Reorder", checked: false, icon: "↕️" },
  { id: "context-menu", label: "Right-Click Context Menu", checked: false, icon: "📋" },
  { id: "keyboard-shortcuts", label: "Keyboard Shortcuts", checked: false, icon: "⌨️" },
  { id: "copy-clipboard", label: "Copy to Clipboard", checked: false, icon: "📋" },
  { id: "undo-redo", label: "Undo/Redo Actions", checked: false, icon: "↩️" },
  { id: "favorites", label: "Favorites/Bookmarks", checked: false, icon: "⭐" },
  { id: "comments", label: "Comments/Notes", checked: false, icon: "💬" },
  { id: "ratings", label: "Star Ratings", checked: false, icon: "⭐" },
  { id: "reactions", label: "Reactions/Emoji", checked: false, icon: "👍" },
];

// State Management Features
const stateFeatureOptions: CheckboxOption[] = [
  { id: "loading-states", label: "Loading States/Spinners", checked: false, icon: "⏳" },
  { id: "skeleton", label: "Skeleton Loaders", checked: false, icon: "💀" },
  { id: "empty-states", label: "Empty State Views", checked: false, icon: "📭" },
  { id: "error-states", label: "Error State Handling", checked: false, icon: "⚠️" },
  { id: "success-toast", label: "Success Toast/Notification", checked: false, icon: "✅" },
  { id: "error-toast", label: "Error Toast/Notification", checked: false, icon: "❌" },
  { id: "confirmation-dialog", label: "Confirmation Dialogs", checked: false, icon: "❓" },
  { id: "real-time-updates", label: "Real-Time Updates", checked: false, icon: "🔄" },
  { id: "optimistic-ui", label: "Optimistic UI Updates", checked: false, icon: "⚡" },
];

export default function ModuleStudio() {
  // Form state
  const [reviewEntireProject, setReviewEntireProject] = useState("");
  const [moduleTitle, setModuleTitle] = useState("");
  const [moduleDescription, setModuleDescription] = useState("");
  const [moduleTypes, setModuleTypes] = useState<CheckboxOption[]>(moduleTypeOptions);
  const [dashboardWidgets, setDashboardWidgets] = useState<CheckboxOption[]>(dashboardWidgetOptions);
  const [tableFeatures, setTableFeatures] = useState<CheckboxOption[]>(tableFeatureOptions);
  const [formFeatures, setFormFeatures] = useState<CheckboxOption[]>(formFeatureOptions);
  const [modalFeatures, setModalFeatures] = useState<CheckboxOption[]>(modalFeatureOptions);
  const [navigationFeatures, setNavigationFeatures] = useState<CheckboxOption[]>(navigationFeatureOptions);
  const [dataDisplayFeatures, setDataDisplayFeatures] = useState<CheckboxOption[]>(dataDisplayOptions);
  const [interactionFeatures, setInteractionFeatures] = useState<CheckboxOption[]>(interactionOptions);
  const [stateFeatures, setStateFeatures] = useState<CheckboxOption[]>(stateFeatureOptions);

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

  // Check if dashboard is selected to show widgets
  const showDashboardWidgets = moduleTypes.find((m) => m.id === "dashboard")?.checked;

  // Generate the prompt
  const generatePrompt = () => {
    const selectedModules = moduleTypes.filter((opt) => opt.checked).map((opt) => opt.label);
    const selectedWidgets = dashboardWidgets.filter((opt) => opt.checked).map((opt) => opt.label);
    const selectedTableFeatures = tableFeatures.filter((opt) => opt.checked).map((opt) => opt.label);
    const selectedFormFeatures = formFeatures.filter((opt) => opt.checked).map((opt) => opt.label);
    const selectedModalFeatures = modalFeatures.filter((opt) => opt.checked).map((opt) => opt.label);
    const selectedNavFeatures = navigationFeatures.filter((opt) => opt.checked).map((opt) => opt.label);
    const selectedDataDisplay = dataDisplayFeatures.filter((opt) => opt.checked).map((opt) => opt.label);
    const selectedInteractions = interactionFeatures.filter((opt) => opt.checked).map((opt) => opt.label);
    const selectedStateFeatures = stateFeatures.filter((opt) => opt.checked).map((opt) => opt.label);
    const validLinks = referenceLinks.filter((link) => link.url.trim());

    let prompt = "";

    // Review Entire Project
    if (reviewEntireProject.trim()) {
      prompt += `## Review Entire Project\n`;
      prompt += `${reviewEntireProject}\n\n`;
    }

    // Module Title
    if (moduleTitle.trim()) {
      prompt += `# Module: ${moduleTitle}\n\n`;
    }

    // Module Description
    if (moduleDescription.trim()) {
      prompt += `## Module Description\n`;
      prompt += `${moduleDescription}\n\n`;
    }

    prompt += `## Frontend Module Design Request\n\n`;

    // Module Types
    if (selectedModules.length > 0) {
      prompt += `### Module/Page Type(s)\n`;
      selectedModules.forEach((module) => {
        prompt += `- ${module}\n`;
      });
      prompt += `\n`;
    }

    // Dashboard Widgets (if dashboard selected)
    if (showDashboardWidgets && selectedWidgets.length > 0) {
      prompt += `### Dashboard Widgets & Components\n`;
      selectedWidgets.forEach((widget) => {
        prompt += `- ${widget}\n`;
      });
      prompt += `\n`;
    }

    // Table Features
    if (selectedTableFeatures.length > 0) {
      prompt += `### Table/List Features\n`;
      selectedTableFeatures.forEach((feature) => {
        prompt += `- ${feature}\n`;
      });
      prompt += `\n`;
    }

    // Form Features
    if (selectedFormFeatures.length > 0) {
      prompt += `### Form Features\n`;
      selectedFormFeatures.forEach((feature) => {
        prompt += `- ${feature}\n`;
      });
      prompt += `\n`;
    }

    // Modal Features
    if (selectedModalFeatures.length > 0) {
      prompt += `### Modal/Dialog Features\n`;
      selectedModalFeatures.forEach((feature) => {
        prompt += `- ${feature}\n`;
      });
      prompt += `\n`;
    }

    // Navigation Features
    if (selectedNavFeatures.length > 0) {
      prompt += `### Navigation Features\n`;
      selectedNavFeatures.forEach((feature) => {
        prompt += `- ${feature}\n`;
      });
      prompt += `\n`;
    }

    // Data Display
    if (selectedDataDisplay.length > 0) {
      prompt += `### Data Display Options\n`;
      selectedDataDisplay.forEach((feature) => {
        prompt += `- ${feature}\n`;
      });
      prompt += `\n`;
    }

    // Interaction Features
    if (selectedInteractions.length > 0) {
      prompt += `### User Interaction Features\n`;
      selectedInteractions.forEach((feature) => {
        prompt += `- ${feature}\n`;
      });
      prompt += `\n`;
    }

    // State Features
    if (selectedStateFeatures.length > 0) {
      prompt += `### State Management & Feedback\n`;
      selectedStateFeatures.forEach((feature) => {
        prompt += `- ${feature}\n`;
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
      prompt += `### Reference Screenshots/Mockups\n`;
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
    prompt += `Please create a complete, production-ready implementation with:\n`;
    prompt += `1. Clean, well-organized component structure\n`;
    prompt += `2. Proper state management\n`;
    prompt += `3. Responsive design for all screen sizes\n`;
    prompt += `4. Accessibility best practices\n`;
    prompt += `5. Smooth animations and transitions\n`;
    prompt += `6. Consistent styling with the existing design system\n`;

    setGeneratedPrompt(prompt);
  };

  // Clear form
  const clearForm = () => {
    setReviewEntireProject("");
    setModuleTitle("");
    setModuleDescription("");
    setModuleTypes(moduleTypeOptions.map((opt) => ({ ...opt, checked: false })));
    setDashboardWidgets(dashboardWidgetOptions.map((opt) => ({ ...opt, checked: false })));
    setTableFeatures(tableFeatureOptions.map((opt) => ({ ...opt, checked: false })));
    setFormFeatures(formFeatureOptions.map((opt) => ({ ...opt, checked: false })));
    setModalFeatures(modalFeatureOptions.map((opt) => ({ ...opt, checked: false })));
    setNavigationFeatures(navigationFeatureOptions.map((opt) => ({ ...opt, checked: false })));
    setDataDisplayFeatures(dataDisplayOptions.map((opt) => ({ ...opt, checked: false })));
    setInteractionFeatures(interactionOptions.map((opt) => ({ ...opt, checked: false })));
    setStateFeatures(stateFeatureOptions.map((opt) => ({ ...opt, checked: false })));
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
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-green-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: "1s" }} />
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
              href="/module-studio"
              className="px-4 py-2 bg-teal-100 text-teal-700 font-medium rounded-lg transition-all"
            >
              Module Studio
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
          <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-2xl p-6 border border-white/30 hover:shadow-teal-200/50 transition-shadow duration-300 max-h-[calc(100vh-150px)] overflow-y-auto">
            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <span className="text-2xl">🎯</span>
              Module Builder
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
                className="w-full px-4 py-3 bg-white/50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-400 focus:border-teal-400 outline-none transition-all hover:border-teal-300"
              />
            </div>

            {/* Module Title */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Module/Page Title
              </label>
              <input
                type="text"
                value={moduleTitle}
                onChange={(e) => setModuleTitle(e.target.value)}
                placeholder="e.g., Admin Dashboard, User Management Panel"
                className="w-full px-4 py-3 bg-white/50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-400 focus:border-teal-400 outline-none transition-all hover:border-teal-300"
              />
            </div>

            {/* Module Description */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Describe Module Purpose
              </label>
              <textarea
                value={moduleDescription}
                onChange={(e) => setModuleDescription(e.target.value)}
                placeholder="Describe what this module should do, its main features, and target users..."
                rows={3}
                className="w-full px-4 py-3 bg-white/50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-400 focus:border-teal-400 outline-none transition-all resize-none hover:border-teal-300"
              />
            </div>

            {/* Module Type - Checklist */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Module/Page Type
              </label>
              <div className="grid grid-cols-2 gap-3">
                {moduleTypes.map((option) => (
                  <label
                    key={option.id}
                    className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-200 border-2 ${
                      option.checked
                        ? "bg-gradient-to-r from-teal-100 to-green-100 border-teal-400 shadow-md"
                        : "bg-white/50 border-gray-200 hover:border-teal-300 hover:bg-teal-50"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={option.checked}
                      onChange={() => handleCheckboxChange(option.id, setModuleTypes)}
                      className="w-5 h-5 text-teal-500 border-gray-300 rounded focus:ring-teal-400 accent-teal-500"
                    />
                    <span className="text-lg">{option.icon}</span>
                    <span className="text-gray-700 text-sm font-medium">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Dashboard Widgets - Conditional */}
            {showDashboardWidgets && (
              <div className="mb-6 p-4 bg-gradient-to-r from-teal-50 to-green-50 rounded-xl border-2 border-teal-200">
                <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <span className="text-lg">📊</span>
                  Dashboard Widgets & Components
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {dashboardWidgets.map((option) => (
                    <label
                      key={option.id}
                      className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-200 border-2 ${
                        option.checked
                          ? "bg-gradient-to-r from-teal-100 to-green-100 border-teal-400 shadow-md"
                          : "bg-white/70 border-gray-200 hover:border-teal-300 hover:bg-teal-50"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={option.checked}
                        onChange={() => handleCheckboxChange(option.id, setDashboardWidgets)}
                        className="w-5 h-5 text-teal-500 border-gray-300 rounded focus:ring-teal-400 accent-teal-500"
                      />
                      <span className="text-lg">{option.icon}</span>
                      <span className="text-gray-700 text-sm font-medium">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Table Features - Checklist */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Table/List Features
              </label>
              <div className="grid grid-cols-2 gap-3">
                {tableFeatures.map((option) => (
                  <label
                    key={option.id}
                    className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-200 border-2 ${
                      option.checked
                        ? "bg-gradient-to-r from-teal-100 to-green-100 border-teal-400 shadow-md"
                        : "bg-white/50 border-gray-200 hover:border-teal-300 hover:bg-teal-50"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={option.checked}
                      onChange={() => handleCheckboxChange(option.id, setTableFeatures)}
                      className="w-5 h-5 text-teal-500 border-gray-300 rounded focus:ring-teal-400 accent-teal-500"
                    />
                    <span className="text-lg">{option.icon}</span>
                    <span className="text-gray-700 text-sm font-medium">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Form Features - Checklist */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Form Features
              </label>
              <div className="grid grid-cols-2 gap-3">
                {formFeatures.map((option) => (
                  <label
                    key={option.id}
                    className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-200 border-2 ${
                      option.checked
                        ? "bg-gradient-to-r from-teal-100 to-green-100 border-teal-400 shadow-md"
                        : "bg-white/50 border-gray-200 hover:border-teal-300 hover:bg-teal-50"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={option.checked}
                      onChange={() => handleCheckboxChange(option.id, setFormFeatures)}
                      className="w-5 h-5 text-teal-500 border-gray-300 rounded focus:ring-teal-400 accent-teal-500"
                    />
                    <span className="text-lg">{option.icon}</span>
                    <span className="text-gray-700 text-sm font-medium">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Modal Features - Checklist */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Modal/Dialog Features
              </label>
              <div className="grid grid-cols-2 gap-3">
                {modalFeatures.map((option) => (
                  <label
                    key={option.id}
                    className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-200 border-2 ${
                      option.checked
                        ? "bg-gradient-to-r from-teal-100 to-green-100 border-teal-400 shadow-md"
                        : "bg-white/50 border-gray-200 hover:border-teal-300 hover:bg-teal-50"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={option.checked}
                      onChange={() => handleCheckboxChange(option.id, setModalFeatures)}
                      className="w-5 h-5 text-teal-500 border-gray-300 rounded focus:ring-teal-400 accent-teal-500"
                    />
                    <span className="text-lg">{option.icon}</span>
                    <span className="text-gray-700 text-sm font-medium">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Navigation Features - Checklist */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Navigation Features
              </label>
              <div className="grid grid-cols-2 gap-3">
                {navigationFeatures.map((option) => (
                  <label
                    key={option.id}
                    className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-200 border-2 ${
                      option.checked
                        ? "bg-gradient-to-r from-teal-100 to-green-100 border-teal-400 shadow-md"
                        : "bg-white/50 border-gray-200 hover:border-teal-300 hover:bg-teal-50"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={option.checked}
                      onChange={() => handleCheckboxChange(option.id, setNavigationFeatures)}
                      className="w-5 h-5 text-teal-500 border-gray-300 rounded focus:ring-teal-400 accent-teal-500"
                    />
                    <span className="text-lg">{option.icon}</span>
                    <span className="text-gray-700 text-sm font-medium">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Data Display - Checklist */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Data Display Options
              </label>
              <div className="grid grid-cols-2 gap-3">
                {dataDisplayFeatures.map((option) => (
                  <label
                    key={option.id}
                    className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-200 border-2 ${
                      option.checked
                        ? "bg-gradient-to-r from-teal-100 to-green-100 border-teal-400 shadow-md"
                        : "bg-white/50 border-gray-200 hover:border-teal-300 hover:bg-teal-50"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={option.checked}
                      onChange={() => handleCheckboxChange(option.id, setDataDisplayFeatures)}
                      className="w-5 h-5 text-teal-500 border-gray-300 rounded focus:ring-teal-400 accent-teal-500"
                    />
                    <span className="text-lg">{option.icon}</span>
                    <span className="text-gray-700 text-sm font-medium">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Interaction Features - Checklist */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                User Interaction Features
              </label>
              <div className="grid grid-cols-2 gap-3">
                {interactionFeatures.map((option) => (
                  <label
                    key={option.id}
                    className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-200 border-2 ${
                      option.checked
                        ? "bg-gradient-to-r from-teal-100 to-green-100 border-teal-400 shadow-md"
                        : "bg-white/50 border-gray-200 hover:border-teal-300 hover:bg-teal-50"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={option.checked}
                      onChange={() => handleCheckboxChange(option.id, setInteractionFeatures)}
                      className="w-5 h-5 text-teal-500 border-gray-300 rounded focus:ring-teal-400 accent-teal-500"
                    />
                    <span className="text-lg">{option.icon}</span>
                    <span className="text-gray-700 text-sm font-medium">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* State Features - Checklist */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                State Management & Feedback
              </label>
              <div className="grid grid-cols-2 gap-3">
                {stateFeatures.map((option) => (
                  <label
                    key={option.id}
                    className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-200 border-2 ${
                      option.checked
                        ? "bg-gradient-to-r from-teal-100 to-green-100 border-teal-400 shadow-md"
                        : "bg-white/50 border-gray-200 hover:border-teal-300 hover:bg-teal-50"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={option.checked}
                      onChange={() => handleCheckboxChange(option.id, setStateFeatures)}
                      className="w-5 h-5 text-teal-500 border-gray-300 rounded focus:ring-teal-400 accent-teal-500"
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
                      placeholder="https://example.com/dashboard-reference"
                      className="w-full px-4 py-2 bg-white/50 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-400 focus:border-teal-400 outline-none transition-all hover:border-teal-300 text-sm"
                    />
                    <input
                      type="text"
                      value={link.description}
                      onChange={(e) => updateReferenceLink(link.id, "description", e.target.value)}
                      placeholder="What to take from this reference?"
                      className="w-full px-4 py-2 bg-white/50 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-400 focus:border-teal-400 outline-none transition-all hover:border-teal-300 text-sm"
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
                className="text-sm text-teal-600 hover:text-teal-700 font-medium flex items-center gap-1 mt-2"
              >
                <span>+</span> Add another link
              </button>
            </div>

            {/* Image Upload */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <span className="text-lg">🖼️</span>
                Reference Screenshots / Mockups
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
                className="w-full py-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-teal-400 hover:bg-teal-50 transition-all text-gray-500 hover:text-teal-600 flex flex-col items-center gap-2"
              >
                <span className="text-3xl">📤</span>
                <span className="text-sm font-medium">Click to upload screenshots</span>
                <span className="text-xs text-gray-400">Dashboard mockups, wireframes, etc.</span>
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
                          placeholder="Describe what to replicate..."
                          className="w-full mt-2 px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-teal-400 focus:border-teal-400 outline-none"
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
                placeholder="Any specific requirements, business logic, or design details..."
                rows={4}
                className="w-full px-4 py-3 bg-white/50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-400 focus:border-teal-400 outline-none transition-all resize-none hover:border-teal-300"
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-4 sticky bottom-0 bg-white/70 py-4 -mx-6 px-6 border-t border-gray-200">
              <button
                onClick={generatePrompt}
                className="flex-1 bg-gradient-to-r from-teal-400 via-green-400 to-emerald-400 hover:from-teal-500 hover:via-green-500 hover:to-emerald-500 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
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
          <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-2xl p-6 border border-white/30 hover:shadow-green-200/50 transition-shadow duration-300">
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
                      : "bg-gradient-to-r from-teal-400 to-green-400 hover:from-teal-500 hover:to-green-500 text-white"
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
                  <span className="text-6xl mb-4 opacity-50">🎯</span>
                  <p className="text-center">
                    Fill in the form and click<br />
                    <span className="text-teal-400 font-semibold">&quot;Generate Prompt&quot;</span><br />
                    to create your Claude prompt
                  </p>
                  <p className="text-xs text-gray-600 mt-4 text-center">
                    Perfect for detailed dashboard,<br />
                    admin panel, and module specifications
                  </p>
                </div>
              )}
            </div>

            {/* Tip box */}
            {generatedPrompt && (
              <div className="mt-4 p-4 bg-gradient-to-r from-teal-50 to-green-50 rounded-xl border border-teal-200">
                <p className="text-sm text-teal-800 flex items-start gap-2">
                  <span className="text-lg">💡</span>
                  <span>
                    <strong>Tip:</strong> Upload dashboard mockups or screenshots to help Claude understand the exact layout and design you want.
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
