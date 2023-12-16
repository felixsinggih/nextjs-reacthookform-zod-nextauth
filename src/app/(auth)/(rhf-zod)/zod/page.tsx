'use client'

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { signUpSchema, SignUpSchema } from "@/lib/formschema/signUpSchema"

// kalo jadi 1 form
// import { z } from "zod"

// kalo jadi 1 form
// const signUpSchema = z.object({
//     email: z.string().email(),
//     username: z.string(),
//     password: z.string().min(6, "Password must be at least 6 characters"),
//     confirmPassword: z.string()
// }).refine(data => data.password === data.confirmPassword, {
//     message: "Password must match",
//     path: ["confirmPassword"]
// })

// type SignUpSchema = z.infer<typeof signUpSchema>

function Zod() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
        setError
    } = useForm<SignUpSchema>({
        resolver: zodResolver(signUpSchema)
    })

    const onSubmit = async (data: SignUpSchema) => {
        // await new Promise((resolve) => setTimeout(resolve, 1000))
        const response = await fetch('/api/signup', {
            method: 'POST',
            body: JSON.stringify({
                email: data.email,
                username: data.username,
                password: data.password,
                confirmPassword: data.confirmPassword,
                role: data.role
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

            if (errors.email) {
                setError('email', {
                    type: 'server',
                    message: errors.email
                })
            } else if (errors.username) {
                setError('username', {
                    type: 'server',
                    message: errors.username
                })
            } else if (errors.password) {
                setError('password', {
                    type: 'server',
                    message: errors.password
                })
            } else if (errors.confirmPassword) {
                setError('confirmPassword', {
                    type: 'server',
                    message: errors.confirmPassword
                })
            } else if (errors.role) {
                setError('role', {
                    type: 'server',
                    message: errors.role
                })
            } else {
                alert('Something went wrong!')
            }
        }

        reset()
    }

    return (
        <>
            <h1>React Hook Form + Zod</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                        {
                        ...register('email')}
                        type="email"
                        className={`form-control ${errors.email && 'is-invalid'}`} />
                    {errors.email && (
                        <div className="invalid-feedback">
                            {`${errors.email.message}`}
                        </div>
                    )}
                </div>
                <div className="mb-3">
                    <label className="form-label">Username</label>
                    <input
                        {
                        ...register('username')}
                        type="text"
                        className={`form-control ${errors.username && 'is-invalid'}`} />
                    {errors.username && (
                        <div className="invalid-feedback">
                            {`${errors.username.message}`}
                        </div>
                    )}
                </div>
                <div className="mb-3">
                    <label className="form-label">Role</label>
                    <select
                        {...register('role')}
                        className={`form-select ${errors.role && 'is-invalid'}`}
                        required>
                        <option selected disabled>Select Role</option>
                        <option value="admin">Admin</option>
                        <option value="user">User</option>
                    </select>
                    {errors.role && (
                        <div className="invalid-feedback">
                            {`${errors.role.message}`}
                        </div>
                    )}
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input
                        {
                        ...register('password')}
                        type="password"
                        className={`form-control ${errors.password && 'is-invalid'}`} />
                    {errors.password && (
                        <div className="invalid-feedback">
                            {`${errors.password.message}`}
                        </div>
                    )}
                </div>
                <div className="mb-3">
                    <label className="form-label">Confirm Password</label>
                    <input
                        {
                        ...register('confirmPassword')}
                        type="password"
                        className={`form-control ${errors.confirmPassword && 'is-invalid'}`} />
                    {errors.confirmPassword && (
                        <div className="invalid-feedback">
                            {`${errors.confirmPassword.message}`}
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
        </>
    )
}

export default Zod