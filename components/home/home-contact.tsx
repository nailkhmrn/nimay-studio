"use client";

import { useActionState } from "react";
import { submitContact } from "@/app/actions/contact";
import { guard, onInput, onInvalid } from "@/lib/contact/client";
import type { ContactState } from "@/lib/contact/schema";
import type { Locale, SiteContent } from "@/content/types";
import { Honeypot } from "../forms/Honeypot";
import { Turnstile } from "../forms/Turnstile";

const initial: ContactState = { status: "idle" };

/* Ana sayfadaki iletişim alanı. İletişim sayfasındaki ile aynı sunucu eylemini kullanır;
   "Gönder" düğmesi taslaktaki yerinde durur ve formu form="homeform" ile gönderir. */
export function HomeContact({ locale, form, hint }: { locale: Locale; form: SiteContent["form"]; hint: string }) {
  const [state, action, pending] = useActionState(submitContact, initial);
  const v = state.values;
  const invalid = onInvalid(form.missing);

  return (
    <div className="cwrap">
      <form id="homeform" action={action} onSubmit={guard} noValidate data-r aria-busy={pending}>
        <input type="hidden" name="locale" value={locale} />
        <label>
          <span className="mono">{form.name}</span>
          <input type="text" name="ad" autoComplete="name" maxLength={100} required defaultValue={v?.ad} onInvalid={invalid} onInput={onInput} />
        </label>
        <label>
          <span className="mono">{form.email}</span>
          <input type="email" name="eposta" autoComplete="email" maxLength={254} required defaultValue={v?.eposta} onInvalid={invalid} onInput={onInput} />
        </label>
        <label>
          <span className="mono">{form.project}</span>
          <textarea name="mesaj" maxLength={3000} required defaultValue={v?.mesaj} onInvalid={invalid} onInput={onInput}></textarea>
        </label>
        <Honeypot />
        <Turnstile resetKey={state} />
      </form>
      <div className="crow" data-r>
        <button className="mag" id="mag" type="submit" form="homeform" disabled={pending}>
          {form.send}
        </button>
        <p className="mono" role="status" style={{ margin: 0, maxWidth: "30ch", color: "var(--mut)" }}>
          {state.status === "idle" ? hint : state.message}
        </p>
      </div>
    </div>
  );
}
