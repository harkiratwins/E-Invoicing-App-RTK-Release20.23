export interface Post {
    businessId:number,
    data:any,
    descriptionFormLoading:boolean,
    oldRoleId:number,
    responseKeyId:number,
    roleDescription:string,
    roleId:number,
    roleName:string
}

export interface Update{
    businessId:number,
        data:any
        roleId:number,
        roleList:any
}