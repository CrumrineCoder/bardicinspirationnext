"use server";
import { db } from "../db";
import {
  songsTable,
  tagTable,
  tagVotesTable,
  usersTable,
  songTagsTable,
} from "../db/schema";
import { or, eq, inArray } from "drizzle-orm";

export async function searchForTagIDWithName(tagName: string) {
  const existingTag = await db
    .select()
    .from(tagTable)
    .where(eq(tagTable.tagName, tagName))
    .limit(1);
  return existingTag;
}

export async function searchForSongTagsWithTagID(tagID: number) {
  const existingTag = await db
    .select()
    .from(songTagsTable)
    .where(eq(songTagsTable.tagID, tagID))
    .limit(1);
  return existingTag;
}

export async function fetchAllSongs() {
  const songs = await db.select().from(songsTable);
  return songs;
}

export async function fetchTagsBySongID(songID: number) {
  const songTags = await db
    .select()
    .from(songTagsTable)
    .where(eq(songTagsTable.songID, songID));

  const tagIDs = songTags.map((tag) => tag.tagID);

  const tagNames = await db
    .select({ tagName: tagTable.tagName })
    .from(tagTable)
    .where(inArray(tagTable.id, tagIDs));
  return tagNames;
}

export async function fetchSongsByTagName(tagName: string){
  // get the ID for the current tag 
  const tagID = await searchForTagIDWithName(tagName);
  if(tagID.length > 0 ){
  const songTagsForTag = await searchForSongTagsWithTagID(tagID[0].id);
  } else{
    throw new Error ("No such tag exists");
  }
}
/*
export async function fetchTagsByID(id: number[]) {
  const songs = await db.select().from(tagTable).where(eq(tagTable.id, id));
  return songs;
}

export async function fetchSongTagsByID(id: number[]) {
  const songTags = await db.select().from(songTagsTable).where(eq(songTagsTable.id, id));
  return songTags;
}

export async function fetchUsersByID(id: number[]) {
  const users = await db.select().from(usersTable).where(eq(usersTable.id, id));
  return users;
}

export async function fetchTagVotesByID(id: number[]) {
  const tagVotes = await db.select().from(tagVotesTable).where(eq(tagVotesTable.id, id));
  return tagVotes;
}

*/
