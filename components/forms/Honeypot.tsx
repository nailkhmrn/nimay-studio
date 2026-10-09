/* Gizli tuzak alan: insanlar görmez ve odaklanamaz, botlar doldurur. */
export function Honeypot() {
  return (
    <div className="hp" aria-hidden="true">
      <label>
        Web sitesi
        <input type="text" name="website" tabIndex={-1} autoComplete="off" />
      </label>
    </div>
  )
}
