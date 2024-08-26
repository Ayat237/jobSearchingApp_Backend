import Joi from "joi"
import { generalRules } from "../../../utils/general-rules.utils.js"

export const addCompanyValidSchema = {
    body : Joi.object({
        companyName: Joi.string().alphanum().min(3).max(50).required(),
        description:Joi.string(),
        industry :Joi.string(),
        address : Joi.string().required(),
        numberOfEmployees: Joi.number().min(11).max(20).required(),
        companyEmail : Joi.string().email({
            tlds:{ allow: ["com","org","net"]},
            minDomainSegments: 2,
            maxDomainSegments: 4}).required(),
    }),
    headers : Joi.object({
        companyhr : generalRules.objectId,
        ...generalRules.headers,
    })
}


export const deleteCompanyValidSchema = {
    body : Joi.object({
        companyName: Joi.string().alphanum().min(3).max(50).required(),
    }),
    headers : Joi.object({
        companyhr : generalRules.objectId,
        ...generalRules.headers,
    })
}

export const getCompanyValidSchema = {
    headers : Joi.object({
        companyhr : generalRules.objectId,
        ...generalRules.headers,
    })
}

export const searchCompanyValidSchema = {
    body : Joi.object({
        companyName: Joi.string().alphanum().min(3).max(50).required(),
    }),
    headers : Joi.object({
        ...generalRules.headers,
    })
}

