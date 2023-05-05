import {NextFunction, Response} from 'express';
import {verify} from 'jsonwebtoken';
import {SECRET_KEY} from '@config';
import {HttpException} from '@exceptions/HttpException';
import prisma from "@prima/client";
import { isEmpty } from "@utils/util";
import { User } from "@prisma/client";
import { IDataStoredInToken, IRequestWithUser } from "@services/auth/interfaces";
import * as console from "console";



const authMiddleware = async (req: IRequestWithUser, res: Response, next: NextFunction) => {
  try {

    const Authorization:string = req.cookies['authorization'] ||  (req.header('authorization') ? req.header('authorization') : null);

    if (isEmpty(Authorization))
      next(new HttpException(404, 'Authentication token missing'));

    const secretKey: string = SECRET_KEY;
    const verificationResponse:IDataStoredInToken = (await verify(Authorization, secretKey)) as IDataStoredInToken;
    const userId:number = verificationResponse.user_id;
    const findedUser:User = await prisma.user.findFirst({
       where:{
         user_id:userId
       }
    })


    if(isEmpty(findedUser))
      next(new HttpException(401, 'Wrong authentication token'));

    req.user = findedUser;
    next();

  } catch (error) {
    next(new HttpException(401, 'Wrong authentication token'));
  }
};

export default authMiddleware;
