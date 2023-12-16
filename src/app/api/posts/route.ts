import { NextResponse } from "next/server"
import { addPostSchema } from "@/lib/formschema/addPostSchema"
import prisma from "@/lib/db"

export const POST = async (request: Request) => {
    const body = await request.json()

    const result = addPostSchema.safeParse(body)
    const { authorId, title, content, published } = addPostSchema.parse(body)
    let zodErrors = {}
    if (!result.success) {
        result.error.issues.forEach((issue) => {
            zodErrors = { ...zodErrors, [issue.path[0]]: issue.message }
        })
    }

    const post = await prisma.post.create({
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
            : { post, message: "Post created successfully" }, { status: 201 }
    )
}