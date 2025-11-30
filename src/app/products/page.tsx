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

type FeatureOption = {
  id: string;
  label: string;
  checked: boolean;
  icon: string;
  subFields?: SubField[];
};

type ProductModule = {
  id: string;
  name: string;
  icon: string;
  description: string;
  features: FeatureOption[];
};

type SelectedFeature = {
  label: string;
  subFields: string[];
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
  { icon: "📦", top: "10%", left: "5%", delay: "0s", duration: "7s" },
  { icon: "🏢", top: "20%", right: "8%", delay: "1s", duration: "6s" },
  { icon: "👥", top: "60%", left: "3%", delay: "2s", duration: "8s" },
  { icon: "📊", bottom: "20%", right: "5%", delay: "0.5s", duration: "7s" },
  { icon: "💼", top: "40%", right: "3%", delay: "1.5s", duration: "5s" },
  { icon: "🎯", bottom: "30%", left: "8%", delay: "3s", duration: "6s" },
];

// Available Products
const products = [
  {
    id: "superstaff",
    name: "Super Staff",
    icon: "👔",
    description: "Complete Staff Management System",
    color: "from-blue-400 to-indigo-500",
  },
];

// SuperStaff Modules and Features
const superStaffModules: ProductModule[] = [
  {
    id: "employee-management",
    name: "Employee Management",
    icon: "👥",
    description: "Manage employee records and profiles",
    features: [
      { id: "emp-add", label: "1. Add Employee", checked: false, icon: "➕", subFields: [
        { id: "emp-add-name", label: "1.1 Full Name", checked: false },
        { id: "emp-add-email", label: "1.2 Email Address", checked: false },
        { id: "emp-add-phone", label: "1.3 Phone Number", checked: false },
        { id: "emp-add-dob", label: "1.4 Date of Birth", checked: false },
        { id: "emp-add-gender", label: "1.5 Gender", checked: false },
        { id: "emp-add-address", label: "1.6 Address", checked: false },
        { id: "emp-add-photo", label: "1.7 Profile Photo", checked: false },
        { id: "emp-add-department", label: "1.8 Department", checked: false },
        { id: "emp-add-designation", label: "1.9 Designation", checked: false },
        { id: "emp-add-joindate", label: "1.10 Join Date", checked: false },
        { id: "emp-add-empid", label: "1.11 Employee ID", checked: false },
        { id: "emp-add-reportsto", label: "1.12 Reports To", checked: false },
      ]},
      { id: "emp-list", label: "2. Employee List", checked: false, icon: "📋", subFields: [
        { id: "emp-list-table", label: "2.1 Data Table View", checked: false },
        { id: "emp-list-search", label: "2.2 Search Bar", checked: false },
        { id: "emp-list-filter", label: "2.3 Filter Options", checked: false },
        { id: "emp-list-sort", label: "2.4 Sort Columns", checked: false },
        { id: "emp-list-pagination", label: "2.5 Pagination", checked: false },
        { id: "emp-list-export", label: "2.6 Export (CSV/PDF)", checked: false },
        { id: "emp-list-bulkaction", label: "2.7 Bulk Actions", checked: false },
      ]},
      { id: "emp-profile", label: "3. Employee Profile", checked: false, icon: "👤", subFields: [
        { id: "emp-profile-header", label: "3.1 Profile Header", checked: false },
        { id: "emp-profile-personal", label: "3.2 Personal Info Tab", checked: false },
        { id: "emp-profile-job", label: "3.3 Job Details Tab", checked: false },
        { id: "emp-profile-documents", label: "3.4 Documents Tab", checked: false },
        { id: "emp-profile-emergency", label: "3.5 Emergency Contact", checked: false },
        { id: "emp-profile-edit", label: "3.6 Edit Profile", checked: false },
      ]},
      { id: "emp-edit", label: "4. Edit Employee", checked: false, icon: "✏️", subFields: [
        { id: "emp-edit-form", label: "4.1 Edit Form", checked: false },
        { id: "emp-edit-validation", label: "4.2 Form Validation", checked: false },
        { id: "emp-edit-history", label: "4.3 Change History", checked: false },
      ]},
      { id: "emp-delete", label: "5. Delete/Archive Employee", checked: false, icon: "🗑️", subFields: [
        { id: "emp-delete-confirm", label: "5.1 Confirmation Modal", checked: false },
        { id: "emp-delete-archive", label: "5.2 Archive Option", checked: false },
        { id: "emp-delete-restore", label: "5.3 Restore Archived", checked: false },
      ]},
    ],
  },
  {
    id: "attendance-management",
    name: "Attendance Management",
    icon: "📅",
    description: "Track employee attendance and time",
    features: [
      { id: "att-checkin", label: "1. Check In/Out", checked: false, icon: "🕐", subFields: [
        { id: "att-checkin-button", label: "1.1 Check In Button", checked: false },
        { id: "att-checkout-button", label: "1.2 Check Out Button", checked: false },
        { id: "att-current-status", label: "1.3 Current Status Display", checked: false },
        { id: "att-location", label: "1.4 Location Capture", checked: false },
        { id: "att-photo", label: "1.5 Photo Capture", checked: false },
      ]},
      { id: "att-daily", label: "2. Daily Attendance", checked: false, icon: "📊", subFields: [
        { id: "att-daily-list", label: "2.1 Today's Attendance List", checked: false },
        { id: "att-daily-summary", label: "2.2 Daily Summary Stats", checked: false },
        { id: "att-daily-late", label: "2.3 Late Arrivals", checked: false },
        { id: "att-daily-absent", label: "2.4 Absent Employees", checked: false },
      ]},
      { id: "att-calendar", label: "3. Attendance Calendar", checked: false, icon: "📆", subFields: [
        { id: "att-cal-monthly", label: "3.1 Monthly View", checked: false },
        { id: "att-cal-weekly", label: "3.2 Weekly View", checked: false },
        { id: "att-cal-legend", label: "3.3 Status Legend", checked: false },
        { id: "att-cal-employee", label: "3.4 Employee Selector", checked: false },
      ]},
      { id: "att-reports", label: "4. Attendance Reports", checked: false, icon: "📈", subFields: [
        { id: "att-rep-individual", label: "4.1 Individual Report", checked: false },
        { id: "att-rep-department", label: "4.2 Department Report", checked: false },
        { id: "att-rep-daterange", label: "4.3 Date Range Filter", checked: false },
        { id: "att-rep-export", label: "4.4 Export Report", checked: false },
      ]},
      { id: "att-overtime", label: "5. Overtime Tracking", checked: false, icon: "⏰", subFields: [
        { id: "att-ot-hours", label: "5.1 Overtime Hours", checked: false },
        { id: "att-ot-approval", label: "5.2 Approval Workflow", checked: false },
        { id: "att-ot-report", label: "5.3 Overtime Report", checked: false },
      ]},
    ],
  },
  {
    id: "leave-management",
    name: "Leave Management",
    icon: "🏖️",
    description: "Handle leave requests and approvals",
    features: [
      { id: "leave-apply", label: "1. Apply Leave", checked: false, icon: "📝", subFields: [
        { id: "leave-apply-type", label: "1.1 Leave Type Selection", checked: false },
        { id: "leave-apply-dates", label: "1.2 Date Range Picker", checked: false },
        { id: "leave-apply-reason", label: "1.3 Reason/Description", checked: false },
        { id: "leave-apply-attachment", label: "1.4 Attachment Upload", checked: false },
        { id: "leave-apply-balance", label: "1.5 Balance Display", checked: false },
      ]},
      { id: "leave-history", label: "2. Leave History", checked: false, icon: "📋", subFields: [
        { id: "leave-hist-list", label: "2.1 Leave List", checked: false },
        { id: "leave-hist-status", label: "2.2 Status Filter", checked: false },
        { id: "leave-hist-year", label: "2.3 Year Filter", checked: false },
        { id: "leave-hist-cancel", label: "2.4 Cancel Request", checked: false },
      ]},
      { id: "leave-balance", label: "3. Leave Balance", checked: false, icon: "📊", subFields: [
        { id: "leave-bal-summary", label: "3.1 Balance Summary Card", checked: false },
        { id: "leave-bal-breakdown", label: "3.2 Type-wise Breakdown", checked: false },
        { id: "leave-bal-accrual", label: "3.3 Accrual History", checked: false },
      ]},
      { id: "leave-approval", label: "4. Leave Approval", checked: false, icon: "✅", subFields: [
        { id: "leave-appr-pending", label: "4.1 Pending Requests", checked: false },
        { id: "leave-appr-approve", label: "4.2 Approve Button", checked: false },
        { id: "leave-appr-reject", label: "4.3 Reject with Reason", checked: false },
        { id: "leave-appr-bulk", label: "4.4 Bulk Approval", checked: false },
      ]},
      { id: "leave-policy", label: "5. Leave Policy", checked: false, icon: "📑", subFields: [
        { id: "leave-pol-types", label: "5.1 Leave Types Config", checked: false },
        { id: "leave-pol-rules", label: "5.2 Policy Rules", checked: false },
        { id: "leave-pol-holidays", label: "5.3 Holiday Calendar", checked: false },
      ]},
    ],
  },
  {
    id: "payroll-management",
    name: "Payroll Management",
    icon: "💰",
    description: "Process salaries and payments",
    features: [
      { id: "pay-salary", label: "1. Salary Structure", checked: false, icon: "💵", subFields: [
        { id: "pay-sal-basic", label: "1.1 Basic Salary", checked: false },
        { id: "pay-sal-allowances", label: "1.2 Allowances", checked: false },
        { id: "pay-sal-deductions", label: "1.3 Deductions", checked: false },
        { id: "pay-sal-net", label: "1.4 Net Salary", checked: false },
        { id: "pay-sal-ctc", label: "1.5 CTC Breakdown", checked: false },
      ]},
      { id: "pay-slip", label: "2. Payslip Generation", checked: false, icon: "📄", subFields: [
        { id: "pay-slip-generate", label: "2.1 Generate Payslip", checked: false },
        { id: "pay-slip-view", label: "2.2 View Payslip", checked: false },
        { id: "pay-slip-download", label: "2.3 Download PDF", checked: false },
        { id: "pay-slip-email", label: "2.4 Email Payslip", checked: false },
      ]},
      { id: "pay-process", label: "3. Payroll Processing", checked: false, icon: "⚙️", subFields: [
        { id: "pay-proc-run", label: "3.1 Run Payroll", checked: false },
        { id: "pay-proc-preview", label: "3.2 Preview Before Process", checked: false },
        { id: "pay-proc-approve", label: "3.3 Approval Workflow", checked: false },
        { id: "pay-proc-history", label: "3.4 Processing History", checked: false },
      ]},
      { id: "pay-bank", label: "4. Bank Details", checked: false, icon: "🏦", subFields: [
        { id: "pay-bank-account", label: "4.1 Bank Account Info", checked: false },
        { id: "pay-bank-ifsc", label: "4.2 IFSC Code", checked: false },
        { id: "pay-bank-transfer", label: "4.3 Bank Transfer File", checked: false },
      ]},
      { id: "pay-tax", label: "5. Tax Management", checked: false, icon: "📑", subFields: [
        { id: "pay-tax-declaration", label: "5.1 Tax Declaration", checked: false },
        { id: "pay-tax-proof", label: "5.2 Proof Submission", checked: false },
        { id: "pay-tax-tds", label: "5.3 TDS Calculation", checked: false },
        { id: "pay-tax-form16", label: "5.4 Form 16 Generation", checked: false },
      ]},
    ],
  },
  {
    id: "department-management",
    name: "Department Management",
    icon: "🏢",
    description: "Organize departments and teams",
    features: [
      { id: "dept-add", label: "1. Add Department", checked: false, icon: "➕", subFields: [
        { id: "dept-add-name", label: "1.1 Department Name", checked: false },
        { id: "dept-add-code", label: "1.2 Department Code", checked: false },
        { id: "dept-add-head", label: "1.3 Department Head", checked: false },
        { id: "dept-add-parent", label: "1.4 Parent Department", checked: false },
        { id: "dept-add-description", label: "1.5 Description", checked: false },
      ]},
      { id: "dept-list", label: "2. Department List", checked: false, icon: "📋", subFields: [
        { id: "dept-list-table", label: "2.1 Department Table", checked: false },
        { id: "dept-list-tree", label: "2.2 Hierarchy Tree", checked: false },
        { id: "dept-list-employees", label: "2.3 Employee Count", checked: false },
      ]},
      { id: "dept-orgchart", label: "3. Organization Chart", checked: false, icon: "📊", subFields: [
        { id: "dept-org-visual", label: "3.1 Visual Org Chart", checked: false },
        { id: "dept-org-zoom", label: "3.2 Zoom Controls", checked: false },
        { id: "dept-org-export", label: "3.3 Export Chart", checked: false },
      ]},
    ],
  },
  {
    id: "performance-management",
    name: "Performance Management",
    icon: "📈",
    description: "Track and evaluate performance",
    features: [
      { id: "perf-goals", label: "1. Goal Setting", checked: false, icon: "🎯", subFields: [
        { id: "perf-goals-add", label: "1.1 Add Goal", checked: false },
        { id: "perf-goals-assign", label: "1.2 Assign to Employee", checked: false },
        { id: "perf-goals-deadline", label: "1.3 Deadline", checked: false },
        { id: "perf-goals-weight", label: "1.4 Weightage", checked: false },
        { id: "perf-goals-track", label: "1.5 Progress Tracking", checked: false },
      ]},
      { id: "perf-review", label: "2. Performance Review", checked: false, icon: "📝", subFields: [
        { id: "perf-rev-self", label: "2.1 Self Assessment", checked: false },
        { id: "perf-rev-manager", label: "2.2 Manager Review", checked: false },
        { id: "perf-rev-rating", label: "2.3 Rating Scale", checked: false },
        { id: "perf-rev-feedback", label: "2.4 Feedback Comments", checked: false },
      ]},
      { id: "perf-kpi", label: "3. KPI Dashboard", checked: false, icon: "📊", subFields: [
        { id: "perf-kpi-metrics", label: "3.1 Key Metrics", checked: false },
        { id: "perf-kpi-charts", label: "3.2 Performance Charts", checked: false },
        { id: "perf-kpi-compare", label: "3.3 Comparison View", checked: false },
      ]},
      { id: "perf-pip", label: "4. Performance Improvement Plan", checked: false, icon: "📈", subFields: [
        { id: "perf-pip-create", label: "4.1 Create PIP", checked: false },
        { id: "perf-pip-milestones", label: "4.2 Milestones", checked: false },
        { id: "perf-pip-tracking", label: "4.3 Progress Tracking", checked: false },
      ]},
    ],
  },
  {
    id: "recruitment",
    name: "Recruitment",
    icon: "🎯",
    description: "Hire and onboard new employees",
    features: [
      { id: "rec-job", label: "1. Job Postings", checked: false, icon: "📢", subFields: [
        { id: "rec-job-create", label: "1.1 Create Job Post", checked: false },
        { id: "rec-job-title", label: "1.2 Job Title", checked: false },
        { id: "rec-job-description", label: "1.3 Job Description", checked: false },
        { id: "rec-job-requirements", label: "1.4 Requirements", checked: false },
        { id: "rec-job-salary", label: "1.5 Salary Range", checked: false },
        { id: "rec-job-publish", label: "1.6 Publish/Unpublish", checked: false },
      ]},
      { id: "rec-applications", label: "2. Applications", checked: false, icon: "📋", subFields: [
        { id: "rec-app-list", label: "2.1 Application List", checked: false },
        { id: "rec-app-resume", label: "2.2 Resume View", checked: false },
        { id: "rec-app-status", label: "2.3 Status Update", checked: false },
        { id: "rec-app-filter", label: "2.4 Filter Applications", checked: false },
      ]},
      { id: "rec-interview", label: "3. Interview Scheduling", checked: false, icon: "📅", subFields: [
        { id: "rec-int-schedule", label: "3.1 Schedule Interview", checked: false },
        { id: "rec-int-calendar", label: "3.2 Interview Calendar", checked: false },
        { id: "rec-int-feedback", label: "3.3 Interview Feedback", checked: false },
        { id: "rec-int-panel", label: "3.4 Interview Panel", checked: false },
      ]},
      { id: "rec-offer", label: "4. Offer Management", checked: false, icon: "📨", subFields: [
        { id: "rec-offer-create", label: "4.1 Create Offer", checked: false },
        { id: "rec-offer-template", label: "4.2 Offer Template", checked: false },
        { id: "rec-offer-send", label: "4.3 Send Offer", checked: false },
        { id: "rec-offer-track", label: "4.4 Track Response", checked: false },
      ]},
      { id: "rec-onboard", label: "5. Onboarding", checked: false, icon: "🚀", subFields: [
        { id: "rec-onb-checklist", label: "5.1 Onboarding Checklist", checked: false },
        { id: "rec-onb-documents", label: "5.2 Document Collection", checked: false },
        { id: "rec-onb-training", label: "5.3 Training Schedule", checked: false },
        { id: "rec-onb-welcome", label: "5.4 Welcome Kit", checked: false },
      ]},
    ],
  },
  {
    id: "reports-analytics",
    name: "Reports & Analytics",
    icon: "📊",
    description: "Generate insights and reports",
    features: [
      { id: "rep-dashboard", label: "1. HR Dashboard", checked: false, icon: "📈", subFields: [
        { id: "rep-dash-headcount", label: "1.1 Headcount Stats", checked: false },
        { id: "rep-dash-attendance", label: "1.2 Attendance Overview", checked: false },
        { id: "rep-dash-leave", label: "1.3 Leave Summary", checked: false },
        { id: "rep-dash-performance", label: "1.4 Performance Metrics", checked: false },
        { id: "rep-dash-recruitment", label: "1.5 Recruitment Pipeline", checked: false },
      ]},
      { id: "rep-custom", label: "2. Custom Reports", checked: false, icon: "🔧", subFields: [
        { id: "rep-cust-builder", label: "2.1 Report Builder", checked: false },
        { id: "rep-cust-columns", label: "2.2 Column Selection", checked: false },
        { id: "rep-cust-filters", label: "2.3 Filter Options", checked: false },
        { id: "rep-cust-save", label: "2.4 Save Report Template", checked: false },
      ]},
      { id: "rep-export", label: "3. Export Options", checked: false, icon: "📤", subFields: [
        { id: "rep-exp-pdf", label: "3.1 PDF Export", checked: false },
        { id: "rep-exp-excel", label: "3.2 Excel Export", checked: false },
        { id: "rep-exp-csv", label: "3.3 CSV Export", checked: false },
        { id: "rep-exp-schedule", label: "3.4 Scheduled Reports", checked: false },
      ]},
    ],
  },
  {
    id: "settings",
    name: "Settings & Configuration",
    icon: "⚙️",
    description: "System configuration and settings",
    features: [
      { id: "set-company", label: "1. Company Settings", checked: false, icon: "🏢", subFields: [
        { id: "set-comp-name", label: "1.1 Company Name", checked: false },
        { id: "set-comp-logo", label: "1.2 Company Logo", checked: false },
        { id: "set-comp-address", label: "1.3 Address", checked: false },
        { id: "set-comp-contact", label: "1.4 Contact Info", checked: false },
      ]},
      { id: "set-roles", label: "2. Roles & Permissions", checked: false, icon: "🔐", subFields: [
        { id: "set-role-create", label: "2.1 Create Role", checked: false },
        { id: "set-role-permissions", label: "2.2 Assign Permissions", checked: false },
        { id: "set-role-users", label: "2.3 Assign Users", checked: false },
      ]},
      { id: "set-workflow", label: "3. Workflow Configuration", checked: false, icon: "🔄", subFields: [
        { id: "set-wf-approval", label: "3.1 Approval Chains", checked: false },
        { id: "set-wf-notifications", label: "3.2 Notification Rules", checked: false },
        { id: "set-wf-escalation", label: "3.3 Escalation Rules", checked: false },
      ]},
      { id: "set-integration", label: "4. Integrations", checked: false, icon: "🔗", subFields: [
        { id: "set-int-email", label: "4.1 Email Integration", checked: false },
        { id: "set-int-calendar", label: "4.2 Calendar Sync", checked: false },
        { id: "set-int-biometric", label: "4.3 Biometric Devices", checked: false },
        { id: "set-int-payroll", label: "4.4 Payroll System", checked: false },
      ]},
    ],
  },
];

