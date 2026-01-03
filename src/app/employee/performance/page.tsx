"use client";

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

interface PerformanceData {
  id: string;
  name: string;
  rating: number;
  productivity: number;
  teamwork: number;
  communication: number;
  punctuality: number;
  overallScore: number;
}

export default function Performance() {
  const performanceData: PerformanceData[] = [
    {
      id: "1",
      name: "John Doe",
      rating: 4.5,
      productivity: 90,
      teamwork: 85,
      communication: 88,
      punctuality: 92,
      overallScore: 89,
    },
    {
      id: "2",
      name: "Jane Smith",
      rating: 4.7,
      productivity: 95,
      teamwork: 90,
      communication: 92,
      punctuality: 95,
      overallScore: 93,
    },
    {
      id: "3",
      name: "Mike Johnson",
      rating: 4.2,
      productivity: 82,
      teamwork: 80,
      communication: 78,
      punctuality: 85,
      overallScore: 81,
    },
  ];

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

      <MobileLayout title="Performance" backLink="/employee" navItems={navItems}>
        <div className="p-4 md:p-8">
          {/* Performance Cards */}
          <div className="space-y-6">
            {performanceData.map((employee) => (
              <div key={employee.id} className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl p-6 md:p-8 border border-white/30">
                {/* Employee Header */}
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-gray-800">{employee.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">Performance Review</p>
                  </div>
                  <div className={`${getRatingBgColor(employee.overallScore)} ${getRatingColor(employee.overallScore)} w-20 h-20 rounded-full flex items-center justify-center text-center`}>
                    <div>
                      <p className="text-3xl font-bold">{employee.overallScore}</p>
                      <p className="text-xs">Score</p>
                    </div>
                  </div>
                </div>

                {/* Performance Metrics */}
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                  {[
                    { label: "Productivity", value: employee.productivity },
                    { label: "Teamwork", value: employee.teamwork },
                    { label: "Communication", value: employee.communication },
                    { label: "Punctuality", value: employee.punctuality },
                    { label: "Rating", value: Math.round(employee.rating * 20) },
                  ].map((metric, idx) => (
                    <div key={idx} className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-200">
                      <p className="text-xs text-gray-600 mb-2">{metric.label}</p>
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                        <div
                          className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                          style={{ width: `${metric.value}%` }}
                        />
                      </div>
                      <p className="text-lg font-bold text-gray-800">{metric.value}%</p>
                    </div>
                  ))}
                </div>

                {/* Feedback Section */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <p className="text-sm font-semibold text-gray-700 mb-3">Comments</p>
                  <p className="text-sm text-gray-600">
                    {employee.overallScore >= 90
                      ? "Excellent performance. Keep up the outstanding work!"
                      : employee.overallScore >= 80
                      ? "Good performance. Minor areas for improvement identified."
                      : "Performance needs improvement. Schedule a meeting for discussion."}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </MobileLayout>
    </div>
  );
}
