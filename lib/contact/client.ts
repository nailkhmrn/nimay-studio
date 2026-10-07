import type { FormEvent } from "react";

/* Tarayıcı tarafı doğrulama yardımcıları. Boş alanda onaylı mesaj gösterilir;
   e-posta biçimi hatasında tarayıcının kendi mesajı kalır. Asıl doğrulama sunucudadır. */
export function onInvalid(missing: string) {
  return (e: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const el = e.currentTarget;
    if (el.validity.valueMissing) el.setCustomValidity(missing);
  };
}

export function onInput(e: FormEvent<HTMLInputElement | HTMLTextAreaElement>) {
  e.currentTarget.setCustomValidity("");
}

export function guard(e: FormEvent<HTMLFormElement>) {
  const f = e.currentTarget;
  if (!f.checkValidity()) {
    e.preventDefault();
    f.reportValidity();
  }
}
