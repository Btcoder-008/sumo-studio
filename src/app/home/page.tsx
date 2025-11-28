import Image from "next/image";
import Link from "next/link";

// Floating app icon component
function FloatingIcon({ icon, style }: { icon: string; style: React.CSSProperties }) {
  return (
    <div
      className="absolute text-4xl md:text-5xl opacity-35 animate-float pointer-events-none"
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

// Studio cards data
const studioCards = [
  {
    title: "Terminal",
    icon: "🚀",
    href: "/terminal",
    description: "Create new projects",
    bgColor: "from-green-400 to-emerald-500",
    hoverColor: "hover:shadow-green-300/50",
  },
  {
    title: "Frontend Studio",
    icon: "🎨",
    href: "/frontend-studio",
    description: "Design UI components",
    bgColor: "from-orange-400 to-pink-500",
    hoverColor: "hover:shadow-orange-300/50",
  },
  {
    title: "Backend Studio",
    icon: "⚙️",
    href: "/backend-studio",
    description: "Build APIs & services",
    bgColor: "from-pink-400 to-purple-500",
    hoverColor: "hover:shadow-pink-300/50",
  },
];

export default function HomePage() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-yellow-50 via-orange-50 to-pink-50">
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

      {/* Gradient orbs for futuristic effect */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-orange-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: "1s" }} />
      <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: "2s" }} />

      {/* Header */}
      <header className="relative z-20 bg-white/80 backdrop-blur-md shadow-lg border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/super-sumo.png"
                alt="Super Sumo"
                width={80}
                height={80}
                className="cursor-pointer hover:scale-105 transition-transform drop-shadow-lg"
              />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Sumo Studio
              </h1>
              <p className="text-xs text-gray-500 tracking-tight">Build your app with Sumo</p>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="flex items-center gap-2">
            <Link
              href="/terminal"
              className="px-4 py-2 text-gray-700 font-medium rounded-lg hover:bg-yellow-100 hover:text-yellow-700 transition-all"
            >
              Terminal
            </Link>
            <Link
              href="/frontend-studio"
              className="px-4 py-2 text-gray-700 font-medium rounded-lg hover:bg-orange-100 hover:text-orange-700 transition-all"
            >
              Frontend Studio
            </Link>
            <Link
              href="/backend-studio"
              className="px-4 py-2 text-gray-700 font-medium rounded-lg hover:bg-pink-100 hover:text-pink-700 transition-all"
            >
              Backend Studio
            </Link>
          </nav>
        </div>
      </header>

      {/* Main content */}
      <main className="relative z-10 flex flex-col items-center justify-center px-4 py-16">
        {/* Studio cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl w-full">
          {studioCards.map((card) => (
            <Link
              key={card.title}
              href={card.href}
              className={`group relative bg-white/70 backdrop-blur-lg rounded-2xl p-6 border border-white/30 shadow-xl ${card.hoverColor} hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-2`}
            >
              <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${card.bgColor} flex items-center justify-center mb-4 mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <span className="text-3xl">{card.icon}</span>
              </div>
              <h2 className="text-lg font-bold text-gray-800 text-center mb-1">
                {card.title}
              </h2>
              <p className="text-sm text-gray-500 text-center">
                {card.description}
              </p>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
