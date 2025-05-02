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
  disabled
}: SongListingProps) {
  return (
    <div className={disabled ? "disabled" : ""}>
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
