import { HttpException } from "@exceptions/HttpException";

export type TExceptions = 'badRequest'|'notFound'|'noContent'|'conflict'

export interface IExceptionFactory{
  getException(exception:TExceptions,message:string):HttpException
}