import { IGenerateFile, IUploadResult } from "@utils/fileGenerate/interfaces";
import { User } from "@prisma/client";
import { ASSETS_PATH, PLACEMENT_SEPARATOR, USER_FILES_PATH } from "@config";
import prisma from "@prima/client";
import * as process from "process";
import PdfPrinter from "pdfmake";

export class PdfGenerate implements IGenerateFile{
  async generate(user: User): Promise<IUploadResult> {
    const imagePath:string = `${USER_FILES_PATH}${user.user_id}${PLACEMENT_SEPARATOR}${user.image.slice(user.image.lastIndexOf('/')+1,user.image.length)}`
    const fileName:string = `${user.firstName}.pdf`
    const path:string = `${USER_FILES_PATH}${user.user_id}${PLACEMENT_SEPARATOR}${fileName}`
    const fonts = {
      Roboto: {
        normal: `${ASSETS_PATH}arialmt.ttf`,
      }
    }
    const printer:PdfPrinter = new PdfPrinter(fonts)
    const defs = {
      content:[
        {
          layout:"noBorders",
          fontSize:11,
          table:{
            widths:['33%','33%','33%'],
            body:[
              [{text:user.firstName},{text:user.lastName},''],
              ['',{image: imagePath},''],
            ]
          }
        }

      ]
    }

    const options = {}
    const doc= printer.createPdfKitDocument(defs,options)
    const chunks:any[] = [];

    doc.on("data", chunk => {
      chunks.push(chunk);
    });

    doc.on("end", () => {
      const result:Buffer = Buffer.concat(chunks);
       prisma.user.update({
        where:{user_id:user.user_id},
        data:{
          pdf:result
        }
      }).then()
    });

    doc.end()
    return {path}
  }


}
