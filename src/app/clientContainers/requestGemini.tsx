import { useState } from "react";
import { addTagToDB } from "../queries/addToDB";

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

  async function submitAITag(tagName: string) {
    if (tagName) {
      try {
        await addTagToDB(tagName.toLowerCase(), songID);
        onUpdate(); 
      } catch (error: unknown) {
        console.error("Error adding tag to database:", error);
      }
    }
  }

  return (
    <div className="AITags">
      {AITags ? (
        <div className="AITagButtonContainer">
          {AITags.map((AITag, index) => (
            <button
              style={{ color: "white" }}
              key={index}
              className="AITagButton"
              onClick={() => submitAITag(AITag)}
            >
              {AITag}
            </button>
          ))}
          <p className="AITagDisclaimer">Click on a Tag to add it!</p>
        </div>
      ) : (
        <button className="geminiButton" onClick={() => requestGeminiAPI()}>
          AI Suggested Tags
        </button>
      )}
    </div>
  );
}
