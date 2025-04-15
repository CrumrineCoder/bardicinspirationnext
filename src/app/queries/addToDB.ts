'use server'
import { db } from "../db/uplink";
import { songsTable } from "../db/schema";

export async function sendData() {
    try {
      await db.insert(songsTable).values({
        songName: "Dirtmouth",
        artist: "Hollow Knight",
        link: "NSlkW1fFkyo",
      });
      console.log("Data sent successfully!");
    } catch (error) {
      console.error("Error sending data:", error);
    }
  }