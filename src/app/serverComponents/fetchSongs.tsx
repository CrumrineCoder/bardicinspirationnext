'use server'
import { db } from "../../app/db/uplink";
import { songsTable } from "../../app/db/schema";

export default async function fetchSongs() {
  const songs = await db.select().from(songsTable);
  console.log(songs);
  return songs;
}
