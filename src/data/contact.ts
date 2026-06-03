import { profile } from "./profile";

export type ContactLink = {
  label: string;
  value: string;
  href: string;
  arrow: string;
  external: boolean;
};

export const contactLinks: ContactLink[] = [
  { label: "Email", value: profile.email, href: `mailto:${profile.email}`, arrow: "↗", external: false },
  { label: "GitHub", value: "github.com/wonvom", href: profile.githubHref, arrow: "↗", external: true },
  { label: "Resume", value: "Download PDF", href: profile.resumeHref, arrow: "↓", external: false },
];
