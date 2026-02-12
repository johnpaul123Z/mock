import type { Route } from "./+types/home";
import { useState, useEffect, useRef } from "react";
import emailjs from "@emailjs/browser";

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

export function meta({}: Route.MetaArgs) {
  return [
    { title: "CustomSites | Custom Website Design & Development" },
    {
      name: "description",
      content: "Premium custom websites that elevate your brand and drive results.",
    },
  ];
}

function ContactModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Initialize EmailJS once when component mounts
  useEffect(() => {
    emailjs.init("W5lBzugOAajMD00Ga");
  }, []);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const result = await emailjs.send(
        "service_xwl6rpk",  // Service ID
        "template_di0byaq",  // Template ID
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_email: "customsites21@gmail.com",
        }
      );
      
      console.log("Email sent successfully:", result);
      setIsSubmitted(true);
      setTimeout(() => {
        onClose();
        setIsSubmitted(false);
        setFormData({ name: "", email: "", message: "" });
      }, 2000);
    } catch (error) {
      console.error("Failed to send email:", error);
      alert("Failed to send message. Please try again or email us directly at customsites21@gmail.com");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
      style={{ animation: "fadeIn 0.3s ease-out" }}
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-3xl max-w-md w-full p-10 relative shadow-2xl border border-gray-100"
        style={{ animation: "scaleIn 0.4s ease-out" }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all"
          type="button"
        >
          ✕
        </button>
        
        {!isSubmitted ? (
          <>
            <div className="mb-8">
              <h2 className="text-[#1e3a5f] text-3xl font-bold mb-3 tracking-tight">
                Start Your Project
              </h2>
              <p className="text-gray-600 text-base leading-relaxed">
                Tell us about your project and we'll get back to you within 24 hours.
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-5 py-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#1e3a5f] focus:border-transparent transition-all outline-none text-gray-900 placeholder-gray-400"
                  placeholder="John Smith"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-5 py-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#1e3a5f] focus:border-transparent transition-all outline-none text-gray-900 placeholder-gray-400"
                  placeholder="john@company.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Project Details
                </label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full px-5 py-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#1e3a5f] focus:border-transparent transition-all outline-none resize-none text-gray-900 placeholder-gray-400"
                  placeholder="Tell us about your project goals, timeline, and budget..."
                />
              </div>
              
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-[#1e3a5f] to-[#2d5a87] text-white py-4 rounded-xl font-semibold hover:shadow-xl hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Sending...
                  </span>
                ) : (
                  "Send Message →"
                )}
              </button>
            </form>
          </>
        ) : (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <div className="text-5xl text-green-600">✓</div>
            </div>
            <h3 className="text-[#1e3a5f] text-2xl font-bold mb-3">
              Message Sent!
            </h3>
            <p className="text-gray-600 text-lg">
              We'll get back to you within 24 hours.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

const TABS = [
  { id: "services", label: "Our Services" },
  { id: "benefits", label: "Why Choose Us" },
  { id: "pricing", label: "Pricing" },
] as const;

type TabId = (typeof TABS)[number]["id"];

function Header({
  onOpenContact,
  onGoToServices,
}: {
  onOpenContact: () => void;
  onGoToServices: () => void;
}) {
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
          : "bg-[#1e3a5f]"
      }`}
      style={{ animation: "slideDown 0.8s ease-out" }}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <span 
          className={`font-bold text-xl tracking-tight transition-all duration-300 ${
            scrolled ? "text-[#1e3a5f]" : "text-white"
          }`}
          style={{ animation: "fadeIn 1s ease-out" }}
        >
          ✨ CustomSites
        </span>
        <nav className="hidden md:flex gap-6 text-sm font-medium">
          <button
            onClick={onGoToServices}
            className={`transition-all duration-300 hover:scale-110 ${
              scrolled ? "text-gray-600 hover:text-[#1e3a5f]" : "text-white/90 hover:text-white"
            }`}
          >
            Services
          </button>
          <a 
            href="/portfolio" 
            className={`transition-all duration-300 hover:scale-110 ${
              scrolled ? "text-gray-600 hover:text-[#1e3a5f]" : "text-white/90 hover:text-white"
            }`}
          >
            Portfolio
          </a>
          <button
            onClick={onOpenContact}
            className={`transition-all duration-300 hover:scale-110 ${
              scrolled ? "text-gray-600 hover:text-[#1e3a5f]" : "text-white/90 hover:text-white"
            }`}
          >
            Contact
          </button>
        </nav>
      </div>
    </header>
  );
}

function Hero({ onOpenContact }: { onOpenContact: () => void }) {
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
            "url(https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600&q=80)",
          transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px) scale(1.1)`,
        }}
      />
      
      {/* Animated Gradient Overlay */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-[#1e3a5f]/95 via-[#2d5a87]/90 to-[#1e3a5f]/95"
        style={{ animation: "pulse 4s ease-in-out infinite" }}
      />
      
      {/* Floating Particles */}
      <div className="absolute top-10 left-10 w-2 h-2 bg-white/40 rounded-full" style={{ animation: "float 6s ease-in-out infinite" }} />
      <div className="absolute top-40 right-20 w-3 h-3 bg-white/30 rounded-full" style={{ animation: "float 8s ease-in-out infinite 1s" }} />
      <div className="absolute bottom-60 left-1/4 w-2 h-2 bg-white/40 rounded-full" style={{ animation: "float 7s ease-in-out infinite 2s" }} />
      <div className="absolute top-1/3 right-1/3 w-4 h-4 bg-white/20 rounded-full" style={{ animation: "float 9s ease-in-out infinite 1.5s" }} />
      
      {/* Decorative animated circles */}
      <div 
        className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl"
        style={{ animation: "float 10s ease-in-out infinite, pulse 3s ease-in-out infinite" }}
      />
      <div 
        className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-br from-purple-500/20 to-cyan-500/20 rounded-full blur-3xl"
        style={{ animation: "float 12s ease-in-out infinite 2s, pulse 4s ease-in-out infinite 1s" }}
      />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-44 pb-36">
        <div 
          className="inline-flex items-center gap-2 mb-8 px-5 py-2.5 bg-white/15 backdrop-blur-md rounded-full text-white text-sm font-semibold border border-white/20 shadow-2xl"
          style={{ animation: "fadeInUp 1s ease-out, float 3s ease-in-out infinite 0.5s" }}
        >
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          Premium Custom Websites
        </div>
        
        <h1 
          className="text-white text-7xl md:text-8xl font-black max-w-5xl leading-[1.1] mb-8 tracking-tight"
          style={{ animation: "fadeInUp 1s ease-out 0.2s backwards" }}
        >
          Transform Your
          <br />
          <span className="bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300 bg-clip-text text-transparent" style={{ animation: "shimmer 3s ease-in-out infinite", WebkitBackgroundClip: "text" }}>
            Digital Presence
          </span>
        </h1>
        
        <p 
          className="text-white/90 text-2xl md:text-3xl max-w-3xl leading-relaxed mb-12 font-light"
          style={{ animation: "fadeInUp 1s ease-out 0.4s backwards" }}
        >
          We craft stunning, high-performance websites that captivate audiences and drive measurable business growth.
        </p>
        
        <div 
          className="flex flex-col sm:flex-row gap-5 items-center sm:items-start"
          style={{ animation: "fadeInUp 1s ease-out 0.6s backwards" }}
        >
          <button
            type="button"
            onClick={onOpenContact}
            className="group relative bg-white text-[#1e3a5f] px-12 py-5 rounded-2xl font-bold text-lg hover:shadow-2xl transition-all hover:scale-105 shadow-xl overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <span className="relative z-10 group-hover:text-white transition-colors duration-500 flex items-center gap-2">
              Start Your Project
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </button>
          <a
            href="/portfolio"
            className="group border-2 border-white/80 text-white px-12 py-5 rounded-2xl font-bold text-lg hover:bg-white hover:border-white hover:text-[#1e3a5f] transition-all hover:scale-105 shadow-xl inline-flex items-center gap-2 backdrop-blur-sm"
          >
            View Portfolio
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
        
        {/* Stats Bar */}
        <div 
          className="mt-20 grid grid-cols-3 gap-8 max-w-2xl"
          style={{ animation: "fadeInUp 1s ease-out 0.8s backwards" }}
        >
          <div className="text-center">
            <div className="text-white text-4xl font-bold mb-1">150+</div>
            <div className="text-white/70 text-sm font-medium">Projects Launched</div>
          </div>
          <div className="text-center border-l border-r border-white/20">
            <div className="text-white text-4xl font-bold mb-1">5.0</div>
            <div className="text-white/70 text-sm font-medium">Client Rating</div>
          </div>
          <div className="text-center">
            <div className="text-white text-4xl font-bold mb-1">100%</div>
            <div className="text-white/70 text-sm font-medium">Satisfaction</div>
          </div>
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
                ? "bg-gradient-to-r from-[#1e3a5f] via-[#2d5a87] to-[#1e3a5f] text-white shadow-lg scale-105"
                : "text-gray-600 hover:text-[#1e3a5f] hover:bg-gradient-to-r hover:from-blue-50 hover:to-cyan-50 hover:scale-105"
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
  {
    icon: "🎨",
    value: "Custom Design",
    label: "Tailored designs that match your brand identity",
  },
  {
    icon: "💻",
    value: "Web Development",
    label: "Fast, responsive sites built with modern tech",
  },
  {
    icon: "🛍️",
    value: "E-Commerce",
    label: "Complete online stores with secure payments",
  },
  {
    icon: "📱",
    value: "Mobile-First",
    label: "Beautiful on every device, every screen",
  },
  {
    icon: "🔍",
    value: "SEO Optimized",
    label: "Built to rank and get discovered online",
  },
  {
    icon: "⚡",
    value: "Support & Maintenance",
    label: "Ongoing updates and technical support",
  },
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
      <div className="absolute inset-0 bg-gradient-to-br from-[#1e3a5f]/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Shine effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      </div>
      
      <div className="relative z-10">
        <div className="w-16 h-16 bg-gradient-to-br from-[#1e3a5f] via-[#2d5a87] to-[#1e3a5f] rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg">
          <span className="text-3xl group-hover:scale-125 transition-transform duration-500" aria-hidden>
            {icon}
          </span>
        </div>
        <h3 className="text-gray-900 font-bold text-xl mb-2.5 group-hover:text-[#1e3a5f] transition-colors duration-300 tracking-tight">{value}</h3>
        <p className="text-gray-600 leading-relaxed text-sm font-medium">{label}</p>
      </div>
    </div>
  );
}

const BENEFIT_CARDS = [
  { value: "150+", label: "Websites launched", sub: "since 2020" },
  { value: "5.0", label: "Client rating", sub: "across platforms" },
  {
    value: "2-4 weeks",
    label: "Average delivery",
    sub: "from start to launch",
  },
  { value: "100%", label: "Custom code", sub: "no templates" },
  { value: "Lifetime", label: "Support included", sub: "we're here for you" },
  {
    value: "Modern",
    label: "Tech stack",
    sub: "React, Tailwind, and more",
  },
];

const PRICING_CARDS = [
  {
    value: "$500 - $800",
    label: "Starter Website",
    sub: "1-3 pages • Mobile responsive • Contact form",
  },
  {
    value: "$1,000 - $1,800",
    label: "Standard Business",
    sub: "4-7 pages • Custom design • SEO • Booking",
  },
  {
    value: "$2,500 - $4,000",
    label: "Premium Package",
    sub: "8-12 pages • Advanced features • CRM",
  },
  {
    value: "$75 - $150/mo",
    label: "Maintenance Plan",
    sub: "Hosting • Updates • Security • Edits",
  },
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
      className={`group relative bg-gradient-to-br from-white via-blue-50/50 to-cyan-50/50 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-blue-100 overflow-hidden hover:-translate-y-2 hover:scale-105 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
      }`}
      style={{
        transitionDelay: `${index * 100}ms`,
      }}
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1e3a5f]/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Shimmer effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      </div>
      
      <div className="relative z-10">
        <p className="text-[#1e3a5f] font-bold text-4xl mb-3 group-hover:scale-110 transition-transform duration-300 inline-block" style={{ textShadow: "0 2px 10px rgba(30, 58, 95, 0.3)" }}>{value}</p>
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

  if (activeTab === "pricing") {
    return (
      <>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
        <div className="mt-10 text-center">
          <p className="text-gray-600 text-base">
            💡 All packages include mobile-responsive design, SSL security, and free consultation.
            <br />
            Payment plans available for packages over $1,000.
          </p>
        </div>
      </>
    );
  }

  return null;
}

