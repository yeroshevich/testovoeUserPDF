import App from '@/app';
import { IndexController } from '@controllers/index.controller';
import validateEnv from '@utils/validateEnv';
import { UserController } from "@controllers/user/user.controller";
import { UserPhotoController } from "@controllers/user/photo.controller";
import { FilesController } from "@controllers/user/files.controller";

validateEnv();

const app = new App([
  IndexController,UserController,UserPhotoController,FilesController
]);
try{
  app.listen();

}catch (e)
{
  console.log(e)
}
