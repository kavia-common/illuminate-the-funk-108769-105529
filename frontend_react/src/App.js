import React, { useEffect, useMemo, useRef, useState } from 'react';
import './App.css';

// Simple in-file placeholder images (gradients) to avoid external assets
const gradient = (from, to) =>
  `linear-gradient(135deg, ${from} 0%, ${to} 100%)`;

// PUBLIC_INTERFACE
export default function App() {
  /**
   * The landing page for "Illuminate the Funk".
   * Contains full hero carousel, story, product grid, countdown hype,
   * craft process, testimonials, community signup and footer.
   */
  const [activeSlide, setActiveSlide] = useState(0);
  const [now, setNow] = useState(Date.now());
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  // Carousel data
  const slides = useMemo(
    () => [
      {
        headline: 'Illuminate the Funk',
        sub: 'Limited-edition luxury candles, crafted to spark joy.',
        cta: 'Shop the Drop',
        bg: gradient('rgba(232,175,175,0.5)', 'rgba(245,210,210,0.9)'),
        tag: 'LIMITED • BATCH NO. 07',
      },
      {
        headline: 'Whimsical Glow',
        sub: 'Playful scents with elegant undertones.',
        cta: 'Explore Scents',
        bg: gradient('rgba(230,240,255,0.7)', 'rgba(180,200,240,0.9)'),
        tag: 'EXCLUSIVE • HAND-POURED',
      },
      {
        headline: 'Crafted for Moments',
        sub: 'Designed to make memories shimmer.',
        cta: 'See Craft Process',
        bg: gradient('rgba(255,250,220,0.7)', 'rgba(255,235,180,0.9)'),
        tag: 'LIMITED • SMALL RUN',
      },
    ],
    []
  );

  // Auto-advance carousel
  useEffect(() => {
    const id = setInterval(() => {
      setActiveSlide((s) => (s + 1) % slides.length);
    }, 5000);
    return () => clearInterval(id);
  }, [slides.length]);

  // Countdown target (e.g., 3 days from now)
  const dropTime = useMemo(() => Date.now() + 3 * 24 * 60 * 60 * 1000, []);
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  const remaining = Math.max(0, dropTime - now);
  const days = Math.floor(remaining / (24 * 60 * 60 * 1000));
  const hours = Math.floor((remaining / (60 * 60 * 1000)) % 24);
  const minutes = Math.floor((remaining / (60 * 1000)) % 60);
  const seconds = Math.floor((remaining / 1000) % 60);

  // Dummy products
  const products = [
    {
      id: 1,
      name: 'Rose-Tan Reverie',
      price: '$68',
      limited: true,
      bg: gradient('rgba(232,175,175,0.35)', 'rgba(232,175,175,0.75)'),
    },
    {
      id: 2,
      name: 'Dusk-Blue Drift',
      price: '$72',
      limited: true,
      bg: gradient('rgba(80,110,180,0.25)', 'rgba(80,110,180,0.65)'),
    },
    {
      id: 3,
      name: 'Champagne Glow',
      price: '$74',
      limited: false,
      bg: gradient('rgba(255,230,180,0.35)', 'rgba(255,215,140,0.7)'),
    },
    {
      id: 4,
      name: 'Charcoal Ember',
      price: '$70',
      limited: true,
      bg: gradient('rgba(47,47,50,0.35)', 'rgba(47,47,50,0.75)'),
    },
    {
      id: 5,
      name: 'Coral Spark',
      price: '$69',
      limited: false,
      bg: gradient('rgba(255,150,120,0.3)', 'rgba(255,120,90,0.6)'),
    },
    {
      id: 6,
      name: 'Lime Flicker',
      price: '$66',
      limited: true,
      bg: gradient('rgba(190,255,170,0.35)', 'rgba(160,240,130,0.7)'),
    },
  ];

  const onSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
    }
  };

  // Intersection glow effect
  const sectionsRef = useRef([]);
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('in-view');
        });
      },
      { threshold: 0.2 }
    );
    sectionsRef.current.forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <div className="itf-app">
      <Navbar />
      <HeroCarousel
        slides={slides}
        active={activeSlide}
        setActive={setActiveSlide}
      />

      <section
        className="itf-section story two-col observe"
        ref={(el) => (sectionsRef.current[0] = el)}
      >
        <div className="col text">
          <h2 className="headline">Our Story</h2>
          <p className="lede">
            A funky spark in a luxury world. Illuminate the Funk was born from a
            love of playful energy and elegant craft. Each candle is a limited
            edition: small-batch, hand-poured, and made to be noticed.
          </p>
          <div className="scarce-badge" title="Limited Edition">
            Limited • Scarce • Desired
          </div>
        </div>
        <div className="col visual card-soft">
          <div className="story-visual shimmering" />
        </div>
      </section>

      <section
        className="itf-section products observe"
        ref={(el) => (sectionsRef.current[1] = el)}
      >
        <div className="section-head">
          <h2 className="headline">The Collection</h2>
          <p className="sub">
            Hover to feel the glow. Ultra-small batch drops with whimsical
            character.
          </p>
        </div>
        <div className="grid">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <section
        className="itf-section hype observe"
        ref={(el) => (sectionsRef.current[2] = el)}
      >
        <div className="hype-inner card-soft">
          <div className="hype-copy">
            <h3 className="headline">Next Drop In</h3>
            <Timer days={days} hours={hours} minutes={minutes} seconds={seconds} />
            <p className="sub">
              Our next limited run is brewing. Join the list to get first dibs.
            </p>
            <button className="btn waitlist">Join the Waitlist</button>
          </div>
          <div className="hype-visual shimmering dusk" />
        </div>
      </section>

      <section
        className="itf-section craft observe"
        ref={(el) => (sectionsRef.current[3] = el)}
      >
        <h2 className="headline center">Crafted With Intention</h2>
        <div className="craft-steps">
          <CraftStep
            title="Blend"
            desc="Fine fragrance oils married with clean-burning wax."
            tone="rose"
          />
          <CraftStep
            title="Pour"
            desc="Hand-poured in micro-batches for perfect balance."
            tone="gold"
          />
          <CraftStep
            title="Cure"
            desc="Slow-cured to deepen the profile and elevate throw."
            tone="charcoal"
          />
        </div>
      </section>

      <section
        className="itf-section testimonials observe"
        ref={(el) => (sectionsRef.current[4] = el)}
      >
        <h2 className="headline center">What They’re Saying</h2>
        <div className="testi-row">
          <Testimonial
            quote="A delightful contradiction—playful yet profoundly luxurious."
            who="Mae J."
          />
          <Testimonial
            quote="The scent lingers like a great song. I keep coming back."
            who="Jon P."
          />
          <Testimonial
            quote="Design perfection. It glows even when unlit."
            who="Aria C."
          />
        </div>
      </section>

      <section
        className="itf-section community observe"
        ref={(el) => (sectionsRef.current[5] = el)}
      >
        <div className="community-inner card-soft">
          <div className="left">
            <h3 className="headline">Join the Community</h3>
            <p className="sub">
              Sneak peeks, early drops, and funky stories from the studio.
            </p>
            {!subscribed ? (
              <form className="signup" onSubmit={onSubscribe}>
                <input
                  type="email"
                  required
                  placeholder="you@glowmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-label="Email address"
                />
                <button className="btn coral" type="submit">
                  Sign me up
                </button>
              </form>
            ) : (
              <div className="thanks">You’re on the list. Welcome ✨</div>
            )}
          </div>
          <div className="right shimmering" />
        </div>
      </section>

      <Footer />
    </div>
  );
}

