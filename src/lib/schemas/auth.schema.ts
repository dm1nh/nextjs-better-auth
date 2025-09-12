import { z } from "zod"

/*
 * Sign in
 * */
export const signInWithEmailFormInputSchema = z.object({
  email: z.email({ error: "Invalid email address" }),
  password: z.string(),
})
export type SignInWithEmailFormInput = z.infer<typeof signInWithEmailFormInputSchema>

export const signInWithEmailInputSchema = signInWithEmailFormInputSchema
export type SignInWithEmailInput = z.infer<typeof signInWithEmailInputSchema>

export const signInWithProviderInputSchema = z.object({
  provider: z.enum(["google"]).default("google"),
})
export type SignInWithProviderInput = z.infer<typeof signInWithProviderInputSchema>

/*
 * Sign up
 * */
export const signUpFormInputSchema = z.object({
  email: z.email({ error: "Invalid email address" }),
  name: z.string().min(1, { error: "Name is required" }),
  password: z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/, {
    error: "Password did not match with pattern",
  }),
})
export type SignUpFormInput = z.infer<typeof signUpFormInputSchema>

export const signUpInputSchema = signUpFormInputSchema
export type SignUpInput = z.infer<typeof signUpInputSchema>

/*
 * Request password reset
 * */
export const requestPasswordResetFormInputSchema = z.object({
  email: z.email({ error: "Invalid email address" }),
})
export type RequestPasswordResetFormInput = z.infer<typeof requestPasswordResetFormInputSchema>

export const requestPasswordResetInputSchema = requestPasswordResetFormInputSchema
export type RequestPasswordResetInput = z.infer<typeof requestPasswordResetInputSchema>

/*
 * Reset password
 * */
export const resetPasswordFormInputSchema = z.object({
  newPassword: z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/, {
    error: "Password did not match with pattern",
  }),
})
export type ResetPasswordFormInput = z.infer<typeof resetPasswordFormInputSchema>

export const resetPasswordInputSchema = resetPasswordFormInputSchema.extend({
  token: z.string({ error: "Invalid token" }),
})
export type ResetPasswordInput = z.infer<typeof resetPasswordInputSchema>
