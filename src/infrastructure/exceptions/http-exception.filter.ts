import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { QueryFailedError } from 'typeorm';

interface ValidationErrorResponse {
  message: string[];
  error: string;
}

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    // Handling DTO validation exceptions
    if (exception instanceof BadRequestException) {
      const validationResponse =
        exception.getResponse() as ValidationErrorResponse;

      return response.status(400).json({
        statusCode: 400,
        message: 'Validation failed',
        errors: this.formatValidationErrors(validationResponse.message),
        timestamp: new Date().toISOString(),
      });
    }

    // Handling known HTTP exceptions (NotFound, Unauthorized, etc)
    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      return response.status(status).json({
        statusCode: status,
        message: exception.message,
        timestamp: new Date().toISOString(),
      });
    }

    // Handling database errors
    if (exception instanceof QueryFailedError) {
      return response.status(500).json({
        statusCode: 500,
        message: 'Database error occurred',
        error: 'Internal server error',
        timestamp: new Date().toISOString(),
      });
    }

    // Handling unhandled errors
    console.error('Unhandled error:', exception);
    return response.status(500).json({
      statusCode: 500,
      message: 'Internal server error',
      timestamp: new Date().toISOString(),
    });
  }

  private formatValidationErrors(errors: string[]): Record<string, string[]> {
    const formattedErrors: Record<string, string[]> = {};

    errors.forEach((error: string) => {
      // Extract the property name from the error message
      const propertyMatch = error.match(/property (\w+) /);
      if (propertyMatch) {
        // It's a property not allowed error
        const property = propertyMatch[1];
        if (!formattedErrors[property]) {
          formattedErrors[property] = [];
        }
        formattedErrors[property].push('This property should not exist');
      } else {
        // It's a normal validation error
        const [property, ...messageParts] = error.split(' ');
        if (!formattedErrors[property]) {
          formattedErrors[property] = [];
        }
        formattedErrors[property].push(messageParts.join(' '));
      }
    });

    return formattedErrors;
  }
}
