import type {NextApiRequest, NextApiResponse} from "next";

export default async function getYouTubeLink(
    req: NextApiRequest, 
    res: NextApiResponse
) {
    try{
        const { searchQuery } = req.query;

        if (!searchQuery) {
            res.status(400).json({ error: "Missing search query" });
            return;
        }

        const apiKey = process.env.YOUTUBE_API_KEY;
        const youtubeApiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
            searchQuery as string
        )}&key=${apiKey}`;

        const response = await fetch(youtubeApiUrl);

        if (!response.ok) {
            throw new Error("Failed to fetch data from YouTube API");
        }

        const result = await response.json();
        res.status(200).send({ result });
    } catch (err) {
        res.status(500).json({error: "Failed to load YouTube Data"})
    }
}