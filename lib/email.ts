import nodemailer from "nodemailer";
import type { PreparedOrder } from "./validation";

function requireEnv(name: string) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

function money(value: number) {
  return `NPR ${Number(value).toLocaleString("en-NP")}`;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function baseShell(content: string) {
  const brandName = escapeHtml(process.env.BRAND_NAME || "Legacy Football Store");
  return `
    <div style="margin:0;padding:0;background:#f4f6f8;font-family:Arial,Helvetica,sans-serif;color:#111827;">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f4f6f8;padding:24px 12px;">
        <tr>
          <td align="center">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;background:#ffffff;border:1px solid #e5e7eb;border-radius:18px;overflow:hidden;">
              <tr>
                <td style="background:#003f87;padding:22px 28px;color:#ffffff;">
                  <div style="font-size:20px;font-weight:800;letter-spacing:0;">${brandName}</div>
                </td>
              </tr>
              <tr>
                <td style="padding:28px;">
                  ${content}
                </td>
              </tr>
              <tr>
                <td style="padding:18px 28px;background:#f9fafb;color:#6b7280;font-size:13px;">
                  Reply to this email for support. Cash On Delivery order confirmation is handled by phone.
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </div>
  `;
}

function row(label: string, value: string | number) {
  return `
    <tr>
      <td style="padding:10px 0;color:#6b7280;font-size:14px;">${label}</td>
      <td align="right" style="padding:10px 0;color:#111827;font-size:14px;font-weight:700;">${value}</td>
    </tr>
  `;
}

function businessEmail(order: PreparedOrder) {
  return baseShell(`
    <h1 style="margin:0 0 8px;font-size:26px;line-height:1.2;color:#111827;">New product order received</h1>
    <p style="margin:0 0 20px;color:#4b5563;font-size:15px;">A customer has placed a Cash On Delivery order.</p>
    <div style="display:inline-block;background:#fff7ed;color:#9a3412;border:1px solid #fed7aa;border-radius:999px;padding:7px 12px;font-size:13px;font-weight:800;margin-bottom:22px;">New Order</div>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-top:1px solid #e5e7eb;border-bottom:1px solid #e5e7eb;margin-bottom:20px;">
      ${row("Order ID", escapeHtml(order.orderId))}
      ${row("Date & Time", escapeHtml(order.dateTime))}
    </table>
    <h2 style="font-size:17px;margin:0 0 10px;color:#003f87;">Customer details</h2>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom:22px;">
      ${row("Customer Name", escapeHtml(order.fullName))}
      ${row("Phone Number", escapeHtml(order.phone))}
      ${row("Email Address", escapeHtml(order.email))}
      ${row("Exact Location", escapeHtml(order.location))}
    </table>
    <h2 style="font-size:17px;margin:0 0 10px;color:#003f87;">Product details</h2>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom:22px;">
      ${row("Product Name", escapeHtml(order.productName))}
      ${row("Quantity", order.quantity)}
      ${row("Price Per Piece", money(order.pricePerPiece))}
      ${row("Total Price", money(order.totalPrice))}
    </table>
    <h2 style="font-size:17px;margin:0 0 10px;color:#003f87;">Payment details</h2>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom:22px;">
      ${row("Payment Method", "Cash On Delivery")}
      ${row("Order Status", "New Order")}
    </table>
    <div style="background:#fef2f2;border-left:4px solid #a50044;border-radius:12px;padding:16px;color:#7f1d1d;font-size:15px;font-weight:700;">
      Please call the customer soon to confirm this order.
    </div>
  `);
}

function customerEmail(order: PreparedOrder) {
  const brandName = escapeHtml(process.env.BRAND_NAME || "Legacy Football Store");
  const replyEmail = escapeHtml(process.env.EMAIL_FROM || process.env.BUSINESS_EMAIL || "");
  return baseShell(`
    <h1 style="margin:0 0 8px;font-size:26px;line-height:1.2;color:#111827;">Thank you for your order!</h1>
    <p style="margin:0 0 18px;color:#4b5563;font-size:15px;">Hi ${escapeHtml(order.fullName)}, we have received your order successfully.</p>
    <div style="background:#f8fafc;border:1px solid #e5e7eb;border-radius:14px;padding:18px;margin-bottom:20px;">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
        ${row("Order ID", escapeHtml(order.orderId))}
        ${row("Product", escapeHtml(order.productName))}
        ${row("Quantity", order.quantity)}
        ${row("Total Price", money(order.totalPrice))}
        ${row("Payment Method", "Cash On Delivery")}
      </table>
    </div>
    <p style="margin:0 0 18px;color:#111827;font-size:15px;line-height:1.6;">Our sales representative will call you soon to confirm your order.</p>
    <p style="margin:0;color:#4b5563;font-size:15px;line-height:1.6;">Thank you,<br><strong>${brandName}</strong></p>
    <p style="margin:18px 0 0;color:#6b7280;font-size:13px;">Support / reply email: ${replyEmail}</p>
  `);
}

export async function sendOrderEmails(order: PreparedOrder) {
  const transporter = nodemailer.createTransport({
    host: requireEnv("SMTP_HOST"),
    port: Number(requireEnv("SMTP_PORT")),
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: {
      user: requireEnv("SMTP_USER"),
      pass: requireEnv("SMTP_PASS")
    }
  });

  const businessEmailAddress = requireEnv("BUSINESS_EMAIL");
  const fromEmail = requireEnv("EMAIL_FROM");
  const brandName = process.env.BRAND_NAME || "Legacy Football Store";

  await transporter.sendMail({
    from: `"${brandName}" <${fromEmail}>`,
    replyTo: fromEmail,
    to: businessEmailAddress,
    subject: `New Product Order Received - ${order.orderId}`,
    html: businessEmail(order)
  });

  await transporter.sendMail({
    from: `"${brandName}" <${fromEmail}>`,
    replyTo: fromEmail,
    to: order.email,
    subject: `Your Order Has Been Received - ${brandName}`,
    html: customerEmail(order)
  });
}
