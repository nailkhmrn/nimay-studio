"use client";

import { useActionState } from "react";
import { submitContact } from "@/app/actions/contact";
import { guard, onInput, onInvalid } from "@/lib/contact/client";
import type { ContactState } from "@/lib/contact/schema";
import type { Locale, SiteContent } from "@/content/types";
import { Honeypot } from "../forms/Honeypot";
import { Turnstile } from "../forms/Turnstile";

const initial: ContactState = { status: "idle" };

/* İletişim sayfasındaki form. Doğrulama, hız sınırı ve bot kontrolü sunucu eyleminde (app/actions/contact.ts). */
export function ContactForm({ locale, form }: { locale: Locale; form: SiteContent["form"] }) {
  const [state, action, pending] = useActionState(submitContact, initial);
  const v = state.values;
  const status = state.status === "idle" ? form.idle : state.message;
  const invalid = onInvalid(form.missing);

  return (
    <form id="form" action={action} onSubmit={guard} noValidate data-r aria-busy={pending}>
      <input type="hidden" name="locale" value={locale} />
      <label>
        <span className="mono">{form.name}</span>
        <input type="text" name="ad" autoComplete="name" maxLength={100} required defaultValue={v?.ad} onInvalid={invalid} onInput={onInput} />
      </label>
      <label>
        <span className="mono">{form.email}</span>
        <input type="email" name="eposta" autoComplete="email" maxLength={254} required defaultValue={v?.eposta} onInvalid={invalid} onInput={onInput} />
      </label>
      <fieldset>
        <legend className="mono">{form.kind}</legend>
        <div className="chips">
          {(["yeni", "seo", "emin"] as const).map((kind) => (
            <label className="chip" key={kind}>
              <input type="radio" name="tur" value={kind} defaultChecked={(v?.tur ?? "yeni") === kind} />
              <span className="mono">{form.kinds[kind]}</span>
            </label>
          ))}
        </div>
      </fieldset>
      <label>
        <span className="mono">{form.project}</span>
        <textarea name="mesaj" maxLength={3000} required defaultValue={v?.mesaj} onInvalid={invalid} onInput={onInput}></textarea>
      </label>
      <Honeypot />
      <Turnstile resetKey={state} />
      <div className="crow">
        <button className="mag" id="mag" type="submit" disabled={pending}>
          {form.send}
        </button>
        <p className="mono status" id="status" role="status">
          {status}
        </p>
      </div>
    </form>
  );
}
