// import { Request, Response, NextFunction } from 'express';
// import { Role } from '../../../core/enums/role.enum';
// import { UnauthorizedException } from '../../../core/exceptions/unauthorized.exception';

// export const roleGuard = (roles: Role[]) => {
//     return (req: Request, res: Response, next: NextFunction) => {
//         try {
//             if (!req.user) {
//                 throw new UnauthorizedException('User not authenticated');
//             }

//             if (!roles.includes(req.user.role)) {
//                 throw new UnauthorizedException('Insufficient permissions');
//             }

//             next();
//         } catch (error) {
//             next(error);
//         }
//     };
// };