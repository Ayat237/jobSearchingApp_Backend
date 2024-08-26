import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { errorClass } from "../../utils/error-class.utils.js"
import userModel from "../../DB/models/user.model.js"

export const authenticatation =()=>{
    return async (req, res, next) => {
        const {token} = req.headers
        if(!token){
            return next(new errorClass("token error",400,"token is required"))
        }

        if(!token.startsWith("user_")){
            return next(new errorClass("token error",400,"Token is not valid"))
        }

        const newToken = token.split("user_")[1]
        if(!newToken){
            return next(new errorClass("token error",400,"Token is not found"))
        }
        // verify token
        const decoded = jwt.verify(newToken,process.env.LOGIN_SECRET)
        // if decoded of token not contain on id 
        if(!decoded?.id){
            return next(new errorClass("token error",400,"invalid payload"))
        }

        const userExists = await userModel.findById(decoded.id)  
        if(!userExists ){
            return next(new errorClass("User not found",400,"User not found"))
        }

        // user data 
        req.authUser = userExists;
        next();
    }
}