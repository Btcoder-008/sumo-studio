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
  checkInTimes: Array<{ id: string; checkInTime: string; checkOutTime?: string }>;
}

interface AttendanceRecord {
  id: string;
  employeeId: string;
  name: string;
  date: string;
  status: "Present" | "Absent" | "Leave" | "Half Day";
  checkIn?: string;
  checkOut?: string;
}

interface AttendanceFormData {
  employeeId: string;
  name: string;
  date: string;
  status: "Present" | "Absent" | "Leave" | "Half Day";
  checkIn: string;
  checkOut: string;
}

export default function Attendance() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<AttendanceFormData>({
    employeeId: "",
    name: "",
    date: new Date().toISOString().split("T")[0],
    status: "Present",
    checkIn: "",
    checkOut: "",
  });

  // Load data from localStorage on mount
  React.useEffect(() => {
    const savedEmployees = localStorage.getItem("employee_list");
    const savedAttendance = localStorage.getItem("employee_attendance");

    if (savedEmployees) {
      setEmployees(JSON.parse(savedEmployees));
    }
    if (savedAttendance) {
      setAttendanceRecords(JSON.parse(savedAttendance));
    }
  }, []);

  const handleAddClick = () => {
    setFormData({
      employeeId: "",
      name: "",
      date: new Date().toISOString().split("T")[0],
      status: "Present",
      checkIn: "",
      checkOut: "",
    });
    setEditingId(null);
    setShowForm(true);
  };

  const handleEditClick = (record: AttendanceRecord) => {
    setFormData({
      employeeId: record.employeeId,
      name: record.name,
      date: record.date,
      status: record.status,
      checkIn: record.checkIn || "",
      checkOut: record.checkOut || "",
    });
    setEditingId(record.id);
    setShowForm(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === "employeeId") {
      const selectedEmployee = employees.find((emp) => emp.id === value);
      setFormData((prev) => ({
        ...prev,
        employeeId: value,
        name: selectedEmployee?.name || "",
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

    if (!formData.employeeId || !formData.date) {
      alert("Please fill in all required fields");
      return;
    }

    let updatedRecords: AttendanceRecord[];
    if (editingId) {
      updatedRecords = attendanceRecords.map((record) =>
        record.id === editingId
          ? {
              ...record,
              employeeId: formData.employeeId,
              name: formData.name,
              date: formData.date,
              status: formData.status,
              checkIn: formData.checkIn || undefined,
              checkOut: formData.checkOut || undefined,
            }
          : record
      );
    } else {
      const newRecord: AttendanceRecord = {
        id: Math.random().toString(36).substr(2, 9),
        employeeId: formData.employeeId,
        name: formData.name,
        date: formData.date,
        status: formData.status,
        checkIn: formData.checkIn || undefined,
        checkOut: formData.checkOut || undefined,
      };
      updatedRecords = [newRecord, ...attendanceRecords];
    }

    setAttendanceRecords(updatedRecords);
    localStorage.setItem("employee_attendance", JSON.stringify(updatedRecords));
    setShowForm(false);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this attendance record?")) {
      const updated = attendanceRecords.filter((record) => record.id !== id);
      setAttendanceRecords(updated);
      localStorage.setItem("employee_attendance", JSON.stringify(updated));
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Present":
        return "bg-green-100 text-green-800";
      case "Absent":
        return "bg-red-100 text-red-800";
      case "Leave":
        return "bg-yellow-100 text-yellow-800";
      case "Half Day":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Calculate statistics
  const totalPresent = attendanceRecords.filter((r) => r.status === "Present").length;
  const totalAbsent = attendanceRecords.filter((r) => r.status === "Absent").length;
  const totalLeave = attendanceRecords.filter((r) => r.status === "Leave").length;
  const avgHours = (
    attendanceRecords
      .filter((r) => r.checkIn && r.checkOut)
      .reduce((sum) => sum + 8.5, 0) / Math.max(attendanceRecords.filter((r) => r.checkIn && r.checkOut).length, 1)
  ).toFixed(1);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 overflow-hidden">
      {floatingIcons.map((item, index) => (
        <FloatingIcon key={index} icon={item.icon} style={{ top: item.top, left: item.left, right: item.right, bottom: item.bottom, animationDelay: item.delay, animationDuration: item.duration } as React.CSSProperties} />
      ))}

      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: "1s" }} />
      <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: "2s" }} />

      <MobileLayout title="Attendance 👔" backLink="/employee" navItems={navItems}>
        <div className="p-4 md:p-8">
          {/* Add Attendance Button */}
          <div className="mb-6">
            <button
              onClick={handleAddClick}
              className="w-full md:w-auto px-6 py-3 bg-gradient-to-r from-blue-400 to-indigo-400 text-gray-800 font-semibold rounded-lg hover:shadow-lg transition-all"
            >
              + Add Attendance
            </button>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-lg p-4 border border-white/30 text-center">
              <div className="text-3xl mb-2">📊</div>
              <p className="text-sm text-gray-600">Total Present</p>
              <p className="text-2xl font-bold text-green-600">{totalPresent}</p>
            </div>
            <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-lg p-4 border border-white/30 text-center">
              <div className="text-3xl mb-2">❌</div>
              <p className="text-sm text-gray-600">Total Absent</p>
              <p className="text-2xl font-bold text-red-600">{totalAbsent}</p>
            </div>
            <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-lg p-4 border border-white/30 text-center">
              <div className="text-3xl mb-2">📅</div>
              <p className="text-sm text-gray-600">Total Leave</p>
              <p className="text-2xl font-bold text-yellow-600">{totalLeave}</p>
            </div>
            <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-lg p-4 border border-white/30 text-center">
              <div className="text-3xl mb-2">⏱️</div>
              <p className="text-sm text-gray-600">Avg Hours</p>
              <p className="text-2xl font-bold text-blue-600">{avgHours}h</p>
            </div>
          </div>

          {/* Attendance Records Table */}
          <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl p-6 md:p-8 border border-white/30">
            <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-6">Daily Attendance Record ({attendanceRecords.length})</h3>
            {attendanceRecords.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No attendance records yet. Click "Add Attendance" to get started.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-300">
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Employee Name</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Date</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Check In</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Check Out</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {attendanceRecords.map((record) => (
                      <tr key={record.id} className="border-b border-gray-200 hover:bg-blue-50/50 transition-colors">
                        <td className="py-3 px-4 text-sm text-gray-700 font-medium">{record.name}</td>
                        <td className="py-3 px-4 text-sm text-gray-600">{record.date}</td>
                        <td className="py-3 px-4 text-sm text-gray-600">{record.checkIn || "-"}</td>
                        <td className="py-3 px-4 text-sm text-gray-600">{record.checkOut || "-"}</td>
                        <td className="py-3 px-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(record.status)}`}>
                            {record.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <button
                            onClick={() => handleEditClick(record)}
                            className="text-blue-600 hover:text-blue-800 font-semibold text-sm mr-3"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(record.id)}
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
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800">{editingId ? "Edit Attendance" : "Add New Attendance"}</h2>
              <button
                onClick={() => setShowForm(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Employee *</label>
                  <select
                    name="employeeId"
                    value={formData.employeeId}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
                    required
                  >
                    <option value="">Select Employee</option>
                    {employees.map((emp) => (
                      <option key={emp.id} value={emp.id}>
                        {emp.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Date *</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Check In</label>
                  <input
                    type="time"
                    name="checkIn"
                    value={formData.checkIn}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Check Out</label>
                  <input
                    type="time"
                    name="checkOut"
                    value={formData.checkOut}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
                  >
                    <option value="Present">Present</option>
                    <option value="Absent">Absent</option>
                    <option value="Leave">Leave</option>
                    <option value="Half Day">Half Day</option>
                  </select>
                </div>
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
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-400 to-indigo-400 text-gray-800 font-semibold rounded-lg hover:shadow-lg transition-all"
                >
                  {editingId ? "Update Attendance" : "Add Attendance"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
