import { User } from "@prisma/client";
import { TUserFiles } from "@services/user/interfaces";

export interface IGenerateFile{
  generate(user:User):Promise<Buffer>
}
export interface IFileGenerateFactory{
  getFileGenerate(fileType:TUserFiles):IGenerateFile
}