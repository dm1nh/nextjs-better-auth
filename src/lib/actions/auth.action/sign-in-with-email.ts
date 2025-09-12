"use server"

import type { SignInWithEmailInput } from "@/lib/schemas/auth.schema"
import { authUseCase } from "@/lib/use-cases/auth.use-case"

export async function signInWithEmail(input: SignInWithEmailInput) {
  return await authUseCase.signInWithEmail(input)
}
