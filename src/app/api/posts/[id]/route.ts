import prisma from "@/lib/db"
import { addPostSchema } from "@/lib/formschema/addPostSchema"
import { NextResponse } from "next/server"

export const PUT = async (request: Request, { params }: { params: { id: String } }) => {
    const body = await request.json()

    const result = addPostSchema.safeParse(body)
    const { authorId, title, content, published } = addPostSchema.parse(body)
    let zodErrors = {}
    if (!result.success) {
        result.error.issues.forEach((issue) => {
            zodErrors = { ...zodErrors, [issue.path[0]]: issue.message }
        })
    }

    const post = await prisma.post.update({
        where: {
            id: Number(params.id)
        },
        data: {
            authorId: Number(authorId),
            title,
            content,
            published: Boolean(Number(published))
        }
    })

    return NextResponse.json(
        Object.keys(zodErrors).length > 0
            ? { errors: zodErrors }
            : { post, message: "Post updated successfully" }, { status: 200 }
    )
}

export const DELETE = async (request: Request, { params }: { params: { id: String } }) => {
    const post = await prisma.post.delete({
        where: {
            id: Number(params.id)
        }
    })
    return NextResponse.json(post, { status: 200 })
}