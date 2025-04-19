"use client";

import { useState } from "react";

export default function searchTag() {
  const [tagName, setTagName] = useState<string | null>(null);

  return (
    <div>
      Search by Tag:
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (tagName) {
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
      </form>
    </div>
  );
}
