"use client";

import { useEffect, useState } from "react";
import { fetchAllSongs, fetchTagsBySongID } from "../queries/fetchData";
import SongComponent from "./components/SongComponent";
import SearchTag from "./components/searchTags";
import AISearchTags from "./components/aiSearchTags";
import { Song } from "../interfaces";
// fetchTagsByID, fetchSongTagsByID,   fetchUsersByID, fetchTagVotesByID
export default function SongList({ refresh }: { refresh: boolean }) {
  const [songs, setSongs] = useState<Song[] | null>();

  useEffect(() => {
    fetchAllSongs().then(async (response) => {
      const data = await response;
      setSongs(data);
    });
  }, [refresh]);

  function resetSongs() {
    // Needs to also reset the filter -> Should be put into that component then?
    fetchAllSongs().then(async (response) => {
      const data = await response;
      setSongs(data);
    });
  }

  useEffect(() => {
    if (songs) {
      // For each song,
      // Find the SongTag for each songID we have displayed
      // Using that SongTag tagID, find all tags for the current song.
      // Then for each Tag,
      // Search for all songTags associated with that TAG (I don't think there's a way to do this without querying songTags twice?)
      // Find the tagVotes associated with this songTag
      // Find the userIDs associated with that tagVote
      // Get the user data from the userID
      // Return tags + user who voted on it.
      /* fetchTagsByID(1).then((data) => {
        console.log(data);
      }); */
    }
  }, [songs]);

  return (
    <div className="SongListContainer">
      <AISearchTags></AISearchTags>
      <SearchTag
        setSongListSongs={(updatedSongs: Song[] | null) => {
          setSongs(updatedSongs);
        }}
        resetSongsFunction={() => {
          resetSongs();
        }}
      />
      <div className="MusicBoxContainer">
        {songs &&
          songs.map((song, index) => (
            <SongComponent song={song} key={index}></SongComponent>
          ))}
      </div>
    </div>
  );
}
