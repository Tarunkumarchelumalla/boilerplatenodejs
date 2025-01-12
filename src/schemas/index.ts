export interface UserCredentials {
  id: string;
  name:string;
  email: string;
  password: string;
}

export interface ResponseType<T> {
  isSuccess: boolean;
  data: T | null;
  message: string;
  statusCode?:number;
  pagination?: any;
  error?: any;
}

export interface fileType{
    filename:string,
    path: string
}

export interface userTokenSchema{
  UID:string,
  Token:string[],
} 

export interface AttachementSchema{
  FileName: string;
  FileType:string;
  Url:string;
  Hash:string;
}

export interface UserSecretKeySchema{
  UID:string,
  secretKey:string
  isActive:boolean
  createdBy:string;
} 