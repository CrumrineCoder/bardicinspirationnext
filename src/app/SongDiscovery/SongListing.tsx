import { Song } from "../interfaces";

interface SongListingProps {
  selectedSong: Song | null;
  allSongs: Song[] | null;
  setSelectedSong: (song: Song | null) => void;
  disabled?: boolean;
}

export default function SongListing({
  selectedSong,
  allSongs,
  setSelectedSong,
  disabled,
}: SongListingProps) {
  return (
    <div className={disabled ? "disabled" : ""}>
      <div className="flex justify-center mb-3">
        <button
          className="SmallButton"
          onClick={() => {
            if (allSongs && allSongs.length > 0) {
              const randomIndex = Math.floor(Math.random() * allSongs.length);
              setSelectedSong(allSongs[randomIndex]);
            }
          }}
        >
          Random Song
        </button>
      </div>
      {allSongs &&
        allSongs.map((song, index) => (
          <div
            className={`ClickableInlineEntry ${
              selectedSong?.id === song.id ? "pl-2 ActiveSongListing" : ""
            } leading-tight pb-2`}
            onClick={() => {
              setSelectedSong(song);
            }}
            key={index}
          >
            {song.songName}{" "}
            {song.version && (
              <span className="opacity-50 inline">
                [{song.version} version]
              </span>
            )}
          </div>
        ))}
    </div>
  );
}
