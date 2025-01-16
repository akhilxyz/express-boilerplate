// // shared/middlewares/auth/auth.middleware.ts
// import { Request, Response, NextFunction } from 'express';
// import { container } from 'tsyringe';
// import { JwtService } from './jwt.service';
// import { UnauthorizedException } from '../../../core/exceptions/unauthorized.exception';

// declare global {
//     namespace Express {
//         interface Request {
//             user?: any;
//         }
//     }
// }

// export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const authHeader = req.headers.authorization;
//         if (!authHeader) {
//             throw new UnauthorizedException('No authorization header');
//         }

//         const [bearer, token] = authHeader.split(' ');
//         if (bearer !== 'Bearer' || !token) {
//             throw new UnauthorizedException('Invalid authorization format');
//         }

//         const jwtService = container.resolve(JwtService);
//         const decoded = jwtService.verifyToken(token);
//         if (!decoded) {
//             throw new UnauthorizedException('Invalid token');
//         }

//         req.user = decoded;
//         next();
//     } catch (error) {
//         next(error);
//     }
// };