import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// Sentry
import './instrument';
import { SentryFilter } from './sentry/sentry.filter';
// Pino
import { Logger } from 'nestjs-pino';
// Prometheus Metrics Reporter
import { ReporterService } from './reporter/reporter.service';
import { MetricsService } from './metrics/metrics.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  // Sentry - Path 1
  app.useGlobalFilters(new SentryFilter());
  // Sentry - Path 2
  // Import the filter globally, capturing all exceptions on all routes
  // const { httpAdapter } = app.get(HttpAdapterHost);
  // app.useGlobalFilters(new SentryFilter(httpAdapter));

  // Pino
  app.useLogger(app.get(Logger));

  // Prometheus Metrics Reporter
  ReporterService.init(app.get(MetricsService));

  await app.listen(3000);
}
bootstrap();
