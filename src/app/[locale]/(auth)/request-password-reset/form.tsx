"use client"

import { useState, useTransition } from "react"
import { useForm } from "react-hook-form"

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
import { requestPasswordReset } from "@/lib/actions/auth.action/request-password-reset"
import {
  requestPasswordResetFormInputSchema,
  type RequestPasswordResetFormInput,
} from "@/lib/schemas/auth.schema"

export function RequestPasswordResetForm() {
  const [isPending, startTransition] = useTransition()
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const form = useForm<RequestPasswordResetFormInput>({
    resolver: zodResolver(requestPasswordResetFormInputSchema),
    values: {
      email: "",
    },
  })

  async function onSubmit(values: RequestPasswordResetFormInput) {
    startTransition(async () => {
      const { data, error } = await requestPasswordReset(values)
      if (error || !data) {
        setErrorMessage(error?.message ?? "Cannot send email to your inboxes.")
        return
      }
      redirect({ href: "/request-sent", locale: "en" })
    })
  }

  return (
    <Card className="w-[360px]">
      <CardHeader>
        <CardTitle>Request password reset</CardTitle>
        <CardDescription>Enter your email below to send a request</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? "Loading..." : "Send"}
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
          <Link href="/sign-up" className="font-semibold underline-offset-4 hover:underline">
            Sign in
          </Link>
        </div>
      </CardFooter>
    </Card>
  )
}
