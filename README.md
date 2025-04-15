\i '/Users/crumrinecoder/Desktop/Web Development Projects/bardicinspirationnext/initDB.sql'

Debugger has to be run in Firefox client-side mode to see changes in page.tsx

Useful Tutorials in making this site:
* https://www.freecodecamp.org/news/nextjs-clerk-neon-fullstack-development/

SQL queries:

CREATE TABLE songs (
    id SERIAL PRIMARY KEY,
        songName TEXT NOT NULL,
            artist TEXT NOT NULL,
                link TEXT NOT NULL)
                
INSERT INTO songs (artist, songname, link)
VALUES ('Hollow Knight', 'Dirtmouth', 'NSlkW1fFkyo')