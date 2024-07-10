import Joi from "joi"
import { generalRules, objectIdValidation } from "../../../utils/general-rules.utils.js"
import { systemJobLocations } from "../../../utils/system-locations.utils.js"

export const addCompanyValidSchema = {
    body : Joi.object({
        jobTitle : Joi.string().min(4).max(60).required(), 
        jobLocation : Joi.string()
        .valid(
            systemJobLocations.ONSITE,
            systemJobLocations.REMOTLY,
            systemJobLocations.HYBIRD)
        .required(),
        workingTime : Joi.string()
        .valid(
            'full-time',
            'part-time')
            .required(),
        seniorityLevel : Joi.string()
        .valid(
            'Junior', 
            'Mid-Level', 
            'Senior',
            'Team-Lead',
            'CTO')
            .required(), 
        jobDescription : Joi.string().optional(),
        technicalSkills : Joi.array().required(),
        softSkills : Joi.array().required(),
        company : Joi.string().custom(objectIdValidation) 
    }),
    headers : Joi.object({
        addedby : generalRules.objectId,
        ...generalRules.headers,
    })
}


export const updateCompanyValidSchema = {
    body : Joi.object({
        jobTitle : Joi.string().min(4).max(60).required(), 
        jobLocation : Joi.string()
        .valid(
            systemJobLocations.ONSITE,
            systemJobLocations.REMOTLY,
            systemJobLocations.HYBIRD)
        .required(),
        workingTime : Joi.string()
        .valid(
            'full-time',
            'part-time')
            .required(),
        seniorityLevel : Joi.string()
        .valid(
            'Junior', 
            'Mid-Level', 
            'Senior',
            'Team-Lead',
            'CTO')
            .required(), 
        jobDescription : Joi.string().optional(),
        technicalSkills : Joi.array().required(),
        softSkills : Joi.array().required(),
    }),
    headers : Joi.object({
        ...generalRules.headers,
    }),
    params : Joi.object({
        id : Joi.string().custom(objectIdValidation)
    })
}


export const deleteCompanyValidSchema = {
    headers : Joi.object({
        ...generalRules.headers,
    }),
    params : Joi.object({
        id : Joi.string().custom(objectIdValidation)
    })
}


export const getAllJobWithCompanyValidSchema = {
    params : Joi.object({
        companyName: Joi.string().alphanum().min(3).max(50).required(),
    })
}


export const filterJobsValidSchema = {
    params : Joi.object({
        jobTitle : Joi.string().min(4).max(60).optional(), 
        jobLocation : Joi.string()
        .valid(
            systemJobLocations.ONSITE,
            systemJobLocations.REMOTLY,
            systemJobLocations.HYBIRD)
        .optional(),
        workingTime : Joi.string()
        .valid(
            'full-time',
            'part-time')
            .optional(),
        seniorityLevel : Joi.string()
        .valid(
            'Junior', 
            'Mid-Level', 
            'Senior',
            'Team-Lead',
            'CTO')
            .optional(), 
        technicalSkills : Joi.array().optional(),
    })
}


export const applyJobValidSchema = {
    body : Joi.object({
        userTechSkills :Joi.array().required(),
        userSoftSkills :Joi.array().required()
    }),
    headers : Joi.object({
        ...generalRules.headers,
    }),
    params : Joi.object({
        jobId : Joi.string().custom(objectIdValidation)
    })
}
