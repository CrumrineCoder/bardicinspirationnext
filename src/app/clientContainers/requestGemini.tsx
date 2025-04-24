import { useState } from "react";

export default function requestGemini({
  songName,
  artist,
  tags,
}: {
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
  return (
    <div className="AITags">
      {AITags ? (
        <div className="AITagButtonContainer">
          {AITags.map((AITag, index) => (
            <button
              style={{ color: "white" }}
              key={index}
              className="AITagButton"
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
