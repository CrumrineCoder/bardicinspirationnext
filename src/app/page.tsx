import MusicBox from "./components/MusicBox";
import songs from "./fakeDB/songs";

export default function Home() {
  return (
    <div>
      {songs.map((song, index) => (
        <MusicBox
          key={index}
          songName={song.songName}
          tags={song.tags}
        />
      ))}
    </div>
  );
}
