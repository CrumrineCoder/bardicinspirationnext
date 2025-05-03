import { GoogleGenAI } from "@google/genai";
import type { NextApiRequest, NextApiResponse } from "next";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });


export default async function main(req: NextApiRequest, res: NextApiResponse) {
  const searchQuery = req.query;
  if (!searchQuery || !searchQuery.songName || !searchQuery.artist) {
    res.status(400).json({ error: "Missing search query" });
    return;
  }
  const pingAI = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents:
      "For this song " +
      searchQuery.songName +
      " from " +
      searchQuery.artist +
      " to generate tags for the use of the song in a tabletop RPG game. Here are the user's tags: [" +
      searchQuery.tags +
      "]. And here is every tag: [" + searchQuery.allTags + "]. Use the user's tags, YouTube video comments of the songs, Reddit posts, and other blogs to suggest other preexisting tags to recommend. You can suggest a new tag that's not in the database if it's a good one. Do not include duplicates of the current user tags. Do not return anything other than tags in your response. Keep your response to the best 10 tags max. Do not include artists, licensing, or brands as tags. Return it formatted as an array.",
  });
  if (!pingAI) {
    throw new Error("Failed to fetch data from YouTube API");
  }
  console.log(typeof pingAI.text);
  res.status(200).send(pingAI.text);
}

// And here are all the tags used in the database: " + searchQuery.allTags + "Do not stretch to use the database tags if they do not match.. 
// The above overloads the model unfortunately

// Include these tags if they match what you found on Youtube, reddit, and blogs: " + searchQuery.allTags + ". 
// Query stretches to include tags that I don't want. 

// Include strict synonyms of current user tags from this list: [ " + searchQuery.allTags + "]

/*
    contents:
      "Search through YouTube video comments, reddit, and other blogs for this song " +
      searchQuery.songName +
      " from " +
      searchQuery.artist +
      " to generate tags for the use of the song in a tabletop RPG game. Here are the current user tags: " +
      searchQuery.tags +
      ". Do not include duplicates of the current user tags. Do not return anything other than tags in your response. Keep your response to the best 10 tags max. Do not include artists, licensing, or brands as tags. Return it formatted as an array.",
*/