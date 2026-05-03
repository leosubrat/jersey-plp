import { z } from "zod";

export const orderSchema = z.object({
  fullName: z.string().trim().min(2, "Please enter your full name"),
  phone: z
    .string()
    .trim()
    .regex(/^\d{10}$/, "Please enter a valid 10-digit phone number"),
  email: z
    .string()
    .trim()
    .optional()
    .transform((value) => value || "")
    .refine((value) => !value || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value), "Please enter a valid email address"),
  location: z.string().trim().min(5, "Please enter your exact delivery location"),
  productName: z.string().trim().min(1, "Product name is required"),
  jerseySize: z.string().refine((value) => ["S", "M", "L", "XL"].includes(value), "Please select your jersey size"),
  quantity: z.coerce.number().int("Please select a valid quantity").min(1, "Please select a valid quantity"),
  pricePerPiece: z.coerce.number().positive("Price per piece must be valid"),
  deliveryArea: z.enum(["inside-valley", "outside-valley"], { required_error: "Please select your delivery area", invalid_type_error: "Please select your delivery area" }),
  deliveryFee: z.coerce.number().min(0).default(0),
  totalPrice: z.coerce.number().positive("Total price must be valid")
});

export type OrderInput = z.infer<typeof orderSchema>;

export type PreparedOrder = OrderInput & {
  orderId: string;
  dateTime: string;
  paymentMethod: "Cash On Delivery";
  orderStatus: "New Order";
  notes: string;
};
