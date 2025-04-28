import { useState } from "react";
import { fetchAllTags } from "../queries/fetchData";
import { Textarea } from "@/components/ui/textarea";

export default function GeminiSessionNotes() {
  const [userInput, setUserInput] = useState<string>(
    "Add your session notes here!"
  );
  const [AIResponse, setAIResponse] = useState<string | null>(null);

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUserInput(e.target.value);
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

  return (
    <div className="AISearchTagsContainer w-[60vw]">
      <Textarea
      className="AISearchTagsInput mt-10"
      value={userInput}
      onChange={handleInput}
      placeholder="Add your session notes here!"
      />
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={() => {
          queryAI();
        }}
      >
        Ask AI!
      </button>
      {AIResponse && (
        <div className="mt-4 w-[100%] break-words bg-gray-100 p-2 rounded">
          {AIResponse}
        </div>
      )}
    </div>
  );
}
