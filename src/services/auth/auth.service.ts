import { UserAuthDto } from "@/dto/auth/auth.dto";
import { User } from "@prisma/client";
import { IAuthService, ILoginData, ITokenData } from "@services/auth/interfaces";
import { tryCatch } from "@utils/trycatch";
import { isEmpty } from "@utils/util";
import { authServiceFactory, exceptionFactory } from "@/app/factory/objects";
import prisma from "@prima/client";
import { ICookieService } from "@services/cookie/interfaces";

export class AuthService implements IAuthService{
  private cookieService:ICookieService = authServiceFactory.getCookieService()

    async login(user: UserAuthDto): Promise<ILoginData<User>> {
       return await tryCatch<ILoginData<User>>(async()=>{
         if(isEmpty(user)==true) throw exceptionFactory.getException('noContent','User logged data is empty')
         const findedUser:User = await prisma.user.findFirst({
           where:{
             email:user.email,
             firstName:user.firstName
           }
         })
         if(isEmpty(findedUser)==true) throw exceptionFactory.getException('notFound','User isn`t registered')
         const token:ITokenData = this.cookieService.createToken(findedUser.user_id)
         const cookie:string = this.cookieService.createCookie(token)
         return {
           cookie,
           obj:findedUser
         }
       })
    }

}