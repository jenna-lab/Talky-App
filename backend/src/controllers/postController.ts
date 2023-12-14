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