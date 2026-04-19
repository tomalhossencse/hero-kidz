import { loginUser } from "@/actions/auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { dbConnect } from "./dbConnect";

const userCollection = dbConnect("users");
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
      const isExist = await userCollection.findOne({
        email: user?.email,
        // provider: account?.provider,
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
    async session({ session, token, user }) {
      if (token) {
        session.role = token?.role;
        session.email = token?.email;
      }
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      if (user) {
        if (account.provider === "google") {
          const dbUser = await userCollection.findOne({ email: user.email });
          token.role = dbUser?.role;
          token.email = dbUser?.email;
        } else {
          token.role = user?.role;
          token.email = user?.email;
        }
      }
      return token;
    },
  },
};
