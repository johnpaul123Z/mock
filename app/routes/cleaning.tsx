import { useState, useEffect, useRef } from "react";
import { Link } from "react-router";

export function meta() {
  return [
    { title: "SparkClean | Professional Cleaning Services" },
    {
      name: "description",
      content: "Trusted cleaning services for a fresh, spotless space.",
    },
  ];
}

// Custom hook for scroll animations
function useScrollAnimation() {
  const elementRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, []);

  return { elementRef, isVisible };
}

const TABS = [
  { id: "services", label: "Our Services" },
  { id: "benefits", label: "Why Choose Us" },
  { id: "savings", label: "Plans & Pricing" },
] as const;

type TabId = (typeof TABS)[number]["id"];

function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`w-full fixed top-0 left-0 right-0 z-50 py-4 px-6 transition-all duration-500 ${
        scrolled
          ? "bg-white/95 backdrop-blur-lg shadow-lg"
          : "bg-[#0ea5e9]"
      }`}
      style={{ animation: "slideDown 0.8s ease-out" }}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link
          to="/"
          className={`font-bold text-xl tracking-tight transition-all duration-300 ${
            scrolled ? "text-[#0ea5e9]" : "text-white"
          }`}
          style={{ animation: "fadeIn 1s ease-out" }}
        >
          ✨ SparkClean
        </Link>
        <Link
          to="/"
          className={`text-sm font-medium transition-all duration-300 hover:scale-110 ${
            scrolled ? "text-gray-600 hover:text-[#0ea5e9]" : "text-white/90 hover:text-white"
          }`}
        >
          ← Back
        </Link>
      </div>
    </header>
  );
}

