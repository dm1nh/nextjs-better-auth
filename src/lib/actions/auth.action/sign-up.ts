"use server"

import type { SignUpInput } from "@/lib/schemas/auth.schema"
import { authUseCase } from "@/lib/use-cases/auth.use-case"

export async function signUp(input: SignUpInput) {
  return await authUseCase.signUp(input)
}
