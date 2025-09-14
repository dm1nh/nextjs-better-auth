import { headers } from "next/headers"

import { env } from "@/env"

import { auth } from "@/lib/auth"
import type {
  RequestPasswordResetInput,
  ResetPasswordInput,
  SignInWithEmailInput,
  SignInWithProviderInput,
  SignUpInput,
} from "@/lib/schemas/auth.schema"
import { generateResponse, handleError } from "@/lib/utils/server"
import { authValidation } from "@/lib/validations/auth.validation"

export const authUseCase = {
  async signInWithEmail(input: SignInWithEmailInput) {
    try {
      authValidation.signInWithEmail(input)
      const data = await auth.api.signInEmail({
        body: {
          ...input,
          rememberMe: true,
          callbackURL: `${env.NEXT_PUBLIC_BASE_URL}/callback`,
        },
        headers: await headers(),
      })
      return generateResponse(data)
    } catch (error) {
      return handleError(error, "Failed to sign in with email")
    }
  },
  async signInWithProvider(input: SignInWithProviderInput) {
    try {
      authValidation.signInWithProvider(input)
      const data = await auth.api.signInSocial({
        body: {
          provider: input.provider,
        },
        headers: await headers(),
      })
      return generateResponse(data)
    } catch (error) {
      return handleError(error, "Failed to sign in with OAuth")
    }
  },
  async signUp(input: SignUpInput) {
    try {
      authValidation.signUp(input)
      const data = await auth.api.signUpEmail({
        body: {
          ...input,
          callbackURL: `${env.NEXT_PUBLIC_BASE_URL}/callback`,
        },
        headers: await headers(),
      })
      return generateResponse(data)
    } catch (error) {
      return handleError(error, "Failed to sign up new user")
    }
  },
  async requestPasswordReset(input: RequestPasswordResetInput) {
    try {
      authValidation.requestPasswordReset(input)
      const data = await auth.api.requestPasswordReset({
        body: {
          ...input,
          redirectTo: `${env.NEXT_PUBLIC_BASE_URL}/reset-password`,
        },
        headers: await headers(),
      })
      return generateResponse(data)
    } catch (error) {
      return handleError(error, "Failed to request password reset")
    }
  },
  async resetPassword(input: ResetPasswordInput) {
    try {
      authValidation.resetPassword(input)
      const data = await auth.api.resetPassword({
        body: {
          ...input,
        },
        headers: await headers(),
      })
      return generateResponse(data)
    } catch (error) {
      return handleError(error, "Failed to reset password")
    }
  },
  async signOut() {
    try {
      const data = await auth.api.signOut({
        headers: await headers(),
      })
      return generateResponse(data)
    } catch (error) {
      return handleError(error, "Cannot sign out")
    }
  },
}
