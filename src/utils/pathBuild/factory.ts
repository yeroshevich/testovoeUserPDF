import { IPathBuild, IPathBuildFactory, TPathBuilds } from "@utils/pathBuild/interfaces";
import { UserPathBuild } from "@utils/pathBuild/UserPathBuild";
import { DefaultPathBuild } from "@utils/pathBuild/default";

export class PathBuildFactory implements IPathBuildFactory{
  getPathBuild(build: TPathBuilds): IPathBuild {
    switch (build){
      case "userPath":return new UserPathBuild()
      default:return new DefaultPathBuild()
    }
  }

}