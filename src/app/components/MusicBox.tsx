"use client";
import React from "react";
import YouTube from "react-youtube";

interface MusicBoxProps {
  songName: string;
  tags: string[];
  link: string;
}

const options = {
    height: '390',
    width: '640',
    playerVars: {
      autoplay: 1,
      controls: 1,
    },
  };

const MusicBox: React.FC<MusicBoxProps> = ({ songName, tags, link }) => {
  return (
    <div className="MusicBox">
      <h2 className="MusicBoxHeader">{songName}</h2>
      <YouTube videoId={link} opts={options} />
      {tags.map((tag, index) => (
        <span key={index}>
          {tag}
        </span>
      ))}
    </div>
  );
};

export default MusicBox;
