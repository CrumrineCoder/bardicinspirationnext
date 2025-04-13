'use client';
import MusicBox from "./components/MusicBox";
import songs from "./fakeDB/songs";
import users from "./fakeDB/user";
import { useState, useEffect } from "react";

import "./app.scss";


export default function Home() {
  // To be replaced with JWT? logic for getting the actual user 
  const [currentUser, setCurrentUser] = useState<{ id: number; email: string; userName: string } | null>(null);
  useEffect(() => {
    setCurrentUser(users[0]);
  }, []);
  //
  
  return (
    <div className="MusicBoxContainer">
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
    </div>
  );
}
