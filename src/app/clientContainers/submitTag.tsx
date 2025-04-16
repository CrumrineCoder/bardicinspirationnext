"use client";
import { addTagToDB } from "../queries/addToDB";
import { useState } from "react";

export default function AddTagButton({ onUpdate }: { onUpdate: () => void }) {
  const [tagName, setTagName] = useState<string | null>(null);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (tagName) {
          addTagToDB(tagName);
          onUpdate();
        }
      }}
    >
      <div className="formInputContainer">
        <label htmlFor="tagName">Add a Tag: </label>
        <input
          type="text"
          name="tagName"
          required
          value={tagName || ""}
          onChange={(e) => setTagName(e.target.value)}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}