export default function ProductsStudio() {
  const [selectedProduct, setSelectedProduct] = useState<string>("superstaff");
  const [selectedModules, setSelectedModules] = useState<Record<string, ProductModule[]>>({
    superstaff: superStaffModules.map(module => ({
      ...module,
      features: module.features.map(f => ({
        ...f,
        checked: false,
        subFields: f.subFields?.map(sf => ({ ...sf, checked: false }))
      }))
    }))
  });
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({});
  const [expandedFeatures, setExpandedFeatures] = useState<Record<string, boolean>>({});
  const [generatedPrompt, setGeneratedPrompt] = useState("");
  const [copied, setCopied] = useState(false);
  const [projectDescription, setProjectDescription] = useState("");

  // Toggle module expansion
  const toggleModule = (moduleId: string) => {
    setExpandedModules(prev => ({
      ...prev,
      [moduleId]: !prev[moduleId]
    }));
  };

  // Toggle feature expansion
  const toggleFeature = (featureId: string) => {
    setExpandedFeatures(prev => ({
      ...prev,
      [featureId]: !prev[featureId]
    }));
  };

  // Handle feature checkbox change
  const handleFeatureChange = (moduleId: string, featureId: string) => {
    setSelectedModules(prev => ({
      ...prev,
      [selectedProduct]: prev[selectedProduct].map(module =>
        module.id === moduleId
          ? {
              ...module,
              features: module.features.map(f =>
                f.id === featureId ? { ...f, checked: !f.checked } : f
              )
            }
          : module
      )
    }));
  };

  // Handle subfield checkbox change
  const handleSubFieldChange = (moduleId: string, featureId: string, subFieldId: string) => {
    setSelectedModules(prev => ({
      ...prev,
      [selectedProduct]: prev[selectedProduct].map(module =>
        module.id === moduleId
          ? {
              ...module,
              features: module.features.map(f =>
                f.id === featureId
                  ? {
                      ...f,
                      subFields: f.subFields?.map(sf =>
                        sf.id === subFieldId ? { ...sf, checked: !sf.checked } : sf
                      )
                    }
                  : f
              )
            }
          : module
      )
    }));
  };

  // Select all features in a module
  const selectAllInModule = (moduleId: string, select: boolean) => {
    setSelectedModules(prev => ({
      ...prev,
      [selectedProduct]: prev[selectedProduct].map(module =>
        module.id === moduleId
          ? {
              ...module,
              features: module.features.map(f => ({
                ...f,
                checked: select,
                subFields: f.subFields?.map(sf => ({ ...sf, checked: select }))
              }))
            }
          : module
      )
    }));
  };

  // Generate prompt
  const generatePrompt = () => {
    const modules = selectedModules[selectedProduct];
    const selectedFeatures: { moduleName: string; moduleIcon: string; features: SelectedFeature[] }[] = [];

    modules.forEach(module => {
      const checkedFeatures = module.features.filter(f => f.checked);
      if (checkedFeatures.length > 0) {
        selectedFeatures.push({
          moduleName: module.name,
          moduleIcon: module.icon,
          features: checkedFeatures.map(f => ({
            label: f.label,
            subFields: f.subFields?.filter(sf => sf.checked).map(sf => sf.label) || []
          }))
        });
      }
    });

    if (selectedFeatures.length === 0) {
      setGeneratedPrompt("Please select at least one feature to generate a prompt.");
      return;
    }

    let prompt = `# Super Staff - Staff Management System\n\n`;

    if (projectDescription.trim()) {
      prompt += `## Project Description\n${projectDescription}\n\n`;
    }

    prompt += `## Tech Stack\n`;
    prompt += `- **Frontend**: Next.js 16 + React 19 + TypeScript + Tailwind CSS 4\n`;
    prompt += `- **Backend**: Django 5.2.8 + Django REST Framework\n`;
    prompt += `- **Database**: PostgreSQL\n`;
    prompt += `- **Authentication**: JWT / Session-based\n\n`;

    prompt += `## Selected Modules & Features\n\n`;

    selectedFeatures.forEach(({ moduleName, moduleIcon, features }) => {
      prompt += `### ${moduleIcon} ${moduleName}\n\n`;
      features.forEach(feature => {
        prompt += `- ${feature.label}\n`;
        if (feature.subFields.length > 0) {
          feature.subFields.forEach(sf => {
            prompt += `  - ${sf}\n`;
          });
        }
      });
      prompt += `\n`;
    });

    prompt += `## Implementation Requirements\n\n`;
    prompt += `1. **API Design**: Create RESTful APIs for all selected features\n`;
    prompt += `2. **Database Models**: Design proper Django models with relationships\n`;
    prompt += `3. **Frontend Components**: Build reusable React components\n`;
    prompt += `4. **Form Validation**: Implement client and server-side validation\n`;
    prompt += `5. **Authentication**: Secure all endpoints with proper auth\n`;
    prompt += `6. **Responsive Design**: Mobile-first responsive UI\n`;
    prompt += `7. **Error Handling**: Proper error messages and handling\n`;
    prompt += `8. **Loading States**: Show loading indicators for async operations\n`;

    setGeneratedPrompt(prompt);
  };

  // Clear all selections
  const clearAll = () => {
    setSelectedModules(prev => ({
      ...prev,
      [selectedProduct]: prev[selectedProduct].map(module => ({
        ...module,
        features: module.features.map(f => ({
          ...f,
          checked: false,
          subFields: f.subFields?.map(sf => ({ ...sf, checked: false }))
        }))
      }))
    }));
    setProjectDescription("");
    setGeneratedPrompt("");
    setExpandedModules({});
    setExpandedFeatures({});
  };

  // Copy to clipboard
  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(generatedPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Get selected count
  const getSelectedCount = () => {
    return selectedModules[selectedProduct]?.reduce((acc, module) => {
      return acc + module.features.filter(f => f.checked).length;
    }, 0) || 0;
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
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: "1s" }} />
      <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: "2s" }} />

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
            <Link href="/module-studio" className="px-4 py-2 text-gray-700 font-medium rounded-lg hover:bg-purple-100 hover:text-purple-700 transition-all">
              Design Studio
            </Link>
            <Link href="/products" className="px-4 py-2 bg-blue-100 text-blue-700 font-medium rounded-lg transition-all">
              Products
            </Link>
            <Link href="/deploy" className="px-4 py-2 text-gray-700 font-medium rounded-lg hover:bg-green-100 hover:text-green-700 transition-all">
              Deploy
            </Link>
          </nav>
        </div>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Product Selection */}
          <div className="space-y-6">
            {/* Product Selection */}
            <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-2xl p-6 border border-white/30">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-2xl">📦</span>
                Select Product
              </h2>

              <div className="grid grid-cols-1 gap-3">
                {products.map(product => (
                  <button
                    key={product.id}
                    onClick={() => setSelectedProduct(product.id)}
                    className={`p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                      selectedProduct === product.id
                        ? `bg-gradient-to-r ${product.color} text-white border-transparent shadow-lg scale-[1.02]`
                        : "bg-white/70 border-gray-200 hover:border-blue-300 hover:bg-blue-50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{product.icon}</span>
                      <div>
                        <h3 className="font-bold text-lg">{product.name}</h3>
                        <p className={`text-sm ${selectedProduct === product.id ? "text-white/80" : "text-gray-500"}`}>
                          {product.description}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Project Description */}
            <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-2xl p-6 border border-white/30">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-2xl">📝</span>
                Project Description (Optional)
              </h2>
              <textarea
                value={projectDescription}
                onChange={(e) => setProjectDescription(e.target.value)}
                placeholder="Describe your specific requirements..."
                rows={3}
                className="w-full px-4 py-3 bg-white/50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition-all resize-none hover:border-blue-300"
              />
            </div>

            {/* Feature Selection */}
            <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-2xl p-6 border border-white/30">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                  <span className="text-2xl">🧩</span>
                  Select Features
                </h2>
                <span className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">
                  {getSelectedCount()} selected
                </span>
              </div>

              <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
                {selectedModules[selectedProduct]?.map(module => (
                  <div key={module.id} className="border-2 border-gray-100 rounded-xl overflow-hidden">
                    {/* Module Header */}
                    <div
                      className="flex items-center justify-between p-3 bg-gradient-to-r from-gray-50 to-white cursor-pointer hover:from-blue-50 hover:to-white transition-colors"
                      onClick={() => toggleModule(module.id)}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{module.icon}</span>
                        <div>
                          <h3 className="font-semibold text-gray-800">{module.name}</h3>
                          <p className="text-xs text-gray-500">{module.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            const allChecked = module.features.every(f => f.checked);
                            selectAllInModule(module.id, !allChecked);
                          }}
                          className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                        >
                          {module.features.every(f => f.checked) ? "Deselect All" : "Select All"}
                        </button>
                        <svg
                          className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${expandedModules[module.id] ? "rotate-180" : ""}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>

                    {/* Module Features */}
                    {expandedModules[module.id] && (
                      <div className="p-3 bg-white space-y-2">
                        {module.features.map(feature => (
                          <div key={feature.id} className="space-y-1">
                            {/* Feature Checkbox */}
                            <div
                              className={`flex items-center gap-2 p-2 rounded-lg transition-all duration-200 border ${
                                feature.checked
                                  ? "bg-gradient-to-r from-blue-100 to-indigo-100 border-blue-400"
                                  : "bg-white/70 border-gray-200 hover:border-blue-300"
                              }`}
                            >
                              <input
                                type="checkbox"
                                checked={feature.checked}
                                onChange={() => handleFeatureChange(module.id, feature.id)}
                                className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-400 accent-blue-500 cursor-pointer"
                              />
                              <span className="text-sm">{feature.icon}</span>
                              <span className="text-gray-700 text-xs font-medium flex-1">{feature.label}</span>
                              {feature.checked && feature.subFields && feature.subFields.length > 0 && (
                                <button
                                  type="button"
                                  onClick={() => toggleFeature(feature.id)}
                                  className="p-1 hover:bg-blue-200 rounded-md transition-colors"
                                >
                                  <svg
                                    className={`w-4 h-4 text-blue-600 transition-transform duration-200 ${expandedFeatures[feature.id] ? "rotate-180" : ""}`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                  </svg>
                                </button>
                              )}
                            </div>

                            {/* Subfields */}
                            {feature.checked && feature.subFields && feature.subFields.length > 0 && expandedFeatures[feature.id] && (
                              <div className="ml-6 pl-4 border-l-2 border-blue-300 space-y-1">
                                {feature.subFields.map(subField => (
                                  <label
                                    key={subField.id}
                                    className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-all duration-200 text-xs ${
                                      subField.checked
                                        ? "bg-blue-100 text-blue-800"
                                        : "bg-white/50 hover:bg-blue-50 text-gray-600"
                                    }`}
                                  >
                                    <input
                                      type="checkbox"
                                      checked={subField.checked}
                                      onChange={() => handleSubFieldChange(module.id, feature.id, subField.id)}
                                      className="w-3 h-3 text-blue-500 border-gray-300 rounded focus:ring-blue-400 accent-blue-500"
                                    />
                                    <span className="font-medium">{subField.label}</span>
                                  </label>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 mt-6 pt-4 border-t border-gray-200">
                <button
                  onClick={generatePrompt}
                  disabled={getSelectedCount() === 0}
                  className={`flex-1 py-3 px-6 rounded-xl font-bold transition-all duration-300 ${
                    getSelectedCount() > 0
                      ? "bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 hover:from-blue-500 hover:via-indigo-500 hover:to-purple-500 text-white shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
                      : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  }`}
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
          </div>

          {/* Right Column - Output */}
          <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-2xl p-6 border border-white/30 hover:shadow-blue-200/50 transition-shadow duration-300">
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
                      : "bg-gradient-to-r from-blue-400 to-indigo-400 hover:from-blue-500 hover:to-indigo-500 text-white"
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
                  <span className="text-6xl mb-4 opacity-50">👔</span>
                  <p className="text-center">
                    Select features from <span className="text-blue-400 font-semibold">Super Staff</span><br />
                    and click <span className="text-blue-400 font-semibold">&quot;Generate Prompt&quot;</span><br />
                    to create your implementation prompt
                  </p>
                </div>
              )}
            </div>

            {generatedPrompt && (
              <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                <p className="text-sm text-blue-800 flex items-start gap-2">
                  <span className="text-lg">💡</span>
                  <span>
                    <strong>Tip:</strong> Copy this prompt and use it with Claude or any AI assistant to generate the code for your selected features.
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
