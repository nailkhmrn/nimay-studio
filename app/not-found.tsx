import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { TextLink } from "@/components/ui/text-link";

export default function NotFound() {
  return (
    <Container lang="tr">
      <Section className="stack" aria-labelledby="not-found-title">
        <p className="type-label text-muted">NIMAY STUDIO / 404</p>
        <h1 id="not-found-title" className="type-h1">Sayfa bulunamadı.</h1>
        <TextLink href="/">Başlangıca dön</TextLink>
      </Section>
    </Container>
  );
}
