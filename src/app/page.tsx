import Link from "next/link"

import { Button } from "@/components/ui/button"
import { getSession } from "@/lib/auth/server"

export default async function Home() {
  const session = await getSession()

  return (
    <div>
      {session?.user ? (
        <p>Welcome to Next.js Better Auth, {session.user.email}</p>
      ) : (
        <Link href="/signin">
          <Button>Sign in</Button>
        </Link>
      )}
    </div>
  )
}
