import { db } from "../db/uplink";
import { songsTable } from "../db/schema";

export default async function SongList() {
  'use server'
  const songs = await db.select().from(songsTable);
  return (
    <div>
      {songs.map((song, index) => (
        <div key={index}>
          ID: {song.id}
          <br />
          Artist: {song.artist}
          <br />
          Song Name: {song.songName}
          <br />
          YT Link: {song.link}
        </div>
      ))}
    </div>
  );
}