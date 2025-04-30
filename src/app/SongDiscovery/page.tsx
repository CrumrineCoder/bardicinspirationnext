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
import SongListing from "./SongListing"

export default function SongDiscovery() {
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [allSongs, setAllSongs] = useState<Song[] | null>(null);
  const [allTags, setAllTags] = useState<string[] | null>(null);

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

  function searchTag() {
    if (selectedTag) {
      fetchSongsByTagName(selectedTag).then(async (response) => {
        setAllSongs(response);
      });
    }
  }

  return (
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
  );
}
