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
    contents: "Search through YouTube video comments, reddit, and other blogs for this song " + searchQuery.songName + " " + searchQuery.artist + " to generate tags for the use of the song in a tabletop RPG game. Here are the current user tags: " + searchQuery.tags + " Do not return anything other than tags in your response. Keep your response to the best 10 tags max. Do not include artists, licensing, or brands as tags. Return it formatted as an array.",
  });
  console.log(pingAI.text);
}
