import { Router } from "express";
import * as JC from "./job.controller.js";
import * as VS from "./job.schemaValidation.js";
import { errorHandler } from "../../middleware/error-handling.middleware.js";
import { authenticatation } from "../../middleware/authentication.middleware.js";
import { autherization } from "../../middleware/autherization.middleware.js";
import { roles } from "../../../utils/system-roles.utils.js";
import { validation } from "../../middleware/validation.middleware.js";


const router = Router();

router.post("/add",
    errorHandler(authenticatation()),
    autherization(roles.HR_ROLE),
    errorHandler(validation(VS.addCompanyValidSchema)),
    errorHandler(JC.addJob));

router.put("/update/:id",
    errorHandler(authenticatation()),
    autherization(roles.HR_ROLE),
    errorHandler(validation(VS.addCompanyValidSchema)),
    errorHandler(JC.updateJob));

router.delete("/delete/:id",
    errorHandler(authenticatation()),
    autherization(roles.HR_ROLE),
    errorHandler(validation(VS.deleteCompanyValidSchema)),
    errorHandler(JC.deleteJob));

export default router;