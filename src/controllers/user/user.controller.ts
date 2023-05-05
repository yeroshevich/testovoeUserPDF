import { Body, Controller, Delete, Get, Param, Post, Put, UseBefore } from "routing-controllers";
import { userServiceFactory } from "@/app/factory/objects";
import { IUserService } from "@services/user/interfaces";
import { CreateUserDto, UserDto } from "@/dto/user/user.dto";
import { validationMiddleware } from "@middlewares/validation.middleware";
import authMiddleware from "@middlewares/auth.middleware";

@Controller('/user')
export class UserController{
  private userService:IUserService = userServiceFactory.getUserService()
  @Get('/:id')
  @UseBefore(authMiddleware)
  async findUserById(@Param('id')user_id:number){
    return await this.userService.getById(user_id)
  }
  @Post()
  @UseBefore(validationMiddleware(CreateUserDto,'body'))
  async createUser(@Body()userDto:CreateUserDto){
    return await this.userService.create(userDto)
  }
  @Put()
  @UseBefore(authMiddleware)
  @UseBefore(validationMiddleware(UserDto,'body'))
  async updateUserData(@Body()userDto:UserDto){
    return await this.userService.update(userDto)
  }
  @Delete()
  @UseBefore(authMiddleware)
  @UseBefore(validationMiddleware(UserDto,'body'))
  async deleteUser(@Body()userDto:UserDto){
    return await this.userService.delete(userDto)
  }

}
