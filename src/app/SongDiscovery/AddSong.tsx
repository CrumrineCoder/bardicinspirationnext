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

  return (
    <div className="text-white">
      TESTING
      <AspectRatio ratio={16 / 9}>
        <Image src={blankwhiteimage} alt="placeholder"></Image>
      </AspectRatio>
    </div>
  );
}
