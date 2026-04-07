"use client";

import { useEffect, useRef } from "react";

export function MatrixBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrame: number;
    const isMobile = window.innerWidth < 640;
    const fontSize = isMobile ? 20 : 16;
    let columns = 0;
    let drops: number[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const newCols = Math.floor(canvas.width / fontSize);
      if (newCols !== columns) {
        columns = newCols;
        drops = Array(columns).fill(0);
      }
    };

    resize();
    window.addEventListener("resize", resize);

    const characters = "01/\\|#";
    let lastTime = 0;
    const frameInterval = isMobile ? 80 : 50;

    const draw = (time: number) => {
      animationFrame = requestAnimationFrame(draw);
      if (time - lastTime < frameInterval) return;
      lastTime = time;

      ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "rgba(0, 255, 65, 0.12)";
      ctx.font = `${fontSize}px 'Fira Code', monospace`;

      for (let i = 0; i < drops.length; i += 1) {
        const text = characters.charAt(Math.floor(Math.random() * characters.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i] += 1;
      }
    };

    animationFrame = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 opacity-20 [mix-blend-mode:screen]"
    />
  );
}
