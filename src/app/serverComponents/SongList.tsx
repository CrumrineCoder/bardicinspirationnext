"use client";

import { useEffect, useState } from "react";
import { fetchSongs, fetchTags, fetchSongTags, fetchTagVotes,  fetchUsers } from "../queries/fetchData"

export default function SongList({ refresh }: { refresh: boolean }) {
  const [songs, setSongs] = useState<{id: number, artist: string, songName: string, link: string}[]>();

  useEffect(() => {
    fetchSongs().then(async (response) => {
      const data = await response;
      setSongs(data);
    });
  }, [refresh]);

  useEffect(() => {
    if (songs) {
      fetchTags(1).then((data) => {
        console.log(data);
      });
    }
  }, [songs]);

  return (
    <div>
      {songs && songs.map((song, index) => (
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