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
    contents: `The following is a YT link: [ ` + searchQuery.link  + ` ]. Please parse the Song Name, and where it's from. Remove words like OST or other superflous words from the source. Return the response in the following JSON format:
      {
        "songName": Dirtmouth,
        "artist": Hollow Knight
      }. Only return the JSON and nothing else.`,
  });

  if (!pingAI) {
    res.status(500).json({ error: "Failed to fetch data from AI model" });
  }

  if (!pingAI.text) {
    res.status(500).json({ error: "Invalid response from AI model" });
    return;
  }

  try {
    const jsonStart = pingAI.text.indexOf("{");
    const jsonEnd = pingAI.text.lastIndexOf("}");
    if (jsonStart === -1 || jsonEnd === -1) {
      res.status(500).json({ error: "No JSON structure found in AI response" });
    }

    const jsonResponse = JSON.parse(pingAI.text.slice(jsonStart, jsonEnd + 1));
    res.status(200).send(jsonResponse);
  } catch (error) {
    console.error("Error parsing AI response:", error);
    res.status(500).json({ error: "Failed to parse AI response" });
  }
}