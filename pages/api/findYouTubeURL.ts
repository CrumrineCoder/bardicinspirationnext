import type {NextApiRequest, NextApiResponse} from "next";

// Using the YouTube Data API, we'll search by the user's query to return the top 5 YouTube videos
// Input: songName, artist
export default async function findYouTubeURL(
    req: NextApiRequest, 
    res: NextApiResponse
) {
    try{
        const searchQuery  = req.query;

        //  query: { songName: 'City of Tears', artist: 'Hollow Knight' },
        // Validate the query
        if (!searchQuery || (!searchQuery.songName || !searchQuery.artist)) {
            res.status(400).json({ error: "Missing search query" });
            return;
        }
        const apiKey = process.env.YOUTUBE_API_KEY;

        // Construct the YouTube Data API search URL
        // The query combines the song name and artist, appending "song" for better results
        const youtubeApiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
             (typeof searchQuery.songName === "string" ? searchQuery.songName : "") + 
             (typeof searchQuery.artist === "string" ? searchQuery.artist : "") + " song"
        )}&key=${apiKey}`;
        const response = await fetch(youtubeApiUrl);

        if (!response.ok) {
            throw new Error("Failed to fetch data from YouTube API");
        }

        // Extract the id of each video. We're returning just the URL id because these IDs are used (atm) just for YouTube iframes. If we needed more complex data from YouTube, we might return a more curated object
        const result = await response.json();
        const videoIDs = result.items
            .filter((item: any) => item.id && item.id.videoId)
            .map((item: any) => item.id.videoId);
        res.status(200).send({ videoIDs });
    } catch (err) {
        res.status(500).json({error: "Failed to load YouTube Data"})
    }
}