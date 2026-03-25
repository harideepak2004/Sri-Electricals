import "./App.css";
import { useRef, useEffect, useState } from "react";

// ─── Data ────────────────────────────────────────────────────────────────────

const categories = [
  { icon: "/images/Icons/Wires & Cables.svg", title: "Wires & Cables", desc: "Branded copper wires, flexible cables, control cables, and more — for residential and industrial use." },
  { icon: "/images/Icons/Switchgears.svg", title: "Switchgears", desc: "MCCBs, isolators, MCBs, DB boxes, and panel boards from top-rated brands." },
  { icon: "/images/Icons/Switches.svg", title: "Switches", desc: "Modular switches, sockets, and accessories — ideal for modern interiors and commercial spaces." },
  { icon: "/images/Icons/LED Profile & Lights.svg", title: "LED Profile & Lights", desc: "Ceiling lights, LED panels, flood lights, spotlights, and decorative fixtures." },
  { icon: "/images/Icons/Instruments & Meters.svg", title: "Instruments & Meters", desc: "Digital meters, voltmeters, ammeters, timers, and energy monitoring devices." },
  { icon: "/images/Icons/Tools.svg", title: "Tools", desc: "Power tools, hand tools, drill bits, and accessories for electrical, plumbing, and general installation." },
  { icon: "/images/Icons/Hardware.svg", title: "Hardware", desc: "Fasteners, screws, clamps, tapes, and anchors for safe and secure installations." },
  { icon: "/images/Icons/Plumbing.svg", title: "Plumbing", desc: "CPVC pipes, taps, elbows, valves, and fittings — for domestic and commercial use." },
];

const brandImages = Array.from({ length: 29 }, (_, i) => `/images/Brands/${i + 1}.jpg`);

const industrySlides = [
  [
    { img: "/images/Industries We Serve - Banners/Infrastructure Projects.svg", title: "Infrastructure Projects", desc: "For metro, highway, and smart city works — find rugged cabling, outdoor floodlights, and panel boards designed to perform in open-site conditions." },
    { img: "/images/Industries We Serve - Banners/It Companies.svg", title: "IT Companies", desc: "IT parks and offices need reliable wiring and metering. We supply branded network cables, backup solutions, DBs, and panels for consistent and safe performance." },
    { img: "/images/Industries We Serve - Banners/Co Working Space.svg", title: "Co Working Space", desc: "Shared workspaces require safe, efficient fittings. We provide lighting, switches, sockets, fans, and plumbing essentials tailored for co-working infrastructure." },
  ],
  [
    { img: "/images/Industries We Serve - Banners/Architect & Interiors.svg", title: "Architect & Interiors", desc: "We support designers with stylish lights, modular switches, concealed boxes, and ceiling fans — ideal for modern, functional and aesthetic interior setups." },
    { img: "/images/Industries We Serve - Banners/MEP Contractor.svg", title: "MEP Contractor", desc: "We supply certified wires, switchgear, digital meters, pipes, and DB boxes — all trusted by MEP contractors for bulk supply and project readiness." },
    { img: "/images/Industries We Serve - Banners/Manufacturing Industries.svg", title: "Manufacturing Industries", desc: "Factories and warehouses require high-load support. We offer industrial-grade fans, cables, isolators, and plumbing materials for demanding applications." },
  ],
  [
    { img: "/images/Industries We Serve - Banners/Commercial Buildings.svg", title: "Commercial Buildings", desc: "Offices, retail spaces, and malls need efficient electrical and plumbing setups. We supply modular fittings, lighting solutions, DB boxes, and energy meters tailored for commercial loads." },
    { img: "/images/Industries We Serve - Banners/Contractors & Builders.svg", title: "Contractors & Builders", desc: "Your go-to supply partner for large-scale construction projects — wires, pipes, switches, panels, and everything in between. Bulk deals and dependable delivery timelines." },
    { img: "/images/Industries We Serve - Banners/Healthcare Facilities.svg", title: "Healthcare Facilities", desc: "Hospitals and labs require reliable electrical performance and backup systems. We offer MCBs, control panels, timers, and fittings compliant with high-precision environments." },
  ],
];

