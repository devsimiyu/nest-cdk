import { Injectable } from '@nestjs/common';
import { SQSRecord } from 'aws-lambda';

@Injectable()
export class WebhookService {
  async log(records: SQSRecord[]): Promise<void> {
    console.log('SQS EVENT', records);
  }
}
