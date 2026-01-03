"use client";

import { MobileLayout } from "@/app/components/MobileLayout";
import { useState } from "react";

function FloatingIcon({ icon, style }: { icon: string; style: React.CSSProperties }) {
  return (
    <div className="absolute text-3xl md:text-4xl opacity-20 animate-float pointer-events-none" style={style}>
      {icon}
    </div>
  );
}

const floatingIcons = [
  { icon: "💻", top: "10%", left: "5%", delay: "0s", duration: "7s" },
  { icon: "🚀", top: "20%", right: "8%", delay: "1s", duration: "6s" },
  { icon: "⚡", top: "60%", left: "3%", delay: "2s", duration: "8s" },
  { icon: "🎯", bottom: "20%", right: "5%", delay: "0.5s", duration: "7s" },
  { icon: "✨", top: "40%", right: "3%", delay: "1.5s", duration: "5s" },
  { icon: "🔮", bottom: "30%", left: "8%", delay: "3s", duration: "6s" },
];

const navItems = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "CEO Automation", href: "/ceo-automation" },
  { label: "Services", href: "/services" },
  { label: "Employee", href: "/employee" },
  { label: "Clients", href: "/clients" },
  { label: "Accounts", href: "/accounts" },
  { label: "Reports", href: "/reports" },
  { label: "Settings", href: "/settings" },
];

interface Task {
  id: string;
  title: string;
  assignedTo: string;
  dueDate: string;
  status: "Not Started" | "In Progress" | "Completed" | "On Hold";
  priority: "High" | "Medium" | "Low";
  description: string;
}

