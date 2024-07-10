import { Router } from "express";
import * as CC from "./company.controller.js";
import * as VS from "./company.schemaValidation.js"
import { authenticatation } from "../../middleware/authentication.middleware.js";
import { errorHandler } from "../../middleware/error-handling.middleware.js";
import { autherization } from "../../middleware/autherization.middleware.js";
import { roles } from "../../../utils/system-roles.utils.js";
import { validation } from "../../middleware/validation.middleware.js";


const router = Router();

router.post("/add",
    errorHandler(authenticatation()),
    autherization(roles.HR_ROLE),
    errorHandler(validation(VS.addCompanyValidSchema)),
    errorHandler(CC.CreateCompany),
);

router.put("/update",
    errorHandler(authenticatation()),
    autherization(roles.HR_ROLE),
    errorHandler(validation(VS.addCompanyValidSchema)),
    errorHandler(CC.updateCompany),
);

router.delete("/delete",
    errorHandler(authenticatation()),
    autherization(roles.HR_ROLE),
    errorHandler(validation(VS.deleteCompanyValidSchema)),
    errorHandler(CC.deleteCompany),
);

router.get("/:id",
    errorHandler(authenticatation()),
    autherization(roles.HR_ROLE),
    errorHandler(validation(VS.getCompanyValidSchema)),
    errorHandler(CC.getCompanyData),
);

router.get("/",
    errorHandler(authenticatation()),
    autherization(roles.USER_HR_ROLE),
    errorHandler(validation(VS.searchCompanyValidSchema)),
    errorHandler(CC.searchCompany),
);

router.get("/app/:jobId",
    errorHandler(authenticatation()),
    autherization(roles.HR_ROLE),
    errorHandler(validation(VS.getCompanyValidSchema)),
    errorHandler(CC.getApplicationsForJob),
);

export default router;