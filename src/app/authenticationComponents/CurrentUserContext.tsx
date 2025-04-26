
import { User } from "../interfaces";
import {useState, createContext} from "react"

export const CurrentUserContext = createContext(null);

export const CurrentUserProvider = ({ children }: { children: React.ReactNode }) => {
    const [currentUser, setCurrentUser] = 
}