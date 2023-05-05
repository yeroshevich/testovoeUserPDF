export interface IPathBuild{
  generatePath(currentPath:string):string
}
export type TPathBuilds = 'userPath'
export interface IPathBuildFactory{
  getPathBuild(build:TPathBuilds):IPathBuild
}