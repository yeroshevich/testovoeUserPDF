import { IImage } from "@utils/image/interfaces";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateUserDto{
  @IsNotEmpty()
  @IsString()
  public firstName:string;
  @IsNotEmpty()
  @IsString()
  public lastName:string;
  @IsNotEmpty()
  @IsString()
  public email:string;
  @IsNotEmpty()
  public image:IImage;
}
export class UserDto extends CreateUserDto{
  @IsNotEmpty()
  @IsNumber()
  public user_id:number;
}
export class UserEmail{
  @IsNotEmpty()
  @IsString()
  public email:string;
}