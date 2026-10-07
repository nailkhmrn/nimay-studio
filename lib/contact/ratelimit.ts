import { createHash } from "node:crypto";
import { logFail } from "./log";

/* Hız sınırı. Üretimde Upstash Redis (REST) kullanılır; anahtarlar yoksa yalnızca geliştirmede bellek içi sayaç çalışır.
   IP ve e-posta ham olarak saklanmaz, tuzlu özet olarak saklanır. */

interface Rule {
  name: string;
  max: number;
  windowSec: number;
}

const RULES = {
  ip: { name: "ip", max: 3, windowSec: 600 } satisfies Rule,
  eposta: { name: "eposta", max: 3, windowSec: 3600 } satisfies Rule,
};

const isProd = process.env.NODE_ENV === "production";

function digest(v: string) {
  const salt = process.env.RATE_LIMIT_SALT ?? "nimay-dev";
  return createHash("sha256").update(salt + ":" + v).digest("hex").slice(0, 32);
}

const mem = new Map<string, { count: number; reset: number }>();

class StoreUnconfigured extends Error {}
class StoreError extends Error {
  constructor(public status: number) {
    super("upstash");
  }
}

async function hit(key: string, rule: Rule): Promise<boolean> {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (url && token) {
    const call = async (cmd: (string | number)[]) => {
      const r = await fetch(url, {
        method: "POST",
        headers: { Authorization: "Bearer " + token, "Content-Type": "application/json" },
        body: JSON.stringify(cmd),
        cache: "no-store",
      });
      if (!r.ok) throw new StoreError(r.status);
      return ((await r.json()) as { result: number }).result;
    };
    const k = "nimay:rl:" + rule.name + ":" + key;
    const count = await call(["INCR", k]);
    if (count === 1) await call(["EXPIRE", k, rule.windowSec]);
    return count <= rule.max;
  }
  if (isProd) throw new StoreUnconfigured();
  const now = Date.now();
  const k = rule.name + ":" + key;
  const cur = mem.get(k);
  if (!cur || cur.reset < now) {
    mem.set(k, { count: 1, reset: now + rule.windowSec * 1000 });
    return true;
  }
  cur.count++;
  return cur.count <= rule.max;
}

/* true: gönderime izin var. Depo yoksa ya da hata verirse üretimde reddeder (fail closed) ve nedenini kodla yazar. */
export async function allow(ip: string, email: string): Promise<boolean> {
  try {
    const a = await hit(digest(ip), RULES.ip);
    const b = await hit(digest(email.toLowerCase()), RULES.eposta);
    if (!(a && b)) {
      logFail("hiz_siniri_asildi", { kural: !a ? "ip" : "eposta" });
      return false;
    }
    return true;
  } catch (e) {
    if (e instanceof StoreUnconfigured) logFail("hiz_siniri_deposu_tanimsiz");
    else if (e instanceof StoreError) logFail("hiz_siniri_deposu_hatasi", { durum: e.status });
    else logFail("hiz_siniri_deposu_hatasi", { hata: e instanceof Error ? e.name : "bilinmiyor" });
    return !isProd;
  }
}
