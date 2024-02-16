import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ErrorHandlerMiddleware } from '../middlewares/errorHandler.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const httpAdapter = app.get(HttpAdapterHost);
  app.useGlobalFilters(new ErrorHandlerMiddleware(httpAdapter));
  app.listen(process.env.VITE_BACK_PORT, () => {
    console.log(`MAIN LISTEN on ${process.env.VITE_BACK_HOST}:${process.env.VITE_BACK_PORT}`)
  });
}
bootstrap();