"use client";

import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { siteFacts } from "@/content/shared";
import type { SiteContent } from "@/content/types";

const GA_MEASUREMENT_ID = siteFacts.analyticsMeasurementId;
const CONSENT_STORAGE_KEY = siteFacts.analyticsConsentStorageKey;
const OPEN_PREFERENCES_EVENT = "nimay:open-analytics-preferences";
const CONSENT_CHANGE_EVENT = "nimay:analytics-consent-change";
type ConsentChoice = "undecided" | "accepted" | "rejected";
type ConsentSnapshot = ConsentChoice | "pending";
let memoryChoice: Exclude<ConsentChoice, "undecided"> | null = null;

type AnalyticsWindow = Window & { gtag?: (...args: unknown[]) => void; __nimayGaInitialized?: boolean; dataLayer?: unknown[] };

function setAnalyticsDisabled(disabled: boolean) { (window as unknown as Record<string, unknown>)[`ga-disable-${GA_MEASUREMENT_ID}`] = disabled; }
function clearAnalyticsCookies() {
  const names = document.cookie.split(";").map((cookie) => cookie.trim().split("=")[0] ?? "").filter((name) => name === "_ga" || name.startsWith("_ga_"));
  for (const name of names) {
    document.cookie = `${name}=; Max-Age=0; path=/; SameSite=Lax`;
    document.cookie = `${name}=; Max-Age=0; path=/; domain=nimaystudio.com; SameSite=Lax`;
  }
}
function saveChoice(choice: Exclude<ConsentChoice, "undecided">) {
  memoryChoice = choice;
  try { window.localStorage.setItem(CONSENT_STORAGE_KEY, choice); } catch { /* current-page choice remains available */ }
  window.dispatchEvent(new Event(CONSENT_CHANGE_EVENT));
}
function readChoice(): ConsentChoice {
  try {
    const storedChoice = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (storedChoice === "accepted" || storedChoice === "rejected") return storedChoice;
  } catch { return memoryChoice ?? "undecided"; }
  return memoryChoice ?? "undecided";
}
function subscribeToConsent(callback: () => void) {
  window.addEventListener(CONSENT_CHANGE_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => { window.removeEventListener(CONSENT_CHANGE_EVENT, callback); window.removeEventListener("storage", callback); };
}

export function AnalyticsConsent({ content }: { content: SiteContent }) {
  const snapshot: ConsentSnapshot = useSyncExternalStore(subscribeToConsent, readChoice, (): ConsentSnapshot => "pending");
  const choice: ConsentChoice = snapshot === "pending" ? "undecided" : snapshot;
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const routeKey = `${pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ""}`;
  const lastTrackedRoute = useRef<string | null>(null);
  const [isPreferencesOpen, setIsPreferencesOpen] = useState(false);
  const shouldFocusAllow = useRef(false);
  const preferencesTrigger = useRef<HTMLButtonElement | null>(null);
  const allowButton = useRef<HTMLButtonElement | null>(null);
  const bannerIsVisible = snapshot !== "pending" && (choice === "undecided" || isPreferencesOpen);

  useEffect(() => { setAnalyticsDisabled(choice !== "accepted"); }, [choice]);
  useEffect(() => {
    const analyticsWindow = window as AnalyticsWindow;
    if (choice !== "accepted" || !analyticsWindow.__nimayGaInitialized || !analyticsWindow.gtag) { if (choice !== "accepted") lastTrackedRoute.current = null; return; }
    if (lastTrackedRoute.current === null) { lastTrackedRoute.current = routeKey; return; }
    if (lastTrackedRoute.current === routeKey) return;
    lastTrackedRoute.current = routeKey;
    analyticsWindow.gtag("event", "page_view", { page_path: routeKey, page_location: window.location.href });
  }, [choice, routeKey]);
  useEffect(() => {
    function openPreferences() { preferencesTrigger.current = document.activeElement instanceof HTMLButtonElement ? document.activeElement : null; shouldFocusAllow.current = true; setIsPreferencesOpen(true); }
    window.addEventListener(OPEN_PREFERENCES_EVENT, openPreferences);
    return () => window.removeEventListener(OPEN_PREFERENCES_EVENT, openPreferences);
  }, []);
  useEffect(() => { if (bannerIsVisible && shouldFocusAllow.current) { allowButton.current?.focus(); shouldFocusAllow.current = false; } }, [bannerIsVisible]);
  function choose(choiceToSave: Exclude<ConsentChoice, "undecided">) {
    saveChoice(choiceToSave); setIsPreferencesOpen(false); setAnalyticsDisabled(choiceToSave !== "accepted"); if (choiceToSave === "rejected") clearAnalyticsCookies(); if (isPreferencesOpen) preferencesTrigger.current?.focus();
  }

  return <>
    {process.env.NODE_ENV === "production" && choice === "accepted" && <Script id="nimay-ga4-consented" strategy="lazyOnload">{`
      (function () {
        if (window.location.hostname !== 'nimaystudio.com') return;
        window['ga-disable-${GA_MEASUREMENT_ID}'] = false;
        if (window.__nimayGaInitialized) return;
        window.__nimayGaInitialized = true;
        window.dataLayer = window.dataLayer || [];
        window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
        window.gtag('js', new Date());
        window.gtag('config', '${GA_MEASUREMENT_ID}', { send_page_view: false, allow_google_signals: false, allow_ad_personalization_signals: false });
        window.gtag('event', 'page_view', { page_path: window.location.pathname + window.location.search, page_location: window.location.href });
        var script = document.createElement('script'); script.async = true; script.src = 'https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}'; document.head.appendChild(script);
      })();
    `}</Script>}
    {bannerIsVisible && <section id="analytics-consent-banner" className="analytics-consent" aria-labelledby="analytics-consent-title" aria-describedby="analytics-consent-description">
      <div className="analytics-consent-copy"><h2 id="analytics-consent-title" className="mono">{content.consent.title}</h2><p id="analytics-consent-description">{content.consent.description}</p></div>
      <div className="analytics-consent-actions"><button ref={allowButton} type="button" onClick={() => choose("accepted")}>{content.consent.allow}</button><button type="button" onClick={() => choose("rejected")}>{content.consent.reject}</button></div>
    </section>}
  </>;
}

export function AnalyticsPreferencesButton({ label }: { label: string }) {
  return <button className="analytics-preferences-button" type="button" onClick={() => window.dispatchEvent(new Event(OPEN_PREFERENCES_EVENT))}>{label}</button>;
}
