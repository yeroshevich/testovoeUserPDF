import { UserAuthDto } from "@/dto/auth/auth.dto";
import { User } from "@prisma/client";
import { Request } from "express";
import { ICookieService } from "@services/cookie/interfaces";

export interface IAuthService{
  login(user:UserAuthDto):Promise<ILoginData<User>>
}
export interface ILoginData<T>{
  obj:T,
  cookie:string,
}
export interface IDataStoredInToken {
  user_id: number;
}

export interface ITokenData {
  token: string;
  expiresIn: number;
}

export interface IRequestWithUser extends Request{
  user:User,
}

export interface IAuthFactory{
  getCookieService():ICookieService,
  getAuthService():IAuthService
}