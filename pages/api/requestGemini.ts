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
    contents: searchQuery.songName + " " + searchQuery.artist,
  });
  console.log(pingAI.text);
}
