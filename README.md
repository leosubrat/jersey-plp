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

## Environment Variables

Copy `.env.example` to `.env.local` for local development:

```bash
cp .env.example .env.local
```

Required values:

```env
NEXT_PUBLIC_SITE_URL=
BUSINESS_EMAIL=
EMAIL_FROM=
BRAND_NAME=

GOOGLE_SHEET_ID=
GOOGLE_SHEET_TAB_NAME=
GOOGLE_SERVICE_ACCOUNT_EMAIL=
GOOGLE_PRIVATE_KEY=

SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=

EMAIL_SERVICE_API_KEY=
FRONTEND_URL=
```

For Gmail SMTP:

- `SMTP_HOST=smtp.gmail.com`
- `SMTP_PORT=465`
- `SMTP_USER` is your Gmail address
- `SMTP_PASS` is your Google App Password
- `EMAIL_FROM` should usually match `SMTP_USER` or an approved sender

If your Google private key contains line breaks, keep it in `.env.local` like this:

```env
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_KEY_LINES\n-----END PRIVATE KEY-----\n"
```

## Google Sheet Setup

1. Go to Google Cloud Console.
2. Create a project, for example `Coconut Orders`.
3. Go to **API & Services**.
4. Open **Library** and enable:
   - Google Sheets API
   - Google Drive API
5. Go to **IAM and Admin** and create a Service Account.
6. Open the service account, go to **Keys**, and create a JSON key.
7. Copy these JSON values into `.env.local`:
   - `client_email` to `GOOGLE_SERVICE_ACCOUNT_EMAIL`
   - `private_key` to `GOOGLE_PRIVATE_KEY`
8. Create or open your Google Spreadsheet.
9. Create a tab named `Jersey Orders`.
10. Add this header row in row 1:

```text
Order ID | Date & Time | Customer Name | Phone Number | Email Address | Exact Location | Product Name | Quantity | Price Per Piece | Total Price | Payment Method | Order Status | Notes
```

11. Add filters by selecting the header row, then **Data > Create a filter**.
12. Add an Order Status dropdown:
    - Select the `Order Status` column cells below the header.
    - Go to **Data > Data validation**.
    - Add dropdown options:
      - New Order
      - Order Confirmed
      - Order Ongoing
      - Delivered
      - Cancelled
13. Get the Google Sheet ID from the spreadsheet URL:

```text
https://docs.google.com/spreadsheets/d/THIS_IS_THE_SHEET_ID/edit
```

14. Add the ID to `GOOGLE_SHEET_ID`.
15. Share the spreadsheet with the service account email and give it Editor access.

## Gmail App Password Setup

1. Search for Google App Password.
2. Log in with your Gmail account.
3. Create an app name, for example `Legacy Football Store Orders`.
4. Copy the generated app password.
5. Add it to `SMTP_PASS` in `.env.local`.

## Local Development

Install dependencies:

```bash
npm install
```

Run the app:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

## Testing Order Submission

1. Fill `.env.local` with working Google and SMTP credentials.
2. Run `npm run dev`.
3. Open the landing page and click a CTA.
4. Fill the checkout form with a real email address.
5. Submit the order.
6. Confirm:
   - A new row appears in the `Jersey Orders` Google Sheet.
   - The business Gmail receives the order notification.
   - The customer email receives the order received email.
   - The browser redirects to `/thank-you`.

If credentials are missing or incorrect, the checkout page will show a clear error and will not redirect.

## Deploying on Vercel

1. Push the project to GitHub.
2. Import the repository in Vercel.
3. Add all environment variables in **Project Settings > Environment Variables**.
4. Set `NEXT_PUBLIC_SITE_URL` and `FRONTEND_URL` to your Vercel domain.
5. Deploy.
6. Place a test order using real credentials.

## Editing Product Content

Most product content lives in:

```text
lib/product.ts
```

Product images are stored in:

```text
public/products
```
