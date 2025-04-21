import { JWTPayload } from "jose";

export interface Song {
  id: number;
  songName: string;
  artist: string;
  link: string;
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
  userId: string;
  name: string;
  email: string;
}