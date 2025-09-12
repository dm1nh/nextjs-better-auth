"use server"

import type { RequestPasswordResetInput } from "@/lib/schemas/auth.schema"
import { authUseCase } from "@/lib/use-cases/auth.use-case"

export async function requestPasswordReset(input: RequestPasswordResetInput) {
  return await authUseCase.requestPasswordReset(input)
}
