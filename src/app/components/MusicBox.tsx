"use client";
import React from "react";
import YouTube from "react-youtube";

interface MusicBoxProps {
    songName: string;
    tags: string[];
    link: string;
    artist: string;
}

const options = {
    playerVars: {
        autoplay: 1,
        controls: 1,
    },
};

const MusicBox: React.FC<MusicBoxProps> = ({ songName, tags, link, artist }) => {
    return (
        <div className="MusicBox">
            <h2 className="MusicBoxHeader">{artist} - {songName}</h2>
            <div className="youtubeWrapper">
                <YouTube videoId={link} opts={options} />
            </div>
            {tags.map((tag, index) => (
                <span key={index}>
                    {tag}
                </span>
            ))}
        </div>
    );
};

export default MusicBox;
