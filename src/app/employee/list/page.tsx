"use client";

import { useState } from "react";
import React from "react";
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
  { icon: "👥", top: "10%", left: "5%", delay: "0s", duration: "7s" },
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

interface CheckInTime {
  id: string;
  checkInTime: string;
  checkOutTime?: string;
}

interface Position {
  id: string;
  name: string;
  description?: string;
}

interface Department {
  id: string;
  name: string;
  description?: string;
}

interface Employee {
  id: string;
  name: string;
  position: string;
  rfid: string;
  department: string;
  salary?: number;
  status: "Active" | "Inactive";
  joinDate: string;
  checkInTimes: CheckInTime[];
}

interface EmployeeFormData {
  name: string;
  position: string;
  rfid: string;
  department: string;
  salary: string;
  status: "Active" | "Inactive";
  joinDate: string;
  checkInTimes: CheckInTime[];
}

export default function EmployeeListPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [positions, setPositions] = useState<Position[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<EmployeeFormData>({
    name: "",
    position: "",
    rfid: "",
    department: "",
    salary: "",
    status: "Active",
    joinDate: new Date().toISOString().split("T")[0],
    checkInTimes: [{ id: "1", checkInTime: "", checkOutTime: "" }],
  });

  // Load data from localStorage on mount
  React.useEffect(() => {
    const savedEmployees = localStorage.getItem("employee_list");
    const savedPositions = localStorage.getItem("employee_positions");
    const savedDepartments = localStorage.getItem("employee_departments");

    if (savedEmployees) {
      setEmployees(JSON.parse(savedEmployees));
    }
    if (savedPositions) {
      setPositions(JSON.parse(savedPositions));
    }
    if (savedDepartments) {
      setDepartments(JSON.parse(savedDepartments));
    }
  }, []);

  const handleAddClick = () => {
    setFormData({
      name: "",
      position: "",
      rfid: "",
      department: "",
      salary: "",
      status: "Active",
      joinDate: new Date().toISOString().split("T")[0],
      checkInTimes: [{ id: "1", checkInTime: "", checkOutTime: "" }],
    });
    setEditingId(null);
    setShowForm(true);
  };

  const handleEditClick = (employee: Employee) => {
    setFormData({
      name: employee.name,
      position: employee.position,
      rfid: employee.rfid,
      department: employee.department,
      salary: employee.salary?.toString() || "",
      status: employee.status,
      joinDate: employee.joinDate,
      checkInTimes: employee.checkInTimes || [{ id: "1", checkInTime: "", checkOutTime: "" }],
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

  const handleCheckInChange = (id: string, field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      checkInTimes: prev.checkInTimes.map((time) =>
        time.id === id ? { ...time, [field]: value } : time
      ),
    }));
  };

  const addCheckInTime = () => {
    const newId = Math.random().toString(36).substr(2, 9);
    setFormData((prev) => ({
      ...prev,
      checkInTimes: [...prev.checkInTimes, { id: newId, checkInTime: "", checkOutTime: "" }],
    }));
  };

  const removeCheckInTime = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      checkInTimes: prev.checkInTimes.filter((time) => time.id !== id),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.rfid || !formData.position) {
      alert("Please fill in all required fields");
      return;
    }

    let updatedEmployees: Employee[];
    if (editingId) {
      updatedEmployees = employees.map((emp) =>
        emp.id === editingId
          ? {
              ...emp,
              name: formData.name,
              position: formData.position,
              rfid: formData.rfid,
              department: formData.department,
              salary: formData.salary ? parseInt(formData.salary) : undefined,
              status: formData.status,
              joinDate: formData.joinDate,
              checkInTimes: formData.checkInTimes,
            }
          : emp
      );
    } else {
      const newEmployee: Employee = {
        id: Math.random().toString(36).substr(2, 9),
        name: formData.name,
        position: formData.position,
        rfid: formData.rfid,
        department: formData.department,
        salary: formData.salary ? parseInt(formData.salary) : undefined,
        status: formData.status,
        joinDate: formData.joinDate,
        checkInTimes: formData.checkInTimes,
      };
      updatedEmployees = [newEmployee, ...employees];
    }

    setEmployees(updatedEmployees);
    localStorage.setItem("employee_list", JSON.stringify(updatedEmployees));
    setShowForm(false);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this employee?")) {
      const updated = employees.filter((emp) => emp.id !== id);
      setEmployees(updated);
      localStorage.setItem("employee_list", JSON.stringify(updated));
    }
  };

  const getStatusColor = (status: string) => {
    return status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800";
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-red-50 overflow-hidden">
      {floatingIcons.map((item, index) => (
        <FloatingIcon key={index} icon={item.icon} style={{ top: item.top, left: item.left, right: item.right, bottom: item.bottom, animationDelay: item.delay, animationDuration: item.duration } as React.CSSProperties} />
      ))}

      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: "1s" }} />
      <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-red-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: "2s" }} />

      <MobileLayout title="Employees 👥" backLink="/employee" navItems={navItems}>
        <div className="p-4 md:p-8">
          {/* Add Employee Button */}
          <div className="mb-6">
            <button
              onClick={handleAddClick}
              className="w-full md:w-auto px-6 py-3 bg-gradient-to-r from-purple-400 to-pink-400 text-gray-800 font-semibold rounded-lg hover:shadow-lg transition-all"
            >
              + Add Employee
            </button>
          </div>

          {/* Employees Table */}
          <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl p-6 md:p-8 border border-white/30">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Employees ({employees.length})</h2>
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
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">RFID</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Check-In Times</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {employees.map((emp) => (
                      <tr key={emp.id} className="border-b border-gray-200 hover:bg-purple-50/50 transition-colors">
                        <td className="py-3 px-4 text-sm text-gray-700 font-medium">{emp.name}</td>
                        <td className="py-3 px-4 text-sm text-gray-600">{emp.position}</td>
                        <td className="py-3 px-4 text-sm text-gray-600">{emp.department}</td>
                        <td className="py-3 px-4 text-sm text-gray-600 font-mono">{emp.rfid}</td>
                        <td className="py-3 px-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(emp.status)}`}>
                            {emp.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-xs text-gray-600">
                          {emp.checkInTimes.length} time(s)
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
      </MobileLayout>

      {/* Add/Edit Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-40 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800">{editingId ? "Edit Employee" : "Add New Employee"}</h2>
              <button
                onClick={() => setShowForm(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Basic Info */}
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-4">Basic Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-400"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">RFID *</label>
                    <input
                      type="text"
                      name="rfid"
                      value={formData.rfid}
                      onChange={handleInputChange}
                      placeholder="RFID-123456789"
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-400 font-mono"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Position *</label>
                    <select
                      name="position"
                      value={formData.position}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-400"
                      required
                    >
                      <option value="">Select Position</option>
                      {positions.map((pos) => (
                        <option key={pos.id} value={pos.name}>
                          {pos.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Department *</label>
                    <select
                      name="department"
                      value={formData.department}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-400"
                      required
                    >
                      <option value="">Select Department</option>
                      {departments.map((dept) => (
                        <option key={dept.id} value={dept.name}>
                          {dept.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Salary</label>
                    <input
                      type="number"
                      name="salary"
                      value={formData.salary}
                      onChange={handleInputChange}
                      placeholder="120000"
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-400"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Join Date</label>
                    <input
                      type="date"
                      name="joinDate"
                      value={formData.joinDate}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-400"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-400"
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Check-In Times */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-800">Check-In Times</h3>
                  <button
                    type="button"
                    onClick={addCheckInTime}
                    className="px-3 py-1 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-all text-sm"
                  >
                    + Add Time
                  </button>
                </div>

                <div className="space-y-3">
                  {formData.checkInTimes.map((time, index) => (
                    <div key={time.id} className="flex gap-3 items-end bg-purple-50 p-3 rounded-lg">
                      <div className="flex-1">
                        <label className="block text-xs font-semibold text-gray-700 mb-1">Check-In Time</label>
                        <input
                          type="time"
                          value={time.checkInTime}
                          onChange={(e) => handleCheckInChange(time.id, "checkInTime", e.target.value)}
                          className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-400 text-sm"
                        />
                      </div>
                      <div className="flex-1">
                        <label className="block text-xs font-semibold text-gray-700 mb-1">Check-Out Time</label>
                        <input
                          type="time"
                          value={time.checkOutTime || ""}
                          onChange={(e) => handleCheckInChange(time.id, "checkOutTime", e.target.value)}
                          className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-400 text-sm"
                        />
                      </div>
                      {formData.checkInTimes.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeCheckInTime(time.id)}
                          className="px-3 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-all text-sm"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  ))}
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
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-400 to-pink-400 text-gray-800 font-semibold rounded-lg hover:shadow-lg transition-all"
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
