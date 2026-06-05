import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowLeft,
  BadgeCheck,
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  Navigation,
  Map as MapIcon,
  CheckCircle2,
} from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getProperty, PROPERTIES } from "@/data/properties";
import { formatKES } from "@/lib/format";

export const Route = createFileRoute("/properties/$id")({
  loader: ({ params }) => {
    const property = getProperty(params.id);
    if (!property) throw notFound();
    return { property };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.property.title} — HouseLink Kenya` },
          {
            name: "description",
            content: loaderData.property.description.slice(0, 160),
          },
          { property: "og:title", content: loaderData.property.title },
          {
            property: "og:description",
            content: loaderData.property.description.slice(0, 160),
          },
          { property: "og:image", content: loaderData.property.images[0] },
        ]
      : [{ title: "Property — HouseLink Kenya" }],
  }),
  notFoundComponent: () => (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-6 text-center">
      <h1 className="font-display text-2xl font-bold">Property not found</h1>
      <Link to="/" className="text-primary hover:underline">
        Back to home
      </Link>
    </div>
  ),
  errorComponent: () => (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-6 text-center">
      <h1 className="font-display text-2xl font-bold">Something went wrong</h1>
      <Link to="/" className="text-primary hover:underline">
        Back to home
      </Link>
    </div>
  ),
  component: PropertyDetail,
});

function PropertyDetail() {
  const { property } = Route.useLoaderData();
  const [activeImg, setActiveImg] = useState(0);

  const gmapsView = `https://www.google.com/maps/search/?api=1&query=${property.lat},${property.lng}`;
  const gmapsDir = `https://www.google.com/maps/dir/?api=1&destination=${property.lat},${property.lng}`;
  const wa = `https://wa.me/${property.landlord.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(`Hi, I'm interested in "${property.title}" on HouseLink Kenya.`)}`;
  const mapEmbed = `https://www.openstreetmap.org/export/embed.html?bbox=${property.lng - 0.01}%2C${property.lat - 0.008}%2C${property.lng + 0.01}%2C${property.lat + 0.008}&layer=mapnik&marker=${property.lat}%2C${property.lng}`;
  const isLounge = ["Lounge", "Club", "Restaurant Space"].includes(
    property.category,
  );
  const isEventVenue = property.category === "Event Venue";

  const similar = PROPERTIES.filter(
    (p) => p.id !== property.id && p.county === property.county,
  ).slice(0, 3);

  return (
    <div className="min-h-screen">
      <Header />
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
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
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Back to results
        </Link>

        {/* Gallery */}
        <div className="mt-4 grid gap-3 md:grid-cols-[1fr_280px]">
          <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-muted">
            <img
              src={property.images[activeImg]}
              alt={property.title}
              className="h-full w-full object-cover"
            />
            {property.verified && (
              <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-success px-3 py-1.5 text-xs font-semibold text-success-foreground shadow">
                <BadgeCheck className="h-4 w-4" /> Verified listing
              </span>
            )}
          </div>
          <div className="grid grid-cols-3 gap-2 md:grid-cols-1">
            {property.images.map((src: string, i: number) => (
              <button
                key={src}
                onClick={() => setActiveImg(i)}
                className={`aspect-[4/3] overflow-hidden rounded-lg ring-2 transition-all ${
                  activeImg === i
                    ? "ring-accent"
                    : "ring-transparent hover:ring-border"
                }`}
              >
                <img src={src} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Main */}
        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
          <div>
            <span className="inline-block rounded-full bg-secondary px-3 py-1 text-xs font-semibold">
              {property.category}
            </span>
            <h1 className="mt-3 font-display text-3xl font-bold leading-tight md:text-4xl">
              {property.title}
            </h1>
            <p className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" /> {property.town},{" "}
              {property.subcounty} · {property.county} County
            </p>

            <div className="mt-6 rounded-2xl border border-border bg-card p-5">
              <h2 className="font-display text-lg font-bold">
                About this property
              </h2>
              <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-foreground/85">
                {property.description}
              </p>
            </div>

            {isLounge && (property.foodMenu || property.drinkMenu) && (
              <div className="mt-6 rounded-2xl border border-border bg-card p-5">
                <h2 className="font-display text-lg font-bold">
                  Lounge & bar menu
                </h2>
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  {property.foodMenu && (
                    <div>
                      <h3 className="text-sm font-semibold">Food</h3>
                      <div className="mt-3 space-y-2">
                        {property.foodMenu.map((item) => (
                          <div
                            key={item.item}
                            className="flex items-center justify-between rounded-xl border border-border px-3 py-2"
                          >
                            <span>{item.item}</span>
                            <span className="text-sm font-semibold text-foreground">
                              {item.price}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {property.drinkMenu && (
                    <div>
                      <h3 className="text-sm font-semibold">Drinks</h3>
                      <div className="mt-3 space-y-2">
                        {property.drinkMenu.map((item) => (
                          <div
                            key={item.item}
                            className="flex items-center justify-between rounded-xl border border-border px-3 py-2"
                          >
                            <span>{item.item}</span>
                            <span className="text-sm font-semibold text-foreground">
                              {item.price}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {property.upcomingEvents?.length ? (
              <div className="mt-6 rounded-2xl border border-border bg-card p-5">
                <div className="flex items-center justify-between">
                  <h2 className="font-display text-lg font-bold">
                    Upcoming events
                  </h2>
                  {isEventVenue && (
                    <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent-foreground">
                      Event venue
                    </span>
                  )}
                </div>
                <div className="mt-4 space-y-4">
                  {property.upcomingEvents.map((event) => (
                    <div
                      key={event.title}
                      className="rounded-2xl border border-border p-4"
                    >
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <p className="font-semibold">{event.title}</p>
                          <p className="text-sm text-muted-foreground">
                            {event.date}
                          </p>
                        </div>
                        <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-foreground">
                          {event.price}
                        </span>
                      </div>
                      <p className="mt-3 text-sm text-foreground/85">
                        {event.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

            <div className="mt-6 rounded-2xl border border-border bg-card p-5">
              <h2 className="font-display text-lg font-bold">Amenities</h2>
              <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
                {property.amenities.map((a: string) => (
                  <div key={a} className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-success" />
                    {a}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-border bg-card p-5">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-lg font-bold">Location</h2>
                <div className="flex gap-2">
                  <a
                    href={gmapsView}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 rounded-md border border-border px-3 py-1.5 text-xs font-medium hover:bg-secondary"
                  >
                    <MapIcon className="h-3.5 w-3.5" /> View on map
                  </a>
                  <a
                    href={gmapsDir}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 rounded-md bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground hover:bg-primary/90"
                  >
                    <Navigation className="h-3.5 w-3.5" /> Get directions
                  </a>
                </div>
              </div>
              <div className="mt-4 aspect-[16/9] overflow-hidden rounded-lg border border-border">
                <iframe
                  title="Property map"
                  src={mapEmbed}
                  className="h-full w-full"
                  loading="lazy"
                />
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                Approximate location · {property.lat.toFixed(4)},{" "}
                {property.lng.toFixed(4)}
              </p>
            </div>
          </div>

          {/* Contact card */}
          <aside className="lg:sticky lg:top-20 lg:self-start">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
              <div className="flex items-baseline justify-between">
                <div>
                  <div className="font-display text-3xl font-bold text-primary">
                    {formatKES(property.rent)}
                  </div>
                  <div className="text-xs text-muted-foreground">per month</div>
                </div>
                {property.deposit > 0 && (
                  <div className="text-right">
                    <div className="text-sm font-semibold">
                      {formatKES(property.deposit)}
                    </div>
                    <div className="text-xs text-muted-foreground">deposit</div>
                  </div>
                )}
              </div>

              <div className="my-5 h-px bg-border" />

              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Listed by
              </p>
              <p className="mt-1 font-semibold">{property.landlord.name}</p>

              <div className="mt-4 space-y-2">
                <a
                  href={`tel:${property.landlord.phone}`}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
                >
                  <Phone className="h-4 w-4" /> Call {property.landlord.phone}
                </a>
                <a
                  href={wa}
                  target="_blank"
                  rel="noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-success px-4 py-2.5 text-sm font-semibold text-success-foreground hover:opacity-90"
                >
                  <MessageCircle className="h-4 w-4" /> WhatsApp
                </a>
                <a
                  href={`mailto:${property.landlord.email}`}
                  className="flex w-full items-center justify-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm font-semibold hover:bg-secondary"
                >
                  <Mail className="h-4 w-4" /> Email
                </a>
              </div>
              <p className="mt-4 text-[11px] leading-relaxed text-muted-foreground">
                Always verify the property in person before paying any deposit.
                Report suspicious listings to HouseLink Kenya.
              </p>
            </div>
          </aside>
        </div>

        {/* Similar */}
        {similar.length > 0 && (
          <section className="mt-16">
            <h2 className="font-display text-2xl font-bold">
              More in {property.county}
            </h2>
            <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {similar.map((p) => (
                <Link
                  key={p.id}
                  to="/properties/$id"
                  params={{ id: p.id }}
                  className="group overflow-hidden rounded-xl bg-card shadow-[var(--shadow-card)] transition-transform hover:-translate-y-1"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={p.images[0]}
                      alt={p.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <div className="p-3">
                    <p className="line-clamp-1 text-sm font-semibold">
                      {p.title}
                    </p>
                    <p className="mt-1 text-sm text-primary">
                      {formatKES(p.rent)}/mo
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
      <Footer />
    </div>
  );
}
