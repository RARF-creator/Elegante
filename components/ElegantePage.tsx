'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LoadingScreen from '@/components/LoadingScreen';
import AntigravityCanvas, { TOTAL_FRAMES } from '@/components/AntigravityCanvas';

// --------------------------------------------------------------------------
// Beat text definitions
// --------------------------------------------------------------------------
const BEATS = [
  {
    id: 'beat-a',
    scrollStart: 0,
    scrollEnd: 0.28,
    title: 'ELEGANTE',
    subtitle: 'A café where time slows,\nand every sip is a ceremony.',
    tag: 'Welcome',
    cta: false,
    noFadeIn: true,
    noFadeOut: false,
  },
  {
    id: 'beat-b',
    scrollStart: 0.28,
    scrollEnd: 0.52,
    title: 'CRAFTED\nWITH SOUL.',
    subtitle: 'Our baristas are artists.\nEvery pour is a quiet act of devotion.',
    tag: 'The Craft',
    cta: false,
    noFadeIn: false,
    noFadeOut: false,
  },
  {
    id: 'beat-c',
    scrollStart: 0.52,
    scrollEnd: 0.80,
    title: 'BORN FROM\nPASSION.',
    subtitle: 'Sourced from the world\'s finest estates.\nRoasted to awaken your senses completely.',
    tag: 'The Obsession',
    cta: false,
    noFadeIn: false,
    noFadeOut: false,
  },
  {
    id: 'beat-d',
    scrollStart: 0.80,
    scrollEnd: 1.0,
    title: 'YOUR TABLE\nAWAITS.',
    subtitle: 'Step into our flagship sanctuary.\nWhere extraordinary coffee meets exceptional moments.',
    tag: 'Join Us',
    cta: true,
    noFadeIn: false,
    noFadeOut: true,
  },
];

