"use client";
import { addSongToDB } from "../../queries/addToDB";
import { useState } from "react";

export default function SubmitSongForm({ onUpdate }: { onUpdate: () => void }) {
  const [songName, setSongName] = useState<string | null>(null);
  const [artist, setArtist] = useState<string | null>(null);
  const [link, setLink] = useState<string | null>(null);

  const [showDisclaimer, setShowDisclaimer] = useState<boolean>(false);

  async function findYouTubeAndSave(){
    if(songName && artist){
      try {
        const response = await fetch(`/api/getYoutube?songName=${encodeURIComponent(songName)}&artist=${encodeURIComponent(artist)}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        setLink(data.firstVideoID);
      } catch (error){
        console.log("Error: " + error);
      }
    } else{
      setShowDisclaimer(true);
    }
  }
  return (
    <div className="SubmitFormJumbo">
      <form
        className="SubmitFormContainer"
        onSubmit={(e) => {
          e.preventDefault();
          if (artist && songName && link) {
            addSongToDB(songName, artist, link);
            onUpdate();
            setSongName(null);
            setArtist(null);
            setLink(null);
          }
        }}
      >
        <div className="formInputContainer">
          <label htmlFor="songName"></label>
          <input
            type="text"
            name="songName"
            required
            placeholder="Enter Song Name"
            value={songName || ""}
            onChange={(e) => setSongName(e.target.value)}
            onFocus={() => setShowDisclaimer(false)}
          />
        </div>
        <div className="formInputContainer">
          <label htmlFor="artist"></label>
          <input
            type="text"
            name="artist"
            required
            placeholder="Enter Artist Name"
            value={artist || ""}
            onChange={(e) => setArtist(e.target.value)}
            onFocus={() => setShowDisclaimer(false)}  
          />
        </div>
        <div className="formInputContainer">
          <label htmlFor="link"></label>
          <input
            type="text"
            name="link"
            required
            placeholder="Enter YouTube Link"
            value={link || ""}
            onChange={(e) => setLink(e.target.value)}
          />
           <span className="YouTubeFindButton" onClick={findYouTubeAndSave}>OR find it for me</span>
        </div>
        <div className="YouTubeSearchToolTips">
          {showDisclaimer && <div className="YouTubeDisclaimer">Please enter a Song Name and Artist!</div>}
        </div>
       
        <button type="submit">Add Song</button>
      </form>
   
    </div>
  );
}
