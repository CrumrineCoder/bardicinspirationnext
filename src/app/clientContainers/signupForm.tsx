import {signUp} from "../../../auth";

export function SignupForm(){
    return(
        <form action={signUp}>
            <input 
                id="name"
                name="name"
                placeholder="name"
            />
            <input  
                id="email"
                name="email"
                type="email"
                placeholder="email"
            />
            <input 
                id="password"
                name="password"
                type="password"
            />
            <button type="submit">Sign Up</button>
        </form>
    )
}