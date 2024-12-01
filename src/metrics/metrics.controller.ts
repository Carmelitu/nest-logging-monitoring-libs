import { Controller, Get, Inject } from '@nestjs/common';
import { Registry } from 'prom-client';

@Controller('metrics')
export class MetricsController {
  constructor(@Inject(Registry) private readonly registry: Registry) {}

  @Get('/endpoints')
  async getMetrics() {
    return await this.registry.metrics();
  }
}
