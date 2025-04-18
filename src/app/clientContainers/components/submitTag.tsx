"use client";
import { addTagToDB } from "../../queries/addToDB";
import { fetchTagsBySongID } from "../../queries/fetchData"
import { useState } from "react";

export default function AddTagButton({ onUpdate, songID }: { onUpdate: () => void; songID: number }) {
  const [tagName, setTagName] = useState<string | null>(null);

  return (
    <form
      className="formContainer"
      onSubmit={(e) => {
        e.preventDefault();
        if (tagName) {
          addTagToDB(tagName, songID);
          fetchTagsBySongID(songID);
          onUpdate();
          setTagName(null);
        }
      }}
    >
      <div className="formInputContainer">
        <input
          type="text"
          name="tagName"
          placeholder="Add a tag"
          required
          value={tagName || ""}
          onChange={(e) => setTagName(e.target.value)}
        />
      </div>
      <button className="submitButton" type="submit">Submit</button>
    </form>
  );
}
