'use server'
import { db } from "../db";
import { songsTable, tagTable } from "../db/schema";

export async function addSongToDB(songName: string, artist: string, link: string) {
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

  export async function addTagToDB(tagname: string) {
    try {
      await db.insert(tagTable).values({
        tagName: tagname
      });
      console.log("Data sent successfully!");
    } catch (error) {
      console.error("Error sending data:", error);
    }
  }