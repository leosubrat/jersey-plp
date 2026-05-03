import { NextResponse } from "next/server";
import { appendOrderToSheet } from "@/lib/googleSheets";
import { sendOrderEmails } from "@/lib/email";
import { orderSchema, type PreparedOrder } from "@/lib/validation";

function isAllowedOrigin(request: Request) {
  const frontendUrl = process.env.FRONTEND_URL;
  const origin = request.headers.get("origin");
  if (!frontendUrl || !origin) return true;
  return origin === frontendUrl;
}

function corsHeaders(): Record<string, string> {
  const frontendUrl = process.env.FRONTEND_URL;
  return frontendUrl
    ? {
        "Access-Control-Allow-Origin": frontendUrl,
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type"
      }
    : {};
}

function generateOrderId() {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).slice(2, 7).toUpperCase();
  return `LFS-${timestamp}-${random}`;
}

function fieldErrors(error: unknown) {
  if (!error || typeof error !== "object" || !("flatten" in error)) return {};
  const flattened = (error as { flatten: () => { fieldErrors: Record<string, string[]> } }).flatten();
  return Object.fromEntries(
    Object.entries(flattened.fieldErrors).map(([key, value]) => [key, value?.[0] || "Invalid value"])
  );
}

export async function POST(request: Request) {
  try {
    if (!isAllowedOrigin(request)) {
      return NextResponse.json({ error: "This origin is not allowed to submit orders." }, { status: 403, headers: corsHeaders() });
    }

    const body = await request.json();
    const parsed = orderSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Please correct the highlighted fields.",
          fieldErrors: fieldErrors(parsed.error)
        },
        { status: 400, headers: corsHeaders() }
      );
    }

    const order: PreparedOrder = {
      ...parsed.data,
      orderId: generateOrderId(),
      dateTime: new Intl.DateTimeFormat("en-NP", {
        dateStyle: "medium",
        timeStyle: "medium",
        timeZone: "Asia/Kathmandu"
      }).format(new Date()),
      paymentMethod: "Cash On Delivery",
      orderStatus: "New Order",
      notes: `Delivery Area: ${parsed.data.deliveryArea}; Delivery Fee: NPR ${parsed.data.deliveryFee}`
    };

    await appendOrderToSheet(order);
    await sendOrderEmails(order);

    return NextResponse.json({ success: true, orderId: order.orderId }, { headers: corsHeaders() });
  } catch (error) {
    console.error("Order submission failed", error);
    const message = error instanceof Error ? error.message : "Unexpected server error.";
    return NextResponse.json(
      {
        error: `Order submission failed. ${message}`
      },
      { status: 500, headers: corsHeaders() }
    );
  }
}

export async function OPTIONS(request: Request) {
  if (!isAllowedOrigin(request)) {
    return NextResponse.json({ error: "This origin is not allowed." }, { status: 403, headers: corsHeaders() });
  }

  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders()
  });
}
