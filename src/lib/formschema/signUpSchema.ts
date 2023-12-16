import { z } from "zod"

export const signUpSchema = z.object({
    email: z.string().email(),
    username: z.string().min(1),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
    role: z.string()
}).refine(data => data.password === data.confirmPassword, {
    message: "Password must match",
    path: ["confirmPassword"]
}).refine(data => data.role !== 'Select Role', {
    message: "Silahkan pilih!",
    path: ["role"]
})

export type SignUpSchema = z.infer<typeof signUpSchema>