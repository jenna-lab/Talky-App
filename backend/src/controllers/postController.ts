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
    let { user_id,post_id } = req.params; 
    const pool = await mssql.connect(sqlConfig);

    if (pool.connected) {
      const result = await pool.request()
        .input('post_id', mssql.VarChar, post_id)
        .input('user_id', mssql.VarChar, user_id)
        .execute('viewSinglePost');

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
    let { user_id, post_id } = req.body;

    const pool = await mssql.connect(sqlConfig);

    if (pool.connected) {
      const result = await pool.request()
        .input('user_id', mssql.VarChar, user_id)
        .input('post_id', mssql.VarChar, post_id)
        .execute('deletePost');

      if (result.rowsAffected[0] === 0) {
        return res.status(404).json({
          message: 'Post not found or not deleted',
        });
      } else {
        return res.status(200).json({
          message: 'Post deleted successfully',
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
        // let { user_id } = req.body;

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
            message: 'Post unliked successfully',
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
            message: 'Post liked successfully',
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
