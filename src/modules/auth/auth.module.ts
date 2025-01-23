import { AuthController } from "./auth.controller";
import { authRouter } from "./auth.routes";
import { AuthService } from "./auth.service";
import { authSwagger } from "./auth.swagger";

// export default to auto load routes
export default class AuthModule {
  // Initialize auth module
  public static service = new AuthService();
  public static controller = new AuthController(this.service);
  public static routes = new authRouter(this.controller);
  public static router = this.routes.router
  public static swagger = authSwagger
}
