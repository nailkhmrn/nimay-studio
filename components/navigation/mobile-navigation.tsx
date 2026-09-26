"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import { Container } from "@/components/layout/container";
import { CurrentLink } from "./current-link";
import { primaryNavigation } from "@/content/navigation";

export function MobileNavigation() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Route changes can also come from history or navigation outside this menu.
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
    // The trigger disappears at the desktop breakpoint; use the home link then.
    const target = triggerRef.current?.getClientRects().length
      ? triggerRef.current
      : document.getElementById("site-home-link");
    target?.focus({ preventScroll: true });
  }

  return (
    <div className="mobile-navigation">
      <button ref={triggerRef} type="button" className="menu-control" aria-haspopup="dialog" aria-expanded={isOpen} aria-controls={isOpen ? "mobile-menu" : undefined} onClick={() => setIsOpen(true)}>Menu</button>
      {/* Keep dialog focusing outside the sticky header's scroll ancestors. */}
      {isOpen && createPortal(<dialog ref={mountDialog} id="mobile-menu" className="mobile-menu" aria-labelledby="mobile-menu-title" onClose={handleClose}>
        <Container className="mobile-menu-layout">
          <div className="mobile-menu-top">
            <span className="wordmark" aria-hidden="true">NIMAY</span>
            <h2 id="mobile-menu-title" className="sr-only">Navigation</h2>
            <button ref={closeRef} type="button" className="menu-control" aria-label="Close menu" onClick={() => dialogRef.current?.close()}>Close</button>
          </div>
          <nav aria-label="Mobile navigation" className="mobile-menu-nav">
            <ul>
              {primaryNavigation.map((item) => (
                <li key={item.href}>
                  <CurrentLink href={item.href} className="nav-link mobile-menu-link" onClick={(event) => {
                    if (event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey) dialogRef.current?.close();
                  }}>{item.label}</CurrentLink>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mobile-menu-bottom">
            <p className="type-small">NIMAY Studio</p>
            <p className="type-small text-muted">Independent Digital Studio</p>
          </div>
        </Container>
      </dialog>, document.body)}
    </div>
  );
}
