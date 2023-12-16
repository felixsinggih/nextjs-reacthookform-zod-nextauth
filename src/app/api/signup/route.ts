import { signUpSchema } from "@/lib/formschema/signUpSchema"
import { NextResponse } from "next/server"
import { hash } from "bcrypt"
import prisma from "@/lib/db"

export async function POST(req: Request) {
    const body = await req.json()

    const result = signUpSchema.safeParse(body)
    const { email, username, password, role } = signUpSchema.parse(body)
    let zodErrors = {}
    if (!result.success) {
        result.error.issues.forEach((issue) => {
            zodErrors = { ...zodErrors, [issue.path[0]]: issue.message }
        })
    }

    // cek email yang sudah ada 
    const existUserByEmail = await prisma.user.findUnique({
        where: { email }
    })
    if (existUserByEmail) {
        return NextResponse.json(
            { user: null, message: "Email sudah digunakan oleh pengguna lain!" },
            { status: 409 }
        )
    }

    // cek username yang sudah ada 
    const existUserByUsername = await prisma.user.findFirst({
        where: { username }
    })
    if (existUserByUsername) {
        return NextResponse.json(
            { user: null, message: "Username sudah digunakan oleh pengguna lain!" },
            { status: 409 }
        )
    }

    // buat user baru
    const hashedPassword = await hash(password, 10)
    const newUser = await prisma.user.create({
        data: {
            email,
            username,
            password: hashedPassword,
            role
        }
    })
    // ambil user dari variabel newUser 
    const { password: newUserPassword, ...rest } = newUser

    return NextResponse.json(
        Object.keys(zodErrors).length > 0
            ? { errors: zodErrors }
            : { user: rest, message: "User created successfully" }, { status: 201 }
    )
}