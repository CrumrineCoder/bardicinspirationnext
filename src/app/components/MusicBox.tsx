import React from "react";

interface MusicBoxProps {
  songName: string;
  tags: string[];
}

const MusicBox: React.FC<MusicBoxProps> = ({ songName, tags }) => {
  return (
    <div>
      <h2>{songName}</h2>
      {tags.map((tag, index) => (
        <span key={index}>
          {tag}
        </span>
      ))}
    </div>
  );
};

export default MusicBox;
