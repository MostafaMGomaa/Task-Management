import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';

@Catch(Error)
export class MongoExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();
    const status = exception.response
      ? exception.response.statusCode
      : HttpStatus.BAD_REQUEST;

    let errorMessage = exception.response?.message || 'Internal server error';

    if (exception.code === 11000) {
      errorMessage = 'Duplicate: ' + Object.keys(exception.keyValue);
    }

    response.status(status).json({
      statusCode: status,
      errorMessage,
    });
  }
}
