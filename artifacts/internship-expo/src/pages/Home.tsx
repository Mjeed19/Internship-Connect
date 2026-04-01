import { useState, useEffect, useRef } from "react";

const WA_LINK = "https://wa.me/966534831944?text=%D8%A3%D9%88%D8%AF%20%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%A7%D8%B1%20%D8%B9%D9%86%20%D8%A7%D9%84%D9%85%D8%B4%D8%A7%D8%B1%D9%83%D8%A9%20%D9%81%D9%8A%20%D9%85%D8%B9%D8%B1%D8%B6%20%D8%B1%D9%88%D8%A7%D9%81%D8%AF%20%D9%81%D9%86%D8%AA%D9%83%202026";
const WA_MEETING = "https://wa.me/966534831944?text=%D8%A3%D9%88%D8%AF%20%D8%AD%D8%AC%D8%B2%20%D8%A7%D8%AC%D8%AA%D9%85%D8%A7%D8%B9%20%D9%84%D9%85%D9%86%D8%A7%D9%82%D8%B4%D8%A9%20%D8%A7%D9%84%D9%85%D8%B4%D8%A7%D8%B1%D9%83%D8%A9%20%D9%81%D9%8A%20%D9%85%D8%B9%D8%B1%D8%B6%20%D8%B1%D9%88%D8%A7%D9%81%D8%AF%20%D9%81%D9%86%D8%AA%D9%83%202026";
const EMAIL = "pr.technationclub@gmail.com";
const FORMSPREE = "https://formspree.io/f/mnndorva";

