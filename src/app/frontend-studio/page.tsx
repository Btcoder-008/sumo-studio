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

type UploadedVideo = {
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
  { icon: "🎨", top: "10%", left: "5%", delay: "0s", duration: "7s" },
  { icon: "💅", top: "20%", right: "8%", delay: "1s", duration: "6s" },
  { icon: "🖌️", top: "60%", left: "3%", delay: "2s", duration: "8s" },
  { icon: "📐", bottom: "20%", right: "5%", delay: "0.5s", duration: "7s" },
  { icon: "🎭", top: "40%", right: "3%", delay: "1.5s", duration: "5s" },
  { icon: "✨", bottom: "30%", left: "8%", delay: "3s", duration: "6s" },
];

// Page type options
const pageTypeOptions: CheckboxOption[] = [
  { id: "landing-page", label: "Landing Page", checked: false, icon: "🏠" },
  { id: "admin-page", label: "Admin Page", checked: false, icon: "⚙️" },
  { id: "customer-page", label: "Customer Page", checked: false, icon: "👥" },
  { id: "employee-page", label: "Employee Page", checked: false, icon: "👔" },
  { id: "service-page", label: "Service Page", checked: false, icon: "🛠️" },
  { id: "accounts-page", label: "Accounts Page", checked: false, icon: "💰" },
  { id: "inventory-page", label: "Inventory Page", checked: false, icon: "📦" },
  { id: "dashboard-page", label: "Dashboard Page", checked: false, icon: "📊" },
  { id: "e-commerce-page", label: "E-Commerce Page", checked: false, icon: "🛒" },
  { id: "blog-page", label: "Blog Page", checked: false, icon: "📝" },
  { id: "portfolio-page", label: "Portfolio Page", checked: false, icon: "💼" },
  { id: "form-page", label: "Form Page", checked: false, icon: "📋" },
  { id: "contact-page", label: "Contact Page", checked: false, icon: "📞" },
  { id: "gallery-page", label: "Gallery Page", checked: false, icon: "🖼️" },
  { id: "404-page", label: "404 / Error Page", checked: false, icon: "❌" },
  { id: "settings-page", label: "Settings Page", checked: false, icon: "🔧" },
];

// UI Framework options
const frameworkOptions: CheckboxOption[] = [
  { id: "tailwind", label: "Tailwind CSS", checked: false, icon: "🎨" },
  { id: "bootstrap", label: "Bootstrap", checked: false, icon: "🅱️" },
  { id: "material-ui", label: "Material UI (MUI)", checked: false, icon: "🎯" },
  { id: "ant-design", label: "Ant Design", checked: false, icon: "🐜" },
  { id: "chakra-ui", label: "Chakra UI", checked: false, icon: "⚡" },
  { id: "shadcn", label: "shadcn/ui", checked: false, icon: "🎭" },
  { id: "plain-css", label: "Plain CSS", checked: false, icon: "📄" },
  { id: "styled-components", label: "Styled Components", checked: false, icon: "💅" },
];

// Color scheme options
const colorSchemeOptions: CheckboxOption[] = [
  { id: "light", label: "Light Theme", checked: false, icon: "☀️" },
  { id: "dark", label: "Dark Theme", checked: false, icon: "🌙" },
  { id: "both", label: "Both (with toggle)", checked: false, icon: "🔄" },
  { id: "custom", label: "Custom Colors", checked: false, icon: "🎨" },
];

// UI Design Effects options
const uiDesignOptions: CheckboxOption[] = [
  { id: "glassmorphism", label: "Glassmorphism / Glassy Effects", checked: false, icon: "🪟" },
  { id: "neumorphism", label: "Neumorphism / Soft UI", checked: false, icon: "🔘" },
  { id: "gradient", label: "Gradient Backgrounds", checked: false, icon: "🌈" },
  { id: "particles", label: "Particles Animation", checked: false, icon: "✨" },
  { id: "floating", label: "Floating Elements", checked: false, icon: "🎈" },
  { id: "parallax", label: "Parallax Scrolling", checked: false, icon: "📜" },
  { id: "cursor-effects", label: "Mouse Pointer Highlighter", checked: false, icon: "🖱️" },
  { id: "cursor-trail", label: "Cursor Trail Effect", checked: false, icon: "💫" },
  { id: "blob", label: "Blob / Organic Shapes", checked: false, icon: "🫧" },
  { id: "neon-glow", label: "Neon Glow Effects", checked: false, icon: "💡" },
  { id: "shadows", label: "3D Shadows / Depth", checked: false, icon: "🎭" },
  { id: "hover-effects", label: "Hover Animations", checked: false, icon: "👆" },
  { id: "scroll-animations", label: "Scroll Animations", checked: false, icon: "⬇️" },
  { id: "micro-interactions", label: "Micro-interactions", checked: false, icon: "🔄" },
  { id: "morphing", label: "Morphing / Shape Shifting", checked: false, icon: "🔀" },
  { id: "typewriter", label: "Typewriter Effect", checked: false, icon: "⌨️" },
  { id: "ripple", label: "Ripple Effects", checked: false, icon: "💧" },
  { id: "confetti", label: "Confetti / Celebration", checked: false, icon: "🎊" },
  { id: "aurora", label: "Aurora / Northern Lights", checked: false, icon: "🌌" },
  { id: "noise-texture", label: "Noise / Grain Texture", checked: false, icon: "📺" },
  { id: "card-flip", label: "Card Flip Animation", checked: false, icon: "🃏" },
  { id: "skeleton-loading", label: "Skeleton Loading", checked: false, icon: "💀" },
  { id: "shimmer", label: "Shimmer Effect", checked: false, icon: "✨" },
  { id: "wave", label: "Wave Animation", checked: false, icon: "🌊" },
  { id: "spotlight", label: "Spotlight Effect", checked: false, icon: "🔦" },
  { id: "tilt-3d", label: "3D Tilt on Hover", checked: false, icon: "📐" },
  { id: "blur-background", label: "Blur Background", checked: false, icon: "🌫️" },
  { id: "animated-borders", label: "Animated Borders", checked: false, icon: "🔲" },
  { id: "text-reveal", label: "Text Reveal Animation", checked: false, icon: "📝" },
  { id: "sticky-elements", label: "Sticky Elements", checked: false, icon: "📌" },
];

