import { getTranslations } from "next-intl/server"

import { Link } from "@/i18n/navigation"

import { LocaleSwitcher } from "@/components/locale-switcher"
import { Button } from "@/components/ui/button"
import { signOut } from "@/lib/actions/auth.action/sign-out"
import { getServerSession } from "@/lib/auth/server"

export default async function Home() {
  const session = await getServerSession()
  const t = await getTranslations("HomePage")

  return (
    <div>
      <LocaleSwitcher />
      {session?.user && (
        <p>
          {t("title")}, {session.user.email}
        </p>
      )}
      {session?.user ? (
        <Button variant="destructive" onClick={signOut}>
          Sign out
        </Button>
      ) : (
        <Link href="/sign-in">
          <Button>Sign in</Button>
        </Link>
      )}
    </div>
  )
}
