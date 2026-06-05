import {
  createFileRoute,
  Link,
  Outlet,
  useLocation,
} from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { z } from "zod";
import { Filter, MapPin, SearchX } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PropertyCard } from "@/components/PropertyCard";
import { PROPERTIES } from "@/data/properties";
import { COUNTY_NAMES, getSubcounties } from "@/data/counties";
import { CATEGORIES, AMENITIES } from "@/data/categories";

const searchSchema = z.object({
  county: z.string().default(""),
  subcounty: z.string().default(""),
  category: z.string().default(""),
  min: z.preprocess((value) => {
    if (value === "" || value === undefined || value === null) return 0;
    return Number(value);
  }, z.number().default(0)),
  max: z.preprocess((value) => {
    if (value === "" || value === undefined || value === null) return 0;
    return Number(value);
  }, z.number().default(0)),
  verified: z.preprocess((value) => {
    if (value === "" || value === undefined || value === null) return false;
    if (typeof value === "string") return value.toLowerCase() === "true";
    return Boolean(value);
  }, z.boolean().default(false)),
});

export const Route = createFileRoute("/properties")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Browse properties — HouseLink Kenya" },
      {
        name: "description",
        content:
          "Search and filter rentals, Airbnbs, commercial spaces and land across all 47 Kenyan counties.",
      },
    ],
  }),
  component: PropertiesPage,
});

function PropertiesPage() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const location = useLocation();
  const [extraAmenities, setExtraAmenities] = useState<string[]>([]);

  // Calculate subcounties for filtering
  const availableSubcounties = useMemo(
    () => getSubcounties(search.county),
    [search.county],
  );

  // Filter properties based on search criteria
  const filtered = useMemo(() => {
    return PROPERTIES.filter((p) => {
      if (search.county && p.county !== search.county) return false;
      if (search.subcounty && p.subcounty !== search.subcounty) return false;
      if (search.category && p.category !== search.category) return false;
      if (search.min > 0 && p.rent < search.min) return false;
      if (search.max > 0 && p.rent > search.max) return false;
      if (search.verified && !p.verified) return false;
      if (
        extraAmenities.length &&
        !extraAmenities.every((a) => p.amenities.includes(a))
      )
        return false;
      return true;
    });
  }, [search, extraAmenities]);

  // Check if we're viewing a property detail ($id route)
  const isDetailRoute =
    location.pathname.includes("/properties/") &&
    location.pathname !== "/properties";

  if (isDetailRoute) {
    return <Outlet />;
  }

  function update<K extends keyof typeof search>(
    key: K,
    value: (typeof search)[K],
  ) {
    navigate({
      search: (prev: typeof search) => ({
        ...prev,
        [key]: value,
        ...(key === "county" ? { subcounty: "" } : {}),
      }),
    });
  }

  return (
    <div className="min-h-screen">
      <Header />
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="mb-6">
          <h1 className="font-display text-3xl font-bold">Browse properties</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {filtered.length}{" "}
            {filtered.length === 1 ? "property" : "properties"} found
            {search.county && ` in ${search.county}`}
            {search.subcounty && `, ${search.subcounty}`}
            {search.category && ` · ${search.category}`}
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
          {/* Filters */}
          <aside className="lg:sticky lg:top-20 lg:self-start">
            <div className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)]">
              <div className="mb-4 flex items-center gap-2">
                <Filter className="h-4 w-4 text-accent" />
                <span className="font-display text-sm font-bold uppercase tracking-wide">
                  Filters
                </span>
              </div>

              <FilterSelect
                label="County"
                value={search.county}
                onChange={(v) => update("county", v)}
                options={["", ...COUNTY_NAMES]}
                placeholderEmpty="All counties"
              />
              <FilterSelect
                label="Subcounty"
                value={search.subcounty}
                onChange={(v) => update("subcounty", v)}
                options={["", ...subcounties]}
                placeholderEmpty={
                  search.county ? "Any subcounty" : "Pick a county first"
                }
                disabled={!search.county}
              />
              <FilterSelect
                label="Category"
                value={search.category}
                onChange={(v) => update("category", v)}
                options={["", ...CATEGORIES]}
                placeholderEmpty="All categories"
              />

              <div className="mt-4">
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Price (KES)
                </span>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  <input
                    type="number"
                    min={0}
                    placeholder="Min"
                    value={search.min || ""}
                    onChange={(e) => update("min", Number(e.target.value) || 0)}
                    className="rounded-md border border-input bg-background px-2 py-1.5 text-sm outline-none focus:border-primary"
                  />
                  <input
                    type="number"
                    min={0}
                    placeholder="Max"
                    value={search.max || ""}
                    onChange={(e) => update("max", Number(e.target.value) || 0)}
                    className="rounded-md border border-input bg-background px-2 py-1.5 text-sm outline-none focus:border-primary"
                  />
                </div>
              </div>

              <label className="mt-4 flex cursor-pointer items-center gap-2">
                <input
                  type="checkbox"
                  checked={search.verified}
                  onChange={(e) => update("verified", e.target.checked)}
                  className="h-4 w-4 rounded border-input accent-primary"
                />
                <span className="text-sm">Verified listings only</span>
              </label>

              <div className="mt-5">
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Amenities
                </span>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {AMENITIES.slice(0, 10).map((a) => {
                    const on = extraAmenities.includes(a);
                    return (
                      <button
                        key={a}
                        type="button"
                        onClick={() =>
                          setExtraAmenities((p) =>
                            on ? p.filter((x) => x !== a) : [...p, a],
                          )
                        }
                        className={`rounded-full border px-3 py-1 text-xs transition-colors ${on ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background hover:border-primary"}`}
                      >
                        {a}
                      </button>
                    );
                  })}
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  navigate({
                    search: {
                      county: "",
                      subcounty: "",
                      category: "",
                      min: 0,
                      max: 0,
                      verified: false,
                    },
                  });
                  setExtraAmenities([]);
                }}
                className="mt-5 w-full rounded-md border border-border py-2 text-sm font-medium hover:bg-secondary"
              >
                Clear all filters
              </button>
            </div>
          </aside>

          {/* Results */}
          <div>
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card py-20 text-center">
                <SearchX className="h-10 w-10 text-muted-foreground" />
                <p className="mt-4 font-display text-lg font-semibold">
                  No properties match your filters
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Try widening the price range or removing some filters.
                </p>
              </div>
            ) : (
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {filtered.map((p) => (
                  <PropertyCard key={p.id} property={p} />
                ))}
              </div>
            )}

            {/* Map hint */}
            <div className="mt-8 flex items-center gap-3 rounded-xl border border-border bg-secondary/50 p-4 text-sm">
              <MapPin className="h-5 w-5 text-accent" />
              <p>
                Open any listing to see it on the map and get directions from
                your current location.{" "}
                <Link
                  to="/"
                  className="font-semibold text-primary hover:underline"
                >
                  Back to home
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

function FilterSelect({
  label,
  value,
  onChange,
  options,
  placeholderEmpty,
  disabled,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
  placeholderEmpty: string;
  disabled?: boolean;
}) {
  return (
    <label className="mt-4 block">
      <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className="mt-1 w-full rounded-md border border-input bg-background px-2 py-2 text-sm outline-none focus:border-primary disabled:cursor-not-allowed disabled:opacity-50"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o === "" ? placeholderEmpty : o}
          </option>
        ))}
      </select>
    </label>
  );
}
