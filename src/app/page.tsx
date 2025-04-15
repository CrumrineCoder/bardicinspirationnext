import HomePage from "./clientContainers/HomePage";

import { songsTable } from "./db/schema";
import SongList from "./serverComponents/SongList";

import { db } from "./db/uplink";

export default function Home() {
  return (
    <>
      <SongList />
      Test
      <HomePage />
    </>
  );
}
