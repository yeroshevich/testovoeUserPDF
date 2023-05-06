import { IActionResult, IImage, IPhotoResult, IPhotoUtil } from "@utils/image/interfaces";
import * as fs from "fs";
import { DIR_PLACEMENT, NODE_ENV, PLACEMENT_SEPARATOR, USER_FILES_PATH } from "@config";

export class PhotoUtil implements IPhotoUtil{


  async isFileExist(path: string): Promise<IActionResult> {
    try{
      return {result:fs.existsSync(path),message:'File is exist'}
    }catch (e){
      return {result:false,message:e}
    }
  }

  async readFile(path: string):Promise<Buffer> {
    return Promise.resolve(fs.readFileSync(path))
  }
  async readFilesFromDir(path:string):Promise<Array<string>>{
    try{
      return fs.readdirSync(path)
    }catch (e)
    {
      return []
    }
  }

  async removeFilesFromDir(path: string): Promise<IActionResult> {
    try{
      const files = await this.readFilesFromDir(`${path}\\`)
      await Promise.all(files.map(file=>{
        return this.removeFile(`${path}\\${file}`)
      }))
      return {result:true,message:'Все файлы удалены'}
    }catch (e){
      return {result:false,message:e?e:'При удалении файлов произошла ошибка'}
    }
  }
  async removeFile(path: string): Promise<IActionResult> {
    try{
      if(fs.existsSync(path))
        fs.unlinkSync(path)
      return {result:true,message:`Removed from ${path}`}
    }catch (e)
    {
      return {result:false,message:e}
    }
  }

  async saveFile(image: IImage,path:string): Promise<IPhotoResult> {
    const dirExist = `${path}${PLACEMENT_SEPARATOR}${image.originalname}`
    const dirs = path.slice(path.search('public'),path.length).split(PLACEMENT_SEPARATOR)
    dirs.forEach(dir=>{
      const notCreatedDir = path.slice(0,path.search(dir)+dir.length+1)
      if(fs.existsSync(notCreatedDir)==false)
      {
        fs.mkdirSync(notCreatedDir)
      }
    })
    const imageData = image.image.replace(/^data:(image\/\w+);base64,/ig,'')
    fs.writeFile(dirExist,Buffer.from(imageData,'base64'),(e)=>{
      if(e){
        return e
      }
    })
    return {image:image.originalname,path:dirExist};
  }


}
