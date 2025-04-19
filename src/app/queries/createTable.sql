CREATE TABLE songs (
    id SERIAL PRIMARY KEY,
        songName VARCHAR(255) NOT NULL,
            artist VARCHAR(255) NOT NULL,
                link VARCHAR(255) NOT NULL, 
                UNIQUE (songName, artist) );
    
CREATE TABLE tags (
    id SERIAL PRIMARY KEY,
        tagName VARCHAR(255) UNIQUE NOT NULL);

CREATE TABLE songTags (
    id SERIAL PRIMARY KEY,
        songID INTEGER NOT NULL,
            tagID INTEGER NOT NULL,
            UNIQUE (songID, tagID)
            );

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
        email VARCHAR(255) NOT NULL,
            userName VARCHAR(255) NOT NULL
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