const SVGWA = () => (
  <svg viewBox="0 0 24 24" style={{ width: 20, height: 20, fill: "#fff", flexShrink: 0 }}>
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
  const [form, setForm] = useState({ org: "", name: "", phone: "", email: "", type: "", notes: "" });
  const [sending, setSending] = useState(false);
  const [showTY, setShowTY] = useState(false);
  const [btnErr, setBtnErr] = useState("");

  const setF = (k: string, v: string) => setForm(p => ({ ...p, [k]: v }));

  const submitForm = async () => {
    if (!form.org || !form.name || !form.email || !form.type) {
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
          الجوال: form.phone, "نوع المشاركة": form.type,
          "خيار البوث": boothChoice === "own" ? "بوث خاص" : boothChoice === "provided" ? "بوث مقدَّم" : "لم يُحدَّد",
          ملاحظات: form.notes,
          _subject: `طلب مشاركة — روافد فنتك 2026 — ${form.org}`
        }),
      });
      const d = await r.json();
      if (d.ok || d.next) {
        setShowTY(true);
        setForm({ org: "", name: "", phone: "", email: "", type: "", notes: "" });
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
          <li><a href="#packages">الباقات</a></li>
          <li><a href="#orgs">الجهات</a></li>
          <li><a href="#faq">FAQ</a></li>
          <li><a href="#meeting" className="n-cta">احجز اجتماعاً</a></li>
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
            <a href="#packages" className="btn-p">اطّلع على باقات المشاركة</a>
            <a href="#meeting" className="btn-s">احجز اجتماع التدريب</a>
          </div>
        </div>
        <div className="h-scroll"><div className="scroll-line" /></div>
      </section>

      {/* ══════════ REACH BAR ══════════ */}
      <div className="reach2">
        <div className="rb2"><div className="rb2-n">+3000</div><div className="rb2-l">زائر متوقع</div></div>
        <div className="rb2"><div className="rb2-n">جامعات الرياض</div><div className="rb2-l">الجمهور المستهدف</div></div>
        <div className="rb2"><div className="rb2-n">+20</div><div className="rb2-l">جهة مشاركة</div></div>
        <div className="rb2"><div className="rb2-n">5</div><div className="rb2-l">أركان رئيسية</div></div>
      </div>

      {/* ══════════ WHY ══════════ */}
      <section className="sec sec-light" id="why">
        <div className="wrap">
          <Reveal>
            <div className="lbl" style={{ color: "var(--green)" }}>لماذا تشارك؟</div>
            <h2 className="h2">ما الذي <em>تكسبه</em> مؤسستك؟</h2>
          </Reveal>
          <div className="why-grid">
            {[
              { i: "👁️", t: "ظهور أمام آلاف الطلبة", d: "تواجد مباشر أمام أكثر من 3000 طالب وطالبة من كبرى جامعات الرياض المهتمين بالتقنية المالية" },
              { i: "🎓", t: "استقطاب المتدربين", d: "منصة مثالية للوصول للكفاءات الجامعية وتقديم فرص التدريب التعاوني مباشرةً" },
              { i: "📣", t: "حضور إعلامي موثّق", d: "ذكرك بلقبك الرسمي في كل إعلان على منصات المعرض قبل الفعالية وخلالها وبعدها" },
              { i: "🤝", t: "شراكة معرفية مؤسسية", d: "ارتباط رسمي باسمك في أبرز فعالية فنتك أكاديمية بالرياض يعزز حضورك أمام الجيل الجامعي" },
              { i: "📊", t: "بيانات الحضور", d: "تقرير ما بعد الفعالية بإحصاءات الحضور والتفاعل لقياس العائد على مشاركتك" },
              { i: "🏆", t: "تكريم رسمي", d: "درع يُسلَّم رسمياً في حفل الختام وذكرك في البيانات الصحفية والدعوات الرسمية" },
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

      {/* ══════════ PACKAGES ══════════ */}
      <section className="sec sec-tinted" id="packages">
        <div className="wrap">
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: 42 }}>
              <div className="lbl" style={{ justifyContent: "center", color: "var(--green)" }}>باقات المشاركة</div>
              <h2 className="h2" style={{ textAlign: "center" }}>اختر مستوى <em>مشاركتك</em></h2>
              <p className="sec-sub" style={{ textAlign: "center" }}>كل باقة مصممة لتعظيم أثر مؤسستك قبل الفعالية وخلالها وبعدها</p>
            </div>
          </Reveal>

          <div className="pkgs">

            {/* ── STRATEGIC ── */}
            <Reveal>
              <div className="pkg2 strat">
                <div className="pkg2-header">
                  <div className="pkg2-top">
                    <div>
                      <div className="pkg2-name">شريك التدريب الاستراتيجي</div>
                      <div className="pkg2-sub">Strategic Training Partner &nbsp;|&nbsp; عدد محدود</div>
                    </div>
                    <div className="pkg2-price-box">
                      <div className="pkg2-price-num">12,000</div>
                      <div className="pkg2-price-cur">ريال سعودي</div>
                      <div className="pkg2-price-tag">EXCLUSIVE</div>
                    </div>
                  </div>
                </div>
                <div className="pkg2-body">
                  <div className="pkg2-section-title">المميزات الحصرية</div>
                  <div className="pkg2-section-sub">هذا بيع "تأثير" — ليس مجرد إعلان</div>
                  <div className="pkg2-divider" />
                  <div className="pkg2-list">
                    {[
                      ["لقب: شريك التدريب الاستراتيجي الرسمي", "ذكرك بهذا اللقب في كل إعلان ومنشور"],
                      ["جناح رئيسي بأفضل موقع", "قرب المسرح — موقع استراتيجي"],
                      ["كلمة رئيسية في حفل الافتتاح", ""],
                      ["Branding على المسرح", "خلفية الجلسات بشعار الجهة"],
                      ["رعاية جلسة تدريبية باسمك", '"الجلسة التدريبية برعاية..."'],
                      ["متحدث في Panel رئيسي", ""],
                      ["Roll-up عند المدخل الرئيسي", ""],
                      ["أولوية الوصول لقاعدة البيانات", "بيانات المتقدمين بموافقة الطلاب"],
                      ["فيديو مقابلة رسمية", "يُنشر على حسابات المعرض الرسمية"],
                      ["الظهور في العرض الترويجي", "خلال الفعالية على الشاشات"],
                      ["درع فاخر يُسلَّم على المسرح", "تسليم رسمي في حفل الختام"],
                      ["إدراج في البيان الصحفي الرسمي", ""],
                      ['ختم "شريك تدريب استراتيجي لروافد فنتك"', "تستخدمه في حساباتك وموادك الرسمية"],
                      ["دعوات VIP للمسؤولين", ""],
                      ["تغطية مصورة احترافية للجناح", ""],
                      ["ملخص إحصائي تفصيلي بعد الفعالية", ""],
                    ].map(([m, d]) => (
                      <div className="pkg2-item" key={m}>
                        <div className="pkg2-check">✓</div>
                        <div><div className="pkg2-item-main">{m}</div>{d && <div className="pkg2-item-desc">{d}</div>}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="pkg2-footer">
                  <div className="pkg2-tagline">فرصة حصرية للتأثير والحضور القوي في أكبر معرض فنتك أكاديمي بالرياض</div>
                </div>
              </div>
            </Reveal>

            {/* ── GOLDEN ── */}
            <Reveal>
              <div className="pkg2 gold2">
                <div className="pkg2-header">
                  <div className="pkg2-top">
                    <div>
                      <div className="pkg2-name">شريك التدريب الذهبي</div>
                      <div className="pkg2-sub">Gold Training Partner &nbsp;|&nbsp; عدد محدود</div>
                    </div>
                    <div className="pkg2-price-box">
                      <div className="pkg2-price-num">6,000</div>
                      <div className="pkg2-price-cur">ريال سعودي</div>
                      <div className="pkg2-price-tag">LIMITED</div>
                    </div>
                  </div>
                </div>
                <div className="pkg2-body">
                  <div className="pkg2-section-title">المميزات</div>
                  <div className="pkg2-section-sub">تركيز على التفاعل المباشر + الحضور الإعلامي الثابت</div>
                  <div className="pkg2-divider" />
                  <div className="pkg2-list">
                    {[
                      ["لقب: شريك التدريب الذهبي الرسمي", "ذكرك بهذا اللقب في كل إعلان ومنشور"],
                      ["جناح بموقع استراتيجي", "موقع متميز"],
                      ["المشاركة في الأركان الخمسة الرئيسة", ""],
                      ["المشاركة في الجلسات الحوارية", ""],
                      ["شعار في جميع المواد التسويقية", ""],
                      ["توزيع مواد تعريفية", "داخل حقائب الحضور"],
                      ["الظهور في العرض الترويجي", ""],
                      ["إدراج في كتيب المعرض", ""],
                      ["بوست تعريفي قبل الحدث", ""],
                      ["ذكر في الحفل الختامي", ""],
                      ["درع تكريمي رسمي", ""],
                      ["ملخص إحصائي مختصر بعد الفعالية", ""],
                      ["دعوات VIP للمسؤولين", ""],
                    ].map(([m, d]) => (
                      <div className="pkg2-item" key={m}>
                        <div className="pkg2-check">✓</div>
                        <div><div className="pkg2-item-main">{m}</div>{d && <div className="pkg2-item-desc">{d}</div>}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="pkg2-footer">
                  <div className="pkg2-tagline">حضور إعلامي ثابت + تفاعل مباشر مع أكثر من 3000 طالب</div>
                </div>
              </div>
            </Reveal>

            {/* ── IN-KIND / PARTNERS ── */}
            <Reveal>
              <div className="pkg2 inkind">
                <div className="pkg2-header">
                  <div className="pkg2-top">
                    <div>
                      <div className="pkg2-name">شركاء النجاح</div>
                      <div className="pkg2-sub">Training In-Kind Partners &nbsp;|&nbsp; بدون مقابل مالي</div>
                    </div>
                    <div className="pkg2-price-box" style={{ background: "rgba(255,255,255,.15)" }}>
                      <div className="pkg2-price-num" style={{ fontSize: "1rem" }}>عيني</div>
                      <div className="pkg2-price-cur">بدون مقابل مالي</div>
                      <div className="pkg2-price-tag">6 أنواع</div>
                    </div>
                  </div>
                </div>
                <div className="pkg2-body">
                  <div className="pkg2-section-title">المميزات</div>
                  <div className="pkg2-section-sub">حضور إعلامي موثّق مقابل دعم عيني متخصص</div>
                  <div className="pkg2-divider" />
                  <div className="pkg2-list">
                    {[
                      { c: "#2D6BE4", t: "شريك أكاديمي", d: "شعار على شهادات المشاركين + بوث لعرض مواد الجهة + ذكر في الافتتاح" },
                      { c: "#7C3AED", t: "شريك مطبوعات", d: "شعار على جميع مطبوعات المعرض + بانر عند نقطة التوزيع + إدراج في الدعوات" },
                      { c: "#D97706", t: "شريك ضيافة", d: "شعار على أكواب وأدوات الضيافة + إعلان صوتي + ذكر في كلمتي الافتتاح والختام" },
                      { c: "#DC2626", t: "شريك إعلامي", d: "إشارة رسمية في كل محتوى + Roll-up في منطقة التصوير + حق نشر المحتوى باسمكم" },
                      { c: "#0891B2", t: "شريك تشغيلي", d: "شعار على بطاقات الحضور والـ wristbands + بانر في منطقة التسجيل" },
                      { c: "#059669", t: "شريك النجاح", d: "شعار داخل كيس الهدية + ذكر شكر خاص في كلمة الختام + بطاقة تقدير رسمية" },
                    ].map(p => (
                      <div key={p.t} className="pkg2-item" style={{ borderRight: `3px solid ${p.c}`, paddingRight: 12, marginBottom: 6, borderRadius: "0 6px 6px 0" }}>
                        <div className="pkg2-check" style={{ background: p.c, width: 24, height: 24, borderRadius: 6 }}>✓</div>
                        <div>
                          <div className="pkg2-item-main" style={{ color: p.c }}>{p.t}</div>
                          <div className="pkg2-item-desc">{p.d}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div style={{ marginTop: 14, padding: "10px 14px", background: "rgba(13,125,108,.07)", borderRadius: 8, border: "1px solid rgba(13,125,108,.18)" }}>
                    <p style={{ fontSize: ".77rem", color: "var(--teal2)", fontWeight: 600, textAlign: "center", lineHeight: 1.6 }}>لكل شريك: إعلان على الموقع الرسمي + ذكر بلقبه في حسابات التواصل</p>
                  </div>
                </div>
                <div className="pkg2-footer">
                  <div className="pkg2-tagline">شراكة عينية تُعظّم الحضور الإعلامي بدون تكلفة مالية</div>
                </div>
              </div>
            </Reveal>

            {/* ── EXHIBITORS ── */}
            <Reveal>
              <div className="pkg2 plat">
                <div className="pkg2-header">
                  <div className="pkg2-top">
                    <div>
                      <div className="pkg2-name">جهات التدريب المشاركة</div>
                      <div className="pkg2-sub">Training Exhibitors &nbsp;|&nbsp; بوثك أو بوثنا الجاهز</div>
                    </div>
                    <div className="pkg2-price-box">
                      <div className="pkg2-price-num" style={{ fontSize: "1rem" }}>تسجيل</div>
                      <div className="pkg2-price-cur">مجاني — محدود</div>
                      <div className="pkg2-price-tag">REGISTER FREE</div>
                    </div>
                  </div>
                </div>
                <div className="pkg2-body">
                  <div className="pkg2-section-title">المميزات</div>
                  <div className="pkg2-section-sub">أحضر بوثك أو استفد من بوثنا الجاهز — المطلوب المحتوى والفريق فقط</div>
                  <div className="pkg2-divider" />
                  {/* Booth choice highlight */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
                    <div style={{ border: "1.5px solid rgba(27,107,82,.3)", borderRadius: 10, padding: "14px 12px", textAlign: "center", background: "rgba(27,107,82,.04)" }}>
                      <div style={{ fontSize: "1.4rem", marginBottom: 6 }}>🏗️</div>
                      <div style={{ fontFamily: "'Cairo',sans-serif", fontWeight: 800, fontSize: ".82rem", color: "var(--ink)", marginBottom: 3 }}>بوثك الخاص</div>
                      <div style={{ fontSize: ".7rem", color: "var(--muted-c)", lineHeight: 1.6 }}>أحضر تصميمك الكامل وهويتك البصرية</div>
                    </div>
                    <div style={{ border: "1.5px solid rgba(13,125,108,.3)", borderRadius: 10, padding: "14px 12px", textAlign: "center", background: "rgba(13,125,108,.04)" }}>
                      <div style={{ fontSize: "1.4rem", marginBottom: 6 }}>✨</div>
                      <div style={{ fontFamily: "'Cairo',sans-serif", fontWeight: 800, fontSize: ".82rem", color: "var(--ink)", marginBottom: 3 }}>بوث مقدَّم جاهز</div>
                      <div style={{ fontSize: ".7rem", color: "var(--muted-c)", lineHeight: 1.6 }}>بوث احترافي بشعارك وألوانك بدون جهد لوجستي</div>
                    </div>
                  </div>
                  <div className="pkg2-list">
                    {[
                      ["بوث مجهّز بالكامل (إن اخترت البوث المقدَّم)", "طاولة، كراسي، شاشة، إضاءة، واي فاي"],
                      ["الشعار في مواد المعرض الدعائية", ""],
                      ["إعلان على الموقع الرسمي للمعرض", ""],
                      ["إشارة في حسابات التواصل للمعرض", ""],
                    ].map(([m, d]) => (
                      <div className="pkg2-item" key={m}>
                        <div className="pkg2-check">✓</div>
                        <div><div className="pkg2-item-main">{m}</div>{d && <div className="pkg2-item-desc">{d}</div>}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="pkg2-footer">
                  <div className="pkg2-tagline">كل ما تحتاج إحضاره: محتوى تدريبي تعريفي + موظفون متخصصون</div>
                </div>
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* ══════════ ORGS ══════════ */}
      <section className="sec sec-light" id="orgs">
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

      {/* ══════════ 10 FEATURES ══════════ */}
      <section className="features-sec">
        <div className="wrap">
          <Reveal>
            <div style={{ textAlign: "center" }}>
              <div className="lbl lt" style={{ justifyContent: "center" }}>ماذا تحصل كجهة تدريب؟</div>
              <h2 className="h2 wt" style={{ textAlign: "center" }}>10 مزايا <em>تميّزك</em> بين الجهات</h2>
              <p style={{ color: "rgba(255,255,255,.42)", fontSize: ".85rem", marginTop: 8, textAlign: "center" }}>كل ميزة مصممة لتعظيم الأثر الفعلي لمؤسستك</p>
            </div>
          </Reveal>
          <div className="feat-grid">
            {[
              { n: "01", i: "📣", t: "إعلان في كل منشور", d: "ذكرك بلقبك الرسمي في كل منشور على حسابات التواصل قبل وخلال وبعد الفعالية" },
              { n: "02", i: "🎙️", t: "حضور على المسرح", d: "كلمة رئيسية أو مشاركة في الجلسات أمام آلاف الحضور مباشرةً" },
              { n: "03", i: "🎓", t: "استقطاب المتدربين", d: "وصول مباشر لأكثر من 3000 طالب وطالبة من كبرى جامعات الرياض" },
              { n: "04", i: "📸", t: "تغطية مصورة احترافية", d: "صور ومقاطع لجناحك وفريقك تُستخدم في حملاتك الرقمية ومواد التواصل" },
              { n: "05", i: "🏆", t: "درع تكريمي رسمي", d: "تسليم رسمي أمام الحضور في حفل الختام مع توثيق ونشر على المنصات" },
              { n: "06", i: "📊", t: "تقرير إحصائي بعد الفعالية", d: "بيانات الحضور والتفاعل لقياس العائد الفعلي على استثمارك في الفعالية" },
              { n: "07", i: "🤝", t: "شبكة علاقات مؤسسية", d: "لقاء مع جهات أخرى من القطاع المالي والتقني في جو أكاديمي رسمي" },
              { n: "08", i: "📱", t: "ريلز مقصوص باسمك", d: "مقطع قصير احترافي عن جناحك أو مشاركتك يُنشر على حسابات المعرض الرسمية" },
              { n: "09", i: "🏷️", t: 'ختم "شريك تدريب رسمي"', d: "شارة رقمية رسمية تستخدمها في موادك وحساباتك بعد الفعالية" },
              { n: "10", i: "🎯", t: "توزيع مواد تعريفية", d: "إدراج كتيباتك وهداياك الترويجية في حقيبة كل حاضر في الفعالية" },
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

      {/* ══════════ MEETING CTA ══════════ */}
      <section className="meeting-sec" id="meeting">
        <div className="meeting-inner">
          <Reveal>
            <div className="meeting-badge">📅 احجز اجتماع التدريب</div>
            <h2 className="meeting-title">نناقش التفاصيل معك<br /><em>في اجتماع مخصص</em></h2>
            <p className="meeting-desc">لا تكتفِ بقراءة الباقات — نسعد بتخصيص 30 دقيقة نشرح فيها آليات التنفيذ، نجيب على أسئلتك، ونناقش أفضل صيغة تناسب مؤسستك وأهدافها التدريبية.</p>
            <div className="meeting-cards">
              <div className="meeting-card"><div className="mc-icon">⏱️</div><div><div className="mc-t">30 دقيقة</div><div className="mc-d">اجتماع مركّز عبر زووم أو حضورياً</div></div></div>
              <div className="meeting-card"><div className="mc-icon">📋</div><div><div className="mc-t">شرح تفصيلي</div><div className="mc-d">آليات التنفيذ ومواعيد التسليم</div></div></div>
              <div className="meeting-card"><div className="mc-icon">✏️</div><div><div className="mc-t">تخصيص الباقة</div><div className="mc-d">نناقش أي تعديلات تناسب مؤسستك</div></div></div>
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
              <h2 className="h2" style={{ textAlign: "center" }}>ما يسألنا عنه <em>الشركاء</em></h2>
            </div>
          </Reveal>
          <div className="faq-list">
            {[
              { q: "هل رسوم المشاركة شاملة لجميع المزايا المذكورة؟", a: "نعم، المبلغ المذكور يشمل جميع المزايا بدون رسوم إضافية. أي تخصيص خارج الباقة يُناقش في اجتماع المشاركة." },
              { q: "هل يمكن تخصيص الباقة حسب احتياجاتنا التدريبية؟", a: "نقبل طلبات التخصيص ضمن حدود معينة. يمكن مناقشة ذلك في اجتماع المشاركة المخصص لمؤسستك." },
              { q: "ما الجمهور المتوقع للفعالية؟", a: "طلبة جامعات الرياض المهتمين بالتقنية المالية والمجالات المرتبطة، مع توقعات بتجاوز 3000 زائر خلال اليومين." },
              { q: "ما الموعد النهائي لتأكيد المشاركة؟", a: "يُفضل التأكيد قبل شهر من الفعالية لضمان إدراج شعارك في جميع المواد المطبوعة والرقمية." },
              { q: "كيف يسير اجتماع المشاركة؟", a: "اجتماع لمدة 30 دقيقة يشرح فيه فريقنا تفاصيل الباقات، آليات التنفيذ، ومواعيد التسليم، ونجيب على جميع أسئلتكم قبل اتخاذ القرار." },
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
              <div className="lbl lt" style={{ justifyContent: "center" }}>مضمون لجميع الشركاء</div>
              <h2 className="h2 wt" style={{ textAlign: "center" }}>كل الجهات تحصل على <em>هذا</em></h2>
            </div>
          </Reveal>
          <div className="sum-grid">
            {[
              { i: "📣", t: "إعلان في كل منشور", d: "اسمك ولقبك الرسمي في كل إعلان قبل وخلال وبعد الفعالية" },
              { i: "🌐", t: "إعلان على الموقع الرسمي", d: "ظهور ثابت على الموقع الرسمي للمعرض بلقبك طوال فترة الفعالية" },
              { i: "🖼️", t: "الشعار في المواد", d: "شعار الجهة في البوسترات والدعوات والمطبوعات وشاشات الفعالية" },
              { i: "🏆", t: "درع وتكريم رسمي", d: "تسليم رسمي في حفل الختام أمام الحضور وتوثيق ونشر على المنصات" },
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
              <div className="lbl lt">تواصل معنا</div>
              <h2 className="h2 wt">احجز مقعدك<br />كـ<em>شريك تدريب</em> الآن</h2>
              <p className="ct-sub">المقاعد محدودة وتُخصَّص بحسب الأولوية. يمكنك التواصل المباشر أو تعبئة النموذج.</p>
              <div className="ct-cards">
                <div className="ccard"><div className="cc-ico">📧</div><div><div className="cc-lbl">البريد الإلكتروني</div><div className="cc-val"><a href={`mailto:${EMAIL}`}>{EMAIL}</a></div></div></div>
                <div className="ccard"><div className="cc-ico">📞</div><div><div className="cc-lbl">قائد العلاقات العامة</div><div className="cc-val"><a href="tel:+966534831944" style={{ color: "var(--glt)" }}>0534831944</a></div></div></div>
                <div className="ccard"><div className="cc-ico">🏫</div><div><div className="cc-lbl">الجهة المنظِّمة</div><div className="cc-val">نادي TechNation × نادي المالية الطلابي</div></div></div>
                <div className="ccard"><div className="cc-ico">📅</div><div><div className="cc-lbl">الفعالية</div><div className="cc-val">5–6 مايو 2026 · بهو جامعة الإمام · الرياض</div></div></div>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div className="form-box">
                <div className="form-ttl">أرسل طلب المشاركة</div>
                <div className="fg"><label>اسم الجهة / الشركة <span style={{ color: "#f87171" }}>*</span></label><input type="text" placeholder="اسم المؤسسة" value={form.org} onChange={e => setF("org", e.target.value)} /></div>
                <div className="fg"><label>اسم المسؤول <span style={{ color: "#f87171" }}>*</span></label><input type="text" placeholder="الاسم الكامل" value={form.name} onChange={e => setF("name", e.target.value)} /></div>
                <div className="fg"><label>رقم الجوال / واتساب</label><input type="tel" placeholder="05xxxxxxxx" style={{ direction: "ltr" }} value={form.phone} onChange={e => setF("phone", e.target.value)} /></div>
                <div className="fg"><label>البريد الإلكتروني <span style={{ color: "#f87171" }}>*</span></label><input type="email" placeholder="your@email.com" style={{ direction: "ltr" }} value={form.email} onChange={e => setF("email", e.target.value)} /></div>
                <div className="fg">
                  <label>نوع المشاركة <span style={{ color: "#f87171" }}>*</span></label>
                  <select value={form.type} onChange={e => setF("type", e.target.value)}>
                    <option value="">اختر نوع المشاركة</option>
                    <option>شريك تدريب استراتيجي — 12,000 ريال</option>
                    <option>شريك تدريب ذهبي — 6,000 ريال</option>
                    <option>شريك أكاديمي (عيني)</option>
                    <option>شريك مطبوعات (عيني)</option>
                    <option>شريك ضيافة (عيني)</option>
                    <option>شريك إعلامي (عيني)</option>
                    <option>شريك تشغيلي (عيني)</option>
                    <option>شريك النجاح / هدايا (عيني)</option>
                    <option>جهة تدريب مشاركة (مجاني)</option>
                  </select>
                </div>
                <div className="fg">
                  <label>خيار البوث</label>
                  <div className="booth-opts">
                    <div className={`booth-opt${boothChoice === "own" ? " active" : ""}`} onClick={() => setBoothChoice("own")}>🏗️ أحضر بوثي الخاص</div>
                    <div className={`booth-opt${boothChoice === "provided" ? " active" : ""}`} onClick={() => setBoothChoice("provided")}>✨ أريد بوثاً مقدَّماً</div>
                  </div>
                </div>
                <div className="fg"><label>ملاحظات</label><textarea placeholder="أي تفاصيل إضافية..." value={form.notes} onChange={e => setF("notes", e.target.value)} /></div>
                <div style={{ background: "rgba(61,170,134,.08)", border: "1px solid rgba(61,170,134,.15)", borderRadius: 8, padding: "12px 14px", marginBottom: 12, textAlign: "center" }}>
                  <p style={{ fontSize: ".74rem", color: "rgba(255,255,255,.55)", lineHeight: 1.7 }}>✓ يُرسَل الطلب مباشرة إلى البريد الرسمي للمعرض · يتواصل معك الفريق خلال 24 ساعة</p>
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
