// src/core/domain/enums/role.enum.ts
export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER'
}




export enum RequestMethod {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  DELETE = 'delete',
  PATCH = 'patch'
}


// Metadata keys
export const PATH_METADATA = 'path';
export const METHOD_METADATA = 'method';
export const MIDDLEWARE_METADATA = 'middleware';
