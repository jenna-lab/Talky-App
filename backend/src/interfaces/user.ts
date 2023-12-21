import { Request } from "express";

export interface User{
    name:string,
    email: string,
    user_id: string,
    role : string
}

export interface LoginUser extends Request{
    email: string,
    password: string
}

export interface RegisterUser extends Request{
    userName: string,
    email: string,
    password: string
}
