'use client'
import SongList from "./serverComponents/SongList";
import SendDataButton from "./clientContainers/sendDataButton";

import {useState} from "react";

export default function Home() {
  const [refresh, setRefresh] = useState(false);

  // Refreshes songlist by changing state, triggering a refresh. 
  const triggerRefresh = () => setRefresh((prev) => !prev);

  return (
    <>
      <SendDataButton onUpdate={triggerRefresh}></SendDataButton>
      <SongList refresh={refresh}/>
    </>
  );
}