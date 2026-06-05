import { Link } from "@tanstack/react-router";
import { Home, Plus } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link
          to="/"
          className="flex items-center gap-2 font-display text-lg font-bold tracking-tight"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Home className="h-5 w-5" />
          </span>
          <span>
            HouseLink <span className="text-accent">Kenya</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
          <Link
            to="/"
            className="text-foreground/80 hover:text-foreground transition-colors"
          >
            Home
          </Link>
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
            className="text-foreground/80 hover:text-foreground transition-colors"
          >
            Browse properties
          </Link>
          <Link
            to="/list-property"
            className="text-foreground/80 hover:text-foreground transition-colors"
          >
            For landlords
          </Link>
        </nav>
        <Link
          to="/list-property"
          className="inline-flex items-center gap-1.5 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground shadow-sm transition-transform hover:scale-[1.02] active:scale-[0.98]"
        >
          <Plus className="h-4 w-4" />
          List property
        </Link>
      </div>
    </header>
  );
}
