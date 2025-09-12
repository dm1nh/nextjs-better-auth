import { env } from "@/env"
import { createAuthClient } from "better-auth/react"

export const {
  signIn,
  signUp,
  signOut,
  requestPasswordReset,
  resetPassword,
  changePassword,
  changeEmail,
  useSession,
} = createAuthClient({
  baseURL: env.NEXT_PUBLIC_BASE_URL,
})
