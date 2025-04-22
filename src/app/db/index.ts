import { neon } from "@neondatabase/serverless";
import dotenv from "dotenv";

import { drizzle } from "drizzle-orm/neon-http";
import { songsTable, userTable } from "./schema";

dotenv.config();

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL must be a Neon postgres connection string");
}

const sql = neon(process.env.DATABASE_URL!);

export const db = drizzle(sql, {
  schema: { songsTable, userTable },
});
