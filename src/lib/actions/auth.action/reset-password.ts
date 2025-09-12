"use server"

import type { ResetPasswordInput } from "@/lib/schemas/auth.schema"
import { authUseCase } from "@/lib/use-cases/auth.use-case"

export async function resetPassword(input: ResetPasswordInput) {
  return await authUseCase.resetPassword(input)
}
