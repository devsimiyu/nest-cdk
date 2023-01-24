import { NestFactory } from '@nestjs/core';
import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import { AppModule } from './app.module';
import { AppService } from './app.service';

export const handler = async (event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> => {
  const app = await NestFactory.createApplicationContext(AppModule);
  const service = app.get(AppService);
  try {
    const result = await service.getHello();
    return {
      body: result,
      statusCode: 200
    };
  } catch (error) {
    console.error('AppService.getHello error', error);
    return {
      body: 'failed to publish message',
      statusCode: 500
    };
  }
}
