import HomePage from "./clientContainers/HomePage";

import { songsTable } from "./db/schema";
import SongList from "./serverComponents/SongList";
import SendDataButton from "./clientContainers/sendDataButton";

import { db } from "./db/uplink";

export default function Home() {
  return (
    <>
      <SendDataButton></SendDataButton>
      <SongList />
    </>
  );
}
/*
      <HomePage />
      */