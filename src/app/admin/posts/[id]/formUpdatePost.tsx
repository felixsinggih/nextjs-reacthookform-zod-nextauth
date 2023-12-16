'use client'

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { addPostSchema, TAddPostSchema } from "@/lib/formschema/addPostSchema"
import { useRouter } from "next/navigation"
// import type { Post } from '@prisma/client'

type Post = {
    id: number;
    authorId: number;
    title: string;
    content: string;
    published: boolean;
    created_at: Date;
    updated_at: Date;
} | null

function FormUpdatePost({ users, post }: { users: User[], post: Post }) {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting, defaultValues },
        reset,
        setError,
    } = useForm<TAddPostSchema>({
        resolver: zodResolver(addPostSchema)
    })
    const router = useRouter()

    const onSubmit = async (data: TAddPostSchema) => {
        const response = await fetch(`/api/posts/${post?.id}`, {
            method: 'PUT',
            body: JSON.stringify({
                authorId: data.authorId,
                title: data.title,
                content: data.content,
                published: data.published
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const responseData = await response.json()

        if (!response.ok) {
            alert(responseData.message)
            console.log(responseData.message)
            return
        }

        if (responseData.errors) {
            const errors = responseData.errors

            if (errors.title) {
                setError('title', {
                    type: 'server',
                    message: errors.title
                })
            } else if (errors.content) {
                setError('content', {
                    type: 'server',
                    message: errors.content
                })
            } else if (errors.published) {
                setError('published', {
                    type: 'server',
                    message: errors.published
                })
            } else if (errors.authorId) {
                setError('authorId', {
                    type: 'server',
                    message: errors.authorId
                })
            } else {
                alert('Something went wrong!')
            }
        }

        // reset()
        if (responseData?.error) {
            console.log(responseData.error)
            alert("Oops, something went wrong!")
        } else {
            router.refresh()
            router.push('/admin/posts')
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
                <label className="form-label">Title</label>
                <input
                    {...register('title')}
                    defaultValue={post?.title}
                    type="text"
                    className={`form-control ${errors.title && 'is-invalid'}`} />
                {errors.title && (
                    <div className="invalid-feedback">
                        {`${errors.title.message}`}
                    </div>
                )}
            </div>
            <div className="mb-3">
                <label className="form-label">Content</label>
                <input
                    {...register('content')}
                    defaultValue={post?.content}
                    type="text"
                    className={`form-control ${errors.content && 'is-invalid'}`} />
                {errors.content && (
                    <div className="invalid-feedback">
                        {`${errors.content.message}`}
                    </div>
                )}
            </div>
            <div className="mb-3">
                <label className="form-label">Author</label>
                <select
                    {...register('authorId')}
                    defaultValue={post?.authorId}
                    className={`form-select ${errors.authorId && 'is-invalid'}`}>
                    <option selected disabled>Select Author</option>
                    {users.map((user) => (
                        <option value={user.id} key={user.id}>{user.username}</option>
                    ))}
                </select>
                {errors.authorId && (
                    <div className="invalid-feedback">
                        {`${errors.authorId.message}`}
                    </div>
                )}
            </div>
            <div className="mb-3">
                <label className="form-label">Publish</label>
                <select
                    {...register('published')}
                    defaultValue={Number(post?.published)}
                    className={`form-select ${errors.published && 'is-invalid'}`}
                    required>
                    <option selected disabled>Select Publish</option>
                    <option value="0">No</option>
                    <option value="1">Yes</option>
                </select>
                {errors.published && (
                    <div className="invalid-feedback">
                        {`${errors.published.message}`}
                    </div>
                )}
            </div>

            <button
                disabled={isSubmitting}
                type="submit"
                className="btn btn-primary">
                Submit
            </button>
        </form>
    )
}

export default FormUpdatePost