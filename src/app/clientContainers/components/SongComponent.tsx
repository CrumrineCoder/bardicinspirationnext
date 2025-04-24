import AddTagButton from "./submitTag";

import { Song, Tag } from "../../interfaces";
import { useEffect, useState } from "react";
import { fetchTagsBySongID } from "../../queries/fetchData";
import YouTube from "react-youtube";
import Gemini from "../requestGemini";

const ytPlayerOptions = {
  playerVars: {
    autoplay: 0,
    controls: 1,
  },
};

export default function SongComponent({ song }: { song: Song }) {
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
    <div className="MusicBox">
      <div className="MusicBoxSongContainer">

        <h2 className="MusicBoxHeader">
          <p>{song.songName} </p>
          <p>{song.artist} </p>
        </h2>
        <div className="youtubeWrapper">
          <YouTube videoId={song.link} opts={ytPlayerOptions} />
        </div>
      </div>
      <div className="tagFormWrapper">
        <div className="allTags">
          {tags.length > 0 ? (
            tags.map((tag, index) => (
              <div className="tag" key={index}>
                {tag.tagName}
              </div>
            ))
          ) : (
            <p className="tagDisclaimer">No tags!</p>
          )}
        </div>
        <Gemini songName={song.songName} artist={song.artist} tags={tags.map(tag => tag.tagName)}></Gemini>
        <AddTagButton onUpdate={() => getTags()} songID={song.id} />
      </div>
    </div>
  );
}
