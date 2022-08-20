export default class ApiError extends Error {
  constructor(
    readonly name: string,
    readonly statusCode: number,
    readonly message: string,
    readonly source?: Error,
    readonly info?: Error
  ) {
    super()
  }
}

export class NotFoundError extends ApiError {
  constructor(readonly message: string = 'Not Found', source?: Error | any) {
    super('Not Found', 404, message, source)
  }
}

export class ForbiddenError extends ApiError {
  constructor(readonly message: string = 'Forbidden', source?: Error | any) {
    super('Forbidden', 403, message, source)
  }
}

export class InternalServerError extends ApiError {
  constructor(
    readonly message: string = 'Internal Server Error',
    source?: Error | any
  ) {
    super('Internal Server Error', 500, message, source)
  }
}

export class UnauthorizedError extends ApiError {
  constructor(
    readonly message: string = 'Unauthorized Request',
    source?: Error | any
  ) {
    super('Unauthorized', 401, message, source)
  }
}

export class BadRequestError extends ApiError {
  constructor(readonly message: string = 'Bad Request', source?: Error | any) {
    super('Bad Request', 400, message, source)
  }
}
