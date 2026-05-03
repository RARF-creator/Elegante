'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// ─────────────────────────────────────────────
// Menu data
// ─────────────────────────────────────────────
const CATEGORIES = ['All', 'Cold Brews', 'Hot Classics', 'Signature', 'Reserve'] as const;
type Category = (typeof CATEGORIES)[number];

const DRINKS = [
  {
    id: 1,
    name: 'Midnight Drift',
    category: 'Cold Brews' as Category,
    description: 'Slow-steeped for 24 hours in volcanic spring water. Dark chocolate, raw tobacco, and a long, silk finish.',
    price: '₹680',
    tag: 'House Favourite',
    image: '/menu/midnight_drift.png',
  },
  {
    id: 2,
    name: 'Nitro Ascension',
    category: 'Cold Brews' as Category,
    description: 'Nitrogen-charged cold brew cascading over a whisky-sphere ice ball. Velvety, near-effervescent.',
    price: '₹720',
    tag: 'Signature',
    image: '/menu/nitro_ascension.png',
  },
  {
    id: 3,
    name: 'Salted Caramel Fog',
    category: 'Cold Brews' as Category,
    description: 'Cold brew layered with house caramel, Himalayan salt mist, and chilled oat cream. Clouds of sweetness.',
    price: '₹650',
    tag: null,
    image: '/menu/salted_caramel_fog.png',
  },
  {
    id: 4,
    name: 'Obsidian Pour',
    category: 'Cold Brews' as Category,
    description: 'Single-origin Ethiopian cold brew, unfiltered and unapologetic. Blueberry, jasmine, molasses.',
    price: '₹740',
    tag: 'Single Origin',
    image: '/menu/obsidian_pour.png',
  },
  {
    id: 5,
    name: 'The Sanctum Espresso',
    category: 'Hot Classics' as Category,
    description: 'A double ristretto of our house blend, pulled at exactly 9 bars. Bittersweet, with a crema as golden as dusk.',
    price: '₹420',
    tag: null,
    image: '/menu/sanctum_espresso.png',
  },
  {
    id: 6,
    name: 'Velvet Cappuccino',
    category: 'Hot Classics' as Category,
    description: 'Micro-foamed whole milk folded over a precise espresso. A ritual in a ceramic bowl.',
    price: '₹490',
    tag: 'Best Seller',
    image: '/menu/velvet_cappuccino.png',
  },
  {
    id: 7,
    name: 'Café au Noir',
    category: 'Hot Classics' as Category,
    description: 'Black as midnight, clean as conscience. Single-origin pour-over for the purist at heart.',
    price: '₹460',
    tag: null,
    image: '/menu/cafe_au_noir.png',
  },
  {
    id: 8,
    name: 'Golden Flat White',
    category: 'Hot Classics' as Category,
    description: 'Ristretto shots married with steamed Jersey whole milk. Rich, rounded, and dangerously smooth.',
    price: '₹520',
    tag: 'Staff Pick',
    image: '/menu/golden_flat_white.png',
  },
  {
    id: 9,
    name: 'Void Matcha Latte',
    category: 'Signature' as Category,
    description: 'Ceremonial-grade Uji matcha whisked into steamed coconut cream. Earthy, grounding, and utterly beautiful.',
    price: '₹580',
    tag: 'New',
    image: '/menu/void_matcha.png',
  },
  {
    id: 10,
    name: 'Saffron Cortado',
    category: 'Signature' as Category,
    description: 'Spanish cortado elevated with hand-harvested Iranian saffron and cardamom cream. Gold in every sense.',
    price: '₹620',
    tag: "Chef's Choice",
    image: '/menu/saffron_cortado.png',
  },
  {
    id: 11,
    name: 'Rose & Cardamom Cloud',
    category: 'Signature' as Category,
    description: 'Espresso beneath a cloud of rose-cardamom foam. A drink that feels like a memory.',
    price: '₹590',
    tag: null,
    image: '/menu/rose_cardamom.png',
  },
  {
    id: 12,
    name: 'Dark Matter Mocha',
    category: 'Signature' as Category,
    description: 'Valrhona 72% dark chocolate ganache stirred into double espresso with salted sea foam. Intense and unforgettable.',
    price: '₹640',
    tag: 'Signature',
    image: '/menu/dark_matter_mocha.png',
  },
  {
    id: 13,
    name: 'Geisha Ceremony',
    category: 'Reserve' as Category,
    description: 'Panama Geisha, honey-processed. Served in a bespoke Hario V60 table-side pour. Bergamot, white peach, jasmine.',
    price: '₹1,200',
    tag: 'Limited',
    image: '/menu/geisha_ceremony.png',
  },
  {
    id: 14,
    name: 'Kopi Luwak Noir',
    category: 'Reserve' as Category,
    description: 'Ethically sourced civet coffee, brewed as a cold drip over 8 hours. Incredibly smooth, zero bitterness.',
    price: '₹1,800',
    tag: 'Rare',
    image: '/menu/kopi_luwak.png',
  },
  {
    id: 15,
    name: 'Aged Sumatra Reserve',
    category: 'Reserve' as Category,
    description: 'Wet-hulled Sumatra aged in bourbon barrels for 18 months. Dark fruit, cedar, a long warming finish.',
    price: '₹980',
    tag: 'Reserve',
    image: '/menu/sumatra_reserve.png',
  },
];

