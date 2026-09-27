import type { Locale, SiteContent } from "./types";

export interface NavigationItem {
  readonly label: string;
  readonly href: string;
}

export function getNavigation(locale: Locale, labels: SiteContent["labels"]): readonly NavigationItem[] {
  return [
    { label: labels.work, href: `/${locale}#selected-work` },
    { label: labels.engagements, href: `/${locale}#engagements` },
    { label: labels.studio, href: `/${locale}#studio-statement` },
    { label: labels.contact, href: `/${locale}#contact` },
  ];
}
