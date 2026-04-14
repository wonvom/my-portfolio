export type Language = "ko" | "en";

export type LandingCard = {
  id: string;
  label: string;
  description: Record<Language, string>;
  href: string;
  external?: boolean;
};
