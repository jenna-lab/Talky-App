import joi from 'joi'

export const registerUserSchema = joi.object({
        userName: joi.string(),
        email : joi.string().email(),
        password: joi.string()
})

export const loginUserSchema = joi.object({
       email: joi.string().email().required(), 
       password: joi.string().required()
})

export const createPostSchema = joi.object({
    imageInput: joi.any(),    
    user_id: joi.string(),
    postContent : joi.string(),
    created_at : joi.string(),
})