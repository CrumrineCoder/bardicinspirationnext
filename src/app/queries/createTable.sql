CREATE TABLE songs (
    id SERIAL PRIMARY KEY,
        songName TEXT NOT NULL,
            artist TEXT NOT NULL,
                link TEXT NOT NULL);

CREATE TABLE tags (
    id SERIAL PRIMARY KEY,
        tagName TEXT NOT NULL);

CREATE TABLE songTags (
    id SERIAL PRIMARY KEY,
        songID INTEGER NOT NULL,
            tagID INTEGER NOT NULL
            );

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
        email TEXT NOT NULL,
            userName TEXT NOT NULL
            );

CREATE TABLE tagVotes (
    id SERIAL PRIMARY KEY,
        userID INTEGER NOT NULL,
            songTagID INTEGER NOT NULL
            );


DROP TABLE songs;
DROP TABLE songtags;
DROP TABLE tags;
DROP TABLE users;
DROP TABLE tagvotes;
