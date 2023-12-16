'use client'
import { useRouter } from "next/navigation"

type Post = {
    "id": number,
    "title": string,
    "content": string,
    "author": {
        "id": number,
        "email": string,
        "username": string,
        "password": string,
        "created_at": Date,
        "updated_at": Date
    }
}

function DeletePost({ post }: { post: Post }) {
    const router = useRouter()

    const handleDelete = async (id: Number) => {
        await fetch(`/api/posts/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        router.refresh()
    }

    return (
        <button
            onClick={() => handleDelete(post.id)}
            type="button"
            className="btn btn-sm btn-danger mx-3">
            Delete
        </button>
    )
}

export default DeletePost