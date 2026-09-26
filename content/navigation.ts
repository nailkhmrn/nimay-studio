import type { NavigationItem } from "./models";

type NavigationHref = NavigationItem["href"] | "/#selected-work" | "/#studio-statement" | "/#contact";
type HomepageNavigationItem = Omit<NavigationItem, "href"> & { readonly href: NavigationHref };

const contact = { label: "Contact", href: "/#contact" } as const satisfies Omit<NavigationItem, "href"> & { readonly href: NavigationHref };

export const navigation = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/#selected-work" },
  { label: "Studio", href: "/#studio-statement" },
  contact,
] as const satisfies readonly HomepageNavigationItem[];

export const primaryNavigation = navigation.filter((item) => item.href !== "/");
export const headerNavigation = primaryNavigation;
export const contactCta = { label: "Let’s talk", href: contact.href } as const;
