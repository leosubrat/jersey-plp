# Legacy Football Store COD Funnel

Complete Cash On Delivery sales funnel for the 2011 UCL Final FC Barcelona Messi #10 Legendary Retro Jersey.

## Tech Stack

- Next.js App Router
- Tailwind CSS
- Next.js API route at `/api/order`
- Google Sheets API with a service account
- Nodemailer with Gmail SMTP / Google App Password

## Order Flow

1. Customer clicks a landing page CTA.
2. The selected product, quantity, and price are passed to `/checkout`.
3. Checkout collects name, phone, email, exact location, and delivery area.
4. `/api/order` validates all fields, creates an order ID, date/time, default status, and COD payment method.
5. The backend appends the order to Google Sheets.
6. The backend sends a business notification email.
7. The backend sends the customer order received email.
8. The frontend redirects to `/thank-you` only after the API returns success.


