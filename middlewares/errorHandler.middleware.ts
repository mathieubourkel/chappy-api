import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpStatus,
  } from '@nestjs/common';
  import { HttpAdapterHost } from '@nestjs/core';
  
  @Catch()
  export class ErrorHandlerMiddleware implements ExceptionFilter {
    constructor(private readonly httpAdapterHost: HttpAdapterHost) {}
    catch(exception: any, host: ArgumentsHost): void {
      console.log(exception)
      const { httpAdapter } = this.httpAdapterHost;
      const ctx = host.switchToHttp();
      let responseBody:any
        exception.context
        ? responseBody = {
            statusCode: exception.statusCode,
            message: exception.message,
            context: exception.context,
            timestamp: new Date().toISOString(),
            path: httpAdapter.getRequestUrl(ctx.getRequest()),
        }
        : responseBody = {
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            message: exception,
            timestamp: new Date().toISOString(),
            path: httpAdapter.getRequestUrl(ctx.getRequest()),
            
        }

      httpAdapter.reply(ctx.getResponse(), responseBody, responseBody.statusCode);
    }
  }