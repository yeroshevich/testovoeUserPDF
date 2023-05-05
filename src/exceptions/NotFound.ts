import { HttpException } from "@exceptions/HttpException";

export class NotFoundException extends HttpException{
  constructor(message:string) {
    super(404,message);
  }
}