import { useState } from "react";
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

const TABS = [
  { id: "services", label: "Our Services" },
  { id: "benefits", label: "Why Choose Us" },
  { id: "savings", label: "Plans & Pricing" },
] as const;

type TabId = (typeof TABS)[number]["id"];

function Header() {
  return (
    <header className="w-full bg-[#0ea5e9] py-4 px-6">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link to="/" className="text-white font-semibold text-xl tracking-tight">
          SparkClean
        </Link>
        <Link
          to="/"
          className="text-white/90 text-sm hover:text-white"
        >
          ← Back
        </Link>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative w-full min-h-[500px] bg-gradient-to-br from-[#0ea5e9] via-[#0284c7] to-[#0369a1] overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1600&q=80)",
        }}
      />
      {/* Decorative circles */}
      <div className="absolute top-20 right-20 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
      
      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-28 pb-20 text-center">
        <div className="inline-block mb-4 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium">
          ✨ Professional Cleaning Services
        </div>
        <h1 className="text-white text-5xl md:text-6xl font-bold max-w-3xl mx-auto leading-tight mb-6">
          A Fresh Start,
          <br />
          <span className="text-sky-100">Every Time</span>
        </h1>
        <p className="text-white/90 text-xl max-w-2xl mx-auto leading-relaxed">
          Experience spotless spaces and exceptional service. We bring cleanliness,
          comfort, and peace of mind to your home or office.
        </p>
        <button className="mt-8 bg-white text-[#0ea5e9] px-8 py-4 rounded-full font-semibold text-lg hover:bg-sky-50 transition-all hover:scale-105 shadow-xl">
          Get Your Free Quote
        </button>
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
    <nav className="relative z-20 max-w-5xl mx-auto px-6 -mt-8">
      <div className="bg-white rounded-2xl shadow-xl p-2 flex gap-2">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => onTabChange(tab.id)}
            className={
              activeTab === tab.id
                ? "flex-1 px-6 py-4 text-sm font-semibold transition-all bg-gradient-to-r from-[#0ea5e9] to-[#0284c7] text-white rounded-xl shadow-md"
                : "flex-1 px-6 py-4 text-sm font-semibold transition-all text-gray-600 hover:text-[#0ea5e9] hover:bg-gray-50 rounded-xl"
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
}: {
  icon: string;
  value: string;
  label: string;
}) {
  return (
    <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 border border-gray-100">
      <div className="w-16 h-16 bg-gradient-to-br from-[#0ea5e9] to-[#0284c7] rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
        <span className="text-3xl" aria-hidden>
          {icon}
        </span>
      </div>
      <p className="text-gray-900 font-bold text-xl mb-2">{value}</p>
      <p className="text-gray-600 leading-relaxed">{label}</p>
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
}: {
  value: string;
  label: string;
  sub: string;
}) {
  return (
    <div className="bg-gradient-to-br from-white to-sky-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all border border-sky-100">
      <p className="text-[#0ea5e9] font-bold text-3xl mb-2">{value}</p>
      <p className="text-gray-900 font-semibold text-lg mb-1">{label}</p>
      <p className="text-gray-600 text-sm">{sub}</p>
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

  if (activeTab === "savings") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {PRICING_CARDS.map((card) => (
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

  return null;
}

function CTASection() {
  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0ea5e9] via-[#0284c7] to-[#0369a1]" />
      <div className="absolute top-10 right-10 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
      
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <div className="inline-block mb-4 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium">
          🎉 Limited Time Offer
        </div>
        <h2 className="text-white text-4xl md:text-5xl font-bold mb-4">
          Ready for a spotless space?
        </h2>
        <p className="text-white/90 text-xl mb-8 max-w-2xl mx-auto">
          Book your first clean today and get 15% off! No commitment required
          for one-time services.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            type="button"
            className="bg-white text-[#0ea5e9] px-8 py-4 font-semibold rounded-full hover:bg-sky-50 transition-all hover:scale-105 shadow-xl"
          >
            Get Your Free Quote
          </button>
          <button
            type="button"
            className="border-2 border-white text-white px-8 py-4 font-semibold rounded-full hover:bg-white/10 transition-all"
          >
            Call Us Now
          </button>
        </div>
      </div>
    </section>
  );
}

export default function Cleaning() {
  const [activeTab, setActiveTab] = useState<TabId>("services");

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Hero />
      <TabNav activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="max-w-6xl mx-auto px-6 py-16">
        <TabContent activeTab={activeTab} />
      </main>
      <CTASection />
    </div>
  );
}
