import { IPathBuild } from "@utils/pathBuild/interfaces";
import { DOMEN } from "@config";

export class DefaultPathBuild implements IPathBuild{
  generatePath(currentPath: string): string {
    return DOMEN;
  }

}