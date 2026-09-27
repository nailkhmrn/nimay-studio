"use client";

import { useState } from "react";
import type { SiteContent } from "@/content/types";

export function CopyEmail({ email, labels }: { email: string; labels: Pick<SiteContent["labels"], "copyEmail" | "emailCopied"> }) {
  const [copied, setCopied] = useState(false);
  async function copyEmail() {
    try { await navigator.clipboard.writeText(email); setCopied(true); window.setTimeout(() => setCopied(false), 1800); } catch { window.location.href = `mailto:${email}`; }
  }
  return <button className="copy-email" type="button" onClick={copyEmail}>{copied ? labels.emailCopied : labels.copyEmail}</button>;
}
