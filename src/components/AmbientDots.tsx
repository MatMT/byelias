"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const DOT_SPACING = 18;
const POINTER_RADIUS = 148;

export function AmbientDots() {
  const fieldRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useGSAP(
    (_, contextSafe) => {
      const field = fieldRef.current;
      const canvas = canvasRef.current;
      const context = canvas?.getContext("2d", { alpha: true });

      if (!field || !canvas || !context) return;

      let width = 0;
      let height = 0;
      let pixelRatio = 1;
      let drawFrame = 0;
      const pointer = { x: -1000, y: -1000, strength: 0 };
      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      const draw = () => {
        if (!width || !height) return;

        const bounds = field.getBoundingClientRect();
        const pointerX = pointer.x - bounds.left;
        const pointerY = pointer.y - bounds.top;
        const isDark = document.documentElement.classList.contains("dark");
        const baseAlpha = isDark ? 0.24 : 0.27;
        const dotColor = isDark ? "143, 161, 187" : "105, 122, 148";

        context.clearRect(0, 0, width, height);

        for (let y = DOT_SPACING / 2; y < height; y += DOT_SPACING) {
          for (let x = DOT_SPACING / 2; x < width; x += DOT_SPACING) {
            const dx = x - pointerX;
            const dy = y - pointerY;
            const distance = Math.hypot(dx, dy);
            const falloff = Math.max(0, 1 - distance / POINTER_RADIUS);
            const influence = falloff * falloff * pointer.strength;
            const repel = reducedMotion ? 0 : influence * 12;
            const directionX = distance > 0 ? dx / distance : 0;
            const directionY = distance > 0 ? dy / distance : 0;
            const dotX = x + directionX * repel;
            const dotY = y + directionY * repel;
            const radius = 1.05 + influence * 1.8;
            const alpha = Math.min(0.82, baseAlpha + influence * 0.62);

            context.beginPath();
            context.fillStyle = `rgba(${dotColor}, ${alpha})`;
            context.arc(dotX, dotY, radius, 0, Math.PI * 2);
            context.fill();
          }
        }
      };

      const scheduleDraw = () => {
        if (drawFrame) return;
        drawFrame = window.requestAnimationFrame(() => {
          drawFrame = 0;
          draw();
        });
      };

      const resize = () => {
        const bounds = field.getBoundingClientRect();
        width = bounds.width;
        height = bounds.height;
        pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = Math.round(width * pixelRatio);
        canvas.height = Math.round(height * pixelRatio);
        context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
        draw();
      };

      const movePointer = gsap.quickTo(pointer, "x", {
        duration: reducedMotion ? 0 : 0.22,
        ease: "power2.out",
        onUpdate: scheduleDraw,
      });
      const movePointerY = gsap.quickTo(pointer, "y", {
        duration: reducedMotion ? 0 : 0.22,
        ease: "power2.out",
        onUpdate: scheduleDraw,
      });
      const changeStrength = gsap.quickTo(pointer, "strength", {
        duration: reducedMotion ? 0 : 0.3,
        ease: "power2.out",
        onUpdate: scheduleDraw,
      });

      const makeContextSafe = contextSafe ?? ((callback) => callback);
      const handlePointerMove = makeContextSafe((event: PointerEvent) => {
        if (event.pointerType === "touch") return;
        movePointer(event.clientX);
        movePointerY(event.clientY);
        changeStrength(1);
      });
      const handlePointerLeave = makeContextSafe(() => changeStrength(0));

      const resizeObserver = new ResizeObserver(resize);
      const themeObserver = new MutationObserver(draw);
      resizeObserver.observe(field);
      themeObserver.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["class"],
      });
      window.addEventListener("pointermove", handlePointerMove, {
        passive: true,
      });
      window.addEventListener("blur", handlePointerLeave);

      const motion = gsap.matchMedia();
      motion.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.to(field, {
          x: -DOT_SPACING,
          duration: 10,
          ease: "none",
          repeat: -1,
        });
      });

      resize();

      return () => {
        motion.revert();
        resizeObserver.disconnect();
        themeObserver.disconnect();
        if (drawFrame) window.cancelAnimationFrame(drawFrame);
        window.removeEventListener("pointermove", handlePointerMove);
        window.removeEventListener("blur", handlePointerLeave);
      };
    },
    { scope: fieldRef },
  );

  return (
    <div
      ref={fieldRef}
      className="pointer-events-none absolute -inset-8 overflow-hidden"
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  );
}
