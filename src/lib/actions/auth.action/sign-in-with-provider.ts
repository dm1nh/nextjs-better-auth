"use server"

import type { SignInWithProviderInput } from "@/lib/schemas/auth.schema"
import { authUseCase } from "@/lib/use-cases/auth.use-case"

export async function signInWithProvider(input: SignInWithProviderInput) {
  return await authUseCase.signInWithProvider(input)
}
