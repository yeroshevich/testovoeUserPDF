export interface IEntityService<EntityType,CreateDtoType,DtoType>{
  create(obj:CreateDtoType):Promise<EntityType>,
  delete(obj:DtoType):Promise<EntityType>,
  update(obj:DtoType):Promise<EntityType>,
  getById(id:number):Promise<EntityType>
}