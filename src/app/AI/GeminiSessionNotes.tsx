import { useState } from "react";
import { fetchAllTags } from "../queries/fetchData";
import { Textarea } from "@/components/ui/textarea";
import GeminiTagresults from "./GeminiTagResults";
import { GeminiTagResultsProps } from "../interfaces";

export default function GeminiSessionNotes() {
  const [userInput, setUserInput] = useState<string>(
    "Add your session notes here!"
  );
  const [AIResponse, setAIResponse] = useState<GeminiTagResultsProps[] | null>(
    null
  );

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
        if (await response.ok) {
          const data = await response.json();
          setAIResponse(data.tags);
        }
      }
    });
  }

  return (
    <div className="AISearchTagsContainer w-[60vw] bg-white p-2 rounded-lg">
      <Textarea
        className="AISearchTagsInput mt-10 min-h-[200px]"
        value={userInput}
        onChange={handleInput}
        placeholder="Add your session notes here!"
      />
      <div className="mt-4 flex justify-end">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => {
            queryAI();
          }}
        >
          Ask AI!
        </button>
      </div>
      <div className="mt-4">
        {AIResponse &&
          AIResponse.map((response, index) => (
            <GeminiTagresults
              key={index}
              tag={response.tag}
              reason={response.reason}
            ></GeminiTagresults>
          ))}
      </div>
    </div>
  );
}
