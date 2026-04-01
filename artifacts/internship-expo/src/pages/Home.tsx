import { useState, useEffect, useRef } from "react";

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add("visible"); },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

function RevealDiv({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => el.classList.add("visible"), delay);
        }
      },
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return (
    <div ref={ref} className={`reveal-section ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

const faqs = [
  { q: "كيف يمكن لشركتنا التسجيل في المعرض؟", a: "يمكنكم التسجيل عبر نموذج التسجيل في أسفل الصفحة أو التواصل مباشرة عبر واتساب. سيتولى فريقنا متابعتكم خلال 24 ساعة." },
  { q: "ما هو الفرق بين خيار البوث المقدَّم والبوث الخاص؟", a: "خيار البوث المقدَّم يوفر لكم بنية تحتية جاهزة بتصميم موحد مع شعار شركتكم، بينما البوث الخاص يتيح لكم إحضار تصميمكم الكامل والمواد الترويجية الخاصة بكم." },
  { q: "كم عدد الطلاب المتوقع حضورهم؟", a: "نستهدف أكثر من 3000 طالب وطالبة من جامعات المملكة خلال أيام المعرض الثلاثة." },
  { q: "ما التخصصات التي يغطيها المعرض؟", a: "يشمل المعرض تخصصات متعددة: علوم الحاسب، الهندسة، إدارة الأعمال، التسويق، المحاسبة، والتصميم وغيرها." },
  { q: "هل يمكن مشاركة أكثر من شركة واحدة من نفس المجموعة؟", a: "نعم، يمكن لكل شركة تسجيل بوث مستقل. تواصلوا معنا للحصول على عروض خاصة للمجموعات." },
  { q: "ما هو الموعد النهائي للتسجيل؟", a: "يُغلق التسجيل قبل 3 أسابيع من انعقاد المعرض لضمان التجهيز الكافي لجميع المشاركين." },
];

const whyItems = [
  { icon: "🎓", title: "وصول مباشر للمواهب", desc: "تواصلوا مباشرة مع آلاف الطلاب المؤهلين من أفضل الجامعات." },
  { icon: "🏢", title: "تعزيز العلامة التجارية", desc: "عرّفوا بثقافة شركتكم وبيئة العمل لجيل الكفاءات القادمة." },
  { icon: "🔍", title: "اكتشاف الكفاءات", desc: "تقييم وانتقاء المتدربين المناسبين بشكل مباشر وفعّال." },
  { icon: "🤝", title: "شراكات استراتيجية", desc: "بناء علاقات مستدامة مع الجامعات ومراكز التدريب." },
  { icon: "📊", title: "بيانات دقيقة", desc: "تقرير تفصيلي بعد المعرض يتضمن إحصائيات الزوار والتفاعل." },
  { icon: "⚡", title: "تجربة سلسة", desc: "فريق متخصص يدعمكم قبل وخلال وبعد المعرض." },
];

const stats = [
  { n: "+3000", l: "طالب وطالبة" },
  { n: "+50", l: "جامعة مشاركة" },
  { n: "+80", l: "شركة عارضة" },
  { n: "3", l: "أيام معرض" },
];

const [BOOTH_OWN, BOOTH_PROVIDED] = ["own", "provided"] as const;

export default function Home() {
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const [boothChoice, setBoothChoice] = useState<"own" | "provided" | null>(null);
  const [formData, setFormData] = useState({
    company: "",
    name: "",
    phone: "",
    email: "",
    sector: "",
    traineeCount: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setFormData({ company: "", name: "", phone: "", email: "", sector: "", traineeCount: "", message: "" });
    setBoothChoice(null);
  };

  return (
    <div dir="rtl" className="font-[Tajawal,sans-serif]" style={{ background: "var(--green4)", minHeight: "100vh", overflowX: "hidden" }}>

      {/* ═══ NAV ═══ */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 500,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "12px clamp(14px,4vw,48px)",
        background: "rgba(5,14,8,.97)",
        backdropFilter: "blur(24px)",
        borderBottom: "1px solid rgba(61,170,134,.08)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, background: "var(--green)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem" }}>🎓</div>
          <div>
            <div style={{ fontFamily: "'Cairo',sans-serif", fontSize: "1.1rem", fontWeight: 800, color: "rgba(255,255,255,.9)", lineHeight: 1 }}>
              معرض <span style={{ color: "var(--glt)" }}>التدريب</span>
            </div>
            <div style={{ fontSize: ".6rem", color: "rgba(255,255,255,.3)", marginTop: 2 }}>Internship Expo 2026</div>
          </div>
        </div>
        <ul style={{ display: "flex", gap: 20, listStyle: "none", margin: 0, padding: 0 }} className="hidden md:flex">
          {[["لماذا نحن", "#why"], ["خيارات البوث", "#booth"], ["باقات المشاركة", "#packages"], ["التسجيل", "#register"]].map(([label, href]) => (
            <li key={href}>
              <a href={href} style={{ color: "rgba(255,255,255,.5)", textDecoration: "none", fontSize: ".82rem", fontWeight: 500, transition: "color .2s" }}
                onMouseOver={e => (e.currentTarget.style.color = "#fff")}
                onMouseOut={e => (e.currentTarget.style.color = "rgba(255,255,255,.5)")}
              >{label}</a>
            </li>
          ))}
        </ul>
        <a href="#register" style={{
          background: "var(--green)", color: "#fff", padding: "7px 16px",
          borderRadius: 6, fontWeight: 700, fontSize: ".82rem",
          border: "1px solid var(--glt)", textDecoration: "none",
          transition: "all .25s",
        }}>سجّل شركتك</a>
      </nav>

      {/* ═══ HERO ═══ */}
      <section style={{ minHeight: "100svh", position: "relative", overflow: "hidden", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "130px clamp(14px,4vw,40px) 80px", background: "var(--green4)" }}>
        <div style={{ position: "absolute", inset: 0, zIndex: 0, background: "radial-gradient(ellipse 130% 70% at 50% -5%,rgba(27,107,82,.52) 0%,transparent 55%),radial-gradient(ellipse 55% 55% at 5% 95%,rgba(42,138,106,.14) 0%,transparent 50%),radial-gradient(ellipse 55% 55% at 95% 85%,rgba(13,51,40,.8) 0%,transparent 50%)" }} />
        <div className="h-grid-bg" />
        <div className="orb-a" /><div className="orb-b" />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 1, zIndex: 2, background: "linear-gradient(90deg,transparent,rgba(61,170,134,.6) 50%,transparent)" }} />

        <div style={{ position: "relative", zIndex: 4, width: "100%", maxWidth: 720, padding: "0 4px" }}>
          <div className="animate-fu" style={{ display: "inline-flex", alignItems: "center", gap: 7, border: "1px solid rgba(61,170,134,.26)", background: "rgba(61,170,134,.07)", color: "var(--glt)", fontSize: ".7rem", fontWeight: 700, padding: "5px 14px", borderRadius: 100, marginBottom: 18, letterSpacing: 2, textTransform: "uppercase" }}>
            <span className="dot-live" />
            النسخة الثالثة — 2026
          </div>

          <h1 className="animate-fu-1" style={{ fontFamily: "'Cairo',sans-serif", fontSize: "clamp(2.6rem,7vw,6rem)", fontWeight: 900, lineHeight: 1.05, color: "#fff", letterSpacing: -1, marginBottom: 16, textShadow: "0 4px 40px rgba(0,0,0,.3)" }}>
            <span style={{ display: "block", fontSize: ".42em", fontWeight: 800, letterSpacing: 3, color: "rgba(255,255,255,.7)", marginBottom: 4 }}>معرض التدريب الوطني</span>
            <span className="grad-text" style={{ letterSpacing: -2 }}>وجّه المستقبل</span>
            <span style={{ display: "block", fontSize: ".42em", fontWeight: 700, color: "rgba(255,255,255,.6)", marginTop: 6, letterSpacing: 1 }}>عبر فرص تدريب حقيقية</span>
          </h1>

          <div className="animate-fu-2" style={{ display: "flex", gap: 10, justifyContent: "center", marginBottom: 22, flexWrap: "wrap" }}>
            {stats.map(s => (
              <div key={s.l} style={{ background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.1)", borderRadius: 10, padding: "12px 16px", textAlign: "center", minWidth: 115 }}>
                <div style={{ fontFamily: "'Cairo',sans-serif", fontSize: "1.6rem", fontWeight: 900, color: "#fff", lineHeight: 1 }}>{s.n}</div>
                <div style={{ fontSize: ".64rem", color: "rgba(255,255,255,.44)", marginTop: 3 }}>{s.l}</div>
              </div>
            ))}
          </div>

          <div className="animate-fu-3" style={{ display: "inline-flex", border: "1px solid rgba(255,255,255,.1)", borderRadius: 9, overflow: "hidden", marginBottom: 26 }}>
            {[["سبتمبر 2026", "الموعد"], ["الرياض", "المدينة"], ["3 أيام", "المدة"]].map(([v, l]) => (
              <div key={l} style={{ padding: "11px 20px", textAlign: "center", borderLeft: "1px solid rgba(255,255,255,.08)" }}>
                <div style={{ fontFamily: "'Cairo',sans-serif", fontSize: "1rem", fontWeight: 900, color: "#fff", lineHeight: 1 }}>{v}</div>
                <div style={{ fontSize: ".6rem", color: "rgba(255,255,255,.36)", marginTop: 3 }}>{l}</div>
              </div>
            ))}
          </div>

          <div className="animate-fu-4" style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="#register" data-testid="btn-register-hero" style={{ background: "var(--green)", color: "#fff", padding: "13px 28px", border: "1px solid var(--glt)", borderRadius: 7, fontFamily: "'Tajawal',sans-serif", fontSize: ".9rem", fontWeight: 800, cursor: "pointer", transition: "all .3s", boxShadow: "0 4px 18px rgba(27,107,82,.35)", textDecoration: "none" }}
              onMouseOver={e => { e.currentTarget.style.background = "var(--gm)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseOut={e => { e.currentTarget.style.background = "var(--green)"; e.currentTarget.style.transform = "none"; }}
            >سجّل شركتك الآن</a>
            <a href="#why" data-testid="btn-learn-more" style={{ background: "rgba(255,255,255,.08)", color: "#fff", padding: "13px 22px", border: "1px solid rgba(255,255,255,.17)", borderRadius: 7, fontFamily: "'Tajawal',sans-serif", fontSize: ".9rem", fontWeight: 600, cursor: "pointer", transition: "all .3s", textDecoration: "none" }}
              onMouseOver={e => (e.currentTarget.style.background = "rgba(255,255,255,.13)")}
              onMouseOut={e => (e.currentTarget.style.background = "rgba(255,255,255,.08)")}
            >تعرف أكثر</a>
          </div>
        </div>

        <div style={{ position: "absolute", bottom: 22, left: "50%", transform: "translateX(-50%)", zIndex: 4 }}>
          <div className="scroll-line" />
        </div>
      </section>

      {/* ═══ STATS BAR ═══ */}
      <div style={{ background: "var(--green)", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10, padding: "14px clamp(14px,3vw,20px)", borderBottom: "3px solid var(--green2)", width: "100%" }}>
        {[
          { n: "+3000", l: "طالب يزور المعرض سنوياً" },
          { n: "+50", l: "جامعة وكلية مشاركة" },
          { n: "+80", l: "شركة عارضة في النسخ السابقة" },
          { n: "94%", l: "من الشركات تُعيد المشاركة" },
        ].map(s => (
          <div key={s.l} style={{ background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.12)", borderRadius: 10, padding: "18px 10px", textAlign: "center" }}>
            <div style={{ fontFamily: "'Cairo',sans-serif", fontSize: "1.75rem", fontWeight: 900, color: "#fff", lineHeight: 1 }}>{s.n}</div>
            <div style={{ fontSize: ".68rem", color: "rgba(255,255,255,.5)", marginTop: 5 }}>{s.l}</div>
          </div>
        ))}
      </div>

      {/* ═══ WHY SECTION ═══ */}
      <section id="why" style={{ padding: "78px 0", background: "var(--bg)", width: "100%" }}>
        <div style={{ maxWidth: 1220, margin: "0 auto", padding: "0 clamp(14px,4vw,52px)" }}>
          <RevealDiv>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 7, color: "var(--green)", fontSize: ".67rem", fontWeight: 800, letterSpacing: 3, textTransform: "uppercase", marginBottom: 10 }}>
              <span style={{ width: 12, height: 2, background: "var(--green)", display: "inline-block" }} />
              لماذا تشارك؟
            </div>
            <h2 style={{ fontFamily: "'Cairo',sans-serif", fontSize: "clamp(1.7rem,2.7vw,2.5rem)", fontWeight: 900, lineHeight: 1.15, color: "var(--ink)", marginBottom: 6 }}>
              استثمر في <em style={{ color: "var(--green)", fontStyle: "normal" }}>مستقبل</em> شركتك
            </h2>
            <p style={{ color: "var(--muted-c)", fontSize: ".84rem", marginTop: 7, maxWidth: 540 }}>
              المعرض منصة استراتيجية تجمع أفضل كفاءات المملكة بأبرز شركاتها في فضاء واحد متكامل.
            </p>
          </RevealDiv>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14, marginTop: 38 }}>
            {whyItems.map((item, i) => (
              <RevealDiv key={item.title} delay={i * 80}>
                <div data-testid={`why-card-${i}`} style={{ background: "var(--surf)", border: "1px solid var(--b1)", borderRadius: 12, padding: "24px 20px", transition: "all .3s cubic-bezier(.22,.68,0,1.2)", position: "relative", overflow: "hidden", height: "100%" }}
                  onMouseOver={e => { const el = e.currentTarget; el.style.transform = "translateY(-3px)"; el.style.boxShadow = "0 8px 22px rgba(27,107,82,.09)"; }}
                  onMouseOut={e => { const el = e.currentTarget; el.style.transform = "none"; el.style.boxShadow = "none"; }}
                >
                  <span style={{ fontSize: "1.6rem", marginBottom: 12, display: "block" }}>{item.icon}</span>
                  <div style={{ fontFamily: "'Cairo',sans-serif", fontSize: ".9rem", fontWeight: 800, color: "var(--ink)", marginBottom: 6 }}>{item.title}</div>
                  <div style={{ fontSize: ".8rem", color: "var(--muted-c)", lineHeight: 1.8 }}>{item.desc}</div>
                </div>
              </RevealDiv>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ BOOTH OPTIONS ═══ */}
      <section id="booth" style={{ padding: "78px 0", background: "var(--green4)", width: "100%" }}>
        <div style={{ maxWidth: 1220, margin: "0 auto", padding: "0 clamp(14px,4vw,52px)" }}>
          <RevealDiv>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 7, color: "rgba(255,255,255,.42)", fontSize: ".67rem", fontWeight: 800, letterSpacing: 3, textTransform: "uppercase", marginBottom: 10 }}>
              <span style={{ width: 12, height: 2, background: "rgba(255,255,255,.28)", display: "inline-block" }} />
              خيارات المشاركة
            </div>
            <h2 style={{ fontFamily: "'Cairo',sans-serif", fontSize: "clamp(1.7rem,2.7vw,2.5rem)", fontWeight: 900, lineHeight: 1.15, color: "#fff", marginBottom: 6 }}>
              اختر طريقة <em style={{ color: "var(--glt)", fontStyle: "normal" }}>مشاركتك</em>
            </h2>
            <p style={{ color: "rgba(255,255,255,.45)", fontSize: ".84rem", marginTop: 7, maxWidth: 540 }}>
              نوفر لك مرونة كاملة — سواء أردت إحضار بوثك الخاص أو الاستفادة من بوثنا الجاهز.
            </p>
          </RevealDiv>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginTop: 40 }}>
            {/* OPTION 1: Your Own Booth */}
            <RevealDiv delay={0}>
              <div
                data-testid="booth-option-own"
                className={`booth-card${boothChoice === BOOTH_OWN ? " selected" : ""}`}
                onClick={() => setBoothChoice(BOOTH_OWN)}
                style={{ cursor: "pointer" }}
              >
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 20 }}>
                  <div style={{ width: 56, height: 56, background: "linear-gradient(135deg,var(--green),var(--gm))", borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.6rem", flexShrink: 0 }}>🏗️</div>
                  <div>
                    {boothChoice === BOOTH_OWN && (
                      <span className="booth-badge">✓ تم الاختيار</span>
                    )}
                  </div>
                </div>
                <div style={{ fontFamily: "'Cairo',sans-serif", fontSize: "1.2rem", fontWeight: 900, color: "var(--ink)", marginBottom: 8 }}>
                  أحضر بوثك الخاص
                </div>
                <div style={{ fontSize: ".82rem", color: "var(--muted-c)", lineHeight: 1.9, marginBottom: 20 }}>
                  تمتلك تصميمك المميز؟ أحضر بوثك الكامل مع كل تجهيزاتك ومواد علامتك التجارية ليعكس هوية شركتك بالكامل.
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {["مساحة مخصصة تناسب تصميمك", "حرية كاملة في التجهيز والتصميم", "طاقم الكهرباء والخدمات متوفر", "لوحات الإرشاد والموقع مضمونة"].map(f => (
                    <div key={f} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: ".8rem", color: "var(--ink)" }}>
                      <span style={{ width: 18, height: 18, background: "var(--green)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: ".6rem", fontWeight: 900, flexShrink: 0 }}>✓</span>
                      {f}
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: 20, padding: "12px 14px", background: "rgba(27,107,82,.06)", borderRadius: 8, border: "1.5px dashed rgba(27,107,82,.25)", fontSize: ".8rem", color: "var(--green)", fontWeight: 600, textAlign: "center" }}>
                  الأنسب للشركات ذات الهوية البصرية القوية
                </div>
              </div>
            </RevealDiv>

            {/* OPTION 2: Provided Booth */}
            <RevealDiv delay={120}>
              <div
                data-testid="booth-option-provided"
                className={`booth-card${boothChoice === BOOTH_PROVIDED ? " selected" : ""}`}
                onClick={() => setBoothChoice(BOOTH_PROVIDED)}
                style={{ cursor: "pointer" }}
              >
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 20 }}>
                  <div style={{ width: 56, height: 56, background: "linear-gradient(135deg,var(--teal),#1A9E8A)", borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.6rem", flexShrink: 0 }}>✨</div>
                  <div style={{ display: "flex", gap: 6, flexDirection: "column", alignItems: "flex-end" }}>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 5, background: "linear-gradient(135deg,var(--teal),#1A9E8A)", color: "#fff", fontSize: ".6rem", fontWeight: 800, padding: "3px 9px", borderRadius: 100, letterSpacing: 1, textTransform: "uppercase" }}>الأكثر طلباً</span>
                    {boothChoice === BOOTH_PROVIDED && (
                      <span className="booth-badge">✓ تم الاختيار</span>
                    )}
                  </div>
                </div>
                <div style={{ fontFamily: "'Cairo',sans-serif", fontSize: "1.2rem", fontWeight: 900, color: "var(--ink)", marginBottom: 8 }}>
                  نوفر لك البوث كاملاً
                </div>
                <div style={{ fontSize: ".82rem", color: "var(--muted-c)", lineHeight: 1.9, marginBottom: 20 }}>
                  استفد من بنيتنا التحتية الجاهزة — بوث احترافي مُجهَّز بالكامل بشعار وألوان شركتك، بدون أي جهد لوجستي.
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {["بوث جاهز بتصميم احترافي", "طباعة شعارك وألوان علامتك", "طاولة وكراسي وشاشة عرض", "واي فاي وكهرباء وإضاءة", "خدمة دعم طوال أيام المعرض"].map(f => (
                    <div key={f} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: ".8rem", color: "var(--ink)" }}>
                      <span style={{ width: 18, height: 18, background: "var(--teal)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: ".6rem", fontWeight: 900, flexShrink: 0 }}>✓</span>
                      {f}
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: 20, padding: "12px 14px", background: "rgba(13,125,108,.06)", borderRadius: 8, border: "1.5px dashed rgba(13,125,108,.25)", fontSize: ".8rem", color: "var(--teal)", fontWeight: 600, textAlign: "center" }}>
                  الأنسب للشركات التي تريد الراحة التامة
                </div>
              </div>
            </RevealDiv>
          </div>
        </div>
      </section>

      {/* ═══ PACKAGES ═══ */}
      <section id="packages" style={{ padding: "78px 0", background: "var(--bg2)", width: "100%" }}>
        <div style={{ maxWidth: 1220, margin: "0 auto", padding: "0 clamp(14px,4vw,52px)" }}>
          <RevealDiv>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 7, color: "var(--green)", fontSize: ".67rem", fontWeight: 800, letterSpacing: 3, textTransform: "uppercase", marginBottom: 10 }}>
              <span style={{ width: 12, height: 2, background: "var(--green)", display: "inline-block" }} />
              باقات المشاركة
            </div>
            <h2 style={{ fontFamily: "'Cairo',sans-serif", fontSize: "clamp(1.7rem,2.7vw,2.5rem)", fontWeight: 900, lineHeight: 1.15, color: "var(--ink)", marginBottom: 6 }}>
              اختر <em style={{ color: "var(--green)", fontStyle: "normal" }}>باقتك</em> المناسبة
            </h2>
            <p style={{ color: "var(--muted-c)", fontSize: ".84rem", marginTop: 7 }}>
              باقات مرنة تناسب جميع أحجام الشركات — كل الباقات تشمل خيار البوث الخاص أو المقدَّم.
            </p>
          </RevealDiv>

          <div style={{ display: "flex", flexDirection: "column", gap: 18, marginTop: 42 }}>
            {[
              {
                cls: "pkg-green",
                name: "باقة البلاتينيوم",
                sub: "أعلى مستوى حضور وتأثير",
                color: "linear-gradient(135deg,#1B6B52,#2A8A6A)",
                features: [
                  ["بوث ممتاز في الموقع المركزي", "أفضل موقع في قلب المعرض"],
                  ["قبول غير محدود للسير الذاتية", "راجع ملفات الطلاب قبل المعرض"],
                  ["جلسة حوارية على المسرح الرئيسي", "30 دقيقة أمام جميع الحضور"],
                  ["نشر إعلاني على كل منصاتنا", "تغطية شاملة قبل وأثناء وبعد"],
                  ["لوحات إعلانية داخل القاعة", "4 لوحات بمواقع استراتيجية"],
                  ["تقرير تفصيلي ما بعد المعرض", "بيانات تفاعل وإحصائيات كاملة"],
                ],
                tagline: "الخيار الاستراتيجي للشركات الكبرى",
              },
              {
                cls: "pkg-teal",
                name: "باقة الذهبية",
                sub: "توازن مثالي بين الحضور والتكلفة",
                color: "linear-gradient(135deg,#0D7D6C,#1A9E8A)",
                features: [
                  ["بوث واسع في موقع مميز", "موقع بارز ضمن المعرض"],
                  ["قبول 200 سيرة ذاتية", "من أبرز الطلاب المتقدمين"],
                  ["جلسة نقاشية 20 دقيقة", "على المسرح الفرعي"],
                  ["نشر على منصاتنا الرسمية", "قبل وأثناء المعرض"],
                  ["لوحتا إعلانية داخل القاعة", "موقعان مميزان"],
                  ["ملخص تقرير ما بعد المعرض", "إحصائيات أساسية"],
                ],
                tagline: "الخيار الأمثل للشركات المتوسطة والكبيرة",
              },
              {
                cls: "pkg-green",
                name: "باقة الفضية",
                sub: "انطلاقة قوية بميزانية مرنة",
                color: "linear-gradient(135deg,#2A4838,#1B6B52)",
                features: [
                  ["بوث قياسي في موقع جيد", "تواجد فعلي في المعرض"],
                  ["قبول 80 سيرة ذاتية", "من الطلاب المهتمين"],
                  ["ذكر شفهي على المسرح", "خلال جلسات المعرض"],
                  ["نشر على منصاتنا الرسمية", "إعلان قبل المعرض"],
                  ["لوحة إعلانية واحدة", "موقع ضمن المعرض"],
                ],
                tagline: "مدخل مثالي للشركات الناشئة والمتوسطة",
              },
            ].map((pkg) => (
              <RevealDiv key={pkg.name}>
                <div style={{ borderRadius: 14, overflow: "hidden", boxShadow: "0 2px 16px rgba(0,0,0,.07)", transition: "transform .3s,box-shadow .3s" }}
                  data-testid={`package-${pkg.name}`}
                  onMouseOver={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 28px rgba(0,0,0,.11)"; }}
                  onMouseOut={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 2px 16px rgba(0,0,0,.07)"; }}
                >
                  <div className={`pkg-header`} style={{ padding: "22px 26px 20px", background: pkg.color }}>
                    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
                      <div>
                        <div style={{ fontFamily: "'Cairo',sans-serif", fontSize: "1.35rem", fontWeight: 900, color: "#fff", lineHeight: 1.15 }}>{pkg.name}</div>
                        <div style={{ fontSize: ".72rem", fontWeight: 600, color: "rgba(255,255,255,.75)", marginTop: 3 }}>{pkg.sub}</div>
                      </div>
                      <div style={{ background: "rgba(255,255,255,.15)", border: "1px solid rgba(255,255,255,.25)", borderRadius: 10, padding: "10px 16px", textAlign: "center", flexShrink: 0 }}>
                        <div style={{ fontSize: ".66rem", color: "rgba(255,255,255,.7)", marginBottom: 3 }}>تواصل للسعر</div>
                        <div style={{ fontFamily: "'Cairo',sans-serif", fontSize: ".85rem", fontWeight: 800, color: "#fff" }}>حسب الباقة</div>
                      </div>
                    </div>
                  </div>
                  <div style={{ background: "#fff", padding: "22px 26px" }}>
                    <div style={{ fontFamily: "'Cairo',sans-serif", fontSize: ".88rem", fontWeight: 800, color: "var(--ink)", marginBottom: 3 }}>ما تحصل عليه</div>
                    <div style={{ height: 1.5, background: "linear-gradient(90deg,var(--green),transparent)", marginBottom: 16, borderRadius: 2 }} />
                    <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                      {pkg.features.map(([main, desc]) => (
                        <div key={main} style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "10px 0", borderBottom: "1px solid rgba(0,0,0,.055)" }}>
                          <span style={{ width: 20, height: 20, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1, fontSize: ".66rem", fontWeight: 900, color: "#fff", background: pkg.cls === "pkg-teal" ? "var(--teal)" : "var(--green)" }}>✓</span>
                          <div>
                            <div style={{ fontSize: ".85rem", fontWeight: 700, color: "var(--ink)", fontFamily: "'Cairo',sans-serif", lineHeight: 1.3 }}>{main}</div>
                            <div style={{ fontSize: ".71rem", color: "var(--muted-c)", lineHeight: 1.4, marginTop: 1 }}>{desc}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div style={{ padding: "12px 26px 18px", background: pkg.cls === "pkg-teal" ? "#EDFAF6" : "#EDFAF5" }}>
                    <div style={{ fontSize: ".8rem", fontWeight: 600, textAlign: "center", padding: "11px 14px", borderRadius: 8, border: `1.5px dashed ${pkg.cls === "pkg-teal" ? "rgba(13,125,108,.35)" : "rgba(27,107,82,.35)"}`, color: pkg.cls === "pkg-teal" ? "#0A5C4F" : "#0D3328", background: pkg.cls === "pkg-teal" ? "rgba(13,125,108,.05)" : "rgba(27,107,82,.05)", lineHeight: 1.55 }}>
                      {pkg.tagline}
                    </div>
                  </div>
                </div>
              </RevealDiv>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ WHO ATTENDS ═══ */}
      <section style={{ padding: "78px 0", background: "var(--green4)", width: "100%" }}>
        <div style={{ maxWidth: 1220, margin: "0 auto", padding: "0 clamp(14px,4vw,52px)" }}>
          <RevealDiv>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 7, color: "rgba(255,255,255,.42)", fontSize: ".67rem", fontWeight: 800, letterSpacing: 3, textTransform: "uppercase", marginBottom: 10 }}>
              <span style={{ width: 12, height: 2, background: "rgba(255,255,255,.28)", display: "inline-block" }} />
              من يحضر المعرض؟
            </div>
            <h2 style={{ fontFamily: "'Cairo',sans-serif", fontSize: "clamp(1.7rem,2.7vw,2.5rem)", fontWeight: 900, lineHeight: 1.15, color: "#fff", marginBottom: 6 }}>
              طلاب <em style={{ color: "var(--glt)", fontStyle: "normal" }}>متحمسون</em> يبحثون عنك
            </h2>
          </RevealDiv>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 13, marginTop: 38 }}>
            {[
              { icon: "💻", t: "علوم الحاسب والبرمجة", d: "مطورون وأخصائيو تقنية المعلومات" },
              { icon: "📊", t: "إدارة الأعمال والتسويق", d: "قادة مستقبليون وخبراء تسويق" },
              { icon: "⚙️", t: "الهندسة بتخصصاتها", d: "مهندسون في مجالات متنوعة" },
              { icon: "🎨", t: "التصميم والإبداع", d: "مصممون جرافيك وUX/UI" },
              { icon: "📉", t: "المالية والمحاسبة", d: "محاسبون وخبراء مالية" },
              { icon: "⚗️", t: "العلوم والتقنية", d: "باحثون وأخصائيو المختبرات" },
              { icon: "🏥", t: "الرعاية الصحية", d: "طلاب طب وعلوم الصحة" },
              { icon: "📋", t: "الموارد البشرية", d: "أخصائيو الإدارة والتطوير" },
            ].map((item, i) => (
              <RevealDiv key={item.t} delay={i * 60}>
                <div style={{ background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.08)", borderRadius: 12, padding: "20px 16px", textAlign: "center", transition: "all .3s cubic-bezier(.22,.68,0,1.2)" }}
                  onMouseOver={e => { e.currentTarget.style.background = "rgba(255,255,255,.07)"; e.currentTarget.style.borderColor = "rgba(61,170,134,.25)"; e.currentTarget.style.transform = "translateY(-3px)"; }}
                  onMouseOut={e => { e.currentTarget.style.background = "rgba(255,255,255,.04)"; e.currentTarget.style.borderColor = "rgba(255,255,255,.08)"; e.currentTarget.style.transform = "none"; }}
                >
                  <span style={{ fontSize: "1.6rem", display: "block", marginBottom: 10 }}>{item.icon}</span>
                  <div style={{ fontFamily: "'Cairo',sans-serif", fontSize: ".88rem", fontWeight: 800, color: "#fff", marginBottom: 6, lineHeight: 1.3 }}>{item.t}</div>
                  <div style={{ fontSize: ".72rem", color: "rgba(255,255,255,.42)", lineHeight: 1.7 }}>{item.d}</div>
                </div>
              </RevealDiv>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA / CONTACT ═══ */}
      <section style={{ background: "linear-gradient(135deg,var(--green3),var(--green4))", padding: "72px 0", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 80% at 50% 50%,rgba(27,107,82,.15) 0%,transparent 70%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 500, margin: "0 auto", padding: "0 clamp(14px,4vw,52px)", textAlign: "center", position: "relative", zIndex: 2 }}>
          <RevealDiv>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(61,170,134,.1)", border: "1px solid rgba(61,170,134,.22)", color: "var(--glt)", fontSize: ".7rem", fontWeight: 700, padding: "6px 16px", borderRadius: 100, marginBottom: 20, letterSpacing: 2, textTransform: "uppercase" }}>
              <span className="dot-live" />
              تسجيل مبكر مفتوح
            </div>
            <h2 style={{ fontFamily: "'Cairo',sans-serif", fontSize: "clamp(1.8rem,3.5vw,2.6rem)", fontWeight: 900, color: "#fff", lineHeight: 1.2, marginBottom: 12 }}>
              هل أنت مستعد لاستقطاب <em style={{ color: "var(--glt)", fontStyle: "normal" }}>أفضل المواهب</em>؟
            </h2>
            <p style={{ fontSize: ".9rem", color: "rgba(255,255,255,.55)", lineHeight: 1.9, marginBottom: 30, maxWidth: 520, margin: "0 auto 30px" }}>
              فريقنا جاهز للإجابة على جميع استفساراتكم ومساعدتكم في اختيار الباقة الأنسب.
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <a href="https://wa.me/966500000000" target="_blank" rel="noreferrer" data-testid="btn-whatsapp" style={{ display: "inline-flex", alignItems: "center", gap: 9, background: "#25D366", color: "#fff", padding: "14px 28px", borderRadius: 8, fontFamily: "'Tajawal',sans-serif", fontSize: ".9rem", fontWeight: 800, textDecoration: "none", transition: "all .3s" }}
                onMouseOver={e => { e.currentTarget.style.background = "#1ebe5a"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseOut={e => { e.currentTarget.style.background = "#25D366"; e.currentTarget.style.transform = "none"; }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                تواصل عبر واتساب
              </a>
              <a href="#register" data-testid="btn-register-cta" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,.07)", color: "#fff", padding: "14px 24px", borderRadius: 8, fontFamily: "'Tajawal',sans-serif", fontSize: ".9rem", fontWeight: 600, textDecoration: "none", transition: "all .3s", border: "1px solid rgba(255,255,255,.15)" }}
                onMouseOver={e => (e.currentTarget.style.background = "rgba(255,255,255,.12)")}
                onMouseOut={e => (e.currentTarget.style.background = "rgba(255,255,255,.07)")}
              >
                سجّل الآن
              </a>
            </div>
          </RevealDiv>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section style={{ padding: "78px 0", background: "var(--bg)", width: "100%" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 clamp(14px,4vw,52px)" }}>
          <RevealDiv>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 7, color: "var(--green)", fontSize: ".67rem", fontWeight: 800, letterSpacing: 3, textTransform: "uppercase", marginBottom: 10 }}>
              <span style={{ width: 12, height: 2, background: "var(--green)", display: "inline-block" }} />
              الأسئلة الشائعة
            </div>
            <h2 style={{ fontFamily: "'Cairo',sans-serif", fontSize: "clamp(1.7rem,2.7vw,2.5rem)", fontWeight: 900, lineHeight: 1.15, color: "var(--ink)", marginBottom: 6 }}>
              أسئلة <em style={{ color: "var(--green)", fontStyle: "normal" }}>الشركات</em> الشائعة
            </h2>
          </RevealDiv>

          <div style={{ marginTop: 34 }}>
            {faqs.map((faq, i) => (
              <div key={i} data-testid={`faq-item-${i}`} className={faqOpen === i ? "faq-open" : ""} style={{ background: "var(--surf)", border: "1px solid var(--b1)", borderRadius: 10, overflow: "hidden", transition: "border-color .25s", marginBottom: 9 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "15px 18px", cursor: "pointer", fontFamily: "'Cairo',sans-serif", fontSize: ".9rem", fontWeight: 800, color: "var(--ink)", userSelect: "none", gap: 10 }}
                  onClick={() => setFaqOpen(faqOpen === i ? null : i)}>
                  {faq.q}
                  <span className="faq-icon-btn" style={{ width: 21, height: 21, background: "var(--b1)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: "var(--green)", fontSize: ".9rem", fontWeight: 900, lineHeight: 1 }}>
                    +
                  </span>
                </div>
                <div className="faq-answer" style={{ fontSize: ".82rem", color: "var(--muted-c)", lineHeight: 1.8 }}>
                  {faq.a}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ REGISTRATION FORM ═══ */}
      <section id="register" style={{ padding: "78px 0", background: "var(--green3)", width: "100%" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 clamp(14px,4vw,52px)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "start" }}>
            <RevealDiv>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 7, color: "rgba(255,255,255,.42)", fontSize: ".67rem", fontWeight: 800, letterSpacing: 3, textTransform: "uppercase", marginBottom: 10 }}>
                <span style={{ width: 12, height: 2, background: "rgba(255,255,255,.28)", display: "inline-block" }} />
                التسجيل في المعرض
              </div>
              <h2 style={{ fontFamily: "'Cairo',sans-serif", fontSize: "clamp(1.7rem,2.7vw,2.5rem)", fontWeight: 900, lineHeight: 1.15, color: "#fff", marginBottom: 6 }}>
                سجّل <em style={{ color: "var(--glt)", fontStyle: "normal" }}>شركتك</em> الآن
              </h2>
              <p style={{ color: "rgba(255,255,255,.5)", fontSize: ".88rem", lineHeight: 1.85, marginBottom: 22 }}>
                أكمل النموذج وسيتواصل معك فريقنا خلال 24 ساعة لتأكيد المشاركة وتوضيح التفاصيل.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
                {[
                  { icon: "📞", lbl: "الهاتف", val: "+966 50 000 0000" },
                  { icon: "📧", lbl: "البريد الإلكتروني", val: "sponsors@internshipexpo.sa" },
                  { icon: "📍", lbl: "المقر", val: "الرياض، المملكة العربية السعودية" },
                ].map(c => (
                  <div key={c.lbl} style={{ display: "flex", gap: 11, alignItems: "center", background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.08)", borderRadius: 9, padding: "13px 14px" }}>
                    <div style={{ width: 36, height: 36, background: "rgba(61,170,134,.11)", border: "1px solid rgba(61,170,134,.19)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: ".88rem", flexShrink: 0 }}>{c.icon}</div>
                    <div>
                      <div style={{ fontSize: ".62rem", color: "rgba(255,255,255,.3)", marginBottom: 1 }}>{c.lbl}</div>
                      <div style={{ fontSize: ".83rem", fontWeight: 700, color: "#fff" }}>{c.val}</div>
                    </div>
                  </div>
                ))}
              </div>
            </RevealDiv>

            <RevealDiv delay={100}>
              <div style={{ background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.08)", borderRadius: 13, padding: 28, width: "100%" }}>
                <div style={{ fontFamily: "'Cairo',sans-serif", fontSize: ".95rem", fontWeight: 900, color: "#fff", marginBottom: 18 }}>بيانات التسجيل</div>

                {submitted ? (
                  <div style={{ textAlign: "center", padding: "40px 20px" }}>
                    <div style={{ fontSize: "3rem", marginBottom: 12 }}>✅</div>
                    <div style={{ fontFamily: "'Cairo',sans-serif", fontSize: "1.1rem", fontWeight: 800, color: "#fff", marginBottom: 8 }}>تم استلام طلبكم!</div>
                    <div style={{ fontSize: ".82rem", color: "rgba(255,255,255,.5)" }}>سيتواصل معكم فريقنا خلال 24 ساعة.</div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    {/* Booth choice recap */}
                    {boothChoice && (
                      <div style={{ marginBottom: 14, padding: "10px 14px", background: "rgba(61,170,134,.08)", border: "1px solid rgba(61,170,134,.2)", borderRadius: 8, fontSize: ".8rem", color: "var(--glt)", fontWeight: 600 }}>
                        ✓ اخترت: {boothChoice === BOOTH_OWN ? "إحضار البوث الخاص" : "الاستفادة من البوث المقدَّم"}
                      </div>
                    )}

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 10 }}>
                      {[
                        { label: "اسم الشركة *", key: "company", placeholder: "اسم شركتك", required: true },
                        { label: "اسم المسؤول *", key: "name", placeholder: "الاسم الكامل", required: true },
                        { label: "رقم الجوال *", key: "phone", placeholder: "+966 5X XXX XXXX", required: true, type: "tel" },
                        { label: "البريد الإلكتروني *", key: "email", placeholder: "email@company.com", required: true, type: "email" },
                      ].map(field => (
                        <div key={field.key} style={{ marginBottom: 0 }}>
                          <label style={{ display: "block", fontSize: ".7rem", color: "rgba(255,255,255,.34)", marginBottom: 4, fontWeight: 600 }}>{field.label}</label>
                          <input
                            data-testid={`input-${field.key}`}
                            type={field.type || "text"}
                            required={field.required}
                            placeholder={field.placeholder}
                            value={(formData as Record<string, string>)[field.key]}
                            onChange={e => setFormData(prev => ({ ...prev, [field.key]: e.target.value }))}
                            style={{ width: "100%", background: "rgba(255,255,255,.07)", border: "1px solid rgba(255,255,255,.12)", borderRadius: 8, padding: "11px 13px", color: "#fff", fontFamily: "'Tajawal',sans-serif", fontSize: ".88rem", outline: "none", transition: "all .3s", direction: "rtl" }}
                            onFocus={e => { e.currentTarget.style.borderColor = "var(--glt)"; e.currentTarget.style.background = "rgba(255,255,255,.1)"; }}
                            onBlur={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,.12)"; e.currentTarget.style.background = "rgba(255,255,255,.07)"; }}
                          />
                        </div>
                      ))}
                    </div>

                    <div style={{ marginBottom: 10 }}>
                      <label style={{ display: "block", fontSize: ".7rem", color: "rgba(255,255,255,.34)", marginBottom: 4, fontWeight: 600 }}>قطاع الشركة</label>
                      <select
                        data-testid="select-sector"
                        value={formData.sector}
                        onChange={e => setFormData(prev => ({ ...prev, sector: e.target.value }))}
                        style={{ width: "100%", background: "rgba(255,255,255,.07)", border: "1px solid rgba(255,255,255,.12)", borderRadius: 8, padding: "11px 13px", color: formData.sector ? "#fff" : "rgba(255,255,255,.3)", fontFamily: "'Tajawal',sans-serif", fontSize: ".88rem", outline: "none", transition: "all .3s", direction: "rtl" }}>
                        <option value="" style={{ background: "#0D3328" }}>اختر القطاع</option>
                        {["تقنية المعلومات", "المال والبنوك", "الاتصالات", "الصناعة والطاقة", "الرعاية الصحية", "التجزئة والتسويق", "التعليم", "الاستشارات", "أخرى"].map(s => (
                          <option key={s} value={s} style={{ background: "#0D3328", color: "#fff" }}>{s}</option>
                        ))}
                      </select>
                    </div>

                    <div style={{ marginBottom: 10 }}>
                      <label style={{ display: "block", fontSize: ".7rem", color: "rgba(255,255,255,.34)", marginBottom: 4, fontWeight: 600 }}>خيار البوث</label>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                        {[["own", "🏗️ أحضر بوثي الخاص"], ["provided", "✨ أريد بوثاً مقدَّماً"]].map(([val, label]) => (
                          <div key={val} data-testid={`booth-select-${val}`}
                            onClick={() => setBoothChoice(val as "own" | "provided")}
                            style={{ padding: "10px 12px", borderRadius: 8, border: `1.5px solid ${boothChoice === val ? "var(--glt)" : "rgba(255,255,255,.12)"}`, background: boothChoice === val ? "rgba(61,170,134,.1)" : "rgba(255,255,255,.04)", cursor: "pointer", fontSize: ".78rem", fontWeight: 600, color: boothChoice === val ? "var(--glt)" : "rgba(255,255,255,.6)", transition: "all .25s", textAlign: "center" }}>
                            {label}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div style={{ marginBottom: 12 }}>
                      <label style={{ display: "block", fontSize: ".7rem", color: "rgba(255,255,255,.34)", marginBottom: 4, fontWeight: 600 }}>العدد المتوقع للمتدربين</label>
                      <select
                        data-testid="select-trainee-count"
                        value={formData.traineeCount}
                        onChange={e => setFormData(prev => ({ ...prev, traineeCount: e.target.value }))}
                        style={{ width: "100%", background: "rgba(255,255,255,.07)", border: "1px solid rgba(255,255,255,.12)", borderRadius: 8, padding: "11px 13px", color: formData.traineeCount ? "#fff" : "rgba(255,255,255,.3)", fontFamily: "'Tajawal',sans-serif", fontSize: ".88rem", outline: "none", direction: "rtl" }}>
                        <option value="" style={{ background: "#0D3328" }}>حدد العدد</option>
                        {["1-5 متدربين", "6-15 متدرباً", "16-30 متدرباً", "أكثر من 30"].map(s => (
                          <option key={s} value={s} style={{ background: "#0D3328", color: "#fff" }}>{s}</option>
                        ))}
                      </select>
                    </div>

                    <div style={{ marginBottom: 14 }}>
                      <label style={{ display: "block", fontSize: ".7rem", color: "rgba(255,255,255,.34)", marginBottom: 4, fontWeight: 600 }}>ملاحظات إضافية</label>
                      <textarea
                        data-testid="textarea-message"
                        placeholder="أي متطلبات أو أسئلة إضافية..."
                        value={formData.message}
                        onChange={e => setFormData(prev => ({ ...prev, message: e.target.value }))}
                        style={{ width: "100%", background: "rgba(255,255,255,.07)", border: "1px solid rgba(255,255,255,.12)", borderRadius: 8, padding: "11px 13px", color: "#fff", fontFamily: "'Tajawal',sans-serif", fontSize: ".88rem", outline: "none", resize: "vertical", minHeight: 70, direction: "rtl" }}
                        onFocus={e => { e.currentTarget.style.borderColor = "var(--glt)"; }}
                        onBlur={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,.12)"; }}
                      />
                    </div>

                    <button type="submit" data-testid="btn-submit" style={{ width: "100%", background: "var(--green)", color: "#fff", border: "1px solid var(--glt)", borderRadius: 8, padding: 13, fontFamily: "'Tajawal',sans-serif", fontSize: ".9rem", fontWeight: 800, cursor: "pointer", transition: "all .3s" }}
                      onMouseOver={e => { e.currentTarget.style.background = "var(--gm)"; e.currentTarget.style.transform = "translateY(-1px)"; }}
                      onMouseOut={e => { e.currentTarget.style.background = "var(--green)"; e.currentTarget.style.transform = "none"; }}
                    >
                      إرسال طلب التسجيل
                    </button>
                  </form>
                )}
              </div>
            </RevealDiv>
          </div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer style={{ background: "var(--green4)", borderTop: "1px solid rgba(61,170,134,.08)", padding: "22px clamp(14px,4vw,48px)", width: "100%" }}>
        <div style={{ maxWidth: 1220, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 11 }}>
          <div>
            <div style={{ fontFamily: "'Cairo',sans-serif", fontSize: ".87rem", fontWeight: 900, color: "rgba(255,255,255,.63)" }}>معرض التدريب الوطني</div>
            <div style={{ fontSize: ".62rem", color: "rgba(255,255,255,.22)", fontFamily: "'Tajawal',sans-serif", marginTop: 2 }}>Internship Expo — جسر بين الكفاءات والشركات</div>
          </div>
          <div style={{ color: "rgba(255,255,255,.18)", fontSize: ".66rem" }}>© 2026 معرض التدريب. جميع الحقوق محفوظة.</div>
          <div style={{ textAlign: "left" }}>
            <div style={{ fontSize: ".72rem", color: "rgba(255,255,255,.34)" }}>بالتوفيق لجميع المتدربين</div>
            <div style={{ fontSize: ".6rem", color: "rgba(255,255,255,.2)", marginTop: 2 }}>صنع في المملكة العربية السعودية 🇸🇦</div>
          </div>
        </div>
      </footer>

      {/* ═══ WhatsApp Float ═══ */}
      <a href="https://wa.me/966500000000" target="_blank" rel="noreferrer" data-testid="btn-whatsapp-float" style={{ position: "fixed", bottom: 20, left: 20, zIndex: 600, width: 52, height: 52, background: "#25D366", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 14px rgba(37,211,102,.42)", transition: "all .3s", textDecoration: "none" }}
        onMouseOver={e => { e.currentTarget.style.transform = "scale(1.1)"; e.currentTarget.style.boxShadow = "0 6px 22px rgba(37,211,102,.58)"; }}
        onMouseOut={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 4px 14px rgba(37,211,102,.42)"; }}
      >
        <svg width="25" height="25" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
      </a>
    </div>
  );
}
