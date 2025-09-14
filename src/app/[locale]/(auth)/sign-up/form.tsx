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
import { Separator } from "@/components/ui/separator"
import { signInWithProvider } from "@/lib/actions/auth.action/sign-in-with-provider"
import { signUp } from "@/lib/actions/auth.action/sign-up"
import { signUpFormInputSchema, type SignUpFormInput } from "@/lib/schemas/auth.schema"

export function SignUpForm() {
  const [isPending, startTransition] = useTransition()
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const form = useForm<SignUpFormInput>({
    resolver: zodResolver(signUpFormInputSchema),
    values: {
      email: "",
      name: "",
      password: "",
    },
  })

  async function onSubmit(values: SignUpFormInput) {
    startTransition(async () => {
      const { data, error } = await signUp(values)
      if (error || !data) {
        setErrorMessage(error?.message ?? "Invalid sign in process")
        return
      }
      redirect({ href: "/sign-in", locale: "en" })
    })
  }

  async function onSocialButtonClick(provider: "google") {
    const { data, error } = await signInWithProvider({ provider })
    if (error || !data) {
      setErrorMessage(error?.message ?? "Invalid OAuth")
    }
  }

  return (
    <Card className="w-[360px]">
      <CardHeader>
        <CardTitle>Sign up your account</CardTitle>
        <CardDescription>Enter your email and password to continue</CardDescription>
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
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
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
              Continue
            </Button>
            <Separator className="shrink" />
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => onSocialButtonClick("google")}
            >
              Continue with Google
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
          Already have an account?{" "}
          <Link href="/sign-in" className="font-semibold underline-offset-4 hover:underline">
            Sign in
          </Link>
        </div>
      </CardFooter>
    </Card>
  )
}
