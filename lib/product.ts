export const product = {
  brandName: "Legacy Football Store",
  name: "2011 UCL Final FC Barcelona Messi #10 Legendary Retro Jersey",
  shortName: "Messi #10 2011 UCL Final Retro Jersey",
  headline: "Wear the Wembley night that defined modern football.",
  subheadline:
    "A premium retro tribute to Messi's peak era and Barcelona's unforgettable 2011 Champions League final.",
  description:
    "This jersey represents one of the greatest nights in football history, the 2011 UEFA Champions League Final at Wembley, where FC Barcelona delivered a world class performance. Worn during Lionel Messi's peak era, this jersey features the iconic number 10 on the back. It symbolizes dominance, brilliance, and a moment that defined modern football. Order today and receive a FREE FC Barcelona club banner along with your jersey.",
  originalPrice: 4499,
  offerPrice: 3499,
  currency: "NPR",
  deliveryInside: 0,
  deliveryOutside: 150,
  images: [
    {
      src: "/products/jersey-back.png",
      alt: "Back view of Messi number 10 FC Barcelona 2011 retro jersey"
    },
    {
      src: "/products/jersey-front.png",
      alt: "Front view of FC Barcelona 2011 UCL final retro jersey"
    },
    {
      src: "/products/jersey-collage.png",
      alt: "Collage showing multiple FC Barcelona retro jersey details"
    },
    {
      src: "/products/free-banner.png",
      alt: "Free FC Barcelona club banner offer"
    }
  ],
  benefits: [
    "Relive Messi's legendary 2011 UCL final performance",
    "Represents one of the greatest teams in football history",
    "Iconic number 10 print from Messi's golden era",
    "Comfortable premium fabric for everyday wear or match days",
    "A must have for true Barcelona fans",
    "Order today and receive a FREE FC Barcelona club banner along with your jersey"
  ],
  testimonials: [
    {
      quote: "As soon as I wore this, I remembered that Wembley night. Unreal feeling.",
      name: "Barcelona fan"
    },
    {
      quote: "Messi's number 10 looks perfect. Feels like owning a piece of history.",
      name: "Retro collector"
    },
    {
      quote: "Every Barcelona fan should have this. It represents a legendary era.",
      name: "Match day customer"
    },
    {
      quote: "The quality is amazing and the design feels authentic.",
      name: "Verified buyer"
    }
  ],
  faqs: [
    {
      question: "Why is this jersey special?",
      answer:
        "It represents the iconic 2011 Champions League final where Barcelona dominated world football."
    },
    {
      question: "Does it have Messi's number on the back?",
      answer: "Yes, it features the legendary number 10 from Messi's peak era."
    },
    {
      question: "What sizes are available?",
      answer: "S, M, L, XL with a comfortable fit."
    },
    {
      question: "Is Cash on Delivery available?",
      answer:
        "Yes, we offer Cash on Delivery. To confirm your order, a small prepayment of Rs 500 to Rs 1,000 is required. The remaining amount can be paid in cash at the time of delivery."
    },
    {
      question: "How long does delivery take?",
      answer: "1 to 2 days inside the valley and 2 to 3 days outside."
    },
    {
      question: "Can I exchange size?",
      answer: "Yes, size exchange is available within 3 days."
    }
  ]
};

export function formatMoney(amount: number) {
  return `${product.currency} ${amount.toLocaleString("en-NP")}`;
}
