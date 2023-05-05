export interface IPhotoUtil {
  readFile(path: string): Promise<Buffer>,

  removeFile(path:string):Promise<IActionResult>,

  saveFile(image: IImage, path: string): Promise<IPhotoResult>,

  isFileExist(path: string): Promise<IActionResult>,
  readFilesFromDir(path:string):Promise<Array<string>>,
  removeFilesFromDir(path:string):Promise<IActionResult>,
  removeFile(path:string):Promise<IActionResult>,
}
export interface IImage {
  originalname:string,
  image:string,
}
export interface IActionResult{
  result:boolean,
  message:string
}
export interface IPhotoResult{
  image:string,
  path:string
}
