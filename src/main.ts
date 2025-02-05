import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { appConfig } from '@configs'
import { AppModule } from './app.module'
import { HttpExceptionFilter } from '@filters'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: false,
    }),
  )

  app.useGlobalFilters(new HttpExceptionFilter())

  const configs = new DocumentBuilder().setTitle('btcn').build()

  const document = SwaggerModule.createDocument(app, configs)
  SwaggerModule.setup('docs', app, document)

  await app.listen(appConfig().port, appConfig().host)
}

bootstrap()
