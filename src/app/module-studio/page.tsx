"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

// Types
type SubField = {
  id: string;
  label: string;
  checked: boolean;
};

type CheckboxOption = {
  id: string;
  label: string;
  checked: boolean;
  icon: string;
  subFields?: SubField[];
};

type AddedPage = {
  id: string;
  pageType: string;
  pageTypeLabel: string;
  pageTypeIcon: string;
  requirements: { label: string; subFields: string[] }[];
  essentialFeatures: string[];
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

// Essential Features options (A-Z sorted)
const essentialFeatures: CheckboxOption[] = [
  { id: "advanced-filtering", label: "Advanced Filtering", checked: false, icon: "🔍" },
  { id: "auto-save-refresh", label: "Auto Save / Auto Refresh", checked: false, icon: "🔄" },
  { id: "bulk-action", label: "Bulk Action", checked: false, icon: "📦" },
  { id: "conditional-fields", label: "Conditional Fields", checked: false, icon: "🔀" },
  { id: "crud-operation", label: "CRUD Operation", checked: false, icon: "✏️" },
  { id: "date-picker", label: "Date Picker", checked: false, icon: "📅" },
  { id: "drag-drop", label: "Drag & Drop", checked: false, icon: "🖱️" },
  { id: "export-csv-pdf", label: "Export CSV / PDF", checked: false, icon: "📤" },
  { id: "form-validation", label: "Form Validation", checked: false, icon: "✅" },
  { id: "notification", label: "Notification", checked: false, icon: "🔔" },
  { id: "pagination", label: "Pagination", checked: false, icon: "📄" },
  { id: "ratings", label: "Ratings", checked: false, icon: "⭐" },
  { id: "right-click-option", label: "Right Click Option", checked: false, icon: "🖱️" },
  { id: "search-bar", label: "Search Bar", checked: false, icon: "🔎" },
  { id: "sort-asc-desc", label: "Sort (Ascending / Descending)", checked: false, icon: "↕️" },
  { id: "status", label: "Status", checked: false, icon: "🚦" },
  { id: "sticky-header", label: "Sticky Header", checked: false, icon: "📌" },
  { id: "tags", label: "Tags", checked: false, icon: "🏷️" },
  { id: "toggle-option", label: "Toggle Option", checked: false, icon: "🔘" },
  { id: "user-role-permissions", label: "User Role Permissions", checked: false, icon: "🔐" },
];

// Page Type options for dropdown (A-Z sorted)
const pageTypeOptions = [
  { id: "accounts-page", label: "Accounts Page", icon: "💰" },
  { id: "admin-page", label: "Admin Page", icon: "⚙️" },
  { id: "blog-page", label: "Blog Page", icon: "📝" },
  { id: "contact-page", label: "Contact Page", icon: "📞" },
  { id: "customer-page", label: "Customer Page", icon: "👥" },
  { id: "dashboard-page", label: "Dashboard Page", icon: "📊" },
  { id: "e-commerce-page", label: "E-Commerce Page", icon: "🛒" },
  { id: "employee-page", label: "Employee Page", icon: "👔" },
  { id: "error-page", label: "Error Page", icon: "❌" },
  { id: "form-page", label: "Form Page", icon: "📋" },
  { id: "gallery-page", label: "Gallery Page", icon: "🖼️" },
  { id: "inventory-page", label: "Inventory Page", icon: "📦" },
  { id: "landing-page", label: "Landing Page", icon: "🏠" },
  { id: "login-page", label: "Login Page", icon: "🔐" },
  { id: "portfolio-page", label: "Portfolio Page", icon: "💼" },
  { id: "reports-dashboard", label: "Reports Dashboard", icon: "📈" },
  { id: "service-page", label: "Service Page", icon: "🛠️" },
  { id: "settings-page", label: "Settings Page", icon: "🔧" },
];

// Page-specific requirements (Chronological Workflow Order with Numbers and Subfields)
const pageRequirements: Record<string, CheckboxOption[]> = {
  // Accounts: Setup → Create → View → Manage → Reports
  "accounts-page": [
    { id: "payment-methods", label: "1. Payment Methods Setup", checked: false, icon: "💰", subFields: [
      { id: "pm-card-type", label: "1.1 Card Type", checked: false },
      { id: "pm-card-number", label: "1.2 Card Number", checked: false },
      { id: "pm-expiry-date", label: "1.3 Expiry Date", checked: false },
      { id: "pm-cvv", label: "1.4 CVV", checked: false },
      { id: "pm-billing-address", label: "1.5 Billing Address", checked: false },
    ]},
    { id: "billing-info", label: "2. Billing Information", checked: false, icon: "🏦", subFields: [
      { id: "bi-company-name", label: "2.1 Company Name", checked: false },
      { id: "bi-tax-id", label: "2.2 Tax ID", checked: false },
      { id: "bi-address", label: "2.3 Address", checked: false },
      { id: "bi-contact-email", label: "2.4 Contact Email", checked: false },
    ]},
    { id: "subscription-plans", label: "3. Subscription Plans", checked: false, icon: "📋", subFields: [
      { id: "sp-plan-name", label: "3.1 Plan Name", checked: false },
      { id: "sp-price", label: "3.2 Price", checked: false },
      { id: "sp-billing-cycle", label: "3.3 Billing Cycle", checked: false },
      { id: "sp-features", label: "3.4 Features List", checked: false },
    ]},
    { id: "account-balance", label: "4. Account Balance", checked: false, icon: "🏧", subFields: [
      { id: "ab-current-balance", label: "4.1 Current Balance", checked: false },
      { id: "ab-available-credit", label: "4.2 Available Credit", checked: false },
      { id: "ab-pending-charges", label: "4.3 Pending Charges", checked: false },
    ]},
    { id: "invoice-list", label: "5. Invoice List", checked: false, icon: "📄", subFields: [
      { id: "il-invoice-number", label: "5.1 Invoice Number", checked: false },
      { id: "il-date", label: "5.2 Date", checked: false },
      { id: "il-amount", label: "5.3 Amount", checked: false },
      { id: "il-status", label: "5.4 Status", checked: false },
      { id: "il-download", label: "5.5 Download PDF", checked: false },
    ]},
    { id: "payment-history", label: "6. Payment History", checked: false, icon: "💳", subFields: [
      { id: "ph-transaction-id", label: "6.1 Transaction ID", checked: false },
      { id: "ph-date", label: "6.2 Date", checked: false },
      { id: "ph-amount", label: "6.3 Amount", checked: false },
      { id: "ph-method", label: "6.4 Payment Method", checked: false },
      { id: "ph-status", label: "6.5 Status", checked: false },
    ]},
    { id: "expense-tracker", label: "7. Expense Tracker", checked: false, icon: "📊", subFields: [
      { id: "et-category", label: "7.1 Category", checked: false },
      { id: "et-amount", label: "7.2 Amount", checked: false },
      { id: "et-date", label: "7.3 Date", checked: false },
      { id: "et-description", label: "7.4 Description", checked: false },
      { id: "et-receipt", label: "7.5 Receipt Upload", checked: false },
    ]},
    { id: "tax-reports", label: "8. Tax Reports", checked: false, icon: "📑", subFields: [
      { id: "tr-period", label: "8.1 Tax Period", checked: false },
      { id: "tr-total-income", label: "8.2 Total Income", checked: false },
      { id: "tr-deductions", label: "8.3 Deductions", checked: false },
      { id: "tr-tax-amount", label: "8.4 Tax Amount", checked: false },
    ]},
  ],
  // Admin: Setup → Users → Roles → Settings → Monitoring → Backup
  "admin-page": [
    { id: "system-settings", label: "1. System Settings", checked: false, icon: "⚙️", subFields: [
      { id: "ss-site-name", label: "1.1 Site Name", checked: false },
      { id: "ss-logo", label: "1.2 Logo Upload", checked: false },
      { id: "ss-timezone", label: "1.3 Timezone", checked: false },
      { id: "ss-language", label: "1.4 Language", checked: false },
      { id: "ss-maintenance-mode", label: "1.5 Maintenance Mode", checked: false },
    ]},
    { id: "user-management", label: "2. User Management", checked: false, icon: "👥", subFields: [
      { id: "um-user-list", label: "2.1 User List", checked: false },
      { id: "um-add-user", label: "2.2 Add User", checked: false },
      { id: "um-edit-user", label: "2.3 Edit User", checked: false },
      { id: "um-delete-user", label: "2.4 Delete User", checked: false },
      { id: "um-user-status", label: "2.5 User Status", checked: false },
    ]},
    { id: "role-permissions", label: "3. Role Permissions", checked: false, icon: "🔐", subFields: [
      { id: "rp-role-name", label: "3.1 Role Name", checked: false },
      { id: "rp-permissions", label: "3.2 Permissions List", checked: false },
      { id: "rp-assign-users", label: "3.3 Assign Users", checked: false },
    ]},
    { id: "email-templates", label: "4. Email Templates", checked: false, icon: "📧", subFields: [
      { id: "et-template-name", label: "4.1 Template Name", checked: false },
      { id: "et-subject", label: "4.2 Subject", checked: false },
      { id: "et-body", label: "4.3 Email Body", checked: false },
      { id: "et-variables", label: "4.4 Variables", checked: false },
    ]},
    { id: "api-keys", label: "5. API Keys Management", checked: false, icon: "🔑", subFields: [
      { id: "ak-key-name", label: "5.1 Key Name", checked: false },
      { id: "ak-api-key", label: "5.2 API Key", checked: false },
      { id: "ak-permissions", label: "5.3 Permissions", checked: false },
      { id: "ak-expiry", label: "5.4 Expiry Date", checked: false },
    ]},
    { id: "audit-logs", label: "6. Audit Logs", checked: false, icon: "📋", subFields: [
      { id: "al-timestamp", label: "6.1 Timestamp", checked: false },
      { id: "al-user", label: "6.2 User", checked: false },
      { id: "al-action", label: "6.3 Action", checked: false },
      { id: "al-ip-address", label: "6.4 IP Address", checked: false },
    ]},
    { id: "analytics-dashboard", label: "7. Analytics Dashboard", checked: false, icon: "📊", subFields: [
      { id: "ad-total-users", label: "7.1 Total Users", checked: false },
      { id: "ad-active-sessions", label: "7.2 Active Sessions", checked: false },
      { id: "ad-page-views", label: "7.3 Page Views", checked: false },
      { id: "ad-growth-chart", label: "7.4 Growth Chart", checked: false },
    ]},
    { id: "backup-restore", label: "8. Backup & Restore", checked: false, icon: "💾", subFields: [
      { id: "br-backup-date", label: "8.1 Backup Date", checked: false },
      { id: "br-file-size", label: "8.2 File Size", checked: false },
      { id: "br-download", label: "8.3 Download Backup", checked: false },
      { id: "br-restore", label: "8.4 Restore Button", checked: false },
    ]},
  ],
  // Blog: Create → List → Organize → Engage → Share
  "blog-page": [
    { id: "create-post", label: "1. Create Post", checked: false, icon: "✏️", subFields: [
      { id: "cp-title", label: "1.1 Title", checked: false },
      { id: "cp-content", label: "1.2 Content Editor", checked: false },
      { id: "cp-featured-image", label: "1.3 Featured Image", checked: false },
      { id: "cp-category", label: "1.4 Category", checked: false },
      { id: "cp-tags", label: "1.5 Tags", checked: false },
      { id: "cp-publish-date", label: "1.6 Publish Date", checked: false },
      { id: "cp-status", label: "1.7 Status (Draft/Published)", checked: false },
    ]},
    { id: "post-list", label: "2. Post List/Grid", checked: false, icon: "📰", subFields: [
      { id: "pl-thumbnail", label: "2.1 Thumbnail", checked: false },
      { id: "pl-title", label: "2.2 Title", checked: false },
      { id: "pl-excerpt", label: "2.3 Excerpt", checked: false },
      { id: "pl-date", label: "2.4 Date", checked: false },
      { id: "pl-author", label: "2.5 Author", checked: false },
    ]},
    { id: "post-detail", label: "3. Post Detail View", checked: false, icon: "📄", subFields: [
      { id: "pd-title", label: "3.1 Title", checked: false },
      { id: "pd-content", label: "3.2 Full Content", checked: false },
      { id: "pd-author-bio", label: "3.3 Author Bio", checked: false },
      { id: "pd-read-time", label: "3.4 Read Time", checked: false },
    ]},
    { id: "categories", label: "4. Categories/Tags", checked: false, icon: "🏷️", subFields: [
      { id: "ct-category-name", label: "4.1 Category Name", checked: false },
      { id: "ct-post-count", label: "4.2 Post Count", checked: false },
      { id: "ct-tag-cloud", label: "4.3 Tag Cloud", checked: false },
    ]},
    { id: "search-filter", label: "5. Search & Filter", checked: false, icon: "🔍", subFields: [
      { id: "sf-search-box", label: "5.1 Search Box", checked: false },
      { id: "sf-category-filter", label: "5.2 Category Filter", checked: false },
      { id: "sf-date-filter", label: "5.3 Date Filter", checked: false },
    ]},
    { id: "author-profile", label: "6. Author Profile", checked: false, icon: "👤", subFields: [
      { id: "ap-avatar", label: "6.1 Avatar", checked: false },
      { id: "ap-name", label: "6.2 Name", checked: false },
      { id: "ap-bio", label: "6.3 Bio", checked: false },
      { id: "ap-social-links", label: "6.4 Social Links", checked: false },
    ]},
    { id: "comments-section", label: "7. Comments Section", checked: false, icon: "💬", subFields: [
      { id: "cs-comment-text", label: "7.1 Comment Text", checked: false },
      { id: "cs-author-name", label: "7.2 Author Name", checked: false },
      { id: "cs-date", label: "7.3 Date", checked: false },
      { id: "cs-reply", label: "7.4 Reply Button", checked: false },
    ]},
    { id: "related-posts", label: "8. Related Posts", checked: false, icon: "🔗", subFields: [
      { id: "rp-thumbnail", label: "8.1 Thumbnail", checked: false },
      { id: "rp-title", label: "8.2 Title", checked: false },
      { id: "rp-date", label: "8.3 Date", checked: false },
    ]},
    { id: "social-share", label: "9. Social Share Buttons", checked: false, icon: "📢", subFields: [
      { id: "ss-facebook", label: "9.1 Facebook", checked: false },
      { id: "ss-twitter", label: "9.2 Twitter", checked: false },
      { id: "ss-linkedin", label: "9.3 LinkedIn", checked: false },
      { id: "ss-copy-link", label: "9.4 Copy Link", checked: false },
    ]},
  ],
  // Contact: Info Display → Form → Communication → Support
  "contact-page": [
    { id: "contact-info", label: "1. Contact Information", checked: false, icon: "📞", subFields: [
      { id: "ci-phone", label: "1.1 Phone Number", checked: false },
      { id: "ci-email", label: "1.2 Email Address", checked: false },
      { id: "ci-address", label: "1.3 Physical Address", checked: false },
    ]},
    { id: "business-hours", label: "2. Business Hours", checked: false, icon: "🕐", subFields: [
      { id: "bh-weekdays", label: "2.1 Weekday Hours", checked: false },
      { id: "bh-weekend", label: "2.2 Weekend Hours", checked: false },
      { id: "bh-holidays", label: "2.3 Holiday Notice", checked: false },
    ]},
    { id: "map-location", label: "3. Map Location", checked: false, icon: "🗺️", subFields: [
      { id: "ml-map-embed", label: "3.1 Map Embed", checked: false },
      { id: "ml-directions", label: "3.2 Get Directions Button", checked: false },
      { id: "ml-nearby", label: "3.3 Nearby Landmarks", checked: false },
    ]},
    { id: "contact-form", label: "4. Contact Form", checked: false, icon: "📝", subFields: [
      { id: "cf-name", label: "4.1 Name Field", checked: false },
      { id: "cf-email", label: "4.2 Email Field", checked: false },
      { id: "cf-phone", label: "4.3 Phone Field", checked: false },
      { id: "cf-subject", label: "4.4 Subject", checked: false },
      { id: "cf-message", label: "4.5 Message", checked: false },
      { id: "cf-attachment", label: "4.6 File Attachment", checked: false },
    ]},
    { id: "callback-request", label: "5. Callback Request", checked: false, icon: "📲", subFields: [
      { id: "cr-phone", label: "5.1 Phone Number", checked: false },
      { id: "cr-preferred-time", label: "5.2 Preferred Time", checked: false },
      { id: "cr-reason", label: "5.3 Reason for Call", checked: false },
    ]},
    { id: "live-chat", label: "6. Live Chat Widget", checked: false, icon: "💬", subFields: [
      { id: "lc-chat-button", label: "6.1 Chat Button", checked: false },
      { id: "lc-chat-window", label: "6.2 Chat Window", checked: false },
      { id: "lc-agent-status", label: "6.3 Agent Status", checked: false },
    ]},
    { id: "faq-section", label: "7. FAQ Section", checked: false, icon: "❓", subFields: [
      { id: "faq-question", label: "7.1 Question", checked: false },
      { id: "faq-answer", label: "7.2 Answer", checked: false },
      { id: "faq-category", label: "7.3 Category", checked: false },
    ]},
    { id: "social-links", label: "8. Social Media Links", checked: false, icon: "🔗", subFields: [
      { id: "sl-facebook", label: "8.1 Facebook", checked: false },
      { id: "sl-twitter", label: "8.2 Twitter", checked: false },
      { id: "sl-instagram", label: "8.3 Instagram", checked: false },
      { id: "sl-linkedin", label: "8.4 LinkedIn", checked: false },
    ]},
  ],
  // Customer: Create → List → View → Communicate → Manage → Analyze
  "customer-page": [
    { id: "add-customer", label: "1. Add Customer", checked: false, icon: "➕", subFields: [
      { id: "ac-name", label: "1.1 Full Name", checked: false },
      { id: "ac-email", label: "1.2 Email", checked: false },
      { id: "ac-phone", label: "1.3 Phone Number", checked: false },
      { id: "ac-address", label: "1.4 Address", checked: false },
      { id: "ac-company", label: "1.5 Company Name", checked: false },
      { id: "ac-source", label: "1.6 Lead Source", checked: false },
    ]},
    { id: "customer-list", label: "2. Customer List", checked: false, icon: "👥", subFields: [
      { id: "cl-name", label: "2.1 Name", checked: false },
      { id: "cl-email", label: "2.2 Email", checked: false },
      { id: "cl-phone", label: "2.3 Phone", checked: false },
      { id: "cl-status", label: "2.4 Status", checked: false },
      { id: "cl-created-date", label: "2.5 Created Date", checked: false },
    ]},
    { id: "customer-profile", label: "3. Customer Profile", checked: false, icon: "👤", subFields: [
      { id: "cp-avatar", label: "3.1 Avatar", checked: false },
      { id: "cp-details", label: "3.2 Personal Details", checked: false },
      { id: "cp-contact-info", label: "3.3 Contact Info", checked: false },
      { id: "cp-preferences", label: "3.4 Preferences", checked: false },
    ]},
    { id: "customer-notes", label: "4. Customer Notes", checked: false, icon: "📝", subFields: [
      { id: "cn-note-text", label: "4.1 Note Text", checked: false },
      { id: "cn-created-by", label: "4.2 Created By", checked: false },
      { id: "cn-date", label: "4.3 Date", checked: false },
      { id: "cn-category", label: "4.4 Category", checked: false },
    ]},
    { id: "communication-log", label: "5. Communication Log", checked: false, icon: "💬", subFields: [
      { id: "cm-type", label: "5.1 Type (Email/Call/Chat)", checked: false },
      { id: "cm-subject", label: "5.2 Subject", checked: false },
      { id: "cm-date", label: "5.3 Date", checked: false },
      { id: "cm-status", label: "5.4 Status", checked: false },
    ]},
    { id: "order-history", label: "6. Order History", checked: false, icon: "📦", subFields: [
      { id: "oh-order-id", label: "6.1 Order ID", checked: false },
      { id: "oh-date", label: "6.2 Date", checked: false },
      { id: "oh-items", label: "6.3 Items", checked: false },
      { id: "oh-total", label: "6.4 Total Amount", checked: false },
      { id: "oh-status", label: "6.5 Status", checked: false },
    ]},
    { id: "support-tickets", label: "7. Support Tickets", checked: false, icon: "🎫", subFields: [
      { id: "st-ticket-id", label: "7.1 Ticket ID", checked: false },
      { id: "st-subject", label: "7.2 Subject", checked: false },
      { id: "st-priority", label: "7.3 Priority", checked: false },
      { id: "st-status", label: "7.4 Status", checked: false },
      { id: "st-assigned-to", label: "7.5 Assigned To", checked: false },
    ]},
    { id: "loyalty-points", label: "8. Loyalty Points", checked: false, icon: "⭐", subFields: [
      { id: "lp-total-points", label: "8.1 Total Points", checked: false },
      { id: "lp-tier", label: "8.2 Membership Tier", checked: false },
      { id: "lp-history", label: "8.3 Points History", checked: false },
      { id: "lp-redeem", label: "8.4 Redeem Options", checked: false },
    ]},
    { id: "customer-segments", label: "9. Customer Segments", checked: false, icon: "📊", subFields: [
      { id: "cs-segment-name", label: "9.1 Segment Name", checked: false },
      { id: "cs-criteria", label: "9.2 Criteria", checked: false },
      { id: "cs-count", label: "9.3 Customer Count", checked: false },
    ]},
  ],
  // Dashboard: Overview → Charts → Activity → Actions → Notifications
  "dashboard-page": [
    { id: "stats-cards", label: "1. Statistics Cards", checked: false, icon: "📊", subFields: [
      { id: "sc-title", label: "1.1 Card Title", checked: false },
      { id: "sc-value", label: "1.2 Value", checked: false },
      { id: "sc-change", label: "1.3 Change Percentage", checked: false },
      { id: "sc-icon", label: "1.4 Icon", checked: false },
    ]},
    { id: "kpi-indicators", label: "2. KPI Indicators", checked: false, icon: "🎯", subFields: [
      { id: "kpi-name", label: "2.1 KPI Name", checked: false },
      { id: "kpi-target", label: "2.2 Target Value", checked: false },
      { id: "kpi-current", label: "2.3 Current Value", checked: false },
      { id: "kpi-progress", label: "2.4 Progress Bar", checked: false },
    ]},
    { id: "line-chart", label: "3. Line Charts", checked: false, icon: "📈", subFields: [
      { id: "lc-title", label: "3.1 Chart Title", checked: false },
      { id: "lc-data-series", label: "3.2 Data Series", checked: false },
      { id: "lc-legend", label: "3.3 Legend", checked: false },
      { id: "lc-time-range", label: "3.4 Time Range Selector", checked: false },
    ]},
    { id: "bar-chart", label: "4. Bar Charts", checked: false, icon: "📊", subFields: [
      { id: "bc-title", label: "4.1 Chart Title", checked: false },
      { id: "bc-categories", label: "4.2 Categories", checked: false },
      { id: "bc-values", label: "4.3 Values", checked: false },
      { id: "bc-colors", label: "4.4 Color Scheme", checked: false },
    ]},
    { id: "pie-chart", label: "5. Pie/Donut Charts", checked: false, icon: "🥧", subFields: [
      { id: "pc-title", label: "5.1 Chart Title", checked: false },
      { id: "pc-segments", label: "5.2 Segments", checked: false },
      { id: "pc-percentages", label: "5.3 Percentages", checked: false },
      { id: "pc-center-text", label: "5.4 Center Text", checked: false },
    ]},
    { id: "data-table", label: "6. Data Table", checked: false, icon: "📋", subFields: [
      { id: "dt-columns", label: "6.1 Columns", checked: false },
      { id: "dt-rows", label: "6.2 Data Rows", checked: false },
      { id: "dt-sorting", label: "6.3 Sorting", checked: false },
      { id: "dt-pagination", label: "6.4 Pagination", checked: false },
    ]},
    { id: "recent-activity", label: "7. Recent Activity Feed", checked: false, icon: "🕐", subFields: [
      { id: "ra-activity-type", label: "7.1 Activity Type", checked: false },
      { id: "ra-description", label: "7.2 Description", checked: false },
      { id: "ra-timestamp", label: "7.3 Timestamp", checked: false },
      { id: "ra-user", label: "7.4 User", checked: false },
    ]},
    { id: "calendar-widget", label: "8. Calendar Widget", checked: false, icon: "📅", subFields: [
      { id: "cw-date-picker", label: "8.1 Date Picker", checked: false },
      { id: "cw-events", label: "8.2 Events", checked: false },
      { id: "cw-reminders", label: "8.3 Reminders", checked: false },
    ]},
    { id: "quick-actions", label: "9. Quick Actions Panel", checked: false, icon: "⚡", subFields: [
      { id: "qa-action-buttons", label: "9.1 Action Buttons", checked: false },
      { id: "qa-shortcuts", label: "9.2 Shortcuts", checked: false },
      { id: "qa-recent-items", label: "9.3 Recent Items", checked: false },
    ]},
    { id: "notifications-widget", label: "10. Notifications Widget", checked: false, icon: "🔔", subFields: [
      { id: "nw-notification-list", label: "10.1 Notification List", checked: false },
      { id: "nw-unread-count", label: "10.2 Unread Count", checked: false },
      { id: "nw-mark-read", label: "10.3 Mark as Read", checked: false },
    ]},
  ],
  // E-Commerce: Browse → View → Select → Cart → Checkout → Track
  "e-commerce-page": [
    { id: "product-grid", label: "1. Product Grid", checked: false, icon: "🛍️", subFields: [
      { id: "pg-image", label: "1.1 Product Image", checked: false },
      { id: "pg-name", label: "1.2 Product Name", checked: false },
      { id: "pg-price", label: "1.3 Price", checked: false },
      { id: "pg-rating", label: "1.4 Rating", checked: false },
      { id: "pg-add-cart", label: "1.5 Add to Cart Button", checked: false },
    ]},
    { id: "product-filters", label: "2. Product Filters", checked: false, icon: "🔍", subFields: [
      { id: "pf-category", label: "2.1 Category Filter", checked: false },
      { id: "pf-price-range", label: "2.2 Price Range", checked: false },
      { id: "pf-brand", label: "2.3 Brand Filter", checked: false },
      { id: "pf-rating", label: "2.4 Rating Filter", checked: false },
      { id: "pf-sort", label: "2.5 Sort Options", checked: false },
    ]},
    { id: "product-detail", label: "3. Product Detail", checked: false, icon: "📦", subFields: [
      { id: "pd-images", label: "3.1 Image Gallery", checked: false },
      { id: "pd-title", label: "3.2 Product Title", checked: false },
      { id: "pd-price", label: "3.3 Price", checked: false },
      { id: "pd-description", label: "3.4 Description", checked: false },
      { id: "pd-specifications", label: "3.5 Specifications", checked: false },
      { id: "pd-variants", label: "3.6 Variants (Size/Color)", checked: false },
      { id: "pd-quantity", label: "3.7 Quantity Selector", checked: false },
    ]},
    { id: "reviews-ratings", label: "4. Reviews & Ratings", checked: false, icon: "⭐", subFields: [
      { id: "rr-average-rating", label: "4.1 Average Rating", checked: false },
      { id: "rr-review-count", label: "4.2 Review Count", checked: false },
      { id: "rr-review-text", label: "4.3 Review Text", checked: false },
      { id: "rr-reviewer-name", label: "4.4 Reviewer Name", checked: false },
      { id: "rr-date", label: "4.5 Date", checked: false },
    ]},
    { id: "wishlist", label: "5. Wishlist", checked: false, icon: "❤️", subFields: [
      { id: "wl-product-image", label: "5.1 Product Image", checked: false },
      { id: "wl-product-name", label: "5.2 Product Name", checked: false },
      { id: "wl-price", label: "5.3 Price", checked: false },
      { id: "wl-move-cart", label: "5.4 Move to Cart", checked: false },
      { id: "wl-remove", label: "5.5 Remove Button", checked: false },
    ]},
    { id: "shopping-cart", label: "6. Shopping Cart", checked: false, icon: "🛒", subFields: [
      { id: "sc-item-image", label: "6.1 Item Image", checked: false },
      { id: "sc-item-name", label: "6.2 Item Name", checked: false },
      { id: "sc-quantity", label: "6.3 Quantity", checked: false },
      { id: "sc-price", label: "6.4 Price", checked: false },
      { id: "sc-subtotal", label: "6.5 Subtotal", checked: false },
      { id: "sc-remove", label: "6.6 Remove Button", checked: false },
    ]},
    { id: "checkout-flow", label: "7. Checkout Flow", checked: false, icon: "💳", subFields: [
      { id: "cf-shipping-address", label: "7.1 Shipping Address", checked: false },
      { id: "cf-billing-address", label: "7.2 Billing Address", checked: false },
      { id: "cf-payment-method", label: "7.3 Payment Method", checked: false },
      { id: "cf-order-summary", label: "7.4 Order Summary", checked: false },
      { id: "cf-coupon-code", label: "7.5 Coupon Code", checked: false },
      { id: "cf-place-order", label: "7.6 Place Order Button", checked: false },
    ]},
    { id: "order-tracking", label: "8. Order Tracking", checked: false, icon: "📍", subFields: [
      { id: "ot-order-id", label: "8.1 Order ID", checked: false },
      { id: "ot-status", label: "8.2 Status", checked: false },
      { id: "ot-timeline", label: "8.3 Tracking Timeline", checked: false },
      { id: "ot-delivery-date", label: "8.4 Estimated Delivery", checked: false },
    ]},
  ],
  // Employee: Create → List → View → Track → Manage → Organize → Reports
  "employee-page": [
    { id: "add-employee", label: "1. Add Employee", checked: false, icon: "➕", subFields: [
      { id: "ae-name", label: "1.1 Employee Name", checked: false },
      { id: "ae-email", label: "1.2 Email", checked: false },
      { id: "ae-phone", label: "1.3 Mobile Number", checked: false },
      { id: "ae-address", label: "1.4 Address", checked: false },
      { id: "ae-department", label: "1.5 Department", checked: false },
      { id: "ae-designation", label: "1.6 Designation", checked: false },
      { id: "ae-join-date", label: "1.7 Join Date", checked: false },
      { id: "ae-salary", label: "1.8 Salary", checked: false },
      { id: "ae-photo", label: "1.9 Photo Upload", checked: false },
    ]},
    { id: "employee-list", label: "2. Employee List", checked: false, icon: "👥", subFields: [
      { id: "el-photo", label: "2.1 Photo", checked: false },
      { id: "el-name", label: "2.2 Name", checked: false },
      { id: "el-department", label: "2.3 Department", checked: false },
      { id: "el-designation", label: "2.4 Designation", checked: false },
      { id: "el-status", label: "2.5 Status", checked: false },
      { id: "el-actions", label: "2.6 Actions", checked: false },
    ]},
    { id: "employee-profile", label: "3. Employee Profile", checked: false, icon: "👤", subFields: [
      { id: "ep-photo", label: "3.1 Profile Photo", checked: false },
      { id: "ep-personal-info", label: "3.2 Personal Information", checked: false },
      { id: "ep-contact-info", label: "3.3 Contact Information", checked: false },
      { id: "ep-job-details", label: "3.4 Job Details", checked: false },
      { id: "ep-emergency-contact", label: "3.5 Emergency Contact", checked: false },
    ]},
    { id: "attendance-tracker", label: "4. Attendance Tracker", checked: false, icon: "📅", subFields: [
      { id: "at-date", label: "4.1 Date", checked: false },
      { id: "at-check-in", label: "4.2 Check In Time", checked: false },
      { id: "at-check-out", label: "4.3 Check Out Time", checked: false },
      { id: "at-status", label: "4.4 Status (Present/Absent)", checked: false },
      { id: "at-working-hours", label: "4.5 Working Hours", checked: false },
    ]},
    { id: "leave-management", label: "5. Leave Management", checked: false, icon: "🏖️", subFields: [
      { id: "lm-leave-type", label: "5.1 Leave Type", checked: false },
      { id: "lm-from-date", label: "5.2 From Date", checked: false },
      { id: "lm-to-date", label: "5.3 To Date", checked: false },
      { id: "lm-reason", label: "5.4 Reason", checked: false },
      { id: "lm-status", label: "5.5 Status", checked: false },
      { id: "lm-balance", label: "5.6 Leave Balance", checked: false },
    ]},
    { id: "payroll-info", label: "6. Payroll Information", checked: false, icon: "💰", subFields: [
      { id: "pi-basic-salary", label: "6.1 Basic Salary", checked: false },
      { id: "pi-allowances", label: "6.2 Allowances", checked: false },
      { id: "pi-deductions", label: "6.3 Deductions", checked: false },
      { id: "pi-net-salary", label: "6.4 Net Salary", checked: false },
      { id: "pi-bank-details", label: "6.5 Bank Details", checked: false },
    ]},
    { id: "performance-review", label: "7. Performance Review", checked: false, icon: "📊", subFields: [
      { id: "pr-review-period", label: "7.1 Review Period", checked: false },
      { id: "pr-goals", label: "7.2 Goals", checked: false },
      { id: "pr-achievements", label: "7.3 Achievements", checked: false },
      { id: "pr-rating", label: "7.4 Rating", checked: false },
      { id: "pr-feedback", label: "7.5 Feedback", checked: false },
    ]},
    { id: "document-management", label: "8. Document Management", checked: false, icon: "📁", subFields: [
      { id: "dm-doc-type", label: "8.1 Document Type", checked: false },
      { id: "dm-file-name", label: "8.2 File Name", checked: false },
      { id: "dm-upload-date", label: "8.3 Upload Date", checked: false },
      { id: "dm-download", label: "8.4 Download Button", checked: false },
    ]},
    { id: "org-chart", label: "9. Organization Chart", checked: false, icon: "🏢", subFields: [
      { id: "oc-hierarchy", label: "9.1 Hierarchy View", checked: false },
      { id: "oc-department-filter", label: "9.2 Department Filter", checked: false },
      { id: "oc-employee-card", label: "9.3 Employee Card", checked: false },
    ]},
  ],
  // Error: Display → Navigate → Help
  "error-page": [
    { id: "error-code", label: "1. Error Code Display", checked: false, icon: "🔢", subFields: [
      { id: "ec-code", label: "1.1 Error Code (404/500)", checked: false },
      { id: "ec-title", label: "1.2 Error Title", checked: false },
    ]},
    { id: "error-message", label: "2. Error Message", checked: false, icon: "⚠️", subFields: [
      { id: "em-description", label: "2.1 Description Text", checked: false },
      { id: "em-suggestion", label: "2.2 Suggestion Text", checked: false },
    ]},
    { id: "animated-illustration", label: "3. Animated Illustration", checked: false, icon: "🎨", subFields: [
      { id: "ai-image", label: "3.1 Error Image/Animation", checked: false },
    ]},
    { id: "back-home", label: "4. Back to Home Button", checked: false, icon: "🏠", subFields: [
      { id: "bh-button", label: "4.1 Home Button", checked: false },
      { id: "bh-back-button", label: "4.2 Go Back Button", checked: false },
    ]},
    { id: "search-box", label: "5. Search Box", checked: false, icon: "🔍", subFields: [
      { id: "sb-input", label: "5.1 Search Input", checked: false },
      { id: "sb-button", label: "5.2 Search Button", checked: false },
    ]},
    { id: "popular-links", label: "6. Popular Links", checked: false, icon: "🔗", subFields: [
      { id: "pl-link-list", label: "6.1 Link List", checked: false },
    ]},
    { id: "contact-support", label: "7. Contact Support", checked: false, icon: "📞", subFields: [
      { id: "cs-email", label: "7.1 Support Email", checked: false },
      { id: "cs-phone", label: "7.2 Support Phone", checked: false },
    ]},
    { id: "auto-redirect", label: "8. Auto Redirect Timer", checked: false, icon: "⏱️", subFields: [
      { id: "ar-countdown", label: "8.1 Countdown Timer", checked: false },
      { id: "ar-redirect-url", label: "8.2 Redirect URL", checked: false },
    ]},
  ],
  // Form: Basic Inputs → Selection → Advanced → Validation → Submit
  "form-page": [
    { id: "text-inputs", label: "1. Text Inputs", checked: false, icon: "📝", subFields: [
      { id: "ti-text", label: "1.1 Text Field", checked: false },
      { id: "ti-email", label: "1.2 Email Field", checked: false },
      { id: "ti-password", label: "1.3 Password Field", checked: false },
      { id: "ti-textarea", label: "1.4 Textarea", checked: false },
      { id: "ti-number", label: "1.5 Number Field", checked: false },
    ]},
    { id: "select-dropdowns", label: "2. Select Dropdowns", checked: false, icon: "📋", subFields: [
      { id: "sd-single", label: "2.1 Single Select", checked: false },
      { id: "sd-multi", label: "2.2 Multi Select", checked: false },
      { id: "sd-searchable", label: "2.3 Searchable Select", checked: false },
    ]},
    { id: "checkboxes-radios", label: "3. Checkboxes & Radios", checked: false, icon: "☑️", subFields: [
      { id: "cr-checkbox", label: "3.1 Checkbox", checked: false },
      { id: "cr-radio", label: "3.2 Radio Button", checked: false },
      { id: "cr-toggle", label: "3.3 Toggle Switch", checked: false },
    ]},
    { id: "date-time-picker", label: "4. Date/Time Picker", checked: false, icon: "📅", subFields: [
      { id: "dtp-date", label: "4.1 Date Picker", checked: false },
      { id: "dtp-time", label: "4.2 Time Picker", checked: false },
      { id: "dtp-datetime", label: "4.3 DateTime Picker", checked: false },
      { id: "dtp-range", label: "4.4 Date Range", checked: false },
    ]},
    { id: "file-upload", label: "5. File Upload", checked: false, icon: "📤", subFields: [
      { id: "fu-single", label: "5.1 Single File", checked: false },
      { id: "fu-multiple", label: "5.2 Multiple Files", checked: false },
      { id: "fu-drag-drop", label: "5.3 Drag & Drop", checked: false },
      { id: "fu-preview", label: "5.4 Preview", checked: false },
    ]},
    { id: "form-validation", label: "6. Form Validation", checked: false, icon: "✅", subFields: [
      { id: "fv-required", label: "6.1 Required Fields", checked: false },
      { id: "fv-pattern", label: "6.2 Pattern Validation", checked: false },
      { id: "fv-error-message", label: "6.3 Error Messages", checked: false },
    ]},
    { id: "auto-save", label: "7. Auto-Save Draft", checked: false, icon: "💾", subFields: [
      { id: "as-interval", label: "7.1 Save Interval", checked: false },
      { id: "as-indicator", label: "7.2 Save Indicator", checked: false },
    ]},
    { id: "multi-step-form", label: "8. Multi-Step Form", checked: false, icon: "📊", subFields: [
      { id: "msf-progress", label: "8.1 Progress Bar", checked: false },
      { id: "msf-steps", label: "8.2 Step Indicators", checked: false },
      { id: "msf-navigation", label: "8.3 Next/Previous Buttons", checked: false },
    ]},
  ],
  // Gallery: Upload → Display → Navigate → Filter → Actions
  "gallery-page": [
    { id: "image-upload", label: "1. Image Upload", checked: false, icon: "📤", subFields: [
      { id: "iu-drag-drop", label: "1.1 Drag & Drop Zone", checked: false },
      { id: "iu-preview", label: "1.2 Preview", checked: false },
      { id: "iu-progress", label: "1.3 Upload Progress", checked: false },
    ]},
    { id: "image-grid", label: "2. Image Grid", checked: false, icon: "🖼️", subFields: [
      { id: "ig-thumbnail", label: "2.1 Thumbnail", checked: false },
      { id: "ig-title", label: "2.2 Title", checked: false },
      { id: "ig-hover-effect", label: "2.3 Hover Effect", checked: false },
    ]},
    { id: "masonry-layout", label: "3. Masonry Layout", checked: false, icon: "🧱", subFields: [
      { id: "ml-columns", label: "3.1 Column Layout", checked: false },
      { id: "ml-responsive", label: "3.2 Responsive Grid", checked: false },
    ]},
    { id: "image-carousel", label: "4. Image Carousel", checked: false, icon: "🎠", subFields: [
      { id: "ic-slides", label: "4.1 Slides", checked: false },
      { id: "ic-navigation", label: "4.2 Navigation Arrows", checked: false },
      { id: "ic-dots", label: "4.3 Indicator Dots", checked: false },
      { id: "ic-autoplay", label: "4.4 Autoplay", checked: false },
    ]},
    { id: "lightbox", label: "5. Lightbox Preview", checked: false, icon: "🔍", subFields: [
      { id: "lb-fullscreen", label: "5.1 Fullscreen View", checked: false },
      { id: "lb-navigation", label: "5.2 Navigation", checked: false },
      { id: "lb-zoom", label: "5.3 Zoom Controls", checked: false },
    ]},
    { id: "category-filter", label: "6. Category Filter", checked: false, icon: "🏷️", subFields: [
      { id: "cf-tabs", label: "6.1 Filter Tabs", checked: false },
      { id: "cf-dropdown", label: "6.2 Filter Dropdown", checked: false },
    ]},
    { id: "lazy-loading", label: "7. Lazy Loading", checked: false, icon: "⏳", subFields: [
      { id: "ll-placeholder", label: "7.1 Placeholder", checked: false },
      { id: "ll-infinite-scroll", label: "7.2 Infinite Scroll", checked: false },
    ]},
    { id: "download-option", label: "8. Download Option", checked: false, icon: "📥", subFields: [
      { id: "do-button", label: "8.1 Download Button", checked: false },
      { id: "do-format", label: "8.2 Format Selection", checked: false },
    ]},
    { id: "share-buttons", label: "9. Share Buttons", checked: false, icon: "📢", subFields: [
      { id: "sb-social", label: "9.1 Social Media", checked: false },
      { id: "sb-copy-link", label: "9.2 Copy Link", checked: false },
    ]},
  ],
  // Inventory: Add → List → Track → Manage → Order → Reports
  "inventory-page": [
    { id: "add-product", label: "1. Add Product", checked: false, icon: "➕", subFields: [
      { id: "ap-name", label: "1.1 Product Name", checked: false },
      { id: "ap-sku", label: "1.2 SKU", checked: false },
      { id: "ap-category", label: "1.3 Category", checked: false },
      { id: "ap-price", label: "1.4 Price", checked: false },
      { id: "ap-quantity", label: "1.5 Quantity", checked: false },
      { id: "ap-image", label: "1.6 Product Image", checked: false },
    ]},
    { id: "product-list", label: "2. Product List", checked: false, icon: "📦", subFields: [
      { id: "pl-image", label: "2.1 Product Image", checked: false },
      { id: "pl-name", label: "2.2 Product Name", checked: false },
      { id: "pl-sku", label: "2.3 SKU", checked: false },
      { id: "pl-stock", label: "2.4 Stock Quantity", checked: false },
      { id: "pl-price", label: "2.5 Price", checked: false },
    ]},
    { id: "category-management", label: "3. Category Management", checked: false, icon: "🏷️", subFields: [
      { id: "cm-name", label: "3.1 Category Name", checked: false },
      { id: "cm-parent", label: "3.2 Parent Category", checked: false },
      { id: "cm-product-count", label: "3.3 Product Count", checked: false },
    ]},
    { id: "stock-levels", label: "4. Stock Levels", checked: false, icon: "📊", subFields: [
      { id: "sl-current", label: "4.1 Current Stock", checked: false },
      { id: "sl-reorder-level", label: "4.2 Reorder Level", checked: false },
      { id: "sl-status", label: "4.3 Stock Status", checked: false },
    ]},
    { id: "barcode-scanner", label: "5. Barcode Scanner", checked: false, icon: "📱", subFields: [
      { id: "bs-scan-input", label: "5.1 Scan Input", checked: false },
      { id: "bs-product-info", label: "5.2 Product Info Display", checked: false },
    ]},
    { id: "low-stock-alerts", label: "6. Low Stock Alerts", checked: false, icon: "⚠️", subFields: [
      { id: "lsa-product", label: "6.1 Product Name", checked: false },
      { id: "lsa-current", label: "6.2 Current Stock", checked: false },
      { id: "lsa-threshold", label: "6.3 Threshold", checked: false },
    ]},
    { id: "supplier-info", label: "7. Supplier Information", checked: false, icon: "🏭", subFields: [
      { id: "si-name", label: "7.1 Supplier Name", checked: false },
      { id: "si-contact", label: "7.2 Contact Info", checked: false },
      { id: "si-products", label: "7.3 Products Supplied", checked: false },
    ]},
    { id: "purchase-orders", label: "8. Purchase Orders", checked: false, icon: "📝", subFields: [
      { id: "po-order-id", label: "8.1 Order ID", checked: false },
      { id: "po-supplier", label: "8.2 Supplier", checked: false },
      { id: "po-items", label: "8.3 Items", checked: false },
      { id: "po-total", label: "8.4 Total Amount", checked: false },
      { id: "po-status", label: "8.5 Status", checked: false },
    ]},
    { id: "inventory-reports", label: "9. Inventory Reports", checked: false, icon: "📈", subFields: [
      { id: "ir-stock-value", label: "9.1 Total Stock Value", checked: false },
      { id: "ir-movement", label: "9.2 Stock Movement", checked: false },
      { id: "ir-turnover", label: "9.3 Turnover Rate", checked: false },
    ]},
  ],
  // Landing: Hero → Features → Social Proof → Pricing → CTA → Lead Capture
  "landing-page": [
    { id: "hero-section", label: "1. Hero Section", checked: false, icon: "🎯", subFields: [
      { id: "hs-headline", label: "1.1 Headline", checked: false },
      { id: "hs-subheadline", label: "1.2 Subheadline", checked: false },
      { id: "hs-cta-button", label: "1.3 CTA Button", checked: false },
      { id: "hs-hero-image", label: "1.4 Hero Image/Video", checked: false },
    ]},
    { id: "features-section", label: "2. Features Section", checked: false, icon: "✨", subFields: [
      { id: "fs-icon", label: "2.1 Feature Icon", checked: false },
      { id: "fs-title", label: "2.2 Feature Title", checked: false },
      { id: "fs-description", label: "2.3 Feature Description", checked: false },
    ]},
    { id: "social-proof", label: "3. Social Proof/Logos", checked: false, icon: "🏆", subFields: [
      { id: "sp-logos", label: "3.1 Company Logos", checked: false },
      { id: "sp-stats", label: "3.2 Statistics", checked: false },
      { id: "sp-badges", label: "3.3 Trust Badges", checked: false },
    ]},
    { id: "testimonials", label: "4. Testimonials", checked: false, icon: "💬", subFields: [
      { id: "tm-quote", label: "4.1 Quote", checked: false },
      { id: "tm-author-name", label: "4.2 Author Name", checked: false },
      { id: "tm-author-title", label: "4.3 Author Title", checked: false },
      { id: "tm-author-photo", label: "4.4 Author Photo", checked: false },
      { id: "tm-rating", label: "4.5 Rating Stars", checked: false },
    ]},
    { id: "pricing-table", label: "5. Pricing Table", checked: false, icon: "💰", subFields: [
      { id: "pt-plan-name", label: "5.1 Plan Name", checked: false },
      { id: "pt-price", label: "5.2 Price", checked: false },
      { id: "pt-features", label: "5.3 Feature List", checked: false },
      { id: "pt-cta", label: "5.4 CTA Button", checked: false },
      { id: "pt-popular-badge", label: "5.5 Popular Badge", checked: false },
    ]},
    { id: "faq-accordion", label: "6. FAQ Accordion", checked: false, icon: "❓", subFields: [
      { id: "fa-question", label: "6.1 Question", checked: false },
      { id: "fa-answer", label: "6.2 Answer", checked: false },
      { id: "fa-expand-icon", label: "6.3 Expand/Collapse Icon", checked: false },
    ]},
    { id: "cta-buttons", label: "7. CTA Buttons", checked: false, icon: "🔘", subFields: [
      { id: "cb-primary", label: "7.1 Primary CTA", checked: false },
      { id: "cb-secondary", label: "7.2 Secondary CTA", checked: false },
      { id: "cb-text", label: "7.3 Supporting Text", checked: false },
    ]},
    { id: "newsletter-signup", label: "8. Newsletter Signup", checked: false, icon: "📧", subFields: [
      { id: "ns-email-input", label: "8.1 Email Input", checked: false },
      { id: "ns-submit-button", label: "8.2 Submit Button", checked: false },
      { id: "ns-privacy-text", label: "8.3 Privacy Text", checked: false },
    ]},
  ],
  // Login: Register → Login → Recovery → Security
  "login-page": [
    { id: "register-form", label: "1. Register Form", checked: false, icon: "📝", subFields: [
      { id: "rf-name", label: "1.1 Full Name", checked: false },
      { id: "rf-email", label: "1.2 Email", checked: false },
      { id: "rf-password", label: "1.3 Password", checked: false },
      { id: "rf-confirm-password", label: "1.4 Confirm Password", checked: false },
      { id: "rf-phone", label: "1.5 Phone Number", checked: false },
    ]},
    { id: "terms-checkbox", label: "2. Terms & Conditions", checked: false, icon: "📋", subFields: [
      { id: "tc-checkbox", label: "2.1 Checkbox", checked: false },
      { id: "tc-link", label: "2.2 Terms Link", checked: false },
      { id: "tc-privacy-link", label: "2.3 Privacy Policy Link", checked: false },
    ]},
    { id: "login-form", label: "3. Login Form", checked: false, icon: "🔐", subFields: [
      { id: "lf-email", label: "3.1 Email/Username", checked: false },
      { id: "lf-password", label: "3.2 Password", checked: false },
      { id: "lf-submit", label: "3.3 Login Button", checked: false },
    ]},
    { id: "remember-me", label: "4. Remember Me", checked: false, icon: "✅", subFields: [
      { id: "rm-checkbox", label: "4.1 Checkbox", checked: false },
      { id: "rm-label", label: "4.2 Label Text", checked: false },
    ]},
    { id: "social-login", label: "5. Social Login", checked: false, icon: "🌐", subFields: [
      { id: "sl-google", label: "5.1 Google Login", checked: false },
      { id: "sl-facebook", label: "5.2 Facebook Login", checked: false },
      { id: "sl-apple", label: "5.3 Apple Login", checked: false },
      { id: "sl-github", label: "5.4 GitHub Login", checked: false },
    ]},
    { id: "forgot-password", label: "6. Forgot Password", checked: false, icon: "🔑", subFields: [
      { id: "fp-link", label: "6.1 Forgot Password Link", checked: false },
      { id: "fp-email-input", label: "6.2 Email Input", checked: false },
      { id: "fp-submit", label: "6.3 Submit Button", checked: false },
    ]},
    { id: "two-factor-auth", label: "7. Two-Factor Auth", checked: false, icon: "📱", subFields: [
      { id: "tfa-code-input", label: "7.1 Code Input", checked: false },
      { id: "tfa-verify", label: "7.2 Verify Button", checked: false },
      { id: "tfa-resend", label: "7.3 Resend Code", checked: false },
    ]},
    { id: "captcha", label: "8. CAPTCHA", checked: false, icon: "🤖", subFields: [
      { id: "cp-recaptcha", label: "8.1 reCAPTCHA Widget", checked: false },
      { id: "cp-hcaptcha", label: "8.2 hCaptcha Widget", checked: false },
    ]},
  ],
  // Portfolio: About → Projects → Details → Proof → Contact
  "portfolio-page": [
    { id: "skills-section", label: "1. Skills Section", checked: false, icon: "💪", subFields: [
      { id: "sk-skill-name", label: "1.1 Skill Name", checked: false },
      { id: "sk-proficiency", label: "1.2 Proficiency Level", checked: false },
      { id: "sk-icon", label: "1.3 Skill Icon", checked: false },
    ]},
    { id: "project-grid", label: "2. Project Grid", checked: false, icon: "📁", subFields: [
      { id: "pg-thumbnail", label: "2.1 Thumbnail", checked: false },
      { id: "pg-title", label: "2.2 Project Title", checked: false },
      { id: "pg-category", label: "2.3 Category Tag", checked: false },
      { id: "pg-hover-overlay", label: "2.4 Hover Overlay", checked: false },
    ]},
    { id: "project-detail", label: "3. Project Detail", checked: false, icon: "📄", subFields: [
      { id: "pd-title", label: "3.1 Project Title", checked: false },
      { id: "pd-description", label: "3.2 Description", checked: false },
      { id: "pd-gallery", label: "3.3 Image Gallery", checked: false },
      { id: "pd-technologies", label: "3.4 Technologies Used", checked: false },
      { id: "pd-live-link", label: "3.5 Live Link", checked: false },
      { id: "pd-github-link", label: "3.6 GitHub Link", checked: false },
    ]},
    { id: "category-filter", label: "4. Category Filter", checked: false, icon: "🏷️", subFields: [
      { id: "cf-all", label: "4.1 All Filter", checked: false },
      { id: "cf-categories", label: "4.2 Category Buttons", checked: false },
    ]},
    { id: "case-studies", label: "5. Case Studies", checked: false, icon: "📊", subFields: [
      { id: "cs-challenge", label: "5.1 Challenge", checked: false },
      { id: "cs-solution", label: "5.2 Solution", checked: false },
      { id: "cs-results", label: "5.3 Results", checked: false },
    ]},
    { id: "client-logos", label: "6. Client Logos", checked: false, icon: "🏢", subFields: [
      { id: "cl-logo-grid", label: "6.1 Logo Grid", checked: false },
      { id: "cl-tooltip", label: "6.2 Client Name Tooltip", checked: false },
    ]},
    { id: "testimonials", label: "7. Testimonials", checked: false, icon: "💬", subFields: [
      { id: "tm-quote", label: "7.1 Quote", checked: false },
      { id: "tm-client-name", label: "7.2 Client Name", checked: false },
      { id: "tm-company", label: "7.3 Company", checked: false },
    ]},
    { id: "contact-cta", label: "8. Contact CTA", checked: false, icon: "📞", subFields: [
      { id: "cc-heading", label: "8.1 Heading", checked: false },
      { id: "cc-button", label: "8.2 Contact Button", checked: false },
      { id: "cc-email", label: "8.3 Email Link", checked: false },
    ]},
  ],
  // Reports: Select → Filter → View → Analyze → Export → Schedule
  "reports-dashboard": [
    { id: "report-list", label: "1. Report List", checked: false, icon: "📋", subFields: [
      { id: "rl-report-name", label: "1.1 Report Name", checked: false },
      { id: "rl-type", label: "1.2 Report Type", checked: false },
      { id: "rl-last-run", label: "1.3 Last Run Date", checked: false },
    ]},
    { id: "date-range-filter", label: "2. Date Range Filter", checked: false, icon: "📅", subFields: [
      { id: "dr-start-date", label: "2.1 Start Date", checked: false },
      { id: "dr-end-date", label: "2.2 End Date", checked: false },
      { id: "dr-presets", label: "2.3 Quick Presets", checked: false },
    ]},
    { id: "data-visualization", label: "3. Data Visualization", checked: false, icon: "📊", subFields: [
      { id: "dv-charts", label: "3.1 Charts", checked: false },
      { id: "dv-graphs", label: "3.2 Graphs", checked: false },
      { id: "dv-tables", label: "3.3 Data Tables", checked: false },
    ]},
    { id: "comparison-view", label: "4. Comparison View", checked: false, icon: "⚖️", subFields: [
      { id: "cv-period-1", label: "4.1 Period 1", checked: false },
      { id: "cv-period-2", label: "4.2 Period 2", checked: false },
      { id: "cv-difference", label: "4.3 Difference", checked: false },
    ]},
    { id: "drill-down", label: "5. Drill-Down Analysis", checked: false, icon: "🔍", subFields: [
      { id: "dd-summary", label: "5.1 Summary Level", checked: false },
      { id: "dd-details", label: "5.2 Detailed Level", checked: false },
      { id: "dd-breadcrumb", label: "5.3 Breadcrumb Navigation", checked: false },
    ]},
    { id: "custom-reports", label: "6. Custom Reports", checked: false, icon: "🔧", subFields: [
      { id: "cr-builder", label: "6.1 Report Builder", checked: false },
      { id: "cr-columns", label: "6.2 Column Selection", checked: false },
      { id: "cr-filters", label: "6.3 Custom Filters", checked: false },
    ]},
    { id: "export-reports", label: "7. Export Reports", checked: false, icon: "📤", subFields: [
      { id: "er-pdf", label: "7.1 PDF Export", checked: false },
      { id: "er-excel", label: "7.2 Excel Export", checked: false },
      { id: "er-csv", label: "7.3 CSV Export", checked: false },
    ]},
    { id: "scheduled-reports", label: "8. Scheduled Reports", checked: false, icon: "⏰", subFields: [
      { id: "sr-frequency", label: "8.1 Frequency", checked: false },
      { id: "sr-recipients", label: "8.2 Recipients", checked: false },
      { id: "sr-format", label: "8.3 Format", checked: false },
    ]},
  ],
  // Service: List → Detail → Compare → Pricing → Book → FAQ
  "service-page": [
    { id: "service-list", label: "1. Service List", checked: false, icon: "📋", subFields: [
      { id: "sl-icon", label: "1.1 Service Icon", checked: false },
      { id: "sl-title", label: "1.2 Service Title", checked: false },
      { id: "sl-description", label: "1.3 Short Description", checked: false },
    ]},
    { id: "service-detail", label: "2. Service Detail", checked: false, icon: "📄", subFields: [
      { id: "sd-title", label: "2.1 Title", checked: false },
      { id: "sd-description", label: "2.2 Full Description", checked: false },
      { id: "sd-benefits", label: "2.3 Benefits", checked: false },
      { id: "sd-images", label: "2.4 Images", checked: false },
    ]},
    { id: "process-steps", label: "3. Process Steps", checked: false, icon: "📊", subFields: [
      { id: "ps-step-number", label: "3.1 Step Number", checked: false },
      { id: "ps-title", label: "3.2 Step Title", checked: false },
      { id: "ps-description", label: "3.3 Step Description", checked: false },
    ]},
    { id: "service-comparison", label: "4. Service Comparison", checked: false, icon: "⚖️", subFields: [
      { id: "sc-feature", label: "4.1 Feature Name", checked: false },
      { id: "sc-basic", label: "4.2 Basic Plan", checked: false },
      { id: "sc-premium", label: "4.3 Premium Plan", checked: false },
    ]},
    { id: "pricing-options", label: "5. Pricing Options", checked: false, icon: "💰", subFields: [
      { id: "po-plan-name", label: "5.1 Plan Name", checked: false },
      { id: "po-price", label: "5.2 Price", checked: false },
      { id: "po-duration", label: "5.3 Duration", checked: false },
      { id: "po-features", label: "5.4 Included Features", checked: false },
    ]},
    { id: "team-members", label: "6. Team Members", checked: false, icon: "👥", subFields: [
      { id: "tm-photo", label: "6.1 Photo", checked: false },
      { id: "tm-name", label: "6.2 Name", checked: false },
      { id: "tm-role", label: "6.3 Role", checked: false },
      { id: "tm-bio", label: "6.4 Bio", checked: false },
    ]},
    { id: "booking-form", label: "7. Booking Form", checked: false, icon: "📅", subFields: [
      { id: "bf-service", label: "7.1 Service Selection", checked: false },
      { id: "bf-date", label: "7.2 Date", checked: false },
      { id: "bf-time", label: "7.3 Time Slot", checked: false },
      { id: "bf-contact", label: "7.4 Contact Info", checked: false },
    ]},
    { id: "service-faq", label: "8. Service FAQ", checked: false, icon: "❓", subFields: [
      { id: "sf-question", label: "8.1 Question", checked: false },
      { id: "sf-answer", label: "8.2 Answer", checked: false },
    ]},
  ],
  // Settings: Profile → Account → Preferences → Security → Advanced
  "settings-page": [
    { id: "profile-settings", label: "1. Profile Settings", checked: false, icon: "👤", subFields: [
      { id: "ps-avatar", label: "1.1 Avatar Upload", checked: false },
      { id: "ps-name", label: "1.2 Display Name", checked: false },
      { id: "ps-bio", label: "1.3 Bio", checked: false },
      { id: "ps-website", label: "1.4 Website", checked: false },
    ]},
    { id: "account-settings", label: "2. Account Settings", checked: false, icon: "⚙️", subFields: [
      { id: "as-email", label: "2.1 Email", checked: false },
      { id: "as-username", label: "2.2 Username", checked: false },
      { id: "as-phone", label: "2.3 Phone", checked: false },
      { id: "as-timezone", label: "2.4 Timezone", checked: false },
    ]},
    { id: "notification-prefs", label: "3. Notification Preferences", checked: false, icon: "🔔", subFields: [
      { id: "np-email-notif", label: "3.1 Email Notifications", checked: false },
      { id: "np-push-notif", label: "3.2 Push Notifications", checked: false },
      { id: "np-sms-notif", label: "3.3 SMS Notifications", checked: false },
    ]},
    { id: "theme-settings", label: "4. Theme Settings", checked: false, icon: "🎨", subFields: [
      { id: "ts-mode", label: "4.1 Light/Dark Mode", checked: false },
      { id: "ts-color", label: "4.2 Accent Color", checked: false },
      { id: "ts-font-size", label: "4.3 Font Size", checked: false },
    ]},
    { id: "language-settings", label: "5. Language Settings", checked: false, icon: "🌐", subFields: [
      { id: "ls-language", label: "5.1 Language Selection", checked: false },
      { id: "ls-region", label: "5.2 Region", checked: false },
      { id: "ls-date-format", label: "5.3 Date Format", checked: false },
    ]},
    { id: "privacy-settings", label: "6. Privacy Settings", checked: false, icon: "🔒", subFields: [
      { id: "prs-profile-visibility", label: "6.1 Profile Visibility", checked: false },
      { id: "prs-activity-status", label: "6.2 Activity Status", checked: false },
      { id: "prs-data-sharing", label: "6.3 Data Sharing", checked: false },
    ]},
    { id: "security-settings", label: "7. Security Settings", checked: false, icon: "🛡️", subFields: [
      { id: "ss-change-password", label: "7.1 Change Password", checked: false },
      { id: "ss-2fa", label: "7.2 Two-Factor Auth", checked: false },
      { id: "ss-sessions", label: "7.3 Active Sessions", checked: false },
    ]},
    { id: "connected-accounts", label: "8. Connected Accounts", checked: false, icon: "🔗", subFields: [
      { id: "ca-google", label: "8.1 Google", checked: false },
      { id: "ca-facebook", label: "8.2 Facebook", checked: false },
      { id: "ca-github", label: "8.3 GitHub", checked: false },
    ]},
  ],
};

// Level type
type LevelType = "basic" | "moderate" | "pro" | null;

export default function ModuleStudio() {
  // Added pages list
  const [addedPages, setAddedPages] = useState<AddedPage[]>([]);

  // Current page builder state
  const [selectedPageType, setSelectedPageType] = useState("");
  const [selectedLevel, setSelectedLevel] = useState<LevelType>(null);
  const [currentRequirements, setCurrentRequirements] = useState<Record<string, CheckboxOption[]>>(() => {
    const initialState: Record<string, CheckboxOption[]> = {};
    Object.keys(pageRequirements).forEach((key) => {
      initialState[key] = pageRequirements[key].map((opt) => ({ ...opt }));
    });
    return initialState;
  });
  const [currentEssentialFeatures, setCurrentEssentialFeatures] = useState<CheckboxOption[]>(
    essentialFeatures.map((opt) => ({ ...opt }))
  );
  const [essentialFeaturesOpen, setEssentialFeaturesOpen] = useState(false);
  const [expandedRequirements, setExpandedRequirements] = useState<Record<string, boolean>>({});

  // Project info
  const [projectDescription, setProjectDescription] = useState("");
  const [themeReferenceUrl, setThemeReferenceUrl] = useState("");

  // Generated prompt state
  const [generatedPrompt, setGeneratedPrompt] = useState("");
  const [copied, setCopied] = useState(false);

  // Handle level selection - auto-selects requirements based on level
  const handleLevelSelect = (level: LevelType) => {
    if (!selectedPageType || !level) return;

    setSelectedLevel(level);

    const requirements = pageRequirements[selectedPageType];
    if (!requirements) return;

    const totalCount = requirements.length;
    let selectCount = 0;

    // Basic: first 30% (minimum 2)
    // Moderate: first 60% (minimum 4)
    // Pro: all items (100%)
    if (level === "basic") {
      selectCount = Math.max(2, Math.floor(totalCount * 0.3));
    } else if (level === "moderate") {
      selectCount = Math.max(4, Math.floor(totalCount * 0.6));
    } else if (level === "pro") {
      selectCount = totalCount;
    }

    // Update requirements - select first N items based on level
    setCurrentRequirements((prev) => ({
      ...prev,
      [selectedPageType]: prev[selectedPageType].map((option, index) => ({
        ...option,
        checked: index < selectCount,
      })),
    }));

    // Also select essential features based on level
    const essentialCount = essentialFeatures.length;
    let essentialSelectCount = 0;

    if (level === "basic") {
      essentialSelectCount = Math.max(3, Math.floor(essentialCount * 0.25));
    } else if (level === "moderate") {
      essentialSelectCount = Math.max(6, Math.floor(essentialCount * 0.5));
    } else if (level === "pro") {
      essentialSelectCount = essentialCount;
    }

    setCurrentEssentialFeatures((prev) =>
      prev.map((option, index) => ({
        ...option,
        checked: index < essentialSelectCount,
      }))
    );
  };

  // Handle page-specific requirements checkbox change
  const handlePageRequirementChange = (pageType: string, optionId: string) => {
    setCurrentRequirements((prev) => ({
      ...prev,
      [pageType]: prev[pageType].map((option) =>
        option.id === optionId ? { ...option, checked: !option.checked } : option
      ),
    }));
  };

  // Handle essential features checkbox change
  const handleEssentialFeatureChange = (optionId: string) => {
    setCurrentEssentialFeatures((prev) =>
      prev.map((option) =>
        option.id === optionId ? { ...option, checked: !option.checked } : option
      )
    );
  };

  // Handle subfield checkbox change
  const handleSubFieldChange = (pageType: string, requirementId: string, subFieldId: string) => {
    setCurrentRequirements((prev) => ({
      ...prev,
      [pageType]: prev[pageType].map((option) =>
        option.id === requirementId
          ? {
              ...option,
              subFields: option.subFields?.map((sf) =>
                sf.id === subFieldId ? { ...sf, checked: !sf.checked } : sf
              ),
            }
          : option
      ),
    }));
  };

  // Toggle expand/collapse for requirement subfields
  const toggleRequirementExpand = (requirementId: string) => {
    setExpandedRequirements((prev) => ({
      ...prev,
      [requirementId]: !prev[requirementId],
    }));
  };

  // Add page to list
  const addPage = () => {
    if (!selectedPageType) return;

    const pageTypeInfo = pageTypeOptions.find((p) => p.id === selectedPageType);
    if (!pageTypeInfo) return;

    // Get selected requirements with their checked subfields
    const selectedReqs = currentRequirements[selectedPageType]
      ?.filter((opt) => opt.checked)
      .map((opt) => ({
        label: opt.label,
        subFields: opt.subFields?.filter((sf) => sf.checked).map((sf) => sf.label) || [],
      })) || [];

    const selectedFeatures = currentEssentialFeatures
      .filter((opt) => opt.checked)
      .map((opt) => opt.label);

    const newPage: AddedPage = {
      id: Date.now().toString(),
      pageType: selectedPageType,
      pageTypeLabel: pageTypeInfo.label,
      pageTypeIcon: pageTypeInfo.icon,
      requirements: selectedReqs,
      essentialFeatures: selectedFeatures,
    };

    setAddedPages((prev) => [...prev, newPage]);

    // Reset current page builder
    setSelectedPageType("");
    setSelectedLevel(null);
    setExpandedRequirements({});
    setCurrentRequirements((prev) => {
      const reset: Record<string, CheckboxOption[]> = {};
      Object.keys(prev).forEach((key) => {
        reset[key] = prev[key].map((opt) => ({
          ...opt,
          checked: false,
          subFields: opt.subFields?.map((sf) => ({ ...sf, checked: false })),
        }));
      });
      return reset;
    });
    setCurrentEssentialFeatures(essentialFeatures.map((opt) => ({ ...opt })));
    setEssentialFeaturesOpen(false);
  };

  // Remove page from list
  const removePage = (id: string) => {
    setAddedPages((prev) => prev.filter((page) => page.id !== id));
  };

  // Generate the prompt
  const generatePrompt = () => {
    if (addedPages.length === 0) return;

    let prompt = `# Multi-Page Website Design Request\n\n`;

    // Project Description
    if (projectDescription.trim()) {
      prompt += `## Project Description\n`;
      prompt += `${projectDescription}\n\n`;
    }

    // Theme Reference
    if (themeReferenceUrl.trim()) {
      prompt += `## Theme Reference URL\n`;
      prompt += `${themeReferenceUrl}\n\n`;
    }

    prompt += `## Pages Required (${addedPages.length} pages)\n\n`;

    // List all pages
    addedPages.forEach((page, index) => {
      prompt += `### ${index + 1}. ${page.pageTypeIcon} ${page.pageTypeLabel}\n\n`;

      if (page.requirements.length > 0) {
        prompt += `**Page Requirements:**\n`;
        page.requirements.forEach((req) => {
          prompt += `- ${req.label}\n`;
          if (req.subFields && req.subFields.length > 0) {
            req.subFields.forEach((sf) => {
              prompt += `  - ${sf}\n`;
            });
          }
        });
        prompt += `\n`;
      }

      if (page.essentialFeatures.length > 0) {
        prompt += `**Essential Features:**\n`;
        page.essentialFeatures.forEach((feature) => {
          prompt += `- ${feature}\n`;
        });
        prompt += `\n`;
      }

      prompt += `---\n\n`;
    });

    // Footer instructions
    prompt += `## Implementation Guidelines\n\n`;
    prompt += `Please create a complete, production-ready implementation with:\n`;
    prompt += `1. Clean, well-organized component structure\n`;
    prompt += `2. Shared layout and navigation between pages\n`;
    prompt += `3. Consistent design system across all pages\n`;
    prompt += `4. Proper state management\n`;
    prompt += `5. Responsive design for all screen sizes\n`;
    prompt += `6. Accessibility best practices\n`;
    prompt += `7. Smooth animations and transitions\n`;
    prompt += `8. Proper routing and navigation\n`;

    setGeneratedPrompt(prompt);
  };

  // Clear all
  const clearAll = () => {
    setAddedPages([]);
    setSelectedPageType("");
    setSelectedLevel(null);
    setExpandedRequirements({});
    setCurrentRequirements(() => {
      const reset: Record<string, CheckboxOption[]> = {};
      Object.keys(pageRequirements).forEach((key) => {
        reset[key] = pageRequirements[key].map((opt) => ({
          ...opt,
          subFields: opt.subFields?.map((sf) => ({ ...sf, checked: false })),
        }));
      });
      return reset;
    });
    setCurrentEssentialFeatures(essentialFeatures.map((opt) => ({ ...opt })));
    setEssentialFeaturesOpen(false);
    setProjectDescription("");
    setThemeReferenceUrl("");
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

      {/* Gradient orbs */}
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
              <h1 className="text-2xl font-bold text-gray-800">Sumo Studio</h1>
              <p className="text-xs text-gray-500 tracking-tight">Build your app with Sumo</p>
            </div>
          </div>

          <nav className="flex items-center gap-2">
            <Link href="/terminal" className="px-4 py-2 text-gray-700 font-medium rounded-lg hover:bg-yellow-100 hover:text-yellow-700 transition-all">
              Terminal
            </Link>
            <Link href="/frontend-studio" className="px-4 py-2 text-gray-700 font-medium rounded-lg hover:bg-orange-100 hover:text-orange-700 transition-all">
              Frontend Studio
            </Link>
            <Link href="/backend-studio" className="px-4 py-2 text-gray-700 font-medium rounded-lg hover:bg-pink-100 hover:text-pink-700 transition-all">
              Backend Studio
            </Link>
            <Link href="/module-studio" className="px-4 py-2 bg-purple-100 text-purple-700 font-medium rounded-lg transition-all">
              Module Studio
            </Link>
          </nav>
        </div>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Page Builder */}
          <div className="space-y-6">
            {/* Project Info */}
            <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-2xl p-6 border border-white/30">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-2xl">🌐</span>
                Project Info
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Project Description
                  </label>
                  <textarea
                    value={projectDescription}
                    onChange={(e) => setProjectDescription(e.target.value)}
                    placeholder="Describe your website project..."
                    rows={2}
                    className="w-full px-4 py-3 bg-white/50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-400 focus:border-teal-400 outline-none transition-all resize-none hover:border-teal-300"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Theme Reference URL
                  </label>
                  <input
                    type="url"
                    value={themeReferenceUrl}
                    onChange={(e) => setThemeReferenceUrl(e.target.value)}
                    placeholder="Paste theme reference URL here"
                    className="w-full px-4 py-3 bg-white/50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-400 focus:border-teal-400 outline-none transition-all hover:border-teal-300"
                  />
                </div>
              </div>
            </div>

            {/* Add Page Section */}
            <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-2xl p-6 border border-white/30">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-2xl">➕</span>
                Add Page
              </h2>

              {/* Select Page Type */}
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Select Page Type
                </label>
                <select
                  value={selectedPageType}
                  onChange={(e) => {
                    setSelectedPageType(e.target.value);
                    setSelectedLevel(null);
                  }}
                  className="w-full px-4 py-3 bg-white/50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-400 focus:border-teal-400 outline-none transition-all hover:border-teal-300 text-gray-700 cursor-pointer"
                >
                  <option value="">Choose a page type...</option>
                  {pageTypeOptions.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.icon} {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Level Selection Buttons */}
              {selectedPageType && (
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Select Level
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    <button
                      type="button"
                      onClick={() => handleLevelSelect("basic")}
                      className={`py-3 px-4 rounded-xl font-semibold transition-all duration-300 border-2 ${
                        selectedLevel === "basic"
                          ? "bg-gradient-to-r from-blue-400 to-blue-500 text-white border-blue-500 shadow-lg scale-[1.02]"
                          : "bg-white/70 text-gray-700 border-gray-200 hover:border-blue-300 hover:bg-blue-50"
                      }`}
                    >
                      <div className="text-lg mb-1">🌱</div>
                      <div className="text-sm">Basic</div>
                      <div className="text-xs opacity-70 mt-1">Essential only</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleLevelSelect("moderate")}
                      className={`py-3 px-4 rounded-xl font-semibold transition-all duration-300 border-2 ${
                        selectedLevel === "moderate"
                          ? "bg-gradient-to-r from-orange-400 to-orange-500 text-white border-orange-500 shadow-lg scale-[1.02]"
                          : "bg-white/70 text-gray-700 border-gray-200 hover:border-orange-300 hover:bg-orange-50"
                      }`}
                    >
                      <div className="text-lg mb-1">🚀</div>
                      <div className="text-sm">Moderate</div>
                      <div className="text-xs opacity-70 mt-1">Balanced features</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleLevelSelect("pro")}
                      className={`py-3 px-4 rounded-xl font-semibold transition-all duration-300 border-2 ${
                        selectedLevel === "pro"
                          ? "bg-gradient-to-r from-purple-400 to-purple-500 text-white border-purple-500 shadow-lg scale-[1.02]"
                          : "bg-white/70 text-gray-700 border-gray-200 hover:border-purple-300 hover:bg-purple-50"
                      }`}
                    >
                      <div className="text-lg mb-1">💎</div>
                      <div className="text-sm">Pro</div>
                      <div className="text-xs opacity-70 mt-1">All features</div>
                    </button>
                  </div>
                </div>
              )}

              {/* Page-specific Requirements */}
              {selectedPageType && selectedLevel && currentRequirements[selectedPageType] && (
                <div className="mb-4 p-4 bg-gradient-to-r from-teal-50 to-green-50 rounded-xl border-2 border-teal-200">
                  <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    <span className="text-lg">{pageTypeOptions.find(p => p.id === selectedPageType)?.icon}</span>
                    {pageTypeOptions.find(p => p.id === selectedPageType)?.label} Requirements
                  </label>
                  <div className="space-y-2">
                    {currentRequirements[selectedPageType].map((option) => (
                      <div key={option.id} className="space-y-1">
                        {/* Main requirement checkbox */}
                        <div
                          className={`flex items-center gap-2 p-2 rounded-lg transition-all duration-200 border ${
                            option.checked
                              ? "bg-gradient-to-r from-teal-100 to-green-100 border-teal-400"
                              : "bg-white/70 border-gray-200 hover:border-teal-300"
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={option.checked}
                            onChange={() => handlePageRequirementChange(selectedPageType, option.id)}
                            className="w-4 h-4 text-teal-500 border-gray-300 rounded focus:ring-teal-400 accent-teal-500 cursor-pointer"
                          />
                          <span className="text-sm">{option.icon}</span>
                          <span className="text-gray-700 text-xs font-medium flex-1">{option.label}</span>
                          {option.checked && option.subFields && option.subFields.length > 0 && (
                            <button
                              type="button"
                              onClick={() => toggleRequirementExpand(option.id)}
                              className="p-1 hover:bg-teal-200 rounded-md transition-colors"
                            >
                              <svg
                                className={`w-4 h-4 text-teal-600 transition-transform duration-200 ${expandedRequirements[option.id] ? "rotate-180" : ""}`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                            </button>
                          )}
                        </div>

                        {/* Subfields - shown when requirement is checked and expanded */}
                        {option.checked && option.subFields && option.subFields.length > 0 && expandedRequirements[option.id] && (
                          <div className="ml-6 pl-4 border-l-2 border-teal-300 space-y-1">
                            {option.subFields.map((subField) => (
                              <label
                                key={subField.id}
                                className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-all duration-200 text-xs ${
                                  subField.checked
                                    ? "bg-teal-100 text-teal-800"
                                    : "bg-white/50 hover:bg-teal-50 text-gray-600"
                                }`}
                              >
                                <input
                                  type="checkbox"
                                  checked={subField.checked}
                                  onChange={() => handleSubFieldChange(selectedPageType, option.id, subField.id)}
                                  className="w-3 h-3 text-teal-500 border-gray-300 rounded focus:ring-teal-400 accent-teal-500"
                                />
                                <span className="font-medium">{subField.label}</span>
                              </label>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Essential Features Dropdown */}
              {selectedPageType && selectedLevel && (
                <div className="mb-4 relative">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Essential Features
                  </label>
                  <button
                    type="button"
                    onClick={() => setEssentialFeaturesOpen(!essentialFeaturesOpen)}
                    className="w-full px-4 py-3 bg-white/50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-400 focus:border-teal-400 outline-none transition-all hover:border-teal-300 text-gray-700 cursor-pointer flex items-center justify-between"
                  >
                    <span className="text-gray-700">
                      {currentEssentialFeatures.filter(f => f.checked).length > 0
                        ? `${currentEssentialFeatures.filter(f => f.checked).length} feature(s) selected`
                        : "Select features..."}
                    </span>
                    <svg
                      className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${essentialFeaturesOpen ? "rotate-180" : ""}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {essentialFeaturesOpen && (
                    <div className="absolute z-50 w-full mt-2 bg-white rounded-xl border-2 border-teal-200 shadow-2xl max-h-60 overflow-y-auto">
                      <div className="p-2">
                        {currentEssentialFeatures.map((option) => (
                          <label
                            key={option.id}
                            className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-all duration-200 ${
                              option.checked ? "bg-gradient-to-r from-teal-100 to-green-100" : "hover:bg-gray-50"
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={option.checked}
                              onChange={() => handleEssentialFeatureChange(option.id)}
                              className="w-4 h-4 text-teal-500 border-gray-300 rounded focus:ring-teal-400 accent-teal-500"
                            />
                            <span className="text-sm">{option.icon}</span>
                            <span className="text-gray-700 text-xs font-medium">{option.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}

                  {currentEssentialFeatures.filter(f => f.checked).length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {currentEssentialFeatures.filter(f => f.checked).map((feature) => (
                        <span
                          key={feature.id}
                          className="inline-flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-teal-100 to-green-100 text-teal-700 rounded-full text-xs font-medium border border-teal-200"
                        >
                          {feature.icon} {feature.label}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Add Page Button */}
              <button
                onClick={addPage}
                disabled={!selectedPageType || !selectedLevel}
                className={`w-full py-3 px-6 rounded-xl font-bold transition-all duration-300 ${
                  selectedPageType && selectedLevel
                    ? "bg-gradient-to-r from-purple-400 to-indigo-500 hover:from-purple-500 hover:to-indigo-600 text-white shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
              >
                ➕ Add Page to List
              </button>
            </div>

            {/* Added Pages List */}
            {addedPages.length > 0 && (
              <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-2xl p-6 border border-white/30">
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <span className="text-2xl">📋</span>
                  Added Pages ({addedPages.length})
                </h2>

                <div className="space-y-3 max-h-80 overflow-y-auto">
                  {addedPages.map((page, index) => (
                    <div
                      key={page.id}
                      className="p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl border-2 border-purple-200"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-bold text-purple-600">#{index + 1}</span>
                          <span className="text-xl">{page.pageTypeIcon}</span>
                          <span className="font-semibold text-gray-800">{page.pageTypeLabel}</span>
                        </div>
                        <button
                          onClick={() => removePage(page.id)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-100 p-1 rounded-lg transition-all"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>

                      {page.requirements.length > 0 && (
                        <div className="space-y-1 mb-2">
                          {page.requirements.map((req, i) => (
                            <div key={i}>
                              <span className="text-xs bg-white/80 text-purple-700 px-2 py-1 rounded-full border border-purple-200 inline-block">
                                {req.label}
                              </span>
                              {req.subFields && req.subFields.length > 0 && (
                                <div className="ml-4 mt-1 flex flex-wrap gap-1">
                                  {req.subFields.map((sf, j) => (
                                    <span key={j} className="text-xs bg-purple-50 text-purple-600 px-2 py-0.5 rounded border border-purple-100">
                                      {sf}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}

                      {page.essentialFeatures.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {page.essentialFeatures.map((feature, i) => (
                            <span key={i} className="text-xs bg-teal-100 text-teal-700 px-2 py-1 rounded-full border border-teal-200">
                              {feature}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 mt-4 pt-4 border-t border-gray-200">
                  <button
                    onClick={generatePrompt}
                    className="flex-1 bg-gradient-to-r from-teal-400 via-green-400 to-emerald-400 hover:from-teal-500 hover:via-green-500 hover:to-emerald-500 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Generate Prompt
                  </button>
                  <button
                    onClick={clearAll}
                    className="px-6 py-3 bg-white/70 border-2 border-gray-300 text-gray-600 hover:bg-gray-100 hover:border-gray-400 rounded-xl transition-all font-semibold"
                  >
                    Clear All
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Output */}
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
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      Copy
                    </>
                  )}
                </button>
              )}
            </div>

            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-5 min-h-[600px] max-h-[calc(100vh-200px)] overflow-y-auto border border-gray-700 shadow-inner">
              {generatedPrompt ? (
                <pre className="whitespace-pre-wrap text-green-400 font-mono text-sm leading-relaxed">
                  {generatedPrompt}
                </pre>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-gray-500 mt-32">
                  <span className="text-6xl mb-4 opacity-50">🌐</span>
                  <p className="text-center">
                    Add pages to your project and click<br />
                    <span className="text-teal-400 font-semibold">&quot;Generate Prompt&quot;</span><br />
                    to create your multi-page website prompt
                  </p>
                  <p className="text-xs text-gray-600 mt-4 text-center">
                    Build complete websites with<br />
                    Landing, Admin, Dashboard, and more pages
                  </p>
                </div>
              )}
            </div>

            {generatedPrompt && (
              <div className="mt-4 p-4 bg-gradient-to-r from-teal-50 to-green-50 rounded-xl border border-teal-200">
                <p className="text-sm text-teal-800 flex items-start gap-2">
                  <span className="text-lg">💡</span>
                  <span>
                    <strong>Tip:</strong> Your prompt includes {addedPages.length} page(s). Add more pages to create a comprehensive website specification.
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
