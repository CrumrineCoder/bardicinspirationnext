import AddTagButton from "./submitTag";

import {Song, Tag} from "../../interfaces";
import {useEffect, useState} from "react";
import {fetchTagsBySongID} from "../../queries/fetchData";

export default function SongComponent({ song}: {song: Song}) {
    const [tags, setTags] = useState<{tagName: string}[]>();

    useEffect (()=>{
        fetchTagsBySongID(song.id).then(async (response) => {
            const data = await response;
            setTags(data);
          });
        
    }, []);
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
      TAGS!
      {tags && tags.map((tag, index) => (
        <div key={index}>
          {tag.tagName}
        </div>
      ))}
    </div>
  );
}
//    <AddTagButton onUpdate={() => refresh} songID={song.id} />