import { Body, Controller, Post, Res, UseBefore } from "routing-controllers";
import { validationMiddleware } from "@middlewares/validation.middleware";
import { UserEmail } from "@/dto/user/user.dto";
import { IUserFilesService } from "@services/user/interfaces";
import { userServiceFactory } from "@/app/factory/objects";
import { IActionResult } from "@utils/image/interfaces";
import { Response } from "express";
import * as fs from "fs";
import { USER_FILES_PATH } from "@config";

@Controller('/user/files')
export class FilesController{
  private fileService:IUserFilesService = userServiceFactory.getUserFilesService()
  @Post('/read')
  @UseBefore(validationMiddleware(UserEmail,'body'))
  async getUserFile(@Body()emailDto:UserEmail,@Res()response:Response){
    return await this.fileService.getFile(emailDto)
  }
  @Post()
  @UseBefore(validationMiddleware(UserEmail,'body'))
  async generateUserPdf(@Body()emailDto:UserEmail):Promise<IActionResult>{
    // передаю pdf, так как в ТЗ написано PDF, но сделал динамичеcки изменяемый тип на будущее
    return await this.fileService.generatePdfFile(emailDto,'pdf')
  }
}