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

export async function fetchSongsByTagID(tagName: string){
  console.log(tagName);
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
