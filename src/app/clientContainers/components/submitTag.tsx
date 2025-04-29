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
        />
      </div>
      {showDisclaimer && (
        <div>Hey numbskull, tag already exists on this song!</div>
      )}
      <button type="submit">
        Add Tag
      </button>
    </form>
  );
}
