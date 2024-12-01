import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';
import { SentryExceptionCaptured } from '@sentry/nestjs';

// Sentry - Path 1
@Catch()
export class SentryFilter implements ExceptionFilter {
  private readonly logger = new Logger(SentryFilter.name);

  @SentryExceptionCaptured()
  catch(exception: any, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    // Log the exception locally
    this.logger.error(`Exception: ${exception.message}`);

    // Send a custom response to the client
    const status =
      exception instanceof HttpException ? exception.getStatus() : 500;

    response.status(status).json({
      message: exception.message,
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}

// Sentry - Path 2
// @Catch()
// export class SentryFilter extends BaseExceptionFilter {
//   handleUnknownError(
//     exception: any,
//     host: ArgumentsHost,
//     applicationRef: HttpServer<any, any> | AbstractHttpAdapter<any, any, any>,
//   ): void {
//     Sentry.captureException(exception);
//     super.handleUnknownError(exception, host, applicationRef);
//   }
// }
