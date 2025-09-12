import { APIError } from "better-auth"

import { BaseError } from "@/lib/errors"

export function handleError(error: Error | BaseError | unknown, message: string) {
  console.log(error)
  if (error instanceof BaseError) {
    return {
      data: null,
      error: {
        message: error.message,
        code: error.code,
      },
    }
  }
  if (error instanceof APIError) {
    return {
      data: null,
      error: {
        message: error.message,
        code: 401,
      },
    }
  }
  return { data: null, error: { message, code: 500 } }
}

export function generateResponse<T>(
  data: T,
  error?: {
    message: string
    code: number
  },
) {
  return {
    data,
    error: error ?? null,
  }
}
