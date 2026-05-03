"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { product } from "@/lib/product";

export function ProductGallery() {
  const [active, setActive] = useState(0);
  const current = product.images[active];

  function next() {
    setActive((value) => (value + 1) % product.images.length);
  }

  function previous() {
    setActive((value) => (value - 1 + product.images.length) % product.images.length);
  }

  return (
    <div className="w-full max-w-full space-y-5 lg:max-w-[520px]">
      <div className="group relative overflow-hidden rounded-lg border border-slate-200 bg-white shadow-[0_22px_70px_rgba(15,23,42,0.12)] transition duration-300 hover:shadow-[0_28px_90px_rgba(15,23,42,0.16)]">
        <div className="relative aspect-[4/5] w-full overflow-hidden">
          <Image
            key={current.src}
            src={current.src}
            alt={current.alt}
            fill
            priority={active === 0}
            className="object-cover opacity-0 transition duration-300 ease-in-out animate-[fadeIn_350ms_ease-in-out_forwards] group-hover:scale-[1.04]"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
        <button
          type="button"
          aria-label="Previous image"
          onClick={previous}
          className="focus-ring absolute left-3 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-slate-900 shadow-sm transition hover:bg-white"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button
          type="button"
          aria-label="Next image"
          onClick={next}
          className="focus-ring absolute right-3 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-slate-900 shadow-sm transition hover:bg-white"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
      <div className="grid grid-cols-4 gap-3 sm:gap-4">
        {product.images.map((image, index) => (
          <button
            key={image.src}
            type="button"
            onClick={() => setActive(index)}
            aria-label={`Show product image ${index + 1}`}
            className={`focus-ring group relative aspect-square overflow-hidden rounded-md border bg-white shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-md ${
              active === index ? "border-barca-blue ring-2 ring-barca-blue/50" : "border-slate-200"
            }`}
          >
            <Image src={image.src} alt={image.alt} fill className="object-cover transition duration-500 group-hover:scale-105" sizes="120px" />
          </button>
        ))}
      </div>
    </div>
  );
}
