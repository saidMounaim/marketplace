import "next-auth";

declare module "next-auth" {
  interface User {
    isAdmin: boolean;
    accessToken: string;
  }
  interface Session {
    user?: {
      id: number;
      isAdmin: boolean;
    } & DefaultSession["user"];
  }
}
