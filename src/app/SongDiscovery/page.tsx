"use client";
import { useState, useEffect } from "react";
import { Song, Tag } from "../interfaces";
import CurrentSong from "./CurrentSong";
import {
  fetchAllSongs,
  fetchAllTags,
  fetchSongsByTagName,
} from "../queries/fetchData";

export default function SongDiscovery() {
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);
  const [selectedTag, setSelectedTag] = useState<Tag | null>(null);
  const [allSongs, setAllSongs] = useState<Song[] | null>(null);
  const [tagName, setTagName] = useState<string | null>(null);

  function getAllSongs() {
    fetchAllSongs().then(async (response) => {
      const data = await response;
      setAllSongs(data);
      if (data) {
        setSelectedSong(data[0]);
      }
    });
  }

  useEffect(() => {
    getAllSongs();
  }, []);

  return (
    <div className="text-white">
      <form
        className="float-right"
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
          className=""
        />
        <button className="" type="submit">
          Search Tag
        </button>
        <div>
          <button
            className=""
            onClick={() => {
              setTagName(null);
              getAllSongs();
            }}
          >
            Reset Filter
          </button>
        </div>
      </form>

      <div className="relative flex">
        <div className="mr-20">
          {allSongs &&
            allSongs.map((song, index) => (
              <div
                className={`SongListing py-1 ${
                  selectedSong?.id === song.id ? "ml-5 ActiveSongListing" : ""
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
