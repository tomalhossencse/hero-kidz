"use server";

import { authOptions } from "@/lib/authOptions";
import { carts, dbConnect, products } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { cache } from "react";

const cartCollection = dbConnect(carts);

export const handleCart = async (productId) => {
  try {
    const { user } = (await getServerSession(authOptions)) || {};
    if (!user)
      return {
        success: false,
      };

    // getCartItem - user.email && productId
    const query = { email: user?.email, productId: new ObjectId(productId) };
    const isExist = await cartCollection.findOne(query);

    if (isExist) {
      // if exist - update
      const updateData = {
        $inc: {
          quantity: 1,
        },
      };

      const result = await cartCollection.updateOne(query, updateData);
      return {
        success: Boolean(result.modifiedCount),
      };
    } else {
      const product = await dbConnect(products).findOne({
        _id: new ObjectId(productId),
      });
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
    const planData = result.map((item) => ({
      ...item,
      productId: item.productId.toString(),
      _id: item._id.toString(),
    }));
    return planData;
  } catch (error) {
    console.error("getCart error:", error);
    return [];
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

    const query = { _id: new ObjectId(id), email: user?.email };
    const result = await cartCollection.deleteOne(query);
    // if (Boolean(result.deletedCount)) {
    //   revalidatePath("/cart");
    // }
    return { success: Boolean(result.deletedCount) };
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const increaseItemCart = async (id) => {
  try {
    const { user } = (await getServerSession(authOptions)) || {};
    if (!user)
      return {
        success: false,
      };
    const query = { _id: new ObjectId(id), email: user?.email };
    const updateData = {
      $inc: {
        quantity: 1,
      },
    };

    const result = await cartCollection.updateOne(query, updateData);
    return {
      success: Boolean(result.modifiedCount),
    };
  } catch (error) {
    return error;
  }
};

export const decreaseItemCart = async (id) => {
  try {
    const { user } = (await getServerSession(authOptions)) || {};
    if (!user)
      return {
        success: false,
      };
    const query = { _id: new ObjectId(id), email: user?.email };
    const updateData = {
      $inc: {
        quantity: -1,
      },
    };

    const result = await cartCollection.updateOne(query, updateData);
    return {
      success: Boolean(result.modifiedCount),
    };
  } catch (error) {
    return error;
  }
};

export const clearCart = async () => {
  try {
    const { user } = (await getServerSession(authOptions)) || {};
    if (!user)
      return {
        success: false,
      };

    const query = { email: user?.email };

    const result = await cartCollection.deleteMany(query);
    return result;
  } catch (error) {
    console.log(error);
  }
};