// Layout options
const layoutOptions: CheckboxOption[] = [
  { id: "sidebar", label: "Sidebar Navigation", checked: false, icon: "📋" },
  { id: "topnav", label: "Top Navigation Bar", checked: false, icon: "🔝" },
  { id: "footer", label: "Footer Section", checked: false, icon: "👇" },
  { id: "breadcrumb", label: "Breadcrumb Navigation", checked: false, icon: "🧭" },
  { id: "hero", label: "Hero Section", checked: false, icon: "🦸" },
  { id: "cards-grid", label: "Cards Grid Layout", checked: false, icon: "🃏" },
  { id: "table", label: "Data Table", checked: false, icon: "📊" },
  { id: "modal", label: "Modal / Popup", checked: false, icon: "💬" },
];

// Feature options
const featureOptions: CheckboxOption[] = [
  { id: "responsive", label: "Responsive Design", checked: false, icon: "📱" },
  { id: "dark-mode", label: "Dark Mode Toggle", checked: false, icon: "🌙" },
  { id: "animations", label: "Animations / Transitions", checked: false, icon: "✨" },
  { id: "form-validation", label: "Form Validation", checked: false, icon: "✅" },
  { id: "search", label: "Search Functionality", checked: false, icon: "🔍" },
  { id: "filters", label: "Filters / Sorting", checked: false, icon: "🔧" },
  { id: "pagination", label: "Pagination", checked: false, icon: "📄" },
  { id: "loading-states", label: "Loading States / Skeletons", checked: false, icon: "⏳" },
  { id: "notifications", label: "Toast / Notifications", checked: false, icon: "🔔" },
  { id: "drag-drop", label: "Drag & Drop", checked: false, icon: "🖐️" },
  { id: "charts", label: "Charts / Graphs", checked: false, icon: "📈" },
  { id: "file-upload", label: "File Upload", checked: false, icon: "📤" },
  { id: "coming-soon", label: "Create all pages as Coming Soon with Logo", checked: false, icon: "🚧" },
];

// Functionality options (conditional - shown for dashboard/admin)
const functionalityOptions: CheckboxOption[] = [
  { id: "crud", label: "CRUD Operations", checked: false, icon: "⚙️" },
  { id: "api-integration", label: "API Integration", checked: false, icon: "🔗" },
  { id: "auth", label: "Authentication Flow", checked: false, icon: "🔐" },
  { id: "role-based", label: "Role-based Access", checked: false, icon: "👥" },
  { id: "real-time", label: "Real-time Updates", checked: false, icon: "⚡" },
  { id: "export", label: "Export Data (CSV/PDF)", checked: false, icon: "📥" },
];

