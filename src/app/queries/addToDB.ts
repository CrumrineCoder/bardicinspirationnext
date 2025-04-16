'use server'
import { db } from "../db";
import { songsTable } from "../db/schema";

export async function sendData(songName: string, artist: string, link: string) {
    try {
      await db.insert(songsTable).values({
        songName: songName,
        artist: artist,
        link: link,
      });
      console.log("Data sent successfully!");
    } catch (error) {
      console.error("Error sending data:", error);
    }
  }