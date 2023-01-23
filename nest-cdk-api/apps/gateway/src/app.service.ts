import { Injectable } from '@nestjs/common';
import { faker } from '@faker-js/faker';
import * as AWS from 'aws-sdk';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  private readonly notification: AWS.SNS = new AWS.SNS({
    region: this.config.getOrThrow['AWS_REGION'],
  });

  constructor(private config: ConfigService) {}

  async getHello(): Promise<string> {
    const country  = faker.address.country();
    this.notification.publish({
      Message: `Message published to ${country}`,
      TopicArn: this.config.getOrThrow['TOPIC_ARN']
    })
    return `Message sent to ${country }!`;
  }
}
