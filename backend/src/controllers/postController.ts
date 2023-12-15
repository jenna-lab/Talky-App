import { Request, Response } from 'express'
import mssql from 'mssql'
import { v4 as uid } from "uuid";
import bcrypt from 'bcrypt'
import { sqlConfig } from '../config/sqlConfig'
import jwt from 'jsonwebtoken'
import { Post } from '../interfaces/post'
import { ExtendedUser } from '../middleware/verifyToken'
import { createPostSchema } from '../validators/validators'
import { isEmpty } from 'lodash'
import dbHelper from '../dbhelpers/dbhelper'
import { User } from '../interfaces/user';

export const createPost = async (req: Request, res: Response) => {
  try {
    let { user_id, imageInput, postContent } = req.body;

    // Validate the request body
    let { error } = createPostSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.details });
    }

    const post_id = uid();
    const options = { timeZone: 'Africa/Nairobi' };
    const datetime = new Date().toLocaleString('en-US', options);

    const pool = await mssql.connect(sqlConfig);

    if (pool.connected) {
      
      const result = await pool.request()
        .input('user_id', mssql.VarChar, user_id)
        .input('post_id', mssql.VarChar, post_id)
        .input('imageInput', mssql.VarChar, imageInput)
        .input('postContent', mssql.VarChar, postContent)
        .input('timeposted', mssql.VarChar, datetime)
        .execute('createPost');

      if (result.rowsAffected[0] === 0) {
        return res.status(404).json({
          message: 'Something went wrong, post not created',
        });
      } else {
        return res.status(200).json({
          message: 'Post created successfully',
          postId: post_id,
        });
      }
    }
  } catch (error) {
    console.error((error as Error).message);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};


