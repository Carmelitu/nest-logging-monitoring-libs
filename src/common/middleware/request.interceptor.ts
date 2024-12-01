import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { REQUESTS_COUNTER } from 'src/constants';
import { ReporterService } from 'src/reporter/reporter.service';

@Injectable()
export class RequestsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const { controllerName, methodName } = this.extractControllerInfo(context);

    ReporterService.counter(REQUESTS_COUNTER, {
      controller: controllerName,
      method: methodName,
    });

    return next.handle().pipe();
  }

  private extractControllerInfo(context: ExecutionContext): {
    controllerName: string;
    methodName: string;
  } {
    const controllerName = context.getClass().name;
    const methodName = context.getHandler().name;
    return { controllerName, methodName };
  }
}
