export  interface Iuserdata {
    applicationId: number;
    businessId: number;
    emailId?: string;
    ipAddress: null;
    password?: string;
    refreshToken: null;
    rememberMe: boolean;
  }
  export interface IFieldType{
    username?: string;
    password?: string;
    remember?: string; 
  }
  export interface IcontactType{
    id:Number;
    name:string
}