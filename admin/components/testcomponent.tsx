"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

const StarShower: React.FC = () => {
  const [stars, setStars] = React.useState<
    Array<{
      id: number;
      top: string;
      left: string;
      width: string;
      height: string;
      duration: string;
      delay: string;
    }>
  >([]);

  React.useEffect(() => {
    const generatedStars = Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      width: `${Math.random() * 2 + 1}px`,
      height: `${Math.random() * 2 + 1}px`,
      duration: `${Math.random() * 10 + 5}s`,
      delay: `${Math.random() * 10}s`,
    }));
    setStars(generatedStars);
  }, []);

  return (
    <div className="absolute inset-0 z-5 pointer-events-none overflow-hidden">
      {stars.map((star) => (
        <div
          key={star.id}
          className="star absolute bg-white rounded-full opacity-0"
          style={{
            top: star.top,
            left: star.left,
            width: star.width,
            height: star.height,
            boxShadow: "0 0 10px #fff, 0 0 20px #ff0000",
            animation: `fall ${star.duration} linear infinite`,
            animationDelay: star.delay,
          }}
        />
      ))}
      <style jsx>{`
        @keyframes fall {
          0% {
            transform: translate(0, 0) scale(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
            transform: translate(-20px, 20px) scale(1);
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translate(-200px, 200px) scale(0.5);
            opacity: 0;
          }
        }
        .star {
          filter: blur(0.5px);
        }
      `}</style>
    </div>
  );
};

/**
 * ComingSoon
 * - Added `clockCandidates` prop (optional) -> array of possible paths for the main clock image.
 * - Tries candidates in order; if one fails (onError), it switches to the next.
 */
type ComingSoonProps = {
  clockCandidates?: string[];
};

