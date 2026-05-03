"use client";

import { Suspense, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, Loader2, LockKeyhole, PackageCheck } from "lucide-react";
import { formatMoney, product } from "@/lib/product";

type Errors = Record<string, string>;

function readNumber(value: string | null, fallback: number) {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

function CheckoutForm() {
  const router = useRouter();
  const params = useSearchParams();
  const initialQuantity = readNumber(params.get("quantity"), 1);
  const pricePerPiece = readNumber(params.get("price"), product.offerPrice);
  const [quantity, setQuantity] = useState(initialQuantity);
  const [deliveryArea, setDeliveryArea] = useState<"inside-valley" | "outside-valley">("inside-valley");
  const [errors, setErrors] = useState<Errors>({});
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);

  const deliveryFee = deliveryArea === "outside-valley" ? product.deliveryOutside : product.deliveryInside;
  const totalPrice = useMemo(() => quantity * pricePerPiece + deliveryFee, [quantity, pricePerPiece, deliveryFee]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (loading) return;

    setLoading(true);
    setApiError("");
    setErrors({});

    const form = new FormData(event.currentTarget);
    const payload = {
      fullName: String(form.get("fullName") || ""),
      phone: String(form.get("phone") || ""),
      email: String(form.get("email") || ""),
      location: String(form.get("location") || ""),
      productName: product.name,
      quantity,
      pricePerPiece,
      deliveryArea,
      deliveryFee,
      totalPrice
    };

    const response = await fetch("/api/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const result = await response.json();
    setLoading(false);

    if (!response.ok) {
      if (result?.fieldErrors) setErrors(result.fieldErrors);
      setApiError(result?.error || "Order submission failed. Please try again.");
      return;
    }

    sessionStorage.setItem("lastOrder", JSON.stringify({ ...payload, orderId: result.orderId }));
    router.push(
      `/thank-you?product=${encodeURIComponent(product.name)}&quantity=${quantity}&total=${totalPrice}&orderId=${encodeURIComponent(result.orderId)}`
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-8 lg:grid-cols-[1fr_420px]">
      <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft md:p-7">
        <div className="mb-6">
          <p className="mb-2 text-sm font-black uppercase tracking-wide text-barca-blue">Cash On Delivery checkout</p>
          <h1 className="text-3xl font-black text-slate-950">Confirm your order</h1>
          <p className="mt-3 leading-7 text-slate-600">Fill in your delivery details. Product and pricing are filled automatically.</p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <Field label="Full Name" name="fullName" error={errors.fullName} />
          <Field label="Phone Number" name="phone" error={errors.phone} />
          <Field label="Email Address" name="email" type="email" error={errors.email} />
          <label className="grid gap-2">
            <span className="text-sm font-bold text-slate-800">Delivery Area</span>
            <select
              value={deliveryArea}
              onChange={(event) => setDeliveryArea(event.target.value as "inside-valley" | "outside-valley")}
              className="focus-ring h-12 rounded-md border border-slate-300 bg-white px-3 text-slate-900"
            >
              <option value="inside-valley">Inside Kathmandu valley - Free</option>
              <option value="outside-valley">Outside valley - NPR 150</option>
            </select>
          </label>
          <label className="grid gap-2 md:col-span-2">
            <span className="text-sm font-bold text-slate-800">Exact Location</span>
            <textarea
              name="location"
              placeholder="Kindly share your exact location"
              rows={4}
              className="focus-ring rounded-md border border-slate-300 px-3 py-3 text-slate-900"
            />
            {errors.location && <span className="text-sm font-semibold text-red-600">{errors.location}</span>}
          </label>
        </div>
      </div>

      <aside className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft md:p-7">
        <div className="mb-5 flex items-center gap-3">
          <PackageCheck className="h-6 w-6 text-barca-red" />
          <h2 className="text-xl font-black text-slate-950">Order summary</h2>
        </div>

        <div className="grid gap-4">
          <Summary label="Product Name" value={product.name} />
          <label className="grid gap-2">
            <span className="text-sm font-bold text-slate-800">Quantity</span>
            <input
              type="number"
              min={1}
              value={quantity}
              onChange={(event) => setQuantity(Math.max(1, Number(event.target.value) || 1))}
              className="focus-ring h-12 rounded-md border border-slate-300 px-3 font-bold text-slate-900"
            />
          </label>
          <Summary label="Price Per Piece" value={formatMoney(pricePerPiece)} />
          <Summary label="Delivery Fee" value={formatMoney(deliveryFee)} />
          <div className="flex items-center justify-between border-t border-slate-200 pt-4">
            <span className="font-black text-slate-950">Total Price</span>
            <span className="text-2xl font-black text-barca-red">{formatMoney(totalPrice)}</span>
          </div>
        </div>

        {apiError && <div className="mt-5 rounded-md border border-red-200 bg-red-50 p-3 text-sm font-semibold text-red-700">{apiError}</div>}

        <button
          type="submit"
          disabled={loading}
          className="focus-ring mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-md bg-barca-red px-5 font-black text-white transition hover:bg-[#870038] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <LockKeyhole className="h-5 w-5" />}
          {loading ? "Submitting Order..." : "Order Now"}
        </button>
      </aside>
    </form>
  );
}

function Field({ label, name, type = "text", error }: { label: string; name: string; type?: string; error?: string }) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-bold text-slate-800">{label}</span>
      <input name={name} type={type} className="focus-ring h-12 rounded-md border border-slate-300 px-3 text-slate-900" />
      {error && <span className="text-sm font-semibold text-red-600">{error}</span>}
    </label>
  );
}

function Summary({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid gap-1 rounded-md bg-slate-50 p-3">
      <span className="text-sm font-bold text-slate-500">{label}</span>
      <span className="font-bold leading-6 text-slate-950">{value}</span>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-5 py-6">
        <Link href="/" className="focus-ring mb-6 inline-flex items-center gap-2 rounded-md px-2 py-2 text-sm font-bold text-slate-700 hover:text-barca-blue">
          <ArrowLeft className="h-4 w-4" />
          Back to product
        </Link>
        <Suspense>
          <CheckoutForm />
        </Suspense>
      </div>
    </main>
  );
}
