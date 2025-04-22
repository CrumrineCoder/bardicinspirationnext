import { getCurrentCookie } from "../session";
import { verifySession } from "../dal";
import { useEffect, useState } from "react";
import SignUpForm from "./signupForm";
import { logout } from "../session";

export default function HomePageAuth() {
  const [userID, setUserID] = useState<number | null>(null);

  async function deleteUser() {
    await logout();
    setUserID(null);
  }
  async function checkUser() {
    const user = await getCurrentCookie();
    const user2 = await verifySession();
    console.log(user2);
    // Maybe use an interface here? Not sure how to handle a Promise here with TypeScript
    if (
      user &&
      typeof user === "object" &&
      "userId" in user &&
      typeof user.userId === "number"
    ) {
      setUserID(user.userId);
    }
  }
  useEffect(() => {
    checkUser();
  }, []);
  return (
    <div className="authenticationContainer">
      {!userID ? (
        <SignUpForm></SignUpForm>
      ) : (
        <button onClick={() => deleteUser()}>Log Out</button>
      )}
    </div>
  );
}
