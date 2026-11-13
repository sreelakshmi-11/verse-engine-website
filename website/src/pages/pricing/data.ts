// The Pricing page's plans and the shape of /pricing-data.json.

export type Currency = "USD" | "INR";
export type Period = "month" | "year";
export type PlanId = "free" | "starter" | "pro" | "scale";
export type SeatPlan = Exclude<PlanId, "free">;
/** /pricing-data.json */
export interface PricingConfig {
  inrPerUsd?: number;
  annualMonths: number;
  plans: Record<PlanId, { price: number; included: number; extra: number }>;
}
export interface PlanView {
  price: string;
  period: string;
  note: string;
  seatNote: string;
  seatLine: string;
  href: string;
}

/** A plan card as written in the page, before /pricing-data.json has loaded. */
export interface Plan {
  id: PlanId;
  name: string;
  audience: string;
  price: string;
  period: string;
  note: string;
  /** Seats included (and the seat picker's minimum); none on Free. */
  seats?: number;
  cta: string;
  ctaId: string;
  popular?: boolean;
  /** What the plan includes; null is the seats line, which follows the seats chosen. */
  features: (string | null)[];
}

export const PLANS: Plan[] = [
  {
    id: "free",
    name: "Free",
    audience: "Try Verse on your own models.",
    price: "$0",
    period: "Free forever",
    note: "",
    cta: "Start free",
    ctaId: "lnk-start-free",
    features: [
      "1 GB storage, 2 GB bandwidth a month",
      "5,000 API calls a month",
      "1 Verse Home and 1 film a month",
      "20 renders a month",
      "Uploads up to 500 MB",
      "“Made with Verse Engine by Ctruh” badge on your scenes",
      "Community support",
    ],
  },
  {
    id: "starter",
    name: "Starter",
    audience: "For the agent or designer sharing a few spaces a month.",
    price: "$29",
    period: "/ month",
    note: "Billed monthly",
    seats: 1,
    cta: "Choose Starter",
    ctaId: "lnk-choose-starter",
    features: [
      "10 GB storage, 20 GB bandwidth a month",
      "50,000 API calls a month",
      "5 Verse Homes and 5 films a month",
      "2 room captures, 200 renders a month",
      "Uploads up to 2 GB",
      "No Verse badge, private links, analytics",
      "Email support",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    audience: "For the professional who shows spaces every week.",
    price: "$99",
    period: "/ month",
    note: "Billed monthly",
    seats: 3,
    cta: "Go Pro",
    ctaId: "lnk-go-pro",
    popular: true,
    features: [
      "50 GB storage, 70 GB bandwidth a month",
      "500,000 API calls a month",
      "15 Verse Homes and 15 films a month",
      "5 room captures, 300 renders a month",
      null,
      "Uploads up to 10 GB",
      "Brand kit, lead capture, voice tours, 4K video",
      "Priority support",
    ],
  },
  {
    id: "scale",
    name: "Scale",
    audience: "For teams and developers running Verse every day.",
    price: "$499",
    period: "/ month",
    note: "Billed monthly",
    seats: 10,
    cta: "Choose Scale",
    ctaId: "lnk-choose-scale",
    features: [
      "250 GB storage, 400 GB bandwidth a month",
      "4,000,000 API calls a month",
      "60 Verse Homes and 50 films a month",
      "10 room captures, 500 renders a month",
      null,
      "Uploads up to 20 GB",
      "Priority builds",
      "Priority support and 99.5% uptime",
    ],
  },
];

/** The plan comparison table: a feature, then Free, Starter, Pro, Scale and Enterprise ("✓" included, "—" not). */
export const COMPARISON: [string, string[]][] = [
  ["Storage", ["1 GB", "10 GB", "50 GB", "250 GB", "Custom"]],
  ["Bandwidth / month", ["2 GB", "20 GB", "70 GB", "400 GB", "Custom"]],
  ["API calls / month", ["5,000", "50,000", "500,000", "4,000,000", "Custom"]],
  ["Verse Homes / month", ["1", "5", "15", "60", "Custom"]],
  ["Films / month", ["1", "5", "15", "50", "Custom"]],
  ["Room captures / month", ["0", "2", "5", "10", "Custom"]],
  ["Renders / month", ["20", "200", "300", "500", "Custom"]],
  ["Seats", ["1", "1 + extra", "3 + extra", "10 + extra", "Custom"]],
  ["Max upload", ["500 MB", "2 GB", "10 GB", "20 GB", "Custom"]],
  ["“Made with Verse” badge", ["On", "Off (small corner mark)", "Off (small corner mark)", "Off (small corner mark)", "White-label option"]],
  ["Private links", ["—", "✓", "✓", "✓", "✓"]],
  ["Viewer analytics", ["—", "✓", "✓", "✓", "✓"]],
  ["Brand kit + lead capture", ["—", "—", "✓", "✓", "✓"]],
  ["Video export", ["720p", "1080p", "4K", "4K", "4K"]],
  ["Pay as you go above the plan", ["—", "Coming soon", "Coming soon", "Coming soon", "Coming soon"]],
  ["Support", ["Community support", "Email support", "Priority support", "Priority support + 99.5% uptime", "Named specialist + SLA"]],
  ["Over the limit", ["Stops, upgrade prompt", "Upgrade prompt", "Upgrade prompt", "Upgrade prompt", "Contract"]],
];
