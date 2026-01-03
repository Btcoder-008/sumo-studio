"use client";

import { MobileLayout } from "@/app/components/MobileLayout";
import { useState } from "react";
import React from "react";

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

interface CheckInTime {
  id: string;
  checkInTime: string;
  checkOutTime?: string;
}

interface PerformanceRecord {
  id: string;
  employeeId: string;
  name: string;
  productivity: number;
  teamwork: number;
  communication: number;
  punctuality: number;
  overallScore: number;
  comments: string;
  reviewDate: string;
}

interface PerformanceFormData {
  employeeId: string;
  name: string;
  productivity: number;
  teamwork: number;
  communication: number;
  punctuality: number;
  comments: string;
  reviewDate: string;
}

export default function Performance() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [performanceRecords, setPerformanceRecords] = useState<PerformanceRecord[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<PerformanceFormData>({
    employeeId: "",
    name: "",
    productivity: 80,
    teamwork: 80,
    communication: 80,
    punctuality: 80,
    comments: "",
    reviewDate: new Date().toISOString().split("T")[0],
  });

  // Load employees and performance records from localStorage on mount
  React.useEffect(() => {
    const savedEmployees = localStorage.getItem("employee_list");
    const savedPerformance = localStorage.getItem("employee_performance");

    if (savedEmployees) {
      setEmployees(JSON.parse(savedEmployees));
    }
    if (savedPerformance) {
      setPerformanceRecords(JSON.parse(savedPerformance));
    }
  }, []);

  const handleAddClick = () => {
    setFormData({
      employeeId: "",
      name: "",
      productivity: 80,
      teamwork: 80,
      communication: 80,
      punctuality: 80,
      comments: "",
      reviewDate: new Date().toISOString().split("T")[0],
    });
    setEditingId(null);
    setShowForm(true);
  };

  const handleEditClick = (record: PerformanceRecord) => {
    setFormData({
      employeeId: record.employeeId,
      name: record.name,
      productivity: record.productivity,
      teamwork: record.teamwork,
      communication: record.communication,
      punctuality: record.punctuality,
      comments: record.comments,
      reviewDate: record.reviewDate,
    });
    setEditingId(record.id);
    setShowForm(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === "employeeId") {
      const selectedEmployee = employees.find((emp) => emp.id === value);
      setFormData((prev) => ({
        ...prev,
        employeeId: value,
        name: selectedEmployee?.name || "",
      }));
    } else if (["productivity", "teamwork", "communication", "punctuality"].includes(name)) {
      setFormData((prev) => ({
        ...prev,
        [name]: parseInt(value) || 0,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.employeeId) {
      alert("Please select an employee");
      return;
    }

    const overallScore = Math.round(
      (formData.productivity + formData.teamwork + formData.communication + formData.punctuality) / 4
    );

    let updatedRecords: PerformanceRecord[];
    if (editingId) {
      updatedRecords = performanceRecords.map((record) =>
        record.id === editingId
          ? {
              ...record,
              employeeId: formData.employeeId,
              name: formData.name,
              productivity: formData.productivity,
              teamwork: formData.teamwork,
              communication: formData.communication,
              punctuality: formData.punctuality,
              overallScore: overallScore,
              comments: formData.comments,
              reviewDate: formData.reviewDate,
            }
          : record
      );
    } else {
      updatedRecords = [
        {
          id: Math.random().toString(36).substr(2, 9),
          employeeId: formData.employeeId,
          name: formData.name,
          productivity: formData.productivity,
          teamwork: formData.teamwork,
          communication: formData.communication,
          punctuality: formData.punctuality,
          overallScore: overallScore,
          comments: formData.comments,
          reviewDate: formData.reviewDate,
        },
        ...performanceRecords,
      ];
    }
    setPerformanceRecords(updatedRecords);
    localStorage.setItem("employee_performance", JSON.stringify(updatedRecords));
    setShowForm(false);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this performance review?")) {
      const updated = performanceRecords.filter((record) => record.id !== id);
      setPerformanceRecords(updated);
      localStorage.setItem("employee_performance", JSON.stringify(updated));
    }
  };

  const getRatingColor = (score: number) => {
    if (score >= 90) return "text-green-600";
    if (score >= 80) return "text-blue-600";
    if (score >= 70) return "text-yellow-600";
    return "text-red-600";
  };

  const getRatingBgColor = (score: number) => {
    if (score >= 90) return "bg-green-100";
    if (score >= 80) return "bg-blue-100";
    if (score >= 70) return "bg-yellow-100";
    return "bg-red-100";
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 overflow-hidden">
      {floatingIcons.map((item, index) => (
        <FloatingIcon key={index} icon={item.icon} style={{ top: item.top, left: item.left, right: item.right, bottom: item.bottom, animationDelay: item.delay, animationDuration: item.duration } as React.CSSProperties} />
      ))}

      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: "1s" }} />
      <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-rose-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: "2s" }} />

      <MobileLayout title="Performance 📊" backLink="/employee" navItems={navItems}>
        <div className="p-4 md:p-8">
          {/* Add Performance Button */}
          <div className="mb-6">
            <button
              onClick={handleAddClick}
              className="w-full md:w-auto px-6 py-3 bg-gradient-to-r from-purple-400 to-pink-400 text-gray-800 font-semibold rounded-lg hover:shadow-lg transition-all"
            >
              + Add Performance Review
            </button>
          </div>

          {/* Performance Cards */}
          <div className="space-y-6">
            {performanceRecords.length === 0 ? (
              <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl p-8 border border-white/30 text-center">
                <p className="text-gray-500 text-lg">No performance reviews yet. Click "+ Add Performance Review" to get started.</p>
              </div>
            ) : (
              performanceRecords.map((employee) => (
                <div key={employee.id} className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl p-6 md:p-8 border border-white/30">
                  {/* Employee Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold text-gray-800">{employee.name}</h3>
                      <p className="text-sm text-gray-600 mt-1">Performance Review • {employee.reviewDate}</p>
                    </div>
                    <div className={`${getRatingBgColor(employee.overallScore)} ${getRatingColor(employee.overallScore)} w-20 h-20 rounded-full flex items-center justify-center text-center flex-shrink-0`}>
                      <div>
                        <p className="text-3xl font-bold">{employee.overallScore}</p>
                        <p className="text-xs">Score</p>
                      </div>
                    </div>
                  </div>

                  {/* Performance Metrics */}
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-6">
                    {[
                      { label: "Productivity", value: employee.productivity },
                      { label: "Teamwork", value: employee.teamwork },
                      { label: "Communication", value: employee.communication },
                      { label: "Punctuality", value: employee.punctuality },
                      { label: "Rating", value: employee.overallScore },
                    ].map((metric, idx) => (
                      <div key={idx} className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-200">
                        <p className="text-xs text-gray-600 mb-2">{metric.label}</p>
                        <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                          <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full" style={{ width: `${metric.value}%` }} />
                        </div>
                        <p className="text-lg font-bold text-gray-800">{metric.value}%</p>
                      </div>
                    ))}
                  </div>

                  {/* Feedback Section */}
                  <div className="pt-6 border-t border-gray-200 mb-6">
                    <p className="text-sm font-semibold text-gray-700 mb-3">Comments</p>
                    <p className="text-sm text-gray-600">{employee.comments}</p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-4 border-t border-gray-200">
                    <button
                      onClick={() => handleEditClick(employee)}
                      className="px-4 py-2 bg-purple-500 text-white font-semibold rounded-lg hover:bg-purple-600 transition-all text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(employee.id)}
                      className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-all text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </MobileLayout>

      {/* Add/Edit Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-40 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800">{editingId ? "Edit Performance Review" : "Add New Performance Review"}</h2>
              <button onClick={() => setShowForm(false)} className="text-gray-500 hover:text-gray-700 text-2xl font-bold">
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Employee *</label>
                <select
                  name="employeeId"
                  value={formData.employeeId}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-400"
                  required
                >
                  <option value="">Select Employee</option>
                  {employees.map((emp) => (
                    <option key={emp.id} value={emp.id}>
                      {emp.name} ({emp.position})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Review Date</label>
                <input
                  type="date"
                  name="reviewDate"
                  value={formData.reviewDate}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Productivity (%)</label>
                  <input
                    type="range"
                    name="productivity"
                    min="0"
                    max="100"
                    value={formData.productivity}
                    onChange={handleInputChange}
                    className="w-full"
                  />
                  <p className="text-center text-lg font-bold text-gray-800 mt-1">{formData.productivity}%</p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Teamwork (%)</label>
                  <input
                    type="range"
                    name="teamwork"
                    min="0"
                    max="100"
                    value={formData.teamwork}
                    onChange={handleInputChange}
                    className="w-full"
                  />
                  <p className="text-center text-lg font-bold text-gray-800 mt-1">{formData.teamwork}%</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Communication (%)</label>
                  <input
                    type="range"
                    name="communication"
                    min="0"
                    max="100"
                    value={formData.communication}
                    onChange={handleInputChange}
                    className="w-full"
                  />
                  <p className="text-center text-lg font-bold text-gray-800 mt-1">{formData.communication}%</p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Punctuality (%)</label>
                  <input
                    type="range"
                    name="punctuality"
                    min="0"
                    max="100"
                    value={formData.punctuality}
                    onChange={handleInputChange}
                    className="w-full"
                  />
                  <p className="text-center text-lg font-bold text-gray-800 mt-1">{formData.punctuality}%</p>
                </div>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">
                  Overall Score: <span className="font-bold text-purple-600">{Math.round((formData.productivity + formData.teamwork + formData.communication + formData.punctuality) / 4)}%</span>
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Comments</label>
                <textarea
                  name="comments"
                  value={formData.comments}
                  onChange={handleInputChange}
                  placeholder="Enter performance review comments..."
                  rows={4}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-400"
                />
              </div>

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
                  {editingId ? "Update Review" : "Add Review"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
