// src/core/exceptions/conflict.exception.ts
import { HttpException } from './http.exception';

export class ConflictException extends HttpException {
  constructor(
    message: string = 'Resource conflict',
    public readonly details?: Record<string, any> // Flexible for additional info
  ) {
    super(409, message);
  }
}