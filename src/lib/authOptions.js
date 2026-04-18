import { loginUser } from "@/actions/auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { dbConnect } from "./dbConnect";
import { img } from "framer-motion/client";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        // username: { label: "Username", type: "text", placeholder: "jsmith" },
        // password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const user = await loginUser(credentials);
        // console.log(credentials);

        return user;
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      const userCollection = dbConnect("users");
      const isExist = await userCollection.findOne({
        email: user?.email,
        provider: account?.provider,
      });
      if (isExist) {
        return true;
      }
      const newUser = {
        providerId: account?.provider,
        name: user.name,
        email: user?.email,
        image: user.image,
        role: "user",
        createdAt: new Date().toISOString(),
      };

      const result = await userCollection.insertOne(newUser);

      if (result.acknowledged) {
        return {
          ...result,
          insertedId: result.insertedId.toString(),
        };
      }
      // return true;
    },
    // async redirect({ url, baseUrl }) {
    //   return baseUrl;
    // },
    // async session({ session, token, user }) {
    //   return session;
    // },
    // async jwt({ token, user, account, profile, isNewUser }) {
    //   return token;
    // },
  },
};
