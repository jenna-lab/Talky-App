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
<<<<<<< HEAD
}
=======
}

export interface RegisterUser extends Request{
    userName: string,
    email: string,
    password: string
}
>>>>>>> 514f8a7c61d4b05843e91c36d3f14e19db0d452e
