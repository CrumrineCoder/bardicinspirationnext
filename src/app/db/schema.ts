import { integer, text, serial, pgTable } from "drizzle-orm/pg-core";

export const songsTable = pgTable("songs", {
    id: serial("id").primaryKey().notNull(),
    songName: text("songname").notNull(),
    artist: text("artist").notNull(),
    link: text("link").notNull(),
});

export const tagTable = pgTable("tags", {
    id: serial("id").primaryKey().notNull(),
    tagName: text("tagName").notNull(),
});

export const songTagsTable = pgTable("songTags", {
    id: serial("id").primaryKey().notNull(),
    songID: integer("songID").notNull(),
    tagID: integer("tagID").notNull(),
});

export const usersTable = pgTable("users", {
    id: serial("id").primaryKey().notNull(),
    email: text("email").notNull(),
    userName: text("userName").notNull(),
})

export const tagVotesTable = pgTable("tagVotes", {
    id: serial("id").primaryKey().notNull(),
    userID: text("useriD").notNull(),
    songTagID: text("songTagID").notNull(),
})

export type InsertSong = typeof songsTable.$inferInsert;
export type SelectSong = typeof songsTable.$inferSelect;

