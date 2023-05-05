import { IUserPhotoService } from "@services/user/interfaces";
import { IImage, IPhotoResult } from "@utils/image/interfaces";
import { tryCatch } from "@utils/trycatch";
import { pathBuildFactory, photoUtil } from "@/app/factory/objects";
import { USER_FILES_PATH } from "@config";
import { IPathBuild } from "@utils/pathBuild/interfaces";

export class UserPhotoService implements IUserPhotoService{
  private userPathBuild:IPathBuild = pathBuildFactory.getPathBuild('userPath')
  async getPhoto(path: string): Promise<Buffer> {
    return await tryCatch<Buffer>(async()=>{
      return photoUtil.readFile(`${USER_FILES_PATH}\\${path}`)
    })
  }

  async uploadPhoto(image: IImage, user_id: number): Promise<IPhotoResult> {
    return await tryCatch<IPhotoResult>(async()=>{
      const userPath= `${USER_FILES_PATH}\\${user_id}`
      const existed = await photoUtil.isFileExist(userPath)
      if(existed.result==true)
        await photoUtil.removeFilesFromDir(userPath)
      await photoUtil.saveFile(image,userPath)
      const domenPath= this.userPathBuild.generatePath(`${user_id}/${image.originalname}`)
      return {image:image.originalname,path:domenPath}
    })
  }

}