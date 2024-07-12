import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from 'crypto';
import { errorClass } from "../../../utils/error-class.utils.js";
import { sendEmail } from "../../services/sendEmail.service.js";
import userModel from "../../../DB/models/user.model.js";

/**
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @returns {object} => return response { message , newUser }
 * @description   => create new user
 */
export const signUp = async(req, res, next) =>{
    const {firstName , lastName, userName, email, password, 
           recoveryEmail, DOB, mobileNumber, role, status} = req.body;

    // check if email is already exist 
    const userExist = await userModel.findOne({email})
    if(userExist){
        return next (new errorClass("Email is already exist", 409 ,"Email is already exist"));
    }
    
    // generate token for confirmation
    const token = jwt.sign({email},
        process.env.CONFIRM_SECRET
    );
    const  link  = `${req.protocol}://${req.headers.host}/user/confirmEmail/${token}`;

    // send email with confirmation link
    const isEmailSent =   await sendEmail(
        email ,
        "welcome to job searching app",
        `<a href = '${link}' >confirm email</a>`);
    
    // check if email not sent
    if(!isEmailSent){
        return next(new errorClass("failed to send email",400))
    };

    // hash password
    const hashedPassword = bcrypt.hashSync(password,8)

    // create new user
    const newUser = await userModel.create({
        firstName,
        lastName,
        userName,
        email,
        password: hashedPassword,
        recoveryEmail,
        DOB,
        mobileNumber,
        role,
        status,
        confirmed: false
    });

    return res.status(201).json({msg : "User created successfully", data : newUser})
}

/**
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @returns {object} => return response { message , token }
 * @description   => confirm email
 */

export const confirmEmail = async (req , res, next) =>{
    const {token} = req.params;

    //decode token to get email address
    const decodeToken = jwt.verify(
    token,
    process.env.CONFIRM_SECRET);

    // check if token not decoded successfully
    if(!decodeToken){
        return next (new errorClass("Invalid token",400));
    }

    // update confirmed if token decoded successfully 
    const user = await userModel.findOneAndUpdate(
        {email: decodeToken.email},
        {confirmed: true},
        {new: true}
    );

    //check if user not found
    if(!user){
        return next (new errorClass("User not found",404));
    }
    return res.status(200).json({msg : "Email confirmed successfully"})
}

/**
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @returns {object} => return response { message , token }
 * @description   => login user
 */
export const Login = async(req, res, next) =>{
    const {email, recoveryEmail, mobileNumber, password} = req.body
    
    // find user 
    const user = await userModel.findOneAndUpdate({$or:[{email},{recoveryEmail},{mobileNumber}],confirmed : true},{status: 'online'},{new: true})
    
    // check if user not found or not confirmed or password incorrect
    if(!user || !bcrypt.compareSync(password, user.password)){
        return next(new errorClass("Invalid credentials",400,"Email invalid or not confirmed or password incorrect or user not found"))
    }
    
    // generate and return token  for user  
    const  token = jwt.sign({id : user._id, email },process.env.LOGIN_SECRET)
    return res.status(200).json({msg : "Login success", token})
}

/**
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @returns {object} => return response { message , UpdatedData}
 * @description   => Update Data of user
 */
export const updateAccount = async(req, res, next) =>{
    const { email , mobileNumber , recoveryEmail , DOB , lastName , firstName} = req.body;

    // Ensure only the owner of the account can update their data
    const userId = req.authUser._id;
    const user = await userModel.findById(userId)
     //check if user not found
     if(!user){
        return next (new errorClass("User not found",404));
    }
    // Ensure only the owner of the account can update their data
    if (!userId.equals(user._id)) {
        return next(new errorClass('You are not authorized to update this account', 403));
    }
    
    // Check for existing email conflict
    if (email) {
        const existingEmailUser = await userModel.findOne({ email });
        if (existingEmailUser) {
            return next(new errorClass('Email is already exist', 409));
        }
    }

    // Check for existing mobile number conflict
    if (mobileNumber && mobileNumber !== user.mobileNumber) {
        const existingMobileUser = await userModel.findOne({ mobileNumber });
        if (existingMobileUser) {
            return next(new errorClass('Mobile number is already exist', 409, 'Mobile number is already exist'));
        }
    }

    const updateData = {
        email: email || user.email,
        mobileNumber: mobileNumber || user.mobileNumber,
        recoveryEmail: recoveryEmail || user.recoveryEmail,
        DOB: DOB || user.DOB,
        lastName: lastName || user.lastName,
        firstName: firstName || user.firstName
    };

     // generate token for confirmation
     const token = jwt.sign({email},
        process.env.CONFIRM_SECRET
    );
    const  link  = `${req.protocol}://${req.headers.host}/user/confirmEmail/${token}`;

    // send email with confirmation link
    const isEmailSent =   await sendEmail(
        email ,
        "welcome to job searching app",
        `<a href = '${link}' >confirm email</a>`);
    
    // check if email not sent
    if(!isEmailSent){
        return next(new errorClass("failed to send email",400))
    };


    // Update the user's data using findOneAndUpdate
    const updatedUser = await userModel.findOneAndUpdate(
        { _id: userId },
        updateData,
        { new: true }
    );
    // Check if the user was not found
    if (!updatedUser) {
        return next(new errorClass('User not found', 404));
    }

    res.status(200).json({msg: 'success update',UpdatedData: {user: updatedUser}});
   
}

