"use client";

import { useEffect, useRef, useState } from "react";

const email = "hello@nimaystudio.com";

export function CopyEmail() {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<number>(0);

  useEffect(() => () => {
    window.clearTimeout(timeoutRef.current);
  }, []);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button type="button" className="contact-copy-button type-label" onClick={handleCopy} aria-label={copied ? "Email copied" : "Copy email"}>
      {copied ? "Email copied" : "Copy email"}
    </button>
  );
}
