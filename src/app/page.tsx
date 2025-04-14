"use client";
import MusicBox from "./components/MusicBox";

//import songs from "./fakeDB/songs";

//import users from "./fakeDB/user";
import songData from "./fakeDB/songData";
import tags from "./fakeDB/tags";
import songTags from "./fakeDB/songTags";

import { useState } from "react";
//useEffect
import "./app.scss";

export default function Home() {
  //const [currentTag] = useState();
  const [currentUser] = useState(null);
  // To be replaced with JWT? logic for getting the actual user
  /*  const [currentUser, setCurrentUser] = useState<{ id: number; email: string; userName: string } | null>(null);
  useEffect(() => {
    setCurrentUser(users[0]);
  }, []);
  */
  //

  return (
    <div className="MusicBoxContainer">
      {songData.map((song, index) => {
        // This is logic for getting the current tags for the song. 

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
        const currentTagNames = currentTags.map(({ name }) => name);
        // [ 'calm', 'melancholic', 'piano' ]

        const reducedCurrentSongsTagsIDs = SongTagsIDs.map(
          ({ id }) => id
        );
        // [ 1, 2, 3 ]
        // [ 4 ]

        return (
          <div className="song" key={index}>
            <MusicBox
              key={index}
              songName={song.songName}
              link={song.link}
              tags={currentTagNames}
              artist={song.artist}
              user={currentUser}
            />
          </div>
        );
      })}
    </div>
  );
}
/*
  
{songs.map((song, index) => (
       
      ))}
      */
