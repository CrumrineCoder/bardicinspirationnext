"use client";

import { useState } from "react";

import { fetchSongsByTagName } from "../../queries/fetchData";
import {Song} from "../../interfaces";

// Eventually this should be onChange and autocomplete tags.
interface SearchTagProps {
  setSongListSongs: (updatedSongs: Song[] | null) => void;
  resetSongsFunction: () => void;
}
export default function SearchTag({ setSongListSongs, resetSongsFunction }: SearchTagProps) {
  const [tagName, setTagName] = useState<string | null>(null);

  return (
    <div className="SearchTagContainer">
      <form
        className="SearchTagForm"
        onSubmit={(e) => {
          e.preventDefault();
          if (tagName) {
            fetchSongsByTagName(tagName)
              .then((data) => {
                setSongListSongs(data);
              })
              .catch((error) => {
                console.error("Error fetching songs by tag name:", error);
                // Need to add a disclaimer to show that the tag isn't in the DB
                // Also suggested tags, autocomplete, etc.
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
          className="SearchTagBar"
        />
        <button className="SearchTagSubmitButton" type="submit">Search Tag</button>
      </form>
      <button className="SearchTagResetButton" onClick={()=> {resetSongsFunction(); setTagName(null)}}>Reset Filter</button>
    </div>
  );
}
