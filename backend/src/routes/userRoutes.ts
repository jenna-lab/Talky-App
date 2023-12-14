import { Router } from "express";
import { loginUser, registerUser,getOneUser,checkUserDetails } from "../controllers/userController";
import { verifyToken } from "../middleware/verifyToken";

const user_router = Router()

user_router.post('/register', registerUser)
user_router.post('/login', loginUser)
user_router.get('/:id', verifyToken, getOneUser)
user_router.get('/check_user_details',verifyToken, checkUserDetails)

// router.post('/user/follow',verifyLoginToken,followUser);
// router.post('/user/unfollow',verifyLoginToken,unfollowUser);
// router.post('/user/view-user',verifyLoginToken,viewUser);
// router.post('/user/edit-profile',verifyLoginToken,updateUserInformation);
// router.post('/user/view-users/:id',viewAllUsers);



export default user_router;