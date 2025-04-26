import { User } from "../interfaces";
import { useState, createContext } from "react";
import { getCurrentCookie, logout } from "../session";

interface AuthContextType {
  userID: number | null;
  checkUser: () => Promise<void>;
  logoutUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const CurrentUserProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [userID, setUserID] = useState<number | null>(null);

  async function checkUser() {
    const user = await getCurrentCookie();
    if (
      user &&
      typeof user === "object" &&
      "userId" in user &&
      typeof user.userId === "number"
    ) {
      setUserID(user.userId);
    } else {
      setUserID(null);
    }
  }

  async function logoutUser() {
    await logout();
    setUserID(null);
  }
};
