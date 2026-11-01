"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface CubieData {
  id: string;
  x: number; // -1, 0, 1
  y: number; // -1, 0, 1
  z: number; // -1, 0, 1
}

// 27 cubies of the 3x3x3 Rubik's cube
const INITIAL_CUBIES: CubieData[] = [];
for (let x = -1; x <= 1; x++) {
  for (let y = -1; y <= 1; y++) {
    for (let z = -1; z <= 1; z++) {
      INITIAL_CUBIES.push({ id: `${x}_${y}_${z}`, x, y, z });
    }
  }
}

export default function InteractiveCube({ className = "" }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const [isHovered, setIsHovered] = useState(false);

  // Rotation angles (Euler degrees)
  const rotRef = useRef({
    x: -24,
    y: -34,
    targetX: -24,
    targetY: -34,
    lightX: 50,
    lightY: 45,
    targetLightX: 50,
    targetLightY: 45,
  });

  const isDraggingRef = useRef(false);
  const pointerStartRef = useRef({ x: 0, y: 0 });

  // Smooth animation frame loop
  useEffect(() => {
    let animId: number;
    let startTime = performance.now();

    const loop = (now: number) => {
      const elapsed = (now - startTime) / 1000;
      const rot = rotRef.current;

      if (!isDraggingRef.current) {
        if (!isHovered) {
          // Slow organic 3D idle floating breathing rotation
          const idleX = -24 + Math.sin(elapsed * 0.8) * 6;
          const idleY = -34 + Math.sin(elapsed * 0.5) * 12 + elapsed * 3; // subtle gentle auto-turn
          rot.targetX = idleX;
          rot.targetY = idleY;
          rot.targetLightX = 50 + Math.sin(elapsed * 0.8) * 18;
          rot.targetLightY = 45 + Math.cos(elapsed * 1.0) * 15;
        }
      }

      // Physics lerp interpolation
      const factor = isDraggingRef.current ? 0.35 : 0.08;
      rot.x += (rot.targetX - rot.x) * factor;
      rot.y += (rot.targetY - rot.y) * factor;
      rot.lightX += (rot.targetLightX - rot.lightX) * 0.08;
      rot.lightY += (rot.targetLightY - rot.lightY) * 0.08;

      if (stageRef.current) {
        stageRef.current.style.transform = `rotateX(${rot.x.toFixed(2)}deg) rotateY(${rot.y.toFixed(2)}deg)`;
      }

      if (glowRef.current) {
        const glowOpacity = isHovered ? 0.22 : 0.12;
        glowRef.current.style.background = `radial-gradient(circle at ${rot.lightX.toFixed(1)}% ${rot.lightY.toFixed(1)}%, rgba(229, 201, 143, ${glowOpacity}) 0%, rgba(201, 164, 92, ${glowOpacity * 0.5}) 35%, transparent 70%)`;
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [isHovered]);

  // Pointer Drag handling (Mouse & Touch for full 360° rotation)
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    isDraggingRef.current = true;
    pointerStartRef.current = { x: e.clientX, y: e.clientY };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isDraggingRef.current) {
      const dx = e.clientX - pointerStartRef.current.x;
      const dy = e.clientY - pointerStartRef.current.y;
      pointerStartRef.current = { x: e.clientX, y: e.clientY };

      rotRef.current.targetY += dx * 0.7;
      rotRef.current.targetX -= dy * 0.7;
    } else if (containerRef.current) {
      // Magnetic cursor tilt when hovering
      const rect = containerRef.current.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      rotRef.current.targetY = -34 + nx * 50;
      rotRef.current.targetX = -24 - ny * 40;
      rotRef.current.targetLightX = ((e.clientX - rect.left) / rect.width) * 100;
      rotRef.current.targetLightY = ((e.clientY - rect.top) / rect.height) * 100;
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    isDraggingRef.current = false;
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }
  };

  const STEP = 52; // distance between cubie centers in px

  return (
    <div
      ref={containerRef}
      className={`rubiks-container ${isHovered ? "is-cube-hovered" : ""} ${className}`}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        isDraggingRef.current = false;
      }}
      role="region"
      aria-label="Interactive Optimum Black Rubik's Cube with Neon Golden Glow"
    >
      {/* Neon gold shifting ambient lighting */}
      <div ref={glowRef} className="rubiks-glow" aria-hidden="true" />

      {/* Orbital Neon Rings in 3D */}
      <div className="rubiks-ring ring-outer" aria-hidden="true" />
      <div className="rubiks-ring ring-inner" aria-hidden="true" />

      {/* 3D Viewport Stage */}
      <div className="rubiks-viewport">
        <div ref={stageRef} className="rubiks-cube-master">
          {INITIAL_CUBIES.map((c) => {
            const posX = c.x * STEP;
            const posY = c.y * STEP;
            const posZ = c.z * STEP;

            return (
              <div
                key={c.id}
                className="cubie"
                style={{
                  transform: `translate3d(${posX}px, ${posY}px, ${posZ}px)`,
                }}
              >
                {/* 6 Faces of each cubie — All styled in optimum stealth black */}
                {/* Front (z === 1) */}
                <div className={`cubie-face face-front ${c.z === 1 ? "sticker" : "internal-core"}`}>
                  {c.z === 1 && <div className="sticker-surface" />}
                </div>

                {/* Back (z === -1) */}
                <div className={`cubie-face face-back ${c.z === -1 ? "sticker" : "internal-core"}`}>
                  {c.z === -1 && <div className="sticker-surface" />}
                </div>

                {/* Top (y === -1) — Changed from old gold to optimum black */}
                <div className={`cubie-face face-top ${c.y === -1 ? "sticker" : "internal-core"}`}>
                  {c.y === -1 && <div className="sticker-surface" />}
                </div>

                {/* Bottom (y === 1) */}
                <div className={`cubie-face face-bottom ${c.y === 1 ? "sticker" : "internal-core"}`}>
                  {c.y === 1 && <div className="sticker-surface" />}
                </div>

                {/* Right (x === 1) */}
                <div className={`cubie-face face-right ${c.x === 1 ? "sticker" : "internal-core"}`}>
                  {c.x === 1 && <div className="sticker-surface" />}
                </div>

                {/* Left (x === -1) */}
                <div className={`cubie-face face-left ${c.x === -1 ? "sticker" : "internal-core"}`}>
                  {c.x === -1 && <div className="sticker-surface" />}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
