import { Logo } from "@/components/logo"

export default function AuthLayout({ children }: { children: Readonly<React.ReactNode> }) {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-12">
      <Logo />
      <div>{children}</div>
    </div>
  )
}
