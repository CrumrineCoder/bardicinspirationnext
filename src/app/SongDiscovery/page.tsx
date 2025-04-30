"use client";
import { useState, useEffect } from "react";
import { Song, Tag } from "../interfaces";
import CurrentSong from "./CurrentSong";
import {
  fetchAllSongs,
  fetchAllTags,
  fetchSongsByTagName,
} from "../queries/fetchData";
import TagListing from "./TagListing";
import SongListing from "./SongListing";
import SubmitSongForm from "../clientContainers/components/submitSongForm";
import Link from "next/link"

export default function SongDiscovery({ refresh }: { refresh: boolean }) {
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
  }, [refresh]);

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
        // Need to add a disclaimer to show that the tag isn't in the DB
        // Also suggested tags, autocomplete, etc.
      });
  }

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

  return (
    <div>
      <div className="flex justify-center">
        <button
          className="SmallButton mb-5"
          onClick={() => setAddingSong(!addingSong)}
        >
          Add Song
        </button>
      </div>
      {!addingSong ? (
        <div className="relative flex text-white gap-10">
          <SongListing
            selectedSong={selectedSong}
            allSongs={allSongs}
            setSelectedSong={setSelectedSong}
          ></SongListing>
          {selectedSong && <CurrentSong song={selectedSong}></CurrentSong>}
          <TagListing
            selectedTag={selectedTag}
            allTags={allTags}
            setSelectedTag={setSelectedTag}
            getSongsByTagName={getSongsByTagName}
            getAllSongs={getAllSongs}
          ></TagListing>
        </div>
      ) : (
        <SubmitSongForm onUpdate={() => { getAllSongs(); setAddingSong(!addingSong); }}></SubmitSongForm>
      )}
       <Link
        href="/"
        className="mx-auto mt-4 flex w-fit items-center justify-center rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 cursor-pointer"
      >
        Back to AI Suggestions
      </Link>
    </div>
  );
}
