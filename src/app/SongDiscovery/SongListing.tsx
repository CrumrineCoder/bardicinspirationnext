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
            className={`ClickableInlineEntry ${
              selectedSong?.id === song.id ? "pl-2 ActiveSongListing" : ""
            } leading-tight pb-2`}
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
