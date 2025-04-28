import { fetchSongsByTagName } from "../queries/fetchData";
import { GeminiTagResultsProps } from "../interfaces";

export default function GeminiTagresults({
  tag,
  reason,
}: GeminiTagResultsProps) {
  return (
    <div className="flex items-center space-x-2 mt-2">
      <button
        onClick={() => {
          fetchSongsByTagName(tag.toLowerCase())
            .then((data) => {
              console.log(data);
            })
            .catch((error) => {});
        }}
        className="px-4 py-2 bg-green-500 text-white rounded"
      >
        {tag}
      </button>
      <span className="pl-10">{reason}</span>
    </div>
  );
}
