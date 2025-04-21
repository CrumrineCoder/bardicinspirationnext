import { signUp } from "../../../auth";
import { getCurrentCookie } from "../session";
import { useActionState, useEffect, useState } from "react";

export default function SignupForm() {
  const [state, action, pending] = useActionState(signUp, undefined);
  const [userID, setUserID] = useState<number | null>(null);
  async function checkUser() {
    const user = await getCurrentCookie();
    // Maybe use an interface here? Not sure how to handle a Promise here with TypeScript
    if (user && typeof user === "object" && "userId" in user && typeof user.userId === "number") {
        setUserID(user.userId);
    }
  }
  useEffect(() => {
    checkUser();
  }, []);
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        await signUp(state, formData);
      }}
    >
      <input id="username" name="username" placeholder="username" />
      {state?.errors?.username && <p>{state.errors.username}</p>}
      <input id="email" name="email" type="email" placeholder="email" />
      {state?.errors?.email && <p>{state.errors.email}</p>}
      <input id="password" name="password" type="password" />
      {state?.errors?.password && (
        <div>
          <p>Password must: </p>
          <ul>
            {state.errors.password.map((error) => (
              <li key={error}>- {error}</li>
            ))}
          </ul>
        </div>
      )}
      <button type="submit">Sign Up</button>
      {userID}
    </form>
  );
}
