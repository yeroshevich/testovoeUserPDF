import { IUserServiceFactory } from "@services/user/factory/interfaces";
import { IUserFilesService, IUserPhotoService, IUserService } from "@services/user/interfaces";
import { UserPhotoService } from "@services/user/photo.service";
import { UserService } from "@services/user/user.service";
import { FilesService } from "@services/user/files.service";

export class UserServiceFactory implements IUserServiceFactory{
  getUserPhotoService(): IUserPhotoService {
    return new UserPhotoService();
  }

  getUserService(): IUserService {
    return new UserService();
  }

  getUserFilesService(): IUserFilesService {
    return new FilesService();
  }

}