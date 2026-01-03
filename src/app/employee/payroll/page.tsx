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
  { icon: "💰", top: "10%", left: "5%", delay: "0s", duration: "7s" },
  { icon: "💵", top: "20%", right: "8%", delay: "1s", duration: "6s" },
  { icon: "🏦", top: "60%", left: "3%", delay: "2s", duration: "8s" },
  { icon: "💳", bottom: "20%", right: "5%", delay: "0.5s", duration: "7s" },
  { icon: "📊", top: "40%", right: "3%", delay: "1.5s", duration: "5s" },
  { icon: "💸", bottom: "30%", left: "8%", delay: "3s", duration: "6s" },
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

interface PayrollRecord {
  id: string;
  employeeId: string;
  name: string;
  baseSalary: number;
  bonus: number;
  deductions: number;
  netSalary: number;
  paymentDate: string;
  paymentStatus: "Paid" | "Pending" | "Processing";
  paymentMethod: string;
}

interface PayrollFormData {
  employeeId: string;
  name: string;
  baseSalary: number;
  bonus: number;
  deductions: number;
  paymentDate: string;
  paymentStatus: "Paid" | "Pending" | "Processing";
  paymentMethod: string;
}

export default function PayrollPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [payrollRecords, setPayrollRecords] = useState<PayrollRecord[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<PayrollFormData>({
    employeeId: "",
    name: "",
    baseSalary: 0,
    bonus: 0,
    deductions: 0,
    paymentDate: new Date().toISOString().split("T")[0],
    paymentStatus: "Pending",
    paymentMethod: "Bank Transfer",
  });

  // Load employees and payroll records from localStorage on mount
  React.useEffect(() => {
    const savedEmployees = localStorage.getItem("employee_list");
    const savedPayroll = localStorage.getItem("employee_payroll");

    if (savedEmployees) {
      setEmployees(JSON.parse(savedEmployees));
    }
    if (savedPayroll) {
      setPayrollRecords(JSON.parse(savedPayroll));
    }
  }, []);

  const handleAddClick = () => {
    setFormData({
      employeeId: "",
      name: "",
      baseSalary: 0,
      bonus: 0,
      deductions: 0,
      paymentDate: new Date().toISOString().split("T")[0],
      paymentStatus: "Pending",
      paymentMethod: "Bank Transfer",
    });
    setEditingId(null);
    setShowForm(true);
  };

  const handleEditClick = (record: PayrollRecord) => {
    setFormData({
      employeeId: record.employeeId,
      name: record.name,
      baseSalary: record.baseSalary,
      bonus: record.bonus,
      deductions: record.deductions,
      paymentDate: record.paymentDate,
      paymentStatus: record.paymentStatus,
      paymentMethod: record.paymentMethod,
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
        baseSalary: selectedEmployee?.salary || 0,
      }));
    } else if (name === "baseSalary" || name === "bonus" || name === "deductions") {
      setFormData((prev) => ({
        ...prev,
        [name]: parseFloat(value) || 0,
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
    if (!formData.baseSalary) {
      alert("Please enter base salary");
      return;
    }

    const netSalary = formData.baseSalary + formData.bonus - formData.deductions;

    let updatedRecords: PayrollRecord[];
    if (editingId) {
      updatedRecords = payrollRecords.map((record) =>
        record.id === editingId
          ? {
              ...record,
              employeeId: formData.employeeId,
              name: formData.name,
              baseSalary: formData.baseSalary,
              bonus: formData.bonus,
              deductions: formData.deductions,
              netSalary: netSalary,
              paymentDate: formData.paymentDate,
              paymentStatus: formData.paymentStatus,
              paymentMethod: formData.paymentMethod,
            }
          : record
      );
    } else {
      updatedRecords = [
        {
          id: Math.random().toString(36).substr(2, 9),
          employeeId: formData.employeeId,
          name: formData.name,
          baseSalary: formData.baseSalary,
          bonus: formData.bonus,
          deductions: formData.deductions,
          netSalary: netSalary,
          paymentDate: formData.paymentDate,
          paymentStatus: formData.paymentStatus,
          paymentMethod: formData.paymentMethod,
        },
        ...payrollRecords,
      ];
    }
    setPayrollRecords(updatedRecords);
    localStorage.setItem("employee_payroll", JSON.stringify(updatedRecords));
    setShowForm(false);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this payroll record?")) {
      const updated = payrollRecords.filter((record) => record.id !== id);
      setPayrollRecords(updated);
      localStorage.setItem("employee_payroll", JSON.stringify(updated));
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case "Paid":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Processing":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const totalBaseSalary = payrollRecords.reduce((sum, r) => sum + r.baseSalary, 0);
  const totalBonuses = payrollRecords.reduce((sum, r) => sum + r.bonus, 0);
  const totalDeductions = payrollRecords.reduce((sum, r) => sum + r.deductions, 0);
  const totalNetSalary = payrollRecords.reduce((sum, r) => sum + r.netSalary, 0);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 overflow-hidden">
      {floatingIcons.map((item, index) => (
        <FloatingIcon key={index} icon={item.icon} style={{ top: item.top, left: item.left, right: item.right, bottom: item.bottom, animationDelay: item.delay, animationDuration: item.duration } as React.CSSProperties} />
      ))}

      <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-green-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: "1s" }} />
      <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-teal-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: "2s" }} />

      <MobileLayout title="Payroll 💰" backLink="/employee" navItems={navItems}>
        <div className="p-4 md:p-8">
          {/* Add Payroll Button */}
          <div className="mb-6">
            <button
              onClick={handleAddClick}
              className="w-full md:w-auto px-6 py-3 bg-gradient-to-r from-emerald-400 to-green-400 text-gray-800 font-semibold rounded-lg hover:shadow-lg transition-all"
            >
              + Add Payroll Record
            </button>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-lg p-4 border border-white/30 text-center">
              <div className="text-3xl mb-2">💵</div>
              <p className="text-sm text-gray-600">Total Base Salary</p>
              <p className="text-xl font-bold text-green-600">${(totalBaseSalary / 1000).toFixed(1)}k</p>
            </div>
            <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-lg p-4 border border-white/30 text-center">
              <div className="text-3xl mb-2">🎁</div>
              <p className="text-sm text-gray-600">Total Bonus</p>
              <p className="text-xl font-bold text-blue-600">${(totalBonuses / 1000).toFixed(1)}k</p>
            </div>
            <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-lg p-4 border border-white/30 text-center">
              <div className="text-3xl mb-2">📉</div>
              <p className="text-sm text-gray-600">Total Deductions</p>
              <p className="text-xl font-bold text-red-600">${(totalDeductions / 1000).toFixed(1)}k</p>
            </div>
            <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-lg p-4 border border-white/30 text-center">
              <div className="text-3xl mb-2">💰</div>
              <p className="text-sm text-gray-600">Total Net Salary</p>
              <p className="text-xl font-bold text-emerald-600">${(totalNetSalary / 1000).toFixed(1)}k</p>
            </div>
          </div>

          {/* Payroll Records Table */}
          <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl p-6 md:p-8 border border-white/30">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Payroll Records ({payrollRecords.length})</h2>
            {payrollRecords.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No payroll records yet. Click "+ Add Payroll Record" to get started.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-gray-300">
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Employee</th>
                      <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Base Salary</th>
                      <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Bonus</th>
                      <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Deductions</th>
                      <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Net Salary</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Payment Date</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
                      <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {payrollRecords.map((record) => (
                      <tr key={record.id} className="border-b border-gray-200 hover:bg-green-50/50 transition-colors">
                        <td className="py-3 px-4 text-sm font-semibold text-gray-800">{record.name}</td>
                        <td className="py-3 px-4 text-sm text-right text-gray-600">${record.baseSalary.toLocaleString()}</td>
                        <td className="py-3 px-4 text-sm text-right text-green-600 font-medium">+${record.bonus.toLocaleString()}</td>
                        <td className="py-3 px-4 text-sm text-right text-red-600 font-medium">-${record.deductions.toLocaleString()}</td>
                        <td className="py-3 px-4 text-sm font-bold text-emerald-600">${record.netSalary.toLocaleString()}</td>
                        <td className="py-3 px-4 text-sm text-gray-600">{record.paymentDate}</td>
                        <td className="py-3 px-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getPaymentStatusColor(record.paymentStatus)}`}>
                            {record.paymentStatus}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <div className="flex gap-2 justify-center">
                            <button
                              onClick={() => handleEditClick(record)}
                              className="px-3 py-1 bg-emerald-500 text-white font-semibold rounded-lg hover:bg-emerald-600 transition-all text-xs"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(record.id)}
                              className="px-3 py-1 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-all text-xs"
                            >
                              Delete
                            </button>
                          </div>
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
              <h2 className="text-2xl font-bold text-gray-800">{editingId ? "Edit Payroll Record" : "Add New Payroll Record"}</h2>
              <button
                onClick={() => setShowForm(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
              >
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
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-emerald-400"
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
                <label className="block text-sm font-semibold text-gray-700 mb-2">Base Salary *</label>
                <input
                  type="number"
                  name="baseSalary"
                  value={formData.baseSalary}
                  onChange={handleInputChange}
                  placeholder="0"
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-emerald-400"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Bonus</label>
                  <input
                    type="number"
                    name="bonus"
                    value={formData.bonus}
                    onChange={handleInputChange}
                    placeholder="0"
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-emerald-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Deductions</label>
                  <input
                    type="number"
                    name="deductions"
                    value={formData.deductions}
                    onChange={handleInputChange}
                    placeholder="0"
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-emerald-400"
                  />
                </div>
              </div>

              <div className="bg-emerald-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">
                  Net Salary: <span className="font-bold text-emerald-600">${(formData.baseSalary + formData.bonus - formData.deductions).toLocaleString()}</span>
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Payment Date *</label>
                  <input
                    type="date"
                    name="paymentDate"
                    value={formData.paymentDate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-emerald-400"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
                  <select
                    name="paymentStatus"
                    value={formData.paymentStatus}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-emerald-400"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Paid">Paid</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Payment Method</label>
                <select
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-emerald-400"
                >
                  <option value="Bank Transfer">Bank Transfer</option>
                  <option value="Check">Check</option>
                  <option value="Cash">Cash</option>
                  <option value="Digital Wallet">Digital Wallet</option>
                </select>
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
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-400 to-green-400 text-gray-800 font-semibold rounded-lg hover:shadow-lg transition-all"
                >
                  {editingId ? "Update Record" : "Add Record"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
