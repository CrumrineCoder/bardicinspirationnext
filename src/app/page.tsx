'use client';
import MusicBox from "./components/MusicBox";
import { getDBVersion } from "./db";
/*
import Form from "./components/fakeForm";
import UploadForm from "./components/fakeUploadForm";
*/
//import songs from "./fakeDB/songs";

import songData from "./fakeDB/songData";
import tags from "./fakeDB/tags";
import songTags from "./fakeDB/songTags";

import users from "./fakeDB/user";
import tagVotes from "./fakeDB/tagVotes";

import { useState } from "react";
//useEffect
import "./app.scss";

interface User {
  id: number;
  email: string;
  userName: string;
}

export default function Home() {
  //const [currentTag] = useState();
  const [user, setUser] = useState<User | null>(null);
  // To be replaced with JWT? logic for getting the actual user
  /*  const [currentUser, setCurrentUser] = useState<{ id: number; email: string; userName: string } | null>(null);
  useEffect(() => {
    setCurrentUser(users[0]);
  }, []);
  */
  //
  getDBVersion().then(({ version }) => {
    console.log({ version });
  });
  return (
    <>
      
      <button onClick={() => setUser(users[0])}>Login</button>
      <br />
      <button onClick={() => setUser(null)}>Logout</button>
      <br />
      Current User:{""}
      {user && user.userName}
      <div className="MusicBoxContainer">
        {songData.map((song, index) => {
          // This is logic for getting the current tags for the song.

          // to do: can I speed this up by not having to search all of songTags for each song?
          // Get all SongTags (relational map) for currently visible Songs. Will not include songs that are not visible (Deleted songs on initial load)
          const SongTagsIDs = songTags.filter(
            (songTag) => songTag.songId === song.id
          );
          /*
         { id: 1, songId: 1, tagId: 1 },
         { id: 2, songId: 1, tagId: 2 },
         { id: 3, songId: 1, tagId: 3 }
        */
          // Using the SongTags relational map, get all Tag IDs
          const currentSongsTagIDs = SongTagsIDs.map((SongTags) => ({
            tagID: SongTags.tagId,
          }));
          // [ { tagID: 1 }, { tagID: 2 }, { tagID: 3 } ]

          const reducedCurrentTagsIDs = currentSongsTagIDs.map(
            ({ tagID }) => tagID
          );
          // [ 1, 2, 3]
          // [ 1 ]

          const currentTags = tags.filter((taglisting) =>
            reducedCurrentTagsIDs.includes(taglisting.id)
          );
          /*
        [
          { id: 1, name: 'calm' },
          { id: 2, name: 'melancholic' },
          { id: 3, name: 'piano' }
        ]
        */

          // From each TagID, get the name of the Tag.
          // Deprecated: we get the currentTagNames when looping through SongTags
          // const currentTagNames = currentTags.map(({ name }) => name);
          // [ 'calm', 'melancholic', 'piano' ]

          const reducedCurrentSongsTagsIDs = SongTagsIDs.map(({ id }) => id);
          // [ 1, 2, 3 ]
          // [ 4 ] (It always scales up, unlike the tags, because they're all unique IDs. not to say that it will be 1 2 3 4, but to show different answers as compared to tags).

          // Search for tagVotes by the reduced CurrentSongTagsIDs (songTagID). This has the userID.
          const currentTagVotes = tagVotes.filter((tagVote) =>
            reducedCurrentSongsTagsIDs.includes(tagVote.songTag)
          );
          /*
        [
          { id: 1, userID: 1, songTag: 1 },
          { id: 2, userID: 2, songTag: 2 },
          { id: 3, userID: 1, songTag: 3 },
          { id: 4, userID: 3, songTag: 1 },
          { id: 5, userID: 2, songTag: 3 },
          { id: 6, userID: 4, songTag: 2 },
          { id: 7, userID: 3, songTag: 3 },
          { id: 8, userID: 4, songTag: 1 }
        ]
        */
          // Create a mapping of tags to the users who voted for them
          /* 
         [
          { id: 1, name: 'calm' },
          { id: 2, name: 'melancholic' },
          { id: 3, name: 'piano' }
        ]
          Looping over each object in this array
        */
          const tagsWithVoters = currentTags.map((tag) => {
            // { id: 1, name: 'calm' }
            // Find the SongTags entry for this tag
            const songTag = SongTagsIDs.find(
              (songTag) => songTag.tagId === tag.id
            );
            // { id: 1, songId: 1, tagId: 1 }

            // Find all votes for this SongTag
            const voterIDs = currentTagVotes
              .filter((tagVote) => tagVote.songTag === songTag?.id)
              .map((tagVote) => tagVote.userID);

            // Loop over each VoterID, and for each one search for the first user which has the same ID (should only be 1 per the DB, and then return its email)
            const voters = voterIDs
              .map((voter) => users.find((user) => user.id === voter))
              .filter(
                (
                  voter
                ): voter is { id: number; email: string; userName: string } =>
                  voter !== undefined
              );
            /*
            ?.email)
              .filter((email): email is string => email !== undefined);
              */

            // When validating users, I might want to send the whole user instead of just the names unless names are unique (But IDs might be safer? In case a user deletes their account?)
            return {
              tagName: tag.name,
              voters: voters,
            };
          });
          return (
            <div className="song" key={index}>
              <MusicBox
                key={index}
                songName={song.songName}
                link={song.link}
                tags={tagsWithVoters}
                artist={song.artist}
                user={user}
              />
            </div>
          );
        })}
      </div>
    </>
  );
}
