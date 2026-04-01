import { useState, useEffect, useRef } from "react";

const WA = "https://wa.me/966534831944?text=%D8%A3%D9%88%D8%AF%20%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%A7%D8%B1%20%D8%B9%D9%86%20%D9%85%D8%B9%D8%B1%D8%B6%20%D8%B1%D9%88%D8%A7%D9%81%D8%AF%20%D9%81%D9%86%D8%AA%D9%83%202026";
const WA_MTG = "https://wa.me/966534831944?text=%D8%A3%D9%88%D8%AF%20%D8%AD%D8%AC%D8%B2%20%D8%A7%D8%AC%D8%AA%D9%85%D8%A7%D8%B9%20%D9%85%D9%86%D8%A7%D9%82%D8%B4%D8%A9%20%D8%A7%D9%84%D8%AA%D8%AF%D8%B1%D9%8A%D8%A8%20%D9%81%D9%8A%20%D9%85%D8%B9%D8%B1%D8%B6%20%D8%B1%D9%88%D8%A7%D9%81%D8%AF%20%D9%81%D9%86%D8%AA%D9%83%202026";
const EMAIL = "pr.technationclub@gmail.com";
const FORMSPREE = "https://formspree.io/f/mnndorva";

const SVGWa = () => (
  <svg viewBox="0 0 24 24" style={{ width: 20, height: 20, fill: "#fff", flexShrink: 0 }}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zm-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884zm8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
  </svg>
);

function Rev({ children, cls = "", ms = 0 }: { children: React.ReactNode; cls?: string; ms?: number }) {
  const r = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = r.current; if (!el) return;
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setTimeout(() => el.classList.add("visible"), ms); }, { threshold: .05, rootMargin: "0px 0px -10px 0px" });
    o.observe(el); return () => o.disconnect();
  }, [ms]);
  return <div ref={r} className={`reveal-sec ${cls}`}>{children}</div>;
}