const whyBanners = [
  "/images/Why Choose Us - Banners/Banner 1.svg",
  "/images/Why Choose Us - Banners/Banner 2.svg",
  "/images/Why Choose Us - Banners/Banner 3.svg",
  "/images/Why Choose Us - Banners/Banner 4.svg",
  "/images/Why Choose Us - Banners/Banner 5.svg",
];

const testimonials = [
  { text: "Got branded wires and switches for our flat. Owner was very polite. Explained wire load properly. Reasonable pricing. Billing was clean. Nalla experience.", name: "Karthikeyan", role: "Project Manager" },
  { text: "Na romba places la poi paathen. But finally found proper plumbing elbows, taps and couplers here. Even for rare sizes. Very helpful anna at the counter.", name: "Ramesh", role: "Electrical Contractor" },
  { text: "Got Finolex CPVC pipes and fittings for my bathroom renovation. All sizes were available in stock and pricing was better than nearby stores in Parry's. Even for small quantities, they gave proper billing and packed it well. Highly recommend for genuine plumbing materials.", name: "Pranav", role: "Facility Admin" },
  { text: "Top shop for all electrical materials. From LED lights to branded wires and modular switches, they have full range. I also got some plumbing connectors for bathroom work. Service is very decent and they don't push unnecessary items.", name: "Arun", role: "Site Engineer" },
  { text: "Oru kitta rendu kitta ellam illai. Sri Ambaajee la ellam ready-a irundhudhu. Took GI pipes, wall lights, 2 fans, plus full set of switchgear. Billing also quick.", name: "Vignesh", role: "Interior Consultant" },
];

// ─── Hooks ────────────────────────────────────────────────────────────────────

// Full-width single-slide infinite slider (Industries)
function useSingleSlider(items) {
  const total = items.length;
  const trackRef = useRef(null);
  const posRef = useRef(1);
  const animRef = useRef(false);
  // Clone last item at front, first item at back for seamless looping
  const extended = [items[total - 1], ...items, items[0]];

  useEffect(() => {
    const t = trackRef.current;
    if (!t) return;
    t.style.transition = "none";
    t.style.transform = "translateX(-100%)";
  }, []);

  const go = (pos, animate = true) => {
    const t = trackRef.current;
    if (!t) return;
    posRef.current = pos;
    t.style.transition = animate ? "transform 0.5s ease" : "none";
    t.style.transform = `translateX(-${pos * 100}%)`;
  };

  const onEnd = () => {
    const p = posRef.current;
    if (p === 0) go(total, false);
    else if (p === total + 1) go(1, false);
    animRef.current = false;
  };

  const prev = () => { if (animRef.current) return; animRef.current = true; go(posRef.current - 1); };
  const next = () => { if (animRef.current) return; animRef.current = true; go(posRef.current + 1); };

  return { extended, prev, next, trackRef, onEnd };
}

