"use client";

import { useEffect, useState } from "react";
import { fetchAllSongs, fetchTagsByID, fetchSongTagsByID,   fetchUsersByID, fetchTagVotesByID } from "../queries/fetchData"

export default function SongList({ refresh }: { refresh: boolean }) {
  const [songs, setSongs] = useState<{id: number, artist: string, songName: string, link: string}[]>();

  useEffect(() => {
    fetchAllSongs().then(async (response) => {
      const data = await response;
      console.log(data);
      setSongs(data);
    });
  }, [refresh]);

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

      fetchTagsByID(1).then((data) => {
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