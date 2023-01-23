import { NestFactory } from '@nestjs/core';
import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import { AppModule } from './app.module';
import { AppService } from './app.service';

export const handler = async (event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> => {
  const app = await NestFactory.createApplicationContext(AppModule);
  const service = app.get(AppService);
  const result = service.getHello();
  return {
    body: result,
    statusCode: 200
  };
}
