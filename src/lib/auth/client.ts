import { env } from "@/env"
import { createAuthClient } from "better-auth/react"

export const { signIn, signUp, signOut, useSession } = createAuthClient({
  baseURL: env.NEXT_PUBLIC_BASE_URL,
})
