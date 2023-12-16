import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"
import Link from "next/link"
import SignOut from "./signOut"

async function NavbarComp() {
    const session = await getServerSession(authOptions)
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container">
                <Link className="navbar-brand" href="/">Navbar</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {session?.user ? (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" href="/admin">Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" href="/admin/posts">Posts</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" href="/admin/admin">Admin Page</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" href="/admin/user">User Page</Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" href="/rhf">React Hook Form</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" href="/zod">React Hook Form + Zod</Link>
                                </li>
                            </>
                        )}
                    </ul>
                    <div className="d-flex">
                        {session?.user ? (
                            <SignOut />
                        ) : (
                            <Link href='/signin' className="btn btn-outline-success">Sign In</Link>
                        )}

                    </div>
                </div>
            </div>
        </nav>
    )
}

export default NavbarComp