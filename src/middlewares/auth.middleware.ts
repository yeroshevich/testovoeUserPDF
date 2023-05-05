import {NextFunction, Response} from 'express';
import {verify} from 'jsonwebtoken';
import {SECRET_KEY} from '@config';
import {HttpException} from '@exceptions/HttpException';
import {IDataStoredInToken, IRequestWithUser} from '@interfaces/auth.interface';
import prisma from "@prima/client";
import { isEmpty } from "@utils/util";
import { User } from "@prisma/client";



const authMiddleware = async (req: IRequestWithUser, res: Response, next: NextFunction) => {
  try {
    const Authorization:string = req.cookies['Authorization'] || (req.header('Authorization') ? req.header('Authorization').split('Bearer ')[1] : null);

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
