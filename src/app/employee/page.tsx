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

const operationsModules = [
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

interface Position {
  id: string;
  name: string;
  description?: string;
}

interface PositionFormData {
  name: string;
  description: string;
}

interface Department {
  id: string;
  name: string;
  description?: string;
}

interface DepartmentFormData {
  name: string;
  description: string;
}

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
  // Positions
  const [positions, setPositions] = useState<Position[]>([]);
  const [showPositionForm, setShowPositionForm] = useState(false);
  const [editingPositionId, setEditingPositionId] = useState<string | null>(null);
  const [positionFormData, setPositionFormData] = useState<PositionFormData>({
    name: "",
    description: "",
  });

  // Departments
  const [departments, setDepartments] = useState<Department[]>([]);
  const [showDepartmentForm, setShowDepartmentForm] = useState(false);
  const [editingDepartmentId, setEditingDepartmentId] = useState<string | null>(null);
  const [departmentFormData, setDepartmentFormData] = useState<DepartmentFormData>({
    name: "",
    description: "",
  });

  // Employees
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [showEmployeeForm, setShowEmployeeForm] = useState(false);
  const [editingEmployeeId, setEditingEmployeeId] = useState<string | null>(null);
  const [employeeFormData, setEmployeeFormData] = useState<EmployeeFormData>({
    name: "",
    position: "",
    email: "",
    department: "",
    salary: "",
    status: "Active",
    joinDate: new Date().toISOString().split("T")[0],
  });

  // Position Handlers
  const handleAddPosition = () => {
    setPositionFormData({ name: "", description: "" });
    setEditingPositionId(null);
    setShowPositionForm(true);
  };

  const handleEditPosition = (position: Position) => {
    setPositionFormData({
      name: position.name,
      description: position.description || "",
    });
    setEditingPositionId(position.id);
    setShowPositionForm(true);
  };

  const handlePositionInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPositionFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePositionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!positionFormData.name) {
      alert("Please enter position name");
      return;
    }

    if (editingPositionId) {
      setPositions((prev) =>
        prev.map((pos) =>
          pos.id === editingPositionId
            ? { ...pos, name: positionFormData.name, description: positionFormData.description }
            : pos
        )
      );
    } else {
      setPositions((prev) => [
        {
          id: Math.random().toString(36).substr(2, 9),
          name: positionFormData.name,
          description: positionFormData.description,
        },
        ...prev,
      ]);
    }
    setShowPositionForm(false);
  };

  const handleDeletePosition = (id: string) => {
    if (confirm("Are you sure you want to delete this position?")) {
      setPositions((prev) => prev.filter((pos) => pos.id !== id));
    }
  };

  // Department Handlers
  const handleAddDepartment = () => {
    setDepartmentFormData({ name: "", description: "" });
    setEditingDepartmentId(null);
    setShowDepartmentForm(true);
  };

  const handleEditDepartment = (department: Department) => {
    setDepartmentFormData({
      name: department.name,
      description: department.description || "",
    });
    setEditingDepartmentId(department.id);
    setShowDepartmentForm(true);
  };

  const handleDepartmentInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setDepartmentFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDepartmentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!departmentFormData.name) {
      alert("Please enter department name");
      return;
    }

    if (editingDepartmentId) {
      setDepartments((prev) =>
        prev.map((dept) =>
          dept.id === editingDepartmentId
            ? { ...dept, name: departmentFormData.name, description: departmentFormData.description }
            : dept
        )
      );
    } else {
      setDepartments((prev) => [
        {
          id: Math.random().toString(36).substr(2, 9),
          name: departmentFormData.name,
          description: departmentFormData.description,
        },
        ...prev,
      ]);
    }
    setShowDepartmentForm(false);
  };

  const handleDeleteDepartment = (id: string) => {
    if (confirm("Are you sure you want to delete this department?")) {
      setDepartments((prev) => prev.filter((dept) => dept.id !== id));
    }
  };

  // Employee Handlers
  const handleAddEmployee = () => {
    setEmployeeFormData({
      name: "",
      position: "",
      email: "",
      department: "",
      salary: "",
      status: "Active",
      joinDate: new Date().toISOString().split("T")[0],
    });
    setEditingEmployeeId(null);
    setShowEmployeeForm(true);
  };

  const handleEditEmployee = (employee: Employee) => {
    setEmployeeFormData({
      name: employee.name,
      position: employee.position,
      email: employee.email,
      department: employee.department,
      salary: employee.salary?.toString() || "",
      status: employee.status,
      joinDate: employee.joinDate,
    });
    setEditingEmployeeId(employee.id);
    setShowEmployeeForm(true);
  };

  const handleEmployeeInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEmployeeFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEmployeeSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!employeeFormData.name || !employeeFormData.email || !employeeFormData.position) {
      alert("Please fill in all required fields");
      return;
    }

    if (editingEmployeeId) {
      setEmployees((prev) =>
        prev.map((emp) =>
          emp.id === editingEmployeeId
            ? {
                ...emp,
                name: employeeFormData.name,
                position: employeeFormData.position,
                email: employeeFormData.email,
                department: employeeFormData.department,
                salary: employeeFormData.salary ? parseInt(employeeFormData.salary) : undefined,
                status: employeeFormData.status,
                joinDate: employeeFormData.joinDate,
              }
            : emp
        )
      );
    } else {
      const newEmployee: Employee = {
        id: Math.random().toString(36).substr(2, 9),
        name: employeeFormData.name,
        position: employeeFormData.position,
        email: employeeFormData.email,
        department: employeeFormData.department,
        salary: employeeFormData.salary ? parseInt(employeeFormData.salary) : undefined,
        status: employeeFormData.status,
        joinDate: employeeFormData.joinDate,
      };
      setEmployees((prev) => [newEmployee, ...prev]);
    }

    setShowEmployeeForm(false);
  };

  const handleDeleteEmployee = (id: string) => {
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
          {/* Positions Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">1. Add Position</h2>

            <div className="mb-6">
              <button
                onClick={handleAddPosition}
                className="w-full md:w-auto px-6 py-3 bg-gradient-to-r from-blue-400 to-cyan-400 text-gray-800 font-semibold rounded-lg hover:shadow-lg transition-all"
              >
                + Add Position
              </button>
            </div>

            <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl p-6 md:p-8 border border-white/30">
              {positions.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">No positions yet. Click "Add Position" to get started.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-300">
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Position Name</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Description</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {positions.map((position) => (
                        <tr key={position.id} className="border-b border-gray-200 hover:bg-blue-50/50 transition-colors">
                          <td className="py-3 px-4 text-sm text-gray-700 font-medium">{position.name}</td>
                          <td className="py-3 px-4 text-sm text-gray-600">{position.description}</td>
                          <td className="py-3 px-4">
                            <button
                              onClick={() => handleEditPosition(position)}
                              className="text-blue-600 hover:text-blue-800 font-semibold text-sm mr-3"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeletePosition(position.id)}
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

          {/* Departments Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">2. Add Department</h2>

            <div className="mb-6">
              <button
                onClick={handleAddDepartment}
                className="w-full md:w-auto px-6 py-3 bg-gradient-to-r from-green-400 to-emerald-400 text-gray-800 font-semibold rounded-lg hover:shadow-lg transition-all"
              >
                + Add Department
              </button>
            </div>

            <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl p-6 md:p-8 border border-white/30">
              {departments.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">No departments yet. Click "Add Department" to get started.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-300">
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Department Name</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Description</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {departments.map((department) => (
                        <tr key={department.id} className="border-b border-gray-200 hover:bg-green-50/50 transition-colors">
                          <td className="py-3 px-4 text-sm text-gray-700 font-medium">{department.name}</td>
                          <td className="py-3 px-4 text-sm text-gray-600">{department.description}</td>
                          <td className="py-3 px-4">
                            <button
                              onClick={() => handleEditDepartment(department)}
                              className="text-blue-600 hover:text-blue-800 font-semibold text-sm mr-3"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteDepartment(department.id)}
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

          {/* Employees Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">3. Add Employee</h2>

            <div className="mb-6">
              <button
                onClick={handleAddEmployee}
                className="w-full md:w-auto px-6 py-3 bg-gradient-to-r from-purple-400 to-pink-400 text-gray-800 font-semibold rounded-lg hover:shadow-lg transition-all"
              >
                + Add Employee
              </button>
            </div>

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
                        <tr key={emp.id} className="border-b border-gray-200 hover:bg-purple-50/50 transition-colors">
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
                              onClick={() => handleEditEmployee(emp)}
                              className="text-blue-600 hover:text-blue-800 font-semibold text-sm mr-3"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteEmployee(emp.id)}
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

          {/* Operations Section */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">2. Operations</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {operationsModules.map((module) => (
                <Link key={module.id} href={module.href}>
                  <div className="group relative bg-white/70 backdrop-blur-lg rounded-2xl shadow-lg p-8 border border-white/30 cursor-pointer hover:shadow-2xl hover:scale-105 transition-all duration-300">
                    <div className={`absolute inset-0 ${module.color} rounded-2xl opacity-10 group-hover:opacity-20 transition-opacity`} />
                    <div className={`relative ${module.color} w-16 h-16 rounded-xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <span className="text-4xl">{module.icon}</span>
                    </div>
                    <div className="relative">
                      <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2 group-hover:text-gray-900 transition-colors">
                        2.{module.id === "attendance" ? "1" : module.id === "payroll" ? "2" : module.id === "performance" ? "3" : "4"} {module.label}
                      </h3>
                      <p className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors">
                        {module.description}
                      </p>
                    </div>
                    <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-2xl text-gray-400 group-hover:text-gray-600">→</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </MobileLayout>

      {/* Position Modal */}
      {showPositionForm && (
        <div className="fixed inset-0 bg-black/50 z-40 md:z-40 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800">{editingPositionId ? "Edit Position" : "Add New Position"}</h2>
              <button
                onClick={() => setShowPositionForm(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handlePositionSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Position Name *</label>
                <input
                  type="text"
                  name="name"
                  value={positionFormData.name}
                  onChange={handlePositionInputChange}
                  placeholder="Senior Developer"
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                <textarea
                  name="description"
                  value={positionFormData.description}
                  onChange={handlePositionInputChange}
                  placeholder="Position description..."
                  rows={4}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
                />
              </div>

              <div className="flex gap-4 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setShowPositionForm(false)}
                  className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-100 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-400 to-cyan-400 text-gray-800 font-semibold rounded-lg hover:shadow-lg transition-all"
                >
                  {editingPositionId ? "Update Position" : "Add Position"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Department Modal */}
      {showDepartmentForm && (
        <div className="fixed inset-0 bg-black/50 z-40 md:z-40 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800">{editingDepartmentId ? "Edit Department" : "Add New Department"}</h2>
              <button
                onClick={() => setShowDepartmentForm(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleDepartmentSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Department Name *</label>
                <input
                  type="text"
                  name="name"
                  value={departmentFormData.name}
                  onChange={handleDepartmentInputChange}
                  placeholder="Engineering"
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-400"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                <textarea
                  name="description"
                  value={departmentFormData.description}
                  onChange={handleDepartmentInputChange}
                  placeholder="Department description..."
                  rows={4}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-400"
                />
              </div>

              <div className="flex gap-4 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setShowDepartmentForm(false)}
                  className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-100 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-green-400 to-emerald-400 text-gray-800 font-semibold rounded-lg hover:shadow-lg transition-all"
                >
                  {editingDepartmentId ? "Update Department" : "Add Department"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Employee Modal */}
      {showEmployeeForm && (
        <div className="fixed inset-0 bg-black/50 z-40 md:z-40 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800">{editingEmployeeId ? "Edit Employee" : "Add New Employee"}</h2>
              <button
                onClick={() => setShowEmployeeForm(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleEmployeeSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={employeeFormData.name}
                    onChange={handleEmployeeInputChange}
                    placeholder="John Doe"
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-400"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Position *</label>
                  <input
                    type="text"
                    name="position"
                    value={employeeFormData.position}
                    onChange={handleEmployeeInputChange}
                    placeholder="Senior Developer"
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-400"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={employeeFormData.email}
                    onChange={handleEmployeeInputChange}
                    placeholder="john@example.com"
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-400"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Department</label>
                  <select
                    name="department"
                    value={employeeFormData.department}
                    onChange={handleEmployeeInputChange}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-400"
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

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Salary</label>
                  <input
                    type="number"
                    name="salary"
                    value={employeeFormData.salary}
                    onChange={handleEmployeeInputChange}
                    placeholder="120000"
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-400"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Join Date</label>
                  <input
                    type="date"
                    name="joinDate"
                    value={employeeFormData.joinDate}
                    onChange={handleEmployeeInputChange}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-400"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
                  <select
                    name="status"
                    value={employeeFormData.status}
                    onChange={handleEmployeeInputChange}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-400"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-4 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setShowEmployeeForm(false)}
                  className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-100 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-400 to-pink-400 text-gray-800 font-semibold rounded-lg hover:shadow-lg transition-all"
                >
                  {editingEmployeeId ? "Update Employee" : "Add Employee"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
