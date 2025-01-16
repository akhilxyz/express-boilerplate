// import rateLimit from 'express-rate-limit';
// import { Config } from '../../../config/config';

// export class RateLimitMiddleware {
//   private config: Config;

//   constructor(config: Config) {
//     this.config = config;
//   }

//   create() {
//     return rateLimit({
//       windowMs: this.config.server.rateLimitWindowMs,
//       max: this.config.server.rateLimitMax,
//     });
//   }
// }