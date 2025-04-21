import { integer, text, serial, pgTable } from "drizzle-orm/pg-core";

// Should convert this to Drizzle

export const userTable = pgTable("users", {
    id: serial("id").primaryKey().notNull(),
    username: text("username").notNull(),
    email: text("email").notNull(),
    password: text("password").notNull(),
  });

import { z } from "zod";


export const SignUpFormSchema = z.object({
    username: z
    .string()
    .min(2, { message: "username must be at least 2 characters long" })
    .trim(),
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z
    .string()
    .min(8, { message: "Be at least 8 characters long" })
    .regex(/[a-zA-z]/, { message: "Contain at least one letter." })
    .regex(/[0-9]/, { message: "Contain at least one number" })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Contain at least one special character",
    })
    .trim(),
});


export type FormState =
  | {
      errors?: {
        username?: string[];
        email?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined;

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
});

export const tagVotesTable = pgTable("tagvotes", {
  id: serial("id").primaryKey().notNull(),
  userID: text("userid").notNull(),
  songTagID: text("songtagid").notNull(),
});

export type InsertSong = typeof songsTable.$inferInsert;
export type SelectSong = typeof songsTable.$inferSelect;
