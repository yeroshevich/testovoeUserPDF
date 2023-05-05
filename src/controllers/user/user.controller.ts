import { Controller, Delete, Get, Post, Put } from "routing-controllers";

@Controller('/user')
export class UserController{
  @Get()
  async findUser(){

  }
  @Post()
  async createUser(){

  }
  @Put()
  async updateUserData(){

  }
  @Delete()
  async deleteUser(){

  }

}