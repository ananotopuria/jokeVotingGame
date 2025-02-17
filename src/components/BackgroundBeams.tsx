"use client";

import { useEffect, useRef } from "react";

export default function BackgroundBeams() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return; 

    const ctx = canvas.getContext("2d");
    if (!ctx) return; 

    function resizeCanvas() {
      if (!canvas) return; 
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const beams = Array.from({ length: 10 }, () => ({
      x: Math.random() * (canvas?.width ?? 800), 
      y: Math.random() * (canvas?.height ?? 600), 
      speedX: Math.random() * 2 - 1,
      speedY: Math.random() * 2 - 1,
      color: `hsl(${Math.random() * 360}, 100%, 70%)`,
    }));

    function animate() {
      if (!ctx || !canvas) return; 

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      beams.forEach((beam) => {
        beam.x += beam.speedX;
        beam.y += beam.speedY;

        if (beam.x <= 0 || beam.x >= canvas.width) beam.speedX *= -1;
        if (beam.y <= 0 || beam.y >= canvas.height) beam.speedY *= -1;

        ctx.beginPath();
        ctx.arc(beam.x, beam.y, 5, 0, Math.PI * 2);
        ctx.fillStyle = beam.color;
        ctx.fill();
      });
      requestAnimationFrame(animate);
    }

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
    />
  );
}
