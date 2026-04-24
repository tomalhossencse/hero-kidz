"use server";

import { authOptions } from "@/lib/authOptions";
import { dbConnect, orders } from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { clearCart, getCart } from "./cart";
import { sendEmail } from "@/lib/sendEmail";
import { orderInvoiceTemplate } from "@/lib/invoiceTemplate";

const orderCollection = dbConnect(orders);

export const createOrder = async (payload) => {
  try {
    const { user } = (await getServerSession(authOptions)) || {};
    if (!user)
      return {
        success: false,
      };

    const cart = await getCart();
    if (cart.length == 0) return { success: false };

    const newOrder = {
      createdAt: new Date().toISOString(),
      items: cart,
      ...payload,
    };
    const result = await orderCollection.insertOne(newOrder);
    const totalPrice = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );
    if (result.insertedId) {
      await clearCart();
      // 📧 Send Invoice Email
      await sendEmail({
        to: user.email,
        subject: "Your Order Invoice - Hero Kidz",
        html: orderInvoiceTemplate({
          orderId: result.insertedId.toString(),
          items: cart,
          totalPrice,
        }),
      });
      return {
        acknowledged: result.acknowledged,
        insertedId: result.insertedId.toString(),
      };
    } else {
      return {
        success: false,
      };
    }
  } catch (error) {
    console.log(error);
  }
};
