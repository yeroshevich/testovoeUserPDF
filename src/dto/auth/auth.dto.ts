import { IsNotEmpty, IsString } from "class-validator";

export class UserAuthDto{
  @IsNotEmpty()
  @IsString()
  public email:string;
  @IsNotEmpty()
  @IsString()
  public firstName:string;
}