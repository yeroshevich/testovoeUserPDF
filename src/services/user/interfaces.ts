import { IEntityService } from "@services/interfaces";
import { User } from "@prisma/client";
import { CreateUserDto, UserDto, UserEmail } from "@/dto/user/user.dto";
import { IActionResult, IImage, IPhotoResult } from "@utils/image/interfaces";

export interface IUserService extends IEntityService<User, CreateUserDto, UserDto>{
}
export interface IUserPhotoService{
  getPhoto(path:string):Promise<Buffer>;
  uploadPhoto(image:IImage,user_id:number):Promise<IPhotoResult>
}
export type TUserFiles = 'pdf'
export interface IUserFilesService{
  generatePdfFile(user:UserEmail,fileType:TUserFiles):Promise<IActionResult>,
  getFile(user:UserEmail):Promise<Buffer>
}