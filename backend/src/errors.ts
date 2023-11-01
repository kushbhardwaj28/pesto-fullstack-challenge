export class NotFoundError extends Error {
  constructor(message?: string) {
    super(message ? message : 'Not Found');
    Error.captureStackTrace(this, NotFoundError);
    this.name = 'NotFoundError';
  }
}

export class UnAuthorizedError extends Error {
  constructor(message?: string) {
    super(message ? message : 'UnAuthorized');
    Error.captureStackTrace(this, UnAuthorizedError);
    this.name = 'UnAuthorizedError';
  }
}
