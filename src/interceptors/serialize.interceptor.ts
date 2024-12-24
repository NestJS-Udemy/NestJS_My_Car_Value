import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
// import { plainToClass } from 'class-transformer';

export class SerializeInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
    // Run Something before a req is handled
    // by the req handelr
    console.log('Im running before the handelr', context);

    return handler.handle().pipe(
      map((data: any) => {
        // Run something before the res is sent out
        console.log(console.log('Im running before res is sent out', data));
      }),
    );
  }
}
