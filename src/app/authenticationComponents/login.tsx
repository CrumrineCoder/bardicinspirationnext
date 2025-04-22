import {login} from "../../../auth";

export default function loginForm() {
  return (
    <div>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          await login(state, formData);
        }}
      >
        <input id="username" name="username" placeholder="username" />
        <input id="password" name="password" type="password" />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}
