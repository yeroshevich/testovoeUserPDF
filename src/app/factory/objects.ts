import { ExceptionFactory } from "@exceptions/exceptionFactory";
import { IExceptionFactory } from "@exceptions/interfaces";
import { IPhotoUtil } from "@utils/image/interfaces";
import { PhotoUtil } from "@utils/image/image";
import { IPathBuildFactory } from "@utils/pathBuild/interfaces";
import { PathBuildFactory } from "@utils/pathBuild/factory";
import { IUserServiceFactory } from "@services/user/factory/interfaces";
import { UserServiceFactory } from "@services/user/factory/serviceFactory";
import { IFileGenerateFactory } from "@utils/fileGenerate/interfaces";
import { FileGenerateFactory } from "@utils/fileGenerate/factory";
import { IAuthFactory } from "@services/auth/interfaces";
import { AuthFactory } from "@services/auth/factory";

export const exceptionFactory:IExceptionFactory = new ExceptionFactory()
export const pathBuildFactory:IPathBuildFactory = new PathBuildFactory()
export const userServiceFactory:IUserServiceFactory = new UserServiceFactory()
export const authServiceFactory:IAuthFactory = new AuthFactory()

export const fileGenerateFactory:IFileGenerateFactory = new FileGenerateFactory()

export const photoUtil:IPhotoUtil = new PhotoUtil()
