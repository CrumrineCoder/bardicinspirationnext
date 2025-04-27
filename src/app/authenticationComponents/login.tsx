import { login } from "../../../auth";
import { useAuth } from "../authenticationComponents/CurrentUserContext";

import { useState } from "react";
import { verifySession } from "../dal";

export default function loginForm() {
  const { checkUser } = useAuth();
  const [userName, setUserName] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  return (
      <form
        className="LoginForm"
        onSubmit={async (e) => {
          e.preventDefault();
          if (userName && password) {
            await login(userName, password);
            await checkUser(); 
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
