"use client";

import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import { CtaButton } from "@/components/CtaButton";
import { formatMoney, product } from "@/lib/product";

export function QuantityOrderBox() {
  const [quantity, setQuantity] = useState(1);
  const total = quantity * product.offerPrice;

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft">
      <div className="mb-4 flex items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-slate-500">Offer price</p>
          <div className="flex flex-wrap items-baseline gap-3">
            <span className="text-3xl font-black text-barca-red">{formatMoney(product.offerPrice)}</span>
            <span className="text-lg font-semibold text-slate-400 line-through">{formatMoney(product.originalPrice)}</span>
          </div>
        </div>
        <div className="rounded-md bg-barca-gold/20 px-3 py-2 text-sm font-bold text-slate-900">Free banner</div>
      </div>

      <div className="mb-4 rounded-md bg-slate-50 p-4 text-sm text-slate-700">
        Free delivery inside Kathmandu valley. Outside valley delivery fee is NPR 150 and can be selected at checkout.
      </div>

      <div className="mb-5 flex items-center justify-between gap-4">
        <span className="font-bold text-slate-900">Quantity</span>
        <div className="grid grid-cols-[40px_56px_40px] overflow-hidden rounded-md border border-slate-200">
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

      <div className="mb-5 flex items-center justify-between border-t border-slate-200 pt-4">
        <span className="text-sm font-semibold text-slate-500">Product total</span>
        <span className="text-2xl font-black text-slate-950">{formatMoney(total)}</span>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <CtaButton quantity={quantity} label="Purchase Now" className="sm:col-span-1" />
        <CtaButton quantity={quantity} label="Order Now" className="bg-barca-blue hover:bg-[#00336d] sm:col-span-1" />
        <CtaButton quantity={quantity} label="Buy Now" className="bg-slate-950 hover:bg-slate-800 sm:col-span-1" />
      </div>
    </div>
  );
}
