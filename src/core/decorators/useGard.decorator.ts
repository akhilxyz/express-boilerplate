import { JWTConfig } from "@/config/jwt.config";
import { JwtUtil, ResponseUtil } from "@/shared/utils";
import { Request, Response, NextFunction } from "express";

export function useGuard() {
  return function (
    _target: any,
    _propertyKey: string | symbol,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (req: Request | any, res: Response, next: NextFunction) {
      const { authType } = JWTConfig.create();
      
      const token = req.headers[authType];
      if (!token) {
        return ResponseUtil.error(res, "Authorization header is missing", 401)
      }

      if (!token) {
        return ResponseUtil.error(res, "Token is missing", 401)
      }

      try {
        const decoded = JwtUtil.verifyAccessToken(token)
        req["user"] = decoded; // Add user details to request object for later use
        return originalMethod.apply(this, [req, res, next]);
      } catch (error) {
        return ResponseUtil.error(res, "Invalid or expired token", 401)
      }
    };

    return descriptor;
  };
}