export default function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([
    // High Priority - Completed
    {
      id: "1",
      title: "Client Meeting Preparation",
      assignedTo: "Jane Smith",
      dueDate: "2024-01-18",
      status: "Completed",
      priority: "High",
      description: "Prepare presentation and agenda for client meeting",
    },

    // High Priority - In Progress
    {
      id: "2",
      title: "Complete Project Documentation",
      assignedTo: "John Doe",
      dueDate: "2024-01-20",
      status: "In Progress",
      priority: "High",
      description: "Prepare comprehensive documentation for the new project",
    },
    {
      id: "3",
      title: "Implement Authentication Module",
      assignedTo: "Mike Johnson",
      dueDate: "2024-01-19",
      status: "In Progress",
      priority: "High",
      description: "Develop user authentication system with JWT tokens",
    },
    {
      id: "4",
      title: "Design Database Schema",
      assignedTo: "John Doe",
      dueDate: "2024-01-21",
      status: "In Progress",
      priority: "High",
      description: "Create and optimize database schema for new features",
    },

    // High Priority - Not Started
    {
      id: "5",
      title: "API Integration with Payment Gateway",
      assignedTo: "Mike Johnson",
      dueDate: "2024-01-25",
      status: "Not Started",
      priority: "High",
      description: "Integrate Stripe/PayPal payment gateway into application",
    },
    {
      id: "6",
      title: "Security Audit and Testing",
      assignedTo: "Jane Smith",
      dueDate: "2024-01-26",
      status: "Not Started",
      priority: "High",
      description: "Conduct comprehensive security audit and penetration testing",
    },

    // Medium Priority - Completed
    {
      id: "7",
      title: "Setup CI/CD Pipeline",
      assignedTo: "John Doe",
      dueDate: "2024-01-17",
      status: "Completed",
      priority: "Medium",
      description: "Configure GitHub Actions and deployment pipeline",
    },

    // Medium Priority - In Progress
    {
      id: "8",
      title: "Code Review",
      assignedTo: "Mike Johnson",
      dueDate: "2024-01-22",
      status: "In Progress",
      priority: "Medium",
      description: "Review pull requests and provide feedback",
    },
    {
      id: "9",
      title: "Implement Caching Strategy",
      assignedTo: "Jane Smith",
      dueDate: "2024-01-23",
      status: "In Progress",
      priority: "Medium",
      description: "Implement Redis caching for improved performance",
    },
    {
      id: "10",
      title: "UI/UX Design Review",
      assignedTo: "Mike Johnson",
      dueDate: "2024-01-24",
      status: "In Progress",
      priority: "Medium",
      description: "Review and provide feedback on UI/UX designs",
    },

    // Medium Priority - On Hold
    {
      id: "11",
      title: "Database Optimization",
      assignedTo: "John Doe",
      dueDate: "2024-01-25",
      status: "On Hold",
      priority: "Medium",
      description: "Optimize database queries for better performance",
    },
    {
      id: "12",
      title: "Mobile App Development",
      assignedTo: "Jane Smith",
      dueDate: "2024-01-30",
      status: "On Hold",
      priority: "Medium",
      description: "Develop mobile application for iOS and Android",
    },

    // Medium Priority - Not Started
    {
      id: "13",
      title: "API Documentation",
      assignedTo: "Mike Johnson",
      dueDate: "2024-01-28",
      status: "Not Started",
      priority: "Medium",
      description: "Write comprehensive API documentation with examples",
    },
    {
      id: "14",
      title: "Performance Testing",
      assignedTo: "Jane Smith",
      dueDate: "2024-01-29",
      status: "Not Started",
      priority: "Medium",
      description: "Conduct load testing and performance benchmarking",
    },

    // Low Priority - Completed
    {
      id: "15",
      title: "Update Dependencies",
      assignedTo: "John Doe",
      dueDate: "2024-01-15",
      status: "Completed",
      priority: "Low",
      description: "Update npm packages to latest stable versions",
    },

    // Low Priority - In Progress
    {
      id: "16",
      title: "Improve Code Documentation",
      assignedTo: "Jane Smith",
      dueDate: "2024-01-23",
      status: "In Progress",
      priority: "Low",
      description: "Add JSDoc comments and improve code readability",
    },

    // Low Priority - Not Started
    {
      id: "17",
      title: "Update User Manual",
      assignedTo: "Jane Smith",
      dueDate: "2024-01-28",
      status: "Not Started",
      priority: "Low",
      description: "Update user manual with new features and improvements",
    },
    {
      id: "18",
      title: "Create Tutorial Videos",
      assignedTo: "Mike Johnson",
      dueDate: "2024-02-01",
      status: "Not Started",
      priority: "Low",
      description: "Record and edit tutorial videos for new features",
    },
    {
      id: "19",
      title: "Refactor Legacy Code",
      assignedTo: "John Doe",
      dueDate: "2024-02-05",
      status: "Not Started",
      priority: "Low",
      description: "Refactor old codebase for improved maintainability",
    },
    {
      id: "20",
      title: "Setup Analytics Dashboard",
      assignedTo: "Mike Johnson",
      dueDate: "2024-02-10",
      status: "Not Started",
      priority: "Low",
      description: "Setup Google Analytics and custom tracking",
    },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800";
      case "In Progress":
        return "bg-blue-100 text-blue-800";
      case "Not Started":
        return "bg-gray-100 text-gray-800";
      case "On Hold":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "text-red-600";
      case "Medium":
        return "text-yellow-600";
      case "Low":
        return "text-green-600";
      default:
        return "text-gray-600";
    }
  };

  const toggleTaskStatus = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              status: task.status === "Completed" ? "In Progress" : "Completed",
            }
          : task
      )
    );
  };

  const completedTasks = tasks.filter((t) => t.status === "Completed").length;
  const inProgressTasks = tasks.filter((t) => t.status === "In Progress").length;
  const notStartedTasks = tasks.filter((t) => t.status === "Not Started").length;

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-amber-50 overflow-hidden">
      {floatingIcons.map((item, index) => (
        <FloatingIcon key={index} icon={item.icon} style={{ top: item.top, left: item.left, right: item.right, bottom: item.bottom, animationDelay: item.delay, animationDuration: item.duration } as React.CSSProperties} />
      ))}

      <div className="absolute top-0 left-0 w-96 h-96 bg-orange-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: "1s" }} />
      <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-amber-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: "2s" }} />

      <MobileLayout title="Tasks" backLink="/employee" navItems={navItems}>
        <div className="p-4 md:p-8">
          {/* Task Summary */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-lg p-4 border border-white/30 text-center">
              <div className="text-3xl mb-2">📋</div>
              <p className="text-sm text-gray-600">Total Tasks</p>
              <p className="text-2xl font-bold text-gray-800">{tasks.length}</p>
            </div>
            <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-lg p-4 border border-white/30 text-center">
              <div className="text-3xl mb-2">✅</div>
              <p className="text-sm text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-green-600">{completedTasks}</p>
            </div>
            <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-lg p-4 border border-white/30 text-center">
              <div className="text-3xl mb-2">⏳</div>
              <p className="text-sm text-gray-600">In Progress</p>
              <p className="text-2xl font-bold text-blue-600">{inProgressTasks}</p>
            </div>
            <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-lg p-4 border border-white/30 text-center">
              <div className="text-3xl mb-2">📅</div>
              <p className="text-sm text-gray-600">Not Started</p>
              <p className="text-2xl font-bold text-gray-600">{notStartedTasks}</p>
            </div>
          </div>

          {/* Tasks List */}
          <div className="space-y-4">
            {tasks.map((task) => (
              <div key={task.id} className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-lg p-6 border border-white/30 hover:shadow-xl transition-shadow">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <button
                        onClick={() => toggleTaskStatus(task.id)}
                        className={`flex-shrink-0 w-6 h-6 rounded border-2 flex items-center justify-center transition-all ${
                          task.status === "Completed"
                            ? "bg-green-500 border-green-500"
                            : "border-gray-300 hover:border-green-500"
                        }`}
                      >
                        {task.status === "Completed" && <span className="text-white font-bold">✓</span>}
                      </button>
                      <h3 className={`text-lg font-semibold ${task.status === "Completed" ? "line-through text-gray-500" : "text-gray-800"}`}>
                        {task.title}
                      </h3>
                    </div>
                    <p className="text-sm text-gray-600 ml-9 mb-3">{task.description}</p>
                    <div className="flex flex-wrap items-center gap-3 ml-9">
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">📌 {task.assignedTo}</span>
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">📅 {task.dueDate}</span>
                      <span className={`text-xs font-semibold ${getPriorityColor(task.priority)}`}>
                        {task.priority === "High" ? "🔴" : task.priority === "Medium" ? "🟡" : "🟢"} {task.priority}
                      </span>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(task.status)}`}>
                      {task.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </MobileLayout>
    </div>
  );
}
