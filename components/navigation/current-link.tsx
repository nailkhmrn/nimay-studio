"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSyncExternalStore } from "react";
import type { ComponentProps, MouseEvent } from "react";
import { CtaLink } from "@/components/ui/cta-link";
import type { FoundationPath } from "@/content/models";

type CurrentLinkHref = FoundationPath | "/#selected-work" | "/#studio-statement" | "/#contact";

type CurrentLinkProps = Omit<ComponentProps<typeof Link>, "href"> & {
  href: CurrentLinkHref;
  appearance?: "text" | "cta";
};

const hashSubscribers = new Set<() => void>();
let currentHash = "";

function publishHash(hash: string) {
  if (currentHash === hash) return;
  currentHash = hash;
  hashSubscribers.forEach((subscriber) => subscriber());
}

function syncHashFromLocation() {
  publishHash(window.location.hash);
}

function subscribeToHash(subscriber: () => void) {
  if (hashSubscribers.size === 0) {
    currentHash = window.location.hash;
    window.addEventListener("hashchange", syncHashFromLocation);
    window.addEventListener("popstate", syncHashFromLocation);
  }

  hashSubscribers.add(subscriber);
  return () => {
    hashSubscribers.delete(subscriber);
    if (hashSubscribers.size === 0) {
      window.removeEventListener("hashchange", syncHashFromLocation);
      window.removeEventListener("popstate", syncHashFromLocation);
    }
  };
}

function getHashSnapshot() {
  return currentHash;
}

function getServerHashSnapshot() {
  return "";
}

// A small client leaf keeps route state out of the server-rendered shell.
export function CurrentLink({ href, appearance = "text", ...props }: CurrentLinkProps) {
  const pathname = usePathname();
  const hash = useSyncExternalStore(subscribeToHash, getHashSnapshot, getServerHashSnapshot);
  const [pagePath, fragment] = href.split("#");
  const hasFragment = fragment !== undefined;
  const isPage = !hasFragment && pathname === href;
  const isActive = hasFragment
    ? pathname === pagePath && hash === `#${fragment}`
    : isPage || pathname.startsWith(`${href}/`);
  const Component = appearance === "cta" ? CtaLink : Link;
  const onClick = props.onClick;

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    onClick?.(event);
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    publishHash(hasFragment ? `#${fragment}` : "");
  }

  return (
    <Component
      {...props}
      href={href}
      onClick={handleClick}
      aria-current={hasFragment ? (isActive ? "location" : undefined) : (isPage ? "page" : undefined)}
      data-active={isActive || undefined}
    />
  );
}
