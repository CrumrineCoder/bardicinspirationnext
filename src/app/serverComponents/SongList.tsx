
import { db } from "../db/uplink";
import { songsTable } from "../db/schema";
import {useEffect, useState} from "react";

export default async function SongList() {
  'use client'
  const [songs, setSongs] = useState<{ id: number; artist: string; songName: string; link?: string }[]>([]);

  async function retrieveDB () {
    const fetchedSongs = await db.select().from(songsTable);
    setSongs(fetchedSongs);
  }
  
  useEffect(() => {
    retrieveDB();
  }, []);
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