import { db } from "../db/uplink";
import { songsTable } from "../db/schema";

export default async function SongList() {
  const songs = await db.select().from(songsTable);
  console.log("Songs:" );
  console.log(songs);
  return (
    <div>
    </div>
  );
}