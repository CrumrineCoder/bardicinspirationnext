import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../app/db/uplink";
import { songsTable } from "../../app/db/schema";

export async function GET(request: Request) {
  const songs = await db.select().from(songsTable);
  return new Response(JSON.stringify(songs), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
