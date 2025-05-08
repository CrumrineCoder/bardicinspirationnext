"use client";
import { useState, useEffect, Suspense } from "react";
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
// We're using this to randomize the Song Listing on the left 
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
  // Not sure if there's a better way to be handling displaying every song in the database other than storing it all here
  const [allSongs, setAllSongs] = useState<Song[] | null>(null);
  const [allTags, setAllTags] = useState<string[] | null>(null);
  // Toggle state for if the user is changing between the Add Song UI and the manually viewing songs UI [We're keeping the functionality here to maintain the UI between the two for aesthetic purposes]
  const [addingSong, setAddingSong] = useState<boolean>(false);

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
        // Recent tags; so we'll reverse it. We could've done this in the query itself but I prefer to just do it here so we don't have to have a dedicated query for it. 
        setAllTags(mappedData.reverse());
      }
    });
  }

  // On first load, fetch all songs and tags from the database.
  useEffect(() => {
    getAllSongs();
    getAllTags();
  }, []);

  // Functionality when the user clicks on a tag on the right hand side. 
  function getSongsByTagName(selectedTag: string | null) {
    if (!selectedTag) {
      console.warn("No tag selected.");
      return;
    }
    // Change all songs to be the subset of songs with the tag; we could handle this by keeping allSongs and searchSongs(?) separate but that might be future functionality. This works for now. 
    fetchSongsByTagName(selectedTag.toLowerCase())
      .then((data) => {
        setAllSongs(data);
      })
      .catch((error) => {
        console.error("Error fetching songs by tag name:", error);
      });
  }

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
      <Suspense fallback={<>Loading...</>}>
        <div className="relative flex text-white gap-10">
          {allSongs ? (
            <SongListing
              selectedSong={selectedSong}
              allSongs={allSongs}
              setSelectedSong={setSelectedSong}
              disabled={addingSong}
            ></SongListing>
          ): <div className="m-2">Loading Song titles...</div>}
          {!addingSong ? (
            <>
              {selectedSong ? (
                <CurrentSong
                  allTags={allTags}
                  song={selectedSong}
                ></CurrentSong>
              ) : (
                <div className="m-2">Loading Current Song...</div>
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
          {allTags ? (
            <TagListing
              selectedTag={selectedTag}
              allTags={allTags}
              setSelectedTag={setSelectedTag}
              getSongsByTagName={getSongsByTagName}
              getAllSongs={getAllSongs}
              disabled={addingSong}
            ></TagListing>
          ): <div className="m-2">Loading Tag Categories...</div>}
        </div>
      </Suspense>
      <Link
        href="/"
        className="mx-auto mt-4 flex w-fit items-center justify-center rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 cursor-pointer"
      >
        Back to AI Suggestions
      </Link>
    </div>
  );
}
