import YouTube from "react-youtube";
import { Song } from "../interfaces";

const ytPlayerOptions = {
  playerVars: {
    autoplay: 0,
    controls: 1,
  },
};

export default function CurrentSong({ song }: { song: Song }) {
  return (
    <div className="text-white">
      {song.songName}
      <YouTube videoId={song.link} opts={ytPlayerOptions} />
    </div>
  );
}
