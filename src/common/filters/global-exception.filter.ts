import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    console.error(exception);

    let message = 'Error interno del servidor';
    let status = HttpStatus.INTERNAL_SERVER_ERROR;

    if (exception instanceof Error) {
      message = exception.message;
      if ('getStatus' in exception) {
        status = (exception as any).getStatus();
      }
    }

    // if (exception instanceof MongoServerError) {
    //   status = HttpStatus.CONFLICT;
    //   if (exception.code === 11000) {
    //     const field = Object.keys(exception.keyPattern)[0];
    //     message = field === 'email'
    //       ? 'El correo electrónico ya está registrado'
    //       : `El campo ${field} debe ser único`;
    //   }
    // }

    Logger.error(
      message,
      (exception as any).stack,
      `${request.method} ${request.url}`,
    );

    response.status(status).json({
      status: false,
      message,
      data: null,
    });
  }
}