// Multi-card infinite slider (Why = 3 visible, Testimonials = 2 visible)
// Uses CSS variables + calc() so card sizes are always correct
// The key insight: each card is calc((100% - gaps) / visible)
// translateX steps by that same amount using JS to measure the card's actual px width
function useMultiSlider(items, visible) {
  const total = items.length;
  const trackRef = useRef(null);
  const cardRef = useRef(null); // ref on first card to measure its width
  const posRef = useRef(1); // start at index 1 (first real item, after 1 clone)
  const animRef = useRef(false);

  // Clone only 1 item at each end — enough for seamless loop
  const extended = [items[total - 1], ...items, items[0]];

  const getStepPx = () => {
    if (!cardRef.current) return 0;
    // step = card outer width including gap (gap is set via CSS column-gap)
    const track = trackRef.current;
    const gap = track ? parseFloat(getComputedStyle(track).columnGap) || 0 : 0;
    return cardRef.current.offsetWidth + gap;
  };

  const go = (pos, animate = true) => {
    const t = trackRef.current;
    if (!t) return;
    const step = getStepPx();
    if (!step) return;
    posRef.current = pos;
    t.style.transition = animate ? "transform 0.5s ease" : "none";
    t.style.transform = `translateX(-${pos * step}px)`;
  };

  // Set initial position after first render (cards have been sized by CSS by then)
  useEffect(() => {
    // rAF ensures CSS has painted and offsetWidth is available
    const id = requestAnimationFrame(() => go(1, false)); // position 1 = first real item
    const onResize = () => go(posRef.current, false);
    window.addEventListener("resize", onResize);
    return () => { cancelAnimationFrame(id); window.removeEventListener("resize", onResize); };
  }, []);

  const onEnd = () => {
    const p = posRef.current;
    if (p === 0) go(total, false);           // was on before-clone → jump to real last
    else if (p === total + 1) go(1, false);  // was on after-clone  → jump to real first
    animRef.current = false;
  };

  const prev = () => { if (animRef.current) return; animRef.current = true; go(posRef.current - 1); };
  const next = () => { if (animRef.current) return; animRef.current = true; go(posRef.current + 1); };

  return { extended, prev, next, trackRef, cardRef, onEnd };
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function SectionHeader({ title, subtitle }) {
  return (
    <div className="header1">
      <h2><span className="red-line"></span>{title}</h2>
      {subtitle && <h5>{subtitle}</h5>}
    </div>
  );
}

function Navbar() {
  return (
    <div className="nav-container">
      <nav className="nav">
        <div className="nav-content">
          <img src="/images/sri-electricals.png" alt="Ambaajee Logo" className="logo" />
          <h1 className="site-name">Sri Electricals</h1>
          <div className="nav-buttons">
            <a href="#contact" className="btn-outline">Contact Us Today</a>
            <a href="https://maps.google.com/?q=Ktc nagar+Thoothukudi" target="_blank" rel="noreferrer" className="btn-solid">Get Direction</a>
          </div>
        </div>
      </nav>
    </div>
  );
}

function Hero() {
  return (
    <section className="hero">
      <div className="img-wrapper">
        <img src="/images/Hero Banner.svg" alt="hero" />
      </div>
    </section>
  );
}

function Categories() {
  return (
    <section className="categories">
      <SectionHeader title="Product Categories" subtitle="Explore Our Full Range of Certified Electrical Supplies" />
      <div className="categories-grid">
        {categories.map((cat) => (
          <div className="category-card" key={cat.title}>
            <div className="icon-circle"><img src={cat.icon} alt={cat.title} /></div>
            <h3>{cat.title}</h3>
            <p>{cat.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function BrandMarquee() {
  const all = [...brandImages, ...brandImages];
  return (
    <section className="brand-marquee">
      <SectionHeader title="Brands" />
      <div className="marquee-mask">
        <div className="marquee-track">
          {all.map((src, i) => <img src={src} alt={`Brand ${(i % 29) + 1}`} key={i} />)}
        </div>
      </div>
    </section>
  );
}

function IndustriesCarousel() {
  const { extended, prev, next, trackRef, onEnd } = useSingleSlider(industrySlides);
  return (
    <section className="industries-section">
      <SectionHeader title="Industries We Serve" subtitle="Reliable Supply for Every Sector's Demands" />
      <div className="ind-slider-wrap">
        <div className="ind-viewport">
          <div className="ind-track" ref={trackRef} onTransitionEnd={onEnd}>
            {extended.map((slide, idx) => (
              <div className="ind-slide" key={idx}>
                <div className="row g-4">
                  {slide.map((card) => (
                    <div className="col-md-4" key={card.title}>
                      <div className="industry-card">
                        <img src={card.img} alt={card.title} />
                        <h3>{card.title}</h3>
                        <p>{card.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <button className="carousel-btn prev" onClick={prev}>&#10094;</button>
        <button className="carousel-btn next" onClick={next}>&#10095;</button>
      </div>
    </section>
  );
}

// Why Choose Us — 3 cards in a row, arrows sit outside the viewport
function WhyChooseUs() {
  const { extended, prev, next, trackRef, cardRef, onEnd } = useMultiSlider(whyBanners, 3);
  return (
    <section className="why-choose">
      <SectionHeader title="Why Choose Us" subtitle="Genuine Brands. Bulk Stock. Site-Ready Delivery." />
      <div className="multi-wrap">
        <button className="multi-arrow" onClick={prev}>&#10094;</button>
        <div className="multi-viewport">
          {/* CSS sets card width to calc((100% - 2*gap) / 3) via .why-card */}
          <div className="multi-track why-track" ref={trackRef} onTransitionEnd={onEnd}>
            {extended.map((src, i) => (
              <div
                className="why-card"
                key={i}
                ref={i === 0 ? cardRef : null}
                data-clone={i === 0 || i === extended.length - 1 ? "true" : undefined}
              >
                <img src={src} alt={`Why Choose Us ${i}`} />
              </div>
            ))}
          </div>
        </div>
        <button className="multi-arrow" onClick={next}>&#10095;</button>
      </div>
      <div className="why-btn"><a href="#">Download Our Brochure</a></div>
    </section>
  );
}

// Testimonials — 2 cards in a row, arrows sit outside the viewport
function Testimonials() {
  const { extended, prev, next, trackRef, cardRef, onEnd } = useMultiSlider(testimonials, 2);
  return (
    <section className="testimonials">
      <SectionHeader title="Client Testimonials" subtitle="What Our Customers Say" />
      <div className="multi-wrap">
        <button className="multi-arrow" onClick={prev}>&#10094;</button>
        <div className="multi-viewport">
          {/* CSS sets card width to calc((100% - gap) / 2) via .testimonial-card */}
          <div className="multi-track test-track" ref={trackRef} onTransitionEnd={onEnd}>
            {extended.map((t, i) => (
              <div
                className="testimonial-card"
                key={i}
                ref={i === 0 ? cardRef : null}
                data-clone={i === 0 || i === extended.length - 1 ? "true" : undefined}
              >
                <div className="stars">★★★★★</div>
                <p>{t.text}</p>
                <h4>{t.name}</h4>
                <span>{t.role}</span>
              </div>
            ))}
          </div>
        </div>
        <button className="multi-arrow" onClick={next}>&#10095;</button>
      </div>
    </section>
  );
}

function ContactSection() {
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", service: "" });
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = (e) => { e.preventDefault(); console.log("Form submitted:", formData); };

  return (
    <section className="contact-section" id="contact">
      <div className="contact-container">
        <div className="contact-info">
          <h2><span className="red-line"></span>Tell Us What You Need</h2>
          <h5 className="subtitle">We're just one call or form away. Let's get your materials moving.</h5>
          <div className="info-item"><span className="icon">📍</span><p>10/09,Ktc nagar,Tuticorin</p></div>
          <div className="info-item"><span className="icon">📞</span><p>+91 8056867639</p></div>
        </div>
        <form className="contact-form" onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Name*" required value={formData.name} onChange={handleChange} />
          <input type="tel" name="phone" placeholder="Phone Number*" required value={formData.phone} onChange={handleChange} />
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
          <input type="text" name="service" placeholder="Service" value={formData.service} onChange={handleChange} />
          <button type="submit">Submit your details</button>
        </form>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <p>&copy; 2025 Sri Electricals. All rights reserved.</p>
      <p className="credit">Marketed By <a href="https://harideepak.netlify.app/" target="_blank" rel="noreferrer">harideepak</a> — Efficient growth, delivered.</p>
    </footer>
  );
}

export default function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <div className="page">
        <Categories />
        <BrandMarquee />
        <IndustriesCarousel />
        <WhyChooseUs />
        <Testimonials />
        <ContactSection />
      </div>
      <Footer />
    </>
  );
}