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
          {" "}
          <span className="text-center">Found {songs.length} results!</span>
          {songIndex !== 0 && (
            <button onClick={() => setSongIndex(songIndex - 1)}>
              Previous
            </button>
          )}
          {songIndex !== songs.length-1 && (
            <button onClick={() => setSongIndex(songIndex + 1)}>Next</button>
          )}
          <GeminiSongCard song={songs[songIndex]}></GeminiSongCard>
        </>
      )}
    </div>
  );
}
