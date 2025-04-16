"use server";
import { db } from "../db";
import {
  songsTable,
  tagTable,
  tagVotesTable,
  usersTable,
  songTagsTable,
} from "../db/schema";
import {or, eq} from "drizzle-orm";

export async function fetchAllSongs() {
  const songs = await db.select().from(songsTable);
  return songs;
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