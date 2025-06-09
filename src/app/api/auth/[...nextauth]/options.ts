import type { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProviders from "next-auth/providers/credentials";
import { GithubProfile } from "next-auth/providers/github";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@/generated/prisma";
import bcrypt from "bcryptjs";

export const prisma = new PrismaClient();

export const options: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProviders({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username:",
          type: "text",
          placeholder: "your-username",
        },
        password: {
          label: "Password:",
          type: "text",
          placeholder: "password",
        },
      },
      async authorize(credentials) {
        const user = await prisma.user.findFirst({
          where: {
            name: credentials?.username,
          },
        });

        if (!user || !user.password) return null;

        const isMatch = await bcrypt.compare(
          credentials?.password!,
          user.password
        );

        if (!isMatch) return null;

        return {
          id: user.id,
          name: user.name ?? "Unknown",
          email: user.email ?? " ",
          image: user.image ?? " ",
          role: user.role ?? "user",
        };
      },
    }),
    GitHubProvider({
      profile(profile: GithubProfile) {
        return {
          id: profile.id.toString(),
          name: profile.name ?? profile.login,
          email: profile.email,
          image: profile.avatar_url,
          role: profile.role,
        };
      },
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.userId = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role;
        session.user.id = token.userId;
      }
      return session;
    },
    async redirect({ baseUrl }) {
      return baseUrl; // Redirect to homepage after signin
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
  session: {
    strategy: "jwt",
  },
  debug: true,
};
