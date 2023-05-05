import { HttpException } from "@exceptions/HttpException";

export class BadRequestException extends HttpException{
  constructor(message:string) {
    super(400,message);
  }
}