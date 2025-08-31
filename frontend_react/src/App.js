import React, { useEffect, useMemo, useRef, useState } from 'react';
import './App.css';

/**
 * Curated on-brand, high-quality image URLs.
 * These are royalty-free demo links; replace with brand CDN paths in production.
 * We keep gradients as graceful fallbacks for when images fail to load.
 */
const IMG = {
  hero1:
    'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=MnwyMDk0MTh8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBsaWZlc3R5bGUlMjBzaGVlbnxlbnwwfHx8fDE%3D',
  hero2:
    'https://images.unsplash.com/photo-1512303452020-97651d2e4b43?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=MnwyMDk0MTh8MHwxfHNlYXJjaHwyfHxjb2xvcmZ1bCUyMGFueXRoaW5nfGVufDB8fHx8MQ%3D%3D',
  hero3:
    'https://images.unsplash.com/photo-1557683311-eac922347aa1?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=MnwyMDk0MTh8MHwxfHNlYXJjaHwxfHxncmFkaWVudCUyMGx1eHVyeXxlbnwwfHx8fDE%3D',
  story:
    'https://images.unsplash.com/photo-1547887537-6158d64c9b4e?q=80&w=1600&auto=format&fit=crop&ixlib=rb-4.0.3',
  product1:
    'https://images.unsplash.com/photo-1519681393784-7f06f8f9d6f2?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3',
  product2:
    'https://images.unsplash.com/photo-1545235617-9465d2a55698?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3',
  product3:
    'https://images.unsplash.com/photo-1532635223-6c1ae1c1d99a?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3',
  product4:
    'https://images.unsplash.com/photo-1497032205916-ac775f0649ae?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3',
  product5:
    'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3',
  product6:
    'https://images.unsplash.com/photo-1542831371-d531d36971e6?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3',
  hype:
    'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=1600&auto=format&fit=crop&ixlib=rb-4.0.3',
  community:
    'https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=1600&auto=format&fit=crop&ixlib=rb-4.0.3',
};

// Simple gradient fallback
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
        bgImg: IMG.hero1,
        bgFallback: gradient('rgba(232,175,175,0.5)', 'rgba(245,210,210,0.9)'),
        tag: 'LIMITED • BATCH NO. 07',
        alt: 'Hero shot with luxe, glowy ambiance and warm tones',
      },
      {
        headline: 'Whimsical Glow',
        sub: 'Playful scents with elegant undertones.',
        cta: 'Explore Scents',
        bgImg: IMG.hero2,
        bgFallback: gradient('rgba(230,240,255,0.7)', 'rgba(180,200,240,0.9)'),
        tag: 'EXCLUSIVE • HAND-POURED',
        alt: 'Colorful abstract lights with a playful, premium mood',
      },
      {
        headline: 'Crafted for Moments',
        sub: 'Designed to make memories shimmer.',
        cta: 'See Craft Process',
        bgImg: IMG.hero3,
        bgFallback: gradient('rgba(255,250,220,0.7)', 'rgba(255,235,180,0.9)'),
        tag: 'LIMITED • SMALL RUN',
        alt: 'Gradient luxury background with subtle shimmer',
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
      image: IMG.product1,
      alt: 'Rose-tan candle in a luxe setting',
    },
    {
      id: 2,
      name: 'Dusk-Blue Drift',
      price: '$72',
      limited: true,
      image: IMG.product2,
      alt: 'Dusk-blue candle with elegant backdrop',
    },
    {
      id: 3,
      name: 'Champagne Glow',
      price: '$74',
      limited: false,
      image: IMG.product3,
      alt: 'Champagne-toned candle with soft highlights',
    },
    {
      id: 4,
      name: 'Charcoal Ember',
      price: '$70',
      limited: true,
      image: IMG.product4,
      alt: 'Charcoal candle with moody light',
    },
    {
      id: 5,
      name: 'Coral Spark',
      price: '$69',
      limited: false,
      image: IMG.product5,
      alt: 'Coral-inspired candle in playful scene',
    },
    {
      id: 6,
      name: 'Lime Flicker',
      price: '$66',
      limited: true,
      image: IMG.product6,
      alt: 'Lime-accent candle with fresh vibe',
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
          <div className="story-visual shimmering" role="img" aria-label="Artisan pouring candle wax in a studio">
            <picture>
              <source srcSet={`${IMG.story}&fm=webp`} type="image/webp" />
              <img
                src={IMG.story}
                alt="Artisan pouring candle wax in a studio"
                loading="lazy"
                decoding="async"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center',
                  borderRadius: 'var(--radius-lg)',
                }}
              />
            </picture>
          </div>
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
          <div className="hype-visual shimmering dusk" role="img" aria-label="Dusk blue abstract lights">
            <picture>
              <source srcSet={`${IMG.hype}&fm=webp`} type="image/webp" />
              <img
                src={IMG.hype}
                alt="Dusk blue abstract lights"
                loading="lazy"
                decoding="async"
                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'var(--radius-md)' }}
              />
            </picture>
          </div>
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
          <div className="right shimmering" role="img" aria-label="Community studio moodboard">
            <picture>
              <source srcSet={`${IMG.community}&fm=webp`} type="image/webp" />
              <img
                src={IMG.community}
                alt="Community studio moodboard"
                loading="lazy"
                decoding="async"
                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'var(--radius-md)' }}
              />
            </picture>
          </div>
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
          style={{ backgroundImage: s.bgFallback }}
          aria-hidden={i !== active}
        >
          <picture aria-hidden="true">
            {/* Prefer modern formats; fall back to jpeg */}
            <source srcSet={`${s.bgImg}&fm=webp`} type="image/webp" />
            <img
              src={`${s.bgImg}`}
              alt=""
              loading="eager"
              decoding="async"
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center',
                filter: 'brightness(1.02)',
              }}
            />
          </picture>
          <div className="hero-overlay">
            <div className="tag">{s.tag}</div>
            <h1 className="display">{s.headline}</h1>
            <p className="sub">{s.sub}</p>
            <button className="btn coral hover-raise" aria-label={`${s.cta} — ${s.headline}`}>
              {s.cta}
            </button>
          </div>
        </div>
      ))}
      <div className="hero-dots" role="tablist" aria-label="Hero slides">
        {slides.map((s, i) => (
          <button
            key={i}
            className={`dot-btn ${i === active ? 'on' : ''}`}
            onClick={() => setActive(i)}
            aria-label={`Go to slide ${i + 1}: ${s.headline}`}
            role="tab"
            aria-selected={i === active}
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
      <div className="product-visual shimmering" aria-label={product.alt}>
        <picture>
          <source srcSet={`${product.image}&fm=webp`} type="image/webp" />
          <img
            src={product.image}
            alt={product.alt}
            loading="lazy"
            decoding="async"
            width="600"
            height="420"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
          />
        </picture>
      </div>
      <div className="product-info">
        <h4 className="product-name">{product.name}</h4>
        <p className="price">{product.price}</p>
        <button className="btn outline small" aria-label={`View details for ${product.name}`}>View Details</button>
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
