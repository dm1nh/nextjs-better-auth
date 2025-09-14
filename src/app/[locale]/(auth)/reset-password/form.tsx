"use client"

import { useState, useTransition } from "react"
import { useForm } from "react-hook-form"
import { useSearchParams } from "next/navigation"

import { Link, redirect } from "@/i18n/navigation"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { resetPassword } from "@/lib/actions/auth.action/reset-password"
import {
  resetPasswordFormInputSchema,
  type ResetPasswordFormInput,
} from "@/lib/schemas/auth.schema"

export function ResetPasswordForm() {
  const [isPending, startTransition] = useTransition()
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const form = useForm<ResetPasswordFormInput>({
    resolver: zodResolver(resetPasswordFormInputSchema),
    values: {
      newPassword: "",
    },
  })

  const searchParams = useSearchParams()

  async function onSubmit(values: ResetPasswordFormInput) {
    startTransition(async () => {
      const { data, error } = await resetPassword({
        ...values,
        token: searchParams.get("token")!,
      })
      if (error || !data) {
        setErrorMessage(error?.message ?? "Cannot reset your password. Try again later.")
        return
      }
      redirect({ href: "/sign-in", locale: "en" })
    })
  }

  return (
    <Card className="w-[360px]">
      <CardHeader>
        <CardTitle>Reset your password</CardTitle>
        <CardDescription>Enter your new password to continue</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? "Loading..." : "Continue"}
            </Button>
          </form>
        </Form>
        {errorMessage && (
          <p className="text-destructive bg-destructive/10 mt-4 rounded-md p-2 text-center">
            {errorMessage}
          </p>
        )}
      </CardContent>
      <CardFooter>
        <div className="text-muted-foreground w-full text-center">
          Still remember your password?{" "}
          <Link href="/sign-in" className="font-semibold underline-offset-4 hover:underline">
            Sign in
          </Link>
        </div>
      </CardFooter>
    </Card>
  )
}
