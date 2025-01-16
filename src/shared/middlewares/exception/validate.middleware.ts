import { validate } from 'class-validator';
import { Request, Response, NextFunction } from 'express';
import { ResponseUtil } from '@/shared/utils';

// Type for the validation options
export interface ValidationOptions {
  skipMissingProperties?: boolean;
  whitelist?: boolean;
  forbidNonWhitelisted?: boolean;
}

export function ValidateDto(DtoClass: new () => any, options: ValidationOptions = {}) {
  return function (
    _target: any,
    _propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    // Store the original method
    const originalMethod = descriptor.value;

    // Rewrite the method descriptor
    descriptor.value = async function (req: Request, res: Response, next: NextFunction) {
      try {
        // Create an instance of the DTO class
        const dtoInstance = Object.assign(new DtoClass(), req.body);

        // Validate the DTO instance with provided options
        const errors = await validate(dtoInstance, {
          skipMissingProperties: options.skipMissingProperties || false,
          whitelist: options.whitelist || true,
          forbidNonWhitelisted: options.forbidNonWhitelisted || false,
          ...options
        });

        if (errors.length > 0) {
          const validationErrors = errors.map(err => ({
            property: err.property,
            constraints: err.constraints,
            value: err.value
          }));

          return ResponseUtil.error(res, {
            message: 'Validation failed',
            errors: validationErrors
          });
        }

        // If validation passes, assign validated DTO to request
        req.body = dtoInstance;

        // Call the original method
        return originalMethod.apply(this, [req, res, next]);
      } catch (error) {
        return ResponseUtil.error(res, error);
      }
    };

    return descriptor;
  };
}

// Create a custom parameter decorator for specific property validation
export function ValidateProperty(validationOptions: ValidationOptions = {}) {
  return function (target: any, propertyKey: string, parameterIndex: number) {
    const existingValidations = Reflect.getMetadata('validations', target, propertyKey) || [];
    existingValidations.push({
      index: parameterIndex,
      options: validationOptions
    });
    Reflect.defineMetadata('validations', existingValidations, target, propertyKey);
  };
}