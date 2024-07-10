const dataMethods = ["body", "query", "params", "headers"]

/**
 * @param {object} schema => Joi schema object
 * @returns  {Function} => Middleware function
 * @description => Middlewareto validate the request data according to the schema
*/

export const validation = (schema)=>{
    return async(req, res, next)=>{
        let validationErrors = []
        dataMethods.forEach((key) =>{
            if(schema[key]){
                // data returnd from schema
                const result = schema[key].validate(req[key],{abortEarly : false})
                //console.log(result)
                if(result?.error){
                    validationErrors.push(result.error.details)
                }
            }
        })
        if(validationErrors.length){
            return res.status(400).json({errorMsg :"validation Error",error : validationErrors})
        }
        next();
    }
}