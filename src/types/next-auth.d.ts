// import NextAuth, { DefaultUser } from "next-auth"

// declare module "next-auth" {
//     /**
//      * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
//      */
//     interface User extends DefaultUser {
//         username: string,
//         role: string,
//         // password: string
//     }

//     interface Session {
//         user: User & {
//             username: string,
//             role: string
//         }
//         token: {
//             username: string,
//             role: string
//         }
//     }
// }

// Ref: https://next-auth.js.org/getting-started/typescript#module-augmentation

import { DefaultSession, DefaultUser } from "next-auth"
import { JWT, DefaultJWT } from "next-auth/jwt"

declare module "next-auth" {
    interface Session {
        user: {
            id: string,
            username: string,
            role: string
        } & DefaultSession
    }

    interface User extends DefaultUser {
        username: string,
        role: string
    }
}

declare module "next-auth/jwt" {
    interface JWT extends DefaultJWT {
        username: string,
        role: string
    }
}