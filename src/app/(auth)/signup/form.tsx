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
import { signUp } from "@/lib/auth/client"

const signUpFormInputSchema = z.object({
  name: z.string(),
  email: z.email(),
  password: z.string(),
})

type SignUpFormInput = z.infer<typeof signUpFormInputSchema>

export function SignUpForm() {
  const form = useForm<SignUpFormInput>({
    resolver: zodResolver(signUpFormInputSchema),
    values: {
      name: "",
      email: "",
      password: "",
    },
  })

  async function onSubmit(values: SignUpFormInput) {
    const { data, error } = await signUp.email({
      email: values.email,
      password: values.password,
      name: values.name,
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
        <Button type="submit">Create account</Button>
      </form>
    </Form>
  )
}
