import { useState } from "react";
import { fetchAllTags } from "../queries/fetchData";
import { Textarea } from "@/components/ui/textarea";

// List of Songs based on a tag to show to the user in a Gallery
import GeminiTagresults from "./GeminiTagResults";

import { GeminiTagResultsProps } from "../interfaces";
//  tag: string;
//  reason: string;

// Component takes DM's session notes and makes an API call to generate Tag Results (which will have the corresponding songs within)
export default function GeminiSessionNotes() {
  // String we'll be sending to the AI, edited by the user. 
  const [userInput, setUserInput] = useState<string>(
    "Add your session notes here!"
  );
  // Array of Objects sent by the AI api
  const [AIResponse, setAIResponse] = useState<GeminiTagResultsProps[] | null>(
    null
  );

  // Handle user changes to the textarea element
  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUserInput(e.target.value);
  };

  async function queryAI() {
    // Clear current response
    setAIResponse(null);
    // Get every tag in the Database
    fetchAllTags().then(async (response) => {
      const data = await response;
      if (data) {
        // Get the TagName from each tag
        const mappedData = data.map((tag: { tagName: string }) => {
          return tag.tagName;
        });
        // Then make an array to send to the API
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
          // We'll be getting a JSON from the API here, which can be iterated upon to make the GeminiTagResults
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
          className="SmallButton SmallButtonOnWhite"
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
