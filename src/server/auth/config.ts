import { PrismaAdapter } from "@auth/prisma-adapter";
import { Session, User, type DefaultSession, type NextAuthOptions } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";

import { db } from "~/server/db";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authConfig: NextAuthOptions = {
  providers: [
  DiscordProvider({
    clientId: process.env.DISCORD_CLIENT_ID ?? "",
    clientSecret: process.env.DISCORD_CLIENT_SECRET ?? "",
  }),
],
  adapter: PrismaAdapter(db),
  callbacks: {
    session: ({ session, user } : { session: Session; user: User }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
      },
    }),
  },
};