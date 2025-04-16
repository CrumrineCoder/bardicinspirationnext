INSERT INTO songs (artist, songname, link)
VALUES ('Hollow Knight', 'Dirtmouth', 'NSlkW1fFkyo')

INSERT INTO tags (tagname)
VALUES 
    ('calm'),
    ('melancholic'),
    ('piano'),
    ('orchestral'),
    ('emotional');

INSERT INTO songtags (songID, tagID)
VALUES 
    (1, 1),
    (1, 2),
    (1, 3),
    (2, 1),
    (8, 1);

INSERT INTO tagvotes (userID, songtagID)
VALUES 
    (1, 1),
    (2, 2),
    (1, 3),
    (3, 1),
    (2, 3),
    (4, 2),
    (3, 3),
    (4, 1),
    (4, 4);

INSERT INTO users (email, userName)
VALUES 
    ('museumguy@gmail.com', 'Museum Guy'),
    ('artlover@gmail.com', 'Art Lover'),
    ('historybuff@gmail.com', 'History Buff'),
    ('sciencegeek@gmail.com', 'Science Geek'),
    ('naturefan@gmail.com', 'Nature Fan'),
    ('techenthusiast@gmail.com', 'Tech Enthusiast');