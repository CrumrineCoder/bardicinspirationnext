"use client";
import { useState, useEffect } from "react";
import { Song, Tag } from "../interfaces";
import CurrentSong from "./CurrentSong";
import { fetchAllSongs, fetchAllTags } from "../queries/fetchData";

export default function SongDiscovery() {
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);
  const [selectedTag, setSelectedTag] = useState<Tag | null>(null);
  const [allSongs, setAllSongs] = useState<Song[] | null>(null);

  useEffect(() => {
    fetchAllSongs().then(async (response) => {
      const data = await response;
      setAllSongs(data);
      if (data) {
        setSelectedSong(data[0]);
      }
    });
  }, []);

  useEffect(() => {}, [selectedSong]);

  return (
    <div className="relative flex gap-5">
      <div>
        {allSongs &&
          allSongs.map((song, index) => <div className="SongListing py-1" onClick={() => {setSelectedSong(song)}} key={index}>{song.songName}</div>)}
      </div>
      {selectedSong && <CurrentSong song={selectedSong}></CurrentSong>}
    </div>
  );
}
