"use client";
import React from "react";
import YouTube from "react-youtube";

interface MusicBoxProps {
  songName: string;
  tags: string[] | null;
  link: string;
  artist: string;
  // Probably won't pass down the user like this in the final rendition of project, just for dummy data
  /*
  user: {
    id: number;
    userName: string;
    email: string;
  } | null;
  */ 
}

// The options for the YouTube player
const options = {
  playerVars: {
    autoplay: 1,
    controls: 1,
  },
};

// Will remove user probably? 
function MusicBox ({songName, tags, link, artist}: MusicBoxProps) {
  return (
    <div className="MusicBox">
      <h2 className="MusicBoxHeader">
        {artist} - {songName}
      </h2>
      <div className="youtubeWrapper">
        <YouTube videoId={link} opts={options} />
      </div>
      <div className="tagWrapper">
        {tags && tags.map((tag, index) => (
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

/*
  {user && (
              <button
                onClick={() => {
                  
                }}
              >
                Agree
              </button>
            )}
              */