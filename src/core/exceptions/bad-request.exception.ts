// src/core/exceptions/bad-request.exception.ts
import { HttpException } from './http.exception';

export class BadRequestException extends HttpException {
  constructor(
    message: string = 'Bad Request',
    public readonly errors?: Record<string, string[]>
  ) {
    super(400, message);
  }
}