"use client";
import { useState, useEffect } from "react";
import { Song, Tag } from "../interfaces";
import CurrentSong from "./CurrentSong";
import { fetchAllSongs, fetchAllTags, fetchSongsByTagName } from "../queries/fetchData";

export default function SongDiscovery() {
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);
  const [selectedTag, setSelectedTag] = useState<Tag | null>(null);
  const [allSongs, setAllSongs] = useState<Song[] | null>(null);
  const [tagName, setTagName] = useState<string | null>(null);

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
    <div>
      <form
        className="SearchTagForm"
        onSubmit={(e) => {
          e.preventDefault();
          if (tagName) {
            fetchSongsByTagName(tagName.toLowerCase())
              .then((data) => {
                setAllSongs(data);
              })
              .catch((error) => {
                console.error("Error fetching songs by tag name:", error);
                // Need to add a disclaimer to show that the tag isn't in the DB
                // Also suggested tags, autocomplete, etc.
              });
          }
        }}
      >
        <input
          type="text"
          name="tagName"
          placeholder="Enter Tag"
          required
          value={tagName || ""}
          onChange={(e) => setTagName(e.target.value)}
          className="SearchTagBar"
        />
        <button className="SearchTagSubmitButton" type="submit">
          Search Tag
        </button>
      </form>
      <button
        className="SearchTagResetButton"
        onClick={() => {
          setTagName(null);
        }}
      >
        Reset Filter
      </button>
      <div className="relative flex gap-5">
        <div>
          {allSongs &&
            allSongs.map((song, index) => (
              <div
                className={`SongListing py-1 ${
                  selectedSong?.id === song.id ? "pl-5 ActiveSongListing" : ""
                }`}
                onClick={() => {
                  setSelectedSong(song);
                }}
                key={index}
              >
                {song.songName}
              </div>
            ))}
        </div>
        {selectedSong && <CurrentSong song={selectedSong}></CurrentSong>}
      </div>
    </div>
  );
}
