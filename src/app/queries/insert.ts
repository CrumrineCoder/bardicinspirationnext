import { db } from '../db';
import { InsertSong, SelectSong, songsTable } from '../db/schema';

export async function createSong(data: InsertSong) {
  await db.insert(songsTable).values(data);
  // 23505 error handling
}