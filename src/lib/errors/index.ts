export class BaseError extends Error {
  public code: number
  constructor(
    public message: string,
    public options?: ErrorOptions,
  ) {
    super(message, options)
    this.code = 500
    this.name = "BaseError"
  }
}

export class InputError extends BaseError {
  constructor(
    public message: string = "Invalid input",
    options?: ErrorOptions,
  ) {
    super(message, options)
    this.code = 400
    this.name = "InputError"
  }
}

export class NotFoundError extends BaseError {
  constructor(
    public message: string = "Resource not found",
    options?: ErrorOptions,
  ) {
    super(message, options)
    this.code = 404
    this.name = "NotFoundError"
  }
}

export class UnauthenticatedError extends BaseError {
  constructor(
    public message: string = "Unauthenticated",
    options?: ErrorOptions,
  ) {
    super(message, options)
    this.code = 401
    this.name = "UnauthenticatedError"
  }
}

export class UnauthorizedError extends BaseError {
  constructor(
    public message: string = "Unauthorized",
    options?: ErrorOptions,
  ) {
    super(message, options)
    this.code = 401
    this.name = "UnauthorizedError"
  }
}

export class ForbiddenError extends BaseError {
  constructor(
    public message: string = "Forbidden",
    options?: ErrorOptions,
  ) {
    super(message, options)
    this.code = 403
    this.name = "ForbiddenError"
  }
}

export class DatabaseError extends BaseError {
  constructor(
    public message: string = "Database operation error",
    options?: ErrorOptions,
  ) {
    super(message, options)
    this.name = "DatabaseError"
  }
}

export class InternalServerError extends BaseError {
  constructor(
    public message: string = "Internal server error",
    options?: ErrorOptions,
  ) {
    super(message, options)
    this.name = "InternalServerError"
  }
}
