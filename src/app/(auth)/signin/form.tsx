"use client"

import { useForm } from "react-hook-form"

import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { signIn } from "@/lib/auth/client"

const signInFormInputSchema = z.object({
  email: z.email(),
  password: z.string(),
})

type SignInFormInput = z.infer<typeof signInFormInputSchema>

export function SignInForm() {
  const form = useForm<SignInFormInput>({
    resolver: zodResolver(signInFormInputSchema),
    values: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(values: SignInFormInput) {
    const { data, error } = await signIn.email({
      email: values.email,
      password: values.password,
      callbackURL: "/",
    })
    if (error) {
      throw new Error(error.message)
    }
  }

  return (
    <Form {...form}>
      <form className="space-y-2" onSubmit={form.handleSubmit(onSubmit)}>
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
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Continue</Button>
      </form>
    </Form>
  )
}
