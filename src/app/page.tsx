"use client";

import SongList from "./clientContainers/SongList";
import SubmitSongForm from "./clientContainers/components/submitSongForm";
import AuthenticationParent from "./authenticationComponents/authenticationParent";
import Landing from "./landingContainer/Landing";
import Link from "next/link";

import { useState } from "react";

export default function Home() {
  const [refresh, setRefresh] = useState(false);

  // Refreshes songlist by changing state, triggering a refresh.
  const triggerRefresh = () => setRefresh((prev) => !prev);

  return (
    <>
      <Landing></Landing>
      <Link
        href="/SongDiscovery"
        className="mx-auto mt-4 flex w-fit items-center justify-center rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
      >
        Find More Songs
      </Link>
    </>
  );
}
//    <AuthenticationParent></AuthenticationParent>
//    <SubmitSongForm onUpdate={triggerRefresh}></SubmitSongForm>
//   <SongList refresh={refresh} />
