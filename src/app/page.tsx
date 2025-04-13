import MusicBox from "./components/MusicBox";
import songs from "./fakeDB/songs";
import { useState } from "react";

import "./app.scss";

export default function Home() {
  const [dummyUser, setDummyUser] = useState({
    id: 1,
    name: "John Doe",
    email: "johndoe@example.com",
  });
  return (
    <div className="MusicBoxContainer">
      {songs.map((song, index) => (
        <MusicBox
          key={index}
          songName={song.songName}
          tags={song.tags}
          link={song.link}
          artist={song.artist}
          user={dummyUser}
          setUser={setDummyUser}
        />
      ))}
    </div>
  );
}
