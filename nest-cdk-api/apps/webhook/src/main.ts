import { NestFactory } from '@nestjs/core';
import { SQSEvent } from 'aws-lambda';
import { WebhookModule } from './webhook.module';
import { WebhookService } from './webhook.service';

export const handler = async (event: SQSEvent): Promise<void> => {
  const app = await NestFactory.createApplicationContext(WebhookModule);
  const service = app.get(WebhookService);
  await service.log(event.Records);
}
