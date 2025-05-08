"use client";
import { addSongToDB } from "../queries/addToDB";
import { useState } from "react";

// TODO: probably move this to its own component
import YouTube from "react-youtube";

const ytPlayerOptions = {
  playerVars: {
    autoplay: 0,
    controls: 1,
  },
};

// Form that handles user submission of songs into the database
export default function AddSong({ onUpdate }: { onUpdate: () => void }) {
  const [songName, setSongName] = useState<string | null>(null);
  const [artist, setArtist] = useState<string | null>(null);
  const [link, setLink] = useState<string | null>(null);
  const [version, setVersion] = useState<string | null>(null);
  // List of YouTube IDs
  const [potentialLinks, setPotentialLinks] = useState<string[] | null>(null);
  const [potentialLinkIndex, setPotentialLinkIndex] = useState<number>(0);

  const [showDisclaimer, setShowDisclaimer] = useState<string | null>(null);

  function resetVal() {
    setSongName(null);
    setArtist(null);
    setLink(null);
    setPotentialLinks(null);
    setShowDisclaimer(null);
    setVersion(null);
    setPotentialLinkIndex(0);
  }

  function submitForm() {
    if (artist && songName && link) {
      //   const validURL = await getYoutube(link);
      const videoIDRegex =
        /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
      const match = link.match(videoIDRegex);
      let videoID;
      if (match && match[1]) {
        videoID = match[1];
      } else {
        setShowDisclaimer("Invalid YouTube URL");
        return;
      }
      addSongToDB(songName, artist, videoID, version)
        .then(() => {
          // Update the parent and reset current component
          onUpdate();
          resetVal();
        })
        .catch((error) => {
          setShowDisclaimer("Unique SongTag");
        });
    }
  }
  // Find the Top 5 YouTubeIDs for the current songName and Artist
  async function findYouTubeAndSave() {
    if (songName && artist) {
      try {
        const response = await fetch(
          `/api/findYouTubeURL?songName=${encodeURIComponent(
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
        // Reset link because we'll be adding a new one from the potential link carousel
        setLink(null);
      } catch (error) {
        console.log("Error: " + error);
      }
    } else {
      setShowDisclaimer("YouTube");
    }
  }
  //    <Image src={blankwhiteimage} alt="placeholder" className="w-full opacity-90" />
  // We're not using React-Youtube because it doesn't refresh properly if the user navigates from the Home Page. So we'll just use the actual iframe.
  return (
    <div className="text-white flex flex-col gap-2 relative">
      <div className="flex">
        {!link && potentialLinks != null && potentialLinks.length > 0 ? (
          <div className="flex flex-col w-full">
            <iframe
              className="w-3xl aspect-video block"
              src={`https://www.youtube.com/embed/${potentialLinks[potentialLinkIndex]}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <div className="flex justify-between mt-2">
              <span
                className="SmallButton"
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
                  setLink(
                    "https://www.youtube.com/watch?v=" +
                      potentialLinks[potentialLinkIndex]
                  );
                }}
                className="SmallButton"
              >
                Use this one!
              </span>
              <span
                className="SmallButton"
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
          </div>
        ) : (
          <iframe
            className="w-3xl aspect-video block opacity-0 pointer-events-none"
            src={`https://www.youtube.com/embed/NSlkW1fFkyo`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        )}
      </div>
      <form
        className="flex flex-col gap-1"
        onSubmit={(e) => {
          e.preventDefault();
          submitForm();
        }}
      >
        <div className="text-sm">
          <input
            type="text"
            name="link"
            required
            placeholder="Enter YouTube Link"
            value={link || ""}
            onChange={(e) => setLink(e.target.value)}
            onFocus={() => setShowDisclaimer(null)}
            className="p-2 float-right text-sm border border-gray-300 rounded"
          />
          <input
            type="text"
            name="songName"
            required
            placeholder="Enter Song Name"
            value={songName || ""}
            onChange={(e) => setSongName(e.target.value)}
            onFocus={() => setShowDisclaimer(null)}
            className="p-2 block text-sm border border-gray-300 rounded mb-2"
          />
          <input
            type="text"
            name="artist"
            required
            placeholder="Enter Artist Name"
            value={artist || ""}
            onChange={(e) => setArtist(e.target.value)}
            onFocus={() => setShowDisclaimer(null)}
            className="p-2 block text-sm border border-gray-300 rounded mb-2"
          />
          <span
            className="text-blue-500 cursor-pointer block text-sm mb-4"
            onClick={findYouTubeAndSave}
          >
            Find YouTube link for me
          </span>
          <input
            type="text"
            name="version"
            placeholder="OPTIONAL: version, eg. remix/language"
            value={version || ""}
            onChange={(e) => setVersion(e.target.value)}
            onFocus={() => setShowDisclaimer(null)}
            className="p-2 block text-xs w-1/2 border border-gray-300 rounded"
          />
        </div>
        <button type="submit" className="SmallButton self-center mt-2">
          Add Song
        </button>
      </form>
    </div>
  );
}
