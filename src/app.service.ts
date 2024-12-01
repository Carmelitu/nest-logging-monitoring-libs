import { Injectable } from '@nestjs/common';
import { PinoLogger } from 'nestjs-pino';

@Injectable()
export class AppService {
  constructor(private readonly logger: PinoLogger) {}
  testSentry(): void {
    throw new Error('Test Sentry');
  }

  testPino(): boolean {
    this.logger.info('Test Pino Logger');
    return true;
  }
}
