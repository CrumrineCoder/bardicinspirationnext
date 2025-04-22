"use server";
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
import { createSession } from "./src/app/session";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";

// Might need to change to a drizzle solution here.
const sql = postgres(process.env.DATABASE_URL!, { ssl: "require" });

async function verifyPassword(
  plainPassword: string,
  hashedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(plainPassword, hashedPassword);
}

export async function login(userName: string, password: string) {
  const user = await db
    .select()
    .from(userTable)
    .where(eq(userTable.username, userName))
    .limit(1);

  if (!user){
    throw new Error("No such user found.")
  }

  const isPasswordValid = verifyPassword(user[0].password, password);
  if (!isPasswordValid) {
    throw new Error("Invalid credentials");
  }

  await createSession(user[0].id);
  return user;

}

export async function signUp(state: FormState, formData: FormData) {
  const validatedFields = SignUpFormSchema.safeParse({
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
  });
  /*
  {
    success: true,
    data: {
      username: 'The Duder',
      email: 'duder@gmail.com',
      password: 'passwordThat23498234Special@#!@#$@#%Characters'
    }
  }
  */
  // Error handling
  if (!validatedFields.success) {
    console.log(validatedFields.error);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { username, email, password } = validatedFields.data;

  // Hash our password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Store the user
  const data = await db
    .insert(userTable)
    .values({
      username,
      email,
      password: hashedPassword,
    })
    .returning({ id: userTable.id });

  // returns the ID of the user we just created
  const user = data[0];

  if (!user) {
    return {
      message: "An error occured while creating your account",
    };
  }

  await createSession(user.id);

  // redirect("/profile");
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
