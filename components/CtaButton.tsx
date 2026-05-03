"use client";

import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import { product } from "@/lib/product";

type Props = {
  quantity?: number;
  label?: string;
  className?: string;
};

export function CtaButton({ quantity = 1, label = "Order Now", className = "" }: Props) {
  const href = `/checkout?product=${encodeURIComponent(product.name)}&quantity=${quantity}&price=${product.offerPrice}`;
  return (
    <Link
      href={href}
      className={`focus-ring inline-flex items-center justify-center gap-2 rounded-md bg-barca-red px-5 py-3 text-sm font-bold text-white shadow-soft transition hover:bg-[#870038] ${className}`}
    >
      <ShoppingBag className="h-4 w-4" />
      {label}
    </Link>
  );
}
