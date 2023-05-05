import { IGenerateFile, IUploadResult } from "@utils/fileGenerate/interfaces";
import { User } from "@prisma/client";
import * as fs from "fs";
import { USER_FILES_PATH } from "@config";
import prisma from "@prima/client";
import * as process from "process";
import PdfPrinter from "pdfmake";

export class PdfGenerate implements IGenerateFile{
  async generate(user: User): Promise<IUploadResult> {
    const imagePath = `${USER_FILES_PATH}\\${user.user_id}\\${user.image.slice(user.image.lastIndexOf('/')+1,user.image.length)}`
    const fileName:string = `${user.firstName}.pdf`
    const path:string = `${USER_FILES_PATH}\\${user.user_id}\\${fileName}`
    const writeFile = ()=>{
      const fonts = {
        Roboto: {
          normal: `${process.cwd()}\\src\\assets\\arialmt.ttf`,
        }
      }
      const printer = new PdfPrinter(fonts)
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

      doc.pipe(fs.createWriteStream(path))
      doc.end()
    }
    const saveBuffer = ()=>{
      const buffer = fs.readFileSync(path)
      prisma.user.update({
        where:{user_id:user.user_id},
        data:{
          pdf:buffer
        }
      }).then(response=>{
        fs.unlinkSync(path)
        fs.writeFileSync('./data.pdf',buffer)
      })
    }
     writeFile()
     saveBuffer()

    return {path}
  }


}