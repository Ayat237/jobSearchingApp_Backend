import Joi from "joi";
import { systemRoles } from "../../../utils/system-roles.utils.js";
import { systemStatus } from "../../../utils/system-status.utils.js";
import { generalRules } from "../../../utils/general-rules.utils.js";

export const signUpValidationSchema = {
    body : Joi.object({
        firstName: Joi.string().alphanum().min(3).max(30).required(),
        lastName : Joi.string().alphanum().min(3).max(30).required(),
        userName : generalRules.userName,
        email : generalRules.email,
        password : generalRules.password,
        recoveryEmail: Joi.string()
        .required(),
        DOB : Joi.string().required()
        .pattern(
            /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/),
        mobileNumber : Joi.number()
        .min(11).required(),
        role : Joi.string()
        .valid(systemRoles.USER,systemRoles.HR),
        status: Joi.string()
        .valid(systemStatus.ONLINE,systemStatus.OFFLINE)
    })
}



export const loginValidationSchema = {
    body : Joi.object({
        email : Joi.string().email({
            tlds:{ allow: ["com"]},
            minDomainSegments: 2,
            maxDomainSegments: 4,}).optional(),
        recoveryEmail : Joi.string().optional(),
        mobileNumber : Joi.number().min(11).optional(),
        password : generalRules.password
    }),
    headers : Joi.object({
        ...generalRules.headers,
    })
}


export const updateValidationSchema = {
    body : Joi.object({
        firstName: Joi.string().alphanum().min(3).max(30).required(),
        lastName : Joi.string().alphanum().min(3).max(30).required(),
        email : generalRules.email,
        recoveryEmail: Joi.string()
        .required(),
        DOB : Joi.string().required()
        .pattern(
            /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/),
        mobileNumber : Joi.number()
        .min(11).required(),
    }),
    headers : Joi.object({
        ...generalRules.headers,
    })
}


export const deleteValidationSchema = {
    headers : Joi.object({
        ...generalRules.headers
    })
}


export const getValidationSchema = {
    headers : Joi.object({
        ...generalRules.headers
    })
}



export const updatePassValidationSchema = {
    body : Joi.object({
        password : generalRules.password
    }),
    headers : Joi.object({
        ...generalRules.headers,
    })
}

export const asscAccountValidationSchema = {
    body : Joi.object({
        recoveryEmail: Joi.string()
        .required(),
    }),
    headers : Joi.object({
        ...generalRules.headers,
    })
}

export const forgetPassValidationSchema = {
    body : Joi.object({
        email : generalRules.email,
        newPassword : Joi.string()
        .pattern(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$!%*?&])[A-Za-z\d$!%*?&]{8,}$/
        ).optional(),
        otp : Joi.string().optional()
    }),
    headers : Joi.object({
        ...generalRules.headers,
    })
}