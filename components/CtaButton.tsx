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
      className={`focus-ring inline-flex items-center justify-center gap-2 rounded-md bg-barca-red px-6 py-3.5 text-sm font-black text-white shadow-soft transition duration-200 hover:-translate-y-0.5 hover:bg-[#870038] ${className}`}
    >
      <ShoppingBag className="h-4 w-4" />
      {label}
    </Link>
  );
}
