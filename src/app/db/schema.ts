import { integer, text, serial, pgTable } from "drizzle-orm/pg-core";

export const songsTable = pgTable("songs", {
    id: serial("id").primaryKey().notNull(),
    songName: text("songname").notNull(),
    artist: text("artist").notNull(),
    link: text("link").notNull(),
});

export const tagTable = pgTable("tags", {
    id: serial("id").primaryKey().notNull(),
    tagName: text("tagname").notNull(),
});

export const songTagsTable = pgTable("songtags", {
    id: serial("id").primaryKey().notNull(),
    songID: integer("songid").notNull(),
    tagID: integer("tagid").notNull(),
});

export const usersTable = pgTable("users", {
    id: serial("id").primaryKey().notNull(),
    email: text("email").notNull(),
    userName: text("username").notNull(),
})

export const tagVotesTable = pgTable("tagvotes", {
    id: serial("id").primaryKey().notNull(),
    userID: text("userid").notNull(),
    songTagID: text("songtagid").notNull(),
})

export type InsertSong = typeof songsTable.$inferInsert;
export type SelectSong = typeof songsTable.$inferSelect;