export const viewSinglePost = async (req: Request, res: Response) => {
  try {
    console.log(req.params);
    
    let {post_id } = req.params; 
    let {user_id} = req.body

    const pool = await mssql.connect(sqlConfig);

    if (pool.connected) {
      const result = await pool.request()
        .input('user_id', mssql.VarChar, user_id)      
        .input('post_id', mssql.VarChar, post_id)
        .execute('viewSinglePost');

        console.log(result);
        
      if (result.recordset.length === 0) {
        return res.status(404).json({
          message: 'Post not found',
        });
      } else {
        const post = result.recordset[0];

        return res.status(200).json({
          message: 'Successfully retrieved single post',
          post: post,
        });
      }
    }
  } catch (error) {
    console.error((error as Error).message);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const editPost = async (req: Request, res: Response) => {
  try {
    let { user_id, post_id, newImageInput, newPostContent } = req.body;

    // Validate the request body
    // You might want to add a validation schema for editing posts here

    // Example:
    // let { error } = editPostSchema.validate(req.body);

    // if (error) {
    //   return res.status(400).json({ error: error.details });
    // }

    const pool = await mssql.connect(sqlConfig);

    if (pool.connected) {
      const result = await pool.request()
        .input('user_id', mssql.VarChar, user_id)
        .input('post_id', mssql.VarChar, post_id)
        .input('newImageInput', mssql.VarChar, newImageInput)
        .input('newPostContent', mssql.VarChar, newPostContent)
        .execute('editPost');

      if (result.rowsAffected[0] === 0) {
        return res.status(404).json({
          message: 'Post not found or not updated',
        });
      } else {
        return res.status(200).json({
          message: 'Post updated successfully',
          postId: post_id,
        });
      }
    }
  } catch (error) {
    console.error((error as Error).message);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const deletePost = async (req: Request, res: Response) => {
  try {
    let { user_id } = req.body;
    let { post_id } = req.params;

    const pool = await mssql.connect(sqlConfig);

    if (pool.connected) {
      // Delete related likes from PostLikes table
      const deleteLikesResult = await pool.request()
        .input('post_id', mssql.VarChar, post_id)
        .execute('deletePostLikes');

      // Check if likes are successfully deleted before proceeding with post deletion
      if (deleteLikesResult.rowsAffected[0] === 0) {
        return res.status(404).json({
          message: 'Likes not found or not deleted',
        });
      }

      // Delete the actual post
      const deletePostResult = await pool.request()
        .input('user_id', mssql.VarChar, user_id)
        .input('post_id', mssql.VarChar, post_id)
        .execute('deletePost');

      // Check if the post is successfully deleted
      if (deletePostResult.rowsAffected[0] === 0) {
        return res.status(404).json({
          message: 'Post not found or not deleted',
        });
      } else {
        return res.status(200).json({
          message: 'Post and related likes deleted successfully',
          postId: post_id,
        });
      }
    }
  } catch (error) {
    console.error((error as Error).message);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};


export const fetchAllPosts = async (req: Request, res: Response) => {
  try {
        let { user_id } = req.body;

    const pool = await mssql.connect(sqlConfig);

    if (pool.connected) {
      const result = await pool.request().execute('fetchAllPosts');

      return res.status(200).json({
        message: 'Successfully retrieved all posts',
        posts: result.recordset,
      });
    }
  } catch (error) {
    console.error((error as Error).message);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const likeOrUnlikePost = async (req: Request, res: Response) => {
  try {
    let { user_id, post_id } = req.body;

    const pool = await mssql.connect(sqlConfig);

    if (pool.connected) {
      const checkLikedResult = await pool.request()
        .input('user_id', mssql.VarChar, user_id)
        .input('post_id', mssql.VarChar, post_id)
        .execute('checkLikedPost');

        console.log(checkLikedResult);
        

      if (checkLikedResult.recordset.length > 0) {
        // Post is already liked, so unlike it
        const unlikeResult = await pool.request()
          .input('user_id', mssql.VarChar, user_id)
          .input('post_id', mssql.VarChar, post_id)
          .execute('unlikePost');

        if (unlikeResult.rowsAffected[0] === 0) {
          return res.status(404).json({
            message: 'Post not found or like not removed',
          });
        } else {
          return res.status(200).json({
            message: 'Post unliked ',
            postId: post_id,
            action: 'unlike',
          });
        }
      } else {
        // Post is not liked, so like it
        const likeResult = await pool.request()
          .input('user_id', mssql.VarChar, user_id)
          .input('post_id', mssql.VarChar, post_id)
          .execute('likePost');

        if (likeResult.rowsAffected[0] === 0) {
          return res.status(404).json({
            message: 'Post not found or like not recorded',
          });
        } else {
          return res.status(200).json({
            message: 'Post liked',
            postId: post_id,
            action: 'like',
          });
        }
      }
    }
  } catch (error) {
    console.error((error as Error).message);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getSingleUserPosts = async (req: Request, res: Response) => {
  try {
    let { user_id } = req.params; // Adjust this according to your route setup

    const pool = await mssql.connect(sqlConfig);

    if (pool.connected) {
      const result = await pool.request()
        .input('user_id', mssql.VarChar, user_id)
        .execute('getUserPosts');

      return res.status(200).json({
        message: 'Successfully retrieved user posts',
        posts: result.recordset,
      });
    }
  } catch (error) {
    console.error((error as Error).message);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const viewAllPosts = async (req: Request, res: Response) => {
  try {
    const pool = await mssql.connect(sqlConfig);

    if (pool.connected) {
      const result = await pool.request().execute('viewAllPosts');

      return res.status(200).json({
        message: 'Successfully retrieved all posts',
        posts: result.recordset,
      });
    }
  } catch (error) {
    console.error((error as Error).message);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const fetchUserPosts = async (req: Request, res: Response) => {
  try {
    let { user_id } = req.params;

    const pool = await mssql.connect(sqlConfig);

    if (pool.connected) {
      const result = await pool.request()
        .input('user_id', mssql.VarChar, user_id)
        .execute('fetchUserPosts');
        console.log(result);
        
      return res.status(200).json({
        message: 'Successfully retrieved user posts',
        posts: result.recordset,
      });
    }
  } catch (error) {
    console.error((error as Error).message);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};


export const addComment = async (req: Request, res: Response) => {
  try {
    
    let { user_id, post_id, commentContent } = req.body;
    
    // Assuming you want to set the comment time as the current server time
    const commentTime = new Date();
    const pool = await mssql.connect(sqlConfig);

    if (pool.connected) {
      const result = await pool.request()
        .input('user_id', mssql.VarChar, user_id)
        .input('post_id', mssql.VarChar, post_id)
        .input('commentContent', mssql.VarChar, commentContent)
        .input('commentTime', mssql.DateTime, commentTime)
        .execute('addComment');

        console.log(result.rowsAffected[0]);
        

      if (result.rowsAffected[0] == 0) {
        return res.status(404).json({
          message: 'Comment not added',
        });
      } else {
        return res.status(200).json({
          message: 'Comment added successfully',
          comment_id: result.rowsAffected[0],

        });
      }
    }
  } catch (error) {
    console.error((error as Error).message);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const editComment = async (req: Request, res: Response) => {
  try {
    let {comment_id} = req.params

    let { user_id, commentContent,post_id } = req.body;
    
    // Assuming you want to set the comment time as the current server time
    const commentTime = new Date();
    const pool = await mssql.connect(sqlConfig);

    if (pool.connected) {
      const result = await pool.request()
        .input('user_id', mssql.VarChar, user_id)
        .input('post_id', mssql.VarChar, post_id)
        .input('comment_id', mssql.VarChar, comment_id)
        .input('commentTime', mssql.Date, commentTime)
        .input('commentContent', mssql.VarChar, commentContent)

        .execute('editComment');

        console.log(result.rowsAffected[0]);
        

      if (result.rowsAffected[0] == 0) {
        return res.status(404).json({
          message: 'Comment not edited',
        });
      } else {
        return res.status(200).json({
          message: 'Comment edited successfully',
          comment_id: result.rowsAffected[0],

        });
      }
    }
  } catch (error) {
    console.error((error as Error).message);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const deleteComment = async (req: Request, res: Response) => {
  try {
    let {comment_id} = req.params

    let { user_id, commentContent,post_id } = req.body;
    
    // Assuming you want to set the comment time as the current server time
    const commentTime = new Date();
    const pool = await mssql.connect(sqlConfig);

    if (pool.connected) {
      const result = await pool.request()
        .input('comment_id', mssql.VarChar, comment_id)
        .execute('deleteComment');

        console.log(result.rowsAffected[0]);
        

      if (result.rowsAffected[0] == 0) {
        return res.status(404).json({
          message: 'Comment not deleted',
        });
      } else {
        return res.status(200).json({
          message: 'Comment deleted successfully',

        });
      }
    }
  } catch (error) {
    console.error((error as Error).message);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

