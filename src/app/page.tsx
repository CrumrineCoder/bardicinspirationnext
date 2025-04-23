"use client";
import "./app.scss";

import SongList from "./clientContainers/SongList";
import SubmitSongForm from "./clientContainers/components/submitSongForm";
import AuthenticationParent from "./authenticationComponents/authenticationParent";
import Gemini from "./clientContainers/requestGemini";

import { useState } from "react";

export default function Home() {
  const [refresh, setRefresh] = useState(false);

  // Refreshes songlist by changing state, triggering a refresh.
  const triggerRefresh = () => setRefresh((prev) => !prev);

  return (
    <>
      <Gemini />
      <AuthenticationParent></AuthenticationParent>
      <SubmitSongForm onUpdate={triggerRefresh}></SubmitSongForm>
      <SongList refresh={refresh} />
    </>
  );
}
