import { RpcException } from '@nestjs/microservices';

export const _Ex = (
  message: string | string[], statusCode: number,
  code: string, method: string,
): never => {
  throw new RpcException({
                           message,
                           statusCode,
                           context: {
                             ms: 'list',
                             error: {
                               exceptionPosition: method,
                               errorCode: code,
                             },
                           },
                         });
};

export const _catchEx = (error: any) => {
  throw new RpcException(
    error.error || error.message);
};