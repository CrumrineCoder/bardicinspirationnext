
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email TEXT UNIQUE NOT NULL
);

CREATE TABLE songs (
    id SERIAL PRIMARY KEY,
    artist_name TEXT NOT NULL,
    song_name TEXT NOT NULL,
    youtube_link TEXT
);

CREATE TABLE tags (
    id SERIAL PRIMARY KEY,
    name TEXT UNIQUE NOT NULL
);

CREATE TABLE song_tags (
    id SERIAL PRIMARY KEY,
    song_id INTEGER REFERENCES songs(id) ON DELETE CASCADE,
    tag_id INTEGER REFERENCES tags(id) ON DELETE CASCADE,
    UNIQUE(song_id, tag_id)  
);

CREATE TABLE tag_votes (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    song_tag_id INTEGER REFERENCES song_tags(id) ON DELETE CASCADE,
    UNIQUE(user_id, song_tag_id)  
);
