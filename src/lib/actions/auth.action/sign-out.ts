"use server"

import { authUseCase } from "@/lib/use-cases/auth.use-case"

export async function signOut() {
  return await authUseCase.signOut()
}
