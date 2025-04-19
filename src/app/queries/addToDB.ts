"use server";
import { db } from "../db";
import { songsTable, songTagsTable, tagTable } from "../db/schema";
import { eq } from "drizzle-orm";

export async function addSongToDB(
  songName: string,
  artist: string,
  link: string
) {
  try {
    await db.insert(songsTable).values({
      songName: songName,
      artist: artist,
      link: link,
    });
    console.log("Data sent successfully!");
  } catch (error) {
    if ((error as any).code == 23505) {
      throw new Error("A song with this name already exists.");
    } else {
      console.error("Error sending data:", error);
    }
  }
}

export async function addTagToDB(tagname: string, songID: number) {
  //   throw new Error("Fuck you dude");
  try {
    // Check uniqueness
    const existingTag = await db
      .select()
      .from(tagTable)
      .where(eq(tagTable.tagName, tagname))
      .limit(1);
      
    // If the tag doesn't exist, just go to songTags to register this tag to this song
    if (existingTag.length > 0) {
      const existingTagId = existingTag[0].id;
      await db
        .insert(songTagsTable)
        .values({ tagID: existingTagId, songID: songID });
      return;
    }

    const insertedTag = await db
      .insert(tagTable)
      .values({ tagName: tagname })
      .returning({ id: tagTable.id });

    const tagID = insertedTag[0]?.id;
    if (!tagID) {
      throw new Error("Failed to retrieve the inserted tag ID.");
    }

    await db.insert(songTagsTable).values({ tagID: tagID, songID: songID });
  } catch (error) {
    if ((error as any).code == 23505) {
      throw new Error("A tag with this name already exists on this song.");
    } else {
      console.error("Error sending data to Tags:", error);
      throw new Error("Unknown error occured");
    }
  }
}
