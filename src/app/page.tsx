'use client'
import HomePage from "./clientContainers/HomePage";

import { songsTable } from "./db/schema";
import SongList from "./serverComponents/SongList";
import SendDataButton from "./clientContainers/sendDataButton";

import { db } from "./db/uplink";

import {useState} from "react";

export default function Home() {
  const [refresh, setRefresh] = useState(false);

  // Function to toggle the refresh state
  const triggerRefresh = () => setRefresh((prev) => !prev);

  return (
    <>
      <SendDataButton onUpdate={triggerRefresh}></SendDataButton>
      <SongList refresh={refresh}/>
    </>
  );
}
/*
      <HomePage />
      */