function Navbar() {
  return (
    <nav className="itf-nav">
      <div className="brand">
        <span className="dot glow" />
        Illuminate the Funk
        <span className="badge limited">Limited</span>
      </div>
      <ul className="nav-links">
        <li><a href="#story">Story</a></li>
        <li><a href="#products">Shop</a></li>
        <li><a href="#craft">Craft</a></li>
        <li><a href="#community">Community</a></li>
      </ul>
    </nav>
  );
}

function HeroCarousel({ slides, active, setActive }) {
  return (
    <section className="hero">
      {slides.map((s, i) => (
        <div
          key={i}
          className={`hero-slide ${i === active ? 'active' : ''}`}
          style={{ backgroundImage: s.bg }}
          aria-hidden={i !== active}
        >
          <div className="hero-overlay">
            <div className="tag">{s.tag}</div>
            <h1 className="display">{s.headline}</h1>
            <p className="sub">{s.sub}</p>
            <button className="btn coral hover-raise">{s.cta}</button>
          </div>
        </div>
      ))}
      <div className="hero-dots">
        {slides.map((_, i) => (
          <button
            key={i}
            className={`dot-btn ${i === active ? 'on' : ''}`}
            onClick={() => setActive(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

function ProductCard({ product }) {
  return (
    <div className="product-card card-soft">
      {product.limited && <div className="corner-flag">Limited</div>}
      <div className="product-visual shimmering" style={{ backgroundImage: product.bg }} />
      <div className="product-info">
        <h4 className="product-name">{product.name}</h4>
        <p className="price">{product.price}</p>
        <button className="btn outline small">View Details</button>
      </div>
    </div>
  );
}

function CraftStep({ title, desc, tone }) {
  return (
    <div className={`craft-step ${tone}`}>
      <div className="icon glow-pulse" />
      <div className="text">
        <h4>{title}</h4>
        <p>{desc}</p>
      </div>
    </div>
  );
}

function Testimonial({ quote, who }) {
  return (
    <blockquote className="testi card-soft">
      <p className="quote">“{quote}”</p>
      <footer className="who">— {who}</footer>
    </blockquote>
  );
}

function Timer({ days, hours, minutes, seconds }) {
  return (
    <div className="timer">
      <TimeBox label="Days" value={days} />
      <TimeBox label="Hours" value={hours} />
      <TimeBox label="Mins" value={minutes} />
      <TimeBox label="Secs" value={seconds} />
    </div>
  );
}
function TimeBox({ label, value }) {
  const val = String(value).padStart(2, '0');
  return (
    <div className="timebox">
      <div className="val">{val}</div>
      <div className="lbl">{label}</div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="itf-footer">
      <div className="foot-inner">
        <div className="brand small">
          <span className="dot glow" />
          Illuminate the Funk
        </div>
        <ul className="foot-nav">
          <li><a href="#story">Story</a></li>
          <li><a href="#products">Shop</a></li>
          <li><a href="#craft">Craft</a></li>
          <li><a href="#community">Community</a></li>
        </ul>
        <div className="socials">
          <a href="#x" aria-label="Instagram" className="icon ig">IG</a>
          <a href="#x" aria-label="TikTok" className="icon tk">TT</a>
          <a href="#x" aria-label="Pinterest" className="icon pt">PT</a>
        </div>
      </div>
      <div className="mini">© {new Date().getFullYear()} Illuminate the Funk — Small-batch, hand-poured.</div>
    </footer>
  );
}
