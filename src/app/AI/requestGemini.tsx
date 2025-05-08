import { useState } from "react";
import { addTagToDB } from "../queries/addToDB";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

// Used in the Song Discovery tab for retrieving and displaying tag results parsed by AI
export default function requestGemini({
  onUpdate,
  songID,
  songName,
  artist,
  tags,
  allTags
}: {
  onUpdate: () => void;
  songID: number;
  songName: string;
  artist: string;
  tags: string[];
  allTags?: string[] | null;
}) {
  // The AI will be returning a list of strings, without identifiers because the AI might suggest new tags. We could be storing them by Tags, but the AI is also prompted to add a few new tags so it'd be more work to sort them by existing tags and new tags which is unreliable. 
  const [AITags, setAITags] = useState<string[] | null>(null);

  // Everytime the song (songid) changes, we need to wipe this component
  useEffect(() => {
    setAITags(null);
  }, [songID]);

  // Get AI-suggested tags via API
  async function requestGeminiAPI() {
    const response = await fetch(
      `/api/requestGemini?songName=${encodeURIComponent(
      songName
      )}&artist=${encodeURIComponent(artist)}&tags=${encodeURIComponent(
      tags.join(",")
      )}&allTags=${encodeURIComponent(allTags?.join(",") || "")}`,
      {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      }
    );
    if (response.ok) {
      const data = await response.json();
      setAITags(data);
    } else {
      console.error("Failed to fetch:", response.status, response.statusText);
    }
  }

  // Functionality for when the user clicks on an AI-suggested tag to add to the DB
  async function submitAITag(tagName: string, index: number) {
    if (tagName && AITags) {
      try {
        await addTagToDB(tagName.toLowerCase(), songID);
        // Remove AI tag from list of AI suggestions
        let newArray = AITags;
        delete newArray[index];
        setAITags(newArray);
        // Refreshes the parent component
        onUpdate();
      } catch (error: unknown) {
        console.error("Error adding tag to database:", error);
      }
    }
  }

  // For each AI tag, we'll create a small component that will allow the user to add that tag, or if there's no AI tags the user will be prompted to start the API call
  return (
    <div className="mt-2">
      {AITags ? (
        <div>
          {AITags.map((AITag, index) => (
            <button
              className="ClickableInlineEntry px-2"
              key={index}
              onClick={() => submitAITag(AITag, index)}
            >
              {AITag}
            </button>
          ))}
          <p className="py-2">Click on a Tag to add it!</p>
        </div>
      ) : (
        <button onClick={() => requestGeminiAPI()} className="SmallButton py-2">
          AI Suggested Tags
        </button>
      )}
    </div>
  );
}
