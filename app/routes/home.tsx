import type { Route } from "./+types/home";
import { useState } from "react";

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

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log("Form submitted:", formData);
    setIsSubmitted(true);
    setTimeout(() => {
      onClose();
      setIsSubmitted(false);
      setFormData({ name: "", email: "", message: "" });
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>
        
        {!isSubmitted ? (
          <>
            <h2 className="text-[#1e3a5f] text-2xl font-bold mb-2">
              Start Your Project
            </h2>
            <p className="text-gray-600 mb-6">
              Tell us about your project and we'll get back to you within 24 hours.
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1e3a5f] focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1e3a5f] focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Project Details
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1e3a5f] focus:border-transparent"
                  placeholder="Tell us about your project goals, timeline, and budget..."
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-[#1e3a5f] text-white py-3 rounded-lg font-medium hover:bg-[#2d5a87] transition-colors"
              >
                Send Message
              </button>
            </form>
          </>
        ) : (
          <div className="text-center py-8">
            <div className="text-4xl mb-4">✓</div>
            <h3 className="text-[#1e3a5f] text-xl font-bold mb-2">
              Message Sent!
            </h3>
            <p className="text-gray-600">
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
  return (
    <header className="w-full bg-[#1e3a5f] py-4 px-6">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <span className="text-white font-semibold text-xl tracking-tight">
          CustomSites
        </span>
        <nav className="hidden md:flex gap-6 text-sm text-white/90">
          <button
            onClick={onGoToServices}
            className="hover:text-white transition-colors"
          >
            Services
          </button>
          <a href="/portfolio" className="hover:text-white transition-colors">
            Portfolio
          </a>
          <button
            onClick={onOpenContact}
            className="hover:text-white transition-colors"
          >
            Contact
          </button>
        </nav>
      </div>
    </header>
  );
}

function Hero({ onOpenContact }: { onOpenContact: () => void }) {
  return (
    <section className="relative w-full min-h-[480px] bg-gradient-to-br from-[#1e3a5f] to-[#2d5a87] overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600&q=80)",
        }}
      />
      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-24 pb-20">
        <h1 className="text-white text-5xl md:text-6xl font-bold max-w-2xl leading-tight">
          Your Vision, Our Craft
        </h1>
        <p className="text-white/95 text-xl md:text-2xl max-w-2xl mt-6 leading-relaxed">
          Custom websites designed to captivate your audience and grow your business.
        </p>
        <div className="flex gap-4 mt-8">
          <button
            type="button"
            onClick={onOpenContact}
            className="bg-white text-[#1e3a5f] px-8 py-3 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
          >
            Start Your Project
          </button>
          <a
            href="/portfolio"
            className="border-2 border-white text-white px-8 py-3 font-semibold rounded-lg hover:bg-white/10 transition-colors inline-block text-center"
          >
            View Portfolio
          </a>
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
  return (
    <nav className="max-w-6xl mx-auto px-6 -mt-1">
      <div className="flex gap-0">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => onTabChange(tab.id)}
            className={
              activeTab === tab.id
                ? "px-8 py-4 text-sm font-medium transition-colors bg-[#1e3a5f] text-white"
                : "px-8 py-4 text-sm font-medium transition-colors bg-[#e8eef4] text-[#1e3a5f] hover:bg-[#dce4ec]"
            }
          >
            {tab.label}
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
}: {
  icon: string;
  value: string;
  label: string;
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1">
      <span className="text-3xl" aria-hidden>
        {icon}
      </span>
      <p className="text-[#1e3a5f] font-bold text-xl mt-3">{value}</p>
      <p className="text-gray-600 text-sm mt-1">{label}</p>
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
}: {
  value: string;
  label: string;
  sub: string;
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
      <p className="text-[#1e3a5f] font-bold text-2xl">{value}</p>
      <p className="text-[#1e3a5f] font-medium mt-1">{label}</p>
      <p className="text-gray-500 text-sm mt-0.5">{sub}</p>
    </div>
  );
}

function TabContent({ activeTab }: { activeTab: TabId }) {
  if (activeTab === "services") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SERVICE_CARDS.map((card) => (
          <ServiceCard
            key={card.value}
            icon={card.icon}
            value={card.value}
            label={card.label}
          />
        ))}
      </div>
    );
  }

  if (activeTab === "benefits") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {BENEFIT_CARDS.map((card) => (
          <DataCard
            key={card.label}
            value={card.value}
            label={card.label}
            sub={card.sub}
          />
        ))}
      </div>
    );
  }

  if (activeTab === "pricing") {
    return (
      <>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRICING_CARDS.map((card) => (
            <DataCard
              key={card.label}
              value={card.value}
              label={card.label}
              sub={card.sub}
            />
          ))}
        </div>
        <div className="mt-8 text-center">
          <p className="text-gray-600 text-sm">
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
  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-[#1e3a5f] text-3xl font-bold text-center mb-12">
          Our Process
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            {
              step: "01",
              title: "Discovery",
              desc: "We learn about your goals, audience, and vision",
            },
            {
              step: "02",
              title: "Design",
              desc: "Custom mockups tailored to your brand",
            },
            {
              step: "03",
              title: "Development",
              desc: "Clean code built with modern technologies",
            },
            {
              step: "04",
              title: "Launch",
              desc: "Testing, deployment, and ongoing support",
            },
          ].map((item) => (
            <div key={item.step} className="text-center">
              <div className="text-4xl font-bold text-[#1e3a5f]/20 mb-2">
                {item.step}
              </div>
              <h3 className="text-[#1e3a5f] font-bold text-lg mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection({ onOpenContact }: { onOpenContact: () => void }) {
  return (
    <section className="bg-[#e8eef4] py-16">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-[#1e3a5f] text-3xl font-bold">
          Ready to bring your vision to life?
        </h2>
        <p className="text-gray-600 mt-4 max-w-2xl mx-auto text-lg">
          Let's discuss your project and create something amazing together.
          Free consultation included with every project.
        </p>
        <div className="flex gap-4 justify-center mt-8">
          <button
            type="button"
            onClick={onOpenContact}
            className="bg-[#1e3a5f] text-white px-8 py-3 font-medium rounded-lg hover:bg-[#2d5a87] transition-colors"
          >
            Start Your Project
          </button>
          <button
            type="button"
            onClick={onOpenContact}
            className="border-2 border-[#1e3a5f] text-[#1e3a5f] px-8 py-3 font-medium rounded-lg hover:bg-[#1e3a5f] hover:text-white transition-colors"
          >
            Schedule a Call
          </button>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-[#1e3a5f] text-white py-8">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <p className="text-white/80 text-sm">
          © 2026 CustomSites. All rights reserved.
        </p>
        <div className="flex gap-6 justify-center mt-4 text-sm text-white/70">
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
    <div className="min-h-screen bg-white">
      <Header
        onOpenContact={() => setIsContactOpen(true)}
        onGoToServices={scrollToServices}
      />
      <Hero onOpenContact={() => setIsContactOpen(true)} />
      <TabNav activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="max-w-6xl mx-auto px-6 py-12">
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
  );
}
