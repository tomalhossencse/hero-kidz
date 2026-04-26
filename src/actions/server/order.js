"use server";

import { authOptions } from "@/lib/authOptions";
import { dbConnect, orders, products } from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { clearCart, getCart } from "./cart";
import { sendEmail } from "@/lib/sendEmail";
import { orderInvoiceTemplate } from "@/lib/invoiceTemplate";
import { ObjectId } from "mongodb";

const orderCollection = dbConnect(orders);
const productCollection = dbConnect(products);

export const createOrder = async (payload) => {
  try {
    const { user } = (await getServerSession(authOptions)) || {};
    if (!user)
      return {
        success: false,
      };

    const cart = await getCart();
    if (cart.length == 0) return { success: false };

    // const products = cart.map((item) => ({
    //   _id: new ObjectId(item.productId),
    //   quantity: item.quantity,
    // }));

    // console.log(products);

    const totalPrice = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );

    const newOrder = {
      createdAt: new Date().toISOString(),
      items: cart,
      ...payload,
      totalPrice,
    };

    const result = await orderCollection.insertOne(newOrder);

    if (result.insertedId) {
      // update stock first
      const bulkOps = cart.map((item) => ({
        updateOne: {
          filter: {
            _id: new ObjectId(item.productId),
          },
          update: {
            $inc: {
              sold: item.quantity,
            },
          },
        },
      }));
      // console.log(bulkOps);
      await productCollection.bulkWrite(bulkOps); //how to updateMany here
      // clear cart
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
