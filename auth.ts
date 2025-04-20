import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";

import type { User } from "./src/app/interfaces";
// Why did npm install --save-dev @types/bcrypt work ? 
import bcrypt from "bcrypt";
import postgres from "postgres";

// Might need to change to a drizzle solution here. 
const sql = postgres(process.env.DATABASE_URL!, {ssl: 'require'})

async function getUser(email: string): Promise<User | undefined>{
    try{
        const user = await sql<User[]>`SELECT * FROM users WHERE email = ${email}`;
        return user[0];
    } catch (error){
        console.log("Failed to fetch user:", error);
        throw new Error("Failed to fetch user.");
    }
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

          if(parsedCredentials.success){
            const {email, password} =  parsedCredentials.data;
            const user = await getUser(email);
            if (!user) return null; 
          }
          return null; 
      },
    }),
  ],
});
