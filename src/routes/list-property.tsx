import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2, Sparkles, ShieldCheck, TrendingUp } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { COUNTY_NAMES, getSubcounties } from "@/data/counties";
import { CATEGORIES } from "@/data/categories";

export const Route = createFileRoute("/list-property")({
  head: () => ({
    meta: [
      { title: "List your property — HouseLink Kenya" },
      {
        name: "description",
        content:
          "Landlords and Airbnb hosts: list your property free on HouseLink Kenya and reach tenants in all 47 counties.",
      },
    ],
  }),
  component: ListPropertyPage,
});

function ListPropertyPage() {
  const [county, setCounty] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="min-h-screen">
      <Header />
      <section className="border-b border-border bg-secondary/40">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/15 px-3 py-1 text-xs font-semibold text-accent">
            <Sparkles className="h-3.5 w-3.5" /> Free for landlords
          </span>
          <h1 className="mt-4 max-w-3xl font-display text-3xl font-bold leading-tight md:text-5xl">
            List your property. Get serious tenants in days.
          </h1>
          <p className="mt-3 max-w-2xl text-base text-muted-foreground">
            Whether you own a single bedsitter in Kakamega or a 20-unit
            apartment in Kilimani — HouseLink Kenya connects you directly to
            tenants searching in your area.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              {
                icon: ShieldCheck,
                t: "Verified badge",
                d: "Build trust with a verified-landlord checkmark.",
              },
              {
                icon: TrendingUp,
                t: "Direct inquiries",
                d: "Call, WhatsApp or email — no middlemen, no commission.",
              },
              {
                icon: Sparkles,
                t: "AI-assisted listings",
                d: "Write better descriptions in seconds (coming soon).",
              },
            ].map((b) => (
              <div
                key={b.t}
                className="rounded-xl border border-border bg-card p-4"
              >
                <b.icon className="h-5 w-5 text-accent" />
                <p className="mt-2 font-semibold">{b.t}</p>
                <p className="text-sm text-muted-foreground">{b.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        {submitted ? (
          <div className="rounded-2xl border border-success/30 bg-success/10 p-8 text-center">
            <CheckCircle2 className="mx-auto h-12 w-12 text-success" />
            <h2 className="mt-4 font-display text-2xl font-bold">
              Listing received
            </h2>
            <p className="mt-2 text-muted-foreground">
              Thanks! Our team will review and publish your property within 24
              hours. We'll be in touch about verification.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="mt-6 rounded-md border border-border px-4 py-2 text-sm font-medium hover:bg-secondary"
            >
              Submit another listing
            </button>
          </div>
        ) : (
          <form
            onSubmit={onSubmit}
            className="space-y-5 rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)] md:p-8"
          >
            <h2 className="font-display text-xl font-bold">Property details</h2>

            <Field label="Property title">
              <input
                required
                placeholder="e.g. Modern 2BR Apartment with Balcony"
                className={inputCls}
              />
            </Field>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Category">
                <select required className={inputCls}>
                  <option value="">Select category</option>
                  {CATEGORIES.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </Field>
              <Field label="Monthly rent (KES)">
                <input
                  required
                  type="number"
                  min={0}
                  placeholder="25000"
                  className={inputCls}
                />
              </Field>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <Field label="County">
                <select
                  required
                  value={county}
                  onChange={(e) => setCounty(e.target.value)}
                  className={inputCls}
                >
                  <option value="">Select</option>
                  {COUNTY_NAMES.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </Field>
              <Field label="Subcounty">
                <select required disabled={!county} className={inputCls}>
                  <option value="">
                    {county ? "Select" : "Pick county first"}
                  </option>
                  {getSubcounties(county).map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </Field>
              <Field label="Town / estate">
                <input
                  required
                  placeholder="e.g. Kilimani"
                  className={inputCls}
                />
              </Field>
            </div>

            <Field label="Description">
              <textarea
                required
                rows={5}
                placeholder="Describe the property, what makes it special, and what's nearby."
                className={inputCls}
              />
            </Field>

            <div className="grid gap-4 sm:grid-cols-3">
              <Field label="Contact phone">
                <input
                  required
                  type="tel"
                  placeholder="+254..."
                  className={inputCls}
                />
              </Field>
              <Field label="WhatsApp">
                <input
                  required
                  type="tel"
                  placeholder="+254..."
                  className={inputCls}
                />
              </Field>
              <Field label="Email">
                <input
                  required
                  type="email"
                  placeholder="you@example.com"
                  className={inputCls}
                />
              </Field>
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-primary py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.01]"
            >
              Submit listing
            </button>
            <p className="text-center text-xs text-muted-foreground">
              You'll be able to add photos and exact map location after we
              create your free landlord account.
            </p>
          </form>
        )}
      </section>
      <Footer />
    </div>
  );
}

const inputCls =
  "w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary";

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-bold uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
      {children}
    </label>
  );
}
