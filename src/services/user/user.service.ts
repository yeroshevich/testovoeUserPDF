import { IUserPhotoService, IUserService } from "@services/user/interfaces";
import { CreateUserDto, UserDto } from "@/dto/user/user.dto";
import { User } from "@prisma/client";
import { tryCatch } from "@utils/trycatch";
import { isEmpty } from "@utils/util";
import { exceptionFactory, userServiceFactory } from "@/app/factory/objects";
import prisma from "@prima/client";

export class UserService implements IUserService{
  private photoService:IUserPhotoService = userServiceFactory.getUserPhotoService()
  async create(obj: CreateUserDto): Promise<User> {
    return await tryCatch<User>(async()=>{
      if(isEmpty(obj)==true) throw exceptionFactory.getException('notFound','User data is empty')
      const findedUser = await prisma.user.findFirst({
        where:{
          email:obj.email
        }
      })
      if(isEmpty(findedUser)==false) throw exceptionFactory.getException('conflict','This user already registered')
      const createdUser:User = await prisma.user.create({
        data:{
          email:obj.email,
          firstName:obj.firstName,
          lastname:obj.lastName
        }
      })
      const data = await this.photoService.uploadPhoto(obj.image,createdUser.user_id)
      return createdUser
    })
  }

  delete(obj: UserDto): Promise<User> {
    return Promise.resolve(undefined);
  }

  getByEmail(email: string): Promise<User> {
    return Promise.resolve(undefined);
  }

  getById(id: number): Promise<User> {
    return Promise.resolve(undefined);
  }

  update(obj: UserDto): Promise<User> {
    return Promise.resolve(undefined);
  }

}