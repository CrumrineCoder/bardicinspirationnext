import { GoogleGenAI } from "@google/genai";
import type { NextApiRequest, NextApiResponse } from "next";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export default async function main(req: NextApiRequest, res: NextApiResponse) {
  const searchQuery = req.query;
  if (!searchQuery || !searchQuery.sessionNotes || !searchQuery.allTags) {
    res.status(400).json({ error: "Missing search query" });
    return;
  }
  const pingAI = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents:
      "Take this user's summary of their upcoming game session [ " + searchQuery.sessionNotes + " ], and suggest which tags are the most relevant. Here are the tags used so far [ " + searchQuery.allTags + " ]",
  });
  if (!pingAI) {
    throw new Error("Failed to fetch data from YouTube API");
  }
  console.log(pingAI.text);
  res.status(200).send(pingAI.text);
}
