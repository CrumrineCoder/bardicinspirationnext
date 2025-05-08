import { fetchSongsByTagName } from "../queries/fetchData";
import { GeminiTagResultsProps, Song } from "../interfaces";
import { useState } from "react";

// Formatting for each Song to display the YouTube video, songname & artist 
import GeminiSongCard from "./GeminiSongCard";

export default function GeminiTagresults({
  tag,
  reason,
}: GeminiTagResultsProps) {
  // All Songs to be displayed in that row
  const [songs, setSongs] = useState<Song[] | null>();
  // Current song 
  const [songIndex, setSongIndex] = useState<number>(0);
  // Toggle for the [tag] button to show all the songs
  const [showSongs, setShowSongs] = useState<boolean>(false);

  return (
    <div>
      <div className="flex items-center space-x-2 mt-2">
        <button
          onClick={() => {
            if (!showSongs) {
              if (!songs) {
                fetchSongsByTagName(tag.toLowerCase())
                  .then((data) => {
                    setSongs(data);
                    setShowSongs(true);
                  })
                  .catch((error) => {
                    console.error("Error fetching songs:", error);
                  });
              } else {
                setShowSongs(true);
              }
            } else {
              setShowSongs(false);
            }
          }}
          className="SmallButton SmallButtonOnWhite"
        >
          {tag}
        </button>
        <span className="pl-10">{reason}</span>
      </div>
      {songs && showSongs && (
        <>
          <div className="my-2 flex flex-col items-center">
            <span className="text-center">
              Found {songs.length} result{songs.length > 1 && <>s</>}!
            </span>
            {songs.length > 1 && (
                <div className="flex justify-between w-full">
                <button
                  onClick={() => setSongIndex(songIndex - 1)}
                  className={`SmallButton SmallButtonOnWhite ${
                  songIndex !== 0
                    ? "opacity-100"
                    : "opacity-0 pointer-events-none"
                  }`}
                >
                  ...previous
                </button>
                <button
                  onClick={() => setSongIndex(songIndex + 1)}
                  className={`SmallButton SmallButtonOnWhite ${
                  songIndex !== songs.length - 1
                    ? "opacity-100"
                    : "opacity-0 pointer-events-none"
                  }`}
                >
                  Next...
                </button>
                </div>
            )}
          </div>
          <GeminiSongCard song={songs[songIndex]}></GeminiSongCard>
        </>
      )}
    </div>
  );
}
