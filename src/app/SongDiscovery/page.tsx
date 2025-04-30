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
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [allSongs, setAllSongs] = useState<Song[] | null>(null);
  const [allTags, setAllTags] = useState<string[] | null>(null);

  function getAllSongs() {
    fetchAllSongs().then(async (response) => {
      const data = await response;
      setAllSongs(data);
      if (data) {
        setSelectedSong(data[0]);
      }
    });
  }

  function getAllTags() {
    fetchAllTags().then(async (response) => {
      const data = await response;
      if (data) {
        const mappedData = data.map((tag: { tagName: string }) => {
          return tag.tagName;
        });
        // Might have to change this to keep the IDs; will figure out during search.
        setAllTags(mappedData);
      }
    });
  }

  useEffect(() => {
    getAllSongs();
    getAllTags();
  }, []);

  function searchTag() {
    if (selectedTag) {
      fetchSongsByTagName(selectedTag).then(async (response) => {
        setAllSongs(response);
      });
    }
  }

  return (
    <div className="relative flex text-white gap-10">
      <div>
        {allSongs &&
          allSongs.map((song, index) => (
            <div
              className={`ClickableInlineEntry py-1 ${
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
      <div>
        <div>
          <form
            className=""
            onSubmit={(e) => {
              e.preventDefault();
              if (selectedTag) {
                fetchSongsByTagName(selectedTag.toLowerCase())
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
              value={selectedTag || ""}
              onChange={(e) => {
                e.preventDefault();
                setSelectedTag(e.target.value);
              }}
              className="mr-2 p-1"
            />
            <button
              onClick={() => searchTag()}
              className="SmallButton"
              type="submit"
            >
              Search Tag
            </button>
          </form>
          <button
            className="SmallButton"
            onClick={() => {
              setSelectedTag(null);
              getAllSongs();
            }}
          >
            Reset Filter
          </button>
        </div>
        {allTags && (
          <div className="text-center">
            <h4>Recent Tags</h4>
            {allTags.map((tag, index) => (
              <span
                key={index}
                onClick={async () => {
                  setSelectedTag(tag);
                }}
                className="pr-2 ClickableInlineEntry SidebarTagListing"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