function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="relative w-full min-h-[100vh] overflow-hidden">
      {/* Animated Background Image with Parallax */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-out"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1600&q=80)",
          transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px) scale(1.1)`,
        }}
      />
      
      {/* Animated Gradient Overlay */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/30 to-black/40"
        style={{ animation: "pulse 4s ease-in-out infinite" }}
      />
      
      {/* Floating Particles */}
      <div className="absolute top-10 left-10 w-2 h-2 bg-white/40 rounded-full" style={{ animation: "float 6s ease-in-out infinite" }} />
      <div className="absolute top-40 right-20 w-3 h-3 bg-white/30 rounded-full" style={{ animation: "float 8s ease-in-out infinite 1s" }} />
      <div className="absolute bottom-60 left-1/4 w-2 h-2 bg-white/40 rounded-full" style={{ animation: "float 7s ease-in-out infinite 2s" }} />
      <div className="absolute top-1/3 right-1/3 w-4 h-4 bg-white/20 rounded-full" style={{ animation: "float 9s ease-in-out infinite 1.5s" }} />
      
      {/* Decorative animated circles */}
      <div 
        className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-br from-[#0ea5e9]/20 to-purple-500/20 rounded-full blur-3xl"
        style={{ animation: "float 10s ease-in-out infinite, pulse 3s ease-in-out infinite" }}
      />
      <div 
        className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-br from-cyan-500/20 to-[#0ea5e9]/20 rounded-full blur-3xl"
        style={{ animation: "float 12s ease-in-out infinite 2s, pulse 4s ease-in-out infinite 1s" }}
      />
      
      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-40 pb-32 text-center">
        <div 
          className="inline-block mb-6 px-6 py-3 bg-white/20 backdrop-blur-md rounded-full text-white text-sm font-medium border border-white/30 shadow-xl"
          style={{ animation: "fadeInUp 1s ease-out, float 3s ease-in-out infinite 0.5s" }}
        >
          ✨ Professional Cleaning Services
        </div>
        
        <h1 
          className="text-white text-6xl md:text-7xl font-bold max-w-4xl mx-auto leading-tight mb-8"
          style={{ animation: "fadeInUp 1s ease-out 0.2s backwards" }}
        >
          A Fresh Start,
          <br />
          <span className="bg-gradient-to-r from-sky-200 via-cyan-200 to-blue-200 bg-clip-text text-transparent" style={{ animation: "shimmer 3s ease-in-out infinite" }}>
            Every Time
          </span>
        </h1>
        
        <p 
          className="text-white/90 text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed mb-10"
          style={{ animation: "fadeInUp 1s ease-out 0.4s backwards" }}
        >
          Experience spotless spaces and exceptional service. We bring cleanliness,
          comfort, and peace of mind to your home or office.
        </p>
        
        <div 
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          style={{ animation: "fadeInUp 1s ease-out 0.6s backwards" }}
        >
          <button className="group relative bg-white text-[#0ea5e9] px-10 py-5 rounded-full font-bold text-lg hover:bg-sky-50 transition-all hover:scale-110 shadow-2xl overflow-hidden">
            <span className="relative z-10">Get Your Free Quote</span>
            <div className="absolute inset-0 bg-gradient-to-r from-[#0ea5e9] to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <span className="relative z-10 group-hover:text-white transition-colors duration-500">Get Your Free Quote</span>
          </button>
          <button className="group border-2 border-white text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-white hover:text-[#0ea5e9] transition-all hover:scale-110 shadow-2xl">
            📞 Call Now
          </button>
        </div>
        
        {/* Scroll Indicator */}
        <div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          style={{ animation: "bounce 2s ease-in-out infinite" }}
        >
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-white/70 rounded-full" style={{ animation: "scrollDown 2s ease-in-out infinite" }} />
          </div>
        </div>
      </div>
    </section>
  );
}

function TabNav({
  activeTab,
  onTabChange,
}: {
  activeTab: TabId;
  onTabChange: (id: TabId) => void;
}) {
  const { elementRef, isVisible } = useScrollAnimation();

  return (
    <nav 
      ref={elementRef}
      className={`relative z-20 max-w-5xl mx-auto px-6 -mt-16 transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-3 flex gap-3 border border-gray-100">
        {TABS.map((tab, index) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => onTabChange(tab.id)}
            className={`flex-1 px-8 py-5 text-sm font-bold transition-all duration-500 rounded-2xl relative overflow-hidden group ${
              activeTab === tab.id
                ? "bg-gradient-to-r from-[#0ea5e9] via-[#0284c7] to-[#0369a1] text-white shadow-lg scale-105"
                : "text-gray-600 hover:text-[#0ea5e9] hover:bg-gradient-to-r hover:from-sky-50 hover:to-cyan-50 hover:scale-105"
            }`}
            style={{
              animation: `fadeInUp 0.6s ease-out ${index * 0.1}s backwards`,
            }}
          >
            {activeTab === tab.id && (
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent" style={{ animation: "shimmer 2s ease-in-out infinite" }} />
            )}
            <span className="relative z-10">{tab.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}

const SERVICE_CARDS = [
  { icon: "✨", value: "Deep Clean", label: "Thorough top-to-bottom service for a reset" },
  { icon: "🏠", value: "Regular", label: "Weekly or bi-weekly maintenance cleaning" },
  { icon: "🏢", value: "Commercial", label: "Offices, retail, and shared spaces" },
  { icon: "🪟", value: "Move In/Out", label: "Before or after you move" },
  { icon: "🌿", value: "Eco-Friendly", label: "Green products, same great results" },
  { icon: "⭐", value: "One-Time", label: "Single visits for events or catch-up" },
];

function ServiceCard({
  icon,
  value,
  label,
  index,
}: {
  icon: string;
  value: string;
  label: string;
  index: number;
}) {
  const { elementRef, isVisible } = useScrollAnimation();

  return (
    <div 
      ref={elementRef}
      className={`group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border border-gray-100 relative overflow-hidden ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
      }`}
      style={{
        transitionDelay: `${index * 100}ms`,
      }}
    >
      {/* Animated background gradient on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0ea5e9]/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Shine effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      </div>
      
      <div className="relative z-10">
        <div className="w-20 h-20 bg-gradient-to-br from-[#0ea5e9] via-[#0284c7] to-[#0369a1] rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg">
          <span className="text-4xl group-hover:scale-125 transition-transform duration-500" aria-hidden>
            {icon}
          </span>
        </div>
        <p className="text-gray-900 font-bold text-xl mb-3 group-hover:text-[#0ea5e9] transition-colors duration-300">{value}</p>
        <p className="text-gray-600 leading-relaxed">{label}</p>
      </div>
    </div>
  );
}

const BENEFIT_CARDS = [
  { value: "500+", label: "Happy clients", sub: "and growing" },
  { value: "4.9", label: "Average rating", sub: "from reviews" },
  { value: "100%", label: "Satisfaction", sub: "guaranteed" },
  { value: "Insured", label: "Fully covered", sub: "peace of mind" },
  { value: "Eco", label: "Green options", sub: "available" },
  { value: "Flexible", label: "Scheduling", sub: "that fits you" },
];

const PRICING_CARDS = [
  { value: "From $120", label: "One-time clean", sub: "Single visit, full service" },
  { value: "From $95", label: "Recurring visit", sub: "Per visit on a schedule" },
  { value: "Custom", label: "Commercial & large", sub: "Quote based on your space" },
];

function DataCard({
  value,
  label,
  sub,
  index,
}: {
  value: string;
  label: string;
  sub: string;
  index: number;
}) {
  const { elementRef, isVisible } = useScrollAnimation();

  return (
    <div 
      ref={elementRef}
      className={`group relative bg-gradient-to-br from-white via-sky-50/50 to-cyan-50/50 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-sky-100 overflow-hidden hover:-translate-y-2 hover:scale-105 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
      }`}
      style={{
        transitionDelay: `${index * 100}ms`,
      }}
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0ea5e9]/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Shimmer effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      </div>
      
      <div className="relative z-10">
        <p className="text-[#0ea5e9] font-bold text-4xl mb-3 group-hover:scale-110 transition-transform duration-300 inline-block" style={{ textShadow: "0 2px 10px rgba(14, 165, 233, 0.3)" }}>{value}</p>
        <p className="text-gray-900 font-semibold text-lg mb-2">{label}</p>
        <p className="text-gray-600 text-sm">{sub}</p>
      </div>
    </div>
  );
}

function TabContent({ activeTab }: { activeTab: TabId }) {
  if (activeTab === "services") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {SERVICE_CARDS.map((card, index) => (
          <ServiceCard
            key={card.value}
            icon={card.icon}
            value={card.value}
            label={card.label}
            index={index}
          />
        ))}
      </div>
    );
  }

  if (activeTab === "benefits") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {BENEFIT_CARDS.map((card, index) => (
          <DataCard
            key={card.label}
            value={card.value}
            label={card.label}
            sub={card.sub}
            index={index}
          />
        ))}
      </div>
    );
  }

  if (activeTab === "savings") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {PRICING_CARDS.map((card, index) => (
          <DataCard
            key={card.label}
            value={card.value}
            label={card.label}
            sub={card.sub}
            index={index}
          />
        ))}
      </div>
    );
  }

  return null;
}

function CTASection() {
  const { elementRef, isVisible } = useScrollAnimation();

  return (
    <section 
      ref={elementRef}
      className="relative py-32 overflow-hidden"
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0ea5e9] via-[#0284c7] to-[#0369a1]" style={{ animation: "gradientShift 10s ease infinite" }} />
      
      {/* Floating orbs */}
      <div 
        className="absolute top-10 right-10 w-80 h-80 bg-white/10 rounded-full blur-3xl"
        style={{ animation: "float 15s ease-in-out infinite, pulse 4s ease-in-out infinite" }}
      />
      <div 
        className="absolute bottom-10 left-10 w-96 h-96 bg-cyan-300/10 rounded-full blur-3xl"
        style={{ animation: "float 18s ease-in-out infinite 2s, pulse 5s ease-in-out infinite 1s" }}
      />
      <div 
        className="absolute top-1/2 left-1/2 w-64 h-64 bg-purple-400/10 rounded-full blur-3xl"
        style={{ animation: "float 12s ease-in-out infinite 1s" }}
      />
      
      {/* Sparkle effects */}
      <div className="absolute top-20 left-1/4 w-1 h-1 bg-white rounded-full" style={{ animation: "twinkle 2s ease-in-out infinite" }} />
      <div className="absolute top-40 right-1/3 w-1 h-1 bg-white rounded-full" style={{ animation: "twinkle 3s ease-in-out infinite 0.5s" }} />
      <div className="absolute bottom-32 left-1/3 w-1 h-1 bg-white rounded-full" style={{ animation: "twinkle 2.5s ease-in-out infinite 1s" }} />
      
      <div 
        className={`relative z-10 max-w-4xl mx-auto px-6 text-center transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
        }`}
      >
        <div 
          className="inline-block mb-6 px-6 py-3 bg-white/25 backdrop-blur-md rounded-full text-white text-sm font-bold border border-white/40 shadow-2xl"
          style={{ animation: "float 3s ease-in-out infinite" }}
        >
          🎉 Limited Time Offer
        </div>
        
        <h2 className="text-white text-5xl md:text-6xl font-bold mb-6 leading-tight">
          Ready for a <span className="bg-gradient-to-r from-cyan-200 to-blue-200 bg-clip-text text-transparent">spotless</span> space?
        </h2>
        
        <p className="text-white/95 text-xl md:text-2xl mb-10 max-w-2xl mx-auto leading-relaxed">
          Book your first clean today and get <span className="font-bold text-cyan-200">15% off!</span> No commitment required
          for one-time services.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
          <button
            type="button"
            className="group relative bg-white text-[#0ea5e9] px-10 py-5 font-bold text-lg rounded-full hover:bg-sky-50 transition-all hover:scale-110 shadow-2xl overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <span className="relative z-10 group-hover:text-white transition-colors duration-500">Get Your Free Quote ✨</span>
          </button>
          <button
            type="button"
            className="group border-3 border-white text-white px-10 py-5 font-bold text-lg rounded-full hover:bg-white hover:text-[#0ea5e9] transition-all hover:scale-110 shadow-2xl"
          >
            📞 Call Us Now
          </button>
        </div>
      </div>
    </section>
  );
}

export default function Cleaning() {
  const [activeTab, setActiveTab] = useState<TabId>("services");

  return (
    <>
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes scrollDown {
          0% {
            opacity: 0;
            transform: translateY(0);
          }
          40% {
            opacity: 1;
          }
          80% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 0;
          }
        }

        @keyframes gradientShift {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @keyframes twinkle {
          0%, 100% {
            opacity: 0;
            transform: scale(0);
          }
          50% {
            opacity: 1;
            transform: scale(1);
          }
        }

        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 10px;
        }

        ::-webkit-scrollbar-track {
          background: #f1f1f1;
        }

        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #0ea5e9, #0284c7);
          border-radius: 5px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #0284c7, #0369a1);
        }
      `}</style>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <Header />
        <Hero />
        <TabNav activeTab={activeTab} onTabChange={setActiveTab} />
        <main className="max-w-6xl mx-auto px-6 py-20">
          <TabContent activeTab={activeTab} />
        </main>
        <CTASection />
      </div>
    </>
  );
}
