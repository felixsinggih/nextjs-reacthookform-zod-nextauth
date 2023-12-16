import { authOptions } from "@/lib/auth"
import { getServerSession } from 'next-auth'

async function AdminPage() {
    const session = await getServerSession(authOptions)
    console.log(session)

    return (
        <div>Welcome back, username: {session?.user.username} | role: {session?.user.role}</div>
    )
}

export default AdminPage