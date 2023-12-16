'use client'

import { useForm } from "react-hook-form"
import type { FieldValues } from "react-hook-form"

function ReactHookForm() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
        getValues
    } = useForm()

    const onSubmit = async (data: FieldValues) => {
        await new Promise((resolve) => setTimeout(resolve, 1000))
        reset()
    }

    return (
        <>
            <h1>React Hook Form</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                        {
                        ...register('email', {
                            required: "Email is required!"
                        })}
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
                        ...register('username', {
                            required: "Username is required!"
                        })}
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
                        {...register('role', {
                            required: "Role is required!",
                        })}
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
                        ...register('password', {
                            required: "Password is required!",
                            minLength: {
                                value: 6,
                                message: "Password must be at least 6 characters"
                            }
                        })}
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
                        ...register('confirmPassword', {
                            required: "Confirm password is required!",
                            validate: (value) =>
                                value === getValues('password') || "Password must match"
                        })}
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

export default ReactHookForm