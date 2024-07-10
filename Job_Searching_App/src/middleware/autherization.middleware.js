import { errorClass } from "../../utils/error-class.utils.js";

export const autherization = (allowedRules) => {
    return  (req, res, next) => {
        // whose logged in user
        const auth = req.authUser; 

        // if the user is not authenticated
        if(!allowedRules.includes(auth.role)){
            return next (new errorClass(
                "Autherzation Error" ,
                401,
                "you are not allowed to acces to this role"))
        }
        next();
    }
}