import { useNavigate } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { COUNTY_NAMES, getSubcounties } from "@/data/counties";
import { CATEGORIES } from "@/data/categories";

export function HeroSearch() {
  const navigate = useNavigate();
  const [county, setCounty] = useState("");
  const [subcounty, setSubcounty] = useState("");
  const [category, setCategory] = useState("");
  const subcounties = useMemo(() => getSubcounties(county), [county]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    navigate({
      to: "/properties",
      search: { county, subcounty, category, min: 0, max: 0, verified: false },
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl bg-background/95 p-3 shadow-[var(--shadow-elevated)] backdrop-blur md:rounded-full md:p-2"
    >
      <div className="grid gap-2 md:grid-cols-[1.1fr_1.1fr_1.1fr_auto] md:gap-0">
        <SelectCell
          label="County"
          value={county}
          onChange={(v) => {
            setCounty(v);
            setSubcounty("");
          }}
          options={["", ...COUNTY_NAMES]}
          placeholder="All 47 counties"
        />
        <Divider />
        <SelectCell
          label="Subcounty"
          value={subcounty}
          onChange={setSubcounty}
          options={["", ...subcounties]}
          placeholder={county ? "Any subcounty" : "Pick a county first"}
          disabled={!county}
        />
        <Divider />
        <SelectCell
          label="Property type"
          value={category}
          onChange={setCategory}
          options={["", ...CATEGORIES]}
          placeholder="Any type"
        />
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-transform hover:scale-[1.02] active:scale-[0.98] md:rounded-full md:px-7"
        >
          <Search className="h-4 w-4" />
          Search
        </button>
      </div>
    </form>
  );
}

function Divider() {
  return <div className="hidden w-px self-stretch bg-border/70 md:block" />;
}

function SelectCell({
  label,
  value,
  onChange,
  options,
  placeholder,
  disabled,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
  placeholder: string;
  disabled?: boolean;
}) {
  return (
    <label className="flex flex-col px-4 py-2.5 text-left">
      <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className="bg-transparent text-sm font-medium text-foreground outline-none disabled:cursor-not-allowed disabled:opacity-50"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o === "" ? placeholder : o}
          </option>
        ))}
      </select>
    </label>
  );
}
