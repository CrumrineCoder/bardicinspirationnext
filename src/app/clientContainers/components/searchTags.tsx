"use client";

import { useState } from "react";

import {fetchSongsByTagName} from "../../queries/fetchData";
// Eventually this should be onChange and autocomplete tags. 
export default function searchTag() {
  const [tagName, setTagName] = useState<string | null>(null);

  return (
    <div>
      Search by Tag:
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (tagName) {
            fetchSongsByTagName(tagName).catch((error) => {
              console.error("Error fetching songs by tag name:", error);
            });
          }
        }}
      >
        <input
          type="text"
          name="tagName"
          placeholder="Enter Tag"
          required
          value={tagName || ""}
          onChange={(e) => setTagName(e.target.value)}
        />
         <button type="submit">Search Tag</button>
      </form>
    </div>
  );
}
