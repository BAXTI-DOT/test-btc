import type { Response } from 'express'
import type { ArgumentsHost, ExceptionFilter } from '@nestjs/common'
import { Catch, HttpStatus } from '@nestjs/common'

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost): Response {
    const express = host.switchToHttp()
    const response = express.getResponse<Response>()

    if (exception && exception.status === HttpStatus.BAD_REQUEST) {
      return response.status(exception?.status).json({
        message: exception?.response.message,
      })
    }

    return response.status(exception?.status || HttpStatus.INTERNAL_SERVER_ERROR).json({ message: exception?.message })
  }
}
