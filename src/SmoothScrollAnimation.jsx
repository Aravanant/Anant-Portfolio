import React, { useEffect, useRef } from 'react';

const TOTAL_FRAMES = 299;

const getFramePath = (index) => {
  const paddedIndex = String(index).padStart(3, '0');
  return `/img_frames/ezgif-frame-${paddedIndex}.jpg`;
};

export default function SmoothScrollAnimation({
  totalFrames = TOTAL_FRAMES,
  damping = 0.09,
}) {
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const targetFrameRef = useRef(1);
  const currentFrameRef = useRef(1);
  const lastDrawnFrameRef = useRef(-1);
  const animationFrameIdRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Use alpha: false for maximum rendering performance
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    imagesRef.current = new Array(totalFrames + 1);

    // Set canvas dimensions with Device Pixel Ratio for crispness
    const updateCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1;
      const width = window.innerWidth;
      const height = window.innerHeight;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      lastDrawnFrameRef.current = -1;
      drawFrame(Math.round(currentFrameRef.current));
    };

    // Draw frame on canvas with aspect ratio 'cover' scaling and desktop right-alignment
    const drawFrame = (frameIndex) => {
      const clampedIndex = Math.max(1, Math.min(totalFrames, frameIndex));
      let img = imagesRef.current[clampedIndex];

      // Fallback to nearest loaded frame if current isn't ready yet
      if (!img || !img.complete || img.naturalWidth === 0) {
        let nearestImg = null;
        let minDiff = Infinity;
        for (let i = 1; i <= totalFrames; i++) {
          const candidate = imagesRef.current[i];
          if (candidate && candidate.complete && candidate.naturalWidth > 0) {
            const diff = Math.abs(i - clampedIndex);
            if (diff < minDiff) {
              minDiff = diff;
              nearestImg = candidate;
            }
          }
        }
        img = nearestImg;
      }

      if (!img) return;

      const cw = canvas.width;
      const ch = canvas.height;
      const iw = img.naturalWidth;
      const ih = img.naturalHeight;

      if (!iw || !ih) return;

      // Calculate object-fit: cover scaling
      const hRatio = cw / iw;
      const vRatio = ch / ih;
      const ratio = Math.max(hRatio, vRatio);

      const renderWidth = iw * ratio;
      const renderHeight = ih * ratio;

      // On desktop screens (width >= 1024), shift portrait to the right
      // so the left side is completely open for hero text (matching reference image)
      const isDesktop = window.innerWidth >= 1024;
      const shiftX = isDesktop ? cw * 0.16 : 0;

      const offsetX = (cw - renderWidth) / 2 + shiftX;
      const offsetY = (ch - renderHeight) / 2;

      // Fill canvas with exact corner background tone of frames
      ctx.fillStyle = '#11171b';
      ctx.fillRect(0, 0, cw, ch);
      ctx.drawImage(img, offsetX, offsetY, renderWidth, renderHeight);

      lastDrawnFrameRef.current = clampedIndex;
    };

    // Preload frame 1 immediately for instant display
    const firstImg = new Image();
    firstImg.src = getFramePath(1);
    firstImg.onload = () => {
      imagesRef.current[1] = firstImg;
      drawFrame(1);
    };
    imagesRef.current[1] = firstImg;

    // Preload remaining frames
    for (let i = 2; i <= totalFrames; i++) {
      const img = new Image();
      img.src = getFramePath(i);
      imagesRef.current[i] = img;
    }

    // Scroll calculation based on total scrollable page height
    const handleScroll = () => {
      const docHeight = document.documentElement.scrollHeight;
      const totalScrollable = docHeight - window.innerHeight;

      if (totalScrollable <= 0) {
        targetFrameRef.current = 1;
        return;
      }

      const scrolled = Math.max(0, window.scrollY || window.pageYOffset);
      const progress = Math.min(1, Math.max(0, scrolled / totalScrollable));
      targetFrameRef.current = 1 + progress * (totalFrames - 1);
    };

    // Smooth linear interpolation animation loop
    const renderLoop = () => {
      const diff = targetFrameRef.current - currentFrameRef.current;

      if (Math.abs(diff) > 0.001) {
        currentFrameRef.current += diff * damping;
      } else {
        currentFrameRef.current = targetFrameRef.current;
      }

      const frameToDraw = Math.round(currentFrameRef.current);
      if (frameToDraw !== lastDrawnFrameRef.current) {
        drawFrame(frameToDraw);
      }

      animationFrameIdRef.current = requestAnimationFrame(renderLoop);
    };

    updateCanvasSize();
    handleScroll();
    renderLoop();

    window.addEventListener('resize', updateCanvasSize, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('resize', updateCanvasSize);
      window.removeEventListener('scroll', handleScroll);
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, [totalFrames, damping]);

  return (
    <canvas
      ref={canvasRef}
      id="scroll-animation-canvas"
      aria-label="Interactive scroll animation background"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        display: 'block',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
}