// ─────────────────────────────────────────────
// DrinkCard — image on top
// ─────────────────────────────────────────────
function DrinkCard({ drink }: { drink: (typeof DRINKS)[0] }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        border: `1px solid ${hovered ? 'rgba(201,169,110,0.3)' : 'rgba(255,255,255,0.06)'}`,
        backgroundColor: '#050505',
        transition: 'border-color 0.4s cubic-bezier(0.76, 0, 0.24, 1)',
        overflow: 'hidden',
        cursor: 'default',
      }}
    >
      {/* Image */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '240px',
          backgroundColor: '#000',
          overflow: 'hidden',
        }}
      >
        <Image
          src={drink.image}
          alt={drink.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{
            objectFit: 'cover',
            transform: hovered ? 'scale(1.05)' : 'scale(1)',
            transition: 'transform 0.6s cubic-bezier(0.76, 0, 0.24, 1)',
          }}
        />
        {/* Bottom gradient so text is readable */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '50%',
            background: 'linear-gradient(to top, #050505, transparent)',
          }}
        />
        {/* Tag */}
        {drink.tag && (
          <div
            style={{
              position: 'absolute',
              top: '1rem',
              right: '1rem',
              fontSize: '0.6rem',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: '#c9a96e',
              border: '1px solid rgba(201,169,110,0.5)',
              padding: '0.2rem 0.55rem',
              backgroundColor: 'rgba(5,5,5,0.7)',
              backdropFilter: 'blur(4px)',
            }}
          >
            {drink.tag}
          </div>
        )}
      </div>

      {/* Text content */}
      <div style={{ padding: '1.5rem 1.75rem 1.75rem' }}>
        {/* Name */}
        <h3
          style={{
            fontSize: '1.125rem',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            color: '#ffffff',
            marginBottom: '0.5rem',
            lineHeight: 1.3,
          }}
        >
          {drink.name}
        </h3>

        {/* Divider */}
        <div
          style={{
            width: hovered ? '2.5rem' : '1.25rem',
            height: '1px',
            backgroundColor: 'rgba(201,169,110,0.5)',
            marginBottom: '0.875rem',
            transition: 'width 0.4s cubic-bezier(0.76, 0, 0.24, 1)',
          }}
        />

        {/* Description */}
        <p
          style={{
            fontSize: '0.8125rem',
            lineHeight: 1.7,
            color: 'rgba(255,255,255,0.4)',
            marginBottom: '1.25rem',
            letterSpacing: '0.01em',
          }}
        >
          {drink.description}
        </p>

        {/* Price */}
        <div
          style={{
            fontSize: '1rem',
            fontWeight: 600,
            color: hovered ? '#c9a96e' : 'rgba(255,255,255,0.45)',
            letterSpacing: '0.05em',
            transition: 'color 0.3s ease',
          }}
        >
          {drink.price}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Category Tab
// ─────────────────────────────────────────────
function CategoryTab({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'none',
        border: 'none',
        padding: '0.5rem 0',
        paddingBottom: '1rem',
        fontSize: '0.75rem',
        letterSpacing: '0.25em',
        textTransform: 'uppercase',
        fontWeight: active ? 600 : 400,
        color: active ? '#c9a96e' : hovered ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.3)',
        cursor: 'pointer',
        transition: 'color 0.3s ease',
        fontFamily: 'inherit',
        borderBottom: active ? '1px solid #c9a96e' : '1px solid transparent',
        whiteSpace: 'nowrap',
      }}
    >
      {label}
    </button>
  );
}

