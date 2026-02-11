import { Link } from "react-router";

export function meta() {
  return [
    { title: "Portfolio | PixelCraft Studios" },
    {
      name: "description",
      content: "Explore our portfolio of custom website designs and demos.",
    },
  ];
}

const DEMOS = [
  {
    id: "cleaning",
    title: "Cleaning Service Website",
    description: "Fresh, professional sky blue design for cleaning services",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&h=400&fit=crop",
    color: "#0ea5e9",
    link: "/cleaning",
    tags: ["Service Business", "Sky Blue Theme", "Tabbed Layout"],
  },
  {
    id: "coming-soon-1",
    title: "E-Commerce Store",
    description: "Coming soon - Full-featured online store with product catalog",
    image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=600&h=400&fit=crop",
    color: "#10b981",
    link: null,
    tags: ["E-Commerce", "Shopping Cart", "Product Gallery"],
  },
  {
    id: "coming-soon-2",
    title: "Restaurant Website",
    description: "Coming soon - Elegant restaurant site with menu and reservations",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop",
    color: "#ef4444",
    link: null,
    tags: ["Restaurant", "Menu Display", "Reservations"],
  },
  {
    id: "coming-soon-3",
    title: "SaaS Landing Page",
    description: "Coming soon - Modern SaaS product landing page",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
    color: "#3b82f6",
    link: null,
    tags: ["SaaS", "Tech", "Landing Page"],
  },
];

function Header() {
  return (
    <header className="w-full bg-[#1e3a5f] py-4 px-6">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link to="/" className="text-white font-semibold text-xl tracking-tight">
          PixelCraft Studios
        </Link>
        <Link
          to="/"
          className="text-white/90 text-sm hover:text-white transition-colors"
        >
          ← Back to Home
        </Link>
      </div>
    </header>
  );
}

function DemoCard({
  demo,
}: {
  demo: (typeof DEMOS)[number];
}) {
  const isComingSoon = !demo.link;
  
  const content = (
    <div className="group relative bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all">
      {/* Image */}
      <div className="relative h-64 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform group-hover:scale-105"
          style={{ backgroundImage: `url(${demo.image})` }}
        />
        {isComingSoon && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <span className="text-white text-lg font-semibold">Coming Soon</span>
          </div>
        )}
        {!isComingSoon && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-6">
            <span className="text-white font-medium">View Demo →</span>
          </div>
        )}
      </div>
      
      {/* Content */}
      <div className="p-6">
        <div className="flex items-center gap-2 mb-2">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: demo.color }}
          />
          <h3 className="text-[#1e3a5f] text-xl font-bold">{demo.title}</h3>
        </div>
        <p className="text-gray-600 text-sm mb-4">{demo.description}</p>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {demo.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-3 py-1 bg-gray-100 text-gray-600 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );

  if (isComingSoon) {
    return <div className="cursor-not-allowed opacity-75">{content}</div>;
  }

  return (
    <Link to={demo.link} className="block">
      {content}
    </Link>
  );
}

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#1e3a5f] to-[#2d5a87] py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-white text-4xl md:text-5xl font-bold">
            Our Portfolio
          </h1>
          <p className="text-white/90 text-lg md:text-xl mt-4 max-w-2xl mx-auto">
            Explore our collection of custom website designs. Each demo showcases
            different styles, features, and industry applications.
          </p>
        </div>
      </section>

      {/* Portfolio Grid */}
      <main className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {DEMOS.map((demo) => (
            <DemoCard key={demo.id} demo={demo} />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <h2 className="text-[#1e3a5f] text-2xl font-bold mb-4">
            Ready to build your custom website?
          </h2>
          <p className="text-gray-600 mb-6">
            Let's create something unique for your business.
          </p>
          <Link
            to="/"
            className="inline-block bg-[#1e3a5f] text-white px-8 py-3 font-medium rounded-lg hover:bg-[#2d5a87] transition-colors"
          >
            Start Your Project
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#1e3a5f] text-white py-8 mt-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-white/80 text-sm">
            © 2026 PixelCraft Studios. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
