import { Router } from "express";
import { loginUser, registerUser,getOneUser,checkUserDetails,toggleSoftDeleteUser,viewAllUsers,forgotPassword } from "../controllers/userController";
import { verifyToken } from "../middleware/verifyToken";

const user_router = Router()

user_router.post('/register', registerUser)
user_router.post('/login', loginUser)
user_router.get('/check_user_details',verifyToken, checkUserDetails)
user_router.put('/softdeleteuser/:user_id',verifyToken,toggleSoftDeleteUser)
user_router.get('/viewallusers',viewAllUsers);
user_router.get('/:id', verifyToken, getOneUser)
user_router.post("/forgotpwd", forgotPassword);


// router.post('/user/follow',verifyLoginToken,followUser);
// router.post('/user/unfollow',verifyLoginToken,unfollowUser);
// router.post('/user/view-user',verifyLoginToken,viewUser);
// router.post('/user/edit-profile',verifyLoginToken,updateUserInformation);



export default user_router;