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
  { icon: "💼", top: "10%", left: "5%", delay: "0s", duration: "7s" },
  { icon: "🎯", top: "20%", right: "8%", delay: "1s", duration: "6s" },
  { icon: "⚡", top: "60%", left: "3%", delay: "2s", duration: "8s" },
  { icon: "📊", bottom: "20%", right: "5%", delay: "0.5s", duration: "7s" },
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

interface Position {
  id: string;
  name: string;
  description?: string;
}

interface PositionFormData {
  name: string;
  description: string;
}

export default function PositionPage() {
  const [positions, setPositions] = useState<Position[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<PositionFormData>({
    name: "",
    description: "",
  });

  // Load positions from localStorage on mount
  React.useEffect(() => {
    const saved = localStorage.getItem("employee_positions");
    if (saved) {
      setPositions(JSON.parse(saved));
    }
  }, []);

  const handleAddClick = () => {
    setFormData({ name: "", description: "" });
    setEditingId(null);
    setShowForm(true);
  };

  const handleEditClick = (position: Position) => {
    setFormData({
      name: position.name,
      description: position.description || "",
    });
    setEditingId(position.id);
    setShowForm(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) {
      alert("Please enter position name");
      return;
    }

    let updatedPositions: Position[];
    if (editingId) {
      updatedPositions = positions.map((pos) =>
        pos.id === editingId
          ? { ...pos, name: formData.name, description: formData.description }
          : pos
      );
    } else {
      updatedPositions = [
        {
          id: Math.random().toString(36).substr(2, 9),
          name: formData.name,
          description: formData.description,
        },
        ...positions,
      ];
    }
    setPositions(updatedPositions);
    localStorage.setItem("employee_positions", JSON.stringify(updatedPositions));
    setShowForm(false);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this position?")) {
      const updated = positions.filter((pos) => pos.id !== id);
      setPositions(updated);
      localStorage.setItem("employee_positions", JSON.stringify(updated));
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 overflow-hidden">
      {floatingIcons.map((item, index) => (
        <FloatingIcon key={index} icon={item.icon} style={{ top: item.top, left: item.left, right: item.right, bottom: item.bottom, animationDelay: item.delay, animationDuration: item.duration } as React.CSSProperties} />
      ))}

      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-cyan-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: "1s" }} />
      <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-teal-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: "2s" }} />

      <MobileLayout title="Positions 💼" backLink="/employee" navItems={navItems}>
        <div className="p-4 md:p-8">
          {/* Add Position Button */}
          <div className="mb-6">
            <button
              onClick={handleAddClick}
              className="w-full md:w-auto px-6 py-3 bg-gradient-to-r from-blue-400 to-cyan-400 text-gray-800 font-semibold rounded-lg hover:shadow-lg transition-all"
            >
              + Add Position
            </button>
          </div>

          {/* Positions List */}
          <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl p-6 md:p-8 border border-white/30">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Positions ({positions.length})</h2>
            {positions.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No positions yet. Click "Add Position" to get started.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {positions.map((position) => (
                  <div key={position.id} className="bg-blue-50/50 border-2 border-blue-200 rounded-xl p-4 hover:shadow-lg transition-all">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-800 mb-2">{position.name}</h3>
                        <p className="text-sm text-gray-600 mb-4">{position.description}</p>
                      </div>
                    </div>
                    <div className="flex gap-2 justify-end pt-4 border-t border-blue-200">
                      <button
                        onClick={() => handleEditClick(position)}
                        className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-all text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(position.id)}
                        className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-all text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
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
              <h2 className="text-2xl font-bold text-gray-800">{editingId ? "Edit Position" : "Add New Position"}</h2>
              <button
                onClick={() => setShowForm(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Position Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Senior Developer"
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Position description..."
                  rows={4}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
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
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-400 to-cyan-400 text-gray-800 font-semibold rounded-lg hover:shadow-lg transition-all"
                >
                  {editingId ? "Update Position" : "Add Position"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
