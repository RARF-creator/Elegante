'use client';

import {
  useEffect,
  useRef,
  useCallback,
  forwardRef,
  useImperativeHandle,
} from 'react';
import { useSpring } from 'framer-motion';

const TOTAL_FRAMES = 240;

interface AntigravityCanvasProps {
  scrollProgress: number; // 0–1
  isLoaded: boolean;
  images: HTMLImageElement[]; // preloaded images passed from parent
}

export interface AntigravityCanvasHandle {}

const AntigravityCanvas = forwardRef<AntigravityCanvasHandle, AntigravityCanvasProps>(
  ({ scrollProgress, isLoaded, images }, ref) => {
    useImperativeHandle(ref, () => ({}));

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const rafRef = useRef<number>(0);
    const currentFrameRef = useRef<number>(-1);

    // Spring-smooth the frame index for buttery scrolling
    const springFrame = useSpring(0, { stiffness: 100, damping: 30 });

    // Update spring target whenever scrollProgress changes
    useEffect(() => {
      const targetFrame = Math.min(
        Math.round(scrollProgress * (TOTAL_FRAMES - 1)),
        TOTAL_FRAMES - 1
      );
      springFrame.set(targetFrame);
    }, [scrollProgress, springFrame]);

    // Draw the correct frame on the canvas
    const drawFrame = useCallback(
      (frameIndex: number) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Guard: images array may be empty on initial mount
        if (!images || images.length === 0) {
          ctx.fillStyle = '#050505';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          return;
        }

        const idx = Math.max(0, Math.min(images.length - 1, Math.round(frameIndex)));
        const img = images[idx];
        if (!img || !img.complete || img.naturalWidth === 0) return;

        // object-fit: cover — fills the entire canvas, no black bars
        const scale = Math.max(
          canvas.width / img.naturalWidth,
          canvas.height / img.naturalHeight
        );
        const drawW = img.naturalWidth * scale;
        const drawH = img.naturalHeight * scale;
        const drawX = (canvas.width - drawW) / 2;
        const drawY = (canvas.height - drawH) / 2;

        // Fill void first (in case image has transparent edges)
        ctx.fillStyle = '#050505';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.drawImage(img, drawX, drawY, drawW, drawH);
      },
      [images]
    );

    // Resize handler — must run before RAF
    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const handleResize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        // Redraw current frame after resize
        drawFrame(currentFrameRef.current);
      };

      handleResize();
      window.addEventListener('resize', handleResize, { passive: true });
      return () => window.removeEventListener('resize', handleResize);
    }, [drawFrame]);

    // RAF loop — subscribe to spring value
    useEffect(() => {
      if (!isLoaded) return;

      // Draw first frame immediately
      drawFrame(0);
      currentFrameRef.current = 0;

      const unsubscribe = springFrame.on('change', (latest) => {
        const rounded = Math.round(latest);
        if (rounded !== currentFrameRef.current) {
          currentFrameRef.current = rounded;
          drawFrame(rounded);
        }
      });

      return () => unsubscribe();
    }, [isLoaded, springFrame, drawFrame]);

    return (
      <canvas
        ref={canvasRef}
        className="fixed inset-0"
        style={{
          backgroundColor: '#050505',
          display: 'block',
          width: '100vw',
          height: '100vh',
        }}
        aria-hidden="true"
      />
    );
  }
);

AntigravityCanvas.displayName = 'AntigravityCanvas';

export default AntigravityCanvas;
export { TOTAL_FRAMES };
