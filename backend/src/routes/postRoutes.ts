import { Router } from "express";
import { createPost,viewSinglePost,editPost,deletePost,likeOrUnlikePost,fetchAllPosts,getSingleUserPosts } from "../controllers/postController";
import { verifyToken } from "../middleware/verifyToken";

const post_router = Router()

post_router.post('/createpost', verifyToken,createPost);
post_router.put('/editpost',verifyToken,editPost);
post_router.post('/viewSinglePost/:post_id',verifyToken,viewSinglePost);
post_router.delete('/deletepost/:post_id',verifyToken,deletePost);
post_router.post('/likeorunlikepost',verifyToken,likeOrUnlikePost);
post_router.post('/fetchallposts/:id',verifyToken,fetchAllPosts);
post_router.post('/getSingleUserPosts/:id',getSingleUserPosts);
// post_router.post('/likepost',verifyToken,likePost);
// post_router.post('/unlikepost',verifyToken,unlikePost);
// post_router.get('/checklikedpost',verifyToken,checkLikedPost);
// post_router.get('/fetchRecentPosts',fetchRecentPosts);


// post_router.post('/createComment',verifyToken,createComment);
// post_router.post('/updateComment',verifyToken,updateComment);
// post_router.post('/likeComment',likeComment);
// post_router.post('/unlikeComment',unlikeComment);
// post_router.post('/createSubComment',verifyToken,createSubcomment);
// post_router.post('/updateSubcomment',verifyToken,updateSubcomment);
// post_router.post('/unlikeSubcomment',verifyToken,unlikeSubcomment);
// post_router.post('/likeSubcomment',verifyToken,likeSubcomment);

export default post_router;