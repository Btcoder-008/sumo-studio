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
  { label: "Clients", href: "/clients" },
  { label: "Accounts", href: "/accounts" },
  { label: "Reports", href: "/reports" },
  { label: "Settings", href: "/settings" },
];

interface Client {
  id: string;
  name: string;
  status: "Approved" | "On Process" | "Rejected" | "Waiting";
  subStatus: string;
  salesType: string;
  projectCount?: number;
  totalAmount?: number;
  email?: string;
  phone?: string;
}

interface FormData {
  name: string;
  status: "Approved" | "On Process" | "Rejected" | "Waiting";
  subStatus: string;
  salesType: string;
  email: string;
  phone: string;
}

export default function Clients() {
  const [clients, setClients] = useState<Client[]>([
    // Approved Clients
    { id: "1", name: "Alpha Gym", status: "Approved", subStatus: "Completed", salesType: "Direct", projectCount: 1, totalAmount: 5000 },
    { id: "2", name: "Black & White Gym", status: "Approved", subStatus: "Completed", salesType: "Direct", projectCount: 1, totalAmount: 20000 },
    { id: "3", name: "Chittal Cabs", status: "Approved", subStatus: "Completed", salesType: "Sub Order", projectCount: 1, totalAmount: 5000 },
    { id: "4", name: "DA Creations", status: "Approved", subStatus: "Not Started", salesType: "Sub Order", projectCount: 1, totalAmount: 20000 },
    { id: "5", name: "Dubai Kidz", status: "Approved", subStatus: "Under Process", salesType: "Direct" },
    { id: "6", name: "Health Mix", status: "Approved", subStatus: "Not Started", salesType: "Promote" },
    { id: "7", name: "Ideal Care", status: "Approved", subStatus: "Completed", salesType: "Promote", projectCount: 1, totalAmount: 20000 },
    { id: "8", name: "Kaaral Printers", status: "Approved", subStatus: "Completed", salesType: "Direct", projectCount: 1, totalAmount: 50000 },
    { id: "9", name: "Laptop Surgeon", status: "Approved", subStatus: "Completed", salesType: "Direct" },
    { id: "10", name: "Little Genius", status: "Approved", subStatus: "Not Started", salesType: "Direct", projectCount: 1, totalAmount: 40000 },
    { id: "11", name: "Maruthi Jobs", status: "Approved", subStatus: "Completed", salesType: "Direct", projectCount: 1, totalAmount: 50000 },
    { id: "12", name: "Nanas Resources", status: "Approved", subStatus: "Not Started", salesType: "Sub Order", projectCount: 1, totalAmount: 50000 },
    { id: "13", name: "Phenix Mobiles", status: "Approved", subStatus: "Not Started", salesType: "Sub Order" },
    { id: "14", name: "Poocharam", status: "Approved", subStatus: "Not Started", salesType: "Sub Order" },
    { id: "15", name: "Priyaa Cellcom", status: "Approved", subStatus: "Not Started", salesType: "BNI", projectCount: 1, totalAmount: 40000 },
    { id: "16", name: "Quality Woods", status: "Approved", subStatus: "Not Started", salesType: "BNI", projectCount: 1, totalAmount: 20000 },
    { id: "17", name: "RA Aqua", status: "Approved", subStatus: "Completed", salesType: "BNI", projectCount: 1, totalAmount: 10000 },
    { id: "18", name: "Raaja Rajan", status: "Approved", subStatus: "Not Started", salesType: "Direct" },
    { id: "19", name: "Ray Clinic", status: "Approved", subStatus: "Completed", salesType: "Direct" },
    { id: "20", name: "RR Motoshop", status: "Approved", subStatus: "Completed", salesType: "Direct", projectCount: 1, totalAmount: 30000 },
    { id: "21", name: "Sai Vigna", status: "Approved", subStatus: "Completed", salesType: "Referral", projectCount: 1, totalAmount: 20000 },
    { id: "22", name: "Security Service", status: "Approved", subStatus: "Not Started", salesType: "Promote" },
    { id: "23", name: "Udhayam Hypermart", status: "Approved", subStatus: "Not Started", salesType: "BNI" },
    { id: "24", name: "Vivek Mart", status: "Approved", subStatus: "Not Started", salesType: "Referral" },

    // On Process Clients
    { id: "25", name: "Thiru Chits", status: "On Process", subStatus: "", salesType: "" },
    { id: "26", name: "Alagappa Bus", status: "On Process", subStatus: "", salesType: "" },
    { id: "27", name: "Alagappa University", status: "On Process", subStatus: "", salesType: "" },
    { id: "28", name: "BSS - OLX", status: "On Process", subStatus: "", salesType: "" },
    { id: "29", name: "Siva Photographia", status: "On Process", subStatus: "", salesType: "" },
    { id: "30", name: "Sri Hari CNC", status: "On Process", subStatus: "", salesType: "", projectCount: 1, totalAmount: 5000 },
    { id: "31", name: "Share Market A/C", status: "On Process", subStatus: "", salesType: "" },

    // Rejected Clients
    { id: "32", name: "90's Kids Kitchen", status: "Rejected", subStatus: "", salesType: "" },
    { id: "33", name: "Cycle World", status: "Rejected", subStatus: "", salesType: "" },
    { id: "34", name: "G Clinic", status: "Rejected", subStatus: "", salesType: "" },
    { id: "35", name: "Holy Angels", status: "Rejected", subStatus: "", salesType: "" },
    { id: "36", name: "J tyers", status: "Rejected", subStatus: "", salesType: "" },
    { id: "37", name: "Readathon", status: "Rejected", subStatus: "", salesType: "" },
    { id: "38", name: "Soundharam Snacks", status: "Rejected", subStatus: "", salesType: "" },
    { id: "39", name: "SRT Tiles", status: "Rejected", subStatus: "", salesType: "" },

    // Waiting Clients
    { id: "40", name: "BIM", status: "Waiting", subStatus: "", salesType: "" },
    { id: "41", name: "Gift Hub", status: "Waiting", subStatus: "", salesType: "" },
    { id: "42", name: "Jupiter Service", status: "Waiting", subStatus: "", salesType: "" },
    { id: "43", name: "Krishna Schools", status: "Waiting", subStatus: "", salesType: "" },
    { id: "44", name: "Pramide Academy", status: "Waiting", subStatus: "", salesType: "" },
    { id: "45", name: "Scaling Academy", status: "Waiting", subStatus: "", salesType: "" },
    { id: "46", name: "Srinivasa Mahal", status: "Waiting", subStatus: "", salesType: "" },
    { id: "47", name: "SRM Trichy", status: "Waiting", subStatus: "", salesType: "" },
    { id: "48", name: "Viyapar Clone", status: "Waiting", subStatus: "", salesType: "" },
    { id: "49", name: "SF Vertical", status: "Waiting", subStatus: "", salesType: "" },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    status: "Waiting",
    subStatus: "",
    salesType: "",
    email: "",
    phone: "",
  });

  const handleAddClick = () => {
    setFormData({
      name: "",
      status: "Waiting",
      subStatus: "",
      salesType: "",
      email: "",
      phone: "",
    });
    setEditingId(null);
    setShowForm(true);
  };

  const handleEditClick = (client: Client) => {
    setFormData({
      name: client.name,
      status: client.status,
      subStatus: client.subStatus,
      salesType: client.salesType,
      email: client.email || "",
      phone: client.phone || "",
    });
    setEditingId(client.id);
    setShowForm(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name) {
      alert("Please enter client name");
      return;
    }

    if (editingId) {
      setClients((prev) =>
        prev.map((client) =>
          client.id === editingId
            ? {
                ...client,
                name: formData.name,
                status: formData.status,
                subStatus: formData.subStatus,
                salesType: formData.salesType,
                email: formData.email || undefined,
                phone: formData.phone || undefined,
              }
            : client
        )
      );
    } else {
      const newClient: Client = {
        id: Math.random().toString(36).substr(2, 9),
        name: formData.name,
        status: formData.status,
        subStatus: formData.subStatus,
        salesType: formData.salesType,
        email: formData.email || undefined,
        phone: formData.phone || undefined,
      };
      setClients((prev) => [...prev, newClient]);
    }

    setShowForm(false);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this client?")) {
      setClients((prev) => prev.filter((client) => client.id !== id));
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-800";
      case "On Process":
        return "bg-orange-100 text-orange-800";
      case "Rejected":
        return "bg-red-100 text-red-800";
      case "Waiting":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const stats = {
    total: clients.length,
    approved: clients.filter((c) => c.status === "Approved").length,
    onProcess: clients.filter((c) => c.status === "On Process").length,
    rejected: clients.filter((c) => c.status === "Rejected").length,
    waiting: clients.filter((c) => c.status === "Waiting").length,
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-50 overflow-hidden">
      {floatingIcons.map((item, index) => (
        <FloatingIcon key={index} icon={item.icon} style={{ top: item.top, left: item.left, right: item.right, bottom: item.bottom, animationDelay: item.delay, animationDuration: item.duration } as React.CSSProperties} />
      ))}

      <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: "1s" }} />
      <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: "2s" }} />

      <MobileLayout title="Clients Management" backLink="/dashboard" navItems={navItems}>
        <div className="p-4 md:p-8">
          {/* Statistics Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 md:gap-4 mb-8">
            <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-lg p-4 border border-white/30 text-center">
              <p className="text-sm text-gray-600 mb-1">Total</p>
              <p className="text-2xl md:text-3xl font-bold text-gray-800">{stats.total}</p>
            </div>
            <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-lg p-4 border border-white/30 text-center">
              <p className="text-sm text-gray-600 mb-1">Approved</p>
              <p className="text-2xl md:text-3xl font-bold text-green-600">{stats.approved}</p>
            </div>
            <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-lg p-4 border border-white/30 text-center">
              <p className="text-sm text-gray-600 mb-1">On Process</p>
              <p className="text-2xl md:text-3xl font-bold text-orange-600">{stats.onProcess}</p>
            </div>
            <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-lg p-4 border border-white/30 text-center">
              <p className="text-sm text-gray-600 mb-1">Waiting</p>
              <p className="text-2xl md:text-3xl font-bold text-blue-600">{stats.waiting}</p>
            </div>
            <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-lg p-4 border border-white/30 text-center">
              <p className="text-sm text-gray-600 mb-1">Rejected</p>
              <p className="text-2xl md:text-3xl font-bold text-red-600">{stats.rejected}</p>
            </div>
          </div>

          {/* Add Client Button */}
          <div className="mb-6">
            <button
              onClick={handleAddClick}
              className="w-full md:w-auto px-6 py-3 bg-gradient-to-r from-blue-400 to-cyan-400 text-gray-800 font-semibold rounded-lg hover:shadow-lg transition-all"
            >
              + Add Client
            </button>
          </div>

          {/* Clients Table */}
          <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl p-6 md:p-8 border border-white/30">
            <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-6">All Clients ({clients.length})</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-300">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Client Name</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Sub Status</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Sales Type</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {clients.map((client) => (
                    <tr key={client.id} className="border-b border-gray-200 hover:bg-cyan-50/50 transition-colors">
                      <td className="py-3 px-4 text-sm text-gray-700 font-medium">{client.name}</td>
                      <td className="py-3 px-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(client.status)}`}>
                          {client.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">{client.subStatus || "-"}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{client.salesType || "-"}</td>
                      <td className="py-3 px-4">
                        <button
                          onClick={() => handleEditClick(client)}
                          className="text-blue-600 hover:text-blue-800 font-semibold text-sm mr-3"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(client.id)}
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
          </div>
        </div>
      </MobileLayout>

      {/* Modal Overlay */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-40 md:z-40 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800">{editingId ? "Edit Client" : "Add New Client"}</h2>
              <button
                onClick={() => setShowForm(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
              >
                ✕
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Client Name */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Client Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter client name"
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
                    required
                  />
                </div>

                {/* Status */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
                  >
                    <option value="Waiting">Waiting</option>
                    <option value="On Process">On Process</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>

                {/* Sub Status */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Sub Status</label>
                  <select
                    name="subStatus"
                    value={formData.subStatus}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
                  >
                    <option value="">Select Sub Status</option>
                    <option value="Completed">Completed</option>
                    <option value="Under Process">Under Process</option>
                    <option value="Not Started">Not Started</option>
                  </select>
                </div>

                {/* Sales Type */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Sales Type</label>
                  <select
                    name="salesType"
                    value={formData.salesType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
                  >
                    <option value="">Select Sales Type</option>
                    <option value="Direct">Direct</option>
                    <option value="Sub Order">Sub Order</option>
                    <option value="Promote">Promote</option>
                    <option value="Referral">Referral</option>
                    <option value="BNI">BNI</option>
                  </select>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="client@example.com"
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
                  />
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
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-400 to-cyan-400 text-gray-800 font-semibold rounded-lg hover:shadow-lg transition-all"
                >
                  {editingId ? "Update Client" : "Add Client"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
