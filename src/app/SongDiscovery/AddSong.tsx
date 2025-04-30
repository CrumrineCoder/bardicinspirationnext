"use client";
import { addSongToDB } from "../queries/addToDB";
import { useState } from "react";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";

import blankwhiteimage from "../../blank-white-landscape-7sn5o1woonmklx1h.jpg";

// TODO: probably move this to its own component
import YouTube from "react-youtube";

const ytPlayerOptions = {
  playerVars: {
    autoplay: 0,
    controls: 1,
  },
};

export default function AddSong({ onUpdate }: { onUpdate: () => void }) {
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
      addSongToDB(songName, artist, videoID)
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
        setLink(null);
      } catch (error) {
        console.log("Error: " + error);
      }
    } else {
      setShowDisclaimer("YouTube");
    }
  }
  //    <Image src={blankwhiteimage} alt="placeholder" className="w-full opacity-90" />
  return (
    <div className="text-white flex flex-col gap-2 relative">
      <div className="flex">
        {potentialLinks ? (
          <YouTube
            videoId={potentialLinks[potentialLinkIndex]}
            opts={ytPlayerOptions}
          />
        ) : (
          <YouTube
            videoId={"NSlkW1fFkyo"}
            opts={ytPlayerOptions}
            className="opacity-0 pointer-events-none"
          />
        )}
      </div>
      <form
        className="flex flex-col gap-1"
        onSubmit={(e) => {
          e.preventDefault();
          submitForm();
        }}
      >
        <div className="">
          <input
            type="text"
            name="link"
            required
            placeholder="Enter YouTube Link"
            value={link || ""}
            onChange={(e) => setLink(e.target.value)}
            onFocus={() => setShowDisclaimer(null)}
            className="p-2 float-right"
          />
          <input
            type="text"
            name="songName"
            required
            placeholder="Enter Song Name"
            value={songName || ""}
            onChange={(e) => setSongName(e.target.value)}
            onFocus={() => setShowDisclaimer(null)}
            className="p-2 block"
          />
          <input
            type="text"
            name="artist"
            required
            placeholder="Enter Artist Name"
            value={artist || ""}
            onChange={(e) => setArtist(e.target.value)}
            onFocus={() => setShowDisclaimer(null)}
            className="p-2 block"
          />
          <span
            className="text-blue-500 cursor-pointer block"
            onClick={findYouTubeAndSave}
          >
            OR find YouTube link for me
          </span>
        </div>
        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Song
        </button>
      </form>
    </div>
  );
}
