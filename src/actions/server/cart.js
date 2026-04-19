"use server";

import { authOptions } from "@/lib/authOptions";
import { carts, dbConnect } from "@/lib/dbConnect";
import { getServerSession } from "next-auth";

const cartCollection = dbConnect(carts);

export const handleCart = async ({ product, inc = true }) => {
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
};
