import type { NextApiRequest, NextApiResponse } from "next";

function validateSyntax(urlToParse: string) {
  if (urlToParse) {
    var regExp =
      /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    if (urlToParse.match(regExp)) {
      return true;
    }
  }
  return false;
}
export default async function validateYouTubeURL(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const searchQuery = req.query;
  if (!searchQuery || !searchQuery.link) {
    res.status(400).json({ error: "Missing search query" });
    return;
  }
  const link = Array.isArray(searchQuery.link) ? searchQuery.link[0] : searchQuery.link;
  const isSyntaxValid = validateSyntax(link);
  if (!isSyntaxValid){
    res.status(400).json({ error: "Invalid YouTube syntax" });
    return;
  }
}
