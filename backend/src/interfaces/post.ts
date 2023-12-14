import { Request } from "express";

export interface Post{
   user_id: string,
   imageInput?: string,
   postContent: string,
}