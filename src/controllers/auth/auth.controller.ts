import { Body, Controller, Post, Res, UseBefore } from "routing-controllers";
import { UserAuthDto } from "@/dto/auth/auth.dto";
import { validationMiddleware } from "@middlewares/validation.middleware";
import { IAuthService } from "@services/auth/interfaces";
import { authServiceFactory } from "@/app/factory/objects";
import { Response } from "express";

@Controller('/auth')
export class AuthController{
  private authService:IAuthService = authServiceFactory.getAuthService()
  @Post('/login')
  @UseBefore(validationMiddleware(UserAuthDto,'body'))
  async loginUser(@Body()userDto:UserAuthDto,@Res()response:Response){
    const { cookie, obj } = await this.authService.login(userDto);
    response.setHeader('Set-Cookie', [cookie]);
    return {obj,cookie};

  }
}