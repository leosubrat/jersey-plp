"use client";

import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import { CtaButton } from "@/components/CtaButton";
import { formatMoney, product } from "@/lib/product";

export function QuantityOrderBox() {
  const [quantity, setQuantity] = useState(1);
  const total = quantity * product.offerPrice;

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-soft md:p-8">
      <div className="mb-5 flex items-start justify-between gap-5 max-sm:flex-col">
        <div>
          <p className="text-sm font-bold text-slate-500">Offer Price:</p>
          <div className="flex flex-wrap items-baseline gap-3">
            <span className="text-4xl font-black leading-none text-barca-red">{formatMoney(product.offerPrice)}</span>
            <span className="text-lg font-semibold text-slate-400 line-through">{formatMoney(product.originalPrice)}</span>
          </div>
        </div>
        <div className="rounded-md bg-barca-gold/20 px-3.5 py-2.5 text-xs font-black leading-5 text-slate-900 shadow-sm">Free FC Barcelona banner included</div>
      </div>

      <p className="mb-5 inline-flex rounded-md bg-barca-blue/10 px-3 py-1.5 text-sm font-black text-barca-blue">Limited stock available</p>

      <div className="mb-6 rounded-md border border-slate-200 bg-slate-50 p-4 text-sm leading-7 text-slate-700">
        Book your jersey with a prepayment of NPR 500–1000. Pay the remaining amount through Cash on Delivery.
      </div>

      <div className="mb-6 flex items-center justify-between gap-4">
        <span className="font-bold text-slate-900">Quantity</span>
        <div className="grid h-10 grid-cols-[42px_58px_42px] overflow-hidden rounded-md border border-slate-200">
          <button
            type="button"
            aria-label="Decrease quantity"
            onClick={() => setQuantity((value) => Math.max(1, value - 1))}
            className="focus-ring grid place-items-center bg-white text-slate-700"
          >
            <Minus className="h-4 w-4" />
          </button>
          <div className="grid place-items-center border-x border-slate-200 bg-slate-50 font-bold">{quantity}</div>
          <button
            type="button"
            aria-label="Increase quantity"
            onClick={() => setQuantity((value) => value + 1)}
            className="focus-ring grid place-items-center bg-white text-slate-700"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="mb-6 flex items-center justify-between border-t border-slate-200 pt-5">
        <span className="text-sm font-semibold text-slate-500">Product total</span>
        <span className="text-2xl font-black text-slate-950">{formatMoney(total)}</span>
      </div>

      <CtaButton quantity={quantity} label="Order Now" className="w-full bg-barca-blue py-4 text-base hover:bg-[#00336d]" />
    </div>
  );
}
