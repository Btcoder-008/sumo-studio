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
  { label: "Accounts", href: "/accounts" },
  { label: "Reports", href: "/reports" },
  { label: "Settings", href: "/settings" },
];

interface Attendance {
  id: string;
  name: string;
  date: string;
  status: "Present" | "Absent" | "Leave" | "Half Day";
  checkIn?: string;
  checkOut?: string;
}

export default function Attendance() {
  const [attendanceRecords, setAttendanceRecords] = useState<Attendance[]>([
    {
      id: "1",
      name: "John Doe",
      date: "2024-01-15",
      status: "Present",
      checkIn: "09:00 AM",
      checkOut: "05:30 PM",
    },
    {
      id: "2",
      name: "Jane Smith",
      date: "2024-01-15",
      status: "Present",
      checkIn: "08:45 AM",
      checkOut: "05:45 PM",
    },
    {
      id: "3",
      name: "Mike Johnson",
      date: "2024-01-15",
      status: "Leave",
    },
  ]);

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

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 overflow-hidden">
      {floatingIcons.map((item, index) => (
        <FloatingIcon key={index} icon={item.icon} style={{ top: item.top, left: item.left, right: item.right, bottom: item.bottom, animationDelay: item.delay, animationDuration: item.duration } as React.CSSProperties} />
      ))}

      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: "1s" }} />
      <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: "2s" }} />

      <MobileLayout title="Attendance" backLink="/employee" navItems={navItems}>
        <div className="p-4 md:p-8">
          {/* Summary Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-lg p-4 border border-white/30 text-center">
              <div className="text-3xl mb-2">📊</div>
              <p className="text-sm text-gray-600">Total Present</p>
              <p className="text-2xl font-bold text-green-600">120</p>
            </div>
            <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-lg p-4 border border-white/30 text-center">
              <div className="text-3xl mb-2">❌</div>
              <p className="text-sm text-gray-600">Total Absent</p>
              <p className="text-2xl font-bold text-red-600">5</p>
            </div>
            <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-lg p-4 border border-white/30 text-center">
              <div className="text-3xl mb-2">📅</div>
              <p className="text-sm text-gray-600">Total Leave</p>
              <p className="text-2xl font-bold text-yellow-600">8</p>
            </div>
            <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-lg p-4 border border-white/30 text-center">
              <div className="text-3xl mb-2">⏱️</div>
              <p className="text-sm text-gray-600">Avg Hours</p>
              <p className="text-2xl font-bold text-blue-600">8.5h</p>
            </div>
          </div>

          {/* Attendance Records Table */}
          <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl p-6 md:p-8 border border-white/30">
            <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-6">Daily Attendance Record</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-300">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Employee Name</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Date</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Check In</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Check Out</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
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
