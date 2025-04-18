"use client";
import { addSongToDB } from "../../queries/addToDB";
import { useState } from "react";

export default function SubmitSongForm({ onUpdate }: { onUpdate: () => void }) {
  const [songName, setSongName] = useState<string | null>(null);
  const [artist, setArtist] = useState<string | null>(null);
  const [link, setLink] = useState<string | null>(null);

  return (
    <form
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
        <label htmlFor="songName">Enter Song Name: </label>
        <input
          type="text"
          name="songName"
          required
          value={songName || ""}
          onChange={(e) => setSongName(e.target.value)}
        />
      </div>
      <div className="formInputContainer">
        <label htmlFor="artist">Enter Artist Name: </label>
        <input
          type="text"
          name="artist"
          required
          value={artist || ""}
          onChange={(e) => setArtist(e.target.value)}
        />
      </div>
      <div className="formInputContainer">
        <label htmlFor="link">Enter Song Link: </label>
        <input
          type="text"
          name="link"
          required
          value={link || ""}
          onChange={(e) => setLink(e.target.value)}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}
