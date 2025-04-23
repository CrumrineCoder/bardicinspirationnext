import { login } from "../../../auth";

import { useState } from "react";
import { verifySession } from "../dal";

export default function loginForm() {
  const [userName, setUserName] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  return (
      <form
        className="LoginForm"
        onSubmit={async (e) => {
          e.preventDefault();
          if (userName && password) {
            await login(userName, password);
            verifySession()
          }
        }}
      >
        <input
          onChange={(e) => {
            setUserName(e.target.value);
          }}
          id="username"
          name="username"
          placeholder="username"
        />
        <input
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          id="password"
          name="password"
          type="password"
        />
        <button type="submit">Log In</button>
      </form>
  );
}
