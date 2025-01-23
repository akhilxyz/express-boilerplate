// src/core/exceptions/unauthorized.exception.ts
import { HttpException } from "./http.exception";

export class UnauthorizedException extends HttpException {
  constructor(message: string = 'Unauthorized') {
    super(401, message);
  }
}