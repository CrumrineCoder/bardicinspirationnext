"use server";
import postgres from "postgres";

async function getData() {
  if (process.env.DATABASE_URL) {
    const sql = postgres(process.env.DATABASE_URL, { ssl: "require" });
    const response = await sql`SELECT version()`;
    return response[0].version;
  }
}

export default async function Form(){
    const data = await getData();
    return <>{data}</>;
}