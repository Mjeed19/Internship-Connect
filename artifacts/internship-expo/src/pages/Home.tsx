import { useState, useEffect, useRef } from "react";

const WA_LINK = "https://wa.me/966534831944?text=%D8%A3%D9%88%D8%AF%20%D8%A7%D9%84%D8%AA%D8%B3%D8%AC%D9%8A%D9%84%20%D9%81%D9%8A%20%D9%85%D8%B9%D8%B1%D8%B6%20%D8%B1%D9%88%D8%A7%D9%81%D8%AF%20%D9%81%D9%86%D8%AA%D9%83%202026";
const WA_MEETING = "https://wa.me/966534831944?text=%D8%A3%D9%88%D8%AF%20%D8%AD%D8%AC%D8%B2%20%D8%A7%D8%AC%D8%AA%D9%85%D8%A7%D8%B9%20%D9%84%D9%85%D9%86%D8%A7%D9%82%D8%B4%D8%A9%20%D8%A7%D9%84%D9%85%D8%B4%D8%A7%D8%B1%D9%83%D8%A9%20%D9%81%D9%8A%20%D9%85%D8%B9%D8%B1%D8%B6%20%D8%B1%D9%88%D8%A7%D9%81%D8%AF%20%D9%81%D9%86%D8%AA%D9%83%202026";
const EMAIL = "pr.technationclub@gmail.com";
const FORMSPREE = "https://formspree.io/f/mnndorva";

const SVGWA = ({ size = 20 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" style={{ width: size, height: size, fill: "#fff", flexShrink: 0 }}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zm-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884zm8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
  </svg>
);

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setTimeout(() => el.classList.add("visible"), delay); },
      { threshold: .05, rootMargin: "0px 0px -10px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return <div ref={ref} className={`reveal-sec ${className}`}>{children}</div>;
}

