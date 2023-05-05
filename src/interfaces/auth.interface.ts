import { Request } from 'express';
import { User } from "@prisma/client";

export interface IDataStoredInToken {
  user_id: number;
}

export interface ITokenData {
  token: string;
  expiresIn: number;
}

export interface IRequestWithUser extends Request{
  user:User,
}
