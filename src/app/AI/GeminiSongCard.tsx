import { Song } from "../interfaces";
import YouTube from "react-youtube";
import { useState } from "react";

const ytPlayerOptions = {
  playerVars: {
    autoplay: 0,
    controls: 1,
  },
};

export default function GeminiSongCard({ song }: { song: Song }) {
  const [tooltipVisible, setTooltipVisible] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(
      `https://www.youtube.com/watch?v=${song.link}`
    );
    setTooltipVisible(true);

    setTimeout(() => setTooltipVisible(false), 1000);
  };

  return (
    <div>
      <div className="flex align-top gap-3">
        <YouTube videoId={song.link} opts={ytPlayerOptions} />
        <div className="text-center mb-4 relative">
          <button
            onClick={copyToClipboard}
            className="SmallButton SmallButtonOnWhite"
          >
            Copy Link
          </button>
          {tooltipVisible && (
            <div id="CopyTooltip" className="absolute top-[-25px] left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-sm px-2 py-1 rounded shadow-lg">
              Link copied!
            </div>
          )}
          <h2 className="text-2xl font-bold">{song.songName}</h2>
          <h4 className="text-lg text-gray-600">{song.artist}</h4>
        </div>
      </div>
    </div>
  );
}
