"use server";

import { dbConnect, products } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
const productCollection = dbConnect(products);

export const getProducts = async () => {
  try {
    const products = await productCollection.find().toArray();
    const plainProducts = products.map((product) => ({
      ...product,
      _id: product._id.toString(),
    }));
    return plainProducts;
  } catch (error) {
    console.log("Products erro : ", error);
    return [];
  }
};

export const getSingleProducts = async (id) => {
  if (id.length != 24) {
    return {};
  }
  const query = {
    _id: new ObjectId(id),
  };
  const product = await productCollection.findOne(query);
  return { ...product, _id: product._id.toString() } || {};
};
