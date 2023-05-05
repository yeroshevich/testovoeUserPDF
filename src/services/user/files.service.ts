import { IUserFilesService, TUserFiles } from "@services/user/interfaces";
import { UserEmail } from "@/dto/user/user.dto";
import { exceptionFactory, fileGenerateFactory, photoUtil } from "@/app/factory/objects";
import prisma from "@prima/client";
import { isEmpty } from "@utils/util";
import { IGenerateFile } from "@utils/fileGenerate/interfaces";
import { User } from "@prisma/client";
import { IActionResult, IPhotoUtil } from "@utils/image/interfaces";
import { tryCatch } from "@utils/trycatch";
import * as fs from "fs";
import { USER_FILES_PATH } from "@config";
import * as zlib from "zlib";

export class FilesService implements IUserFilesService{

  async generatePdfFile(user: UserEmail, fileType: TUserFiles): Promise<IActionResult> {
    try{
      const findedUser:User = await prisma.user.findUnique({where:{email:user.email}})
      if(isEmpty(findedUser)==true) throw exceptionFactory.getException('notFound','User not found')
      const fileGenerate:IGenerateFile = fileGenerateFactory.getFileGenerate(fileType)
      const path = await fileGenerate.generate(findedUser)
      return {message:'File is created and saved',result:true}
    }catch (e){
      console.log(e)
    }
  }

  async getFile(user: UserEmail): Promise<Buffer> {
    return await tryCatch<Buffer>(async()=>{
      if(isEmpty(user)==true) throw exceptionFactory.getException('noContent','User data is empty')
      const findedUser:User = await prisma.user.findUnique({where:{email:user.email}})
      if(isEmpty(findedUser)==true) throw exceptionFactory.getException('notFound','User not found')
      return findedUser.pdf
    })
  }

}