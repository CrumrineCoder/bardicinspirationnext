import { JWTPayload } from "jose";

export interface Song {
  id: number;
  songName: string;
  artist: string;
  link: string;
  // Version is optional because there might not be alternative versions/this is the default version
  version?: string | null;
}

export interface TagListingProps {
  selectedTag: string | null;
  allTags: string[] | null;
  setSelectedTag: (tagName: string | null) => void;
  getSongsByTagName: (tagName: string | null) => void;
  getAllSongs: () => void;
  disabled?: boolean; 
}

export interface Tag {
  id: number;
  tagname: string;
}

export interface User {
  id: number;
  email: string;
  password: string;
  name?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface SessionPayload extends JWTPayload {
  userId: number;
}

export interface GeminiTagResultsProps {
  tag: string;
  reason: string;
}
