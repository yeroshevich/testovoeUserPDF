import { HttpError } from "routing-controllers";
import { exceptionFactory } from "@/app/factory/objects";
import { TExceptions } from "@exceptions/interfaces";

export async function tryCatch<T>(
  cb:()=>Promise<T>,
  exception:TExceptions = 'badRequest',
  exceptionMessage:string='Action failed, an error occurred'
):Promise<T> {
  try{
    return await cb()
  }catch (e){
    if(e instanceof HttpError)
      throw exceptionFactory.getException(exception,`${e}`)
    throw exceptionFactory.getException('badRequest',`${exceptionMessage}`)
  }
}
