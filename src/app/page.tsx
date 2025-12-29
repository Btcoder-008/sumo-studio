"use client";

import Link from "next/link";
import Image from "next/image";

function FloatingIcon({ icon, style, delay }: { icon: string; style: React.CSSProperties; delay: string }) {
  return (
    <div
      className="absolute text-5xl md:text-6xl opacity-30 pointer-events-none animate-float"
      style={{
        ...style,
        animationDelay: delay,
        animationDuration: "5s"
      }}
    >
      {icon}
    </div>
  );
}

const floatingIcons = [
  { icon: "🖥️", top: "5%", left: "10%", delay: "0s" },
  { icon: "🌐", top: "8%", left: "50%", delay: "0.5s" },
  { icon: "🔔", top: "10%", right: "12%", delay: "1s" },
  { icon: "💻", top: "12%", right: "8%", delay: "1.5s" },
  { icon: "🎮", top: "25%", left: "5%", delay: "0.2s" },
  { icon: "🎵", top: "35%", left: "8%", delay: "0.7s" },
  { icon: "🔍", top: "30%", left: "35%", delay: "1.2s" },
  { icon: "📊", top: "40%", left: "20%", delay: "0.3s" },
  { icon: "🎬", top: "60%", left: "5%", delay: "0.8s" },
  { icon: "📋", top: "75%", left: "8%", delay: "1.3s" },
  { icon: "📅", top: "50%", right: "8%", delay: "0.4s" },
  { icon: "📷", top: "65%", right: "10%", delay: "0.9s" },
  { icon: "🛒", top: "70%", right: "5%", delay: "1.4s" },
  { icon: "💬", top: "75%", left: "45%", delay: "0.6s" },
  { icon: "⚙️", top: "80%", right: "20%", delay: "1.1s" },
  { icon: "☁️", top: "20%", left: "30%", delay: "0.1s" },
];

export default function Home() {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-white to-gray-50 overflow-hidden">
      {floatingIcons.map((item, index) => (
        <FloatingIcon
          key={index}
          icon={item.icon}
          delay={item.delay}
          style={{ top: item.top, left: item.left, right: item.right } as React.CSSProperties}
        />
      ))}

      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Link href="/dashboard" className="inline-block">
            <div className="animate-float-center hover:scale-105 transition-transform duration-300">
              <Image src="/super-sumo.png" alt="Super Sumo" width={550} height={550} className="drop-shadow-2xl" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
