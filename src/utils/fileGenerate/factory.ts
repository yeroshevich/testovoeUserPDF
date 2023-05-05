import { IFileGenerateFactory, IGenerateFile } from "@utils/fileGenerate/interfaces";
import { TUserFiles } from "@services/user/interfaces";
import { PdfGenerate } from "@utils/fileGenerate/pdfGenerate";

export class FileGenerateFactory implements IFileGenerateFactory{
  getFileGenerate(fileType: TUserFiles): IGenerateFile {
    switch (fileType){
      case "pdf":
      default:return new PdfGenerate()
    }
  }

}