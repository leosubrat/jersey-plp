"use client";

import { Suspense } from "react";
import Link from "next/link";
import { CheckCircle2, Home } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { formatMoney, product } from "@/lib/product";

function ThankYouContent() {
  const params = useSearchParams();
  const productName = params.get("product") || product.name;
  const quantity = Number(params.get("quantity") || 1);
  const total = Number(params.get("total") || product.offerPrice);
  const orderId = params.get("orderId");

  return (
    <div className="mx-auto max-w-2xl rounded-lg border border-slate-200 bg-white p-6 text-center shadow-soft md:p-10">
      <CheckCircle2 className="mx-auto mb-5 h-14 w-14 text-barca-blue" />
      <p className="mb-2 text-sm font-black uppercase tracking-wide text-barca-red">Order received</p>
      <h1 className="text-4xl font-black text-slate-950">Thank you for your order!</h1>
      <p className="mt-4 leading-7 text-slate-600">Our sales representative will call you soon to confirm your order.</p>

      <div className="mt-8 grid gap-3 rounded-lg bg-slate-50 p-5 text-left">
        {orderId && <Summary label="Order ID" value={orderId} />}
        <Summary label="Product ordered" value={productName} />
        <Summary label="Quantity" value={String(quantity)} />
        <Summary label="Total price" value={formatMoney(total)} />
        <Summary label="Payment method" value="Cash On Delivery" />
      </div>

      <Link
        href="/"
        className="focus-ring mt-8 inline-flex items-center justify-center gap-2 rounded-md bg-barca-red px-5 py-3 font-black text-white transition hover:bg-[#870038]"
      >
        <Home className="h-5 w-5" />
        Back to Home
      </Link>
    </div>
  );
}

function Summary({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-3 last:border-b-0 last:pb-0">
      <span className="text-sm font-bold text-slate-500">{label}</span>
      <span className="text-right font-bold text-slate-950">{value}</span>
    </div>
  );
}

export default function ThankYouPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-slate-50 px-5 py-10">
      <Suspense>
        <ThankYouContent />
      </Suspense>
    </main>
  );
}
