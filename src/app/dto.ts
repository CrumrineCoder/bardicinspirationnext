import "server-only";
import { getUser } from "./dal";
import { User } from "./interfaces";

import { db } from "./db";
import { userTable } from "./db/schema";

function canSeeUsername(viewer: User) {
  return true;
}
/*
export async function getProfileDTO(slug: string) {
  const data = await db.query.userTable.findMany({
    where: eq(userTable.slug, slug),
    // Return specific columns here
  });
  const user = data[0];

  const currentUser = await getUser(user.id);

  // Or return only what's specific to the query here
  return {
    username: canSeeUsername(currentUser) ? user.username : null,
  };
}
*/