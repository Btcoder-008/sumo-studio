"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import React from "react";

interface NavItem {
  label: string;
  href: string;
}

interface MobileLayoutProps {
  title: string;
  backLink?: string;
  children: React.ReactNode;
  navItems: NavItem[];
}

export function MobileLayout({
  title,
  backLink = "/dashboard",
  children,
  navItems,
}: MobileLayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex fixed left-0 top-0 h-screen w-64 bg-white/80 backdrop-blur-md shadow-lg border-r border-white/20 flex-col z-40">
        <div className="p-6 border-b border-white/20">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/super-sumo.png"
              alt="Super Sumo"
              width={60}
              height={60}
              className="cursor-pointer hover:scale-105 transition-transform drop-shadow-lg"
            />
            <div>
              <h1 className="text-xl font-bold text-gray-800">Super Sumo</h1>
              <p className="text-xs text-gray-500">Build with Sumo</p>
            </div>
          </Link>
        </div>
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block px-4 py-3 text-gray-700 font-medium rounded-lg hover:bg-yellow-100 hover:text-yellow-700 transition-all"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-white/20 text-xs text-gray-500 text-center">
          <p>© 2025 Super Sumo</p>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={`fixed inset-0 w-64 bg-white/95 backdrop-blur-md shadow-lg border-r border-white/20 flex flex-col z-50 transform transition-transform duration-300 md:hidden ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 border-b border-white/20 flex justify-between items-center">
          <Link
            href="/"
            className="flex items-center gap-3"
            onClick={() => setMobileMenuOpen(false)}
          >
            <Image
              src="/super-sumo.png"
              alt="Super Sumo"
              width={50}
              height={50}
              className="cursor-pointer hover:scale-105 transition-transform drop-shadow-lg"
            />
            <div>
              <h1 className="text-lg font-bold text-gray-800">Super Sumo</h1>
              <p className="text-xs text-gray-500">Build with Sumo</p>
            </div>
          </Link>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="md:hidden text-2xl"
          >
            ✕
          </button>
        </div>
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-3 text-gray-700 font-medium rounded-lg hover:bg-yellow-100 hover:text-yellow-700 transition-all"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-white/20 text-xs text-gray-500 text-center">
          <p>© 2025 Super Sumo</p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="md:ml-64 min-h-screen flex flex-col">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-md shadow-lg border-b border-white/20 p-4 md:p-6 sticky top-0 z-30">
          <div className="flex items-center gap-3 md:gap-4">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-2xl text-yellow-400 hover:text-yellow-500 transition-colors"
            >
              ☰
            </button>
            {backLink && (
              <Link
                href={backLink}
                className="text-yellow-400 hover:text-yellow-500 transition-colors text-xl md:text-2xl cursor-pointer"
              >
                ←
              </Link>
            )}
            <h2 className="text-xl md:text-3xl font-bold text-gray-800 truncate">
              {title}
            </h2>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-auto">
          {children}
        </div>
      </main>
    </>
  );
}
