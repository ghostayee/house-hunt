import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border/60 bg-secondary/40">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="font-display text-xl font-bold">
            HouseLink <span className="text-accent">Kenya</span>
          </p>
          <p className="mt-3 max-w-md text-sm text-muted-foreground">
            The nationwide property marketplace built for Kenya — from a
            bedsitter in Juja to a beachfront villa in Nyali. Verified listings
            across all 47 counties.
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold">Explore</p>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>
              <Link to="/" className="hover:text-foreground">
                Home
              </Link>
            </li>
            <li>
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
                className="hover:text-foreground"
              >
                Browse properties
              </Link>
            </li>
            <li>
              <Link to="/list-property" className="hover:text-foreground">
                List your property
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold">Support</p>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>Help centre</li>
            <li>Report a listing</li>
            <li>Verification policy</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60 py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} HouseLink Kenya. Built for Kenyans, in
        Kenya.
      </div>
    </footer>
  );
}
