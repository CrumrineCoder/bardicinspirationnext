import {  text, serial, pgTable } from "drizzle-orm/pg-core";

export const songsTable = pgTable("songs", {
    id: serial("id").primaryKey().notNull(),
    songName: text("songname").notNull(),
    artist: text("artist").notNull(),
    link: text("link").notNull(),
});

export type InsertSong = typeof songsTable.$inferInsert;
export type SelectSong = typeof songsTable.$inferSelect;

