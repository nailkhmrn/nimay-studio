import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { TextLink } from "@/components/ui/text-link";

export default function NotFound() {
  return <Container><Section className="stack" aria-labelledby="not-found-title"><p className="type-label text-muted">NIMAY STUDIO / 404</p><h1 id="not-found-title" className="type-h1">Page not found.</h1><TextLink href="/en">Return home</TextLink></Section></Container>;
}
