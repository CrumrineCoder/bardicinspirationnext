'use client';
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
  const [currentTag, setCurrentTag] = useState(); 
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
        // Get all SongTags (relational map) for currently visible Songs
        const SongTagsIDs = songTags.filter((songTag) => songTag.songId = song.id);
        if(currentTag){
          // Reduce the SongTagIds to only include SongTags with the name of the currentTag
        }
        // Using the SongTags relational map, get all Tag IDs
        
        // From each TagID, get the name of the Tag. 
        console.log(tags);
        return (
          <div className="song" key={index}>
         
          </div>
        );
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