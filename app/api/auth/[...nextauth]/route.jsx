import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/util/dbConnection";
import User from "@/models/Users";
import dbConnect from "@/util/dbConnection";
import bcrypt from "bcryptjs";

dbConnect();
const handler = NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      httpOptions: {
        timeout: 1000000, // 10 saniye
      },
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials, req) {
        const email = credentials.email;
        const password = credentials.password;
        const user = await User.findOne({ email: email });
        if (!user) {
          throw new Error("You haven't registed yet");
        }
        if (user) {
          return signInUser({ user, password });
        }
      },
    }),
  ],
  session: {
    // strategy: "database", // Bu kısmı eklemen gerekiyor
    strategy: "jwt", // Token üzerinden çalışır Bu sistemde oturum bilgisi (session), veritabanına değil, JWT token içine yazılır.
  },

  page: {
    signIn: "/auth", // Giriş sayfası
    error: "/auth", // Hata sayfası
  },
  //database: process.env.MONGODB_URI, // jwt kullanırsan bu kısmı kaldırabilirsin
  secret: process.env.NEXTAUTH_SECRET,
});

const signInUser = async ({ user, password }) => {
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Incorrenct password");
  }
  return user;
};

export { handler as GET, handler as POST };
