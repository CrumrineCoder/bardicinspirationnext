import { useState } from "react";
import { fetchAllTags } from "../../queries/fetchData";

export default function AISearchTags() {
  const [userInput, setUserInput] = useState<string>(
    "Add your session notes here!"
  );
  const [AIResponse, setAIResponse] = useState<string | null>(null);

  const handleInput = (e: React.FormEvent<HTMLQuoteElement>) => {
    setUserInput(e.currentTarget.textContent || "");
  };

  async function queryAI() {
    fetchAllTags().then(async (response) => {
      const data = await response;
      if (data) {
        const mappedData = data.map((tag: { tagName: string }) => {
          return tag.tagName;
        });
        const joinedTags = mappedData.join(",");
        const response = await fetch(
          `/api/geminiSuggestTags?sessionNotes=${encodeURIComponent(
            userInput
          )}&allTags=${encodeURIComponent(joinedTags)}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.ok) {
          const data = await response.text();
          setAIResponse(data);
        }
      }
    });
  }

  // Ask AI to parse user input and match it to tags
  return (
    <div className="AISearchTagsContainer">
      <blockquote
        className="AISearchTagsInput"
        contentEditable="true"
        onInput={(e) => {
          handleInput(e);
        }}
      ></blockquote>
      <button
        onClick={() => {
          queryAI();
        }}
      >
        Ask AI!
      </button>
      {AIResponse && <div>{AIResponse}</div>}
    </div>
  );
}
