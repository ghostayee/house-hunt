import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, MapPin, ShieldCheck, Sparkles } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { HeroSearch } from "@/components/HeroSearch";
import { PropertyCard } from "@/components/PropertyCard";
import { PROPERTIES } from "@/data/properties";
import { COUNTIES } from "@/data/counties";
import heroImg from "@/assets/hero-houselink.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "HouseLink Kenya — Find homes & rentals across all 47 counties",
      },
      {
        name: "description",
        content:
          "Search verified rentals, Airbnbs, commercial spaces and land across Kenya. From bedsitters in Juja to beachfront villas in Nyali.",
      },
      {
        property: "og:title",
        content: "HouseLink Kenya — Property marketplace",
      },
      {
        property: "og:description",
        content: "Verified rentals across all 47 Kenyan counties.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const featured = PROPERTIES.filter((p) => p.featured);
  const latest = [...PROPERTIES]
    .sort((a, b) => b.postedAt.localeCompare(a.postedAt))
    .slice(0, 8);
  const popularCounties = [
    "Nairobi",
    "Mombasa",
    "Kiambu",
    "Nakuru",
    "Kisumu",
    "Uasin Gishu",
    "Machakos",
    "Kajiado",
  ];

  return (
    <div className="min-h-screen">
      <Header />

      {/* HERO */}
      <section className="relative isolate overflow-hidden">
        <img
          src={heroImg}
          alt="Kenyan neighbourhood at golden hour"
          width={1920}
          height={1080}
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
        <div
          className="absolute inset-0 -z-10"
          style={{ background: "var(--gradient-hero)" }}
        />
        <div className="mx-auto max-w-7xl px-4 pb-16 pt-20 sm:px-6 md:pb-24 md:pt-28">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-background/15 px-3 py-1 text-xs font-semibold text-primary-foreground ring-1 ring-inset ring-white/30 backdrop-blur">
              <Sparkles className="h-3.5 w-3.5" />
              All 47 counties · Verified landlords
            </span>
            <h1 className="mt-5 font-display text-4xl font-bold leading-[1.05] text-primary-foreground sm:text-5xl md:text-6xl">
              Find your next home <br className="hidden md:block" />
              <span className="text-accent">anywhere in Kenya.</span>
            </h1>
            <p className="mt-5 max-w-xl text-base text-primary-foreground/85 sm:text-lg">
              From bedsitters in Juja to beachfront villas in Nyali — search
              thousands of verified listings, view them on the map, and contact
              the owner directly.
            </p>
          </div>

          <div className="mt-10">
            <HeroSearch />
          </div>

          {/* trust strip */}
          <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4">
            {[
              { k: "47", v: "Counties covered" },
              { k: "1,200+", v: "Active listings" },
              { k: "98%", v: "Verified landlords" },
              { k: "24h", v: "Avg. response time" },
            ].map((s) => (
              <div
                key={s.v}
                className="border-l-2 border-accent pl-3 text-primary-foreground"
              >
                <div className="font-display text-2xl font-bold">{s.k}</div>
                <div className="text-xs text-primary-foreground/70">{s.v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED */}
      <Section
        title="Featured listings"
        subtitle="Hand-picked verified homes from across Kenya"
        action={
          <Link
            to="/properties"
            search={{
              county: "",
              subcounty: "",
              category: "",
              min: 0,
              max: 0,
              verified: false,
            }}
            className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-primary/80"
          >
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        }
      >
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => (
            <PropertyCard key={p.id} property={p} />
          ))}
        </div>
      </Section>

      {/* POPULAR COUNTIES */}
      <Section title="Browse by county" subtitle="Jump straight into your area">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {popularCounties.map((c) => (
            <Link
              key={c}
              to="/properties"
              search={{
                county: c,
                subcounty: "",
                category: "",
                min: 0,
                max: 0,
                verified: false,
              }}
              className="group flex items-center justify-between rounded-xl border border-border bg-card px-4 py-3 transition-colors hover:border-primary hover:bg-secondary"
            >
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-accent" />
                <span className="font-medium">{c}</span>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
            </Link>
          ))}
        </div>
        <p className="mt-4 text-sm text-muted-foreground">
          …and {COUNTIES.length - popularCounties.length} more counties in the
          full search.
        </p>
      </Section>

      {/* LATEST */}
      <Section title="Latest listings" subtitle="Fresh on the market">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {latest.map((p) => (
            <PropertyCard key={p.id} property={p} />
          ))}
        </div>
      </Section>

      {/* FOR LANDLORDS CTA */}
      <section className="mx-auto mt-24 max-w-7xl px-4 sm:px-6">
        <div className="overflow-hidden rounded-3xl bg-primary p-8 text-primary-foreground md:p-14">
          <div className="grid items-center gap-8 md:grid-cols-[1.4fr_1fr]">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/20 px-3 py-1 text-xs font-semibold text-accent ring-1 ring-accent/30">
                <ShieldCheck className="h-3.5 w-3.5" />
                For landlords & hosts
              </span>
              <h2 className="mt-4 font-display text-3xl font-bold md:text-4xl">
                List your property. Reach renters in every county.
              </h2>
              <p className="mt-3 text-primary-foreground/80">
                Free to list. Verified badge for trusted landlords. Receive
                inquiries by call, email or WhatsApp — directly. No middlemen.
              </p>
              <Link
                to="/list-property"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition-transform hover:scale-[1.02]"
              >
                List your property <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="hidden grid-cols-2 gap-3 md:grid">
              {[
                "Free unlimited listings",
                "Verified landlord badge",
                "Direct tenant inquiries",
                "Map-based discovery",
              ].map((t) => (
                <div
                  key={t}
                  className="rounded-xl bg-primary-foreground/10 p-4 text-sm"
                >
                  ✓ {t}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function Section({
  title,
  subtitle,
  action,
  children,
}: {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="mx-auto mt-20 max-w-7xl px-4 sm:px-6">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl font-bold sm:text-3xl">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
          )}
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}
