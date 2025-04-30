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

export default function currentSong({ song }: { song: Song }) {
  const [tags, setTags] = useState<{ tagName: string }[]>([]);
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
  return (
    <div className="text-white flex flex-col gap-2 relative">
      <div className="flex">
        <div>
          <YouTube videoId={song.link} opts={ytPlayerOptions} />
        </div>
      </div>
      <div className="w-full flex flex-col gap-1">
        <h1 className="text-2xl font-bold">{song.songName}</h1>
        <span className="opacity-70">{song.artist}</span>
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
        ></Gemini>
        <AddTagButton onUpdate={() => getTags()} songID={song.id} />
      </div>
    </div>
  );
}
