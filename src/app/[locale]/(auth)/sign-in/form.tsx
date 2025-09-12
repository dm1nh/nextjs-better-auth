"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"

import { Link } from "@/i18n/navigation"
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
import { signInWithEmail } from "@/lib/actions/auth.action/sign-in-with-email"
import { signInWithProvider } from "@/lib/actions/auth.action/sign-in-with-provider"
import {
  signInWithEmailFormInputSchema,
  type SignInWithEmailFormInput,
} from "@/lib/schemas/auth.schema"

export function SignInForm() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const form = useForm<SignInWithEmailFormInput>({
    resolver: zodResolver(signInWithEmailFormInputSchema),
    values: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(values: SignInWithEmailFormInput) {
    const { data, error } = await signInWithEmail(values)
    if (error || !data) {
      setErrorMessage(error?.message ?? "Invalid sign in process")
    }
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
        <CardTitle>Sign in to your account</CardTitle>
        <CardDescription>Enter your email below to sign in to your account</CardDescription>
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
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center">
                    <FormLabel>Password</FormLabel>
                    <Link
                      href="/forgot-password"
                      className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                      tabIndex={-1}
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Continue
            </Button>
            <Separator className="shrink" />
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => onSocialButtonClick("google")}
            >
              Login with Google
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
          Haven&apos;t an account?{" "}
          <Link href="/sign-up" className="font-semibold underline-offset-4 hover:underline">
            Sign up
          </Link>
        </div>
      </CardFooter>
    </Card>
  )
}
