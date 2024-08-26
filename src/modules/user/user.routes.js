import { Router } from "express";
import * as UC from "./user.controlller.js";
import { errorHandler } from "../../middleware/error-handling.middleware.js";
import { validation } from "../../middleware/validation.middleware.js";
import * as VS from "./user.schemaValidation.js";
import { authenticatation } from "../../middleware/authentication.middleware.js";

const router = Router();

router.post("/signUp",
    errorHandler(validation(VS.signUpValidationSchema)),
    errorHandler(UC.signUp));

router.post("/login",
    errorHandler(validation(VS.loginValidationSchema)),
    errorHandler(UC.Login));

router.put('/update',
    errorHandler(authenticatation()),
    errorHandler(validation(VS.updateValidationSchema)),
    errorHandler(UC.updateAccount));

router.delete('/delete',
    errorHandler(authenticatation()),
    errorHandler(validation(VS.deleteValidationSchema)),
    errorHandler(UC.deleteAccount));

router.get('/',
    errorHandler(authenticatation()),
    errorHandler(validation(VS.getValidationSchema)),
    errorHandler(UC.getuserAccount));

router.get('/:id',
    errorHandler(authenticatation()),
    errorHandler(validation(VS.getValidationSchema)),
    errorHandler(UC.getAntherUserProfile));

router.patch('/updatePass',
    errorHandler(authenticatation()),
    errorHandler(validation(VS.updatePassValidationSchema)),
    errorHandler(UC.updatePassword));

router.patch('/forgetPass',
    errorHandler(authenticatation()),
    errorHandler(validation(VS.forgetPassValidationSchema)),
    errorHandler(UC.forgetPassword)); 

router.post('/account',
    errorHandler(authenticatation()),
    errorHandler(validation(VS.asscAccountValidationSchema)),
    errorHandler(UC.getAssociatedAcounts));

router.get('/confirmEmail/:token',errorHandler(UC.confirmEmail));


export default router;