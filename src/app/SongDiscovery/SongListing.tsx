import { Song } from "../interfaces";

interface SongListingProps {
  selectedSong: Song | null;
  allSongs: Song[] | null;
  setSelectedSong: (song: Song | null) => void;
}

export default function SongListing({
  selectedSong,
  allSongs,
  setSelectedSong,
}: SongListingProps) {
  return (
    <div>
      {allSongs &&
        allSongs.map((song, index) => (
          <div
            className={`ClickableInlineEntry py-1 ${
              selectedSong?.id === song.id ? "pl-5 ActiveSongListing" : ""
            }`}
            onClick={() => {
              setSelectedSong(song);
            }}
            key={index}
          >
            {song.songName}
          </div>
        ))}
    </div>
  );
}
