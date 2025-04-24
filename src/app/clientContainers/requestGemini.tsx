export default function requestGemini({
  songName,
  artist,
  tags,
}: {
  songName: string;
  artist: string;
  tags: string[]
}) {
  async function requestGeminiAPI() {
    const response = await fetch(
      `/api/requestGemini?songName=${encodeURIComponent(
        songName
      )}&artist=${encodeURIComponent(artist)}&tags=${encodeURIComponent(tags.join(","))}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
  return (
    <button className="geminiButton" onClick={() => requestGeminiAPI()}>
      AI Suggested Tags
    </button>
  );
}
