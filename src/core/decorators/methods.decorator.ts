import { METHOD_METADATA, PATH_METADATA, RequestMethod } from "../enums/role.enum";

// Rest of the decorators remain the same...
export const get = createMethodDecorator(RequestMethod.GET);
export const post = createMethodDecorator(RequestMethod.POST);
export const put = createMethodDecorator(RequestMethod.PUT);
export const del = createMethodDecorator(RequestMethod.DELETE);
export const patch = createMethodDecorator(RequestMethod.PATCH);

// Method decorators factory (implementation remains the same)
function createMethodDecorator(method: RequestMethod) {
  return function (path: string = ''): MethodDecorator {
    return function (
      _target: Object,
      _propertyKey: string | symbol,
      descriptor: PropertyDescriptor
    ) {
      Reflect.defineMetadata(PATH_METADATA, path, descriptor.value);
      Reflect.defineMetadata(METHOD_METADATA, method, descriptor.value);
      return descriptor;
    };
  };
}