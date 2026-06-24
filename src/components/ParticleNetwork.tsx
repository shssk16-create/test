"use client";
import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import type { Engine } from "tsparticles-engine";

export default function ParticleNetwork({ color = "#A1824A" }: { color?: string }) {
  const particlesInit = useCallback(async (engine: Engine) => { await loadSlim(engine); }, []);
  return (
    <Particles id="tsparticles" init={particlesInit} className="absolute inset-0 -z-20"
      options={{
        fullScreen: { enable: false, zIndex: -1 },
        background: { color: { value: "transparent" } },
        fpsLimit: 120,
        interactivity: { events: { onHover: { enable: true, mode: "grab" }, resize: true }, modes: { grab: { distance: 140, links: { opacity: 0.5 } } } },
        particles: {
          color: { value: color },
          links: { color: color, distance: 150, enable: true, opacity: 0.2, width: 1 },
          move: { enable: true, outModes: { default: "bounce" }, speed: 1 },
          number: { density: { enable: true, area: 800 }, value: 60 },
          opacity: { value: 0.3 },
          shape: { type: "circle" },
          size: { value: { min: 1, max: 2 } },
        },
        detectRetina: true,
      }}
    />
  );
}
