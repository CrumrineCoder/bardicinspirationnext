"use client";
import { useState, useEffect } from "react";
import { Song } from "../interfaces";
import CurrentSong from "./CurrentSong";
import {
  fetchAllSongs,
  fetchAllTags,
  fetchSongsByTagName,
} from "../queries/fetchData";
import TagListing from "./TagListing";
import SongListing from "./SongListing";
import AddSong from "./AddSong";
import Link from "next/link";

// from https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffleArray(array: Song[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export default function SongDiscovery() {
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [allSongs, setAllSongs] = useState<Song[] | null>(null);
  const [allTags, setAllTags] = useState<string[] | null>(null);
  const [addingSong, setAddingSong] = useState<boolean>(false);

  useEffect(() => {
    fetchAllSongs().then(async (response) => {
      const data = await response;
      setAllSongs(data);
    });
  }, []);

  function getSongsByTagName(selectedTag: string | null) {
    if (!selectedTag) {
      console.warn("No tag selected.");
      return;
    }
    fetchSongsByTagName(selectedTag.toLowerCase())
      .then((data) => {
        setAllSongs(data);
      })
      .catch((error) => {
        console.error("Error fetching songs by tag name:", error);
      });
  }

  function getAllSongs() {
    fetchAllSongs().then(async (response) => {
      const data = await response;
      const shuffledSongs = shuffleArray(data);
      if (shuffledSongs) {
        setAllSongs(shuffledSongs);
        setSelectedSong(shuffledSongs[0]);
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
        setAllTags(mappedData.reverse());
      }
    });
  }

  useEffect(() => {
    getAllSongs();
    getAllTags();
  }, []);

  return (
    <div>
      <div className="flex justify-center">
        <button
          className="SmallButton mb-5"
          onClick={() => setAddingSong(!addingSong)}
        >
          {!addingSong ? "Submit Song" : "Find Songs"}
        </button>
      </div>
      <div className="relative flex text-white gap-10">
        <SongListing
          selectedSong={selectedSong}
          allSongs={allSongs}
          setSelectedSong={setSelectedSong}
          disabled={addingSong}
        ></SongListing>
        {!addingSong ? (
          <>
            {selectedSong && (
              <CurrentSong allTags={allTags} song={selectedSong}></CurrentSong>
            )}
          </>
        ) : (
          <AddSong
            onUpdate={() => {
              getAllSongs();
              setAddingSong(!addingSong);
            }}
          ></AddSong>
        )}
        <TagListing
          selectedTag={selectedTag}
          allTags={allTags}
          setSelectedTag={setSelectedTag}
          getSongsByTagName={getSongsByTagName}
          getAllSongs={getAllSongs}
          disabled={addingSong}
        ></TagListing>
      </div>
      <Link
        href="/"
        className="mx-auto mt-4 flex w-fit items-center justify-center rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 cursor-pointer"
      >
        Back to AI Suggestions
      </Link>
    </div>
  );
}
