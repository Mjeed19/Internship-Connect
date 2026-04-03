import { useState, useEffect, useRef } from "react";

const WA =
  "https://wa.me/966534831944?text=%D8%A3%D9%88%D8%AF%20%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%A7%D8%B1%20%D8%B9%D9%86%20%D9%85%D8%B9%D8%B1%D8%B6%20%D8%B1%D9%88%D8%A7%D9%81%D8%AF%20%D9%81%D9%86%D8%AA%D9%83%202026";
const WA_OWN =
  "https://wa.me/966534831944?text=%D8%A3%D9%88%D8%AF%20%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%A7%D8%B1%20%D8%B9%D9%86%20%D8%A7%D9%84%D9%85%D8%B4%D8%A7%D8%B1%D9%83%D8%A9%20%D8%A8%D8%A8%D9%88%D8%AB%20%D8%AE%D8%A7%D8%B5%20%D9%81%D9%8A%20%D9%85%D8%B9%D8%B1%D8%B6%20%D8%B1%D9%88%D8%A7%D9%81%D8%AF%20%D9%81%D9%86%D8%AA%D9%83%202026";
const WA_PRV =
  "https://wa.me/966534831944?text=%D8%A3%D9%88%D8%AF%20%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%A7%D8%B1%20%D8%B9%D9%86%20%D8%A7%D9%84%D9%85%D8%B4%D8%A7%D8%B1%D9%83%D8%A9%20%D8%A8%D8%A8%D9%88%D8%AB%20%D9%85%D9%82%D8%AF%D9%91%D9%85%20%D9%81%D9%8A%20%D9%85%D8%B9%D8%B1%D8%B6%20%D8%B1%D9%88%D8%A7%D9%81%D8%AF%20%D9%81%D9%86%D8%AA%D9%83%202026";
const WA_MTG =
  "https://wa.me/966534831944?text=%D8%A3%D9%88%D8%AF%20%D8%AD%D8%AC%D8%B2%20%D8%A7%D8%AC%D8%AA%D9%85%D8%A7%D8%B9%20%D9%85%D9%86%D8%A7%D9%82%D8%B4%D8%A9%20%D8%A7%D9%84%D8%AA%D8%AF%D8%B1%D9%8A%D8%A8";
const EMAIL = "pr.technationclub@gmail.com";

const SVGWa = () => (
  <svg
    viewBox="0 0 24 24"
    style={{ width: 18, height: 18, fill: "currentColor", flexShrink: 0 }}
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zm-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884zm8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
  </svg>
);

function Rev({
  children,
  cls = "",
  ms = 0,
}: {
  children: React.ReactNode;
  cls?: string;
  ms?: number;
}) {
  const r = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = r.current;
    if (!el) return;
    const o = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setTimeout(() => el.classList.add("visible"), ms);
      },
      { threshold: 0.05, rootMargin: "0px 0px -40px 0px" },
    );
    o.observe(el);
    return () => o.disconnect();
  }, [ms]);
  return (
    <div ref={r} className={`reveal-sec ${cls}`}>
      {children}
    </div>
  );
}

const ORGS_ROW1 = [
  { n: "البنك المركزي السعودي", c: "#00703c" },
  { n: "SDAIA", c: "#1B4F9A" },
  { n: "وزارة الاستثمار", c: "#006837" },
  { n: "فنتك السعودية", c: "#007A53" },
  { n: "الأكاديمية المالية", c: "#1E3A5F" },
  { n: "STC Bank", c: "#6A1F7A" },
  { n: "بنك الإنماء", c: "#004B8D" },
  { n: "بنك الرياض", c: "#003087" },
];
const ORGS_ROW2 = [
  { n: "SIDF", c: "#00843D" },
  { n: "تمارا", c: "#D4521A" },
  { n: "Tabby", c: "#0F9B8E" },
  { n: "Barq", c: "#4A5568" },
  { n: "Urpay", c: "#6B3FA0" },
  { n: "EY", c: "#B8960C" },
  { n: "PwC", c: "#E0301E" },
  { n: "Fintech Saudi", c: "#007A53" },
];

function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null);
  useEffect(() => {
    fetch("https://api.counterapi.dev/v1/rawafid-fintech-2026/visitors/up")
      .then((r) => r.json())
      .then((d) => setCount(Number(d.count)))
      .catch(() => {});
  }, []);
  if (count === null) return null;
  return (
    <div className="vc-badge">
      <div className="vc-dot" />
      <span className="vc-txt">زيارة</span>
      <span className="vc-num">{count.toLocaleString("en-US")}</span>
    </div>
  );
}

