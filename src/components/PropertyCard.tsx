import { Link } from "@tanstack/react-router";
import { BadgeCheck, MapPin } from "lucide-react";
import type { Property } from "@/data/properties";
import { formatKES } from "@/lib/format";

export function PropertyCard({ property }: { property: Property }) {
  const unitLabel = property.category === "Event Venue" ? "/ event" : "/ month";

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl bg-card shadow-[var(--shadow-card)] transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-elevated)]">
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={property.images[0]}
          alt={property.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-full bg-background/95 px-2.5 py-1 text-xs font-semibold text-foreground shadow-sm">
          {property.category}
        </span>
        {property.verified && (
          <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-success px-2.5 py-1 text-xs font-semibold text-success-foreground shadow-sm">
            <BadgeCheck className="h-3.5 w-3.5" />
            Verified
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="line-clamp-2 font-display text-base font-semibold leading-snug">
          {property.title}
        </h3>
        <p className="flex items-center gap-1 text-sm text-muted-foreground">
          <MapPin className="h-3.5 w-3.5" />
          {property.town}, {property.subcounty} · {property.county}
        </p>
        <div className="mt-auto flex flex-col gap-3 pt-2">
          <div className="flex items-baseline justify-between">
            <span className="font-display text-lg font-bold text-primary">
              {formatKES(property.rent)}
            </span>
            <span className="text-xs text-muted-foreground">{unitLabel}</span>
          </div>
          <Link
            to="/properties/$id"
            params={{ id: property.id }}
            className="inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
            aria-label={`View details for ${property.title}`}
          >
            View details
          </Link>
        </div>
      </div>
    </div>
  );
}
