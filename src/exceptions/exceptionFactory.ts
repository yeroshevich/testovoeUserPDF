import { IExceptionFactory, TExceptions } from "@exceptions/interfaces";
import { HttpException } from "@exceptions/HttpException";
import { NotFoundException } from "@exceptions/NotFound";
import { BadRequestException } from "@exceptions/BadRequest";
import { NoContentException } from "@exceptions/NoContent";
import { ConflictException } from "@exceptions/Conflict";

export class ExceptionFactory implements IExceptionFactory{
  getException(exception: TExceptions,message:string): HttpException {
    switch (exception){
      case "notFound":return new NotFoundException(message)
      case "badRequest":return new BadRequestException(message)
      case "noContent":return new NoContentException(message)
      case "conflict":return new ConflictException(message)
      default: return new HttpException(203,message)
    }
  }

}