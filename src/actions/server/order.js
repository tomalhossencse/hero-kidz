"use server";

import { authOptions } from "@/lib/authOptions";
import { dbConnect, orders } from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { clearCart, getCart } from "./cart";

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

    if (result.insertedId) {
      await clearCart();
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
