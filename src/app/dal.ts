import "server-only";

import { cookies } from "next/headers";
import { decrypt } from "./session";
import { cache } from "react";
import { db } from "@/app/db";
import { userTable } from "./db/schema";
import { or, eq, inArray } from "drizzle-orm";

export const verifySession = cache(async () => {
  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie);

  if (!session?.userId) {
    //  redirect('/login')
    return;
  }

  return { isAuth: true, userId: session.userId as number };
});

export const getUser = cache(async () => {
  const session = await verifySession();
  if (!session) return null;

  try {
    const data = await db
        .select({
          id: userTable.id,
          username: userTable.username,
          email: userTable.email,
        })
        .from(userTable)
        .where(eq(userTable.id, session.userId))
        .limit(1);
  

    const user = data[0];
    console.log(user);
    return user;
  } catch (error) {
    console.log("Failed to fetch user");
    return null;
  }
});
