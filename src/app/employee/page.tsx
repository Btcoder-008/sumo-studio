"use client";

import { useState } from "react";
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
  { label: "Accounts", href: "/accounts" },
  { label: "Reports", href: "/reports" },
  { label: "Settings", href: "/settings" },
];

interface Employee {
  id: string;
  name: string;
  position: string;
  email: string;
  department: string;
  status: "Active" | "Inactive";
  joinDate: string;
}

export default function Employee() {
  const [employees, setEmployees] = useState<Employee[]>([
    {
      id: "1",
      name: "John Doe",
      position: "Senior Developer",
      email: "john.doe@example.com",
      department: "Engineering",
      status: "Active",
      joinDate: "2023-01-15",
    },
    {
      id: "2",
      name: "Jane Smith",
      position: "Product Manager",
      email: "jane.smith@example.com",
      department: "Product",
      status: "Active",
      joinDate: "2023-03-20",
    },
    {
      id: "3",
      name: "Mike Johnson",
      position: "UX Designer",
      email: "mike.johnson@example.com",
      department: "Design",
      status: "Active",
      joinDate: "2023-02-10",
    },
  ]);

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
          <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl p-6 md:p-8 border border-white/30 mb-6">
            <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-6">Employees</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-300">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Name</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Position</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Department</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map((emp) => (
                    <tr key={emp.id} className="border-b border-gray-200 hover:bg-yellow-50/50 transition-colors">
                      <td className="py-3 px-4 text-sm text-gray-700">{emp.name}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{emp.position}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{emp.department}</td>
                      <td className="py-3 px-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${emp.status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                          {emp.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl p-6 md:p-8 border border-white/30">
            <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">Features</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <div className="text-2xl mb-2">👥</div>
                <h4 className="font-semibold text-gray-800">Employee Database</h4>
                <p className="text-sm text-gray-600 mt-1">Manage employee information</p>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                <div className="text-2xl mb-2">📅</div>
                <h4 className="font-semibold text-gray-800">Attendance</h4>
                <p className="text-sm text-gray-600 mt-1">Track attendance records</p>
              </div>
              <div className="p-4 bg-pink-50 rounded-lg border border-pink-200">
                <div className="text-2xl mb-2">📋</div>
                <h4 className="font-semibold text-gray-800">Leave Management</h4>
                <p className="text-sm text-gray-600 mt-1">Handle leave requests</p>
              </div>
              <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                <div className="text-2xl mb-2">💰</div>
                <h4 className="font-semibold text-gray-800">Payroll</h4>
                <p className="text-sm text-gray-600 mt-1">Manage salary information</p>
              </div>
            </div>
          </div>
        </div>
      </MobileLayout>
    </div>
  );
}
