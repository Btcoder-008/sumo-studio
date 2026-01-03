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

interface PayrollRecord {
  id: string;
  name: string;
  baseSalary: number;
  bonus?: number;
  deductions?: number;
  netSalary: number;
  month: string;
  paymentStatus: "Paid" | "Pending" | "Processing";
}

export default function Payroll() {
  const [payrollRecords] = useState<PayrollRecord[]>([
    {
      id: "1",
      name: "John Doe",
      baseSalary: 120000,
      bonus: 5000,
      deductions: 5000,
      netSalary: 120000,
      month: "January 2024",
      paymentStatus: "Paid",
    },
    {
      id: "2",
      name: "Jane Smith",
      baseSalary: 110000,
      bonus: 3000,
      deductions: 4500,
      netSalary: 108500,
      month: "January 2024",
      paymentStatus: "Paid",
    },
    {
      id: "3",
      name: "Mike Johnson",
      baseSalary: 95000,
      bonus: 2000,
      deductions: 3500,
      netSalary: 93500,
      month: "January 2024",
      paymentStatus: "Processing",
    },
  ]);

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case "Paid":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-red-100 text-red-800";
      case "Processing":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const totalBaseSalary = payrollRecords.reduce((sum, r) => sum + r.baseSalary, 0);
  const totalBonuses = payrollRecords.reduce((sum, r) => sum + (r.bonus || 0), 0);
  const totalDeductions = payrollRecords.reduce((sum, r) => sum + (r.deductions || 0), 0);
  const totalNetSalary = payrollRecords.reduce((sum, r) => sum + r.netSalary, 0);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 overflow-hidden">
      {floatingIcons.map((item, index) => (
        <FloatingIcon key={index} icon={item.icon} style={{ top: item.top, left: item.left, right: item.right, bottom: item.bottom, animationDelay: item.delay, animationDuration: item.duration } as React.CSSProperties} />
      ))}

      <div className="absolute top-0 left-0 w-96 h-96 bg-green-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-emerald-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: "1s" }} />
      <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-teal-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: "2s" }} />

      <MobileLayout title="Payroll" backLink="/employee" navItems={navItems}>
        <div className="p-4 md:p-8">
          {/* Summary Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-lg p-4 border border-white/30 text-center">
              <div className="text-3xl mb-2">💵</div>
              <p className="text-sm text-gray-600">Total Salary</p>
              <p className="text-xl font-bold text-green-600">${(totalBaseSalary / 1000).toFixed(0)}k</p>
            </div>
            <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-lg p-4 border border-white/30 text-center">
              <div className="text-3xl mb-2">🎁</div>
              <p className="text-sm text-gray-600">Total Bonus</p>
              <p className="text-xl font-bold text-blue-600">${(totalBonuses / 1000).toFixed(0)}k</p>
            </div>
            <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-lg p-4 border border-white/30 text-center">
              <div className="text-3xl mb-2">📉</div>
              <p className="text-sm text-gray-600">Deductions</p>
              <p className="text-xl font-bold text-red-600">${(totalDeductions / 1000).toFixed(0)}k</p>
            </div>
            <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-lg p-4 border border-white/30 text-center">
              <div className="text-3xl mb-2">💰</div>
              <p className="text-sm text-gray-600">Net Salary</p>
              <p className="text-xl font-bold text-emerald-600">${(totalNetSalary / 1000).toFixed(0)}k</p>
            </div>
          </div>

          {/* Payroll Table */}
          <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl p-6 md:p-8 border border-white/30">
            <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-6">Payroll Summary - January 2024</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-300">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Employee</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Base Salary</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Bonus</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Deductions</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Net Salary</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {payrollRecords.map((record) => (
                    <tr key={record.id} className="border-b border-gray-200 hover:bg-green-50/50 transition-colors">
                      <td className="py-3 px-4 text-sm text-gray-700 font-medium">{record.name}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">${record.baseSalary.toLocaleString()}</td>
                      <td className="py-3 px-4 text-sm text-gray-600 text-green-600">+${(record.bonus || 0).toLocaleString()}</td>
                      <td className="py-3 px-4 text-sm text-gray-600 text-red-600">-${(record.deductions || 0).toLocaleString()}</td>
                      <td className="py-3 px-4 text-sm font-semibold text-gray-700">${record.netSalary.toLocaleString()}</td>
                      <td className="py-3 px-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getPaymentStatusColor(record.paymentStatus)}`}>
                          {record.paymentStatus}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </MobileLayout>
    </div>
  );
}
