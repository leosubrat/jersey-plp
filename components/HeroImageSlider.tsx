"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

const heroSlides = [
  {
    src: "/jersey-front.png",
    alt: "Front view of FC Barcelona 2011 UCL final Messi number 10 retro jersey"
  },
  {
    src: "/jersey-back.png",
    alt: "Back view of FC Barcelona 2011 UCL final Messi number 10 retro jersey"
  }
];

export function HeroImageSlider() {
  const [active, setActive] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  function goTo(index: number) {
    setActive((index + heroSlides.length) % heroSlides.length);
  }

  function handleTouchEnd(event: React.TouchEvent<HTMLDivElement>) {
    if (touchStart === null) return;

    const distance = touchStart - event.changedTouches[0].clientX;
    if (Math.abs(distance) > 40) {
      goTo(active + (distance > 0 ? 1 : -1));
    }
    setTouchStart(null);
  }

  return (
    <div className="relative w-full max-w-full">
      <div className="absolute inset-5 rounded-lg bg-barca-blue/10" />
      <div
        className="group relative w-full max-w-full overflow-hidden rounded-lg border border-slate-200 bg-white shadow-soft"
        onTouchStart={(event) => setTouchStart(event.touches[0].clientX)}
        onTouchEnd={handleTouchEnd}
      >
        <div className="relative aspect-[4/5] w-full overflow-hidden">
          {heroSlides.map((slide, index) => (
            <Image
              key={slide.src}
              src={slide.src}
              alt={slide.alt}
              fill
              priority={index === 0}
              loading={index === 0 ? "eager" : "lazy"}
              sizes="(max-width: 768px) 100vw, 44vw"
              className={`object-cover transition-opacity duration-300 ease-in-out ${
                active === index ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
        </div>
        <button
          type="button"
          aria-label="Previous hero image"
          onClick={() => goTo(active - 1)}
          className="focus-ring absolute left-3 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-slate-900 shadow-sm transition hover:bg-white"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button
          type="button"
          aria-label="Next hero image"
          onClick={() => goTo(active + 1)}
          className="focus-ring absolute right-3 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-slate-900 shadow-sm transition hover:bg-white"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
      <div className="mt-3 flex justify-center gap-2">
        {heroSlides.map((slide, index) => (
          <button
            key={slide.src}
            type="button"
            aria-label={`Show hero image ${index + 1}`}
            onClick={() => goTo(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              active === index ? "w-6 bg-barca-blue" : "w-2 bg-slate-300 hover:bg-slate-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
