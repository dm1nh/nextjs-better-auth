import { InputError } from "@/lib/errors"
import {
  requestPasswordResetInputSchema,
  resetPasswordInputSchema,
  signInWithEmailInputSchema,
  signInWithProviderInputSchema,
  signUpInputSchema,
  type RequestPasswordResetInput,
  type ResetPasswordInput,
  type SignInWithEmailInput,
  type SignInWithProviderInput,
  type SignUpInput,
} from "@/lib/schemas/auth.schema"

export const authValidation = {
  signInWithEmail(input: SignInWithEmailInput) {
    const { error } = signInWithEmailInputSchema.safeParse(input)

    if (error) {
      throw new InputError()
    }
  },
  signInWithProvider(input: SignInWithProviderInput) {
    const { error } = signInWithProviderInputSchema.safeParse(input)

    if (error) {
      throw new InputError()
    }
  },
  signUp(input: SignUpInput) {
    const { error } = signUpInputSchema.safeParse(input)

    if (error) {
      throw new InputError()
    }
  },
  requestPasswordReset(input: RequestPasswordResetInput) {
    const { error } = requestPasswordResetInputSchema.safeParse(input)

    if (error) {
      throw new InputError()
    }
  },
  resetPassword(input: ResetPasswordInput) {
    const { error } = resetPasswordInputSchema.safeParse(input)

    if (error) {
      throw new InputError()
    }
  },
}
