import { fetchSongsByTagName } from "../queries/fetchData";
import { GeminiTagResultsProps, Song } from "../interfaces";
import { useState } from "react";

export default function GeminiTagresults({
  tag,
  reason,
}: GeminiTagResultsProps) {
  const [songs, setSongs] = useState<Song[] | null>();

  return (
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
      {songs && songs.map((song, index) => (
        <div key={index}>{song.songName}</div>
      ))}
    </div>
  );
}
