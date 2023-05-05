import { User } from "@prisma/client";
import { TUserFiles } from "@services/user/interfaces";

export interface IGenerateFile{
  generate(user:User):Promise<IUploadResult>
}
export interface IFileGenerateFactory{
  getFileGenerate(fileType:TUserFiles):IGenerateFile
}
export interface IUploadResult{
  path:string
}