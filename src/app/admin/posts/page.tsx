import { getPosts } from '@/lib/posts'
import Link from 'next/link'
import React from 'react'
import DeletePost from './deletePost'

async function PostsPage() {
    const postsData = getPosts()
    const posts = await postsData

    const content = posts.map((post, index) => (
        <tr key={post.id}>
            <td>{index + 1}</td>
            <td>{post.title}</td>
            <td>{post.content}</td>
            <td>{post.author.username}</td>
            <td>
                <Link href={`/admin/posts/${post.id}`} className='btn btn-sm btn-success'>Edit</Link>
                <DeletePost post={post} />
            </td>
        </tr>
    ))

    return (
        <>
            <Link href='/admin/posts/add' className='btn btn-primary'>Add New</Link>

            <div className='mt-3'>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Content</th>
                            <th>Author</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {content}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default PostsPage