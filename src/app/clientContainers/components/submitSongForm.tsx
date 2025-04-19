"use client";
import { addSongToDB } from "../../queries/addToDB";
import { useState } from "react";

// TODO: probably move this to its own component
import YouTube from "react-youtube";

const ytPlayerOptions = {
  playerVars: {
    autoplay: 0,
    controls: 1,
  },
  width: 335,
};

export default function SubmitSongForm({ onUpdate }: { onUpdate: () => void }) {
  const [songName, setSongName] = useState<string | null>(null);
  const [artist, setArtist] = useState<string | null>(null);
  const [link, setLink] = useState<string | null>(null);
  const [potentialLinks, setPotentialLinks] = useState<string[] | null>(null);
  const [showDisclaimer, setShowDisclaimer] = useState<string | null>(null);
  const [potentialLinkIndex, setPotentialLinkIndex] = useState<number>(0);

  function resetVal() {
    setSongName(null);
    setArtist(null);
    setLink(null);
    setPotentialLinks(null);
    setShowDisclaimer(null);
    setPotentialLinkIndex(0);
  }
  function submitForm() {
    if (artist && songName && link) {
      addSongToDB(songName, artist, link)
        .then(() => {
          onUpdate();
          resetVal();
        })
        .catch((error) => {
          setShowDisclaimer("Unique SongTag");
        });
    }
  }
  async function findYouTubeAndSave() {
    if (songName && artist) {
      try {
        const response = await fetch(
          `/api/getYoutube?songName=${encodeURIComponent(
            songName
          )}&artist=${encodeURIComponent(artist)}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        setPotentialLinks(data.videoIDs);
        setLink(null);
      } catch (error) {
        console.log("Error: " + error);
      }
    } else {
      setShowDisclaimer("YouTube");
    }
  }
  return (
    <div className="SubmitFormJumbo">
      <form
        className="SubmitFormContainer"
        onSubmit={(e) => {
          e.preventDefault();
          submitForm();
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
            onFocus={() => setShowDisclaimer(null)}
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
            onFocus={() => setShowDisclaimer(null)}
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
            onFocus={() => setShowDisclaimer(null)}
          />
          <span className="YouTubeFindButton" onClick={findYouTubeAndSave}>
            OR find it for me
          </span>
        </div>
        <div className="YouTubeSearchToolTips">
            {showDisclaimer && showDisclaimer === "YouTube" ? (
            <div className="YouTubeDisclaimer">
              Please enter a Song Name and Artist!
            </div>
            ) : showDisclaimer === "Unique SongTag" ? (
            <div className="YouTubeDisclaimer">
              That Song is already in the database! Sorry, slowpoke.
            </div>
            ) : null}
          {!link && potentialLinks != null && potentialLinks.length > 0 && (
            <div className="YouTubeSuggestionsContainer">
              <div className="YouTubeSuggestionsControls">
                <span
                  className="YouTubePreviousButton"
                  style={{
                    opacity: potentialLinkIndex > 0 ? 1 : 0,
                    pointerEvents: potentialLinkIndex > 0 ? "auto" : "none",
                  }}
                  onClick={() => {
                    if (potentialLinkIndex > 0) {
                      setPotentialLinkIndex(potentialLinkIndex - 1);
                    }
                  }}
                >
                  ...previouS
                </span>
                <span
                  onClick={() => {
                    setLink(potentialLinks[potentialLinkIndex]);
                  }}
                  className="YouTubeConfirmButton"
                >
                  Use this one!
                </span>
                <span
                  className="YouTubeNextButton"
                  style={{
                    opacity:
                      potentialLinkIndex < potentialLinks.length - 1 ? 1 : 0,
                    pointerEvents:
                      potentialLinkIndex < potentialLinks.length - 1
                        ? "auto"
                        : "none",
                  }}
                  onClick={() => {
                    if (potentialLinkIndex < potentialLinks.length - 1) {
                      setPotentialLinkIndex(potentialLinkIndex + 1);
                    }
                  }}
                >
                  Next...
                </span>
              </div>
              <YouTube
                className="YouTubeIframe"
                videoId={potentialLinks[potentialLinkIndex]}
                opts={ytPlayerOptions}
              />
            </div>
          )}
        </div>
        <span onClick={() => resetVal()} className="resetButton">
          Reset
        </span>
        <button type="submit">Add Song</button>
      </form>
    </div>
  );
}
