'use server'
import { db } from "../db/uplink";
import { songsTable } from "../db/schema";

export default async function fetchSongs() {
  const songs = await db.select().from(songsTable);
  return songs;
}
