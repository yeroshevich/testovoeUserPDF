import { Controller, Get, Param } from "routing-controllers";
import { IUserPhotoService } from "@services/user/interfaces";
import { userServiceFactory } from "@/app/factory/objects";

@Controller('/user/photo')
export class UserPhotoController{
  private photoService:IUserPhotoService = userServiceFactory.getUserPhotoService()
  @Get('/:user_id/:filename')
  async getImage(@Param('user_id')user_id:number,@Param('filename')filename:string){
    return await this.photoService.getPhoto(`${user_id}\\${filename}`)
  }
}