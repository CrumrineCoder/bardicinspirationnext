import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";

import type { User } from "./src/app/interfaces";
// Why did npm install --save-dev @types/bcrypt work ? 
import bcrypt from "bcrypt";
import postgres from "postgres";

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);
      },
    }),
  ],
});
