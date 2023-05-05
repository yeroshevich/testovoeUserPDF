import { IUserServiceFactory } from "@services/user/factory/interfaces";
import { IUserPhotoService, IUserService } from "@services/user/interfaces";
import { UserPhotoService } from "@services/user/photo.service";
import { UserService } from "@services/user/user.service";

export class UserServiceFactory implements IUserServiceFactory{
  getUserPhotoService(): IUserPhotoService {
    return new UserPhotoService();
  }

  getUserService(): IUserService {
    return new UserService();
  }

}