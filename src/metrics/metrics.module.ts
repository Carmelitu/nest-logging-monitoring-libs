import { Module } from '@nestjs/common';
import { MetricsService } from './metrics.service';
import { MetricsController } from './metrics.controller';
import { Registry } from 'prom-client';

const registryFactory = {
  provide: Registry,
  useFactory: () => {
    return new Registry();
  },
};

@Module({
  controllers: [MetricsController],
  providers: [MetricsService, registryFactory],
  exports: [MetricsService],
})
export class MetricsModule {}
