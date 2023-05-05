import App from '@/app';
import { IndexController } from '@controllers/index.controller';
import validateEnv from '@utils/validateEnv';
import { UserController } from "@controllers/user/user.controller";

validateEnv();

const app = new App([
  IndexController,UserController
]);
try{
  app.listen();

}catch (e)
{
  console.log(e)
}
