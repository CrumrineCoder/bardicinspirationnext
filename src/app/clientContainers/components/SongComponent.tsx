import AddTagButton from "./submitTag";

import {Song} from "../../interfaces";

export default function SongComponent( song: Song) {
  return (
    <div>
      ID: {song.id}
      <br />
      Artist: {song.artist}
      <br />
      Song Name: {song.songName}
      <br />
      YT Link: {song.link}
      <br />
      ADD TAGs!!
   
    </div>
  );
}
//    <AddTagButton onUpdate={() => refresh} songID={song.id} />