"use client";

import Script from "next/script";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";

const GA_MEASUREMENT_ID = "G-J6Z3RYRXJ7";
const CONSENT_STORAGE_KEY = "nimay-analytics-consent-v1";
const OPEN_PREFERENCES_EVENT = "nimay:open-analytics-preferences";
const CONSENT_CHANGE_EVENT = "nimay:analytics-consent-change";

type ConsentChoice = "undecided" | "accepted" | "rejected";
type ConsentSnapshot = ConsentChoice | "pending";

let memoryChoice: Exclude<ConsentChoice, "undecided"> | null = null;

function setAnalyticsDisabled(disabled: boolean) {
  const analyticsWindow = window as unknown as Record<string, unknown>;
  analyticsWindow[`ga-disable-${GA_MEASUREMENT_ID}`] = disabled;
}

function clearAnalyticsCookies() {
  const analyticsCookies = document.cookie
    .split(";")
    .map((cookie) => cookie.trim().split("=")[0] ?? "")
    .filter((name) => name === "_ga" || name.startsWith("_ga_"));

  for (const name of analyticsCookies) {
    document.cookie = `${name}=; Max-Age=0; path=/; SameSite=Lax`;
    document.cookie = `${name}=; Max-Age=0; path=/; domain=nimaystudio.com; SameSite=Lax`;
  }
}

function saveChoice(choice: Exclude<ConsentChoice, "undecided">) {
  memoryChoice = choice;
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, choice);
  } catch {
    // Keep the current-page choice if browser storage is unavailable.
  }
  window.dispatchEvent(new Event(CONSENT_CHANGE_EVENT));
}

function readChoice(): ConsentChoice {
  try {
    const storedChoice = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (storedChoice === "accepted" || storedChoice === "rejected") return storedChoice;
  } catch {
    return memoryChoice ?? "undecided";
  }
  return memoryChoice ?? "undecided";
}

function getConsentSnapshot(): ConsentSnapshot {
  return readChoice();
}

function getServerConsentSnapshot(): ConsentSnapshot {
  return "pending";
}

function subscribeToConsent(callback: () => void) {
  window.addEventListener(CONSENT_CHANGE_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(CONSENT_CHANGE_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

export function AnalyticsConsent() {
  const consentSnapshot = useSyncExternalStore(subscribeToConsent, getConsentSnapshot, getServerConsentSnapshot);
  const choice: ConsentChoice = consentSnapshot === "pending" ? "undecided" : consentSnapshot;
  const isReady = consentSnapshot !== "pending";
  const [isPreferencesOpen, setIsPreferencesOpen] = useState(false);
  const shouldFocusAllow = useRef(false);
  const preferencesTrigger = useRef<HTMLButtonElement | null>(null);
  const allowButton = useRef<HTMLButtonElement | null>(null);
  const bannerIsVisible = isReady && (choice === "undecided" || isPreferencesOpen);

  useEffect(() => {
    setAnalyticsDisabled(choice !== "accepted");
  }, [choice]);

  useEffect(() => {
    function openPreferences() {
      preferencesTrigger.current = document.activeElement instanceof HTMLButtonElement
        ? document.activeElement
        : null;
      shouldFocusAllow.current = true;
      setIsPreferencesOpen(true);
    }

    window.addEventListener(OPEN_PREFERENCES_EVENT, openPreferences);
    return () => window.removeEventListener(OPEN_PREFERENCES_EVENT, openPreferences);
  }, []);

  useEffect(() => {
    if (!bannerIsVisible || !shouldFocusAllow.current) return;
    allowButton.current?.focus();
    shouldFocusAllow.current = false;
  }, [bannerIsVisible]);

  function choose(choiceToSave: Exclude<ConsentChoice, "undecided">) {
    saveChoice(choiceToSave);
    setIsPreferencesOpen(false);
    setAnalyticsDisabled(choiceToSave !== "accepted");
    if (choiceToSave === "rejected") clearAnalyticsCookies();

    if (isPreferencesOpen) preferencesTrigger.current?.focus();
  }

  return (
    <>
      {process.env.NODE_ENV === "production" && choice === "accepted" && (
        <Script id="nimay-ga4-consented" strategy="afterInteractive">
          {`
            (function () {
              if (window.location.hostname !== 'nimaystudio.com') return;
              window['ga-disable-${GA_MEASUREMENT_ID}'] = false;
              if (window.__nimayGaInitialized) return;
              window.__nimayGaInitialized = true;
              window.dataLayer = window.dataLayer || [];
              window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
              window.gtag('js', new Date());
              window.gtag('config', '${GA_MEASUREMENT_ID}', {
                send_page_view: false,
                allow_google_signals: false,
                allow_ad_personalization_signals: false
              });
              window.gtag('event', 'page_view');
              var script = document.createElement('script');
              script.async = true;
              script.src = 'https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}';
              document.head.appendChild(script);
            })();
          `}
        </Script>
      )}
      {bannerIsVisible && (
        <section
          id="analytics-consent-banner"
          className="analytics-consent"
          aria-labelledby="analytics-consent-title"
          aria-describedby="analytics-consent-description"
        >
          <div className="analytics-consent-copy">
            <h2 id="analytics-consent-title" className="type-label">Analytics preferences</h2>
            <p id="analytics-consent-description" className="type-small">
              Allow analytics to help measure site use, or reject to keep optional analytics off. Your choice is saved on this device and can be changed at any time.
            </p>
          </div>
          <div className="analytics-consent-actions">
            <button ref={allowButton} type="button" onClick={() => choose("accepted")}>Allow analytics</button>
            <button type="button" onClick={() => choose("rejected")}>Reject</button>
          </div>
        </section>
      )}
    </>
  );
}

export function AnalyticsPreferencesButton() {
  return (
    <button
      className="analytics-preferences-button type-label"
      type="button"
      onClick={() => window.dispatchEvent(new Event(OPEN_PREFERENCES_EVENT))}
    >
      Privacy preferences
    </button>
  );
}
