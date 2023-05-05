import { IExceptionFactory, TExceptions } from "@exceptions/interfaces";
import { HttpException } from "@exceptions/HttpException";
import { NotFoundException } from "@exceptions/NotFound";
import { BadRequestException } from "@exceptions/BadRequest";

export class ExceptionFactory implements IExceptionFactory{
  getException(exception: TExceptions,message:string): HttpException {
    switch (exception){
      case "notFound":return new NotFoundException(message)
      case "badRequest":return new BadRequestException(message)
      default: return new HttpException(203,message)
    }
  }

}