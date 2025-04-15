import {  text, serial, pgTable } from "drizzle-orm/pg-core";

export const songsTable = pgTable("songs", {
    id: serial("id").primaryKey().notNull(),
    songName: text("songName").notNull(),
    artist: text("artist").notNull(),
    link: text("link").notNull(),
});