export default function Home() {
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const [boothChoice, setBoothChoice] = useState<"own" | "provided" | "">("");
  const [form, setForm] = useState({ org: "", name: "", phone: "", email: "", sector: "", count: "", notes: "" });
  const [sending, setSending] = useState(false);
  const [showTY, setShowTY] = useState(false);
  const [btnErr, setBtnErr] = useState("");

  const setF = (k: string, v: string) => setForm(p => ({ ...p, [k]: v }));

  const submitForm = async () => {
    if (!form.org || !form.name || !form.email) {
      setBtnErr("يرجى تعبئة جميع الحقول المطلوبة");
      return;
    }
    setBtnErr(""); setSending(true);
    try {
      const r = await fetch(FORMSPREE, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          الجهة: form.org, المسؤول: form.name, البريد: form.email,
          الجوال: form.phone, القطاع: form.sector,
          "العدد المتوقع للمتدربين": form.count,
          "خيار البوث": boothChoice === "own" ? "بوث خاص" : boothChoice === "provided" ? "بوث مقدَّم" : "لم يُحدَّد",
          ملاحظات: form.notes,
          _subject: `طلب مشاركة تدريب تعاوني — روافد فنتك 2026 — ${form.org}`
        }),
      });
      const d = await r.json();
      if (d.ok || d.next) {
        setShowTY(true);
        setForm({ org: "", name: "", phone: "", email: "", sector: "", count: "", notes: "" });
        setBoothChoice("");
      } else { setBtnErr("حدث خطأ — تواصل عبر واتساب"); }
    } catch { setBtnErr("تواصل عبر واتساب مباشرة"); }
    setSending(false);
  };

  return (
    <div dir="rtl">

      {/* ══════════ NAV ══════════ */}
      <nav>
        <div className="n-logo">
          <div className="n-icon">🎓</div>
          <div>
            <div className="n-brand">معرض <span className="n-brand-accent">روافد فنتك</span></div>
            <div className="n-sub">التدريب التعاوني · 2026</div>
          </div>
        </div>
        <ul className="n-links">
          <li><a href="#why">لماذا تشارك؟</a></li>
          <li><a href="#booth">خيارات البوث</a></li>
          <li><a href="#benefits">المزايا</a></li>
          <li><a href="#orgs">الجهات</a></li>
          <li><a href="#faq">FAQ</a></li>
          <li><a href="#contact" className="n-cta">سجّل الآن</a></li>
        </ul>
        <a href="#contact" className="n-btn">سجّل جهتك</a>
      </nav>

      {/* ══════════ HERO ══════════ */}
      <section className="hero">
        <div className="h-mesh" />
        <div className="h-grid-bg" />
        <div className="orb-a" /><div className="orb-b" />
        <div className="h-corner tl"><svg width="42" height="42" viewBox="0 0 42 42" fill="none"><path d="M42 0H0V42" stroke="#3DAA86" strokeWidth="1.4"/><circle cx="0" cy="0" r="3" fill="#3DAA86"/></svg></div>
        <div className="h-corner tr"><svg width="42" height="42" viewBox="0 0 42 42" fill="none"><path d="M42 0H0V42" stroke="#3DAA86" strokeWidth="1.4"/><circle cx="0" cy="0" r="3" fill="#3DAA86"/></svg></div>
        <div className="h-corner bl"><svg width="42" height="42" viewBox="0 0 42 42" fill="none"><path d="M42 0H0V42" stroke="#3DAA86" strokeWidth="1.4"/><circle cx="0" cy="0" r="3" fill="#3DAA86"/></svg></div>
        <div className="h-corner br"><svg width="42" height="42" viewBox="0 0 42 42" fill="none"><path d="M42 0H0V42" stroke="#3DAA86" strokeWidth="1.4"/><circle cx="0" cy="0" r="3" fill="#3DAA86"/></svg></div>
        <div className="h-glow" />
        <div className="h-content">
          <div className="h-pill animate-fu"><span className="dot-live" />فرصة تدريب تعاوني · 2026</div>
          <h1 className="h-title animate-fu-1">
            <span className="sub">معرض</span>
            <span className="grad-text">روافد فنتك</span>
          </h1>
          <div className="h-nums animate-fu-2">
            <div className="hn"><div className="hn-n">+3000</div><div className="hn-l">طالب يزور المعرض</div></div>
            <div className="hn"><div className="hn-n">يومان</div><div className="hn-l">تواجد كامل</div></div>
            <div className="hn"><div className="hn-n">+20</div><div className="hn-l">جهة مشاركة</div></div>
          </div>
          <div className="h-date animate-fu-3">
            <div className="hd"><div className="hd-v">5–6 مايو 2026</div><div className="hd-l">التاريخ</div></div>
            <div className="hd"><div className="hd-v">12:00 – 8:30 م</div><div className="hd-l">الوقت</div></div>
            <div className="hd"><div className="hd-v">بهو جامعة الإمام</div><div className="hd-l">الرياض</div></div>
          </div>
          <div className="h-btns animate-fu-4">
            <a href="#contact" className="btn-p">سجّل جهتك الآن — مجاناً</a>
            <a href="#why" className="btn-s">تعرف على المعرض</a>
          </div>
        </div>
        <div className="h-scroll"><div className="scroll-line" /></div>
      </section>

      {/* ══════════ REACH BAR ══════════ */}
      <div className="reach2">
        <div className="rb2"><div className="rb2-n">+3000</div><div className="rb2-l">طالب وطالبة متوقع</div></div>
        <div className="rb2"><div className="rb2-n">جامعات الرياض</div><div className="rb2-l">الجمهور المستهدف</div></div>
        <div className="rb2"><div className="rb2-n">+20</div><div className="rb2-l">جهة تدريب مشاركة</div></div>
        <div className="rb2"><div className="rb2-n">مجانيٌّ</div><div className="rb2-l">تسجيل الجهات التدريبية</div></div>
      </div>

      {/* ══════════ WHY ══════════ */}
      <section className="sec sec-light" id="why">
        <div className="wrap">
          <Reveal>
            <div className="lbl" style={{ color: "var(--green)" }}>لماذا تشارك؟</div>
            <h2 className="h2">ما الذي <em>تكسبه</em> جهتك؟</h2>
            <p className="sec-sub" style={{ maxWidth: 580 }}>معرض روافد فنتك هو الجسر المباشر بين مؤسستك وأكثر من 3000 طالب وطالبة باحثين عن فرصة تدريب تعاوني حقيقي.</p>
          </Reveal>
          <div className="why-grid">
            {[
              { i: "🎯", t: "وصول مباشر لآلاف الطلبة", d: "تواجد مباشر أمام أكثر من 3000 طالب وطالبة من كبرى جامعات الرياض المهتمين بالتقنية المالية — كلهم يبحثون عن فرصة تدريب." },
              { i: "🔍", t: "اكتشاف الكفاءات المناسبة", d: "تحدّث مع المتقدمين وجهاً لوجه، راجع ملفاتهم ومهاراتهم وقيّمهم مباشرةً قبل اتخاذ قرار القبول." },
              { i: "🏢", t: "تعزيز حضور مؤسستك", d: "عرّف بثقافة شركتك وبيئة العمل وبرامج التدريب أمام جيل كامل من الكفاءات الجامعية بشكل مباشر وفعّال." },
              { i: "📣", t: "حضور إعلامي موثَّق", d: "ذكر اسم جهتك في جميع منشورات المعرض الرسمية قبل الفعالية وخلالها وبعدها على كافة المنصات." },
              { i: "📊", t: "بيانات المتقدمين", d: "احصل على بيانات الطلاب المهتمين بموافقتهم الصريحة لمتابعة عملية الاختيار بعد انتهاء المعرض." },
              { i: "🤝", t: "شبكة علاقات مؤسسية", d: "تواصل مع جهات تدريبية أخرى من القطاع المالي والتقني السعودي في بيئة أكاديمية رسمية ومنظمة." },
            ].map((w, i) => (
              <Reveal key={w.t} delay={i * 60} className="wc">
                <span className="wc-i">{w.i}</span>
                <div className="wc-t">{w.t}</div>
                <div className="wc-d">{w.d}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ BOOTH OPTIONS ══════════ */}
      <section className="sec sec-dark" id="booth">
        <div className="wrap">
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <div className="lbl lt" style={{ justifyContent: "center" }}>خيارات المشاركة</div>
              <h2 className="h2 wt" style={{ textAlign: "center" }}>اختر طريقة <em>تواجدك</em></h2>
              <p style={{ color: "rgba(255,255,255,.45)", fontSize: ".88rem", marginTop: 10, maxWidth: 560, margin: "10px auto 0" }}>
                نوفر لك مرونة كاملة — أحضر تصميمك الخاص أو استفد من بوثنا الجاهز المجهَّز بهويتك البصرية.
              </p>
            </div>
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
            {/* OWN BOOTH */}
            <Reveal delay={0}>
              <div style={{ background: "var(--surf)", borderRadius: 16, overflow: "hidden", border: "2px solid var(--b1)", transition: "all .3s" }}
                onMouseOver={e => { e.currentTarget.style.borderColor = "var(--green)"; e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 36px rgba(27,107,82,.15)"; }}
                onMouseOut={e => { e.currentTarget.style.borderColor = "var(--b1)"; e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}>
                <div style={{ background: "linear-gradient(135deg,#1B6B52,#2A8A6A)", padding: "22px 26px 20px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 8 }}>
                    <div style={{ width: 52, height: 52, background: "rgba(255,255,255,.15)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.6rem", flexShrink: 0 }}>🏗️</div>
                    <div>
                      <div style={{ fontFamily: "'Cairo',sans-serif", fontSize: "1.25rem", fontWeight: 900, color: "#fff", lineHeight: 1.15 }}>البوث الخاص</div>
                      <div style={{ fontSize: ".72rem", color: "rgba(255,255,255,.7)", marginTop: 2 }}>Bring Your Own Booth</div>
                    </div>
                  </div>
                  <p style={{ fontSize: ".82rem", color: "rgba(255,255,255,.7)", lineHeight: 1.8, margin: 0 }}>
                    لديك هوية بصرية قوية وتصميم خاص؟ أحضر بوثك كاملاً مع جميع تجهيزاتك ومواد التدريب الخاصة بك.
                  </p>
                </div>
                <div style={{ padding: "22px 26px" }}>
                  <div style={{ fontFamily: "'Cairo',sans-serif", fontSize: ".82rem", fontWeight: 800, color: "var(--ink)", marginBottom: 14 }}>ما يُوفَّر لك</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {[
                      ["📐", "مساحة مخصصة تناسب تصميمك", "تُحدَّد الأبعاد حسب الطلب"],
                      ["⚡", "طاقم الكهرباء والخدمات", "متوفر طوال فترة المعرض"],
                      ["🗺️", "لوحات الإرشاد وتحديد الموقع", "ضمن خريطة المعرض الرسمية"],
                      ["🔒", "أمن الجناح وحمايته", "طاقم أمن متخصص"],
                      ["📣", "ذكرك في المواد الإعلانية", "على جميع منصات المعرض"],
                    ].map(([ic, t, d]) => (
                      <div key={t} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                        <span style={{ width: 32, height: 32, background: "rgba(27,107,82,.08)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: ".95rem", flexShrink: 0 }}>{ic}</span>
                        <div>
                          <div style={{ fontSize: ".83rem", fontWeight: 700, color: "var(--ink)", fontFamily: "'Cairo',sans-serif" }}>{t}</div>
                          <div style={{ fontSize: ".72rem", color: "var(--muted-c)", marginTop: 1 }}>{d}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div style={{ marginTop: 18, padding: "11px 14px", background: "rgba(27,107,82,.06)", border: "1.5px dashed rgba(27,107,82,.25)", borderRadius: 9, fontSize: ".8rem", color: "var(--green)", fontWeight: 700, textAlign: "center" }}>
                    الأنسب للجهات ذات الهوية البصرية المميزة
                  </div>
                </div>
              </div>
            </Reveal>

            {/* PROVIDED BOOTH */}
            <Reveal delay={120}>
              <div style={{ background: "var(--surf)", borderRadius: 16, overflow: "hidden", border: "2px solid var(--b1)", transition: "all .3s" }}
                onMouseOver={e => { e.currentTarget.style.borderColor = "var(--teal)"; e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 36px rgba(13,125,108,.15)"; }}
                onMouseOut={e => { e.currentTarget.style.borderColor = "var(--b1)"; e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}>
                <div style={{ background: "linear-gradient(135deg,#0D7D6C,#1A9E8A)", padding: "22px 26px 20px" }}>
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 10, marginBottom: 8 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                      <div style={{ width: 52, height: 52, background: "rgba(255,255,255,.15)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.6rem", flexShrink: 0 }}>✨</div>
                      <div>
                        <div style={{ fontFamily: "'Cairo',sans-serif", fontSize: "1.25rem", fontWeight: 900, color: "#fff", lineHeight: 1.15 }}>البوث المقدَّم</div>
                        <div style={{ fontSize: ".72rem", color: "rgba(255,255,255,.7)", marginTop: 2 }}>Provided Booth</div>
                      </div>
                    </div>
                    <span style={{ background: "rgba(255,255,255,.2)", border: "1px solid rgba(255,255,255,.3)", color: "#fff", fontSize: ".6rem", fontWeight: 800, padding: "4px 10px", borderRadius: 100, letterSpacing: 1, whiteSpace: "nowrap", flexShrink: 0 }}>الأكثر طلباً</span>
                  </div>
                  <p style={{ fontSize: ".82rem", color: "rgba(255,255,255,.7)", lineHeight: 1.8, margin: 0 }}>
                    ركّز على استقطاب المتدربين فقط — نتكفّل بكل شيء. بوث احترافي مُجهَّز بالكامل بشعار وألوان مؤسستك.
                  </p>
                </div>
                <div style={{ padding: "22px 26px" }}>
                  <div style={{ fontFamily: "'Cairo',sans-serif", fontSize: ".82rem", fontWeight: 800, color: "var(--ink)", marginBottom: 14 }}>كل هذا مُجهَّز لك</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {[
                      ["🖼️", "بوث بتصميم احترافي", "مُخصَّص بشعارك وألوانك الرسمية"],
                      ["🖥️", "طاولة وكراسي وشاشة عرض", "مقاس 55 بوصة لعرض محتواكم"],
                      ["📶", "إنترنت مخصص وكهرباء", "اتصال مستقر طوال اليومين"],
                      ["💡", "إضاءة احترافية للجناح", "إضاءة LED موجّهة للبوث"],
                      ["🛠️", "فريق دعم مخصص", "يساعدك قبل وخلال وبعد المعرض"],
                    ].map(([ic, t, d]) => (
                      <div key={t} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                        <span style={{ width: 32, height: 32, background: "rgba(13,125,108,.08)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: ".95rem", flexShrink: 0 }}>{ic}</span>
                        <div>
                          <div style={{ fontSize: ".83rem", fontWeight: 700, color: "var(--ink)", fontFamily: "'Cairo',sans-serif" }}>{t}</div>
                          <div style={{ fontSize: ".72rem", color: "var(--muted-c)", marginTop: 1 }}>{d}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div style={{ marginTop: 18, padding: "11px 14px", background: "rgba(13,125,108,.06)", border: "1.5px dashed rgba(13,125,108,.3)", borderRadius: 9, fontSize: ".8rem", color: "var(--teal)", fontWeight: 700, textAlign: "center" }}>
                    الأنسب للجهات التي تريد راحة لوجستية تامة
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Comparison note */}
          <Reveal delay={200}>
            <div style={{ marginTop: 24, background: "rgba(61,170,134,.06)", border: "1px solid rgba(61,170,134,.18)", borderRadius: 12, padding: "18px 24px", textAlign: "center" }}>
              <p style={{ color: "rgba(255,255,255,.6)", fontSize: ".84rem", lineHeight: 1.8, margin: 0 }}>
                <span style={{ color: "var(--glt)", fontWeight: 700 }}>كلا الخيارين مجانيان </span>
                للجهات التدريبية المشاركة — اختر ما يناسب مؤسستك وحدّده في نموذج التسجيل أدناه.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════ WHAT TO EXPECT ══════════ */}
      <section className="sec sec-tinted" id="expect">
        <div className="wrap">
          <Reveal>
            <div className="lbl" style={{ color: "var(--green)" }}>يوم المعرض</div>
            <h2 className="h2">ماذا يحدث <em>خلال المعرض</em>؟</h2>
            <p className="sec-sub" style={{ maxWidth: 560 }}>يومان مكثفان مليئان بالتواصل المباشر والفرص الحقيقية لاكتشاف المواهب الجامعية.</p>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14, marginTop: 38 }}>
            {[
              { n: "01", i: "🚶", t: "تدفق الزوار المستمر", d: "يتنقل الطلاب من بوث لآخر يتعرفون على الجهات المتاحة ويسجلون اهتمامهم بالتدريب التعاوني." },
              { n: "02", i: "💬", t: "محادثات مباشرة", d: "ممثلو جهتك يتحدثون مع الطلاب وجهاً لوجه، يشرحون برامج التدريب، ويجيبون على الأسئلة." },
              { n: "03", i: "📄", t: "استقبال السير الذاتية", d: "يقدم الطلاب سيرهم الذاتية والمعلوماتهم مباشرةً لفريق جهتك لاختيار الأنسب." },
              { n: "04", i: "🎙️", t: "جلسات على المسرح", d: "فرصة للتحدث عن برنامج التدريب التعاوني في شركتك أمام جمهور واسع في الجلسات العامة." },
              { n: "05", i: "🌐", t: "تواصل مع الجهات الأخرى", d: "التقِ بممثلي جهات تدريبية أخرى من القطاع المالي والتقني وابنِ شبكة علاقات مؤسسية متينة." },
              { n: "06", i: "🏆", t: "حفل الختام والتكريم", d: "في نهاية المعرض تُكرَّم جميع الجهات المشاركة بدرع رسمي على المسرح الرئيسي أمام الحضور." },
            ].map((f, i) => (
              <Reveal key={f.n} delay={i * 50}>
                <div className="wc" style={{ height: "100%" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                    <span style={{ fontFamily: "'Cairo',sans-serif", fontSize: ".6rem", fontWeight: 800, letterSpacing: 2, color: "var(--glt)", opacity: .7 }}>{f.n}</span>
                    <span style={{ fontSize: "1.4rem" }}>{f.i}</span>
                  </div>
                  <div className="wc-t">{f.t}</div>
                  <div className="wc-d">{f.d}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ 10 BENEFITS ══════════ */}
      <section className="features-sec" id="benefits">
        <div className="wrap">
          <Reveal>
            <div style={{ textAlign: "center" }}>
              <div className="lbl lt" style={{ justifyContent: "center" }}>ماذا تحصل كجهة تدريب؟</div>
              <h2 className="h2 wt" style={{ textAlign: "center" }}>10 مزايا <em>مضمونة</em> لكل جهة مشاركة</h2>
              <p style={{ color: "rgba(255,255,255,.42)", fontSize: ".85rem", marginTop: 8, textAlign: "center" }}>كل ميزة مصممة لتعظيم استفادتك من يومَي المعرض وما بعدهما</p>
            </div>
          </Reveal>
          <div className="feat-grid">
            {[
              { n: "01", i: "📣", t: "إعلان في كل منشور", d: "ذكر اسمك في كل منشور رسمي قبل الفعالية وخلالها وبعدها" },
              { n: "02", i: "🌐", t: "ظهور على الموقع الرسمي", d: "شعارك وبيانات برنامجك التدريبي على الموقع الرسمي للمعرض" },
              { n: "03", i: "🎓", t: "استقطاب مباشر للمتدربين", d: "وصول مباشر لأكثر من 3000 طالب يبحثون عن تدريب" },
              { n: "04", i: "📸", t: "تغطية مصورة احترافية", d: "صور ومقاطع فيديو لجناحك وفريقك للاستخدام في حملاتكم" },
              { n: "05", i: "🏆", t: "درع تكريمي رسمي", d: "تسليم رسمي على المسرح في حفل الختام مع توثيق ونشر" },
              { n: "06", i: "📊", t: "تقرير بعد الفعالية", d: "إحصائيات الحضور والتفاعل لقياس نتائج مشاركتك" },
              { n: "07", i: "🤝", t: "شبكة العلاقات المؤسسية", d: "تواصل مع جهات القطاع المالي والتقني في بيئة أكاديمية" },
              { n: "08", i: "📱", t: "ريلز مقصوص باسمك", d: "مقطع قصير احترافي يُنشر على حسابات المعرض الرسمية" },
              { n: "09", i: "🏷️", t: 'ختم "شريك تدريب رسمي"', d: "شارة رقمية رسمية لاستخدامها في موادك وحساباتك" },
              { n: "10", i: "🎯", t: "إدراج في كتيب المعرض", d: "صفحة خاصة بجهتك وبرنامجها التدريبي في الكتيّب الرسمي" },
            ].map((f, i) => (
              <Reveal key={f.n} delay={i * 50}>
                <div className="feat-card">
                  <span className="feat-num">{f.n}</span>
                  <span className="feat-icon">{f.i}</span>
                  <div className="feat-title">{f.t}</div>
                  <div className="feat-desc">{f.d}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ WHO ATTENDS ══════════ */}
      <section className="sec sec-light">
        <div className="wrap">
          <Reveal>
            <div className="lbl" style={{ color: "var(--green)" }}>من يحضر المعرض؟</div>
            <h2 className="h2">طلاب <em>متحمسون</em> يبحثون عنك</h2>
            <p className="sec-sub" style={{ maxWidth: 580 }}>يستهدف المعرض طلاب وطالبات الجامعات من تخصصات متعددة، كلهم يبحثون عن فرصة تدريب تعاوني حقيقية في بيئة مهنية.</p>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 13, marginTop: 38 }}>
            {[
              { i: "💻", t: "علوم الحاسب والبرمجة", d: "مطورون وأخصائيو تقنية المعلومات" },
              { i: "📊", t: "إدارة الأعمال والتسويق", d: "مهتمون بريادة الأعمال والإدارة" },
              { i: "💰", t: "المالية والمصرفية", d: "طلاب تمويل ومحاسبة واقتصاد" },
              { i: "📈", t: "إدارة المخاطر والتأمين", d: "متخصصو ضبط المخاطر والامتثال" },
              { i: "🎨", t: "تصميم تجربة المستخدم", d: "مصممو UX/UI ومنتجات رقمية" },
              { i: "📋", t: "الموارد البشرية", d: "أخصائيو إدارة المواهب والتطوير" },
              { i: "⚗️", t: "العلوم وتقنية البيانات", d: "محللو بيانات وذكاء اصطناعي" },
              { i: "⚙️", t: "الهندسة الصناعية والنظم", d: "مهندسون في تحسين العمليات" },
            ].map((c, i) => (
              <Reveal key={c.t} delay={i * 50}>
                <div style={{ background: "var(--surf)", border: "1px solid var(--b1)", borderRadius: 12, padding: "20px 16px", textAlign: "center", transition: "all .3s cubic-bezier(.22,.68,0,1.2)" }}
                  onMouseOver={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 8px 22px rgba(27,107,82,.09)"; e.currentTarget.style.borderColor = "var(--b2)"; }}
                  onMouseOut={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = "var(--b1)"; }}>
                  <span style={{ fontSize: "1.7rem", display: "block", marginBottom: 10 }}>{c.i}</span>
                  <div style={{ fontFamily: "'Cairo',sans-serif", fontSize: ".88rem", fontWeight: 800, color: "var(--ink)", marginBottom: 5, lineHeight: 1.3 }}>{c.t}</div>
                  <div style={{ fontSize: ".72rem", color: "var(--muted-c)", lineHeight: 1.7 }}>{c.d}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ ORGS ══════════ */}
      <section className="sec sec-tinted" id="orgs">
        <div className="wrap">
          <Reveal>
            <div style={{ textAlign: "center" }}>
              <div className="lbl" style={{ justifyContent: "center", color: "var(--green)" }}>الجهات المتوقعة</div>
              <h2 className="h2" style={{ textAlign: "center" }}>ستكون جانب <em>هؤلاء</em></h2>
              <p className="sec-sub" style={{ textAlign: "center" }}>منظمات وشركات من صميم القطاع المالي والتقني السعودي</p>
            </div>
          </Reveal>

          <div className="org-tier">
            <div className="org-tier-lbl">جهات حكومية وتنظيمية</div>
            <div className="org-row">
              <div className="org-chip"><div className="org-dot" style={{ background: "#00703c" }} /><div><div className="org-ar" style={{ color: "#00703c" }}>البنك المركزي السعودي</div><div className="org-en">SAMA</div></div></div>
              <div className="org-chip"><div className="org-dot" style={{ background: "#1B4F9A" }} /><div><div className="org-ar" style={{ color: "#1B4F9A" }}>SDAIA</div><div className="org-en">هيئة البيانات والذكاء الاصطناعي</div></div></div>
              <div className="org-chip"><div className="org-dot" style={{ background: "#006837" }} /><div><div className="org-ar" style={{ color: "#006837" }}>وزارة الاستثمار</div><div className="org-en">Ministry of Investment</div></div></div>
              <div className="org-chip"><div className="org-dot" style={{ background: "#007A53" }} /><div><div className="org-ar" style={{ color: "#007A53" }}>فنتك السعودية</div><div className="org-en">Fintech Saudi</div></div></div>
              <div className="org-chip"><div className="org-dot" style={{ background: "#1E3A5F" }} /><div><div className="org-ar" style={{ color: "#1E3A5F" }}>الأكاديمية المالية</div><div className="org-en">Financial Academy</div></div></div>
            </div>
          </div>

          <div className="org-tier">
            <div className="org-tier-lbl">مصارف وشركات مالية</div>
            <div className="org-row">
              <div className="org-chip"><div className="org-dot" style={{ background: "#6A1F7A" }} /><div><div className="org-ar" style={{ color: "#6A1F7A" }}>STC Bank</div><div className="org-en">مصرفي رقمي</div></div></div>
              <div className="org-chip"><div className="org-dot" style={{ background: "#004B8D" }} /><div><div className="org-ar" style={{ color: "#004B8D" }}>بنك الإنماء</div><div className="org-en">Alinma Bank</div></div></div>
              <div className="org-chip"><div className="org-dot" style={{ background: "#003087" }} /><div><div className="org-ar" style={{ color: "#003087" }}>بنك الرياض</div><div className="org-en">Riyad Bank</div></div></div>
              <div className="org-chip"><div className="org-dot" style={{ background: "#00843D" }} /><div><div className="org-ar" style={{ color: "#00843D" }}>SIDF</div><div className="org-en">صندوق التنمية الصناعية</div></div></div>
            </div>
          </div>

          <div className="org-tier">
            <div className="org-tier-lbl">شركات فنتك</div>
            <div className="org-row">
              <div className="org-chip"><div className="org-dot" style={{ background: "#D4521A" }} /><div><div className="org-ar" style={{ color: "#D4521A" }}>تمارا</div><div className="org-en">Tamara · BNPL</div></div></div>
              <div className="org-chip"><div className="org-dot" style={{ background: "#0F9B8E" }} /><div><div className="org-ar" style={{ color: "#0F9B8E" }}>Tabby</div><div className="org-en">BNPL</div></div></div>
              <div className="org-chip"><div className="org-dot" style={{ background: "#333" }} /><div><div className="org-ar" style={{ color: "#333" }}>Barq</div><div className="org-en" style={{ color: "#555" }}>مدفوعات</div></div></div>
              <div className="org-chip"><div className="org-dot" style={{ background: "#6B3FA0" }} /><div><div className="org-ar" style={{ color: "#6B3FA0" }}>Urpay</div><div className="org-en">محفظة رقمية</div></div></div>
            </div>
          </div>

          <div className="org-tier">
            <div className="org-tier-lbl">شركات استشارات</div>
            <div className="org-row">
              <div className="org-chip" style={{ background: "#2E2E38", borderColor: "#2E2E38" }}>
                <div className="org-dot" style={{ background: "#FFE600" }} />
                <div><div className="org-ar" style={{ color: "#FFE600" }}>EY</div><div className="org-en" style={{ color: "rgba(255,255,255,.4)" }}>Ernst &amp; Young</div></div>
              </div>
              <div className="org-chip"><div className="org-dot" style={{ background: "#E0301E" }} /><div><div className="org-ar" style={{ color: "#E0301E" }}>PwC</div><div className="org-en">PricewaterhouseCoopers</div></div></div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ LOBBY ══════════ */}
      <div className="lobby-sec">
        <div className="lobby-bg" />
        <div className="lobby-content">
          <div className="lobby-lbl">موقع الفعالية</div>
          <div className="lobby-title">
            بهو جامعة الإمام محمد بن سعود الإسلامية<br />
            <em>الرياض · 5–6 مايو 2026</em>
          </div>
        </div>
      </div>

      {/* ══════════ STEPS ══════════ */}
      <section className="sec sec-light">
        <div className="wrap">
          <Reveal>
            <div className="lbl" style={{ color: "var(--green)" }}>خطوات المشاركة</div>
            <h2 className="h2">كيف <em>تشارك</em> جهتك؟</h2>
            <p className="sec-sub" style={{ maxWidth: 560 }}>عملية بسيطة من 4 خطوات — من التسجيل حتى اليوم الأول في المعرض.</p>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, marginTop: 40, position: "relative" }}>
            {[
              { n: "1", i: "📝", t: "التسجيل المبدئي", d: "أكمل نموذج التسجيل أدناه وحدّد خيار البوث المناسب لك." },
              { n: "2", i: "📞", t: "التواصل والتأكيد", d: "يتواصل معك فريقنا خلال 24 ساعة لتأكيد التسجيل ومتابعة التفاصيل." },
              { n: "3", i: "🎨", t: "التجهيز والتنسيق", d: "نرسل لك مواصفات الجناح وتحتاج فقط تزودنا بشعارك ومحتواك." },
              { n: "4", i: "🎉", t: "يوم المعرض", d: "احضر بفريقك وابدأ بالتواصل مع الطلاب الباحثين عن تدريب." },
            ].map((s, i) => (
              <Reveal key={s.n} delay={i * 80}>
                <div style={{ textAlign: "center", padding: "26px 20px", background: "var(--surf)", border: "1px solid var(--b1)", borderRadius: 13, position: "relative", transition: "all .3s" }}
                  onMouseOver={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 8px 20px rgba(27,107,82,.09)"; e.currentTarget.style.borderColor = "var(--b2)"; }}
                  onMouseOut={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = "var(--b1)"; }}>
                  <div style={{ width: 38, height: 38, background: "var(--green)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Cairo',sans-serif", fontWeight: 900, color: "#fff", fontSize: "1rem", margin: "0 auto 14px" }}>{s.n}</div>
                  <span style={{ fontSize: "1.6rem", display: "block", marginBottom: 10 }}>{s.i}</span>
                  <div style={{ fontFamily: "'Cairo',sans-serif", fontSize: ".9rem", fontWeight: 800, color: "var(--ink)", marginBottom: 7 }}>{s.t}</div>
                  <div style={{ fontSize: ".78rem", color: "var(--muted-c)", lineHeight: 1.8 }}>{s.d}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ MEETING CTA ══════════ */}
      <section className="meeting-sec" id="meeting">
        <div className="meeting-inner">
          <Reveal>
            <div className="meeting-badge">📅 احجز اجتماع المشاركة</div>
            <h2 className="meeting-title">نناقش التفاصيل معك<br /><em>في اجتماع مخصص</em></h2>
            <p className="meeting-desc">لا تكتفِ بالنموذج — نسعد بتخصيص 30 دقيقة نشرح فيها آليات التنفيذ، نجيب على أسئلتك، ونناقش أفضل خيار للبوث يناسب مؤسستك وبرامجها التدريبية.</p>
            <div className="meeting-cards">
              <div className="meeting-card"><div className="mc-icon">⏱️</div><div><div className="mc-t">30 دقيقة</div><div className="mc-d">اجتماع مركّز عبر زووم أو حضورياً</div></div></div>
              <div className="meeting-card"><div className="mc-icon">📋</div><div><div className="mc-t">شرح تفصيلي</div><div className="mc-d">آليات التنفيذ ومواعيد التسليم</div></div></div>
              <div className="meeting-card"><div className="mc-icon">✏️</div><div><div className="mc-t">تخصيص التجربة</div><div className="mc-d">نناقش أي متطلبات خاصة لمؤسستك</div></div></div>
            </div>
            <div className="meeting-btns">
              <a className="btn-wa" href={WA_MEETING} target="_blank" rel="noreferrer"><SVGWA />احجز عبر واتساب</a>
              <a className="btn-mail" href={`mailto:${EMAIL}`}>📧 {EMAIL}</a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════ FAQ ══════════ */}
      <section className="sec sec-light" id="faq">
        <div className="wrap">
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: 8 }}>
              <div className="lbl" style={{ justifyContent: "center", color: "var(--green)" }}>أسئلة شائعة</div>
              <h2 className="h2" style={{ textAlign: "center" }}>ما تسأله <em>الجهات التدريبية</em></h2>
            </div>
          </Reveal>
          <div className="faq-list" style={{ maxWidth: 780, margin: "0 auto" }}>
            {[
              { q: "هل المشاركة مجانية تماماً للجهات التدريبية؟", a: "نعم، المشاركة في معرض روافد فنتك مجانية بالكامل لجميع الجهات التدريبية — سواء اخترتم البوث الخاص أو البوث المقدَّم. البوث المقدَّم كذلك مجاني ومجهَّز بالكامل بشعاركم." },
              { q: "ما الفرق بين البوث الخاص والبوث المقدَّم؟", a: "البوث الخاص يعني أنكم تحضرون تصميمكم الكامل ومواد جهتكم، بينما البوث المقدَّم يُجهَّز من قبلنا بالكامل بشعار جهتكم وألوانها، مع طاولة وكراسي وشاشة عرض وإضاءة واتصال بالإنترنت." },
              { q: "كم عدد الطلاب المتوقع حضورهم؟", a: "نتوقع حضور أكثر من 3000 طالب وطالبة من مختلف جامعات الرياض خلال اليومين، وجميعهم مهتمون بالحصول على فرصة تدريب تعاوني في القطاع المالي والتقني." },
              { q: "ما التخصصات الأكثر حضوراً في المعرض؟", a: "يستهدف المعرض طلاب علوم الحاسب، إدارة الأعمال، المالية والمصرفية، الهندسة، تصميم UX، إدارة البيانات، الموارد البشرية، وتخصصات أخرى ذات صلة بالقطاع المالي والتقني." },
              { q: "ما الموعد النهائي للتسجيل؟", a: "يُفضل التسجيل قبل شهر من الفعالية لضمان تجهيز البوث (إن اخترتم البوث المقدَّم) وإدراج شعاركم في جميع المواد المطبوعة والرقمية." },
              { q: "هل يمكننا الاستقطاب المباشر وجمع السير الذاتية في المعرض؟", a: "نعم بالتأكيد — هذا هو الهدف الأساسي من مشاركتكم. يمكن لفريقكم التحدث مع الطلاب، تقييمهم، وجمع ملفاتهم مباشرةً خلال اليومين." },
              { q: "هل يمكننا إجراء مقابلات أو اختبارات داخل الجناح؟", a: "نعم، يمكنكم إجراء محادثات تقييمية مبدئية في جناحكم. لإجراء مقابلات رسمية فيُفضَّل التنسيق مسبقاً مع الفريق المنظم لتوفير مكان مناسب." },
            ].map((faq, i) => (
              <div key={i} className={`faq-item${faqOpen === i ? " open" : ""}`}>
                <div className="faq-q" onClick={() => setFaqOpen(faqOpen === i ? null : i)}>
                  {faq.q}
                  <span className="faq-icon">+</span>
                </div>
                <div className="faq-a">{faq.a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ SUMMARY ══════════ */}
      <section className="sec sec-dark">
        <div className="wrap">
          <Reveal>
            <div style={{ textAlign: "center" }}>
              <div className="lbl lt" style={{ justifyContent: "center" }}>مضمون لجميع الجهات</div>
              <h2 className="h2 wt" style={{ textAlign: "center" }}>كل جهة مشاركة تحصل على <em>هذا</em></h2>
            </div>
          </Reveal>
          <div className="sum-grid">
            {[
              { i: "📣", t: "إعلان في كل منشور", d: "اسمك ولقبك الرسمي في كل إعلان قبل وخلال وبعد الفعالية" },
              { i: "🌐", t: "ظهور على الموقع الرسمي", d: "ظهور ثابت على الموقع الرسمي للمعرض طوال فترة الفعالية" },
              { i: "🖼️", t: "الشعار في جميع المواد", d: "شعار جهتك في البوسترات والدعوات والمطبوعات والشاشات" },
              { i: "🏆", t: "درع وتكريم رسمي", d: "تسليم رسمي في حفل الختام أمام الحضور مع توثيق ونشر" },
            ].map(s => (
              <Reveal key={s.t} className="sc">
                <div className="sc-i">{s.i}</div>
                <div className="sc-t">{s.t}</div>
                <div className="sc-d">{s.d}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ CONTACT ══════════ */}
      <section className="sec sec-darker" id="contact">
        <div className="wrap">
          <div className="ct-grid">
            <Reveal>
              <div className="lbl lt">سجّل جهتك</div>
              <h2 className="h2 wt">احجز مقعدك<br />في المعرض <em>الآن</em></h2>
              <p className="ct-sub">الأماكن محدودة وتُخصَّص بحسب الأولوية. سجّل الآن لضمان مشاركة جهتك.</p>
              <div className="ct-cards">
                <div className="ccard"><div className="cc-ico">📧</div><div><div className="cc-lbl">البريد الإلكتروني</div><div className="cc-val"><a href={`mailto:${EMAIL}`}>{EMAIL}</a></div></div></div>
                <div className="ccard"><div className="cc-ico">📞</div><div><div className="cc-lbl">قائد العلاقات العامة</div><div className="cc-val"><a href="tel:+966534831944" style={{ color: "var(--glt)" }}>0534831944</a></div></div></div>
                <div className="ccard"><div className="cc-ico">🏫</div><div><div className="cc-lbl">الجهة المنظِّمة</div><div className="cc-val">نادي TechNation × نادي المالية الطلابي</div></div></div>
                <div className="ccard"><div className="cc-ico">📅</div><div><div className="cc-lbl">الفعالية</div><div className="cc-val">5–6 مايو 2026 · بهو جامعة الإمام · الرياض</div></div></div>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div className="form-box">
                <div className="form-ttl">نموذج تسجيل الجهة التدريبية</div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 12px" }}>
                  <div className="fg"><label>اسم الجهة <span style={{ color: "#f87171" }}>*</span></label><input type="text" placeholder="اسم المؤسسة" value={form.org} onChange={e => setF("org", e.target.value)} /></div>
                  <div className="fg"><label>اسم المسؤول <span style={{ color: "#f87171" }}>*</span></label><input type="text" placeholder="الاسم الكامل" value={form.name} onChange={e => setF("name", e.target.value)} /></div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 12px" }}>
                  <div className="fg"><label>رقم الجوال / واتساب</label><input type="tel" placeholder="05xxxxxxxx" style={{ direction: "ltr" }} value={form.phone} onChange={e => setF("phone", e.target.value)} /></div>
                  <div className="fg"><label>البريد الإلكتروني <span style={{ color: "#f87171" }}>*</span></label><input type="email" placeholder="your@email.com" style={{ direction: "ltr" }} value={form.email} onChange={e => setF("email", e.target.value)} /></div>
                </div>

                <div className="fg">
                  <label>قطاع الجهة</label>
                  <select value={form.sector} onChange={e => setF("sector", e.target.value)}>
                    <option value="">اختر القطاع</option>
                    <option>مصرفي وتمويل</option>
                    <option>تقنية مالية (فنتك)</option>
                    <option>تقنية المعلومات</option>
                    <option>استشارات ومحاسبة</option>
                    <option>حكومي وتنظيمي</option>
                    <option>تأمين وإدارة مخاطر</option>
                    <option>أخرى</option>
                  </select>
                </div>

                <div className="fg">
                  <label>العدد المتوقع للمتدربين سنوياً</label>
                  <select value={form.count} onChange={e => setF("count", e.target.value)}>
                    <option value="">حدّد العدد التقريبي</option>
                    <option>1–5 متدربين</option>
                    <option>6–15 متدرباً</option>
                    <option>16–30 متدرباً</option>
                    <option>أكثر من 30</option>
                  </select>
                </div>

                <div className="fg">
                  <label>خيار البوث</label>
                  <div className="booth-opts">
                    <div className={`booth-opt${boothChoice === "own" ? " active" : ""}`} onClick={() => setBoothChoice("own")}>🏗️ أحضر بوثي الخاص</div>
                    <div className={`booth-opt${boothChoice === "provided" ? " active" : ""}`} onClick={() => setBoothChoice("provided")}>✨ أريد بوثاً مقدَّماً</div>
                  </div>
                </div>

                <div className="fg"><label>ملاحظات أو متطلبات خاصة</label><textarea placeholder="أي تفاصيل إضافية عن برنامج التدريب لديكم..." value={form.notes} onChange={e => setF("notes", e.target.value)} /></div>

                <div style={{ background: "rgba(61,170,134,.08)", border: "1px solid rgba(61,170,134,.15)", borderRadius: 8, padding: "12px 14px", marginBottom: 12, textAlign: "center" }}>
                  <p style={{ fontSize: ".74rem", color: "rgba(255,255,255,.55)", lineHeight: 1.7, margin: 0 }}>✓ يُرسَل الطلب مباشرة إلى البريد الرسمي للمعرض · يتواصل معك الفريق خلال 24 ساعة</p>
                </div>
                {btnErr && <p style={{ color: "#f87171", fontSize: ".78rem", marginBottom: 8, textAlign: "center" }}>{btnErr}</p>}
                <button className="form-btn" onClick={submitForm} disabled={sending}>{sending ? "جاري الإرسال..." : "إرسال طلب المشاركة"}</button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══════════ THANK YOU ══════════ */}
      <div className={`ty-overlay${showTY ? " open" : ""}`}>
        <div className="ty-box">
          <div style={{ fontSize: "2.5rem", marginBottom: 16 }}>🎉</div>
          <h3 style={{ fontFamily: "'Cairo',sans-serif", fontSize: "1.4rem", fontWeight: 900, color: "#fff", marginBottom: 10 }}>تم إرسال طلبك بنجاح!</h3>
          <p style={{ fontSize: ".88rem", color: "rgba(255,255,255,.55)", lineHeight: 1.8, marginBottom: 22 }}>سيتواصل معك فريق روافد فنتك خلال 24 ساعة. يمكنك أيضاً التواصل المباشر عبر واتساب لتسريع الإجراءات.</p>
          <a href={WA_LINK} target="_blank" rel="noreferrer" className="btn-wa" style={{ display: "inline-flex", margin: "0 auto 14px" }}><SVGWA />تواصل عبر واتساب</a><br />
          <button onClick={() => setShowTY(false)} style={{ background: "transparent", border: "1px solid rgba(255,255,255,.15)", color: "rgba(255,255,255,.5)", padding: "8px 20px", borderRadius: 7, cursor: "pointer", fontFamily: "'Tajawal',sans-serif", fontSize: ".85rem" }}>إغلاق</button>
        </div>
      </div>

      {/* ══════════ FOOTER ══════════ */}
      <footer>
        <div className="fi">
          <div className="fb">روافد فنتك <span>التدريب التعاوني · 2026</span></div>
          <div className="fc">© 2026 جميع الحقوق محفوظة</div>
          <div><div className="fo-n">جامعة الإمام محمد بن سعود الإسلامية</div><div className="fo-s">نادي TechNation · نادي المالية الطلابي</div></div>
        </div>
      </footer>

      {/* ══════════ WA FIXED ══════════ */}
      <a className="wa-btn" href={WA_LINK} target="_blank" rel="noreferrer" title="تواصل عبر واتساب">
        <svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zm-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884zm8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>
      </a>
    </div>
  );
}
