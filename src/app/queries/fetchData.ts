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

export async function fetchSongs() {
  const songs = await db.select().from(songsTable);
  return songs;
}

export async function fetchTags(id: number) {
  const songs = await db.select().from(tagTable).where(eq(tagTable.id, id));
  return songs;
}

export async function fetchSongTags() {
  const songTags = await db.select().from(songTagsTable);
  return songTags;
}

export async function fetchUsers() {
  const users = await db.select().from(usersTable);
  return users;
}

export async function fetchTagVotes() {
  const tagVotes = await db.select().from(tagVotesTable);
  return tagVotes;
}



