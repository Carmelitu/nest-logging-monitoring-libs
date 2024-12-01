import { Module } from '@nestjs/common';
import { RequestsInterceptor } from './request.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: RequestsInterceptor,
    },
  ],
})
export class MiddlewareModule {}
