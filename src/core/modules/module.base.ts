// src/core/modules/module.base.ts
import { Router } from 'express';
import { IModule } from './module.interface';


export class Module {
  constructor(private readonly controller: IModule) {}

  getRoutes(): Router {
    return this.controller.routes;
  }
}
