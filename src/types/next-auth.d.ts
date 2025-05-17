import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: "ADMIN" | "CLIENT";
      subscriptionEndDate?: Date;
    } & DefaultSession["user"];
  }

  interface User {
    role: "ADMIN" | "CLIENT";
    subscriptionEndDate?: Date;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: "ADMIN" | "CLIENT";
    subscriptionEndDate?: Date;
  }
} 