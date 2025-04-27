"use client";
import "./app.scss";

import SongList from "./clientContainers/SongList";
import SubmitSongForm from "./clientContainers/components/submitSongForm";
import AuthenticationParent from "./authenticationComponents/authenticationParent";
import Landing from "./landingContainer/Landing";

import { useState } from "react";

export default function Home() {
  const [refresh, setRefresh] = useState(false);

  // Refreshes songlist by changing state, triggering a refresh.
  const triggerRefresh = () => setRefresh((prev) => !prev);

  return (
    <>
      <Landing></Landing>
    
    </>
  );
}
//    <AuthenticationParent></AuthenticationParent>
//    <SubmitSongForm onUpdate={triggerRefresh}></SubmitSongForm>
//   <SongList refresh={refresh} />