"use client";
import { addTagToDB } from "../../queries/addToDB";
import { fetchTagsBySongID } from "../../queries/fetchData";
import { useState } from "react";

export default function AddTagButton({
  onUpdate,
  songID,
}: {
  onUpdate: () => void;
  songID: number;
}) {
  const [tagName, setTagName] = useState<string | null>(null);
  const [showDisclaimer, setShowDisclaimer] = useState<boolean>(false);

  async function submitTag() {
    if (tagName) {
      try {
        await addTagToDB(tagName.toLowerCase(), songID);
        onUpdate();
        setShowDisclaimer(false);
        setTagName(null);
      } catch (error: unknown) {
        console.error("Error adding tag to database:", error);
        setShowDisclaimer(true);
      }
    }
  }
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        submitTag();
      }}
      className="flex items-center space-x-2 mt-3" 
    >
      <div>
        <input
          type="text"
          name="tagName"
          placeholder="Enter Tag"
          required
          value={tagName || ""}
          onChange={(e) => setTagName(e.target.value)}
          onFocus={() => setShowDisclaimer(false)}
          className="px-2 py-1 border border-gray-300 rounded"
        />
      </div>
      <button
        type="submit"
        className="px-4 SmallButton" 
      >
        Add Tag
      </button>
      {showDisclaimer && (
        <div className="text-red-500 text-sm ml-2">
          Hey numbskull, tag already exists on this song!
        </div>
      )}
    </form>
  );
}
