import {  text, serial, pgTable } from "drizzle-orm/pg-core";

export const songsTable = pgTable("songs", {
    id: serial("id").primaryKey().notNull(),
    songName: text("songname").notNull(),
    artist: text("artist").notNull(),
    link: text("link").notNull(),
});
