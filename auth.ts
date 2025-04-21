
import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import { SignUpFormSchema, FormState, userTable } from "./src/app/db/schema";

import type { User } from "./src/app/interfaces";
// Why did npm install --save-dev @types/bcrypt work ?
import bcrypt from "bcrypt";
import postgres from "postgres";
import { db } from "@/app/db";
import {createSession} from "./src/app/session";
import { redirect } from "next/navigation";

// Might need to change to a drizzle solution here.
const sql = postgres(process.env.DATABASE_URL!, { ssl: "require" });

export async function signUp(state: FormState, formData: FormData) {
  const validatedFields = SignUpFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { name, email, password } = validatedFields.data;

  const hashedPassword = await bcrypt.hash(password, 10);

  const data = await db.insert(userTable).values({
    name,
    email,
    password: hashedPassword,
  })
  .returning({id: userTable.id})

  const user = data[0];

  if(!user){
    return{
        message: "An error occured while creating your account"
    }
  }

  await createSession(user.id);

  redirect("/profile");
}

async function getUser(email: string): Promise<User | undefined> {
  try {
    const user = await sql<User[]>`SELECT * FROM users WHERE email = ${email}`;
    return user[0];
  } catch (error) {
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

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email);
          if (!user) return null;
        }
        return null;
      },
    }),
  ],
});
