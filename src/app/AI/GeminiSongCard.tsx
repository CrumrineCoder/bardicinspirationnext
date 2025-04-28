import { Song } from "../interfaces";
import YouTube from "react-youtube";

const ytPlayerOptions = {
  playerVars: {
    autoplay: 0,
    controls: 1,
  },
};

export default function GeminiSongCard({ song }: { song: Song }) {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(`https://www.youtube.com/watch?v=${song.link}`);
  };

  return (
    <div>
      <div className="flex align-top gap-3">
        <YouTube videoId={song.link} opts={ytPlayerOptions} />
        <div className="text-center mb-4">
          <h2 className="text-2xl font-bold">{song.songName}</h2>
          <h4 className="text-lg text-gray-600">{song.artist}</h4>
          <button
            onClick={copyToClipboard}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Copy Link
          </button>
        </div>
      </div>
    </div>
  );
}