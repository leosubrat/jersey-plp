export const product = {
  brandName: "Legacy Football Store",
  name: "2011 UCL Final FC Barcelona Messi #10 Legendary Retro Jersey",
  shortName: "Messi #10 2011 UCL Final Retro Jersey",
  headline: "Own the 2011 Messi #10 UCL Final Jersey",
  subheadline:
    "Relive Barcelona's legendary Wembley victory.\nA tribute to Messi's iconic performance.\nLimited retro edition for true fans.",
  description:
    "This jersey represents one of the greatest nights in football history, the 2011 UEFA Champions League Final at Wembley, where FC Barcelona delivered a world class performance. Worn during Lionel Messi's peak era, this jersey features the iconic number 10 on the back. It symbolizes dominance, brilliance, and a moment that defined modern football. Order today and receive a FREE FC Barcelona club banner along with your jersey.",
  originalPrice: 4499,
  offerPrice: 3499,
  currency: "NPR",
  deliveryInside: 0,
  deliveryOutside: 150,
  images: [
    {
      src: "/products/jersey-front.png",
      alt: "Front view of FC Barcelona 2011 UCL final retro jersey"
    },
    {
      src: "/products/jersey-back.png",
      alt: "Back view of Messi number 10 FC Barcelona 2011 retro jersey"
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
    "Messi's legendary 2011 UCL final performance",
    "Barcelona's historic Wembley night",
    "Iconic number 10 print",
    "Premium comfortable fabric",
    "Must-have for true Barcelona fans",
    "Free FC Barcelona Club banner with today's order"
  ],
  badges: ["Messi #10 Print", "2011 Final Edition", "Premium Fabric", "Free FC Barcelona Club banner"],
  testimonials: [
    {
      quote: "As soon as I wore this, I remembered that Wembley night. Unreal feeling.",
      name: "Rohit S.",
      location: "Kathmandu"
    },
    {
      quote: "Messi's number 10 looks perfect. Feels like owning a piece of history.",
      name: "Aayush R.",
      location: "Lalitpur"
    },
    {
      quote: "Every Barcelona fan should have this. It represents a legendary era.",
      name: "Samir B.",
      location: "Pokhara"
    },
    {
      quote: "The quality is amazing and the design feels authentic.",
      name: "Nabin K.",
      location: "Bhaktapur"
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
        "Yes, Cash on Delivery is available after a small booking payment. You need to prepay NPR 500\u20131000 to confirm your order, and the remaining amount can be paid through Cash on Delivery."
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
