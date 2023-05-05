import { IUserFilesService, IUserPhotoService, IUserService } from "@services/user/interfaces";

export interface IUserServiceFactory{
  getUserService():IUserService,
  getUserPhotoService():IUserPhotoService,
  getUserFilesService():IUserFilesService
}