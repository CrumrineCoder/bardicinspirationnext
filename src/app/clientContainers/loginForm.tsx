'use client';

import {useActionState} from "react";
import {authenticate} from "../queries/authentication";
import {useSearchParams} from "next/navigation";

export default function LoginForm(){
    const searchParams = useSearchParams();
    const callbackUrl = searchParams?.get('callbackurl') || "/dashboard";
    const [errorMessage, formAction, isPending] = useActionState(
        authenticate, undefined
    );

    return(
        <form action={formAction}>
            <input
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email address"
                required
            />
             <input
                id="password"
                type="password"
                name="password"
                placeholder="Enter your password"
                required
                minLength={6}
            />
            <button aria-disabled={isPending} type="submit">Log in</button>
            {errorMessage && (<>{errorMessage}</>)}
        </form>
    )

}