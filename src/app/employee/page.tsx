"use client";

import { useState } from "react";
import Link from "next/link";
import { MobileLayout } from "@/app/components/MobileLayout";

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

const employeeModules = [
  {
    id: "attendance",
    label: "Attendance",
    icon: "👔",
    description: "Track employee attendance and working hours",
    href: "/employee/attendance",
    color: "bg-blue-500",
  },
  {
    id: "payroll",
    label: "Payroll",
    icon: "💰",
    description: "Manage employee salaries and payments",
    href: "/employee/payroll",
    color: "bg-green-500",
  },
  {
    id: "performance",
    label: "Performance",
    icon: "📊",
    description: "View employee performance reports",
    href: "/employee/performance",
    color: "bg-purple-500",
  },
  {
    id: "tasks",
    label: "Tasks",
    icon: "✓",
    description: "View and manage all tasks and assignments",
    href: "/employee/tasks",
    color: "bg-orange-500",
  },
];

interface Employee {
  id: string;
  name: string;
  position: string;
  email: string;
  department: string;
  salary?: number;
  status: "Active" | "Inactive";
  joinDate: string;
}

interface EmployeeFormData {
  name: string;
  position: string;
  email: string;
  department: string;
  salary: string;
  status: "Active" | "Inactive";
  joinDate: string;
}

export default function Employee() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<EmployeeFormData>({
    name: "",
    position: "",
    email: "",
    department: "",
    salary: "",
    status: "Active",
    joinDate: new Date().toISOString().split("T")[0],
  });

  const handleAddClick = () => {
    setFormData({
      name: "",
      position: "",
      email: "",
      department: "",
      salary: "",
      status: "Active",
      joinDate: new Date().toISOString().split("T")[0],
    });
    setEditingId(null);
    setShowForm(true);
  };

  const handleEditClick = (employee: Employee) => {
    setFormData({
      name: employee.name,
      position: employee.position,
      email: employee.email,
      department: employee.department,
      salary: employee.salary?.toString() || "",
      status: employee.status,
      joinDate: employee.joinDate,
    });
    setEditingId(employee.id);
    setShowForm(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.position) {
      alert("Please fill in all required fields");
      return;
    }

    if (editingId) {
      setEmployees((prev) =>
        prev.map((emp) =>
          emp.id === editingId
            ? {
                ...emp,
                name: formData.name,
                position: formData.position,
                email: formData.email,
                department: formData.department,
                salary: formData.salary ? parseInt(formData.salary) : undefined,
                status: formData.status,
                joinDate: formData.joinDate,
              }
            : emp
        )
      );
    } else {
      const newEmployee: Employee = {
        id: Math.random().toString(36).substr(2, 9),
        name: formData.name,
        position: formData.position,
        email: formData.email,
        department: formData.department,
        salary: formData.salary ? parseInt(formData.salary) : undefined,
        status: formData.status,
        joinDate: formData.joinDate,
      };
      setEmployees((prev) => [newEmployee, ...prev]);
    }

    setShowForm(false);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this employee?")) {
      setEmployees((prev) => prev.filter((emp) => emp.id !== id));
    }
  };

  const getStatusColor = (status: string) => {
    return status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800";
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-pink-50 overflow-hidden">
      {floatingIcons.map((item, index) => (
        <FloatingIcon key={index} icon={item.icon} style={{ top: item.top, left: item.left, right: item.right, bottom: item.bottom, animationDelay: item.delay, animationDuration: item.duration } as React.CSSProperties} />
      ))}

      <div className="absolute top-0 left-0 w-96 h-96 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-orange-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: "1s" }} />
      <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: "2s" }} />

      <MobileLayout title="Employee Management" backLink="/dashboard" navItems={navItems}>
        <div className="p-4 md:p-8">
          {/* Employee Modules Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Modules</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {employeeModules.map((module) => (
                <Link key={module.id} href={module.href}>
                  <div className="group relative bg-white/70 backdrop-blur-lg rounded-2xl shadow-lg p-8 border border-white/30 cursor-pointer hover:shadow-2xl hover:scale-105 transition-all duration-300">
                    {/* Background gradient circle */}
                    <div className={`absolute inset-0 ${module.color} rounded-2xl opacity-10 group-hover:opacity-20 transition-opacity`} />

                    {/* Icon container */}
                    <div className={`relative ${module.color} w-16 h-16 rounded-xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <span className="text-4xl">{module.icon}</span>
                    </div>

                    {/* Content */}
                    <div className="relative">
                      <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2 group-hover:text-gray-900 transition-colors">
                        {module.label}
                      </h3>
                      <p className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors">
                        {module.description}
                      </p>
                    </div>

                    {/* Hover arrow */}
                    <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-2xl text-gray-400 group-hover:text-gray-600">→</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Employee Management Section */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Employees</h2>

            {/* Add Employee Button */}
            <div className="mb-6">
              <button
                onClick={handleAddClick}
                className="w-full md:w-auto px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-800 font-semibold rounded-lg hover:shadow-lg transition-all"
              >
                + Add Employee
              </button>
            </div>

            {/* Employees Table */}
            <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl p-6 md:p-8 border border-white/30">
              {employees.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">No employees yet. Click "Add Employee" to get started.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-300">
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Name</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Position</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Department</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Email</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {employees.map((emp) => (
                        <tr key={emp.id} className="border-b border-gray-200 hover:bg-yellow-50/50 transition-colors">
                          <td className="py-3 px-4 text-sm text-gray-700 font-medium">{emp.name}</td>
                          <td className="py-3 px-4 text-sm text-gray-600">{emp.position}</td>
                          <td className="py-3 px-4 text-sm text-gray-600">{emp.department}</td>
                          <td className="py-3 px-4 text-sm text-gray-600">{emp.email}</td>
                          <td className="py-3 px-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(emp.status)}`}>
                              {emp.status}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <button
                              onClick={() => handleEditClick(emp)}
                              className="text-blue-600 hover:text-blue-800 font-semibold text-sm mr-3"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(emp.id)}
                              className="text-red-600 hover:text-red-800 font-semibold text-sm"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </MobileLayout>

      {/* Modal Overlay */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-40 md:z-40 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800">{editingId ? "Edit Employee" : "Add New Employee"}</h2>
              <button
                onClick={() => setShowForm(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
              >
                ✕
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-yellow-400"
                    required
                  />
                </div>

                {/* Position */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Position *</label>
                  <input
                    type="text"
                    name="position"
                    value={formData.position}
                    onChange={handleInputChange}
                    placeholder="Senior Developer"
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-yellow-400"
                    required
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="john@example.com"
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-yellow-400"
                    required
                  />
                </div>

                {/* Department */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Department</label>
                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-yellow-400"
                  >
                    <option value="">Select Department</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Product">Product</option>
                    <option value="Design">Design</option>
                    <option value="Sales">Sales</option>
                    <option value="Marketing">Marketing</option>
                    <option value="HR">HR</option>
                    <option value="Finance">Finance</option>
                  </select>
                </div>

                {/* Salary */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Salary</label>
                  <input
                    type="number"
                    name="salary"
                    value={formData.salary}
                    onChange={handleInputChange}
                    placeholder="120000"
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-yellow-400"
                  />
                </div>

                {/* Join Date */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Join Date</label>
                  <input
                    type="date"
                    name="joinDate"
                    value={formData.joinDate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-yellow-400"
                  />
                </div>

                {/* Status */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-yellow-400"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex gap-4 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-100 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-800 font-semibold rounded-lg hover:shadow-lg transition-all"
                >
                  {editingId ? "Update Employee" : "Add Employee"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
