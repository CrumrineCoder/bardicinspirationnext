import YouTube from "react-youtube";
import { Song } from "../interfaces";
import { fetchTagsBySongID } from "../queries/fetchData";
import { useState, useEffect } from "react";
import AddTagButton from "../clientContainers/components/submitTag";
import Gemini from "../AI/requestGemini";

const ytPlayerOptions = {
  playerVars: {
    autoplay: 0,
    controls: 1,
  },
};

interface CurrentSongProps {
  song: Song;
  allTags?: string[] | null;
}

export default function currentSong({ song, allTags }: CurrentSongProps) {
  const [tags, setTags] = useState<{ tagName: string }[]>([]);
  const [tooltipVisible, setTooltipVisible] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(
      `https://www.youtube.com/watch?v=${song.link}`
    );
    setTooltipVisible(true);

    setTimeout(() => setTooltipVisible(false), 1000);
  };

  const getTags = () => {
    fetchTagsBySongID(song.id).then(async (response) => {
      const data = await response;
      setTags(data);
    });
  };

  useEffect(() => {
    setTags([]);
    getTags();
  }, [song]);
  /*
      <iframe
            className="w-full aspect-video block"
            src={`https://www.youtube.com/embed/${song.link}`}
            title={song.songName}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>

            <YouTube videoId={song.link} opts={ytPlayerOptions} />
          */
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
            <h1 className="text-2xl font-bold">{song.songName}</h1>
            <span className="opacity-70">{song.artist}</span>
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
          {tags.length > 0 ? (
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
