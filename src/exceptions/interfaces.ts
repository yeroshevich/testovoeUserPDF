import { HttpException } from "@exceptions/HttpException";

export type TExceptions = 'badRequest'|'notFound'

export interface IExceptionFactory{
  getException(exception:TExceptions,message:string):HttpException
}