// Homepage sections are numbered (01)–(05) in reading order.
export function sectionNumber(position: number) {
  return `(${String(position).padStart(2, "0")})`;
}
