/* Yükleme perdesi, imleç halkası ve önizleme kutusu: sayfanın en üstünde, taslaktaki sırayla. */
export function HomeShell({ loading }: { loading: string }) {
  return (
    <>
      <div id="loader" aria-hidden="true">
        <div className="half top"></div>
        <div className="half bot"></div>
        <div className="cnt">
          <div className="num" id="lnum">
            0
          </div>
          <div className="mono lbl">{loading}</div>
        </div>
      </div>

      <div id="ring" aria-hidden="true"></div>
      <div id="peek" aria-hidden="true"></div>
    </>
  );
}
