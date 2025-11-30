"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";

// Types
type SubField = {
  id: string;
  label: string;
  checked: boolean;
  required: boolean;
};

type Requirement = {
  id: string;
  label: string;
  checked: boolean;
  icon: string;
  subFields: SubField[];
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
  { icon: "📝", top: "10%", left: "5%", delay: "0s", duration: "7s" },
  { icon: "📋", top: "20%", right: "8%", delay: "1s", duration: "6s" },
  { icon: "🎯", top: "60%", left: "3%", delay: "2s", duration: "8s" },
  { icon: "⚡", bottom: "20%", right: "5%", delay: "0.5s", duration: "7s" },
  { icon: "🔧", top: "40%", right: "3%", delay: "1.5s", duration: "5s" },
  { icon: "📈", bottom: "30%", left: "8%", delay: "3s", duration: "6s" },
];

// All page types info
const pageTypesInfo: Record<string, { label: string; icon: string }> = {
  "accounts-page": { label: "Accounts Page", icon: "💰" },
  "admin-page": { label: "Admin Page", icon: "⚙️" },
  "blog-page": { label: "Blog Page", icon: "📝" },
  "contact-page": { label: "Contact Page", icon: "📞" },
  "customer-page": { label: "Customer Page", icon: "👥" },
  "dashboard-page": { label: "Dashboard Page", icon: "📊" },
  "e-commerce-page": { label: "E-Commerce Page", icon: "🛒" },
  "employee-page": { label: "Employee Page", icon: "👔" },
  "error-page": { label: "Error Page", icon: "❌" },
  "form-page": { label: "Form Page", icon: "📋" },
  "gallery-page": { label: "Gallery Page", icon: "🖼️" },
  "inventory-page": { label: "Inventory Page", icon: "📦" },
  "landing-page": { label: "Landing Page", icon: "🏠" },
  "login-page": { label: "Login Page", icon: "🔐" },
  "portfolio-page": { label: "Portfolio Page", icon: "💼" },
  "reports-dashboard": { label: "Reports Dashboard", icon: "📈" },
  "service-page": { label: "Service Page", icon: "🛠️" },
  "settings-page": { label: "Settings Page", icon: "🔧" },
};

