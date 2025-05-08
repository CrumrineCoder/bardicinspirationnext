import { GoogleGenAI } from "@google/genai";
import type { NextApiRequest, NextApiResponse } from "next";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Using Gemini AI API, we want the AI to effectively scrap YouTube, Reddit, and other blog posts to distill feedback for a song.
// We'll be matching this feedback against the tags already used for the song, and every tag in the database to influence the AI's suggestions.
// We want the AI to try to suggest already existing tags. There is some leeway with suggesting new ones; we don't want it to stretch to make connections that are not present. But we don't want it to say "whimsical" when "silly" is already a tag, for example. 
// Input: songName, artist, tags already present for the song [tags], and every tag in the database [allTags]
// Used in CurrentSong component
export default async function main(req: NextApiRequest, res: NextApiResponse) {
  const searchQuery = req.query;
  // I'm unsure on how to best handle allTags; I think it's best to pipe it through the API but I'm not sure how scaleable it is to ask the AI directly in the prompt to compare it. Has a risk of overloading it.
  // Might need some way to update the Gemini AI with a local state of the tags, if that's even possible. 
  // The song might not have tags, so we're not validating for that 
  if (!searchQuery || !searchQuery.songName || !searchQuery.artist) {
    res.status(400).json({ error: "Missing search query" });
    return;
  }
  // Prompt the AI to suggest tags already existing in the database based on user feedback both through already existing tags, and comments made on the Internet about the song. 
  // We want it formatted like ["tag1", "tag2" ...]
  // We do want new tags, but only like 1 or 2 if possible and 10 tags at most to not overwhelm the user. 
  const pingAI = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents:
      "For this song " +
      searchQuery.songName +
      " from " +
      searchQuery.artist +
      " generate tags for the use of the song in a tabletop RPG game. Here are the user's tags: [" +
      searchQuery.tags +
      "]. And here is every tag: [" + searchQuery.allTags + "]. Use the user's tags, YouTube video comments of the songs, Reddit posts, and other blogs to suggest other preexisting tags to recommend. If you can think of a new tag that's not in the database, feel free to include if it's a good one. Only include like 1 or 2 new tags. Do not include duplicates of the current user tags. Do not return anything other than tags in your response. Keep your response to the best 10 tags max. Do not include artists, licensing, or brands as tags. Return it formatted as an array.",
  });

  //TODO: Overload validation
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