export default function Home() {
  const [faq, setFaq] = useState<number | null>(null);
  const [booth, setBooth] = useState<"" | "own" | "provided">("");
  const [f, setF] = useState({ org: "", name: "", phone: "", email: "", notes: "" });
  const upd = (k: string, v: string) => setF(p => ({ ...p, [k]: v }));
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [err, setErr] = useState("");

  const send = async () => {
    if (!f.org || !f.name || !f.email) { setErr("يرجى تعبئة الحقول المطلوبة"); return; }
    setErr(""); setBusy(true);
    try {
      const res = await fetch(FORMSPREE, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify({ الجهة: f.org, المسؤول: f.name, البريد: f.email, الجوال: f.phone, "خيار البوث": booth === "own" ? "بوث خاص" : booth === "provided" ? "بوث مقدَّم" : "لم يُحدَّد", ملاحظات: f.notes, _subject: `طلب مشاركة تدريب تعاوني — روافد فنتك 2026 — ${f.org}` }) });
      const d = await res.json();
      if (d.ok || d.next) { setDone(true); setF({ org: "", name: "", phone: "", email: "", notes: "" }); setBooth(""); }
      else setErr("حدث خطأ — تواصل عبر واتساب");
    } catch { setErr("تواصل عبر واتساب مباشرة"); }
    setBusy(false);
  };

  return (
    <div dir="rtl">

      {/* NAV */}
      <nav>
        <div className="n-logo">
          <div>
            <div className="n-brand">معرض <span className="n-brand-accent">روافد فنتك</span></div>
            <div className="n-sub">التدريب التعاوني · 2026</div>
          </div>
        </div>
        <ul className="n-links">
          <li><a href="#why">لماذا تشارك؟</a></li>
          <li><a href="#booth">خيارات البوث</a></li>
          <li><a href="#orgs">الجهات</a></li>
          <li><a href="#faq">FAQ</a></li>
        </ul>
        <a href="#contact" className="n-btn">سجّل جهتك</a>
      </nav>

      {/* HERO */}
      <section className="hero">
        <img src="/hero-bg.webp" alt="" style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover", objectPosition:"center", zIndex:0, opacity:.18, pointerEvents:"none" }} />
        <div className="h-mesh"/><div className="h-grid-bg"/><div className="orb-a"/><div className="orb-b"/>
        {[["tl","0 0H0V42"],["tr","0 0H0V42"],["bl","0 0H0V42"],["br","0 0H0V42"]].map(([c]) => (
          <div key={c} className={`h-corner ${c}`}><svg width="42" height="42" viewBox="0 0 42 42" fill="none"><path d="M42 0H0V42" stroke="#3DAA86" strokeWidth="1.4"/><circle cx="0" cy="0" r="3" fill="#3DAA86"/></svg></div>
        ))}
        <div className="h-glow"/>
        <div className="h-content">
          <h1 className="h-title animate-fu-1">
            <span className="sub">معرض</span>
            <span className="grad-text">روافد فنتك</span>
          </h1>
          <div className="h-nums animate-fu-2">
            <div className="hn"><div className="hn-n">+3000</div><div className="hn-l">طالب يزور المعرض</div></div>
            <div className="hn"><div className="hn-n">يومان</div><div className="hn-l">تواجد كامل</div></div>
          </div>
          <div className="h-date animate-fu-3">
            <div className="hd"><div className="hd-v">5–6 مايو 2026</div><div className="hd-l">التاريخ</div></div>
            <div className="hd"><div className="hd-v">12:00 – 8:30 م</div><div className="hd-l">الوقت</div></div>
            <div className="hd"><div className="hd-v">بهو جامعة الإمام</div><div className="hd-l">الرياض</div></div>
          </div>
          <div className="h-btns animate-fu-4">
            <a href="#contact" className="btn-p">سجّل جهتك — مجاناً</a>
            <a href="#meeting" className="btn-s">احجز اجتماع التدريب</a>
          </div>
        </div>
        <div className="h-scroll"><div className="scroll-line"/></div>
      </section>

      {/* REACH BAR */}
      <div className="reach2">
        <div className="rb2"><div className="rb2-n">+3000</div><div className="rb2-l">طالب وطالبة</div></div>
        <div className="rb2"><div className="rb2-n">جامعات الرياض</div><div className="rb2-l">الجمهور المستهدف</div></div>
        <div className="rb2"><div className="rb2-n">+20</div><div className="rb2-l">جهة تدريب</div></div>
        <div className="rb2"><div className="rb2-n">مجاني</div><div className="rb2-l">للجهات التدريبية</div></div>
      </div>

      {/* WHY */}
      <section className="sec sec-light" id="why">
        <div className="wrap">
          <Rev>
            <div className="lbl" style={{ color: "var(--green)" }}>لماذا تشارك؟</div>
            <h2 className="h2">ما الذي <em>تكسبه</em> مؤسستك؟</h2>
          </Rev>
          <div className="why-grid">
            {[
              { i: "🎯", t: "استقطاب مباشر للمتدربين", d: "وصول فوري لأكثر من 3000 طالب يبحثون عن فرصة تدريب تعاوني." },
              { i: "📣", t: "حضور إعلامي موثَّق", d: "ذكرك في جميع المنشورات الرسمية قبل الفعالية وخلالها وبعدها." },
              { i: "🤝", t: "شبكة مؤسسية", d: "تواصل مع جهات القطاع المالي والتقني في بيئة أكاديمية رسمية." },
              { i: "🏆", t: "تكريم رسمي", d: "درع وتسليم رسمي في حفل الختام أمام كامل الحضور." },
              { i: "📸", t: "تغطية مصورة", d: "صور ومقاطع لجناحك وفريقك للاستخدام في موادكم الإعلامية." },
              { i: "📊", t: "تقرير بعد الفعالية", d: "إحصائيات الحضور والتفاعل لقياس عائد مشاركتكم." },
            ].map((w, i) => (
              <Rev key={w.t} ms={i * 60} cls="wc">
                <span className="wc-i">{w.i}</span>
                <div className="wc-t">{w.t}</div>
                <div className="wc-d">{w.d}</div>
              </Rev>
            ))}
          </div>
        </div>
      </section>

      {/* BOOTH OPTIONS */}
      <section className="sec sec-tinted" id="booth">
        <div className="wrap">
          <Rev>
            <div style={{ textAlign: "center", marginBottom: 42 }}>
              <div className="lbl" style={{ justifyContent: "center", color: "var(--green)" }}>خيارات البوث</div>
              <h2 className="h2" style={{ textAlign: "center" }}>اختر طريقة <em>تواجدك</em></h2>
              <p className="sec-sub" style={{ textAlign: "center" }}>كلا الخيارين مجاني — اختر ما يناسب مؤسستك</p>
            </div>
          </Rev>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>

            {/* OWN */}
            <Rev ms={0}>
              <div className="pkg2 plat">
                <div className="pkg2-header" style={{ background: "linear-gradient(135deg,#1B6B52,#2A8A6A)" }}>
                  <div className="pkg2-top">
                    <div>
                      <div className="pkg2-name">البوث الخاص</div>
                      <div className="pkg2-sub">Bring Your Own Booth</div>
                    </div>
                    <div style={{ fontSize: "2.4rem" }}>🏗️</div>
                  </div>
                </div>
                <div className="pkg2-body">
                  <div className="pkg2-section-sub" style={{ marginBottom: 14 }}>أحضر تصميمك الكامل وهويتك البصرية — نوفر لك المساحة والخدمات.</div>
                  <div className="pkg2-list">
                    {["مساحة مخصصة بأبعاد متفق عليها", "طاقة كهربائية وخدمات كاملة", "لوحات إرشادية في خريطة المعرض", "ذكرك في المواد الإعلانية الرسمية"].map(m => (
                      <div key={m} className="pkg2-item"><div className="pkg2-check">✓</div><div className="pkg2-item-main">{m}</div></div>
                    ))}
                  </div>
                </div>
                <div className="pkg2-footer"><div className="pkg2-tagline">الأنسب للجهات ذات الهوية البصرية المميزة</div></div>
              </div>
            </Rev>

            {/* PROVIDED */}
            <Rev ms={120}>
              <div className="pkg2 inkind">
                <div className="pkg2-header" style={{ background: "linear-gradient(135deg,#0D7D6C,#1A9E8A)" }}>
                  <div className="pkg2-top">
                    <div>
                      <div className="pkg2-name">البوث المقدَّم</div>
                      <div className="pkg2-sub">Provided Booth — جاهز بالكامل</div>
                    </div>
                    <div style={{ fontSize: "2.4rem" }}>✨</div>
                  </div>
                </div>
                <div className="pkg2-body">
                  <div className="pkg2-section-sub" style={{ marginBottom: 14 }}>ركّز على استقطاب المتدربين — نتكفّل بكل التجهيزات بشعارك وألوانك.</div>
                  <div className="pkg2-list">
                    {["بوث احترافي بشعارك وألوانك الرسمية", "طاولة وكراسي وشاشة عرض 55\"", "إنترنت مخصص وإضاءة LED", "فريق دعم متخصص طوال اليومين"].map(m => (
                      <div key={m} className="pkg2-item"><div className="pkg2-check">✓</div><div className="pkg2-item-main">{m}</div></div>
                    ))}
                  </div>
                </div>
                <div className="pkg2-footer"><div className="pkg2-tagline">الأنسب للجهات التي تريد راحة لوجستية تامة</div></div>
              </div>
            </Rev>
          </div>
        </div>
      </section>

      {/* ORGS */}
      <section className="sec sec-light" id="orgs">
        <div className="wrap">
          <Rev>
            <div style={{ textAlign: "center" }}>
              <div className="lbl" style={{ justifyContent: "center", color: "var(--green)" }}>الجهات المتوقعة</div>
              <h2 className="h2" style={{ textAlign: "center" }}>ستكون جانب <em>هؤلاء</em></h2>
            </div>
          </Rev>

          {[
            { lbl: "جهات حكومية وتنظيمية", orgs: [{ n: "البنك المركزي السعودي", e: "SAMA", c: "#00703c" }, { n: "SDAIA", e: "هيئة البيانات والذكاء الاصطناعي", c: "#1B4F9A" }, { n: "وزارة الاستثمار", e: "Ministry of Investment", c: "#006837" }, { n: "فنتك السعودية", e: "Fintech Saudi", c: "#007A53" }, { n: "الأكاديمية المالية", e: "Financial Academy", c: "#1E3A5F" }] },
            { lbl: "مصارف وشركات مالية", orgs: [{ n: "STC Bank", e: "مصرفي رقمي", c: "#6A1F7A" }, { n: "بنك الإنماء", e: "Alinma Bank", c: "#004B8D" }, { n: "بنك الرياض", e: "Riyad Bank", c: "#003087" }, { n: "SIDF", e: "صندوق التنمية الصناعية", c: "#00843D" }] },
            { lbl: "شركات فنتك وتقنية", orgs: [{ n: "تمارا", e: "Tamara", c: "#D4521A" }, { n: "Tabby", e: "BNPL", c: "#0F9B8E" }, { n: "Barq", e: "مدفوعات", c: "#333" }, { n: "Urpay", e: "محفظة رقمية", c: "#6B3FA0" }, { n: "EY", e: "Ernst & Young", c: "#B8960C", dark: true }, { n: "PwC", e: "PricewaterhouseCoopers", c: "#E0301E" }] },
          ].map(tier => (
            <div key={tier.lbl} className="org-tier">
              <div className="org-tier-lbl">{tier.lbl}</div>
              <div className="org-row">
                {tier.orgs.map(o => (
                  <div key={o.n} className="org-chip" style={(o as any).dark ? { background: "#2E2E38", borderColor: "#2E2E38" } : {}}>
                    <div className="org-dot" style={{ background: o.c }} />
                    <div>
                      <div className="org-ar" style={{ color: (o as any).dark ? o.c : o.c }}>{o.n}</div>
                      <div className="org-en" style={(o as any).dark ? { color: "rgba(255,255,255,.4)" } : {}}>{o.e}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* LOBBY */}
      <div className="lobby-sec">
        <div className="lobby-bg"/>
        <div className="lobby-content">
          <div className="lobby-lbl">موقع الفعالية</div>
          <div className="lobby-title">بهو جامعة الإمام محمد بن سعود الإسلامية<br/><em>الرياض · 5–6 مايو 2026</em></div>
        </div>
      </div>

      {/* FAQ */}
      <section className="sec sec-light" id="faq">
        <div className="wrap">
          <Rev>
            <div style={{ textAlign: "center", marginBottom: 8 }}>
              <div className="lbl" style={{ justifyContent: "center", color: "var(--green)" }}>أسئلة شائعة</div>
              <h2 className="h2" style={{ textAlign: "center" }}>ما يسألنا عنه <em>الجهات</em></h2>
            </div>
          </Rev>
          <div className="faq-list" style={{ maxWidth: 780, margin: "0 auto" }}>
            {[
              { q: "هل المشاركة مجانية تماماً؟", a: "نعم، المشاركة مجانية بالكامل — سواء البوث الخاص أو البوث المقدَّم المُجهَّز بشعارك." },
              { q: "ما الفرق بين البوث الخاص والمقدَّم؟", a: "البوث الخاص: تُحضر تصميمك الكامل ونوفر لك المساحة والخدمات. البوث المقدَّم: نُجهَّزه بالكامل بشعارك وألوانك مع طاولة وشاشة وإنترنت وإضاءة." },
              { q: "ما الجمهور المتوقع للفعالية؟", a: "أكثر من 3000 طالب وطالبة من جامعات الرياض المهتمين بالتقنية المالية، يبحثون عن فرص تدريب تعاوني." },
              { q: "ما الموعد النهائي للتسجيل؟", a: "يُفضل التسجيل قبل شهر من الفعالية لضمان إدراج شعارك في جميع المواد وتجهيز البوث." },
              { q: "كيف يسير اجتماع المشاركة؟", a: "30 دقيقة يشرح فيها فريقنا كل التفاصيل ونجيب على أسئلتك قبل اتخاذ القرار النهائي." },
            ].map((q, i) => (
              <div key={i} className={`faq-item${faq === i ? " open" : ""}`}>
                <div className="faq-q" onClick={() => setFaq(faq === i ? null : i)}>{q.q}<span className="faq-icon">+</span></div>
                <div className="faq-a">{q.a}</div>
              </div>
            ))}
          </div>

          {/* MEETING — compact inline strip */}
          <Rev ms={80}>
            <div id="meeting" style={{ maxWidth: 780, margin: "32px auto 0", background: "linear-gradient(120deg,rgba(27,107,82,.18),rgba(13,125,108,.12))", border: "1px solid rgba(61,170,134,.2)", borderRadius: 14, padding: "18px 22px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{ fontSize: "1.5rem" }}>📅</div>
                <div>
                  <div style={{ fontFamily: "'Cairo',sans-serif", fontWeight: 800, fontSize: ".95rem", color: "#fff" }}>تريد مناقشة التفاصيل أولاً؟</div>
                  <div style={{ fontSize: ".72rem", color: "rgba(255,255,255,.45)", marginTop: 2 }}>30 دقيقة زووم أو حضورياً — نشرح كل شيء قبل تسجيلك</div>
                </div>
              </div>
              <a href={WA_MTG} target="_blank" rel="noreferrer" className="btn-wa" style={{ fontSize: ".82rem", padding: "10px 18px", flexShrink: 0 }}><SVGWa/>احجز عبر واتساب</a>
            </div>
          </Rev>
        </div>
      </section>

      {/* CONTACT */}
      <section className="sec sec-darker" id="contact">
        <div className="wrap">
          <div className="ct-grid">
            <Rev>
              <div className="lbl lt">تواصل معنا</div>
              <h2 className="h2 wt">سجّل جهتك<br/>كـ<em>جهة تدريب</em> الآن</h2>
              <p className="ct-sub">الأماكن محدودة وتُخصَّص بحسب الأولوية. سجّل الآن لضمان مشاركة جهتك.</p>
              <div className="ct-cards">
                <div className="ccard"><div className="cc-ico">📧</div><div><div className="cc-lbl">البريد الإلكتروني</div><div className="cc-val"><a href={`mailto:${EMAIL}`}>{EMAIL}</a></div></div></div>
                <div className="ccard"><div className="cc-ico">📞</div><div><div className="cc-lbl">قائد العلاقات العامة</div><div className="cc-val"><a href="tel:+966534831944" style={{ color: "var(--glt)" }}>0534831944</a></div></div></div>
                <div className="ccard"><div className="cc-ico">🏫</div><div><div className="cc-lbl">الجهة المنظِّمة</div><div className="cc-val">نادي TechNation × نادي المالية الطلابي</div></div></div>
                <div className="ccard"><div className="cc-ico">📅</div><div><div className="cc-lbl">الفعالية</div><div className="cc-val">5–6 مايو 2026 · بهو جامعة الإمام · الرياض</div></div></div>
              </div>
            </Rev>

            <Rev ms={100}>
              <div className="form-box" style={{ background: "rgba(255,255,255,.03)", border: "1px solid rgba(61,170,134,.15)", borderRadius: 20, padding: "32px 28px" }}>
                {/* Header */}
                <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:28 }}>
                  <div style={{ width:44, height:44, background:"linear-gradient(135deg,#1B6B52,#3DAA86)", borderRadius:12, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"1.3rem", flexShrink:0 }}>🎓</div>
                  <div>
                    <div style={{ fontFamily:"'Cairo',sans-serif", fontSize:"1rem", fontWeight:900, color:"#fff", lineHeight:1.2 }}>سجّل جهتك الآن</div>
                    <div style={{ fontSize:".7rem", color:"rgba(255,255,255,.35)", marginTop:2 }}>مجاني · يتواصل معك الفريق خلال 24 ساعة</div>
                  </div>
                </div>

                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0 12px" }}>
                  <div className="fg">
                    <label>🏢 اسم الجهة <span style={{ color:"#f87171" }}>*</span></label>
                    <input type="text" placeholder="اسم المؤسسة" value={f.org} onChange={e => upd("org",e.target.value)}/>
                  </div>
                  <div className="fg">
                    <label>👤 اسم المسؤول <span style={{ color:"#f87171" }}>*</span></label>
                    <input type="text" placeholder="الاسم الكامل" value={f.name} onChange={e => upd("name",e.target.value)}/>
                  </div>
                </div>

                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0 12px" }}>
                  <div className="fg">
                    <label>📞 الجوال / واتساب</label>
                    <input type="tel" placeholder="05xxxxxxxx" style={{ direction:"ltr" }} value={f.phone} onChange={e => upd("phone",e.target.value)}/>
                  </div>
                  <div className="fg">
                    <label>📧 البريد الإلكتروني <span style={{ color:"#f87171" }}>*</span></label>
                    <input type="email" placeholder="your@email.com" style={{ direction:"ltr" }} value={f.email} onChange={e => upd("email",e.target.value)}/>
                  </div>
                </div>

                <div style={{ marginBottom:16 }}>
                  <label style={{ display:"block", fontSize:".7rem", color:"rgba(255,255,255,.34)", marginBottom:8, fontWeight:600 }}>🏗️ كيف تريد تواجدك؟</label>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
                    {([
                      { k:"own", icon:"🏗️", t:"بوثي الخاص", d:"أحضر تصميمك" },
                      { k:"provided", icon:"✨", t:"بوث مقدَّم", d:"مجهَّز بهويتك" },
                    ] as const).map(opt => (
                      <div key={opt.k} onClick={() => setBooth(opt.k)}
                        style={{ cursor:"pointer", padding:"14px 12px", borderRadius:12, border:`2px solid ${booth===opt.k?"#3DAA86":"rgba(255,255,255,.1)"}`, background: booth===opt.k ? "rgba(61,170,134,.1)" : "rgba(255,255,255,.03)", transition:"all .22s", textAlign:"center" }}>
                        <div style={{ fontSize:"1.4rem", marginBottom:4 }}>{opt.icon}</div>
                        <div style={{ fontFamily:"'Cairo',sans-serif", fontSize:".85rem", fontWeight:800, color: booth===opt.k ? "#3DAA86":"#fff", lineHeight:1.2 }}>{opt.t}</div>
                        <div style={{ fontSize:".68rem", color:"rgba(255,255,255,.38)", marginTop:2 }}>{opt.d}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="fg">
                  <label>💬 ملاحظات (اختياري)</label>
                  <textarea placeholder="أي تفاصيل تودّ مشاركتها..." value={f.notes} onChange={e => upd("notes",e.target.value)} style={{ minHeight:60 }}/>
                </div>

                {err && <p style={{ color:"#f87171", fontSize:".78rem", marginBottom:8, textAlign:"center" }}>{err}</p>}
                <button className="form-btn" onClick={send} disabled={busy}
                  style={{ marginTop:4, display:"flex", alignItems:"center", justifyContent:"center", gap:8 }}>
                  {busy ? "جاري الإرسال…" : <><span>إرسال الطلب</span><span style={{ opacity:.6, fontSize:".82rem" }}>← مجاناً</span></>}
                </button>
              </div>
            </Rev>
          </div>
        </div>
      </section>

      {/* THANK YOU */}
      <div className={`ty-overlay${done ? " open" : ""}`}>
        <div className="ty-box">
          <div style={{ fontSize: "2.5rem", marginBottom: 16 }}>🎉</div>
          <h3 style={{ fontFamily: "'Cairo',sans-serif", fontSize: "1.4rem", fontWeight: 900, color: "#fff", marginBottom: 10 }}>تم إرسال طلبك بنجاح!</h3>
          <p style={{ fontSize: ".88rem", color: "rgba(255,255,255,.55)", lineHeight: 1.8, marginBottom: 22 }}>سيتواصل معك فريق روافد فنتك خلال 24 ساعة. يمكنك التواصل المباشر عبر واتساب لتسريع الإجراءات.</p>
          <a href={WA} target="_blank" rel="noreferrer" className="btn-wa" style={{ display: "inline-flex", margin: "0 auto 14px" }}><SVGWa/>تواصل عبر واتساب</a><br/>
          <button onClick={() => setDone(false)} style={{ background: "transparent", border: "1px solid rgba(255,255,255,.15)", color: "rgba(255,255,255,.5)", padding: "8px 20px", borderRadius: 7, cursor: "pointer", fontFamily: "'Tajawal',sans-serif", fontSize: ".85rem" }}>إغلاق</button>
        </div>
      </div>

      {/* FOOTER */}
      <footer>
        <div className="fi">
          <div className="fb">روافد فنتك <span>التدريب التعاوني · 2026</span></div>
          <div className="fc">© 2026 جميع الحقوق محفوظة</div>
          <div><div className="fo-n">جامعة الإمام محمد بن سعود الإسلامية</div><div className="fo-s">نادي TechNation · نادي المالية الطلابي</div></div>
        </div>
      </footer>

      {/* WA FIXED */}
      <a className="wa-btn" href={WA} target="_blank" rel="noreferrer" title="تواصل عبر واتساب">
        <svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zm-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884zm8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>
      </a>
    </div>
  );
}
