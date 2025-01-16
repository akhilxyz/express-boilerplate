// @/decorators/Route.ts

import 'reflect-metadata';
import { Router } from 'express';
import { METHOD_METADATA, MIDDLEWARE_METADATA, PATH_METADATA, RequestMethod } from '../enums/role.enum';

// router decorator
export function route(prefix: string = '') {
  return function (target: any) {
    // Create router instance
    const router = Router();
    
    // Store the original constructor
    const original = target;
    
    // Create new constructor function
    function constructor(...args: any[]) {
      const instance = new original(...args);
      
      // Get all method names from prototype
      const prototype = original.prototype;
      const methodNames = Object.getOwnPropertyNames(prototype)
        .filter(prop => prop !== 'constructor' && typeof prototype[prop] === 'function');

      // For each method, check if it has route metadata
      methodNames.forEach(methodName => {
        const route = Reflect.getMetadata(PATH_METADATA, prototype[methodName]);
        const method: RequestMethod = Reflect.getMetadata(METHOD_METADATA, prototype[methodName]);
        const middlewares = Reflect.getMetadata(MIDDLEWARE_METADATA, prototype[methodName]) || [];
        
        if (route && method) {
          const fullPath = `${prefix}${route}`;
          const boundMethod = prototype[methodName].bind(instance);
          router[method](fullPath, ...middlewares, boundMethod);
        }
      });

      // Add router to instance
      Object.defineProperty(instance, 'router', {
        get: () => router
      });

      return instance;
    }

    // Copy prototype
    constructor.prototype = original.prototype;

    // Return new constructor (will override original)
    return constructor as any;
  };
}

