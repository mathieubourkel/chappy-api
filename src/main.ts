import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ErrorHandlerMiddleware } from '../middlewares/errorHandler.middleware';
import { corsOptions } from 'utils/cors.options.utils';
import * as cookieParser from "cookie-parser";
import * as fs from "fs"

async function bootstrap() {
  let app;
  if (process.env.NODE_ENV == 'production'){
    const httpsOptions = {
      key: fs.readFileSync(process.env.BACK_URL_KEY, 'utf-8'),
      cert: fs.readFileSync(process.env.BACK_URL_CERT, 'utf-8'),
    };
    app = await NestFactory.create(AppModule, { httpsOptions});
  } else {
    app = await NestFactory.create(AppModule);
  }
  
  const httpAdapter = app.get(HttpAdapterHost);
  app.enableCors(corsOptions);
  app.use(cookieParser());
  app.useGlobalFilters(new ErrorHandlerMiddleware(httpAdapter));

  await app.listen(process.env.VITE_BACK_PORT, () => {
    console.log(`MAIN LISTEN on ${process.env.VITE_BACK_HOST}:${process.env.VITE_BACK_PORT}`)
  });
}

bootstrap();