import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { SentryModule } from '@sentry/nestjs/setup';
import { AppService } from './app.service';
import { LoggerModule } from 'nestjs-pino';
import {
  makeCounterProvider,
  PrometheusModule,
} from '@willsoto/nestjs-prometheus';
import { MiddlewareModule } from './common/middleware/middleware.module';
import { ReporterModule } from './reporter/reporter.module';
import { MetricsModule } from './metrics/metrics.module';
import { REQUESTS_COUNTER } from './constants';

@Module({
  imports: [
    SentryModule.forRoot(),
    LoggerModule.forRoot({
      pinoHttp: {
        transport: { target: 'pino-pretty' },
      },
    }),
    PrometheusModule.register({
      path: '/metrics',
    }),
    MiddlewareModule,
    MetricsModule,
    ReporterModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    makeCounterProvider({
      name: REQUESTS_COUNTER,
      help: 'Number of requests',
      labelNames: ['controller', 'method'],
    }),
  ],
})
export class AppModule {}
