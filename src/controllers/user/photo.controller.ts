import { Controller, Get, Param, UseBefore } from "routing-controllers";
import { IUserPhotoService } from "@services/user/interfaces";
import { userServiceFactory } from "@/app/factory/objects";
import authMiddleware from "@middlewares/auth.middleware";
import { PLACEMENT_SEPARATOR } from "@config";

@Controller('/user/photo')
@UseBefore(authMiddleware)
export class UserPhotoController{
  private photoService:IUserPhotoService = userServiceFactory.getUserPhotoService()
  @Get('/:user_id/:filename')
  async getImage(@Param('user_id')user_id:number,@Param('filename')filename:string){
    return await this.photoService.getPhoto(`${user_id}${PLACEMENT_SEPARATOR}${filename}`)
  }
}
