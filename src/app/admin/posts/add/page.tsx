
import { getUsers } from "@/lib/users"
import FormAddPost from "./formAddPost"

async function AddPostPage() {
    const usersData: Promise<User[]> = getUsers()
    const users = await usersData

    return (
        <>
            <h1>Add New Post</h1>
            <FormAddPost users={users} />
        </>
    )
}

export default AddPostPage