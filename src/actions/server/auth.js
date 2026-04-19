"use server";

import { dbConnect, users } from "@/lib/dbConnect";
import bcrypt from "bcryptjs";
const userCollection = dbConnect(users);

export const postUser = async (payload) => {
  const { password, email, name } = payload;
  // check payload

  if (!email || !password) return null;

  // check user

  const isExist = await userCollection.findOne({ email });
  if (isExist) return null;

  // create your

  const newUser = {
    providerId: "credentials",
    name,
    email,
    password: await bcrypt.hash(password, 14),
    role: "user",
    createdAt: new Date().toISOString(),
  };

  // save your in db

  const result = await userCollection.insertOne(newUser);

  if (result.acknowledged) {
    return {
      ...result,
      insertedId: result.insertedId.toString(),
    };
  }
};

export const loginUser = async (payload) => {
  const { email, password } = payload;
  if (!email || !password) return null;

  const user = await userCollection.findOne({ email });

  if (!user) return null;

  const isMatchedPassword = await bcrypt.compare(password, user.password);

  if (isMatchedPassword) {
    return user;
  } else {
    return null;
  }
};
