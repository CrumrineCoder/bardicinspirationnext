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
    getTags();
  }, []);
  return (
    <div className="text-white flex flex-col gap-2">
      <div className="flex">
        <div>
          <YouTube videoId={song.link} opts={ytPlayerOptions} />
        </div>
      </div>
      <div className="w-full flex flex-col gap-2">
        <h2 className="">
          <p>{song.songName} </p>
          <p>{song.artist} </p>
        </h2>
        <div className="">
          {tags.length > 0 ? (
            tags.map((tag, index) => (
              <span className="p-2" key={index}>
                {tag.tagName}
              </span>
            ))
          ) : (
            <p>No tags!</p>
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