// Page requirements data
const pageRequirements: Record<string, Requirement[]> = {
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
    { id: "invoice-list", label: "4. Invoice List", checked: false, icon: "📄", subFields: [
      { id: "il-invoice-number", label: "4.1 Invoice Number", checked: false },
      { id: "il-date", label: "4.2 Date", checked: false },
      { id: "il-amount", label: "4.3 Amount", checked: false },
      { id: "il-status", label: "4.4 Status", checked: false },
      { id: "il-download", label: "4.5 Download PDF", checked: false },
    ]},
    { id: "payment-history", label: "5. Payment History", checked: false, icon: "💳", subFields: [
      { id: "ph-transaction-id", label: "5.1 Transaction ID", checked: false },
      { id: "ph-date", label: "5.2 Date", checked: false },
      { id: "ph-amount", label: "5.3 Amount", checked: false },
      { id: "ph-method", label: "5.4 Payment Method", checked: false },
      { id: "ph-status", label: "5.5 Status", checked: false },
    ]},
  ],
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
    { id: "audit-logs", label: "4. Audit Logs", checked: false, icon: "📋", subFields: [
      { id: "al-timestamp", label: "4.1 Timestamp", checked: false },
      { id: "al-user", label: "4.2 User", checked: false },
      { id: "al-action", label: "4.3 Action", checked: false },
      { id: "al-ip-address", label: "4.4 IP Address", checked: false },
    ]},
    { id: "analytics-dashboard", label: "5. Analytics Dashboard", checked: false, icon: "📊", subFields: [
      { id: "ad-total-users", label: "5.1 Total Users", checked: false },
      { id: "ad-active-sessions", label: "5.2 Active Sessions", checked: false },
      { id: "ad-page-views", label: "5.3 Page Views", checked: false },
      { id: "ad-growth-chart", label: "5.4 Growth Chart", checked: false },
    ]},
  ],
  "blog-page": [
    { id: "blog-list", label: "1. Blog List", checked: false, icon: "📝", subFields: [
      { id: "bl-title", label: "1.1 Title", checked: false },
      { id: "bl-excerpt", label: "1.2 Excerpt", checked: false },
      { id: "bl-featured-image", label: "1.3 Featured Image", checked: false },
      { id: "bl-author", label: "1.4 Author", checked: false },
      { id: "bl-date", label: "1.5 Publish Date", checked: false },
      { id: "bl-category", label: "1.6 Category", checked: false },
    ]},
    { id: "blog-detail", label: "2. Blog Detail", checked: false, icon: "📄", subFields: [
      { id: "bd-full-content", label: "2.1 Full Content", checked: false },
      { id: "bd-author-bio", label: "2.2 Author Bio", checked: false },
      { id: "bd-related-posts", label: "2.3 Related Posts", checked: false },
      { id: "bd-social-share", label: "2.4 Social Share Buttons", checked: false },
    ]},
    { id: "comments", label: "3. Comments Section", checked: false, icon: "💬", subFields: [
      { id: "cs-comment-list", label: "3.1 Comment List", checked: false },
      { id: "cs-add-comment", label: "3.2 Add Comment", checked: false },
      { id: "cs-reply", label: "3.3 Reply to Comment", checked: false },
      { id: "cs-like", label: "3.4 Like/Dislike", checked: false },
    ]},
    { id: "categories", label: "4. Categories & Tags", checked: false, icon: "🏷️", subFields: [
      { id: "ct-category-list", label: "4.1 Category List", checked: false },
      { id: "ct-tag-cloud", label: "4.2 Tag Cloud", checked: false },
      { id: "ct-filter", label: "4.3 Filter by Category", checked: false },
    ]},
    { id: "search", label: "5. Search", checked: false, icon: "🔍", subFields: [
      { id: "sr-search-bar", label: "5.1 Search Bar", checked: false },
      { id: "sr-search-results", label: "5.2 Search Results", checked: false },
      { id: "sr-suggestions", label: "5.3 Auto Suggestions", checked: false },
    ]},
  ],
  "contact-page": [
    { id: "contact-form", label: "1. Contact Form", checked: false, icon: "📝", subFields: [
      { id: "cf-name", label: "1.1 Name", checked: false },
      { id: "cf-email", label: "1.2 Email", checked: false },
      { id: "cf-phone", label: "1.3 Phone", checked: false },
      { id: "cf-subject", label: "1.4 Subject", checked: false },
      { id: "cf-message", label: "1.5 Message", checked: false },
      { id: "cf-submit", label: "1.6 Submit Button", checked: false },
    ]},
    { id: "contact-info", label: "2. Contact Information", checked: false, icon: "📞", subFields: [
      { id: "ci-address", label: "2.1 Address", checked: false },
      { id: "ci-phone", label: "2.2 Phone Number", checked: false },
      { id: "ci-email", label: "2.3 Email", checked: false },
      { id: "ci-hours", label: "2.4 Business Hours", checked: false },
    ]},
    { id: "map", label: "3. Map Integration", checked: false, icon: "🗺️", subFields: [
      { id: "mp-google-map", label: "3.1 Google Map", checked: false },
      { id: "mp-directions", label: "3.2 Directions Link", checked: false },
    ]},
    { id: "social-links", label: "4. Social Links", checked: false, icon: "🔗", subFields: [
      { id: "sl-facebook", label: "4.1 Facebook", checked: false },
      { id: "sl-twitter", label: "4.2 Twitter", checked: false },
      { id: "sl-linkedin", label: "4.3 LinkedIn", checked: false },
      { id: "sl-instagram", label: "4.4 Instagram", checked: false },
    ]},
  ],
  "customer-page": [
    { id: "add-customer", label: "1. Add Customer", checked: false, icon: "➕", subFields: [
      { id: "ac-name", label: "1.1 Customer Name", checked: false },
      { id: "ac-email", label: "1.2 Email", checked: false },
      { id: "ac-phone", label: "1.3 Phone", checked: false },
      { id: "ac-address", label: "1.4 Address", checked: false },
      { id: "ac-company", label: "1.5 Company", checked: false },
    ]},
    { id: "customer-list", label: "2. Customer List", checked: false, icon: "👥", subFields: [
      { id: "cl-table", label: "2.1 Data Table", checked: false },
      { id: "cl-search", label: "2.2 Search", checked: false },
      { id: "cl-filter", label: "2.3 Filters", checked: false },
      { id: "cl-actions", label: "2.4 Actions (Edit/Delete)", checked: false },
    ]},
    { id: "customer-profile", label: "3. Customer Profile", checked: false, icon: "👤", subFields: [
      { id: "cp-info", label: "3.1 Basic Info", checked: false },
      { id: "cp-orders", label: "3.2 Order History", checked: false },
      { id: "cp-notes", label: "3.3 Notes", checked: false },
    ]},
    { id: "customer-analytics", label: "4. Customer Analytics", checked: false, icon: "📊", subFields: [
      { id: "ca-total", label: "4.1 Total Customers", checked: false },
      { id: "ca-new", label: "4.2 New This Month", checked: false },
      { id: "ca-growth", label: "4.3 Growth Chart", checked: false },
    ]},
  ],
  "dashboard-page": [
    { id: "stats-cards", label: "1. Statistics Cards", checked: false, icon: "📊", subFields: [
      { id: "sc-total-sales", label: "1.1 Total Sales", checked: false },
      { id: "sc-total-orders", label: "1.2 Total Orders", checked: false },
      { id: "sc-total-customers", label: "1.3 Total Customers", checked: false },
      { id: "sc-revenue", label: "1.4 Revenue", checked: false },
    ]},
    { id: "charts", label: "2. Charts", checked: false, icon: "📈", subFields: [
      { id: "ch-line-chart", label: "2.1 Line Chart", checked: false },
      { id: "ch-bar-chart", label: "2.2 Bar Chart", checked: false },
      { id: "ch-pie-chart", label: "2.3 Pie Chart", checked: false },
      { id: "ch-area-chart", label: "2.4 Area Chart", checked: false },
    ]},
    { id: "recent-activity", label: "3. Recent Activity", checked: false, icon: "🕐", subFields: [
      { id: "ra-orders", label: "3.1 Recent Orders", checked: false },
      { id: "ra-users", label: "3.2 Recent Users", checked: false },
      { id: "ra-notifications", label: "3.3 Notifications", checked: false },
    ]},
    { id: "quick-actions", label: "4. Quick Actions", checked: false, icon: "⚡", subFields: [
      { id: "qa-add-product", label: "4.1 Add Product", checked: false },
      { id: "qa-add-order", label: "4.2 Add Order", checked: false },
      { id: "qa-generate-report", label: "4.3 Generate Report", checked: false },
    ]},
  ],
  "e-commerce-page": [
    { id: "product-listing", label: "1. Product Listing", checked: false, icon: "🛍️", subFields: [
      { id: "pl-grid-view", label: "1.1 Grid View", checked: false },
      { id: "pl-list-view", label: "1.2 List View", checked: false },
      { id: "pl-filters", label: "1.3 Filters", checked: false },
      { id: "pl-sorting", label: "1.4 Sorting", checked: false },
      { id: "pl-pagination", label: "1.5 Pagination", checked: false },
    ]},
    { id: "product-detail", label: "2. Product Detail", checked: false, icon: "📦", subFields: [
      { id: "pd-images", label: "2.1 Image Gallery", checked: false },
      { id: "pd-description", label: "2.2 Description", checked: false },
      { id: "pd-price", label: "2.3 Price", checked: false },
      { id: "pd-variants", label: "2.4 Variants", checked: false },
      { id: "pd-add-to-cart", label: "2.5 Add to Cart", checked: false },
    ]},
    { id: "shopping-cart", label: "3. Shopping Cart", checked: false, icon: "🛒", subFields: [
      { id: "sc-items", label: "3.1 Cart Items", checked: false },
      { id: "sc-quantity", label: "3.2 Quantity Update", checked: false },
      { id: "sc-subtotal", label: "3.3 Subtotal", checked: false },
      { id: "sc-checkout", label: "3.4 Checkout Button", checked: false },
    ]},
    { id: "checkout", label: "4. Checkout", checked: false, icon: "💳", subFields: [
      { id: "co-shipping", label: "4.1 Shipping Info", checked: false },
      { id: "co-payment", label: "4.2 Payment Method", checked: false },
      { id: "co-review", label: "4.3 Order Review", checked: false },
      { id: "co-confirm", label: "4.4 Confirm Order", checked: false },
    ]},
    { id: "orders", label: "5. Order Management", checked: false, icon: "📋", subFields: [
      { id: "om-order-list", label: "5.1 Order List", checked: false },
      { id: "om-order-detail", label: "5.2 Order Detail", checked: false },
      { id: "om-tracking", label: "5.3 Order Tracking", checked: false },
    ]},
  ],
  "employee-page": [
    { id: "add-employee", label: "1. Add Employee", checked: false, icon: "➕", subFields: [
      { id: "ae-name", label: "1.1 Employee Name", checked: false, required: false },
      { id: "ae-email", label: "1.2 Email", checked: false, required: false },
      { id: "ae-phone", label: "1.3 Mobile Number", checked: false, required: false },
      { id: "ae-address", label: "1.4 Address", checked: false, required: false },
      { id: "ae-department", label: "1.5 Department", checked: false, required: false },
      { id: "ae-designation", label: "1.6 Designation", checked: false, required: false },
      { id: "ae-join-date", label: "1.7 Join Date", checked: false, required: false },
      { id: "ae-salary", label: "1.8 Salary", checked: false, required: false },
      { id: "ae-photo", label: "1.9 Photo Upload", checked: false, required: false },
    ]},
    { id: "employee-list", label: "2. Employee List", checked: false, icon: "👥", subFields: [
      { id: "el-all-data", label: "2.1 Show All Data from Add Employee", checked: false, required: false },
      { id: "el-crud", label: "2.2 CRUD Actions (Create/Read/Update/Delete)", checked: false, required: false },
      { id: "el-status", label: "2.3 Employee Status (Active/Inactive)", checked: false, required: false },
    ]},
    { id: "employee-profile", label: "3. Employee Profile", checked: false, icon: "👤", subFields: [
      { id: "ep-photo", label: "3.1 Profile Photo", checked: false, required: false },
      { id: "ep-personal-info", label: "3.2 Personal Information", checked: false, required: false },
      { id: "ep-contact-info", label: "3.3 Contact Information", checked: false, required: false },
      { id: "ep-job-details", label: "3.4 Job Details", checked: false, required: false },
      { id: "ep-emergency-contact", label: "3.5 Emergency Contact", checked: false, required: false },
    ]},
    { id: "attendance-tracker", label: "4. Attendance Tracker", checked: false, icon: "📅", subFields: [
      { id: "at-date", label: "4.1 Date", checked: false, required: false },
      { id: "at-check-in", label: "4.2 Check In Time", checked: false, required: false },
      { id: "at-check-out", label: "4.3 Check Out Time", checked: false, required: false },
      { id: "at-status", label: "4.4 Status (Present/Absent)", checked: false, required: false },
      { id: "at-working-hours", label: "4.5 Working Hours", checked: false, required: false },
    ]},
    { id: "leave-management", label: "5. Leave Management", checked: false, icon: "🏖️", subFields: [
      { id: "lm-leave-type", label: "5.1 Leave Type", checked: false, required: false },
      { id: "lm-from-date", label: "5.2 From Date", checked: false, required: false },
      { id: "lm-to-date", label: "5.3 To Date", checked: false, required: false },
      { id: "lm-reason", label: "5.4 Reason", checked: false, required: false },
      { id: "lm-status", label: "5.5 Status", checked: false, required: false },
      { id: "lm-balance", label: "5.6 Leave Balance", checked: false, required: false },
    ]},
    { id: "payroll-info", label: "6. Payroll Information", checked: false, icon: "💰", subFields: [
      { id: "pi-basic-salary", label: "6.1 Basic Salary", checked: false, required: false },
      { id: "pi-allowances", label: "6.2 Allowances", checked: false, required: false },
      { id: "pi-deductions", label: "6.3 Deductions", checked: false, required: false },
      { id: "pi-net-salary", label: "6.4 Net Salary", checked: false, required: false },
      { id: "pi-bank-details", label: "6.5 Bank Details", checked: false, required: false },
    ]},
    { id: "performance-review", label: "7. Performance Review", checked: false, icon: "📊", subFields: [
      { id: "pr-review-period", label: "7.1 Review Period", checked: false, required: false },
      { id: "pr-goals", label: "7.2 Goals", checked: false, required: false },
      { id: "pr-achievements", label: "7.3 Achievements", checked: false, required: false },
      { id: "pr-rating", label: "7.4 Rating", checked: false, required: false },
      { id: "pr-feedback", label: "7.5 Feedback", checked: false, required: false },
    ]},
    { id: "document-management", label: "8. Document Management", checked: false, icon: "📁", subFields: [
      { id: "dm-doc-type", label: "8.1 Document Type", checked: false, required: false },
      { id: "dm-file-name", label: "8.2 File Name", checked: false, required: false },
      { id: "dm-upload-date", label: "8.3 Upload Date", checked: false, required: false },
      { id: "dm-download", label: "8.4 Download Button", checked: false, required: false },
    ]},
    { id: "org-chart", label: "9. Organization Chart", checked: false, icon: "🏢", subFields: [
      { id: "oc-hierarchy", label: "9.1 Hierarchy View", checked: false, required: false },
      { id: "oc-department-filter", label: "9.2 Department Filter", checked: false, required: false },
      { id: "oc-employee-card", label: "9.3 Employee Card", checked: false, required: false },
    ]},
  ],
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
    { id: "back-home", label: "4. Navigation", checked: false, icon: "🏠", subFields: [
      { id: "bh-button", label: "4.1 Home Button", checked: false },
      { id: "bh-back", label: "4.2 Back Button", checked: false },
    ]},
  ],
  "form-page": [
    { id: "form-fields", label: "1. Form Fields", checked: false, icon: "📝", subFields: [
      { id: "ff-text", label: "1.1 Text Input", checked: false },
      { id: "ff-email", label: "1.2 Email Input", checked: false },
      { id: "ff-password", label: "1.3 Password Input", checked: false },
      { id: "ff-textarea", label: "1.4 Textarea", checked: false },
      { id: "ff-select", label: "1.5 Select Dropdown", checked: false },
      { id: "ff-checkbox", label: "1.6 Checkbox", checked: false },
      { id: "ff-radio", label: "1.7 Radio Button", checked: false },
      { id: "ff-date", label: "1.8 Date Picker", checked: false },
      { id: "ff-file", label: "1.9 File Upload", checked: false },
    ]},
    { id: "validation", label: "2. Validation", checked: false, icon: "✅", subFields: [
      { id: "vl-required", label: "2.1 Required Fields", checked: false },
      { id: "vl-email-format", label: "2.2 Email Format", checked: false },
      { id: "vl-min-max", label: "2.3 Min/Max Length", checked: false },
      { id: "vl-custom", label: "2.4 Custom Validation", checked: false },
    ]},
    { id: "form-actions", label: "3. Form Actions", checked: false, icon: "⚡", subFields: [
      { id: "fa-submit", label: "3.1 Submit Button", checked: false },
      { id: "fa-reset", label: "3.2 Reset Button", checked: false },
      { id: "fa-cancel", label: "3.3 Cancel Button", checked: false },
    ]},
  ],
  "gallery-page": [
    { id: "gallery-grid", label: "1. Gallery Grid", checked: false, icon: "🖼️", subFields: [
      { id: "gg-thumbnails", label: "1.1 Thumbnails", checked: false },
      { id: "gg-masonry", label: "1.2 Masonry Layout", checked: false },
      { id: "gg-hover-effect", label: "1.3 Hover Effects", checked: false },
    ]},
    { id: "lightbox", label: "2. Lightbox", checked: false, icon: "🔍", subFields: [
      { id: "lb-full-image", label: "2.1 Full Image View", checked: false },
      { id: "lb-navigation", label: "2.2 Navigation Arrows", checked: false },
      { id: "lb-captions", label: "2.3 Captions", checked: false },
    ]},
    { id: "categories", label: "3. Categories", checked: false, icon: "📁", subFields: [
      { id: "ct-filter", label: "3.1 Category Filter", checked: false },
      { id: "ct-tabs", label: "3.2 Category Tabs", checked: false },
    ]},
    { id: "upload", label: "4. Upload", checked: false, icon: "📤", subFields: [
      { id: "up-drag-drop", label: "4.1 Drag & Drop", checked: false },
      { id: "up-multi-select", label: "4.2 Multi-Select", checked: false },
      { id: "up-preview", label: "4.3 Preview", checked: false },
    ]},
  ],
  "inventory-page": [
    { id: "add-product", label: "1. Add Product", checked: false, icon: "➕", subFields: [
      { id: "ap-name", label: "1.1 Product Name", checked: false },
      { id: "ap-sku", label: "1.2 SKU", checked: false },
      { id: "ap-category", label: "1.3 Category", checked: false },
      { id: "ap-quantity", label: "1.4 Quantity", checked: false },
      { id: "ap-price", label: "1.5 Price", checked: false },
      { id: "ap-image", label: "1.6 Product Image", checked: false },
    ]},
    { id: "product-list", label: "2. Product List", checked: false, icon: "📦", subFields: [
      { id: "pl-table", label: "2.1 Data Table", checked: false },
      { id: "pl-search", label: "2.2 Search", checked: false },
      { id: "pl-filter", label: "2.3 Filters", checked: false },
      { id: "pl-actions", label: "2.4 Actions", checked: false },
    ]},
    { id: "stock-management", label: "3. Stock Management", checked: false, icon: "📊", subFields: [
      { id: "sm-low-stock", label: "3.1 Low Stock Alert", checked: false },
      { id: "sm-reorder", label: "3.2 Reorder Level", checked: false },
      { id: "sm-history", label: "3.3 Stock History", checked: false },
    ]},
    { id: "reports", label: "4. Reports", checked: false, icon: "📈", subFields: [
      { id: "rp-stock-report", label: "4.1 Stock Report", checked: false },
      { id: "rp-movement", label: "4.2 Movement Report", checked: false },
      { id: "rp-export", label: "4.3 Export Options", checked: false },
    ]},
  ],
  "landing-page": [
    { id: "hero-section", label: "1. Hero Section", checked: false, icon: "🎯", subFields: [
      { id: "hs-headline", label: "1.1 Headline", checked: false },
      { id: "hs-subheadline", label: "1.2 Subheadline", checked: false },
      { id: "hs-cta", label: "1.3 CTA Button", checked: false },
      { id: "hs-image", label: "1.4 Hero Image/Video", checked: false },
    ]},
    { id: "features", label: "2. Features Section", checked: false, icon: "✨", subFields: [
      { id: "fs-icons", label: "2.1 Feature Icons", checked: false },
      { id: "fs-titles", label: "2.2 Feature Titles", checked: false },
      { id: "fs-descriptions", label: "2.3 Feature Descriptions", checked: false },
    ]},
    { id: "testimonials", label: "3. Testimonials", checked: false, icon: "💬", subFields: [
      { id: "ts-quote", label: "3.1 Quote", checked: false },
      { id: "ts-author", label: "3.2 Author Name", checked: false },
      { id: "ts-photo", label: "3.3 Author Photo", checked: false },
      { id: "ts-company", label: "3.4 Company", checked: false },
    ]},
    { id: "pricing", label: "4. Pricing Section", checked: false, icon: "💰", subFields: [
      { id: "pr-plans", label: "4.1 Pricing Plans", checked: false },
      { id: "pr-features", label: "4.2 Plan Features", checked: false },
      { id: "pr-cta", label: "4.3 CTA Buttons", checked: false },
    ]},
    { id: "cta-section", label: "5. CTA Section", checked: false, icon: "📢", subFields: [
      { id: "ct-text", label: "5.1 CTA Text", checked: false },
      { id: "ct-button", label: "5.2 CTA Button", checked: false },
      { id: "ct-form", label: "5.3 Email Signup", checked: false },
    ]},
  ],
  "login-page": [
    { id: "login-form", label: "1. Login Form", checked: false, icon: "🔐", subFields: [
      { id: "lf-email", label: "1.1 Email/Username", checked: false },
      { id: "lf-password", label: "1.2 Password", checked: false },
      { id: "lf-remember", label: "1.3 Remember Me", checked: false },
      { id: "lf-submit", label: "1.4 Login Button", checked: false },
    ]},
    { id: "social-login", label: "2. Social Login", checked: false, icon: "🌐", subFields: [
      { id: "sl-google", label: "2.1 Google", checked: false },
      { id: "sl-facebook", label: "2.2 Facebook", checked: false },
      { id: "sl-github", label: "2.3 GitHub", checked: false },
    ]},
    { id: "forgot-password", label: "3. Forgot Password", checked: false, icon: "🔑", subFields: [
      { id: "fp-link", label: "3.1 Forgot Password Link", checked: false },
      { id: "fp-email", label: "3.2 Email Input", checked: false },
      { id: "fp-submit", label: "3.3 Reset Button", checked: false },
    ]},
    { id: "register-link", label: "4. Register Link", checked: false, icon: "📝", subFields: [
      { id: "rl-text", label: "4.1 Sign Up Text", checked: false },
      { id: "rl-link", label: "4.2 Register Link", checked: false },
    ]},
  ],
  "portfolio-page": [
    { id: "portfolio-grid", label: "1. Portfolio Grid", checked: false, icon: "🖼️", subFields: [
      { id: "pg-thumbnails", label: "1.1 Project Thumbnails", checked: false },
      { id: "pg-titles", label: "1.2 Project Titles", checked: false },
      { id: "pg-categories", label: "1.3 Categories", checked: false },
    ]},
    { id: "project-detail", label: "2. Project Detail", checked: false, icon: "📄", subFields: [
      { id: "pd-images", label: "2.1 Project Images", checked: false },
      { id: "pd-description", label: "2.2 Description", checked: false },
      { id: "pd-tech-stack", label: "2.3 Tech Stack", checked: false },
      { id: "pd-links", label: "2.4 Live/GitHub Links", checked: false },
    ]},
    { id: "filters", label: "3. Filters", checked: false, icon: "🔍", subFields: [
      { id: "fl-category", label: "3.1 Category Filter", checked: false },
      { id: "fl-tech", label: "3.2 Technology Filter", checked: false },
    ]},
    { id: "about", label: "4. About Section", checked: false, icon: "👤", subFields: [
      { id: "ab-bio", label: "4.1 Bio", checked: false },
      { id: "ab-skills", label: "4.2 Skills", checked: false },
      { id: "ab-experience", label: "4.3 Experience", checked: false },
    ]},
  ],
  "reports-dashboard": [
    { id: "report-filters", label: "1. Report Filters", checked: false, icon: "🔍", subFields: [
      { id: "rf-date-range", label: "1.1 Date Range", checked: false },
      { id: "rf-category", label: "1.2 Category", checked: false },
      { id: "rf-status", label: "1.3 Status", checked: false },
    ]},
    { id: "charts", label: "2. Charts & Graphs", checked: false, icon: "📊", subFields: [
      { id: "cg-line", label: "2.1 Line Chart", checked: false },
      { id: "cg-bar", label: "2.2 Bar Chart", checked: false },
      { id: "cg-pie", label: "2.3 Pie Chart", checked: false },
      { id: "cg-area", label: "2.4 Area Chart", checked: false },
    ]},
    { id: "data-tables", label: "3. Data Tables", checked: false, icon: "📋", subFields: [
      { id: "dt-sortable", label: "3.1 Sortable Columns", checked: false },
      { id: "dt-pagination", label: "3.2 Pagination", checked: false },
      { id: "dt-search", label: "3.3 Search", checked: false },
    ]},
    { id: "export", label: "4. Export Options", checked: false, icon: "📤", subFields: [
      { id: "ex-pdf", label: "4.1 Export PDF", checked: false },
      { id: "ex-csv", label: "4.2 Export CSV", checked: false },
      { id: "ex-excel", label: "4.3 Export Excel", checked: false },
    ]},
  ],
  "service-page": [
    { id: "services-list", label: "1. Services List", checked: false, icon: "🛠️", subFields: [
      { id: "sl-icons", label: "1.1 Service Icons", checked: false },
      { id: "sl-titles", label: "1.2 Service Titles", checked: false },
      { id: "sl-descriptions", label: "1.3 Descriptions", checked: false },
    ]},
    { id: "service-detail", label: "2. Service Detail", checked: false, icon: "📄", subFields: [
      { id: "sd-full-desc", label: "2.1 Full Description", checked: false },
      { id: "sd-features", label: "2.2 Features", checked: false },
      { id: "sd-pricing", label: "2.3 Pricing", checked: false },
    ]},
    { id: "process", label: "3. Process/How It Works", checked: false, icon: "📋", subFields: [
      { id: "pr-steps", label: "3.1 Steps", checked: false },
      { id: "pr-timeline", label: "3.2 Timeline", checked: false },
    ]},
    { id: "cta", label: "4. Call to Action", checked: false, icon: "📢", subFields: [
      { id: "ct-contact", label: "4.1 Contact Button", checked: false },
      { id: "ct-quote", label: "4.2 Get Quote", checked: false },
    ]},
  ],
  "settings-page": [
    { id: "profile-settings", label: "1. Profile Settings", checked: false, icon: "👤", subFields: [
      { id: "ps-name", label: "1.1 Name", checked: false },
      { id: "ps-email", label: "1.2 Email", checked: false },
      { id: "ps-avatar", label: "1.3 Avatar", checked: false },
      { id: "ps-bio", label: "1.4 Bio", checked: false },
    ]},
    { id: "security-settings", label: "2. Security Settings", checked: false, icon: "🔐", subFields: [
      { id: "ss-password", label: "2.1 Change Password", checked: false },
      { id: "ss-2fa", label: "2.2 Two-Factor Auth", checked: false },
      { id: "ss-sessions", label: "2.3 Active Sessions", checked: false },
    ]},
    { id: "notification-settings", label: "3. Notification Settings", checked: false, icon: "🔔", subFields: [
      { id: "ns-email", label: "3.1 Email Notifications", checked: false },
      { id: "ns-push", label: "3.2 Push Notifications", checked: false },
      { id: "ns-sms", label: "3.3 SMS Notifications", checked: false },
    ]},
    { id: "appearance", label: "4. Appearance", checked: false, icon: "🎨", subFields: [
      { id: "ap-theme", label: "4.1 Theme (Light/Dark)", checked: false },
      { id: "ap-language", label: "4.2 Language", checked: false },
      { id: "ap-timezone", label: "4.3 Timezone", checked: false },
    ]},
  ],
};