export default function FrontendStudio() {
  // Form state
  const [reviewEntireProject, setReviewEntireProject] = useState("");
  const [projectName, setProjectName] = useState("");
  const [responsiveDesign, setResponsiveDesign] = useState(false);
  const [comingSoonFirst, setComingSoonFirst] = useState(false);
  const [frontendStackInfo, setFrontendStackInfo] = useState(false);
  const [backendStackInfo, setBackendStackInfo] = useState(false);
  const [databaseInfo, setDatabaseInfo] = useState(false);
  const [mobileFirstApproach, setMobileFirstApproach] = useState(false);
  const [hamburgerMobileTopNavDesktop, setHamburgerMobileTopNavDesktop] = useState(false);
  const [comingSoonPages, setComingSoonPages] = useState(false);
  const [sidebarNavDesktop, setSidebarNavDesktop] = useState(false);
  const [bottomNavMobile, setBottomNavMobile] = useState(false);
  const [darkLightModeToggle, setDarkLightModeToggle] = useState(false);
  const [multiLanguage, setMultiLanguage] = useState(false);
  const [pageZoom, setPageZoom] = useState(false);
  const [referenceTheme, setReferenceTheme] = useState("");
  const [pageTypes, setPageTypes] = useState<CheckboxOption[]>(pageTypeOptions);
  const [customPageType, setCustomPageType] = useState("");
  const [frameworks, setFrameworks] = useState<CheckboxOption[]>(frameworkOptions);
  const [colorSchemes, setColorSchemes] = useState<CheckboxOption[]>(colorSchemeOptions);
  const [customColors, setCustomColors] = useState("");
  const [uiDesigns, setUiDesigns] = useState<CheckboxOption[]>(uiDesignOptions);

  const [layouts, setLayouts] = useState<CheckboxOption[]>(layoutOptions);
  const [features, setFeatures] = useState<CheckboxOption[]>(featureOptions);
  const [functionalities, setFunctionalities] = useState<CheckboxOption[]>(functionalityOptions);

  const [referenceLinks, setReferenceLinks] = useState<ReferenceLink[]>([
    { id: "1", url: "", description: "" }
  ]);
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const [desktopVideo, setDesktopVideo] = useState<UploadedVideo | null>(null);
  const [mobileVideo, setMobileVideo] = useState<UploadedVideo | null>(null);

  const [targetAudience, setTargetAudience] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");

  // Generated prompt state
  const [generatedPrompt, setGeneratedPrompt] = useState("");
  const [copied, setCopied] = useState(false);

  // File input refs
  const fileInputRef = useRef<HTMLInputElement>(null);
  const desktopVideoRef = useRef<HTMLInputElement>(null);
  const mobileVideoRef = useRef<HTMLInputElement>(null);

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

  // Handle video upload
  const handleVideoUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<UploadedVideo | null>>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const videoUrl = URL.createObjectURL(file);
      setter({
        id: Date.now().toString(),
        name: file.name,
        preview: videoUrl,
        description: ""
      });
    }
  };

  // Update video description
  const updateVideoDescription = (
    setter: React.Dispatch<React.SetStateAction<UploadedVideo | null>>,
    video: UploadedVideo,
    description: string
  ) => {
    setter({ ...video, description });
  };

  // Remove video
  const removeVideo = (setter: React.Dispatch<React.SetStateAction<UploadedVideo | null>>) => {
    setter(null);
  };

  // Check if should show functionality options (conditional)
  const showFunctionalityOptions = pageTypes.some(
    (pt) => pt.checked && ["dashboard-page", "admin-page", "e-commerce-page"].includes(pt.id)
  );

  // Check if custom page type is selected
  const showCustomPageType = pageTypes.find((pt) => pt.id === "custom")?.checked;

  // Check if custom colors is selected
  const showCustomColors = colorSchemes.find((cs) => cs.id === "custom")?.checked;

  // Generate the prompt
  const generatePrompt = () => {
    const selectedPageTypes = pageTypes.filter((opt) => opt.checked).map((opt) => opt.label);
    const selectedFrameworks = frameworks.filter((opt) => opt.checked).map((opt) => opt.label);
    const selectedColorSchemes = colorSchemes.filter((opt) => opt.checked).map((opt) => opt.label);
    const selectedUiDesigns = uiDesigns.filter((opt) => opt.checked).map((opt) => opt.label);
    const selectedLayouts = layouts.filter((opt) => opt.checked).map((opt) => opt.label);
    const selectedFeatures = features.filter((opt) => opt.checked).map((opt) => opt.label);
    const selectedFunctionalities = functionalities.filter((opt) => opt.checked).map((opt) => opt.label);
    const validLinks = referenceLinks.filter((link) => link.url.trim());

    let prompt = "";

    // Review Entire Project
    if (reviewEntireProject.trim()) {
      prompt += `## Review Entire Project\n`;
      prompt += `${reviewEntireProject}\n\n`;
    }

    // Mandatory things in this Project
    const mandatoryItems = [];
    if (mobileFirstApproach) mandatoryItems.push("Prepare the mobile interface initially and then work on the desktop");
    if (hamburgerMobileTopNavDesktop) mandatoryItems.push("Use a hamburger menu for mobile and top navigation for desktop");
    if (comingSoonPages) mandatoryItems.push("Create all pages as empty with a \"Coming Soon\" message");
    if (sidebarNavDesktop) mandatoryItems.push("All Modules are in Sidebar navigation on desktop view");
    if (bottomNavMobile) mandatoryItems.push("All Modules are in Bottom navigation bar on mobile view");
    if (darkLightModeToggle) mandatoryItems.push("Dark and Light Mode Toggle");
    if (multiLanguage) mandatoryItems.push("Multi Language convertor");
    if (pageZoom) mandatoryItems.push("Page Zoom in & Zoom Out");

    if (mandatoryItems.length > 0) {
      prompt += `## Mandatory things in this Project\n`;
      mandatoryItems.forEach((item) => {
        prompt += `- ${item}\n`;
      });
      prompt += `\n`;
    }

    // Reference Theme
    if (referenceTheme.trim()) {
      prompt += `## Reference Theme\n`;
      prompt += `${referenceTheme}\n\n`;
    }

    prompt += `## Frontend Design Request\n\n`;

    // Pages Required for this Project
    if (selectedPageTypes.length > 0) {
      prompt += `### Pages Required for this Project\n`;
      selectedPageTypes.forEach((pageType) => {
        prompt += `- ${pageType}\n`;
      });
      if (showCustomPageType && customPageType.trim()) {
        prompt += `- Custom: ${customPageType}\n`;
      }
      prompt += `\n`;
    }

    // Frameworks
    if (selectedFrameworks.length > 0) {
      prompt += `### UI Framework(s)\n`;
      selectedFrameworks.forEach((framework) => {
        prompt += `- ${framework}\n`;
      });
      prompt += `\n`;
    }

    // Color Schemes
    if (selectedColorSchemes.length > 0) {
      prompt += `### Color Scheme(s)\n`;
      selectedColorSchemes.forEach((colorScheme) => {
        prompt += `- ${colorScheme}\n`;
      });
      if (showCustomColors && customColors.trim()) {
        prompt += `Custom colors: ${customColors}\n`;
      }
      prompt += `\n`;
    }

    // UI Design Effects
    if (selectedUiDesigns.length > 0) {
      prompt += `### UI Design Effects\n`;
      selectedUiDesigns.forEach((design) => {
        prompt += `- ${design}\n`;
      });
      prompt += `\n`;
    }

    // Layout Components
    if (selectedLayouts.length > 0) {
      prompt += `### Layout Components\n`;
      selectedLayouts.forEach((layout) => {
        prompt += `- ${layout}\n`;
      });
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

    // Functionalities (if applicable)
    if (showFunctionalityOptions && selectedFunctionalities.length > 0) {
      prompt += `### Functionalities\n`;
      selectedFunctionalities.forEach((func) => {
        prompt += `- ${func}\n`;
      });
      prompt += `\n`;
    }

    // Target Audience
    if (targetAudience.trim()) {
      prompt += `### Target Audience\n`;
      prompt += `${targetAudience}\n\n`;
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
      prompt += `### Reference Images\n`;
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

    // Intro Videos
    if (desktopVideo || mobileVideo) {
      prompt += `### Intro Videos\n`;
      if (desktopVideo) {
        prompt += `- Desktop View: ${desktopVideo.name}`;
        if (desktopVideo.description.trim()) {
          prompt += ` - ${desktopVideo.description}`;
        }
        prompt += `\n`;
      }
      if (mobileVideo) {
        prompt += `- Mobile View: ${mobileVideo.name}`;
        if (mobileVideo.description.trim()) {
          prompt += ` - ${mobileVideo.description}`;
        }
        prompt += `\n`;
      }
      prompt += `\n`;
    }

    // Additional Notes
    if (additionalNotes.trim()) {
      prompt += `### Additional Requirements\n`;
      prompt += `${additionalNotes}\n\n`;
    }

    // Tech Stack Info
    if (frontendStackInfo || backendStackInfo || databaseInfo) {
      prompt += `### Tech Stack\n`;
      if (frontendStackInfo) {
        prompt += `Frontend: Next.js (v16.0.5), React (v19.2.0), Tailwind CSS (v4), TypeScript\n`;
      }
      if (backendStackInfo) {
        prompt += `Backend: Django (v5.2.8), Django REST Framework, django-cors-headers\n`;
      }
      if (databaseInfo) {
        prompt += `Database: Postgre - Check connection once again\n`;
      }
      prompt += `\n`;
    }

    // Footer instructions
    prompt += `---\n\n`;
    prompt += `Please create a complete, production-ready implementation with:\n`;
    prompt += `1. Create all pages as coming soon message\n`;
    prompt += `2. Mobile-first responsive design\n`;
    prompt += `3. Clean, well-organized code structure\n`;
    prompt += `4. Proper component separation\n`;
    prompt += `5. Type safety (if using TypeScript)\n`;
    prompt += `6. Accessibility best practices\n`;

    setGeneratedPrompt(prompt);
  };

  // Clear form
  const clearForm = () => {
    setReviewEntireProject("");
    setProjectName("");
    setMobileFirstApproach(false);
    setHamburgerMobileTopNavDesktop(false);
    setComingSoonPages(false);
    setSidebarNavDesktop(false);
    setBottomNavMobile(false);
    setDarkLightModeToggle(false);
    setMultiLanguage(false);
    setPageZoom(false);
    setReferenceTheme("");
    setPageTypes(pageTypeOptions.map((opt) => ({ ...opt, checked: false })));
    setCustomPageType("");
    setFrameworks(frameworkOptions.map((opt) => ({ ...opt, checked: false })));
    setColorSchemes(colorSchemeOptions.map((opt) => ({ ...opt, checked: false })));
    setCustomColors("");
    setUiDesigns(uiDesignOptions.map((opt) => ({ ...opt, checked: false })));
    setLayouts(layoutOptions.map((opt) => ({ ...opt, checked: false })));
    setFeatures(featureOptions.map((opt) => ({ ...opt, checked: false })));
    setFunctionalities(functionalityOptions.map((opt) => ({ ...opt, checked: false })));
    setReferenceLinks([{ id: "1", url: "", description: "" }]);
    setUploadedImages([]);
    setDesktopVideo(null);
    setMobileVideo(null);
    setTargetAudience("");
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
              className="px-4 py-2 bg-yellow-100 text-yellow-700 font-medium rounded-lg transition-all"
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-2xl p-6 border border-white/30 hover:shadow-orange-200/50 transition-shadow duration-300 max-h-[calc(100vh-150px)] overflow-y-auto">
            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <span className="text-2xl">🎨</span>
              Frontend Studio
            </h2>

            {/* Mandatory things in this Project */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Mandatory things in this Project
              </label>
              <div className="space-y-3">
                <label className="flex items-center gap-3 p-3 bg-white/50 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-orange-300 transition-all">
                  <input
                    type="checkbox"
                    checked={mobileFirstApproach}
                    onChange={(e) => setMobileFirstApproach(e.target.checked)}
                    className="w-5 h-5 rounded border-gray-300 text-orange-500 focus:ring-orange-400"
                  />
                  <span className="text-xl">📱</span>
                  <span className="text-sm text-gray-700">Prepare the mobile interface initially and then work on the desktop</span>
                </label>
                <label className="flex items-center gap-3 p-3 bg-white/50 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-orange-300 transition-all">
                  <input
                    type="checkbox"
                    checked={hamburgerMobileTopNavDesktop}
                    onChange={(e) => setHamburgerMobileTopNavDesktop(e.target.checked)}
                    className="w-5 h-5 rounded border-gray-300 text-orange-500 focus:ring-orange-400"
                  />
                  <span className="text-xl">☰</span>
                  <span className="text-sm text-gray-700">Use a hamburger menu for mobile and top navigation for desktop</span>
                </label>
                <label className="flex items-center gap-3 p-3 bg-white/50 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-orange-300 transition-all">
                  <input
                    type="checkbox"
                    checked={comingSoonPages}
                    onChange={(e) => setComingSoonPages(e.target.checked)}
                    className="w-5 h-5 rounded border-gray-300 text-orange-500 focus:ring-orange-400"
                  />
                  <span className="text-xl">🚧</span>
                  <span className="text-sm text-gray-700">Create all pages as empty with a &quot;Coming Soon&quot; message</span>
                </label>
                <label className="flex items-center gap-3 p-3 bg-white/50 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-orange-300 transition-all">
                  <input
                    type="checkbox"
                    checked={sidebarNavDesktop}
                    onChange={(e) => setSidebarNavDesktop(e.target.checked)}
                    className="w-5 h-5 rounded border-gray-300 text-orange-500 focus:ring-orange-400"
                  />
                  <span className="text-xl">📋</span>
                  <span className="text-sm text-gray-700">All Modules are in Sidebar navigation on desktop view</span>
                </label>
                <label className="flex items-center gap-3 p-3 bg-white/50 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-orange-300 transition-all">
                  <input
                    type="checkbox"
                    checked={bottomNavMobile}
                    onChange={(e) => setBottomNavMobile(e.target.checked)}
                    className="w-5 h-5 rounded border-gray-300 text-orange-500 focus:ring-orange-400"
                  />
                  <span className="text-xl">⬇️</span>
                  <span className="text-sm text-gray-700">All Modules are in Bottom navigation bar on mobile view</span>
                </label>
                <label className="flex items-center gap-3 p-3 bg-white/50 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-orange-300 transition-all">
                  <input
                    type="checkbox"
                    checked={darkLightModeToggle}
                    onChange={(e) => setDarkLightModeToggle(e.target.checked)}
                    className="w-5 h-5 rounded border-gray-300 text-orange-500 focus:ring-orange-400"
                  />
                  <span className="text-xl">🌓</span>
                  <span className="text-sm text-gray-700">Dark and Light Mode Toggle</span>
                </label>
                <label className="flex items-center gap-3 p-3 bg-white/50 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-orange-300 transition-all">
                  <input
                    type="checkbox"
                    checked={multiLanguage}
                    onChange={(e) => setMultiLanguage(e.target.checked)}
                    className="w-5 h-5 rounded border-gray-300 text-orange-500 focus:ring-orange-400"
                  />
                  <span className="text-xl">🌐</span>
                  <span className="text-sm text-gray-700">Multi Language convertor</span>
                </label>
                <label className="flex items-center gap-3 p-3 bg-white/50 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-orange-300 transition-all">
                  <input
                    type="checkbox"
                    checked={pageZoom}
                    onChange={(e) => setPageZoom(e.target.checked)}
                    className="w-5 h-5 rounded border-gray-300 text-orange-500 focus:ring-orange-400"
                  />
                  <span className="text-xl">🔍</span>
                  <span className="text-sm text-gray-700">Page Zoom in & Zoom Out</span>
                </label>
              </div>
            </div>

            {/* Reference Theme */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Reference Theme
              </label>
              <input
                type="text"
                value={referenceTheme}
                onChange={(e) => setReferenceTheme(e.target.value)}
                placeholder="e.g., Material Design, Apple HIG, Ant Design Pro..."
                className="w-full px-4 py-3 bg-white/50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none transition-all hover:border-orange-300"
              />
            </div>

            {/* Project Tech Stack Checklist */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Project Tech Stack
              </label>
              <div className="space-y-3">
                <label className="flex items-center gap-3 p-3 bg-white/50 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-orange-300 transition-all">
                  <input
                    type="checkbox"
                    checked={frontendStackInfo}
                    onChange={(e) => setFrontendStackInfo(e.target.checked)}
                    className="w-5 h-5 rounded border-gray-300 text-orange-500 focus:ring-orange-400"
                  />
                  <span className="text-xl">⚛️</span>
                  <span className="text-sm text-gray-700">Frontend: Next.js (v16.0.5), React (v19.2.0), Tailwind CSS (v4), TypeScript</span>
                </label>
                <label className="flex items-center gap-3 p-3 bg-white/50 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-orange-300 transition-all">
                  <input
                    type="checkbox"
                    checked={backendStackInfo}
                    onChange={(e) => setBackendStackInfo(e.target.checked)}
                    className="w-5 h-5 rounded border-gray-300 text-orange-500 focus:ring-orange-400"
                  />
                  <span className="text-xl">🐍</span>
                  <span className="text-sm text-gray-700">Backend: Django (v5.2.8), Django REST Framework, django-cors-headers</span>
                </label>
                <label className="flex items-center gap-3 p-3 bg-white/50 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-orange-300 transition-all">
                  <input
                    type="checkbox"
                    checked={databaseInfo}
                    onChange={(e) => setDatabaseInfo(e.target.checked)}
                    className="w-5 h-5 rounded border-gray-300 text-orange-500 focus:ring-orange-400"
                  />
                  <span className="text-xl">🗄️</span>
                  <span className="text-sm text-gray-700">Database: Postgre - Check connection once again</span>
                </label>
              </div>
            </div>

            {/* Pages Required for this Project - Checklist */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Pages Required for this Project
              </label>
              <div className="grid grid-cols-2 gap-3">
                {pageTypes.map((option) => (
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
                      onChange={() => handleCheckboxChange(option.id, setPageTypes)}
                      className="w-5 h-5 text-orange-500 border-gray-300 rounded focus:ring-orange-400 accent-orange-500"
                    />
                    <span className="text-lg">{option.icon}</span>
                    <span className="text-gray-700 text-sm font-medium">{option.label}</span>
                  </label>
                ))}
              </div>

              {/* Conditional: Custom page type description */}
              {showCustomPageType && (
                <input
                  type="text"
                  value={customPageType}
                  onChange={(e) => setCustomPageType(e.target.value)}
                  placeholder="Describe your custom page type..."
                  className="w-full mt-3 px-4 py-3 bg-white/50 border-2 border-orange-200 rounded-xl focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none transition-all"
                />
              )}
            </div>

            {/* UI Framework - Checklist */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <label className="block text-sm font-semibold text-gray-700">
                  UI Framework
                </label>
                <Link
                  href="/ui-framework"
                  target="_blank"
                  className="px-3 py-1.5 bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white text-xs font-medium rounded-lg transition-all shadow-md hover:shadow-lg hover:scale-105 active:scale-95 flex items-center gap-1"
                >
                  <span>View All</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {frameworks.map((option) => (
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
                      onChange={() => handleCheckboxChange(option.id, setFrameworks)}
                      className="w-5 h-5 text-orange-500 border-gray-300 rounded focus:ring-orange-400 accent-orange-500"
                    />
                    <span className="text-lg">{option.icon}</span>
                    <span className="text-gray-700 text-sm font-medium">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Color Scheme - Checklist */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <label className="block text-sm font-semibold text-gray-700">
                  Color Scheme
                </label>
                <Link
                  href="/color-scheme"
                  target="_blank"
                  className="px-3 py-1.5 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white text-xs font-medium rounded-lg transition-all shadow-md hover:shadow-lg hover:scale-105 active:scale-95 flex items-center gap-1"
                >
                  <span>View All</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {colorSchemes.map((option) => (
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
                      onChange={() => handleCheckboxChange(option.id, setColorSchemes)}
                      className="w-5 h-5 text-orange-500 border-gray-300 rounded focus:ring-orange-400 accent-orange-500"
                    />
                    <span className="text-lg">{option.icon}</span>
                    <span className="text-gray-700 text-sm font-medium">{option.label}</span>
                  </label>
                ))}
              </div>

              {/* Conditional: Custom colors */}
              {showCustomColors && (
                <input
                  type="text"
                  value={customColors}
                  onChange={(e) => setCustomColors(e.target.value)}
                  placeholder="e.g., Primary: #FF6B00, Secondary: #1A1A1A"
                  className="w-full mt-3 px-4 py-3 bg-white/50 border-2 border-orange-200 rounded-xl focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none transition-all"
                />
              )}
            </div>

            {/* UI Design Effects - Checklist */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <label className="block text-sm font-semibold text-gray-700">
                  UI Design Effects
                </label>
                <Link
                  href="/ui-design-effects"
                  target="_blank"
                  className="px-3 py-1.5 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white text-xs font-medium rounded-lg transition-all shadow-md hover:shadow-lg hover:scale-105 active:scale-95 flex items-center gap-1"
                >
                  <span>View All</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {uiDesigns.map((option) => (
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
                      onChange={() => handleCheckboxChange(option.id, setUiDesigns)}
                      className="w-5 h-5 text-orange-500 border-gray-300 rounded focus:ring-orange-400 accent-orange-500"
                    />
                    <span className="text-lg">{option.icon}</span>
                    <span className="text-gray-700 text-sm font-medium">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Layout Components - Checklist */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <label className="block text-sm font-semibold text-gray-700">
                  Layout Components
                </label>
                <Link
                  href="/layout-components"
                  target="_blank"
                  className="px-3 py-1.5 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white text-xs font-medium rounded-lg transition-all shadow-md hover:shadow-lg hover:scale-105 active:scale-95 flex items-center gap-1"
                >
                  <span>View All</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {layouts.map((option) => (
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
                      onChange={() => handleCheckboxChange(option.id, setLayouts)}
                      className="w-5 h-5 text-orange-500 border-gray-300 rounded focus:ring-orange-400 accent-orange-500"
                    />
                    <span className="text-lg">{option.icon}</span>
                    <span className="text-gray-700 text-sm font-medium">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Features - Checklist */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <label className="block text-sm font-semibold text-gray-700">
                  Features
                </label>
                <Link
                  href="/features"
                  target="_blank"
                  className="px-3 py-1.5 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white text-xs font-medium rounded-lg transition-all shadow-md hover:shadow-lg hover:scale-105 active:scale-95 flex items-center gap-1"
                >
                  <span>View All</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {features.map((option) => (
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
                      onChange={() => handleCheckboxChange(option.id, setFeatures)}
                      className="w-5 h-5 text-orange-500 border-gray-300 rounded focus:ring-orange-400 accent-orange-500"
                    />
                    <span className="text-lg">{option.icon}</span>
                    <span className="text-gray-700 text-sm font-medium">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Conditional: Functionalities (for Dashboard/Admin/E-commerce) */}
            {showFunctionalityOptions && (
              <div className="mb-6 p-4 bg-gradient-to-r from-orange-50 to-pink-50 rounded-xl border-2 border-orange-200">
                <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <span className="text-lg">⚡</span>
                  Functionalities (for {pageTypes.filter(p => p.checked && ["dashboard-page", "admin-page", "e-commerce-page"].includes(p.id)).map(p => p.label).join(", ")})
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {functionalities.map((option) => (
                    <label
                      key={option.id}
                      className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-200 border-2 ${
                        option.checked
                          ? "bg-gradient-to-r from-orange-100 to-pink-100 border-orange-400 shadow-md"
                          : "bg-white/70 border-gray-200 hover:border-orange-300 hover:bg-orange-50"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={option.checked}
                        onChange={() => handleCheckboxChange(option.id, setFunctionalities)}
                        className="w-5 h-5 text-orange-500 border-gray-300 rounded focus:ring-orange-400 accent-orange-500"
                      />
                      <span className="text-lg">{option.icon}</span>
                      <span className="text-gray-700 text-sm font-medium">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Target Audience */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Target Audience / Purpose
              </label>
              <input
                type="text"
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
                placeholder="e.g., B2B SaaS users, E-commerce customers, Internal team"
                className="w-full px-4 py-3 bg-white/50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none transition-all hover:border-orange-300"
              />
            </div>

            {/* Reference Links */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <span className="text-lg">🔗</span>
                Reference Links
              </label>
              {referenceLinks.map((link, index) => (
                <div key={link.id} className="flex gap-2 mb-3">
                  <div className="flex-1 space-y-2">
                    <input
                      type="url"
                      value={link.url}
                      onChange={(e) => updateReferenceLink(link.id, "url", e.target.value)}
                      placeholder="https://example.com/design-reference"
                      className="w-full px-4 py-2 bg-white/50 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none transition-all hover:border-orange-300 text-sm"
                    />
                    <input
                      type="text"
                      value={link.description}
                      onChange={(e) => updateReferenceLink(link.id, "description", e.target.value)}
                      placeholder="What to take from this reference?"
                      className="w-full px-4 py-2 bg-white/50 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none transition-all hover:border-orange-300 text-sm"
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
                className="text-sm text-orange-600 hover:text-orange-700 font-medium flex items-center gap-1 mt-2"
              >
                <span>+</span> Add another link
              </button>
            </div>

            {/* Image Upload */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <span className="text-lg">🖼️</span>
                Reference Images
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
                className="w-full py-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-orange-400 hover:bg-orange-50 transition-all text-gray-500 hover:text-orange-600 flex flex-col items-center gap-2"
              >
                <span className="text-3xl">📤</span>
                <span className="text-sm font-medium">Click to upload images</span>
                <span className="text-xs text-gray-400">PNG, JPG, GIF up to 10MB</span>
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
                          placeholder="Describe what to use from this image..."
                          className="w-full mt-2 px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none"
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

            {/* Intro Videos Section */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <span className="text-lg">🎬</span>
                Intro Videos
              </label>

              <div className="grid grid-cols-2 gap-4">
                {/* Desktop Video */}
                <div>
                  <p className="text-xs font-medium text-gray-600 mb-2 flex items-center gap-1">
                    <span>🖥️</span> Desktop View
                  </p>
                  <input
                    ref={desktopVideoRef}
                    type="file"
                    accept="video/*"
                    onChange={(e) => handleVideoUpload(e, setDesktopVideo)}
                    className="hidden"
                  />

                  {desktopVideo ? (
                    <div className="p-3 bg-white/50 rounded-xl border border-gray-200">
                      <video
                        src={desktopVideo.preview}
                        className="w-full h-24 object-cover rounded-lg mb-2"
                        controls
                      />
                      <p className="text-xs font-medium text-gray-700 truncate mb-2">{desktopVideo.name}</p>
                      <input
                        type="text"
                        value={desktopVideo.description}
                        onChange={(e) => updateVideoDescription(setDesktopVideo, desktopVideo, e.target.value)}
                        placeholder="Describe video content..."
                        className="w-full px-2 py-1 bg-white border border-gray-200 rounded-lg text-xs focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none"
                      />
                      <button
                        onClick={() => removeVideo(setDesktopVideo)}
                        className="mt-2 text-xs text-red-500 hover:text-red-700"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => desktopVideoRef.current?.click()}
                      className="w-full py-6 border-2 border-dashed border-gray-300 rounded-xl hover:border-orange-400 hover:bg-orange-50 transition-all text-gray-500 hover:text-orange-600 flex flex-col items-center gap-1"
                    >
                      <span className="text-2xl">🖥️</span>
                      <span className="text-xs font-medium">Upload Desktop Video</span>
                    </button>
                  )}
                </div>

                {/* Mobile Video */}
                <div>
                  <p className="text-xs font-medium text-gray-600 mb-2 flex items-center gap-1">
                    <span>📱</span> Mobile View
                  </p>
                  <input
                    ref={mobileVideoRef}
                    type="file"
                    accept="video/*"
                    onChange={(e) => handleVideoUpload(e, setMobileVideo)}
                    className="hidden"
                  />

                  {mobileVideo ? (
                    <div className="p-3 bg-white/50 rounded-xl border border-gray-200">
                      <video
                        src={mobileVideo.preview}
                        className="w-full h-24 object-cover rounded-lg mb-2"
                        controls
                      />
                      <p className="text-xs font-medium text-gray-700 truncate mb-2">{mobileVideo.name}</p>
                      <input
                        type="text"
                        value={mobileVideo.description}
                        onChange={(e) => updateVideoDescription(setMobileVideo, mobileVideo, e.target.value)}
                        placeholder="Describe video content..."
                        className="w-full px-2 py-1 bg-white border border-gray-200 rounded-lg text-xs focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none"
                      />
                      <button
                        onClick={() => removeVideo(setMobileVideo)}
                        className="mt-2 text-xs text-red-500 hover:text-red-700"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => mobileVideoRef.current?.click()}
                      className="w-full py-6 border-2 border-dashed border-gray-300 rounded-xl hover:border-orange-400 hover:bg-orange-50 transition-all text-gray-500 hover:text-orange-600 flex flex-col items-center gap-1"
                    >
                      <span className="text-2xl">📱</span>
                      <span className="text-xs font-medium">Upload Mobile Video</span>
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Additional Notes */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Additional Notes / Requirements
              </label>
              <textarea
                value={additionalNotes}
                onChange={(e) => setAdditionalNotes(e.target.value)}
                placeholder="Any specific requirements, constraints, or details..."
                rows={4}
                className="w-full px-4 py-3 bg-white/50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none transition-all resize-none hover:border-orange-300"
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-4 sticky bottom-0 bg-white/70 py-4 -mx-6 px-6 border-t border-gray-200">
              <button
                onClick={generatePrompt}
                className="flex-1 bg-gradient-to-r from-orange-400 via-pink-400 to-red-400 hover:from-orange-500 hover:via-pink-500 hover:to-red-500 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
              >
                Generate Prompt
              </button>
              <a
                href="/sumo-studio"
                className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl transition-all font-semibold text-center"
              >
                Go Back!
              </a>
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
                  className={`text-sm font-semibold px-4 py-2 rounded-lg flex items-center gap-2 transition-all hover:scale-105 active:scale-95 shadow-md ${
                    copied
                      ? "bg-green-500 text-white"
                      : "bg-gradient-to-r from-orange-400 to-pink-400 hover:from-orange-500 hover:to-pink-500 text-white"
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
                  <span className="text-6xl mb-4 opacity-50">🎨</span>
                  <p className="text-center">
                    Fill in the form and click<br />
                    <span className="text-orange-400 font-semibold">&quot;Generate Prompt&quot;</span><br />
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
              <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                <p className="text-sm text-blue-800 flex items-start gap-2">
                  <span className="text-lg">💡</span>
                  <span>
                    <strong>Tip:</strong> If you uploaded reference images, paste them along with this prompt in Claude. You can drag and drop images directly into the chat.
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
