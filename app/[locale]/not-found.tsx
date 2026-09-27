"use client";

import { usePathname } from "next/navigation";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { TextLink } from "@/components/ui/text-link";
import { en } from "@/content/locales/en";
import { tr } from "@/content/locales/tr";

export default function LocaleNotFound() {
  const pathname = usePathname();
  const locale = pathname.startsWith("/tr") ? "tr" : "en";
  const content = locale === "tr" ? tr : en;
  return <Container><Section className="stack" aria-labelledby="not-found-title"><p className="type-label text-muted">{content.notFound.kicker}</p><h1 id="not-found-title" className="type-h1">{content.notFound.title}</h1><TextLink href={`/${locale}`}>{content.notFound.home}</TextLink></Section></Container>;
}
