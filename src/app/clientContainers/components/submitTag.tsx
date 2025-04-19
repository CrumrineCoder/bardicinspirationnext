"use client";
import { addTagToDB } from "../../queries/addToDB";
import { fetchTagsBySongID } from "../../queries/fetchData"
import { useState } from "react";

export default function AddTagButton({ onUpdate, songID }: { onUpdate: () => void; songID: number }) {
  const [tagName, setTagName] = useState<string | null>(null);
  const [showDisclaimer, setShowDisclaimer] = useState<boolean>(false);

  function submitTag(){
    if (tagName) {
      addTagToDB(tagName, songID).then(() =>{

        fetchTagsBySongID(songID);
        onUpdate();
        setTagName(null);
      }).catch((error) => {
        console.log(error);
        setShowDisclaimer(true);
      });
    }
  }
  return (
    <form
      className="formContainer"
      onSubmit={(e) => {
        e.preventDefault();
        submitTag();
      }}
    >
      <div className="formInputContainer">
        <input
          type="text"
          name="tagName"
          placeholder="Enter Tag"
          required
          value={tagName || ""}
          onChange={(e) => setTagName(e.target.value)}
        />
      </div>
      {showDisclaimer && (
        <div>Hey numbskull, tag already exists on this song!</div>
      )}
      <button className="submitButton" type="submit">Add Tag</button>
    </form>
  );
}
