import { UserController } from './user.controller';
import { UserRouter } from './user.routes';
import { UserService } from './user.service';

// export default to auto load routes
export default class UserModule {
  // Initialize user module
  public static service = new UserService();
  public static controller = new UserController(this.service);
  public static routes = new UserRouter(this.controller);
  public static router = this.routes.router
}

