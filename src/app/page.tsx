"use client";
import SongList from "./clientContainers/SongList";
import SubmitSongForm from "./clientContainers/components/submitSongForm";

import { useState } from "react";

interface User {
  id: number;
  email: string;
  username: string;
}

export default function Home() {
  const [refresh, setRefresh] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  // Refreshes songlist by changing state, triggering a refresh.
  const triggerRefresh = () => setRefresh((prev) => !prev);

  return (
    <>
      <button onClick={() => setUser({id: 1, email: "crumrinecoding@gmail.com", username: "CrumrineCoder"})}>Login</button>
      <br />
      <button onClick={() => setUser(null)}>Logout</button>
      <br />
      Current User:{""}
      {user && user.username}
      <SubmitSongForm onUpdate={triggerRefresh}></SubmitSongForm>
      <SongList refresh={refresh} />
    </>
  );
}