function ProcessSection() {
  const { elementRef, isVisible } = useScrollAnimation();

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-blue-50/30 to-cyan-50/30" />
      
      {/* Floating orbs */}
      <div 
        className="absolute top-10 right-10 w-64 h-64 bg-[#1e3a5f]/10 rounded-full blur-3xl"
        style={{ animation: "float 15s ease-in-out infinite" }}
      />
      <div 
        className="absolute bottom-10 left-10 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl"
        style={{ animation: "float 18s ease-in-out infinite 2s" }}
      />
      
      <div 
        ref={elementRef}
        className={`relative z-10 max-w-7xl mx-auto px-6 transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
        }`}
      >
        <div className="text-center mb-20">
          <div className="inline-block px-4 py-2 bg-[#1e3a5f]/10 rounded-full text-[#1e3a5f] text-sm font-semibold mb-4">
            How We Work
          </div>
          <h2 className="text-[#1e3a5f] text-5xl md:text-6xl font-black text-center mb-5 tracking-tight">
            Our <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">Process</span>
          </h2>
          <p className="text-gray-600 text-xl max-w-2xl mx-auto">
            A proven methodology that delivers exceptional results every time
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              step: "01",
              title: "Discovery",
              desc: "Deep dive into your goals, audience, and vision to craft the perfect strategy",
            },
            {
              step: "02",
              title: "Design",
              desc: "Pixel-perfect mockups and prototypes tailored to your brand identity",
            },
            {
              step: "03",
              title: "Development",
              desc: "Clean, scalable code built with cutting-edge technologies",
            },
            {
              step: "04",
              title: "Launch",
              desc: "Rigorous testing, seamless deployment, and continuous optimization",
            },
          ].map((item, index) => (
            <div 
              key={item.step} 
              className="group relative bg-white rounded-3xl p-8 hover:bg-gradient-to-br hover:from-white hover:to-blue-50/30 transition-all duration-500 hover:scale-[1.02] shadow-lg hover:shadow-2xl border border-gray-200/50"
              style={{
                animation: `fadeInUp 0.8s ease-out ${index * 0.15}s backwards`,
              }}
            >
              <div className="absolute -top-3 -right-3 w-12 h-12 bg-gradient-to-br from-[#1e3a5f] to-cyan-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                <span className="text-white text-sm font-bold">{item.step}</span>
              </div>
              
              <h3 className="text-[#1e3a5f] font-bold text-2xl mb-4 tracking-tight">
                {item.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              
              {/* Progress connector line (except last item) */}
              {index < 3 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-gray-300 to-transparent" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection({ onOpenContact }: { onOpenContact: () => void }) {
  const { elementRef, isVisible } = useScrollAnimation();

  return (
    <section 
      ref={elementRef}
      className="relative py-32 overflow-hidden"
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1e3a5f] via-[#2d5a87] to-[#1e3a5f]" style={{ animation: "gradientShift 10s ease infinite" }} />
      
      {/* Floating orbs */}
      <div 
        className="absolute top-10 right-10 w-80 h-80 bg-cyan-400/10 rounded-full blur-3xl"
        style={{ animation: "float 15s ease-in-out infinite, pulse 4s ease-in-out infinite" }}
      />
      <div 
        className="absolute bottom-10 left-10 w-96 h-96 bg-blue-300/10 rounded-full blur-3xl"
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
        className={`relative z-10 max-w-5xl mx-auto px-6 text-center transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
        }`}
      >
        <div 
          className="inline-flex items-center gap-2 mb-8 px-5 py-2.5 bg-white/20 backdrop-blur-md rounded-full text-white text-sm font-semibold border border-white/30 shadow-2xl"
          style={{ animation: "float 3s ease-in-out infinite" }}
        >
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          Let's Build Something Amazing
        </div>
        
        <h2 className="text-white text-6xl md:text-7xl font-black mb-8 leading-[1.1] tracking-tight">
          Ready to Transform
          <br />
          Your <span className="bg-gradient-to-r from-cyan-200 via-blue-200 to-purple-200 bg-clip-text text-transparent">Digital Presence</span>?
        </h2>
        
        <p className="text-white/90 text-2xl md:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed font-light">
          Let's discuss your project and create something extraordinary together.
          <br />
          <span className="font-semibold text-cyan-200">Free consultation</span> and project roadmap included.
        </p>
        
        <button
          type="button"
          onClick={onOpenContact}
          className="group relative bg-white text-[#1e3a5f] px-14 py-6 font-bold text-xl rounded-2xl hover:shadow-2xl transition-all hover:scale-105 shadow-xl overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <span className="relative z-10 group-hover:text-white transition-colors duration-500 inline-flex items-center gap-3">
            Start Your Project
            <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </span>
        </button>
        
        {/* Trust indicators */}
        <div className="mt-16 flex items-center justify-center gap-12 text-white/80 text-sm font-medium">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span>5.0 Rating</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>100% Satisfaction</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>Fully Insured</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-[#0f1f3a] via-[#1e3a5f] to-[#0f1f3a] text-white py-16">
      {/* Subtle top border gradient */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">
              ✨ CustomSites
            </h3>
            <p className="text-white/70 leading-relaxed mb-4 max-w-md">
              Crafting premium custom websites that elevate brands and drive results. Your vision, our expertise.
            </p>
            <div className="flex gap-3">
              {['twitter', 'linkedin', 'github'].map((social) => (
                <a
                  key={social}
                  href={`#${social}`}
                  className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-all hover:scale-110"
                >
                  <span className="sr-only">{social}</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                </a>
              ))}
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2 text-white/70 text-sm">
              {['About Us', 'Services', 'Portfolio', 'Contact'].map((link) => (
                <li key={link}>
                  <a href={`#${link.toLowerCase().replace(' ', '-')}`} className="hover:text-white transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h4 className="font-bold mb-4 text-white">Get In Touch</h4>
            <ul className="space-y-2 text-white/70 text-sm">
              <li>customsites21@gmail.com</li>
              <li>Free consultation</li>
              <li>24-hour response time</li>
            </ul>
          </div>
        </div>
        
        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/60">
          <p>© 2026 CustomSites. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#terms" className="hover:text-white transition-colors">
              Terms of Service
            </a>
            <a href="#contact" className="hover:text-white transition-colors">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabId>("services");
  const [isContactOpen, setIsContactOpen] = useState(false);

  const scrollToServices = () => {
    const servicesSection = document.querySelector("main");
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: "smooth" });
    }
    setActiveTab("services");
  };

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

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
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
          background: linear-gradient(to bottom, #1e3a5f, #2d5a87);
          border-radius: 5px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #2d5a87, #1e3a5f);
        }
      `}</style>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <Header
          onOpenContact={() => setIsContactOpen(true)}
          onGoToServices={scrollToServices}
        />
        <Hero onOpenContact={() => setIsContactOpen(true)} />
        <TabNav activeTab={activeTab} onTabChange={setActiveTab} />
        <main className="max-w-6xl mx-auto px-6 py-20">
          <TabContent activeTab={activeTab} />
        </main>
        <ProcessSection />
        <CTASection onOpenContact={() => setIsContactOpen(true)} />
        <Footer />
        <ContactModal
          isOpen={isContactOpen}
          onClose={() => setIsContactOpen(false)}
        />
      </div>
    </>
  );
}
