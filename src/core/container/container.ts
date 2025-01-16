// // src/inversify.config.ts

// import { DatabaseManager } from '@/infrastructure/database/connection';
// import { UserController } from '@/modules/user/user.controller';
// import { UserService } from '@/modules/user/user.service';
// import { Container } from 'inversify';
// import { UserRepository } from '../domain/repositories/user.repository';
// import { DataSource } from 'typeorm';


// // src/core/container/types.ts

// export const TYPES = {
//     DataSource: Symbol.for('DataSource'),
//     UserRepository: Symbol.for('UserRepository'),
//     UserService: Symbol.for('UserService'),
//     UserController: Symbol.for('UserController'),
//   };
  

// // Create Inversify Container
// const container = new Container();

// // Bind DataSource
// container.bind<DataSource>(TYPES.DataSource).toDynamicValue(() => {
//   const databaseManager =  DatabaseManager.getInstance();
//   return databaseManager.getDataSource();
// });

// // Bind Repository, Service, and Controller
// container.bind<UserRepository>(TYPES.UserRepository).to(UserRepository);
// container.bind<UserService>(TYPES.UserService).to(UserService);
// container.bind<UserController>(TYPES.UserController).to(UserController);


// export { container };
