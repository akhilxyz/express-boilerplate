import { JWTConfig } from '@/config/jwt.config';
import jwt from 'jsonwebtoken';

export class JwtUtil {
  // The secret keys for signing JWT (Access and Refresh tokens)
  private static accessSecretKey: string = JWTConfig.create().accessSecretKey;
  private static refreshSecretKey: string = JWTConfig.create().refreshSecretKey;

  // Generate an Access Token (short-lived)
  static generateAccessToken(payload: object, expiresIn: string | number = '1h'): string {
    return jwt.sign(payload, this.accessSecretKey, { expiresIn });
  }

  // Generate a Refresh Token (longer-lived)
  static generateRefreshToken(payload: object, expiresIn: string | number = '7d'): string {
    return jwt.sign(payload, this.refreshSecretKey, { expiresIn });
  }

  // Verify an Access Token
  static verifyAccessToken(token: string): object | string {
    try {
      return jwt.verify(token, this.accessSecretKey);
    } catch (error) {
      throw new Error('Invalid or expired access token');
    }
  }

  // Verify a Refresh Token
  static verifyRefreshToken(token: string): object | string {
    try {
      return jwt.verify(token, this.refreshSecretKey);
    } catch (error) {
      throw new Error('Invalid or expired refresh token');
    }
  }

  // Decode any token without verifying
  static decodeToken(token: string): object | string | null {
    return jwt.decode(token);
  }
}
