# Yayın ve önizleme rehberi

Bu belge, iletişim formunun Vercel'de (Production ve Preview) çalışması için gerekenleri anlatır. Hiçbir anahtar değeri bu depoya yazılmaz.

## 1. Vercel ortam değişkenleri

Vercel, Project, Settings, Environment Variables bölümünde tanımlanır.

| Ad | Tür | Nerede olmalı | Not |
|---|---|---|---|
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Config (herkese açık) | Production ve Preview | Tarayıcıya gider. Derleme sırasında koda gömülür, değiştirince **yeniden dağıtım** gerekir. |
| `TURNSTILE_SECRET_KEY` | Secret | Production ve Preview | Yalnızca sunucuda okunur. Site anahtarıyla aynı Turnstile widget'ına ait olmalı. |
| `UPSTASH_REDIS_REST_URL` | Config | Production ve Preview | Hız sınırı deposu. |
| `UPSTASH_REDIS_REST_TOKEN` | Secret | Production ve Preview | |
| `RATE_LIMIT_SALT` | Secret | Production ve Preview | Rastgele uzun metin. IP ve e-posta bununla özetlenir. |
| `RESEND_API_KEY` | Secret | Production ve Preview | |
| `CONTACT_TO_EMAIL` | Config | Production ve Preview | Mesajların ulaşacağı adres. |
| `CONTACT_FROM_EMAIL` | Config | Production ve Preview | Resend'de doğrulanmış alan adından bir adres. |

**Production ve Preview'ı ayrı ayrı işaretle.** Vercel'de bir değişken ekerken Production, Preview ve Development kutuları ayrı ayrı seçilir. Yalnızca Production işaretliyse önizleme dağıtımlarında değişken **yoktur** ve form hata verir. Her değişken için Preview kutusunun da işaretli olduğunu kontrol et. Değişken ekledikten ya da değiştirdikten sonra ilgili dağıtımı yeniden başlat (Redeploy).

Eksik değişkenler sunucu başlarken günlüğe tek satırda yazılır (yalnızca adlar):

```
[iletisim] eksik ortam değişkenleri: AD1, AD2
```

## 2. Cloudflare Turnstile ve alan adları

Turnstile widget'ı yalnızca ayarlarında listelenen alan adlarında çalışır. Her Vercel önizleme dağıtımı **yeni bir adres** alır (`...-git-dal-adi-....vercel.app`), bu yüzden gerçek anahtar önizlemede `110200` (alan adı tanınmıyor) hatası verir.

