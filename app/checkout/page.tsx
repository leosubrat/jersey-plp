"use client";

import { Suspense, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, Loader2, LockKeyhole, Minus, PackageCheck, Plus } from "lucide-react";
import { formatMoney, product } from "@/lib/product";

type Errors = Record<string, string>;
const jerseySizes = ["S", "M", "L", "XL"] as const;

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
  const [phone, setPhone] = useState("");
  const [jerseySize, setJerseySize] = useState("");
  const [deliveryArea, setDeliveryArea] = useState<"inside-valley" | "outside-valley">("inside-valley");
  const [errors, setErrors] = useState<Errors>({});
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);

  const deliveryFee = deliveryArea === "outside-valley" ? product.deliveryOutside : product.deliveryInside;
  const totalPrice = useMemo(() => quantity * pricePerPiece + deliveryFee, [quantity, pricePerPiece, deliveryFee]);

  function updateQuantity(value: number) {
    setQuantity(Number.isFinite(value) && value >= 1 ? Math.floor(value) : 1);
  }

  function focusFirstError(nextErrors: Errors) {
    const firstField = Object.keys(nextErrors)[0];
    if (!firstField) return;

    requestAnimationFrame(() => {
      const element = document.querySelector<HTMLElement>(`[name="${firstField}"]`);
      element?.focus();
      element?.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  }

  function validateForm(form: FormData) {
    const nextErrors: Errors = {};
    const fullName = String(form.get("fullName") || "").trim();
    const email = String(form.get("email") || "").trim();
    const location = String(form.get("location") || "").trim();

    if (fullName.length < 2) nextErrors.fullName = "Please enter your full name";
    if (!/^\d{10}$/.test(phone)) nextErrors.phone = "Please enter a valid 10-digit phone number";
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) nextErrors.email = "Please enter a valid email address";
    if (!jerseySizes.includes(jerseySize as (typeof jerseySizes)[number])) nextErrors.jerseySize = "Please select your jersey size";
    if (!deliveryArea) nextErrors.deliveryArea = "Please select your delivery area";
    if (location.length < 5) nextErrors.location = "Please enter your exact delivery location";
    if (!Number.isInteger(quantity) || quantity < 1) nextErrors.quantity = "Please select a valid quantity";

    return {
      nextErrors,
      values: { fullName, email, location }
    };
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (loading) return;

    setApiError("");
    setErrors({});

    const form = new FormData(event.currentTarget);
    const { nextErrors, values } = validateForm(form);

    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      focusFirstError(nextErrors);
      return;
    }

    setLoading(true);

    const payload = {
      fullName: values.fullName,
      phone,
      email: values.email,
      location: values.location,
      productName: product.name,
      jerseySize,
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
      `/thank-you?product=${encodeURIComponent(product.name)}&size=${encodeURIComponent(jerseySize)}&quantity=${quantity}&total=${totalPrice}&orderId=${encodeURIComponent(result.orderId)}`
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
          <Field
            label="Phone Number"
            name="phone"
            value={phone}
            onChange={(value) => setPhone(value.replace(/\D/g, "").slice(0, 10))}
            inputMode="numeric"
            maxLength={10}
            error={errors.phone}
          />
          <Field label="Email Address" name="email" type="email" error={errors.email} />
          <label className="grid gap-2">
            <span className="text-sm font-bold text-slate-800">Jersey Size</span>
            <select
              name="jerseySize"
              value={jerseySize}
              onChange={(event) => setJerseySize(event.target.value)}
              className={`focus-ring h-12 rounded-md border bg-white px-3 text-slate-900 ${
                errors.jerseySize ? "border-red-400" : "border-slate-300"
              }`}
            >
              <option value="">Select jersey size</option>
              {jerseySizes.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
            {errors.jerseySize && <span className="text-sm font-semibold text-red-600">{errors.jerseySize}</span>}
          </label>
          <label className="grid gap-2">
            <span className="text-sm font-bold text-slate-800">Delivery Area</span>
            <select
              name="deliveryArea"
              value={deliveryArea}
              onChange={(event) => setDeliveryArea(event.target.value as "inside-valley" | "outside-valley")}
              className={`focus-ring h-12 rounded-md border bg-white px-3 text-slate-900 ${
                errors.deliveryArea ? "border-red-400" : "border-slate-300"
              }`}
            >
              <option value="inside-valley">Inside Kathmandu valley - Free</option>
              <option value="outside-valley">Outside valley - NPR 150</option>
            </select>
            {errors.deliveryArea && <span className="text-sm font-semibold text-red-600">{errors.deliveryArea}</span>}
          </label>
          <label className="grid gap-2 md:col-span-2">
            <span className="text-sm font-bold text-slate-800">Exact Location</span>
            <textarea
              name="location"
              placeholder="Kindly share your exact location"
              rows={4}
              className={`focus-ring rounded-md border px-3 py-3 text-slate-900 ${
                errors.location ? "border-red-400" : "border-slate-300"
              }`}
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
          <Summary label="Jersey Size" value={jerseySize || "Select jersey size"} />
          <label className="grid gap-2">
            <span className="text-sm font-bold text-slate-800">Quantity</span>
            <div
              className={`flex h-12 w-full max-w-full overflow-hidden rounded-md border bg-white ${
                errors.quantity ? "border-red-400" : "border-slate-300"
              }`}
            >
              <button
                type="button"
                aria-label="Decrease quantity"
                disabled={quantity <= 1}
                onClick={() => updateQuantity(quantity - 1)}
                className="focus-ring grid w-12 shrink-0 place-items-center text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:text-slate-300 disabled:hover:bg-white"
              >
                <Minus className="h-4 w-4" />
              </button>
              <input
                type="number"
                min={1}
                value={quantity}
                inputMode="numeric"
                onChange={(event) => updateQuantity(Number(event.target.value))}
                onBlur={(event) => updateQuantity(Number(event.target.value))}
                className="focus-ring h-full min-w-0 flex-1 border-x border-slate-300 px-2 text-center font-bold text-slate-900 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              />
              <button
                type="button"
                aria-label="Increase quantity"
                onClick={() => updateQuantity(quantity + 1)}
                className="focus-ring grid w-12 shrink-0 place-items-center text-slate-700 transition hover:bg-slate-50"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            {errors.quantity && <span className="text-sm font-semibold text-red-600">{errors.quantity}</span>}
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

function Field({
  label,
  name,
  type = "text",
  value,
  onChange,
  inputMode,
  maxLength,
  error
}: {
  label: string;
  name: string;
  type?: string;
  value?: string;
  onChange?: (value: string) => void;
  inputMode?: "text" | "numeric" | "email" | "tel" | "url" | "search" | "none" | "decimal";
  maxLength?: number;
  error?: string;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-bold text-slate-800">{label}</span>
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange ? (event) => onChange(event.target.value) : undefined}
        inputMode={inputMode}
        maxLength={maxLength}
        className={`focus-ring h-12 rounded-md border px-3 text-slate-900 ${error ? "border-red-400" : "border-slate-300"}`}
      />
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
