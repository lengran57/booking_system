import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FormatResponseInterceptor } from './format-response.interceptor';
import { InvokeRecordInterceptor } from './invoke-record.interceptor';
import { UnloginFilter } from './unlogin.filter';
import { CustomExceptionFilter } from './custom-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 全局启用validationPipe
  app.useGlobalPipes(new ValidationPipe());
  // 全局启用响应拦截
  app.useGlobalInterceptors(new FormatResponseInterceptor());
  // 全局启用请求拦截
  app.useGlobalInterceptors(new InvokeRecordInterceptor());
  // 全局启用相应错误处理
  app.useGlobalFilters(new UnloginFilter());
  app.useGlobalFilters(new CustomExceptionFilter());

  const config = new DocumentBuilder()
    .setTitle('冷然民宿预定系统')
    .setDescription('api接口文档')
    .setVersion('1.0.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-doc', app, document);

  // 开启跨域
  app.enableCors();

  const configService = app.get(ConfigService);
  await app.listen(configService.get('nest_server_port'));
}
bootstrap();
