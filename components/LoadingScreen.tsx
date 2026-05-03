'use client';

import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  progress: number;
  isVisible: boolean;
}

export default function LoadingScreen({ progress, isVisible }: LoadingScreenProps) {
  const countRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (countRef.current) {
      countRef.current.textContent = String(Math.floor(progress)).padStart(2, '0') + '%';
    }
  }, [progress]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{ backgroundColor: '#050505' }}
        >
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-16 text-center"
          >
            <p
              className="text-xs tracking-[0.5em] uppercase mb-3"
              style={{ color: 'rgba(201,169,110,0.5)' }}
            >
              Est. 2024
            </p>
            <h1
              className="text-6xl font-bold tracking-tighter"
              style={{ color: '#c9a96e', letterSpacing: '-0.04em' }}
            >
              ELEGANTE
            </h1>
          </motion.div>

          {/* Progress area */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="w-64 flex flex-col items-center gap-4"
          >
            {/* Counter */}
            <div className="w-full flex justify-between items-center">
              <span
                className="text-xs tracking-widest uppercase"
                style={{ color: 'rgba(255,255,255,0.3)' }}
              >
                Loading
              </span>
              <span
                ref={countRef}
                className="text-sm font-light tabular-nums"
                style={{ color: 'rgba(201,169,110,0.8)', fontVariantNumeric: 'tabular-nums' }}
              >
                00%
              </span>
            </div>

            {/* Progress bar track */}
            <div
              className="w-full h-px relative"
              style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}
            >
              {/* Animated progress fill */}
              <motion.div
                className="absolute inset-y-0 left-0 h-full"
                style={{
                  backgroundColor: '#c9a96e',
                  width: `${progress}%`,
                  transition: 'width 0.1s linear',
                }}
              />

              {/* Glowing dot at progress edge */}
              <motion.div
                className="absolute top-1/2 -translate-y-1/2 w-1 h-1 rounded-full"
                style={{
                  left: `${progress}%`,
                  backgroundColor: '#e8d5b0',
                  boxShadow: '0 0 6px 2px rgba(201,169,110,0.6)',
                  transform: 'translateX(-50%) translateY(-50%)',
                  transition: 'left 0.1s linear',
                }}
              />
            </div>

            {/* Subtle description */}
            <p
              className="text-xs tracking-widest uppercase"
              style={{ color: 'rgba(255,255,255,0.18)' }}
            >
              Preparing your experience
            </p>
          </motion.div>

          {/* Bottom decorative line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.5, delay: 0.3, ease: [0.76, 0, 0.24, 1] }}
            className="absolute bottom-12 w-24 h-px"
            style={{ backgroundColor: 'rgba(201,169,110,0.2)', transformOrigin: 'center' }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
