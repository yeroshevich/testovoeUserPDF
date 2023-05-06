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
        where:{ email:obj.email }
      })
      if(isEmpty(findedUser)==false) throw exceptionFactory.getException('conflict','This user already registered')
      const createdUser:User = await prisma.user.create({
        data:{
          email:obj.email,
          firstName:obj.firstName,
          lastName:obj.lastName,
          image:'',
          pdf:null
        }
      })
      const data = await this.photoService.uploadPhoto(obj.image,createdUser.user_id)
      const updatedUser = await prisma.user.update({
        where:{ user_id:createdUser.user_id },
        data:{ image:data.path }}
      )
      return updatedUser
    })
  }

  async delete(obj: UserDto): Promise<User> {
    return await tryCatch<User>(async()=>{
      if(isEmpty(obj)==true) throw exceptionFactory.getException('noContent','User data is empty')
      const findedUser = await prisma.user.findFirst({where:{user_id:obj.user_id}})
      if(isEmpty(findedUser)==true) throw exceptionFactory.getException('notFound','User not found')
      return await prisma.user.delete({where:{user_id:findedUser.user_id}})
    })
  }

  async getById(id: number): Promise<User> {
    return await tryCatch<User>(async()=>{
      return await prisma.user.findUnique({where:{user_id:id}})
    })
  }

 async update(obj: UserDto): Promise<User> {
    return await tryCatch<User>(async()=>{
      if(isEmpty(obj)==true) throw exceptionFactory.getException('noContent','User data is empty')
      const findedUser = await prisma.user.findFirst({where:{user_id:obj.user_id}})
      if(isEmpty(findedUser)==true) throw exceptionFactory.getException('notFound','User not found')
      const loadedPhoto = await this.photoService.uploadPhoto(obj.image,findedUser.user_id)
      return await prisma.user.update({where:{user_id:findedUser.user_id},
        data:{
          email:obj.email,
          lastName:obj.lastName,
          firstName:obj.lastName,
          image:loadedPhoto.path
        }
      })
    })
  }

}
