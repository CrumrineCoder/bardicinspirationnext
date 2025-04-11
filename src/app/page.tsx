import MusicBox from "./components/MusicBox";
import songs from "./fakeDB/songs";

import "./app.scss";

export default function Home() {
  return (
    <div className="MusicBoxContainer">
      {songs.map((song, index) => (
        <MusicBox
          key={index}
          songName={song.songName}
          tags={song.tags}
          link={song.link}
        />
      ))}
    </div>
  );
}
