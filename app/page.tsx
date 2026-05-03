import { CheckCircle2, Gift, Headphones, PackageCheck, ShieldCheck, Star, Trophy, Truck, UserRound } from "lucide-react";
import { CtaButton } from "@/components/CtaButton";
import { HeroImageSlider } from "@/components/HeroImageSlider";
import { ProductGallery } from "@/components/ProductGallery";
import { QuantityOrderBox } from "@/components/QuantityOrderBox";
import { product, formatMoney } from "@/lib/product";

const trustItems = [
  { icon: ShieldCheck, label: "Trusted by football fans" },
  { icon: Truck, label: "Fast delivery across Nepal" },
  { icon: Headphones, label: "Customer support available" },
  { icon: PackageCheck, label: "Easy order process" }
];

const heroBenefits = [
  "Relive Barcelona's legendary Wembley victory",
  "Celebrate Messi's iconic 2011 final performance",
  "Limited retro edition made for true fans"
];

export default function HomePage() {
  return (
    <main className="min-h-screen w-full max-w-full overflow-x-hidden bg-white pb-20 md:pb-0">
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex w-full max-w-[1200px] items-center justify-between gap-4 px-5 py-3.5">
          <div className="text-sm font-black text-slate-950 sm:text-base">{product.brandName}</div>
          <CtaButton label="Order Now" className="px-4 py-2.5 text-xs sm:text-sm" />
        </div>
      </header>

      <section className="relative overflow-hidden bg-white">
        <div className="mx-auto grid w-full max-w-[1200px] gap-10 px-5 py-12 md:grid-cols-[1.06fr_0.78fr] md:items-center md:py-16 lg:gap-14 lg:py-20">
          <div>
            <p className="mb-4 inline-flex rounded-md bg-slate-100 px-3 py-2 text-sm font-bold text-barca-blue">
              2011 Wembley Final Edition
            </p>
            <h1 className="max-w-3xl text-[2rem] font-black leading-[1.1] text-slate-950 sm:text-[2.75rem] lg:text-[3.05rem]">
              2011 UCL Final FC Barcelona Messi #10 Retro Jersey
            </h1>
            <div className="mt-6 grid max-w-xl gap-3">
              {heroBenefits.map((benefit) => (
                <div key={benefit} className="flex items-start gap-3 rounded-md bg-slate-50 px-3.5 py-3 text-base font-bold leading-6 text-slate-800">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-none text-barca-blue" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600">
              This jersey honors Barcelona's unforgettable 2011 UCL Final at Wembley, featuring Messi's iconic number 10 and a free FC Barcelona banner with today's order.
            </p>
            <div className="mt-9 flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-8">
              <CtaButton label="Order Now" className="px-8 py-4 text-base max-sm:w-full" />
              <p className="inline-flex max-w-full items-center gap-2 rounded-md bg-barca-blue/10 px-3 py-2 text-sm font-black leading-6 text-barca-blue">
                <Gift className="h-4 w-4 flex-none" />
                <span>Get a FREE FC Barcelona club banner with today's order</span>
              </p>
            </div>
            <div className="mt-9 grid grid-cols-2 gap-3 lg:grid-cols-4">
              {trustItems.map(({ icon: Icon, label }) => (
                <div key={label} className="flex min-h-16 items-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-3 text-sm font-semibold leading-5 text-slate-700 shadow-sm">
                  <Icon className="h-4 w-4 flex-none text-barca-red" />
                  {label}
                </div>
              ))}
            </div>
          </div>
          <div className="relative w-full max-w-full justify-self-center md:justify-self-end lg:max-w-[470px]">
            <HeroImageSlider />
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-12 md:py-16 lg:py-20" id="showcase">
        <div className="mx-auto grid w-full max-w-[1200px] gap-10 px-5 lg:grid-cols-[0.82fr_1fr] lg:items-start lg:gap-14">
          <ProductGallery />
          <div className="w-full max-w-full">
            <h2 className="text-3xl font-black leading-tight text-slate-950 sm:text-[2.25rem]">
              2011 UCL Final FC Barcelona Messi #10 Retro Jersey
            </h2>
            <p className="mt-4 text-base leading-8 text-slate-600">
              Built for fans who remember the rhythm, the dominance, and the number 10 that made Wembley feel timeless.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {product.badges.map((badge) => (
                <span key={badge} className="rounded-md border border-slate-200 bg-white px-3.5 py-2 text-xs font-black text-slate-700 shadow-sm">
                  {badge}
                </span>
              ))}
            </div>
            <ul className="mt-7 grid gap-3">
              {product.benefits.slice(0, 5).map((benefit) => (
                <li key={benefit} className="flex gap-3 rounded-md bg-white p-4 text-sm font-semibold text-slate-700">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-none text-barca-blue" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
            <div className="mt-7">
              <QuantityOrderBox />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-12 md:py-16 lg:py-20">
        <div className="mx-auto w-full max-w-[1200px] px-5">
          <div className="max-w-2xl">
            <p className="mb-3 text-sm font-black uppercase tracking-wide text-barca-blue">Why buy this jersey</p>
            <h2 className="text-3xl font-black leading-tight text-slate-950 sm:text-[2.5rem]">This is not just a jersey. It is a moment in football history.</h2>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {product.benefits.map((benefit, index) => (
              <div key={benefit} className="flex min-h-40 flex-col rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-soft">
                <div className="mb-5 grid h-11 w-11 place-items-center rounded-md bg-slate-50">
                  <Trophy className={`h-5 w-5 ${index % 2 === 0 ? "text-barca-red" : "text-barca-blue"}`} />
                </div>
                <p className="text-base font-bold leading-7 text-slate-800">{benefit}</p>
              </div>
            ))}
          </div>
          <div className="mt-9">
            <CtaButton label="Order Now" className="max-sm:w-full" />
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-12 md:py-16 lg:py-20">
        <div className="mx-auto w-full max-w-[1200px] px-5">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="mb-3 text-sm font-black uppercase tracking-wide text-barca-red">Testimonials</p>
              <h2 className="text-3xl font-black text-slate-950 sm:text-4xl">Trusted by football romantics.</h2>
              <p className="mt-3 text-base font-semibold leading-7 text-slate-600">Loved by fans who want a premium retro football memory.</p>
            </div>
            <div className="rounded-md border border-slate-200 bg-white px-4 py-3 shadow-sm">
              <p className="text-xs font-black uppercase tracking-wide text-slate-500">Today&apos;s offer</p>
              <p className="text-lg font-black text-slate-950">{formatMoney(product.offerPrice)}</p>
            </div>
          </div>
          <div className="mt-9 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {product.testimonials.map((testimonial) => (
              <figure key={testimonial.quote} className="flex min-h-64 flex-col rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-soft">
                <div className="mb-4 flex gap-1 text-barca-gold" aria-label="5 star rating">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={index} className="h-3.5 w-3.5 fill-current" />
                  ))}
                </div>
                <blockquote className="leading-8 text-slate-700">"{testimonial.quote}"</blockquote>
                <figcaption className="mt-auto flex items-center gap-3 pt-6">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-slate-100 text-barca-blue">
                    <UserRound className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-sm font-black text-slate-950">{testimonial.name}</span>
                    <span className="block text-sm font-semibold text-slate-500">{testimonial.location}</span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-12 md:py-16 lg:py-20">
        <div className="mx-auto w-full max-w-[920px] px-5">
          <p className="mb-3 text-sm font-black uppercase tracking-wide text-barca-blue">FAQ</p>
          <h2 className="text-3xl font-black text-slate-950 sm:text-4xl">Frequently asked questions</h2>
          <p className="mt-3 text-base font-semibold leading-7 text-slate-600">Everything you need to know before placing your order.</p>
          <div className="mt-9 divide-y divide-slate-200 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
            {product.faqs.map((faq) => (
              <details key={faq.question} className="group p-5 md:p-6">
                <summary className="cursor-pointer list-none font-bold text-slate-950">
                  <span className="inline-flex w-full items-center justify-between gap-4">
                    {faq.question}
                    <span className="grid h-7 w-7 flex-none place-items-center rounded-full bg-slate-50 text-barca-red transition group-open:rotate-45">+</span>
                  </span>
                </summary>
                <p className="mt-4 leading-8 text-slate-600">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50 py-12 text-slate-950 md:py-16 lg:py-20">
        <div className="mx-auto flex w-full max-w-[1200px] flex-col justify-between gap-7 px-5 md:flex-row md:items-center">
          <div>
            <p className="mb-3 text-sm font-black uppercase tracking-wide text-barca-red">Final call</p>
            <h2 className="max-w-3xl text-3xl font-black sm:text-4xl">Own the Messi #10 retro jersey and get a Free FC Barcelona Club banner today.</h2>
            <p className="mt-4 text-base font-semibold leading-7 text-slate-600">Limited stock available. Book yours today with a small prepayment.</p>
          </div>
          <CtaButton label="Order Now" className="shrink-0 max-md:w-full" />
        </div>
      </section>

      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white/95 px-4 py-3 shadow-[0_-12px_35px_rgba(15,23,42,0.12)] backdrop-blur md:hidden">
        <div className="mx-auto flex max-w-md items-center justify-between gap-4">
          <div className="min-w-0">
            <p className="text-xs font-bold text-slate-500">Offer Price</p>
            <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
              <span className="text-xs font-bold text-slate-400 line-through">{formatMoney(product.originalPrice)}</span>
              <span className="text-lg font-black leading-tight text-slate-950">{formatMoney(product.offerPrice)}</span>
            </div>
          </div>
          <CtaButton label="Order Now" className="shrink-0 px-5 py-3" />
        </div>
      </div>
    </main>
  );
}
