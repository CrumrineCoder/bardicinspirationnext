\i '/Users/crumrinecoder/Desktop/Web Development Projects/bardicinspirationnext/initDB.sql'

Debugger has to be run in Firefox client-side mode to see changes in page.tsx

Useful Tutorials in making this site:
* https://www.freecodecamp.org/news/nextjs-clerk-neon-fullstack-development/
* https://orm.drizzle.team/docs/tutorials/drizzle-nextjs-neon
* https://www.youtube.com/watch?v=Jw8fiam70fQ (Nextjs with Neon Progress on Vercel)
* https://nextjs.org/blog/building-apis-with-nextjs
* https://nextjs-faq.com/fetch-api-in-rsc
* https://www.youtube.com/watch?v=dgDFPRol0cw&ab_channel=DaveGray
* https://orm.drizzle.team/docs/guides/unique-case-insensitive-email
* https://nextjs.org/docs/app/building-your-application/authentication#3-create-a-user-or-check-user-credentials
* https://nextjs.org/learn/dashboard-app/adding-authentication

Inspiration:
* https://melodice.org/
* https://tabletopaudio.com/
* https://www.tabletoprpgmusic.com/



ToDo:
* Front End (Make it pretty! Animations!)
    -> In progress!
* Auth
    * Login [DONE]
    * Signup [DONE]
    * Login/Signup Error Handling
    * Update userstate after logging in/signing up. 
    * Admin users
        * Able to update songs/delete tags
    * Guest user
    * Populate Tagvotes when a user creates a tag 
    * Lock adding and voting on tags behind being a user
    * Lock adding songs behind being a user
    * User Profiles (Able to make their own notes and save them?)
* Check if song name + artist is in DB already [DONE]
* Check if YT link is valid + serialize it to be the ID only [DONE]
    * Feature where we'll search for a valid YT video for them [DONE]
    * Update YT Link
* No duplicate tags, or duplicate songnames and artist combos. [DONE]
    * Duplicate tag back end error handling (Don't create new tag, just make new songtag) [DONE]
    * Duplicate song front end error handling [DONE]
* Community Notes (How they used it in a game)
    * Emoji reactions to songs? 
* Search By Tag (Maybe we can do something where we pull all tags, and the AI can suggest a few tags based on what the user wrote?) [DONE]
    * Autocomplete tags based on what's already in the db
    * AI suggested tags for a song 
    * AI related tags based on what's already in the db.
    * AI parse body of text to find a song
    * Multiple tags search
    * Filter by source (Hollow Knight)
    * Search Song Name 
* Copy link
* Get BPM of songs from a library? 
* Errors = vicious mockery. Health bar on the screen, does 1d8 damage each time? 
    * Bard styling in general
* Make all tags be lowercase in db -> how do you check if a tag is unique despite capitalization differences [DONE]
* Delete tag? How should ownership of tags and songs be handled? 
* Handle tag does not exist in searchTag
* Upvote tags
    * Automatically hide tags below a certain threshold unless clicked (discourage trolling)
    * Sort songs when searched by tag
* Show popular tags at the top. 

* Playlists [Inspired by Melodice - although it'd be different with Bardic Inspiration]
    * It'd be saving songs for a session, probably somewhere in a user's profile. Maybe we can have a stat where songs are used in playlists as a number? As a way to rate popularity? Or just a "I used this!" button on a song. 
* Chrome/Firefox Extension that acts like a Pinterest for the songs to be added. 

* - GET FEEDBACK FROM REDDIT AND FRIENDS - 