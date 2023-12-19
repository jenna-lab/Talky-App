import { Request, Response } from 'express'
import mssql from 'mssql'
<<<<<<< HEAD
import {v4} from 'uuid'
=======
import { v4 as uid } from "uuid";
>>>>>>> 514f8a7c61d4b05843e91c36d3f14e19db0d452e
import bcrypt from 'bcrypt'
import { sqlConfig } from '../config/sqlConfig'
import jwt from 'jsonwebtoken'
import { LoginUser } from '../interfaces/user'
import { ExtendedUser } from '../middleware/verifyToken'
import { loginUserSchema, registerUserSchema } from '../validators/validators'
import { isEmpty } from 'lodash'
import dbHelper from '../dbhelpers/dbhelper'
<<<<<<< HEAD
=======
import { resetPassword } from '../utils/sendResetPwd';
>>>>>>> 514f8a7c61d4b05843e91c36d3f14e19db0d452e

 
export const registerUser = async(req:Request, res: Response) =>{

    try {
        let {userName, email, password} = req.body

        let {error} = registerUserSchema.validate(req.body)

        if(error){
            return res.status(404).json({error: error.details})
        }
<<<<<<< HEAD

        let user_id = v4()
=======
        

        let user_id =uid()
>>>>>>> 514f8a7c61d4b05843e91c36d3f14e19db0d452e

        const hashedPwd = await bcrypt.hash(password, 5)
         
        let result = await dbHelper.execute('registerUser', {
            user_id, userName, email,password: hashedPwd
        })

        
        if(result.rowsAffected[0] === 0){
            return res.status(404).json({
                message: "Something went wrong, user not registered"
            })
        }else{
            return res.status(200).json({
                message: 'User registered successfully'
            })
        }     
    } catch (error) {  
<<<<<<< HEAD
        return res.json({
            error: error
        })
    }
=======
        console.log((error as Error).message)
        const message = (error as Error).message
        if(message.includes('@')){
        return res.json({
            error: "Email's already taken"
        })
    }
    else{
        return res.json({
            error: "Username's already taken"
        })
    }

}
>>>>>>> 514f8a7c61d4b05843e91c36d3f14e19db0d452e
}

export const loginUser = async(req:Request, res: Response) =>{
    try {  
        const {email, password} = req.body
<<<<<<< HEAD
=======
        console.log(email, password)
>>>>>>> 514f8a7c61d4b05843e91c36d3f14e19db0d452e

        const {error} = loginUserSchema.validate(req.body)

        if(error){
            return res.status(422).json({error: error.message})
        }

        const pool = await mssql.connect(sqlConfig)

        let user = await (await pool.request().input("email", email).input("password", password).execute('loginUser')).recordset

        console.log(user);
        
        
        if(user[0]?.email  == email){
            const CorrectPwd = await bcrypt.compare(password, user[0]?.password)

            if(!CorrectPwd){   
                return res.status(401).json({
                    error: "Incorrect password"
                })
            }

            const LoginCredentials = user.map(records =>{
                const {phone_no, id_no, KRA_PIN, password, NSSF_NO, NHIF_NO, welcomed, ...rest}=records

                return rest
            })
            const token = jwt.sign(LoginCredentials[0], process.env.SECRET as string, {
                expiresIn: '24h'
            }) 

            return res.status(200).json({
                message: "Logged in successfully", token
            })
            
        }else{
            return res.json({
                error: "Email not found"
            })
        }

    } catch (error) {
        return res.json({
            error: "Internal server error"
        })
    }
}

<<<<<<< HEAD
// export const getAllUsers = async(req:Request, res:Response)=>{
//     try {

//         const pool = await mssql.connect(sqlConfig)

//         let employees = (await pool.request().execute('fetchAllEmployees')).recordset

//         return res.status(200).json({
//             employees: employees
//         })
        
//     } catch (error) {
//         return res.json({
//             error: error
//         })
//     }
// }
// export const getOneUsers = async(req:Request, res:Response)=>{
//     try {

//         let id = req.params.id 

//         const pool = await mssql.connect(sqlConfig)

//         let employee = (await pool.request().input('employee_id',id).execute('fetchOneEmployee')).recordset

//         return res.status(200).json({
//             employee: employee
//         })
        
//     } catch (error) {
//         return res.json({
//             error: error
//         })
//     }
// }

// export const userStatus = async (req: Request, res:Response)=>{
//     try {
        
//         let {employee_id} = req.params
//         let {isDeleted} = req.body

//         const pool = await mssql.connect(sqlConfig)

//         const result = await pool.request()
//         .input("employee_id", employee_id) 
//         .input("isDeleted", isDeleted)
//         .execute("deleteEmployee")
        
//         console.log(result);

//         return res.json({message: result})

//     } catch (error) {
//         return res.json({
//             error: error
//         })
//     }
// }
=======

 

export const getOneUser = async(req:Request, res:Response)=>{
    try {

        let id = req.params.id 

        const pool = await mssql.connect(sqlConfig)

        let user = (await pool.request().input('user_id',id).execute('getOneUser')).recordset

        return res.status(200).json({
            user: user
        })
        
    } catch (error) {
        return res.json({
            error: error
        })
    }
}

export const viewAllUsers = async (req: Request, res: Response) => {
  try {
    const pool = await mssql.connect(sqlConfig);

    if (pool.connected) {
      const result = await pool.request().execute('viewAllUsers');

      return res.status(200).json({
        message: 'Successfully retrieved all users',
        users: result.recordset,
      });
    }
  } catch (error) {
    console.error((error as Error).message);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};


>>>>>>> 514f8a7c61d4b05843e91c36d3f14e19db0d452e

export const checkUserDetails = async (req:ExtendedUser, res:Response)=>{
    
    if(req.info){

        return res.json({
            info: req.info 
        }) 
    }
    
<<<<<<< HEAD
}
=======
}

export const toggleSoftDeleteUser = async (req: Request, res: Response) => {
  try {
    let { user_id } = req.params;
    let { isDeleted } = req.body;

    const pool = await mssql.connect(sqlConfig);

    if (pool.connected) {
      const result = await pool.request()
        .input('user_id', mssql.VarChar, user_id)
        .input('isDeleted', mssql.Bit, isDeleted)
        .execute('toggleSoftDeleteUser');

      if (result.rowsAffected[0] === 0) {
        return res.status(404).json({
          message: 'User not found or soft delete status not updated',
        });
      } else {
        return res.status(200).json({
          message: `Soft delete status ${isDeleted ? 'enabled' : 'disabled'} successfully`,
          userId: user_id,
        });
      }
    }
  } catch (error) {
    console.error((error as Error).message);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};


export const forgotPassword = async (req: Request, res: Response) => {
 
    const { email } = req.body;
    const new_password = uid();
    console.log(req.body);
 const pool = await mssql.connect(sqlConfig);
     const user =    await pool
        .request()
      .input("email", mssql.VarChar(50), email)
        .execute("getUser");

        const rows = user.rowsAffected[0];
        if(rows == 0){
              return res.json({ error: "User Not Found" });
        }
        else{
              const hashedPwd = await bcrypt.hash(new_password, 10);
              
              await pool
                .request()
                .input("email", mssql.VarChar(50), email)
                .input("newPassword", mssql.VarChar(255), hashedPwd)
                .execute("updatePassword");
         resetPassword(email, new_password);

         console.log(new_password);
         
         
          return res.json({ message: "New Password has been sent to your email" });
          
          return res.json({ error: "User Not Found" });
        }
        


};
>>>>>>> 514f8a7c61d4b05843e91c36d3f14e19db0d452e
