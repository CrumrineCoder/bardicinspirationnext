import { signUp } from "../../../auth";
import { useActionState } from "react";

export function SignupForm() {
  const [state, action, pending] = useActionState(signUp, undefined);
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        await signUp(state, formData);
      }}
    >
      <input id="name" name="name" placeholder="name" />
      {state?.errors?.name && <p>{state.errors.name}</p>}
      <input id="email" name="email" type="email" placeholder="email" />
      {state?.errors?.email && <p>{state.errors.email}</p>}
      <input id="password" name="password" type="password" />
      {state?.errors?.password && (
        <div>
            <p>Password must: </p>
            <ul>
                {state.errors.password.map((error) =>(
                    <li key={error} >- {error}</li>
                ))}
            </ul>
        </div>
      )}
      <button type="submit">Sign Up</button>
    </form>
  );
}
