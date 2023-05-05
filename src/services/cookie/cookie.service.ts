import { ICookieService } from "@services/cookie/interfaces";
import { SECRET_KEY } from "@config";
import { sign } from "jsonwebtoken";
import { IDataStoredInToken, ITokenData } from "@services/auth/interfaces";

export class CookieService implements ICookieService{
  public createToken(id:number): ITokenData {
    const dataStoredInToken: IDataStoredInToken = { user_id:id};
    const secretKey: string = SECRET_KEY;
    const expiresIn: number = 60 * 60*60 * 3;

    return { expiresIn, token: sign(dataStoredInToken, secretKey, { expiresIn }) };
  }

  public createCookie(tokenData: ITokenData): string {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
  }

}
