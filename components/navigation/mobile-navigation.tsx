"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import { Container } from "@/components/layout/container";
import { LocaleSwitcher } from "@/components/navigation/locale-switcher";
import { CurrentLink } from "./current-link";
import type { NavigationItem } from "@/content/navigation";
import type { Locale, SiteContent } from "@/content/types";

export function MobileNavigation({ locale, content, navigation }: { locale: Locale; content: SiteContent; navigation: readonly NavigationItem[] }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    dialogRef.current?.close();
  }, [pathname]);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 64rem)");
    const close = () => dialogRef.current?.close();
    const onBreakpointChange = () => { if (desktop.matches) close(); };
    desktop.addEventListener("change", onBreakpointChange);
    window.addEventListener("popstate", close);
    window.addEventListener("pagehide", close);
    return () => {
      desktop.removeEventListener("change", onBreakpointChange);
      window.removeEventListener("popstate", close);
      window.removeEventListener("pagehide", close);
      close();
    };
  }, []);

  const mountDialog = useCallback((dialog: HTMLDialogElement | null) => {
    dialogRef.current = dialog;
    if (!dialog) return;
    if (!dialog.open) dialog.showModal();
    closeRef.current?.focus({ preventScroll: true });
  }, []);

  function handleClose() {
    setIsOpen(false);
    const target = triggerRef.current?.getClientRects().length ? triggerRef.current : document.getElementById("site-home-link");
    target?.focus({ preventScroll: true });
  }

  return (
    <div className="mobile-navigation">
      <button ref={triggerRef} type="button" className="menu-control" aria-haspopup="dialog" aria-expanded={isOpen} aria-controls={isOpen ? "mobile-menu" : undefined} onClick={() => setIsOpen(true)}>{content.labels.menu}</button>
      {isOpen && createPortal(<dialog ref={mountDialog} id="mobile-menu" className="mobile-menu" aria-labelledby="mobile-menu-title" onClose={handleClose}>
        <Container className="mobile-menu-layout">
          <div className="mobile-menu-top">
            <span className="wordmark" aria-hidden="true">NIMAY</span>
            <h2 id="mobile-menu-title" className="sr-only">{content.labels.mobileNavigation}</h2>
            <button ref={closeRef} type="button" className="menu-control" aria-label={content.labels.close} onClick={() => dialogRef.current?.close()}>{content.labels.close}</button>
          </div>
          <nav aria-label={content.labels.mobileNavigation} className="mobile-menu-nav">
            <ul>
              {navigation.map((item) => (
                <li key={item.href}>
                  <CurrentLink href={item.href} className="nav-link mobile-menu-link" onClick={(event) => {
                    if (event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey) dialogRef.current?.close();
                  }}>{item.label}</CurrentLink>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mobile-menu-tools">
            <LocaleSwitcher locale={locale} ariaLabel={content.labels.language} />
          </div>
          <div className="mobile-menu-bottom">
            <p className="type-small">NIMAY Studio</p>
            <p className="type-small text-muted">{content.labels.footerStudioDescriptor}</p>
          </div>
        </Container>
      </dialog>, document.body)}
    </div>
  );
}
