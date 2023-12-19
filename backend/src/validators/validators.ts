import joi from 'joi'

export const registerUserSchema = joi.object({
        userName: joi.string(),
        email : joi.string().email(),
        password: joi.string()
})

export const loginUserSchema = joi.object({
       email: joi.string().email().required(), 
       password: joi.string().required()
<<<<<<< HEAD
=======
})

export const createPostSchema = joi.object({
    imageInput: joi.any(),    
    user_id: joi.string(),
    postContent : joi.string(),
    created_at : joi.string(),
>>>>>>> 514f8a7c61d4b05843e91c36d3f14e19db0d452e
})