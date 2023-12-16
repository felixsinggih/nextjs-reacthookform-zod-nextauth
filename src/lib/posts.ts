import prisma from "./db"

export async function getPosts() {
    const res = await prisma.post.findMany({
        select: {
            id: true,
            title: true,
            content: true,
            author: true,
        }
    })
    return res
}

export async function getPostById(id: number) {
    const res = await prisma.post.findUnique({
        where: { id: Number(id) }
    })
    return res
}