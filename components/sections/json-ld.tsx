/* Yapısal veri. "<" karakteri kaçırılır, böylece veri bir betik kapanışına dönüşemez. */
export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\u003c") }} />;
}
