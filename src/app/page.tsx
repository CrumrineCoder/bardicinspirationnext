"use client";
//import MusicBox from "./components/MusicBox";

//import songs from "./fakeDB/songs";

//import users from "./fakeDB/user";
import songData from "./fakeDB/songData";
import tags from "./fakeDB/tags";
import songTags from "./fakeDB/songTags";

import { useState } from "react";
//useEffect
import "./app.scss";

export default function Home() {
  const [currentTag] = useState();
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
        // Get all SongTags (relational map) for currently visible Songs. Will not include songs that are not visible (Deleted songs on initial load)
        const SongTagsIDs = songTags.filter(
          (songTag) => songTag.songId === song.id
        );
        console.log("SongTags");
        console.log(SongTagsIDs);

        // Using the SongTags relational map, get all Tag IDs
        const currentSongsTagIDs = SongTagsIDs.map((SongTags) => ({
          tagID: SongTags.tagId,
        }));

        console.log("currentSongsTagIDs");
        console.log(currentSongsTagIDs);

        const reducedCurrentSongsTagsIDs = currentSongsTagIDs.map(
          ({ tagID }) => tagID
        );

        console.log("reducedCurrentSongsTagsIDs");
        console.log(reducedCurrentSongsTagsIDs);

        const currentTags = tags.filter((taglisting) =>
          reducedCurrentSongsTagsIDs.includes(taglisting.id)
        );

        const currentTagNames = currentTags.map(({name}) => name)

        if (currentTag) {
          // Reduce the SongTagIds to only include SongTags with the name of the currentTag
        }
        //We can just move on if there's no tag
        // From each TagID, get the name of the Tag.

        return <div className="song" key={index}>
          {currentTagNames}
        </div>;
      })}
    </div>
  );
}
/*
   {song.songName}
 {tags.map((tag, tagIndex) => (
              <span className="tag" key={tagIndex}>
                {tag}
              </span>
            ))}
{songs.map((song, index) => (
        <MusicBox
          key={index}
          songName={song.songName}
          tags={song.tags}
          link={song.link}
          artist={song.artist}
          user={currentUser}
        />
      ))}
      */
