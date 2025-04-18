import type {NextApiRequest, NextApiResponse} from "next";

export default async function getYoutube(
    req: NextApiRequest, 
    res: NextApiResponse
) {
    try{
        const searchQuery  = req.query;

        //  query: { songName: 'City of Tears', artist: 'Hollow Knight' },
        if (!searchQuery || (!searchQuery.songName || !searchQuery.artist)) {
            res.status(400).json({ error: "Missing search query" });
            return;
        }
        const apiKey = process.env.YOUTUBE_API_KEY;

        const youtubeApiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
             (typeof searchQuery.songName === "string" ? searchQuery.songName : "") + 
             (typeof searchQuery.artist === "string" ? searchQuery.artist : "") + " song"
        )}&key=${apiKey}`;
        const response = await fetch(youtubeApiUrl);

        if (!response.ok) {
            throw new Error("Failed to fetch data from YouTube API");
        }

        const result = await response.json();
        const videoIDs = result.items
            .filter((item: any) => item.id && item.id.videoId)
            .map((item: any) => item.id.videoId);
        res.status(200).send({ videoIDs });
    } catch (err) {
        res.status(500).json({error: "Failed to load YouTube Data"})
    }
}