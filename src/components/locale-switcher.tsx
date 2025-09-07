import { useLocale, useTranslations } from "next-intl"

import { routing } from "@/i18n/routing"

import { LocaleSwitcherSelect } from "./locale-switcher-select"
import { SelectItem } from "./ui/select"

export function LocaleSwitcher() {
  const t = useTranslations("LocaleSwitcher")
  const locale = useLocale()

  return (
    <LocaleSwitcherSelect defaultValue={locale} label={t("label")}>
      {routing.locales.map((cur) => (
        <SelectItem key={cur} value={cur}>
          {t("locale", { locale: cur })}
        </SelectItem>
      ))}
    </LocaleSwitcherSelect>
  )
}
