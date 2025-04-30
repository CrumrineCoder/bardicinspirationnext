import { useState } from "react";
import { addTagToDB } from "../queries/addToDB";
import { Button } from "@/components/ui/button";

export default function requestGemini({
  onUpdate,
  songID,
  songName,
  artist,
  tags,
}: {
  onUpdate: () => void;
  songID: number;
  songName: string;
  artist: string;
  tags: string[];
}) {
  const [AITags, setAITags] = useState<string[] | null>(null);
  async function requestGeminiAPI() {
    const response = await fetch(
      `/api/requestGemini?songName=${encodeURIComponent(
        songName
      )}&artist=${encodeURIComponent(artist)}&tags=${encodeURIComponent(
        tags.join(",")
      )}`,
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

  async function submitAITag(tagName: string, index: number) {
    if (tagName && AITags) {
      try {
        await addTagToDB(tagName.toLowerCase(), songID);
        let newArray = AITags;
        delete newArray[index];
        setAITags(newArray);
        onUpdate();
      } catch (error: unknown) {
        console.error("Error adding tag to database:", error);
      }
    }
  }

  return (
    <div>
      {AITags ? (
        <div>
          {AITags.map((AITag, index) => (
            <button className="AITagSuggestion px-2" key={index} onClick={() => submitAITag(AITag, index)}>
              {AITag}
            </button>
          ))}
          <p className="py-2">Click on a Tag to add it!</p>
        </div>
      ) : (
        <button 
          onClick={() => requestGeminiAPI()} 
          className="SmallButton py-2"
        >
          AI Suggested Tags
        </button>
      )}
    </div>
  );
}
