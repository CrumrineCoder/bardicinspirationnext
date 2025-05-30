import { fetchTagsBySongID } from "../queries/fetchData";
import { useState, useEffect } from "react";
import AddTagButton from "./submitTag";
import Gemini from "../AI/requestGemini";

import { Song } from "../interfaces";
/*
  id: number;
  songName: string;
  artist: string;
  link: string;
  version?: string | null;
*/

interface CurrentSongProps {
  song: Song;
  allTags?: string[] | null;
}

// Component which takes a Song's data and formats it to be displayed to the user.
export default function currentSong({ song, allTags }: CurrentSongProps) {
  const [tags, setTags] = useState<{ tagName: string }[]>([]);
  // Waiting state so that we can show "Waiting for Tags" vs "No Tags" for the user
  const [waitingForTags, setWaitingForTags] = useState(true);

  // Handle tooltip for "Link Copied!"
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const copyToClipboard = () => {
    navigator.clipboard.writeText(
      `https://www.youtube.com/watch?v=${song.link}`
    );
    setTooltipVisible(true);

    setTimeout(() => setTooltipVisible(false), 1000);
  };

  // Given a Song ID [parent component is fed an array of them], get the tags to be displayed.
  const getTags = () => {
    fetchTagsBySongID(song.id).then(async (response) => {
      const data = await response;
      setTags(data);
      setWaitingForTags(false);
    });
  };

  // When the song changes, reset everything to default
  useEffect(() => {
    setTags([]);
    getTags();
    setWaitingForTags(true);
  }, [song]);

  return (
    <div className="text-white flex flex-col gap-2 relative">
      <div className="flex">
        <div>
          <iframe
            className="w-3xl aspect-video block"
            src={`https://www.youtube.com/embed/${song.link}`}
            title={song.songName}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
      <div className="w-full flex flex-col gap-1">
        <div className="flex justify-between items-center relative">
          <div>
            <h1 className="text-2xl font-bold inline">{song.songName}</h1>{" "}
            {song.version && (
              <span className="opacity-50 inline">
                [{song.version} version]
              </span>
            )}
            <span className="opacity-70 block">{song.artist}</span>
          </div>
          <div className="relative">
            <button onClick={copyToClipboard} className="SmallButton">
              Copy Link
            </button>
            {tooltipVisible && (
              <div
                id="CopyTooltip"
                className="absolute top-[-25px] left-[0px] transform -translate-x-1/2 bg-gray-800 text-white text-sm px-2 py-1 rounded shadow-lg"
              >
                Link copied!
              </div>
            )}
          </div>
        </div>
        <div className="">
          {waitingForTags ? (
            <p className="italic">Waiting for Tags...</p>
          ) : tags.length > 0 ? (
            tags.map((tag, index) => (
              <span className="p-2" key={index}>
                {tag.tagName}
              </span>
            ))
          ) : (
            <p className="italic">No tags!</p>
          )}
        </div>
        <Gemini
          onUpdate={() => getTags()}
          songID={song.id}
          songName={song.songName}
          artist={song.artist}
          tags={tags.map((tag) => tag.tagName)}
          allTags={allTags}
        ></Gemini>
        <AddTagButton onUpdate={() => getTags()} songID={song.id} />
      </div>
    </div>
  );
}
