import { Router } from "express";
import { createPost,viewSinglePost,editPost,deletePost,likeOrUnlikePost,fetchUserPosts,getSingleUserPosts,viewAllPosts,addComment, editComment,getAllComments } from "../controllers/postController";
import { verifyToken } from "../middleware/verifyToken";
import { add } from "lodash";

const post_router = Router()

post_router.post('/createpost',createPost);
post_router.put('/editpost',verifyToken,editPost);
post_router.post('/viewSinglePost/:post_id',verifyToken,viewSinglePost);
post_router.delete('/deletepost/:post_id',verifyToken,deletePost);
post_router.post('/likeorunlikepost',verifyToken,likeOrUnlikePost);
post_router.get('/fetchuserposts/:user_id',verifyToken,fetchUserPosts);
post_router.get('/getSingleUserPosts/:id',getSingleUserPosts);
post_router.get('/viewallposts',viewAllPosts);
post_router.post('/addComment/:post_id',verifyToken,addComment);
post_router.put('/editComment/comment_id',verifyToken,editComment);
post_router.get('/getallComments/:post_id',verifyToken,getAllComments);


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