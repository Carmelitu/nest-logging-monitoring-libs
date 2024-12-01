import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { SentryTraced } from '@sentry/nestjs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/sentry')
  @SentryTraced('test-sentry')
  testSentry(): void {
    return this.appService.testSentry();
  }
  @Get('/pino')
  @SentryTraced('test-pino')
  testPino(): boolean {
    return this.appService.testPino();
  }
}
