import React from "react";

interface MusicBoxProps {
    songName: string;
    tags: string[];
    link: string;
}

const MusicBox: React.FC<MusicBoxProps> = ({ songName, tags, link }) => {
    return (
        <div className="MusicBox">
            <h2 className="MusicBoxHeader">{songName}</h2>
            
            <div className="MusicBoxVideo">
                <iframe
                    width="560"
                    height="315"
                    src={link}
                    title={songName}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            </div>
            
            <div className="MusicBoxTags">
                {tags.map((tag, index) => (
                    <span key={index} className="MusicBoxTag">
                        {tag}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default MusicBox;
