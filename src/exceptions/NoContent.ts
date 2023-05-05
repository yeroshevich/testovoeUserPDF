import { HttpException } from "@exceptions/HttpException";

export class NoContentException extends HttpException{
  constructor(message:string) {
    super(204,message);
  }
}