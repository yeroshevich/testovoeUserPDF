import { IPathBuild } from "@utils/pathBuild/interfaces";
import { DOMEN } from "@config";

export class UserPathBuild implements IPathBuild{
  generatePath(currentPath: string): string {
    return `${DOMEN}/user/photo/${currentPath}`;
  }

}