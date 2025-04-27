import SignUpForm from "./signupForm";
import LoginForm from "./login";
import { useAuth } from "../authenticationComponents/CurrentUserContext";

export default function HomePageAuth() {
  const { userID, logoutUser } = useAuth(); 

  return (
    <div className="authenticationContainer">
      {!userID ? (
        <>
          <LoginForm></LoginForm>
          <SignUpForm></SignUpForm>
        </>
      ) : (
        <>
          <button onClick={() => logoutUser()}>Log Out</button>
        </>
      )}
    </div>
  );
}