// --------------------------------------------------------------------------
// BeatText
// --------------------------------------------------------------------------
function BeatText({
  beat,
  scrollProgress,
}: {
  beat: (typeof BEATS)[0];
  scrollProgress: number;
}) {
  const fadeBuffer = 0.06;
  const { scrollStart: start, scrollEnd: end, noFadeIn, noFadeOut } = beat;

  let opacity = 0;
  let yRaw = 0;

  if (scrollProgress >= start && scrollProgress <= end) {
    // Fade-in: instant if noFadeIn, otherwise buffer
    const fadeIn = noFadeIn ? 1 : Math.min(1, (scrollProgress - start) / fadeBuffer);
    // Fade-out: hold at 1 if noFadeOut, otherwise buffer
    const fadeOut = noFadeOut ? 1 : Math.min(1, (end - scrollProgress) / fadeBuffer);
    opacity = Math.min(fadeIn, fadeOut);

    // Y parallax
    if (!noFadeIn && scrollProgress < start + fadeBuffer) {
      yRaw = 20 * (1 - (scrollProgress - start) / fadeBuffer);
    } else if (!noFadeOut && scrollProgress > end - fadeBuffer) {
      yRaw = -20 * (1 - (end - scrollProgress) / fadeBuffer);
    } else {
      yRaw = 0;
    }
  }

  if (opacity < 0.005) return null;

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${yRaw}px)`,
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
        textAlign: 'center',
        paddingBottom: 'clamp(2.5rem, 8vw, 5rem)',
        paddingLeft: 'clamp(1.5rem, 6vw, 5rem)',
        paddingRight: 'clamp(1.5rem, 6vw, 5rem)',
        pointerEvents: 'none',
      }}
    >
      {/* Beat tag */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
        <div style={{ height: '1px', width: '2.5rem', backgroundColor: 'rgba(201,169,110,0.5)' }} />
        <span
          style={{
            fontSize: '0.75rem',
            letterSpacing: '0.35em',
            textTransform: 'uppercase',
            fontWeight: 500,
            color: 'rgba(201,169,110,0.7)',
          }}
        >
          {beat.tag}
        </span>
        <div style={{ height: '1px', width: '2.5rem', backgroundColor: 'rgba(201,169,110,0.5)' }} />
      </div>

      {/* Title */}
      <h2
        style={{
          fontWeight: 800,
          lineHeight: 1,
          marginBottom: '1.5rem',
          whiteSpace: 'pre-line',
          fontSize: 'clamp(3.5rem, 8vw, 7rem)',
          letterSpacing: '-0.04em',
          color: '#ffffff',
          textShadow: '0 4px 24px rgba(0,0,0,0.8)',
        }}
      >
        {beat.title}
      </h2>

      {/* Subtitle */}
      <p
        style={{
          whiteSpace: 'pre-line',
          color: 'rgba(255,255,255,0.55)',
          maxWidth: '28rem',
          fontSize: '1.0625rem',
          lineHeight: 1.65,
          letterSpacing: '0.01em',
          marginBottom: beat.cta ? '2rem' : 0,
        }}
      >
        {beat.subtitle}
      </p>

      {/* CTA */}
      {beat.cta && (
        <div style={{ pointerEvents: 'auto' }}>
          <BookButton />
        </div>
      )}
    </div>
  );
}

function BookButton() {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      id="view-menu-btn"
      href="/menu"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'inline-block',
        padding: '1rem 2.5rem',
        fontSize: '0.8125rem',
        letterSpacing: '0.25em',
        textTransform: 'uppercase',
        fontWeight: 600,
        border: '1px solid #c9a96e',
        color: hovered ? '#ffffff' : '#050505',
        backgroundColor: hovered ? '#b3955b' : '#c9a96e',
        cursor: 'pointer',
        transition: 'all 0.35s cubic-bezier(0.76, 0, 0.24, 1)',
        fontFamily: 'inherit',
        textDecoration: 'none',
      }}
    >
      VIEW MENU
    </a>
  );
}

// --------------------------------------------------------------------------
// NavBar — Menu link only
// --------------------------------------------------------------------------
function NavBar({ scrollProgress }: { scrollProgress: number }) {
  const navOpacity = Math.min(1, scrollProgress * 12);
  const [hovered, setHovered] = useState(false);
  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 'clamp(1.25rem, 4vw, 1.75rem) clamp(1.5rem, 6vw, 3rem)',
        opacity: navOpacity,
        background: 'linear-gradient(to bottom, rgba(5,5,5,0.7) 0%, transparent 100%)',
        transition: 'opacity 0.3s ease',
      }}
    >
      <span
        style={{
          fontSize: '1.125rem',
          fontWeight: 700,
          letterSpacing: '-0.03em',
          color: '#c9a96e',
        }}
      >
        ELEGANTE
      </span>
      <a
        id="nav-menu"
        href="/menu"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          fontSize: '0.75rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: hovered ? '#c9a96e' : 'rgba(255,255,255,0.45)',
          textDecoration: 'none',
          transition: 'color 0.3s ease',
          fontFamily: 'inherit',
          fontWeight: 500,
        }}
      >
        Menu
      </a>
    </nav>
  );
}

// --------------------------------------------------------------------------
// Scroll hint only — no progress bar on the right
// --------------------------------------------------------------------------
function ScrollIndicator({ scrollProgress }: { scrollProgress: number }) {
  const showHint = scrollProgress < 0.04;

  return (
    <>
      <AnimatePresence>
        {showHint && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            style={{
              position: 'fixed',
              bottom: '2.5rem',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.75rem',
              zIndex: 50,
            }}
          >
            <span
              style={{
                fontSize: '0.75rem',
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.3)',
              }}
            >
              Scroll
            </span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                width: '1px',
                height: '2rem',
                backgroundColor: 'rgba(201,169,110,0.4)',
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}


// --------------------------------------------------------------------------
// Main Page
// --------------------------------------------------------------------------
export default function ElegantePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);

  const [loadedCount, setLoadedCount] = useState(0);
  const [isFullyLoaded, setIsFullyLoaded] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [imagesReady, setImagesReady] = useState<HTMLImageElement[]>([]);

  const loadingProgress = Math.round((loadedCount / TOTAL_FRAMES) * 100);

  // Preload all frames
  useEffect(() => {
    let loaded = 0;
    const images: HTMLImageElement[] = new Array(TOTAL_FRAMES);

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = `/sequence/frame_${i}.jpg`;
      img.onload = img.onerror = () => {
        loaded++;
        setLoadedCount(loaded);
        if (loaded === TOTAL_FRAMES) {
          imagesRef.current = images;
          setImagesReady([...images]);
          setTimeout(() => setIsFullyLoaded(true), 600);
        }
      };
      images[i] = img;
    }
    imagesRef.current = images;
  }, []);

  // Scroll handler
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const el = containerRef.current;
          if (el) {
            const maxScroll = el.scrollHeight - window.innerHeight;
            setScrollProgress(maxScroll > 0 ? Math.min(1, window.scrollY / maxScroll) : 0);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div style={{ backgroundColor: '#050505', minHeight: '100vh' }}>
      {/* Loading Screen */}
      <LoadingScreen progress={loadingProgress} isVisible={!isFullyLoaded} />

      {/* Canvas — only mount when images are ready */}
      {imagesReady.length === TOTAL_FRAMES && (
        <AntigravityCanvas
          scrollProgress={scrollProgress}
          isLoaded={isFullyLoaded}
          images={imagesReady}
        />
      )}

      {/* UI overlays — only after fully loaded */}
      {isFullyLoaded && (
        <>
          <NavBar scrollProgress={scrollProgress} />
          <ScrollIndicator scrollProgress={scrollProgress} />

          {/* Beat text overlays */}
          <div
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 20,
              pointerEvents: 'none',
            }}
          >
            {BEATS.map((beat) => (
              <BeatText
                key={beat.id}
                beat={beat}
                scrollProgress={scrollProgress}
              />
            ))}
          </div>

          {/* Watermark cover — bottom-right corner dark vignette */}
          <div
            aria-hidden="true"
            style={{
              position: 'fixed',
              bottom: 0,
              right: 0,
              width: '220px',
              height: '100px',
              background: 'radial-gradient(ellipse at 100% 100%, #050505 30%, transparent 75%)',
              zIndex: 30,
              pointerEvents: 'none',
            }}
          />

          {/* Edge vignette — covers any bleed/artifact at all four edges */}
          <div
            aria-hidden="true"
            style={{
              position: 'fixed',
              inset: 0,
              background:
                'linear-gradient(to right, #050505 0%, transparent 6%, transparent 94%, #050505 100%)',
              zIndex: 10,
              pointerEvents: 'none',
            }}
          />
        </>
      )}

      {/* Scroll spacer */}
      <div
        ref={containerRef}
        style={{ height: '600vh', position: 'relative' }}
      />
    </div>
  );
}
