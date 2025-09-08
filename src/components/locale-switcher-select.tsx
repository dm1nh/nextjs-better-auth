"use client"

import { useTransition } from "react"
import type { Locale } from "next-intl"
import { useParams } from "next/navigation"

import { usePathname, useRouter } from "@/i18n/navigation"

import { Select, SelectContent, SelectGroup, SelectTrigger, SelectValue } from "./ui/select"

interface Props {
  children: React.ReactNode
  defaultValue: Locale
  label: string
}

export function LocaleSwitcherSelect({ children, defaultValue, label }: Props) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const pathname = usePathname()
  const params = useParams()

  function onSelectChange(value: string) {
    const nextLocale = value as Locale
    startTransition(() => {
      router.replace(
        // @ts-expect-error -- TypeScript will validate that only known `params`
        // are used in combination with a given `pathname`. Since the two will
        // always match for the current route, we can skip runtime checks.
        { pathname, params },
        { locale: nextLocale },
      )
    })
  }

  return (
    <Select onValueChange={onSelectChange} defaultValue={defaultValue} disabled={isPending}>
      <SelectTrigger className="border-0 shadow-none">
        <SelectValue placeholder={label} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>{children}</SelectGroup>
      </SelectContent>
    </Select>
  )
}
