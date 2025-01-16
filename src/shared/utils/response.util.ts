// src/shared/utils/response.util.ts
import { Response } from 'express';

export class ResponseUtil {
  static success(res: Response,  message = 'Success', data: any = {}, statusCode : number = 200): void {
    res.status(statusCode).json({
      success: true,
      message,
      data,
    });
  }

  static error(res: Response, error : any, statusCode = 400): void {
    res.status(statusCode).json({
      success: false,
      error,
    });
  }
}