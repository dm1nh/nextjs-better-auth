import { getTranslations } from "next-intl/server"
import Link from "next/link"

import { LocaleSwitcher } from "@/components/locale-switcher"
import { Button } from "@/components/ui/button"
import { getServerSession } from "@/lib/auth/server"

export default async function Home() {
  const session = await getServerSession()
  const t = await getTranslations("HomePage")

  return (
    <div>
      <LocaleSwitcher />
      {session?.user ? (
        <p>
          {t("title")}, {session.user.email}
        </p>
      ) : (
        <Link href="/signin">
          <Button>Sign in</Button>
        </Link>
      )}
    </div>
  )
}
