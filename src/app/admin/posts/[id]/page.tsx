
import { getPostById } from "@/lib/posts"
import { getUsers } from "@/lib/users"
import FormUpdatePost from "./formUpdatePost"

type Params = {
    params: {
        id: number
    }
}

type Post = {
    id: number;
    authorId: number;
    title: string;
    content: string;
    published: boolean;
    created_at: Date;
    updated_at: Date;
} | null

async function EditPostPage({ params: { id } }: Params) {
    const postData: Promise<Post> = getPostById(id)
    const post = await postData

    const usersData: Promise<User[]> = getUsers()
    const users = await usersData

    return (
        <>
            <h1>Edit Post</h1>
            <FormUpdatePost users={users} post={post} />
        </>
    )
}

export default EditPostPage