// ─────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────
export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState<Category>('All');

  const filtered =
    activeCategory === 'All' ? DRINKS : DRINKS.filter((d) => d.category === activeCategory);

  return (
    <div
      style={{
        backgroundColor: '#050505',
        minHeight: '100vh',
        color: 'white',
        fontFamily: "'Inter', -apple-system, sans-serif",
      }}
    >
      {/* ── Sticky Nav ─────────────────────── */}
      <nav
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 'clamp(1rem, 4vw, 1.5rem) clamp(1.5rem, 6vw, 3rem)',
          background: 'rgba(5,5,5,0.92)',
          backdropFilter: 'blur(16px)',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
        }}
      >
        <Link
          href="/"
          style={{
            fontSize: '1.125rem',
            fontWeight: 700,
            letterSpacing: '-0.03em',
            color: '#c9a96e',
            textDecoration: 'none',
          }}
        >
          ELEGANTE
        </Link>
        <span
          style={{
            fontSize: '0.7rem',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.25)',
          }}
        >
          Our Menu
        </span>
      </nav>

      {/* ── Hero ───────────────────────────── */}
      <div style={{ padding: 'clamp(3rem, 10vw, 5rem) clamp(1.5rem, 6vw, 3rem) clamp(2rem, 6vw, 3rem)', maxWidth: '1400px', margin: '0 auto' }}>
        <p
          style={{
            fontSize: '0.7rem',
            letterSpacing: '0.4em',
            textTransform: 'uppercase',
            color: 'rgba(201,169,110,0.55)',
            marginBottom: '1.25rem',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
          }}
        >
          <span style={{ display: 'inline-block', width: '2rem', height: '1px', backgroundColor: 'rgba(201,169,110,0.4)' }} />
          Est. 2024
        </p>
        <h1
          style={{
            fontSize: 'clamp(3rem, 7vw, 6rem)',
            fontWeight: 800,
            letterSpacing: '-0.04em',
            lineHeight: 1,
            color: '#ffffff',
            marginBottom: '1.5rem',
          }}
        >
          THE MENU.
        </h1>
        <p
          style={{
            fontSize: '1rem',
            color: 'rgba(255,255,255,0.35)',
            maxWidth: '34rem',
            lineHeight: 1.75,
            letterSpacing: '0.01em',
          }}
        >
          Each drink is a conversation between the bean and the barista.
          We source, roast, and serve with singular devotion.
        </p>
      </div>

      {/* ── Category tabs ──────────────────── */}
      <div
        style={{
          padding: '0 clamp(1.5rem, 6vw, 3rem)',
          maxWidth: '1400px',
          margin: '0 auto',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          marginBottom: '3rem',
        }}
      >
        <div style={{ display: 'flex', gap: '2.5rem', overflowX: 'auto' }}>
          {CATEGORIES.map((cat) => (
            <CategoryTab
              key={cat}
              label={cat}
              active={activeCategory === cat}
              onClick={() => setActiveCategory(cat)}
            />
          ))}
        </div>
      </div>

      {/* ── Cards Grid ─────────────────────── */}
      <div
        style={{
          padding: '0 clamp(1.5rem, 6vw, 3rem) clamp(4rem, 12vw, 8rem)',
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))',
          gap: '1px',
          backgroundColor: 'rgba(255,255,255,0.04)',
        }}
      >
        {filtered.map((drink) => (
          <div key={drink.id} style={{ backgroundColor: '#050505' }}>
            <DrinkCard drink={drink} />
          </div>
        ))}
      </div>

      {/* ── Footer ─────────────────────────── */}
      <div
        style={{
          borderTop: '1px solid rgba(255,255,255,0.06)',
          padding: 'clamp(2rem, 6vw, 2.5rem) clamp(1.5rem, 6vw, 3rem)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          maxWidth: '1400px',
          margin: '0 auto',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        <span style={{ fontSize: '1.125rem', fontWeight: 700, letterSpacing: '-0.03em', color: '#c9a96e' }}>
          ELEGANTE
        </span>
        <p style={{ fontSize: '0.7rem', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.15)', textTransform: 'uppercase' }}>
          All prices include taxes · Seasonal items may vary
        </p>
        <Link
          href="/"
          style={{
            fontSize: '0.7rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.25)',
            textDecoration: 'none',
          }}
        >
          ← Back to Experience
        </Link>
      </div>
    </div>
  );
}