export default function PageTypeDetail() {
  const params = useParams();
  const pageType = params.pageType as string;
  const pageInfo = pageTypesInfo[pageType];
  const requirements = pageRequirements[pageType] || [];

  const [requirementsState, setRequirementsState] = useState<Requirement[]>(requirements);
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});
  const [copied, setCopied] = useState(false);

  // Layout section state (only for employee-page)
  const [layoutOptions, setLayoutOptions] = useState({
    sidebarNav: false,
    bottomNav: false,
  });

  // Master section state (only for employee-page)
  const [masterOptions, setMasterOptions] = useState({
    designationMaster: false,
    departmentMaster: false,
    employeeMaster: false,
    employeeLoginMaster: false,
  });

  // npm packages for all pages
  const pageNpmPackages: Record<string, { id: string; command: string }[]> = {
    "accounts-page": [
      { id: "acc-stripe", command: "npm install stripe @stripe/stripe-js" },
      { id: "acc-paypal", command: "npm install @paypal/react-paypal-js" },
      { id: "acc-invoice", command: "npm install jspdf html2canvas" },
    ],
    "admin-page": [
      { id: "admin-panel", command: "npm install react-admin" },
      { id: "admin-charts", command: "npm install recharts" },
      { id: "admin-table", command: "npm install @tanstack/react-table" },
    ],
    "blog-page": [
      { id: "blog-editor", command: "npm install @tiptap/react @tiptap/starter-kit" },
      { id: "blog-markdown", command: "npm install react-markdown remark-gfm" },
      { id: "blog-syntax", command: "npm install react-syntax-highlighter" },
    ],
    "contact-page": [
      { id: "contact-form", command: "npm install react-hook-form @hookform/resolvers zod" },
      { id: "contact-map", command: "npm install @react-google-maps/api" },
      { id: "contact-email", command: "npm install @emailjs/browser" },
    ],
    "customer-page": [
      { id: "cust-table", command: "npm install @tanstack/react-table" },
      { id: "cust-export", command: "npm install xlsx file-saver" },
      { id: "cust-search", command: "npm install fuse.js" },
    ],
    "dashboard-page": [
      { id: "dash-charts", command: "npm install recharts" },
      { id: "dash-grid", command: "npm install react-grid-layout" },
      { id: "dash-icons", command: "npm install lucide-react" },
    ],
    "e-commerce-page": [
      { id: "ecom-cart", command: "npm install @stripe/stripe-js" },
      { id: "ecom-state", command: "npm install zustand" },
      { id: "ecom-images", command: "npm install react-image-gallery swiper" },
    ],
    "employee-page": [
      { id: "emp-mgmt", command: "npm install @your-username/employee-management" },
      { id: "emp-calendar", command: "npm install @fullcalendar/react @fullcalendar/daygrid" },
      { id: "emp-export", command: "npm install xlsx file-saver" },
    ],
    "error-page": [
      { id: "err-animation", command: "npm install lottie-react" },
      { id: "err-icons", command: "npm install lucide-react" },
    ],
    "form-page": [
      { id: "form-hook", command: "npm install react-hook-form" },
      { id: "form-validation", command: "npm install zod @hookform/resolvers" },
      { id: "form-select", command: "npm install react-select" },
      { id: "form-datepicker", command: "npm install react-datepicker" },
    ],
    "gallery-page": [
      { id: "gallery-lightbox", command: "npm install yet-another-react-lightbox" },
      { id: "gallery-masonry", command: "npm install react-masonry-css" },
      { id: "gallery-dropzone", command: "npm install react-dropzone" },
    ],
    "inventory-page": [
      { id: "inv-table", command: "npm install @tanstack/react-table" },
      { id: "inv-barcode", command: "npm install react-barcode" },
      { id: "inv-export", command: "npm install xlsx file-saver jspdf" },
    ],
    "landing-page": [
      { id: "land-animation", command: "npm install framer-motion" },
      { id: "land-scroll", command: "npm install react-intersection-observer" },
      { id: "land-icons", command: "npm install lucide-react" },
    ],
    "login-page": [
      { id: "login-auth", command: "npm install next-auth" },
      { id: "login-form", command: "npm install react-hook-form zod @hookform/resolvers" },
      { id: "login-social", command: "npm install @auth/prisma-adapter" },
    ],
    "portfolio-page": [
      { id: "port-animation", command: "npm install framer-motion" },
      { id: "port-gallery", command: "npm install yet-another-react-lightbox" },
      { id: "port-icons", command: "npm install lucide-react react-icons" },
    ],
    "reports-dashboard": [
      { id: "report-charts", command: "npm install recharts" },
      { id: "report-pdf", command: "npm install jspdf jspdf-autotable" },
      { id: "report-excel", command: "npm install xlsx file-saver" },
      { id: "report-date", command: "npm install date-fns react-datepicker" },
    ],
    "service-page": [
      { id: "serv-animation", command: "npm install framer-motion" },
      { id: "serv-icons", command: "npm install lucide-react" },
      { id: "serv-accordion", command: "npm install @radix-ui/react-accordion" },
    ],
    "settings-page": [
      { id: "set-form", command: "npm install react-hook-form zod @hookform/resolvers" },
      { id: "set-toggle", command: "npm install @radix-ui/react-switch" },
      { id: "set-tabs", command: "npm install @radix-ui/react-tabs" },
      { id: "set-toast", command: "npm install sonner" },
    ],
  };

  const npmPackages = pageNpmPackages[pageType] || [];

  // Track copied state for each package
  const [copiedPackage, setCopiedPackage] = useState<string | null>(null);

  // Copy package command to clipboard
  const copyPackageCommand = async (packageId: string, command: string) => {
    try {
      await navigator.clipboard.writeText(command);
      setCopiedPackage(packageId);
      setTimeout(() => setCopiedPackage(null), 2000);
    } catch {
      const textArea = document.createElement("textarea");
      textArea.value = command;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopiedPackage(packageId);
      setTimeout(() => setCopiedPackage(null), 2000);
    }
  };

  // Toggle main requirement checkbox
  const toggleRequirement = (reqId: string) => {
    setRequirementsState(prev => prev.map(req => {
      if (req.id === reqId) {
        const newChecked = !req.checked;
        return {
          ...req,
          checked: newChecked,
          subFields: req.subFields.map(sf => ({ ...sf, checked: newChecked }))
        };
      }
      return req;
    }));
  };

  // Toggle subfield checkbox
  const toggleSubField = (reqId: string, subFieldId: string) => {
    setRequirementsState(prev => prev.map(req => {
      if (req.id === reqId) {
        const newSubFields = req.subFields.map(sf =>
          sf.id === subFieldId ? { ...sf, checked: !sf.checked } : sf
        );
        const allChecked = newSubFields.every(sf => sf.checked);
        return {
          ...req,
          checked: allChecked,
          subFields: newSubFields
        };
      }
      return req;
    }));
  };

  // Toggle subfield required status
  const toggleRequired = (reqId: string, subFieldId: string) => {
    setRequirementsState(prev => prev.map(req => {
      if (req.id === reqId) {
        const newSubFields = req.subFields.map(sf =>
          sf.id === subFieldId ? { ...sf, required: !sf.required } : sf
        );
        return {
          ...req,
          subFields: newSubFields
        };
      }
      return req;
    }));
  };

  // Toggle expand/collapse
  const toggleExpand = (reqId: string) => {
    setExpandedItems(prev => ({ ...prev, [reqId]: !prev[reqId] }));
  };

  // Generate prompt from selected requirements
  const generatePrompt = () => {
    const selectedReqs = requirementsState.filter(req => req.checked || req.subFields.some(sf => sf.checked));
    const hasLayoutOptions = layoutOptions.sidebarNav || layoutOptions.bottomNav;
    const hasMasterOptions = masterOptions.designationMaster || masterOptions.departmentMaster || masterOptions.employeeMaster || masterOptions.employeeLoginMaster;

    if (selectedReqs.length === 0 && !hasLayoutOptions && !hasMasterOptions) {
      return `# ${pageInfo?.icon} ${pageInfo?.label}\n\nNo requirements selected. Please select requirements from the left panel.`;
    }

    let prompt = `# ${pageInfo?.icon} ${pageInfo?.label}\n\n`;
    prompt += `## Selected Requirements\n\n`;

    // Add Layout section if any layout options are selected
    if (hasLayoutOptions) {
      prompt += `### 📐 ${pageInfo?.label} Layout\n`;
      if (layoutOptions.sidebarNav) {
        prompt += `- All Modules are in Sidebar navigation on desktop view\n`;
      }
      if (layoutOptions.bottomNav) {
        prompt += `- All Modules are in Bottom navigation bar on mobile view\n`;
      }
      prompt += `\n`;
    }

    // Add Master section if any master options are selected
    if (hasMasterOptions) {
      prompt += `### 📋 ${pageInfo?.label} Master\n`;
      if (masterOptions.designationMaster) {
        prompt += `- Create Designation Master\n`;
      }
      if (masterOptions.departmentMaster) {
        prompt += `- Create Department Master\n`;
      }
      if (masterOptions.employeeMaster) {
        prompt += `- Create Employee Master\n`;
      }
      if (masterOptions.employeeLoginMaster) {
        prompt += `- Create Employee Login Master\n`;
      }
      prompt += `\n`;
    }

    selectedReqs.forEach(req => {
      const selectedSubFields = req.subFields.filter(sf => sf.checked);
      if (req.checked || selectedSubFields.length > 0) {
        prompt += `### ${req.icon} ${req.label}\n`;
        if (selectedSubFields.length > 0) {
          selectedSubFields.forEach(sf => {
            const requiredTag = sf.required ? " (Required)" : " (Optional)";
            prompt += `- ${sf.label}${requiredTag}\n`;
          });
        }
        prompt += `\n`;
      }
    });

    return prompt;
  };

  // Copy to clipboard
  const copyToClipboard = async () => {
    const prompt = generatePrompt();
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
    } catch {
      const textArea = document.createElement("textarea");
      textArea.value = prompt;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
    }
    setTimeout(() => setCopied(false), 2000);
  };

  if (!pageInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-50 via-orange-50 to-pink-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Page Not Found</h1>
          <Link href="/script-studio" className="text-orange-600 hover:underline">
            Back to Script Studio
          </Link>
        </div>
      </div>
    );
  }

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
              className="px-4 py-2 bg-yellow-100 text-yellow-700 font-medium rounded-lg transition-all"
            >
              Script Studio
            </Link>
          </nav>
        </div>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - 3 Sections */}
          <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-2xl p-6 border border-white/30">
            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <span className="text-2xl">{pageInfo.icon}</span>
              {pageInfo.label}
            </h2>

            <div className="space-y-4 max-h-[calc(100vh-250px)] overflow-y-auto">
              {/* Section 0: npm Packages */}
              {npmPackages.length > 0 && (
                <div className="border-2 border-amber-200 rounded-xl overflow-hidden bg-amber-50/50">
                  <div
                    className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-amber-100/50 transition-colors"
                    onClick={() => toggleExpand('npm-section')}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-lg">📦</span>
                      <span className="font-medium text-gray-800">{pageInfo.label} npm Packages</span>
                    </div>
                    <span className={`text-amber-600 transition-transform ${expandedItems['npm-section'] ? 'rotate-180' : ''}`}>
                      ▼
                    </span>
                  </div>
                  {expandedItems['npm-section'] && (
                    <div className="border-t-2 border-amber-200 bg-white/50 px-4 py-3">
                      <div className="space-y-3">
                        {npmPackages.map((pkg, index) => (
                          <div
                            key={pkg.id}
                            className="flex items-center gap-3 bg-gray-900 rounded-lg px-4 py-3"
                          >
                            <span className="text-amber-400 font-mono text-sm">{index + 1}.</span>
                            <code className="flex-1 text-green-400 font-mono text-sm overflow-x-auto">
                              {pkg.command}
                            </code>
                            <button
                              onClick={() => copyPackageCommand(pkg.id, pkg.command)}
                              className={`px-3 py-1 text-xs font-medium rounded-lg transition-all ${
                                copiedPackage === pkg.id
                                  ? "bg-green-500 text-white"
                                  : "bg-amber-400 hover:bg-amber-500 text-gray-800"
                              }`}
                            >
                              {copiedPackage === pkg.id ? "Copied!" : "Copy"}
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Section 1: Layout */}
              <div className="border-2 border-blue-200 rounded-xl overflow-hidden bg-blue-50/50">
                <div
                  className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-blue-100/50 transition-colors"
                  onClick={() => toggleExpand('layout-section')}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={layoutOptions.sidebarNav && layoutOptions.bottomNav}
                      onChange={(e) => {
                        e.stopPropagation();
                        const newValue = !layoutOptions.sidebarNav || !layoutOptions.bottomNav;
                        setLayoutOptions({ sidebarNav: newValue, bottomNav: newValue });
                      }}
                      className="w-5 h-5 rounded border-2 border-blue-400 text-blue-600 focus:ring-blue-500 cursor-pointer"
                      onClick={(e) => e.stopPropagation()}
                    />
                    <span className="text-lg">📐</span>
                    <span className="font-medium text-gray-800">{pageInfo.label} Layout</span>
                  </div>
                  <span className={`text-blue-600 transition-transform ${expandedItems['layout-section'] ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </div>
                {expandedItems['layout-section'] && (
                  <div className="border-t-2 border-blue-200 bg-white/50 px-4 py-3">
                    <div className="ml-6 space-y-2">
                      <label className="flex items-center gap-3 py-1 cursor-pointer hover:bg-blue-50 rounded-lg px-2 transition-colors">
                        <input
                          type="checkbox"
                          checked={layoutOptions.sidebarNav}
                          onChange={() => setLayoutOptions(prev => ({ ...prev, sidebarNav: !prev.sidebarNav }))}
                          className="w-4 h-4 rounded border-2 border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                        />
                        <span className="text-gray-700 text-sm">All Modules are in Sidebar navigation on desktop view</span>
                      </label>
                      <label className="flex items-center gap-3 py-1 cursor-pointer hover:bg-blue-50 rounded-lg px-2 transition-colors">
                        <input
                          type="checkbox"
                          checked={layoutOptions.bottomNav}
                          onChange={() => setLayoutOptions(prev => ({ ...prev, bottomNav: !prev.bottomNav }))}
                          className="w-4 h-4 rounded border-2 border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                        />
                        <span className="text-gray-700 text-sm">All Modules are in Bottom navigation bar on mobile view</span>
                      </label>
                    </div>
                  </div>
                )}
              </div>

              {/* Section 2: Master */}
              <div className="border-2 border-purple-200 rounded-xl overflow-hidden bg-purple-50/50">
                <div
                  className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-purple-100/50 transition-colors"
                  onClick={() => toggleExpand('master-section')}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={masterOptions.designationMaster && masterOptions.departmentMaster && masterOptions.employeeMaster && masterOptions.employeeLoginMaster}
                      onChange={(e) => {
                        e.stopPropagation();
                        const newValue = !(masterOptions.designationMaster && masterOptions.departmentMaster && masterOptions.employeeMaster && masterOptions.employeeLoginMaster);
                        setMasterOptions({
                          designationMaster: newValue,
                          departmentMaster: newValue,
                          employeeMaster: newValue,
                          employeeLoginMaster: newValue,
                        });
                      }}
                      className="w-5 h-5 rounded border-2 border-purple-400 text-purple-600 focus:ring-purple-500 cursor-pointer"
                      onClick={(e) => e.stopPropagation()}
                    />
                    <span className="text-lg">📋</span>
                    <span className="font-medium text-gray-800">{pageInfo.label} Master</span>
                  </div>
                  <span className={`text-purple-600 transition-transform ${expandedItems['master-section'] ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </div>
                {expandedItems['master-section'] && (
                  <div className="border-t-2 border-purple-200 bg-white/50 px-4 py-3">
                    <div className="ml-6 space-y-2">
                      <label className="flex items-center gap-3 py-1 cursor-pointer hover:bg-purple-50 rounded-lg px-2 transition-colors">
                        <input
                          type="checkbox"
                          checked={masterOptions.designationMaster}
                          onChange={() => setMasterOptions(prev => ({ ...prev, designationMaster: !prev.designationMaster }))}
                          className="w-4 h-4 rounded border-2 border-gray-300 text-purple-600 focus:ring-purple-500 cursor-pointer"
                        />
                        <span className="text-gray-700 text-sm">Create Designation Master</span>
                      </label>
                      <label className="flex items-center gap-3 py-1 cursor-pointer hover:bg-purple-50 rounded-lg px-2 transition-colors">
                        <input
                          type="checkbox"
                          checked={masterOptions.departmentMaster}
                          onChange={() => setMasterOptions(prev => ({ ...prev, departmentMaster: !prev.departmentMaster }))}
                          className="w-4 h-4 rounded border-2 border-gray-300 text-purple-600 focus:ring-purple-500 cursor-pointer"
                        />
                        <span className="text-gray-700 text-sm">Create Department Master</span>
                      </label>
                      <label className="flex items-center gap-3 py-1 cursor-pointer hover:bg-purple-50 rounded-lg px-2 transition-colors">
                        <input
                          type="checkbox"
                          checked={masterOptions.employeeMaster}
                          onChange={() => setMasterOptions(prev => ({ ...prev, employeeMaster: !prev.employeeMaster }))}
                          className="w-4 h-4 rounded border-2 border-gray-300 text-purple-600 focus:ring-purple-500 cursor-pointer"
                        />
                        <span className="text-gray-700 text-sm">Create Employee Master</span>
                      </label>
                      <label className="flex items-center gap-3 py-1 cursor-pointer hover:bg-purple-50 rounded-lg px-2 transition-colors">
                        <input
                          type="checkbox"
                          checked={masterOptions.employeeLoginMaster}
                          onChange={() => setMasterOptions(prev => ({ ...prev, employeeLoginMaster: !prev.employeeLoginMaster }))}
                          className="w-4 h-4 rounded border-2 border-gray-300 text-purple-600 focus:ring-purple-500 cursor-pointer"
                        />
                        <span className="text-gray-700 text-sm">Create Employee Login Master</span>
                      </label>
                    </div>
                  </div>
                )}
              </div>

              {/* Section 3: Modules */}
              <div className="border-2 border-teal-200 rounded-xl overflow-hidden bg-teal-50/50">
                <div
                  className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-teal-100/50 transition-colors"
                  onClick={() => toggleExpand('modules-section')}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      className="w-5 h-5 rounded border-2 border-teal-400 text-teal-600 focus:ring-teal-500 cursor-pointer"
                      onClick={(e) => e.stopPropagation()}
                    />
                    <span className="text-lg">🧩</span>
                    <span className="font-medium text-gray-800">{pageInfo.label} Modules</span>
                  </div>
                  <span className={`text-teal-600 transition-transform ${expandedItems['modules-section'] ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </div>
                {expandedItems['modules-section'] && (
                  <div className="border-t-2 border-teal-200 bg-white/50 px-4 py-3">
                    <div className="space-y-3">
                      {requirementsState.map((req) => (
                        <div key={req.id} className="border border-teal-200 rounded-lg overflow-hidden bg-white/50">
                          {/* Module row */}
                          <div
                            className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-teal-50 transition-colors"
                            onClick={() => toggleExpand(req.id)}
                          >
                            <div className="flex items-center gap-3">
                              <input
                                type="checkbox"
                                checked={req.checked}
                                onChange={(e) => {
                                  e.stopPropagation();
                                  toggleRequirement(req.id);
                                }}
                                className="w-4 h-4 rounded border-2 border-teal-400 text-teal-600 focus:ring-teal-500 cursor-pointer"
                              />
                              <span className="text-lg">{req.icon}</span>
                              <span className="font-medium text-gray-800">{req.label}</span>
                            </div>
                            <span className={`text-teal-600 transition-transform text-sm ${expandedItems[req.id] ? 'rotate-180' : ''}`}>
                              ▼
                            </span>
                          </div>

                          {/* Fields */}
                          {expandedItems[req.id] && req.subFields.length > 0 && (
                            <div className="border-t border-teal-200 bg-teal-50/30 px-4 py-3">
                              <div className="ml-6 space-y-2">
                                {req.subFields.map((sf) => (
                                  <div
                                    key={sf.id}
                                    className="flex items-center justify-between py-1 hover:bg-teal-50 rounded-lg px-2 transition-colors"
                                  >
                                    <label className="flex items-center gap-3 cursor-pointer flex-1">
                                      <input
                                        type="checkbox"
                                        checked={sf.checked}
                                        onChange={() => toggleSubField(req.id, sf.id)}
                                        className="w-4 h-4 rounded border-2 border-gray-300 text-teal-600 focus:ring-teal-500 cursor-pointer"
                                      />
                                      <span className="text-gray-700 text-sm">{sf.label}</span>
                                    </label>
                                    {/* Required/Optional Toggle */}
                                    <button
                                      onClick={() => toggleRequired(req.id, sf.id)}
                                      className={`px-2 py-0.5 text-xs font-medium rounded-full transition-all ${
                                        sf.required
                                          ? "bg-red-100 text-red-600 hover:bg-red-200"
                                          : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                                      }`}
                                    >
                                      {sf.required ? "Required" : "Optional"}
                                    </button>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

            </div>
          </div>

          {/* Right Column - Generated Prompt */}
          <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-2xl p-6 border border-white/30">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <span className="text-2xl">✨</span>
                Generated Prompt
              </h2>
              <button
                onClick={copyToClipboard}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all cursor-pointer ${
                  copied
                    ? "bg-green-500 text-white"
                    : "bg-green-400 hover:bg-green-500 text-gray-800"
                }`}
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>

            <div className="bg-gray-900 rounded-xl p-5 min-h-[calc(100vh-300px)] max-h-[calc(100vh-250px)] overflow-y-auto border border-gray-700">
              <pre className="whitespace-pre-wrap text-green-400 font-mono text-sm leading-relaxed">
                {generatePrompt()}
              </pre>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
