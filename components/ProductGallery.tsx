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
    <div className="space-y-4">
      <div className="relative overflow-hidden rounded-lg border border-slate-200 bg-white shadow-soft">
        <div className="relative aspect-[4/5] w-full">
          <Image src={current.src} alt={current.alt} fill priority className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
        </div>
        <button
          type="button"
          aria-label="Previous image"
          onClick={previous}
          className="focus-ring absolute left-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-slate-900 shadow"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          aria-label="Next image"
          onClick={next}
          className="focus-ring absolute right-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-slate-900 shadow"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
      <div className="grid grid-cols-4 gap-3">
        {product.images.map((image, index) => (
          <button
            key={image.src}
            type="button"
            onClick={() => setActive(index)}
            aria-label={`Show product image ${index + 1}`}
            className={`focus-ring relative aspect-square overflow-hidden rounded-md border bg-white ${
              active === index ? "border-barca-blue ring-2 ring-barca-blue" : "border-slate-200"
            }`}
          >
            <Image src={image.src} alt={image.alt} fill className="object-cover" sizes="120px" />
          </button>
        ))}
      </div>
    </div>
  );
}
