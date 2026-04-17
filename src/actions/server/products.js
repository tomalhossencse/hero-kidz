"use server";

import { dbConnect } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
const productCollection = dbConnect("products");

export const getProducts = async () => {
  const products = await productCollection.find().toArray();
  return JSON.parse(JSON.stringify(products));
};

export const getSingleProducts = async (id) => {
  if (id.length != 24) {
    return {};
  }
  const query = {
    _id: new ObjectId(id),
  };
  const product = await productCollection.findOne(query);
  return product || {};
};
