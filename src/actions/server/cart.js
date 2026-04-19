"use server";

import { authOptions } from "@/lib/authOptions";
import { carts, dbConnect } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { cache } from "react";

const cartCollection = dbConnect(carts);

export const handleCart = async ({ product, inc = true }) => {
  try {
    const { user } = (await getServerSession(authOptions)) || {};
    if (!user)
      return {
        success: false,
      };

    // getCartItem - user.email && productId
    const query = { email: user?.email, productId: product?._id };
    const isExist = await cartCollection.findOne(query);

    if (isExist) {
      // if exist - update
      const updateData = {
        $inc: {
          quantity: inc ? 1 : -1,
        },
      };

      const result = await cartCollection.updateOne(query, updateData);
      return {
        success: Boolean(result.modifiedCount),
      };
    } else {
      // Not exist - insert
      const discountedPrice =
        product.price - (product.price * product.discount) / 100;

      const newCart = {
        productId: product?._id,
        email: user?.email,
        title: product?.title,
        image: product?.image,
        createdAt: new Date().toISOString(),
        price: discountedPrice,
        userName: user?.name,
        quantity: 1,
      };

      const result = await cartCollection.insertOne(newCart);
      return {
        success: result.acknowledged,
      };
    }
  } catch (error) {
    return error;
  }
};

export const getCart = cache(async () => {
  try {
    const { user } = (await getServerSession(authOptions)) || {};
    if (!user) return [];

    const query = { email: user?.email };
    const result = await cartCollection
      .find(query)
      .sort({ createdAt: -1 })
      .toArray();
    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
});
export const deleteItemsCart = async (id) => {
  try {
    const { user } = (await getServerSession(authOptions)) || {};
    if (!user)
      return {
        success: false,
      };

    if (id?.length != 24) {
      return {
        success: false,
      };
    }

    const query = { _id: new ObjectId(id) };
    const result = await cartCollection.deleteOne(query);
    if (Boolean(result.deletedCount)) {
      revalidatePath("/cart");
    }
    return { success: Boolean(result.deletedCount) };
  } catch (error) {
    console.log(error);
    return error;
  }
};
