import type { SiteContent } from "@/content/types";

export const tr = {
  languageName: "Türkçe",
  metadata: {
    title: "NIMAY — Bağımsız Dijital Stüdyo",
    description: "NIMAY, bağımsız profesyoneller ve küçük işletmeler için özel tasarlanmış web siteleri hazırlayan bağımsız bir dijital stüdyodur. Türkiye merkezli.",
    ogTitle: "NIMAY — Bağımsız Dijital Stüdyo",
    ogDescription: "NIMAY, bağımsız profesyoneller ve küçük işletmeler için özel tasarlanmış web siteleri hazırlayan bağımsız bir dijital stüdyodur. Türkiye merkezli.",
    ogLocale: "tr_TR",
    alternateLocale: "en_US",
    imageAlt: "NIMAY — Bağımsız Dijital Stüdyo",
  },
  labels: {
    home: "Ana sayfa", work: "İşler", contact: "İletişim", language: "Dil", darkAction: "Koyu", lightAction: "Açık", menu: "Menü", close: "Kapat", navigation: "Ana navigasyon", mobileNavigation: "Mobil navigasyon", skipToContent: "İçeriğe geç", basedIn: "Türkiye merkezli", selectedWork: "Seçili İşler", services: "Hizmetler", sector: "Sektör", year: "Yıl", viewProject: "Projeyi görüntüle", conceptWebsite: "Konsept Web Sitesi", engagements: "Teklif", websiteEngagements: "Her projeye özel teklif.", typicalTimeline: "Tahmini süre", terms: "Koşullar", approach: "Yaklaşım", studio: "Stüdyo", capabilities: "Yetkinlikler", contactPrompt: "Projenizi anlatın.", copyEmail: "E-postayı kopyala", emailCopied: "E-posta kopyalandı", emailSubject: "Web sitesi talebi", whatsapp: "WhatsApp’tan yazın", whatsappMessage: "Merhaba, NIMAY Studio ile web sitesi projem hakkında konuşmak istiyorum.", privacy: "Gizlilik", privacyPreferences: "Gizlilik tercihleri", analyticsPreferences: "Analiz tercihleri", allowAnalytics: "Analizlere izin ver", rejectAnalytics: "Reddet", analyticsDescription: "Site kullanımını ölçmemize yardımcı olması için analizlere izin verin veya isteğe bağlı analizleri kapalı tutmak için reddedin. Seçiminiz bu cihazda saklanır ve istediğiniz zaman değiştirilebilir.", footerStudioDescriptor: "Bağımsız Dijital Stüdyo", viewProjectAria: "Konsept web sitesini görüntüle",
  },
  hero: { kicker: "NIMAY / Bağımsız Dijital Stüdyo", title: "İlk taslaktan yayına, özel tasarlanmış web siteleri.", location: "Türkiye merkezli" },
  selectedWork: { framing: "Tasarım ve geliştirme yaklaşımımı gösteren bağımsız konsept çalışmaları. Gerçek müşteri projesi değildir." },
  projects: {
    "zera-moda": { projectType: "Gelinlik web sitesi", description: "Koleksiyon keşfini yönlendirilmiş özel prova talebiyle birleştiren bir gelinlik web sitesi konsepti.", services: ["Web sitesi tasarımı / Geliştirme / Sanat yönetimi"], industry: "Moda" },
    "erbay-ekinci": { projectType: "Couture atölyesi web sitesi", description: "Koleksiyon hikâyeleri, atölye detayları ve net bir randevu talebi akışı sunan İstanbul merkezli haute couture web sitesi konsepti.", services: ["Web sitesi tasarımı / Sanat yönetimi / Geliştirme"], industry: "Haute Couture" },
  },
  offer: {
    name: "Özel web sitesi",
    audience: "Bağımsız profesyoneller, küçük işletmeler ve hizmet sektöründeki markalar için. Fiyat; sayfa sayısına, içeriğin hazır olup olmadığına ve takvime göre belirlenir. İlk görüşmeden sonra yazılı teklif alırsınız.",
    timelineLabel: "Kapsama göre 7–14 iş günü",
    scopeLabel: "Dahil olanlar",
    scope: ["Keşif ve içerik planı", "Bilgi mimarisi", "Özel web sitesi tasarımı", "Mobil uyumlu geliştirme", "Teknik SEO kurulumu", "İletişim veya randevu talebi akışı", "Mobil test ve yayına alma", "2 revizyon turu", "Tesliminden sonra 30 gün teknik hata desteği"],
    note: "Sayfa sayısı, revizyon hakkı ve destek kapsamı teklifte yazılı olarak belirlenir.",
  },
  approachHeading: "Nasıl çalışıyoruz?",
  approach: [{ title: "Yön Belirleme", description: "İşinizi, hedef kitlenizi ve kısıtlarınızı dinlerim. Sitenin ne anlatması ve ne yapması gerektiğini birlikte netleştiririz." }, { title: "Tasarım", description: "Görsel sistemi ve sayfa yapısını kurar, geliştirmeye geçmeden önce temel etkileşimleri sizinle netleştiririm." }, { title: "Geliştirme", description: "Onayladığınız tasarımı mobil uyumlu bir web sitesine dönüştürür, tesliminden önce sayfaları ve etkileşimleri test ederim." }],
  studioStatement: "Bir web sitesi markayı netleştirmeli ve bir sonraki adımı görünür kılmalı.",
  capabilities: [{ title: "Tasarım", items: ["Özel web sitesi tasarımı", "Sanat yönetimi"] }, { title: "Geliştirme", items: ["Next.js ile geliştirme", "Mobil uyumlu sayfalar"] }, { title: "Yayın", items: ["Teknik SEO kurulumu", "Yayına alma ve 30 gün destek"] }],
  contact: { heading: "Projenizi anlatın.", guidance: "İşinizi, varsa mevcut web sitenizi, yeni sitenin ne yapmasını istediğinizi ve tercih ettiğiniz takvimi kısaca yazın. Size sonraki adımları ve kapsamı netleştirmek için gereken soruları iletirim.", location: "Türkiye merkezli" },
  privacy: { kicker: "NIMAY / Gizlilik", title: "Gizlilik ve analiz", updated: "Son güncelleme: Eylül 2026", sections: [{ number: "01", title: "İsteğe bağlı analizler", paragraphs: ["NIMAY, Google Analytics 4’ü (GA4) yalnızca açıkça izin vermeniz halinde kullanır. Bu seçimi yapmadan önce GA4 yüklenmez ve herhangi bir analiz isteği gönderilmez. Analizleri reddederseniz GA4 devre dışı kalır.", "Seçiminiz tarayıcınızda yerel olarak saklanır. Alt bilgideki gizlilik tercihleri üzerinden seçiminizi istediğiniz zaman yeniden açıp değiştirebilirsiniz."] }, { number: "02", title: "Analiz izni verirseniz", paragraphs: ["Google Analytics, analiz çerezleri yerleştirebilir ve görüntülenen sayfalar, cihaz ve tarayıcı bilgileri, IP adresinizden türetilen yaklaşık konum ve etkileşim verileri gibi standart kullanım bilgilerini toplayabilir. NIMAY, isim, e-posta adresi veya diğer doğrudan kişisel tanımlayıcıları Google Analytics’e bilerek göndermez.", "Reklam sinyalleri mevcut uygulamada kapalıdır. NIMAY, Google Ads, yeniden pazarlama veya kullanıcı kimlikleri kullanmaz."] }, { number: "03", title: "Tarayıcı depolaması", paragraphs: ["Analiz tercihiniz daha sonraki ziyaretlerde hatırlanması için tarayıcınızın yerel depolama alanına kaydedilir. Site, temel işlevlerin çalışması için teknik olarak gerekli tarayıcı veya depolama mekanizmalarını da kullanabilir."] }], contactLabel: "İletişim", contactHeading: "Gizlilik hakkında sorularınız mı var?" },
  notFound: { kicker: "NIMAY STUDIO / 404", title: "Sayfa bulunamadı.", home: "Ana sayfaya dön" },
  terms: ["Başlangıçta %50 / nihai üretim tesliminden önce %50 ödeme.", "Ek kapsam ayrıca fiyatlandırılır.", "Alan adı, ücretli üçüncü taraf hizmetleri ve profesyonel fotoğraf/video gibi üretim maliyetleri ayrıca teklif edilmedikçe dahil değildir.", "Sürekli SEO, reklam, e-ticaret/ödeme sistemleri, çeviri ve devam eden bakım ayrı kapsamlardır.", "Dahil olan 30 günlük destek, teslim edilen çalışmadaki teknik hataları kapsar; sınırsız tasarım veya içerik değişikliğini kapsamaz."],
} as const satisfies SiteContent;
