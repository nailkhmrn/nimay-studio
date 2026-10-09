import Image from "next/image";

/* Tarayıcı çerçevesinde gerçek proje ekran görüntüsü. Eğim lib/effects/mocks.ts içinde (fareyle). */
export function BrowserFrame({ url, src, width, height, alt, mobile = false, id, sizes, priority = false }: { url: string; src: string; width: number; height: number; alt: string; mobile?: boolean; id?: string; sizes: string; priority?: boolean }) {
  return (
    <div className={mobile ? "stage mob" : "stage"} id={id} data-r>
      <div className="browser">
        <div className="bbar">
          <i></i>
          <i></i>
          <i></i>
          <span className="burl">{url}</span>
        </div>
        <div className={mobile ? "bview mob" : "bview"}>
          <Image src={src} width={width} height={height} alt={alt} sizes={sizes} priority={priority} />
        </div>
      </div>
    </div>
  );
}
