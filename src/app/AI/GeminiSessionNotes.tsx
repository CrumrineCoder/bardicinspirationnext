import { useState } from "react";
import { fetchAllTags } from "../queries/fetchData";
import { Textarea } from "@/components/ui/textarea";

export default function GeminiSessionNotes() {
  const [userInput, setUserInput] = useState<string>(
    "Add your session notes here!"
  );
  const [AIResponse, setAIResponse] = useState<
    { tag: string; reason: string }[] | null
  >(null);

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
      <div className="mt-4">
        {AIResponse &&
          AIResponse.map((tag, index) => (
            <div key={index} className="flex items-center space-x-2 mt-2">
              <button className="px-4 py-2 bg-green-500 text-white rounded">
                {tag.tag}
              </button>
                <span className="pl-10">{tag.reason}</span>
            </div>
          ))}
      </div>
    </div>
  );
}
