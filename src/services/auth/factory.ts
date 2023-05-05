import { IAuthFactory, IAuthService } from "@services/auth/interfaces";
import { ICookieService } from "@services/cookie/interfaces";
import { AuthService } from "@services/auth/auth.service";
import { CookieService } from "@services/cookie/cookie.service";

export class AuthFactory implements IAuthFactory{
  getAuthService(): IAuthService {
    return new AuthService();
  }

  getCookieService(): ICookieService {
    return new CookieService();
  }

}