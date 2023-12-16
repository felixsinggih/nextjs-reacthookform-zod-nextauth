import { z } from "zod"

export const addPostSchema = z.object({
    title: z.string().min(3),
    content: z.string().min(3),
    published: z.string(),
    authorId: z.string()
}).refine(data => data.published !== 'Select Publish', {
    message: "Silahkan pilih!",
    path: ["published"]
}).refine(data => data.authorId !== 'Select Author', {
    message: "Silahkan pilih!",
    path: ["authorId"]
})

export type TAddPostSchema = z.infer<typeof addPostSchema>