/**
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @returns {object} => return response { message }
 * @description   => delete Data of user
 */

export const deleteAccount = async(req, res, next) =>{

    // Ensure only the owner of the account can delete their data
    const userId = req.authUser._id;
    const user = await userModel.findById(userId);

     //check if user not found
     if(!user){
        return next (new errorClass("User not found",404));
    }

    // Update the user's data using findOneAndUpdate
    const deletedUser = await userModel.findOneAndDelete(
        { _id: userId });

    // Check if the user was not found
    if (!deletedUser) {
        return next(new errorClass('User not found', 404));
    }

    res.status(200).json({msg: 'success delete'});
   
}



export const getuserAccount = async(req, res, next) =>{

    // Ensure only the owner of the account can delete their data
    const userId = req.authUser._id;
    const user = await userModel.findById(userId);
    
     //check if user not found
     if(!user){
        return next (new errorClass("User not found",404));
    }

    res.status(200).json({msg: 'sucess', userData: user});
   
}


export const getAntherUserProfile = async(req, res, next) =>{
    
    const {id} = req.params

    // get the user profile
    const user = await userModel.findById(id);
    
     //check if user not found
     if(!user){
        return next (new errorClass("User not found",404));
    }

    res.status(200).json({msg: 'sucess',
        userData: {
            userName: user.userName, 
            userId: user._id,
            email: user.email,
            BOD : user.BOD,
            status : user.status,
            role : user.role
        }});
}

export const updatePassword = async(req, res, next) =>{
    const { password } = req.body;

    // Ensure only the owner of the account can update their data
    const userId = req.authUser._id;

    const user = await userModel.findById(userId);
     //check if user not found
     if(!user){
        return next (new errorClass("User not found",404));
    }
    // hash password
    const hashedPassword = bcrypt.hashSync(user.password, 8);
    // Update the user's data using findOneAndUpdate
    const updatedUser = await userModel.findOneAndUpdate(
        { _id: userId },
        {password : hashedPassword},
        { new: true }
    );
    res.status(200).json({msg: 'password updated successfully'});
}


export const forgetPassword = async(req, res, next) =>{
    const { email, otp, newPassword } = req.body;
    if (!otp && !newPassword) {
        // generate secure otp password 
        const otp = crypto.randomBytes(3).toString('hex');
         // send email with confirmation link
        const isEmailSent =   await sendEmail(
            email ,
            "password code",
            `<p>Your OTP code is: <b>${otp}</b></p>`);
            
            // check if email not sent
            if(!isEmailSent){
                return next(new errorClass("failed to send otp email",400))
            };
            return res.status(200).json({ msg: 'OTP sent' });
    }
    // hash password
    const hashedPassword = bcrypt.hashSync(newPassword, 8);

    // update password with new password
    const updateNewPassword = await userModel.updateOne({email}, {password : hashedPassword});

    if(!updateNewPassword.modifiedCount){
        return next(new errorClass("User not found or password already set to the same value",400))
    }
    return res.status(200).json({ msg: 'newPassword set successful' });
}


export const getAssociatedAcounts = async(req, res, next) =>{
    const {recoveryEmail} = req.body
    
    // find all user 
    const users = await userModel.find({ recoveryEmail });
    if (!users.length) {
        return next (new errorClass("No accounts found with the specified recovery email",404));
    }

    return res.status(200).json({msg : "accounts found", users})
}
