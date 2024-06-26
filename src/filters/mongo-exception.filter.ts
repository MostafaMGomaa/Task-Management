import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';

@Catch(Error)
export class MongoExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    console.log('In filter');
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();
    const status = HttpStatus.BAD_REQUEST;

    let errorMessage = 'Internal server error';
    console.log(exception);
    if (exception.code === 11000) {
      errorMessage = 'Duplicate: ' + Object.keys(exception.keyValue);
    }

    response.status(status).json({
      statusCode: status,
      errorMessage,
    });
  }
}
