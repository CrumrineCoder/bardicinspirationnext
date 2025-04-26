import { signUp } from "../../../auth";
import { useActionState } from "react";
import { verifySession } from "../dal";

export default function SignupForm() {
  const [state, action, pending] = useActionState(signUp, undefined);

  return (
    <form
      className="SignUpForm"
      onSubmit={async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        await signUp(state, formData);
        verifySession();
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
    </form>
  );
}
