import { IGenerateFile } from "@utils/fileGenerate/interfaces";
import { User } from "@prisma/client";

export class PdfGenerate implements IGenerateFile{
  async generate(user: User): Promise<Buffer> {
    return Promise.resolve(undefined);
  }

}