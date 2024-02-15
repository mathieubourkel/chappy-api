import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ErrorHandlerMiddleware } from '../middlewares/errorHandler.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const httpAdapter = app.get(HttpAdapterHost);
  app.useGlobalFilters(new ErrorHandlerMiddleware(httpAdapter));
  await app.listen(3000);
}
bootstrap();