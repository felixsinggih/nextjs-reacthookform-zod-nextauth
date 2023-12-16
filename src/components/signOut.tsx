'use client'
import { signOut } from "next-auth/react"

function SignOut() {
    return (
        <button
            onClick={() => signOut({
                redirect: true,
                callbackUrl: `/signin`
            })}
            className="btn btn-outline-danger">Sign Out</button>
    )
}

export default SignOut