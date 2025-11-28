import Image from "next/image";

// Floating app icon component
function FloatingIcon({ icon, style }: { icon: string; style: React.CSSProperties }) {
  return (
    <div
      className="absolute text-4xl md:text-5xl opacity-35 animate-float"
      style={style}
    >
      {icon}
    </div>
  );
}

// App-related icons for floating background
const floatingIcons = [
  { icon: "📱", top: "5%", left: "10%", delay: "0s", duration: "6s" },
  { icon: "💻", top: "15%", right: "15%", delay: "1s", duration: "7s" },
  { icon: "🎮", top: "25%", left: "5%", delay: "2s", duration: "5s" },
  { icon: "📷", bottom: "30%", right: "10%", delay: "0.5s", duration: "8s" },
  { icon: "🎵", top: "40%", left: "15%", delay: "1.5s", duration: "6s" },
  { icon: "📧", bottom: "20%", left: "8%", delay: "3s", duration: "7s" },
  { icon: "🔔", top: "10%", right: "30%", delay: "2.5s", duration: "5s" },
  { icon: "⚙️", bottom: "15%", right: "25%", delay: "1s", duration: "6s" },
  { icon: "🛒", top: "60%", right: "5%", delay: "0s", duration: "7s" },
  { icon: "📊", bottom: "40%", left: "20%", delay: "2s", duration: "8s" },
  { icon: "🎬", top: "70%", left: "3%", delay: "1.5s", duration: "5s" },
  { icon: "🌐", top: "8%", left: "40%", delay: "3s", duration: "6s" },
  { icon: "💬", bottom: "10%", right: "40%", delay: "0.5s", duration: "7s" },
  { icon: "📅", top: "50%", right: "20%", delay: "2.5s", duration: "5s" },
  { icon: "🔍", bottom: "50%", left: "30%", delay: "1s", duration: "8s" },
  { icon: "☁️", top: "20%", left: "25%", delay: "0s", duration: "6s" },
];

export default function Home() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-white">
      {/* Floating app icons background */}
      {floatingIcons.map((item, index) => (
        <FloatingIcon
          key={index}
          icon={item.icon}
          style={{
            top: item.top,
            left: item.left,
            right: item.right,
            bottom: item.bottom,
            animationDelay: item.delay,
            animationDuration: item.duration,
          } as React.CSSProperties}
        />
      ))}

      {/* Centered Super Sumo mascot */}
      <main className="relative z-10 flex min-h-screen items-center justify-center">
        <div className="animate-bounce-gentle">
          <a href="/build-studio" className="cursor-pointer">
            <Image
              src="/super-sumo.png"
              alt="Super Sumo mascot"
              width={400}
              height={400}
              priority
              className="drop-shadow-2xl animate-wiggle hover:scale-105 transition-transform"
            />
          </a>
        </div>
      </main>
    </div>
  );
}
