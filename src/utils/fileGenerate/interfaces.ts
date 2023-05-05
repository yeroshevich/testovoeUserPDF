import { User } from "@prisma/client";

export interface IGenerateFile{
  generate(user:User):Promise<Buffer>
}