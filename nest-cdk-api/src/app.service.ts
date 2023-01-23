import { Injectable } from '@nestjs/common';
import { faker } from '@faker-js/faker';

@Injectable()
export class AppService {
  getHello(): string {
    return `Hello ${faker.name.fullName()}!`;
  }
}
