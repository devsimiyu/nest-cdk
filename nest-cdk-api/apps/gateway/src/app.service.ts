import { Inject, Injectable } from '@nestjs/common';
import { faker } from '@faker-js/faker';
import * as AWS from 'aws-sdk';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  private readonly notification: AWS.SNS = new AWS.SNS({
    region: this.config.getOrThrow('REGION'),
    ...(this.config.get('ENV') == 'local' && {
      endpoint: 'http://localhost:4566'
    })
  });

  constructor(@Inject(ConfigService) private config: ConfigService) {}

  async getHello(): Promise<string> {
    const country  = faker.address.country();
    console.log('GATEWAY FUNC PUBLISHING TO TOPIC', this.config.get('TOPIC_ARN'));
    await this.notification.publish({
      Message: `Message published to ${country}`,
      TopicArn: this.config.getOrThrow('TOPIC_ARN')
    }).promise();
    return `Message sent to ${country}!`;
  }
}
