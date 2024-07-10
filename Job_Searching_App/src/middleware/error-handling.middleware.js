import { errorClass } from "../../utils/error-class.utils.js"


/**
 * @param {function} API => API function
 * @returns  {Function} => Middleware function
 * @description => Middleware to handle API requests error messages
*/
export const errorHandler =(API) => {
    return (req, res, next) => {
        API(req, res, next).catch((err) => {
            next(new errorClass("Internal Server error", 500,err.message));
        })
    }
}  


/**
 * @param {object} err
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @returns  {object} => error response
 * @description => Middleware to handle golobal error responses
*/
export const golbalResponse = (err,req, res, next) => {
    return res.status(err.status || 500).
    json({msg : "[Error] Fail Response" ,
          errMsg : err.message,
          errData : err.data,
          errLocation : err.location
     })
}