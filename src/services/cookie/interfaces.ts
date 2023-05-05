import { ITokenData } from "@interfaces/auth.interface";

export interface ICookieService{
  createToken(user_id:number):ITokenData,
  createCookie(data:ITokenData):string
}
