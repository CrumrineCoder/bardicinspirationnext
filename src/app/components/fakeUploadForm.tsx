"use server"
import postgres from "postgres";

export default async function UploadForm() {
  async function create(formData: FormData) {
    if (process.env.DATABASE_URL) {
      const sql = postgres(process.env.DATABASE_URL, { ssl: "require" });
      await sql`CREATE TABLE IF NOT EXISTS comments (comment TEXT)`;
      const comment = formData.get("comment");
      if (typeof comment === "string") {
        await sql`INSERT INTO comments (comment) VALUES (${comment})`;
      } else {
        throw new Error("Invalid comment value");
      }
    }
  }
  return (
    <form action={create}>
      <input type="text" placeholder="write a comment" name="comment" />
      <button type="submit">Submit</button>
    </form>
  );
}
