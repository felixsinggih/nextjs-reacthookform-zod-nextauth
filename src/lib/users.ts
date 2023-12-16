import prisma from "./db"

export async function getUsers() {
    const res = await prisma.user.findMany({
        select: {
            id: true,
            username: true
        }
    })
    return res
}