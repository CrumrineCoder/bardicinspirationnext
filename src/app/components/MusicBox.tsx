"use client";
import React from "react";
import YouTube from "react-youtube";

interface MusicBoxProps {
  songName: string;
  tags: string[];
  link: string;
  artist: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
  setUser: React.Dispatch<React.SetStateAction<{
    id: number;
    name: string;
    email: string;
  }>>;
}

const options = {
  playerVars: {
    autoplay: 1,
    controls: 1,
  },
};

const MusicBox: React.FC<MusicBoxProps> = ({
  songName,
  tags,
  link,
  artist,
}) => {
  return (
    <div className="MusicBox">
      <h2 className="MusicBoxHeader">
        {artist} - {songName}
      </h2>
      <div className="youtubeWrapper">
        <YouTube videoId={link} opts={options} />
      </div>
      <div className="tagWrapper">
        {tags.map((tag, index) => (
          <span className="tag" key={index}>
            {tag}
          </span>
        ))}
      </div>
      <input></input>
    </div>
  );
};

export default MusicBox;