function useCountdown() {
  const target = new Date("2026-05-05T09:00:00Z").getTime();
  const calc = () => {
    const diff = target - Date.now();
    if (diff <= 0) return { d: 0, h: 0, m: 0, s: 0 };
    return {
      d: Math.floor(diff / 86400000),
      h: Math.floor((diff % 86400000) / 3600000),
      m: Math.floor((diff % 3600000) / 60000),
      s: Math.floor((diff % 60000) / 1000),
    };
  };
  const [t, setT] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setT(calc()), 1000);
    return () => clearInterval(id);
  }, []);
  return t;
}

export default function Home() {
  const cd = useCountdown();
  const [faq, setFaq] = useState<number | null>(null);

  return (
    <div dir="rtl">
      {/* NAV */}
      <nav>
        <div className="n-logo">
          <div>
            <div className="n-brand">
              معرض <span className="n-brand-accent">روافد فنتك</span>
            </div>
            <div className="n-sub">التدريب التعاوني · 2026</div>
          </div>
        </div>
        <ul className="n-links">
          <li>
            <a href="#why">المزايا</a>
          </li>
          <li>
            <a href="#booth">البوث</a>
          </li>
          <li>
            <a href="#orgs">الجهات</a>
          </li>
          <li>
            <a href="#faq">FAQ</a>
          </li>
        </ul>
        <a href="#contact" className="n-btn">
          سجّل جهتك
        </a>
      </nav>
      {/* HERO */}
      <section className="hero">
        <img
          src="/hero-bg.webp"
          alt=""
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
            zIndex: 0,
            opacity: 0.12,
            pointerEvents: "none",
          }}
        />
        <div className="h-mesh" />
        <div className="h-grid-bg" />
        <div className="orb-a" />
        <div className="orb-b" />
        <div className="orb-c" />
        {(["tl", "tr", "bl", "br"] as const).map((c) => (
          <div key={c} className={`h-corner ${c}`}>
            <svg width="42" height="42" viewBox="0 0 42 42" fill="none">
              <path d="M42 0H0V42" stroke="#2DB876" strokeWidth="1.4" />
              <circle cx="0" cy="0" r="3" fill="#2DB876" />
            </svg>
          </div>
        ))}
        <div className="h-glow" />
        <div className="h-content">
          <h1 className="h-title animate-fu-1">
            <span className="sub">معرض</span>
            <span className="grad-text">روافد فنتك</span>
          </h1>
          <div className="h-sponsor animate-fu-1">
            <div className="h-sponsor-sub">باشراف كلية علوم الحاسب وكلية الاعمال</div>
            برعاية جامعة الإمام محمد بن سعود الإسلامية
          </div>
          <div className="h-date animate-fu-2">
            <div className="hd">
              <div className="hd-v">5–6 مايو 2026</div>
              <div className="hd-l">التاريخ</div>
            </div>
            <div className="hd">
              <div className="hd-v">12:00 – 8:30 م</div>
              <div className="hd-l">الوقت</div>
            </div>
            <div className="hd">
              <div className="hd-v">بهو جامعة الإمام</div>
              <div className="hd-l">الرياض</div>
            </div>
          </div>
          <div className="h-btns animate-fu-3">
            <a href="#contact" className="btn-p">
              سجّل جهتك — مجاناً
            </a>
            <a href="#meeting" className="btn-s">
              احجز اجتماعاً
            </a>
          </div>
          <div className="h-countdown h-countdown-sm animate-fu-4">
            {[
              { v: cd.d, l: "يوم" },
              { v: cd.h, l: "ساعة" },
              { v: cd.m, l: "دقيقة" },
              { v: cd.s, l: "ثانية" },
            ].map(({ v, l }) => (
              <div key={l} className="hcd-item">
                <div className="hcd-n">{String(v).padStart(2, "0")}</div>
                <div className="hcd-l">{l}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="h-scroll">
          <div className="scroll-line" />
        </div>
      </section>
      {/* STATS STRIP */}
      <div className="stats-strip">
        {[
          { n: "+3000", l: "طالب وطالبة" },
          { n: "يومان", l: "تواجد مكثَّف" },
          { n: "100٪", l: "مجاني للجهات" },
          { n: "قاعدة", l: "بيانات المتدربين" },
        ].map((s, i) => (
          <div key={i} className="stat-item">
            <div className="stat-n">{s.n}</div>
            <div className="stat-l">{s.l}</div>
          </div>
        ))}
      </div>
      {/* WHY — dark cards with watermark numbers */}
      <section className="why-dark" id="why">
        <div className="wrap">
          <Rev>
            <div className="sec-eyebrow">لماذا تشارك؟</div>
            <h2 className="h2 wt" style={{ marginBottom: 40 }}>
              ما الذي تُضيفه <em>مشاركتك</em> لجهتك؟
            </h2>
          </Rev>
          <div className="why-cards why-cards-4">
            {[
              {
                num: "01",
                icon: "🎯",
                t: "وصول مباشر لمواهب المستقبل",
                d: "أكثر من 3000 طالب في قطاع التقنية المالية — اكتشف، قيّم، وتواصل مع أفضل المرشحين خلال يومين.",
              },
              {
                num: "02",
                icon: "🗄️",
                t: "قاعدة بيانات المتدربين",
                d: "تحصل جهتك على قاعدة بيانات شاملة بأسماء الطلاب واهتماماتهم وبياناتهم للتواصل المباشر بعد المعرض.",
              },
              {
                num: "03",
                icon: "📣",
                t: "حضور إعلامي قبل وبعد",
                d: "ذكر رسمي في جميع منصات المعرض، ريلز احترافي، وتقرير موثَّق — يبقى أثرك حياً بعد الفعالية.",
              },
              {
                num: "04",
                icon: "🏆",
                t: "تكريم وتوثيق رسمي",
                d: "درع تكريمي وحزمة صور احترافية وشهادة مشاركة رسمية لتوثيق حضور جهتك في تاريخ القطاع.",
              },
            ].map((w, i) => (
              <Rev key={w.num} ms={i * 90}>
                <div className="why-card" data-num={w.num}>
                  <div className="wcard-num">{w.num}</div>
                  <div className="wcard-icon">{w.icon}</div>
                  <div className="wcard-title">{w.t}</div>
                  <div className="wcard-desc">{w.d}</div>
                  <div className="wcard-line" />
                </div>
              </Rev>
            ))}
          </div>
        </div>
      </section>
      {/* VENUE SECTION */}
      <section className="venue-sec">
        <div className="venue-grid">
          <div className="venue-img-col">
            <div className="venue-img-frame">
              <img
                src="/venue.webp"
                alt="بهو جامعة الإمام"
                className="venue-photo"
              />
              <div className="venue-img-grad" />
              <div className="venue-coord">24°41′N · 46°41′E</div>
              <div className="venue-img-corner tl" />
              <div className="venue-img-corner tr" />
              <div className="venue-img-corner bl" />
              <div className="venue-img-corner br" />
            </div>
          </div>
          <Rev cls="venue-info-col">
            <div className="venue-eyebrow">📍 موقع الفعالية</div>
            <h2 className="venue-title">
              بهو جامعة الإمام
              <br />
              <span>محمد بن سعود الإسلامية</span>
            </h2>
            <div className="venue-divider" />
            <div className="venue-meta-row">
              <div className="venue-meta-item">
                <div className="venue-meta-icon">📅</div>
                <div>
                  <div className="venue-meta-v">5 – 6 مايو 2026</div>
                  <div className="venue-meta-l">التاريخ</div>
                </div>
              </div>
              <div className="venue-meta-item">
                <div className="venue-meta-icon">⏰</div>
                <div>
                  <div className="venue-meta-v">12:00 – 8:30 م</div>
                  <div className="venue-meta-l">الوقت</div>
                </div>
              </div>
              <div className="venue-meta-item">
                <div className="venue-meta-icon">🏙️</div>
                <div>
                  <div className="venue-meta-v">الرياض</div>
                  <div className="venue-meta-l">المدينة</div>
                </div>
              </div>
            </div>
          </Rev>
        </div>
      </section>
      {/* BOOTH */}
      <section className="booth-sec" id="booth">
        <div className="wrap">
          <Rev>
            <div style={{ textAlign: "center", marginBottom: 40 }}>
              <div className="sec-eyebrow" style={{ justifyContent: "center" }}>
                خيارات البوث
              </div>
              <h2 className="h2 wt" style={{ textAlign: "center" }}>
                اختر طريقة <em>تواجدك</em>
              </h2>
              <p
                style={{
                  color: "rgba(255,255,255,.38)",
                  fontSize: ".82rem",
                  marginTop: 6,
                }}
              >
                كلا الخيارين مجاني تماماً
              </p>
            </div>
          </Rev>
          <div className="booth-grid">
            {[
              {
                icon: "🏗️",
                name: "البوث الخاص",
                sub: "Bring Your Own Booth",
                hdr: "linear-gradient(135deg,#13503D,#1B6B52)",
                desc: "أحضر هويتك البصرية الكاملة — نوفر لك المساحة والدعم اللوجستي من أول يوم.",
                items: [
                  "مساحة مخصصة بأبعاد متفق عليها",
                  "طاقة كهربائية وإنترنت مخصص",
                  "لوحات وإشارات في خريطة المعرض",
                  "ذكر رسمي في جميع المواد الإعلامية",
                ],
                ac: "#1B6B52",
                tag: "الأنسب للجهات ذات الهوية البصرية المميزة",
                wa: WA_OWN,
              },
              {
                icon: "✨",
                name: "البوث المقدَّم",
                sub: "Fully Equipped — جاهز بالكامل",
                hdr: "linear-gradient(135deg,#0A5C4F,#0D7D6C)",
                desc: "ركّز على المتدربين — نبني بوثك الاحترافي بشعارك وألوانك بالكامل، أنت لا تحمل شيئاً.",
                items: [
                  "بوث احترافي بشعارك وألوانك",
                  'طاولة وكراسي وشاشة 55"',
                  "إنترنت مخصص وإضاءة LED",
                  "فريق دعم متواصل خلال اليومين",
                ],
                ac: "#0D7D6C",
                tag: "الأنسب للجهات التي تريد راحة لوجستية تامة",
                wa: WA_PRV,
              },
            ].map((b, i) => (
              <Rev key={b.name} ms={i * 110}>
                <div className="bcard">
                  <div className="bcard-hdr" style={{ background: b.hdr }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        marginBottom: 10,
                      }}
                    >
                      <div>
                        <div className="bcard-name">{b.name}</div>
                        <div className="bcard-sub">{b.sub}</div>
                      </div>
                      <div style={{ fontSize: "2rem", lineHeight: 1 }}>
                        {b.icon}
                      </div>
                    </div>
                    <p className="bcard-desc">{b.desc}</p>
                  </div>
                  <div className="bcard-body">
                    {b.items.map((m) => (
                      <div key={m} className="bcard-item">
                        <div
                          className="bcard-check"
                          style={{ background: b.ac }}
                        >
                          ✓
                        </div>
                        <span>{m}</span>
                      </div>
                    ))}
                    <div className="bcard-tag">{b.tag}</div>
                    <a
                      href={b.wa}
                      target="_blank"
                      rel="noreferrer"
                      className="bcard-wa"
                    >
                      <SVGWa />
                      أريد هذا البوث — تواصل عبر واتساب
                    </a>
                  </div>
                </div>
              </Rev>
            ))}
          </div>
        </div>
      </section>
      {/* ORGS — animated double ticker */}
      <section className="orgs-sec" id="orgs">
        <div className="wrap">
          <Rev>
            <div style={{ textAlign: "center", marginBottom: 36 }}>
              <div
                className="sec-eyebrow dk"
                style={{ justifyContent: "center" }}
              >
                الجهات المشاركة
              </div>
              <h2 className="h2" style={{ textAlign: "center" }}>
                في حضرة <em>قادة الصناعة</em>
              </h2>
              <p
                style={{
                  color: "var(--muted-c)",
                  fontSize: ".84rem",
                  marginTop: 6,
                  textAlign: "center",
                }}
              >منظمات وشركات من صميم القطاع المالي والتقني السعودي</p>
            </div>
          </Rev>
        </div>
        <div className="orgs-grid">
          {[...ORGS_ROW1, ...ORGS_ROW2].map((o, i) => (
            <div key={i} className="ticker-pill">
              <div className="ticker-dot" style={{ background: o.c }} />
              <span>{o.n}</span>
            </div>
          ))}
        </div>
      </section>
      {/* FAQ + Meeting strip */}
      <section className="sec sec-tinted" id="faq">
        <div className="wrap">
          <Rev>
            <div style={{ textAlign: "center", marginBottom: 8 }}>
              <div
                className="sec-eyebrow dk"
                style={{ justifyContent: "center" }}
              >
                أسئلة شائعة
              </div>
              <h2 className="h2" style={{ textAlign: "center" }}>
                ما يسألنا عنه <em>الجهات</em>
              </h2>
            </div>
          </Rev>
          <div style={{ maxWidth: 760, margin: "0 auto" }}>
            <div className="faq-list">
              {[
                {
                  q: "هل المشاركة مجانية تماماً؟",
                  a: "نعم — سواء البوث الخاص أو البوث المقدَّم المُجهَّز بشعارك وألوانك.",
                },
                {
                  q: "ما الفرق بين البوثين؟",
                  a: "البوث الخاص: تُحضر تصميمك الكامل ونوفر المساحة والخدمات. البوث المقدَّم: نُجهَّزه بشعارك وألوانك مع طاولة وشاشة وإنترنت وإضاءة.",
                },
                {
                  q: "من الجمهور المتوقع؟",
                  a: "أكثر من 3000 طالب وطالبة من جامعات الرياض يبحثون عن فرص تدريب تعاوني في التقنية المالية.",
                },
                {
                  q: "ما الموعد النهائي للتسجيل؟",
                  a: "يُفضل التسجيل قبل شهر من الفعالية لضمان إدراج شعارك في جميع المواد وتجهيز البوث.",
                },
              ].map((q, i) => (
                <div key={i} className={`faq-item${faq === i ? " open" : ""}`}>
                  <div
                    className="faq-q"
                    onClick={() => setFaq(faq === i ? null : i)}
                  >
                    {q.q}
                    <span className="faq-icon">+</span>
                  </div>
                  <div className="faq-a">{q.a}</div>
                </div>
              ))}
            </div>

            {/* Meeting strip */}
            <Rev ms={60}>
              <div id="meeting" className="mtg-strip">
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div className="mtg-icon">📅</div>
                  <div>
                    <div className="mtg-title">تريد مناقشة التفاصيل أولاً؟</div>
                    <div className="mtg-sub">
                      30 دقيقة زووم أو حضورياً — نشرح كل شيء قبل تسجيلك
                    </div>
                  </div>
                </div>
                <a
                  href={WA_MTG}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-wa-sm"
                >
                  <SVGWa />
                  احجز عبر واتساب
                </a>
              </div>
            </Rev>
          </div>
        </div>
      </section>
      {/* CONTACT */}
      <section className="sec sec-darker" id="contact">
        <div className="wrap">
          <div className="ct-grid" style={{ gridTemplateColumns: "1fr" }}>
            <Rev>
              <div className="lbl lt">سجّل الآن</div>
              <h2 className="h2 wt" style={{ marginBottom: 8 }}>
                سجّل جهتك
                <br />
                كـ<em>جهة تدريب</em>
              </h2>
              <p className="ct-sub">الأماكن محدودة وتُخصَّص بحسب الأولوية.</p>
              <div style={{ display:"flex", gap:12, flexWrap:"wrap", marginTop:20 }}>
                <a href={WA} target="_blank" rel="noreferrer" className="btn-p" style={{ display:"inline-flex", alignItems:"center", gap:8, textDecoration:"none" }}>
                  <SVGWa /> سجّل عبر واتساب
                </a>
              </div>
              <div className="ct-cards" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginTop:24 }}>
                <div className="ccard">
                  <div className="cc-ico">📧</div>
                  <div>
                    <div className="cc-lbl">البريد</div>
                    <div className="cc-val">
                      <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
                    </div>
                  </div>
                </div>
                <div className="ccard">
                  <div className="cc-ico">📞</div>
                  <div>
                    <div className="cc-lbl">العلاقات العامة</div>
                    <div className="cc-val">
                      <a
                        href="tel:+966534831944"
                        style={{ color: "var(--glt)" }}
                      >
                        0534831944
                      </a>
                    </div>
                  </div>
                </div>
                <div className="ccard">
                  <div className="cc-ico">🏫</div>
                  <div>
                    <div className="cc-lbl">الجهة المنظِّمة</div>
                    <div className="cc-val">نادي TechNation × نادي المالية</div>
                  </div>
                </div>
                <div className="ccard">
                  <div className="cc-ico">📅</div>
                  <div>
                    <div className="cc-lbl">الموعد</div>
                    <div className="cc-val">
                      5–6 مايو 2026 · بهو جامعة الإمام
                    </div>
                  </div>
                </div>
              </div>
            </Rev>

          </div>
        </div>
      </section>
      {/* FOOTER */}
      <footer>
        <div className="fi">
          <div className="fb">
            روافد فنتك <span>التدريب التعاوني · 2026</span>
          </div>
          <div className="fc">© 2026 جميع الحقوق محفوظة</div>
          <div style={{ textAlign: "left" }}>
            <div className="fo-n">جامعة الإمام محمد بن سعود الإسلامية</div>
            <div className="fo-s">نادي TechNation · نادي المالية الطلابي</div>
          </div>
        </div>
      </footer>
      {/* VISITOR COUNTER */}
      <VisitorCounter />
      {/* WA FIXED */}
      <a
        className="wa-btn"
        href={WA}
        target="_blank"
        rel="noreferrer"
        title="واتساب"
      >
        <svg viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zm-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884zm8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
        </svg>
      </a>
    </div>
  );
}
