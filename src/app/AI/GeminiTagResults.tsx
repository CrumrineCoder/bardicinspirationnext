import { fetchSongsByTagName } from "../queries/fetchData";
import { GeminiTagResultsProps, Song } from "../interfaces";
import { useState } from "react";
import GeminiSongCard from "./GeminiSongCard";

export default function GeminiTagresults({
  tag,
  reason,
}: GeminiTagResultsProps) {
  const [songs, setSongs] = useState<Song[] | null>();
  const [songIndex, setSongIndex] = useState<number>(0);

  return (
    <div>
      <div className="flex items-center space-x-2 mt-2">
        <button
          onClick={() => {
            fetchSongsByTagName(tag.toLowerCase())
              .then((data) => {
                setSongs(data);
              })
              .catch((error) => {});
          }}
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          {tag}
        </button>
        <span className="pl-10">{reason}</span>
      </div>
      {songs && (
        <>
          <div className="my-2 flex flex-col items-center">
            <span className="text-center">
              Found {songs.length} result{songs.length > 1 && <>s</>}!
            </span>
            {songs.length > 1 && (
              <div className="flex space-x-4">
                <br />
                <button
                  onClick={() => setSongIndex(songIndex - 1)}
                  className={`${
                    songIndex !== 0
                      ? "opacity-100"
                      : "opacity-0 pointer-events-none"
                  }`}
                >
                  Previous
                </button>
                <button
                  onClick={() => setSongIndex(songIndex + 1)}
                  className={`${
                    songIndex !== songs.length - 1
                      ? "opacity-100"
                      : "opacity-0 pointer-events-none"
                  }`}
                >
                  Next
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