- **Production:** Cloudflare'de widget'a `nimaystudio.com` (ve gerekirse `www`) alan adını ekle.
- **Preview:** Cloudflare'in herkese açık **test anahtarlarını** kullan. Bunlar her alan adında çalışır ve gerçek bot kontrolü yapmaz. Liste ve açıklama: https://developers.cloudflare.com/turnstile/troubleshooting/testing/
  Test site anahtarını `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, test gizli anahtarını `TURNSTILE_SECRET_KEY` olarak **yalnızca Preview** ortamına gir. Production'a gerçek anahtarlar girilir.
- Kodda önizleme için atlama ya da bypass yoktur. Önizleme, test anahtarlarıyla aynı güvenlik yolundan geçer.

Tarayıcı konsolunda `[turnstile] hata kodu: ...` görürsen kodu Cloudflare'in hata kodları sayfasından ara. Form bu durumda genel bir hata mesajı gösterir ve Gönder düğmesi bekler.

## 3. Resend ve alt alan adı doğrulaması

Resend yalnızca doğrulanmış bir alan adından gönderir.

1. Resend, Domains bölümünde göndermek için bir **alt alan adı** ekle (örneğin `mail.nimaystudio.com`). Alt alan adı, ana alan adının e-posta kayıtlarını (MX, SPF) etkilemez.
2. Resend'in verdiği DNS kayıtlarını (SPF, DKIM) alan adı sağlayıcında ekle ve Resend'de "Verified" olana kadar bekle.
3. `CONTACT_FROM_EMAIL` değerini bu alt alan adından bir adrese ayarla.
4. Doğrulama olmadan gönderim `resend_hatasi` koduyla reddedilir (günlükte Resend'in hata adı ve durum kodu görünür).

## 4. Günlük kodları

Başarısızlıklar Vercel Runtime Logs içinde `[iletisim]` etiketiyle ve ayrı bir kodla yazılır. Günlüğe anahtar, belirteç, ad, e-posta, mesaj ya da IP yazılmaz. Kullanıcı her durumda genel bir hata mesajı görür.

| Kod | Anlamı |
|---|---|
| `dogrulama_hatasi` | Alan doğrulaması geçmedi (hatalı alan adları yazılır). |
| `honeypot` | Gizli tuzak alan dolu geldi (kullanıcıya başarılı görünür, e-posta gitmez). |
| `turnstile_reddi` | Cloudflare belirteci reddetti (`kodlar=` Cloudflare hata kodları). |
| `turnstile_anahtari_tanimsiz` | `TURNSTILE_SECRET_KEY` yok (üretimde form kapanır). |
| `turnstile_ulasilamadi` | Cloudflare doğrulama servisine ulaşılamadı. |
| `hiz_siniri_deposu_tanimsiz` | `UPSTASH_REDIS_REST_*` yok (üretimde form kapanır). |
| `hiz_siniri_deposu_hatasi` | Upstash hata verdi (`durum=` HTTP kodu). |
| `hiz_siniri_asildi` | Aynı IP ya da e-posta sınırı aştı (`kural=ip` ya da `eposta`). |
| `eposta_ayari_eksik` | Resend değişkenlerinden biri yok. |
| `resend_hatasi` | Resend reddetti (`durum=` HTTP kodu, `ad=` Resend hata adı). |

## 5. Test sırası

Önizlemede şu sırayla dene. Bir adım başarısız olursa sonrakine geçme.

1. Vercel'de Preview ortamındaki 8 değişkenin tanımlı olduğunu kontrol et, dağıtımı yeniden başlat.
2. Runtime Logs'ta `eksik ortam değişkenleri` satırı **olmadığını** doğrula.
3. Önizleme adresinde `/tr/iletisim` sayfasını aç, tarayıcı konsolunda `[turnstile]` hatası olmadığını doğrula. Gönder düğmesi Turnstile hazır olunca etkinleşir.
4. Boş formu gönder: "Bu alan boş bırakılamaz." mesajı gelmeli.
5. Geçerli bir mesaj gönder: başarı mesajı gelmeli ve `CONTACT_TO_EMAIL` adresine e-posta düşmeli.
6. Aynı IP'den üst üste dördüncü gönderimde hata mesajı gelmeli ve günlükte `hiz_siniri_asildi` görünmeli.
7. `/en/contact` sayfasında 3 ile 5. adımları İngilizce mesajlarla tekrarla.
8. Ana sayfadaki (`/tr` ve `/en`) iletişim formunu da bir kez dene.

## 6. Birleştirmeden önce kontrol listesi

- [ ] Production ortamında gerçek Turnstile anahtarları, Upstash, Resend ve `RATE_LIMIT_SALT` tanımlı; Preview'da test anahtarları tanımlı.
- [ ] Cloudflare widget'ında `nimaystudio.com` listeli.
- [ ] Resend alt alan adı "Verified".
- [ ] Önizlemede yukarıdaki test sırası baştan sona geçti.
- [ ] `npm run lint`, `npm run typecheck` ve `npm run build` temiz.
- [ ] `npm audit` çıktısı gözden geçirildi.
- [ ] Önizlemede TR ve EN tüm sayfalar, dil değiştirici, tema anahtarı ve çerez onayı denendi.
- [ ] Eski adreslerden (`/work`, `/studio`, `/contact`, `/services`, `/privacy`) yeni sayfalara yönlendirme çalışıyor.
- [ ] GitHub'da "Allow auto-merge" ayarı bilinçli olarak belirlendi.
- [ ] Nail incelemesini bitirdi ve birleştirmeyi kendisi yaptı.