const ComingSoon: React.FC<ComingSoonProps> = ({
  clockCandidates = [
    "/imgs/main clock.jpeg", // original (space)
    "/imgs/main-clock.jpeg", // dash variant
    "/assets/images/main-clock.jpeg", // alternative path example
    "/imgs/main_clock.jpeg", // underscore variant
  ],
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // state to track which candidate is currently being used
  const [candidateIndex, setCandidateIndex] = useState<number>(0);
  const [clockSrc, setClockSrc] = useState<string>(clockCandidates[0] || "");

  // keep clockSrc in sync when user passes a different array
  useEffect(() => {
    setCandidateIndex(0);
    setClockSrc(clockCandidates[0] || "");
  }, [clockCandidates]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX - innerWidth / 2) / (innerWidth / 2);
      const y = (e.clientY - innerHeight / 2) / (innerHeight / 2);

      const layers = containerRef.current.querySelectorAll(".parallax-layer");
      layers.forEach((layer) => {
        const el = layer as HTMLElement;
        const speed = parseFloat(el.dataset.speed || "0");
        const depth = parseFloat(el.dataset.depth || "0");

        // 3D Multi-axis parallax logic
        const tx = x * speed * 60;
        const ty = y * speed * 40;
        const rY = x * speed * 15; // Dynamic Y rotation
        const rX = -y * speed * 15; // Dynamic X rotation
        const s = 1 + Math.abs(x * y) * 0.05 * speed; // Proximity scaling

        el.style.transform = `translate(calc(-50% + ${tx}px), ${ty}px) translateZ(${depth}px) rotateY(${rY}deg) rotateX(${rX}deg) scale(${s})`;
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // when next/image fails to load current src, this will try the next candidate
  const handleClockError = () => {
    const nextIndex = candidateIndex + 1;
    if (nextIndex < clockCandidates.length) {
      setCandidateIndex(nextIndex);
      setClockSrc(clockCandidates[nextIndex]);
    } else {
      // all candidates failed — optionally set to a safe fallback or leave blank
      // setClockSrc('/imgs/fallback-clock.png');
      console.warn("ComingSoon: all clock image candidates failed to load.");
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-[#050000] flex flex-col items-center justify-center font-sans select-none"
      style={{ perspective: "1200px" }}
    >
      {/* 1. CINEMATIC BACKGROUND ATMOSPHERE */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,_#5a0000_0%,_#1a0000_45%,_#050000_80%,_#000000_100%)] z-0"></div>

      {/* 1.1 LIVE STAR SHOWER BACKGROUND */}
      <StarShower />

      {/* 2. MASSIVE BACKGROUND CLOCK - Deep Depth Layer */}
      <div
        className="absolute top-[-52%] left-[94%] -translate-x-1/2 z-10 opacity-[0.35] pointer-events-none parallax-layer"
        data-speed="0.01"
        data-depth="-250"
        style={{
          width: "min(1200px, 150vw)",
          height: "min(1200px, 150vw)",
          maskImage:
            "radial-gradient(circle at 50% 50%, black 25%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(circle at 50% 50%, black 25%, transparent 80%)",
        }}
      >
        <div className="relative w-full h-full scale-x-[-1]">
          {/* next/image onError is supported; we use it to attempt next candidate */}
          <Image
            src={clockSrc}
            alt="Massive Clock Spiral"
            fill
            className="object-contain filter brightness-[1.1] contrast-[1.3] saturate-[0.9]"
            priority
            onError={handleClockError}
          />
        </div>
      </div>

      {/* ... rest of your layout unchanged ... */}

      {/* 2.1 TOP CENTER: ROTATING TIME GEAR - Mid Depth Layer */}
      <div
        className="absolute top-[-25%] left-[60%] z-20 pointer-events-none parallax-layer"
        data-speed="0.04"
        data-depth="-80"
        style={{ transform: "translateX(-50%)" }}
      >
        <div className="relative w-[300px] h-[300px] md:w-[450px] md:h-[450px] flex items-center justify-center">
          <div className="absolute inset-x-[-120px] top-[-120px] bottom-[-120px] bg-red-700/40 blur-[150px] rounded-full scale-125 animate-pulse"></div>
          <div className="absolute inset-x-[-40px] top-[-40px] bottom-[-40px] bg-orange-600/20 blur-[80px] rounded-full scale-110"></div>

          <div className="relative z-20 w-full h-full animate-[spin_180s_linear_infinite] opacity-90 mix-blend-screen scale-[0.9]">
            <Image
              src="/imgs/clock.png"
              alt="Time Gears"
              fill
              className="object-contain filter saturate-[1.8] brightness-[1.2] drop-shadow-[0_0_100px_rgba(255,100,0,0.5)]"
              priority
            />
          </div>
        </div>
      </div>

      {/* 3. CHORNO SHIFT LOGO - Forward Mid Depth */}
      <div
        className="absolute top-[18%] left-1/2 z-30 pointer-events-none parallax-layer"
        data-speed="0.07"
        data-depth="80"
        style={{ transform: "translateX(-50%)" }}
      >
        <div className="relative flex flex-col items-center animate-[float_8s_ease-in-out_infinite]">
          <div className="absolute inset-x-[-120px] top-[-60px] bottom-[-60px] blur-[150px] bg-white/5 rounded-full scale-150"></div>
          <div className="absolute inset-x-[-80px] top-[-40px] bottom-[-40px] blur-[100px] bg-red-600/15 rounded-full scale-125 animate-pulse"></div>

          <Image
            src="/imgs/logo (1).png"
            alt="Chorno Shift"
            width={450}
            height={225}
            className="relative z-10 brightness-[1.4] contrast-[1.1] drop-shadow-[0_0_50px_rgba(255,255,255,0.2)]"
            priority
          />
        </div>
      </div>

      {/* 4. GROUND MIST / TERRAIN (ground.png) */}
      <div className="absolute bottom-0 left-0 w-full h-[50vh] z-40 pointer-events-none">
        <div className="absolute inset-x-0 bottom-0 h-full bg-gradient-to-t from-[#050000] via-[#050000]/80 to-transparent"></div>
        <div className="absolute bottom-0 w-full h-full opacity-70 mix-blend-screen">
          <Image
            src="/imgs/ground.png"
            alt="Mist Terrain"
            fill
            className="object-cover object-bottom saturate-[1.2] brightness-[1.1]"
          />
        </div>
      </div>

      {/* 5. CHARACTER - Foreground Layer */}
      <div
        className="absolute bottom-[10%] left-1/2 z-50 flex justify-center w-full parallax-layer"
        data-speed="0.12"
        data-depth="200"
        style={{ transform: "translateX(-50%)" }}
      >
        <div className="relative flex flex-col items-center max-w-[320px] animate-[float_6s_ease-in-out_infinite_alternate]">
          <Image
            src="/imgs/Charactor.png"
            alt="Chorno Character"
            width={320}
            height={420}
            className="w-full h-auto object-contain filter drop-shadow-[0_40px_120px_rgba(0,0,0,0.8)] brightness-[1.15]"
          />

          {/* Character Hand Light (Pulse effect) */}
          <div className="absolute top-[34%] left-[18%] w-24 h-24 bg-orange-600 rounded-full blur-[45px] opacity-90 animate-pulse"></div>
          <div className="absolute top-[37.5%] left-[21.5%] w-8 h-8 bg-white rounded-full blur-[10px] opacity-95"></div>
          <div className="absolute top-[37.5%] left-[21.5%] w-10 h-10 bg-yellow-400 rounded-full blur-[18px] opacity-40 animate-ping"></div>

          <div className="mt-[-40px] relative z-[60] flex flex-col items-center w-full">
            <h2 className="text-white text-5xl md:text-7xl font-black tracking-[0.35em] uppercase text-center whitespace-nowrap">
              <span className="bg-gradient-to-b from-white via-red-200 to-red-500 bg-clip-text text-transparent drop-shadow-[0_15px_50px_rgba(0,0,0,1)]">
                Coming Soon
              </span>
            </h2>
            <div className="mt-4 w-64 h-[2px] bg-gradient-to-r from-transparent via-red-500/60 to-transparent"></div>
          </div>
        </div>
      </div>

      {/* 6. FOOTER CREDITS */}
      <div className="absolute bottom-10 z-[70] w-full text-center px-4">
        <p className="text-white/40 text-[11px] md:text-[13px] tracking-[0.65em] font-medium uppercase leading-relaxed pointer-events-none drop-shadow-md">
          BANDARANAYAKE COLLEGE COMPUTER SOCIETY
          <br />
          <span className="opacity-40 tracking-[0.4em] text-[10px] mt-2 block font-light">
            PROUDLY PRESENTS
          </span>
        </p>
      </div>

      {/* 7. GLOBAL CINEMATIC OVERLAYS */}
      <div className="absolute inset-0 pointer-events-none z-[80] shadow-[inset_0_0_200px_rgba(0,0,0,1)]"></div>
      <div className="absolute inset-0 pointer-events-none z-[81] bg-[radial-gradient(circle_at_center,transparent_20%,rgba(0,0,0,0.95)_100%)] opacity-85"></div>

      <style jsx global>{`
        @keyframes float {
          0% {
            transform: translate3d(0, 0, 0);
          }
          50% {
            transform: translate3d(0, -20px, 0);
          }
          100% {
            transform: translate3d(0, 0, 0);
          }
        }
        .parallax-layer {
          transition: transform 0.15s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          transform-style: preserve-3d;
        }
      `}</style>
    </div>
  );
};

export default ComingSoon;
