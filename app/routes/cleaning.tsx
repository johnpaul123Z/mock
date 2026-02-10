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
    <header className="w-full bg-[#1e3a5f] py-4 px-6">
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
    <section className="relative w-full min-h-[420px] bg-[#2d5a87] overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-40"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1600&q=80)",
        }}
      />
      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-20 pb-16">
        <h1 className="text-white text-4xl md:text-5xl font-bold max-w-xl leading-tight">
          A Fresh Start, Every Time
        </h1>
        <p className="text-white/95 text-lg md:text-xl max-w-xl mt-4 leading-relaxed">
          Professional cleaning that leaves your space spotless and refreshed.
          Trusted by homes and offices for reliability and attention to detail.
        </p>
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
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
      <span className="text-2xl" aria-hidden>
        {icon}
      </span>
      <p className="text-[#1e3a5f] font-bold text-xl mt-3">{value}</p>
      <p className="text-gray-600 text-sm mt-1">{label}</p>
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
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
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
    <section className="bg-[#e8eef4] py-12">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-[#1e3a5f] text-2xl font-bold">
          Ready for a spotless space?
        </h2>
        <p className="text-gray-600 mt-2 max-w-md mx-auto">
          Book your first clean today. No commitment required for one-time
          services.
        </p>
        <button
          type="button"
          className="mt-6 bg-[#1e3a5f] text-white px-8 py-3 font-medium rounded-lg hover:bg-[#2d5a87] transition-colors"
        >
          Get a quote
        </button>
      </div>
    </section>
  );
}

export default function Cleaning() {
  const [activeTab, setActiveTab] = useState<TabId>("services");

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <TabNav activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="max-w-6xl mx-auto px-6 py-10">
        <TabContent activeTab={activeTab} />
      </main>
      <CTASection />
    </div>
  );
}
