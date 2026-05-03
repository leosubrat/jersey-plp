import Image from "next/image";
import { Award, CheckCircle2, Headphones, PackageCheck, ShieldCheck, Truck } from "lucide-react";
import { CtaButton } from "@/components/CtaButton";
import { ProductGallery } from "@/components/ProductGallery";
import { QuantityOrderBox } from "@/components/QuantityOrderBox";
import { product, formatMoney } from "@/lib/product";

const trustItems = [
  { icon: ShieldCheck, label: "Cash on Delivery available" },
  { icon: Truck, label: "Fast delivery across Nepal" },
  { icon: Headphones, label: "Customer support" },
  { icon: PackageCheck, label: "Easy order process" }
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      <header className="border-b border-slate-200 bg-white/95">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <div className="font-black text-slate-950">{product.brandName}</div>
          <CtaButton label="Order Now" className="px-4 py-2" />
        </div>
      </header>

      <section className="relative overflow-hidden bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 md:grid-cols-[1fr_0.9fr] md:items-center lg:py-16">
          <div>
            <p className="mb-4 inline-flex rounded-md bg-slate-100 px-3 py-2 text-sm font-bold text-barca-blue">
              2011 Wembley Final Edition
            </p>
            <h1 className="max-w-3xl text-4xl font-black leading-tight text-slate-950 sm:text-5xl lg:text-6xl">
              {product.name}
            </h1>
            <p className="mt-5 max-w-2xl text-xl font-semibold text-slate-800">{product.headline}</p>
            <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600">{product.subheadline}</p>
            <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600">{product.description}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <CtaButton label="Purchase Now" />
              <CtaButton label="Order Now" className="bg-barca-blue hover:bg-[#00336d]" />
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {trustItems.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-3 text-sm font-semibold text-slate-700">
                  <Icon className="h-4 w-4 text-barca-red" />
                  {label}
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-6 rounded-lg bg-barca-blue/10" />
            <div className="relative overflow-hidden rounded-lg border border-slate-200 bg-white shadow-soft">
              <div className="relative aspect-[4/5]">
                <Image
                  src={product.images[0].src}
                  alt={product.images[0].alt}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 44vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-14 lg:py-18" id="showcase">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-[0.95fr_1fr] lg:items-start">
          <ProductGallery />
          <div>
            <p className="mb-3 text-sm font-black uppercase tracking-wide text-barca-red">Product showcase</p>
            <h2 className="text-3xl font-black leading-tight text-slate-950 sm:text-4xl">{product.shortName}</h2>
            <p className="mt-4 text-base leading-8 text-slate-600">
              Built for fans who remember the rhythm, the dominance, and the number 10 that made Wembley feel timeless.
            </p>
            <ul className="mt-6 grid gap-3">
              {product.benefits.slice(0, 5).map((benefit) => (
                <li key={benefit} className="flex gap-3 rounded-md bg-white p-3 text-sm font-semibold text-slate-700">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-none text-barca-blue" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <QuantityOrderBox />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="mx-auto max-w-7xl px-5">
          <div className="max-w-2xl">
            <p className="mb-3 text-sm font-black uppercase tracking-wide text-barca-blue">Why buy this jersey</p>
            <h2 className="text-3xl font-black text-slate-950 sm:text-4xl">This is not just a jersey. It is a moment in football history.</h2>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {product.benefits.map((benefit, index) => (
              <div key={benefit} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                <Award className={`mb-4 h-6 w-6 ${index % 2 === 0 ? "text-barca-red" : "text-barca-blue"}`} />
                <p className="font-bold leading-7 text-slate-800">{benefit}</p>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <CtaButton label="Buy Now" />
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-14">
        <div className="mx-auto max-w-7xl px-5">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="mb-3 text-sm font-black uppercase tracking-wide text-barca-red">Testimonials</p>
              <h2 className="text-3xl font-black text-slate-950 sm:text-4xl">Trusted by football romantics.</h2>
            </div>
            <p className="text-lg font-black text-slate-950">{formatMoney(product.offerPrice)}</p>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {product.testimonials.map((testimonial) => (
              <figure key={testimonial.quote} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                <blockquote className="leading-7 text-slate-700">"{testimonial.quote}"</blockquote>
                <figcaption className="mt-4 text-sm font-bold text-barca-blue">{testimonial.name}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="mx-auto max-w-4xl px-5">
          <p className="mb-3 text-sm font-black uppercase tracking-wide text-barca-blue">FAQ</p>
          <h2 className="text-3xl font-black text-slate-950 sm:text-4xl">Frequently asked questions</h2>
          <div className="mt-8 divide-y divide-slate-200 overflow-hidden rounded-lg border border-slate-200 bg-white">
            {product.faqs.map((faq) => (
              <details key={faq.question} className="group p-5">
                <summary className="cursor-pointer list-none font-bold text-slate-950">
                  <span className="inline-flex w-full items-center justify-between gap-4">
                    {faq.question}
                    <span className="text-barca-red group-open:rotate-45">+</span>
                  </span>
                </summary>
                <p className="mt-3 leading-7 text-slate-600">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-950 py-14 text-white">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 px-5 md:flex-row md:items-center">
          <div>
            <p className="mb-3 text-sm font-black uppercase tracking-wide text-barca-gold">Final call</p>
            <h2 className="max-w-3xl text-3xl font-black sm:text-4xl">Own the Messi #10 retro jersey and get the FC Barcelona banner free today.</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <CtaButton label="Purchase Now" />
            <CtaButton label="Order Now" className="bg-white text-slate-950 hover:bg-slate-100" />
          </div>
        </div>
      </section>
    </main>
  );
}
