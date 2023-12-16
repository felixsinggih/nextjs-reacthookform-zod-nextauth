'use client'

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { signInSchema, SignInSchema } from "@/lib/formschema/signInSchema"
import { signIn } from 'next-auth/react'
import { useRouter } from "next/navigation"

function Signin() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
        setError
    } = useForm<SignInSchema>({
        resolver: zodResolver(signInSchema)
    })
    const router = useRouter()

    const onSubmit = async (data: SignInSchema) => {
        const signInData = await signIn('credentials', {
            email: data.email,
            password: data.password,
            redirect: false
        })
        console.log(signInData)

        if (signInData?.error) {
            console.log(signInData.error)

            // toast({
            //     title: "Error!",
            //     description: "Oops, something went wrong!",
            //     variant: 'destructive'
            // })
            alert("Oops, something went wrong!")
        } else {
            router.refresh()
            router.push('/admin')
        }
    }

    return (
        <>
            <h1>Sign In</h1>
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

export default Signin