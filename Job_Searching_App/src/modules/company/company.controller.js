import applicationModel from "../../../DB/models/application.model.js";
import companyModel from "../../../DB/models/company.model.js";
import jobModel from "../../../DB/models/job.model.js";
import userModel from "../../../DB/models/user.model.js";
import { errorClass } from "../../../utils/error-class.utils.js";


/**
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @returns {object} => return response { message , newCompany }
 * @description   => create new company
 */
export const CreateCompany = async (req, res, next) =>{
    const {companyName , description ,industry ,
        address, numberOfEmployees,companyEmail} = req.body

    const { _id : companyHR } = req.authUser

     // check if the email is already exists
    const isCompanyExists = await companyModel.findOne({ companyName });
    if(isCompanyExists){
        return next(new errorClass("company is already exists",409));
    }

    const HR = await companyModel.find({companyHR})
    if(!HR){
        return next(new errorClass("No HR found to create a company",409));
    }
    // create new company
    const newCompany = await companyModel.create({
        companyName ,
        description ,
        industry ,
        address,
        numberOfEmployees,
        companyEmail ,
        companyHR});
    return res.status(201).json({ msg: "company created successfully", newCompany });
}

export const updateCompany = async (req, res, next) =>{
    const {companyName , description ,industry ,
        address, numberOfEmployees,companyEmail} = req.body

     // check if the email is already exists
    const isCompanyExists = await companyModel.findOne({ companyName });
    if(!isCompanyExists){
        return next(new errorClass("company is not exists",409));
    }

    // Ensure the authenticated user is the owner of the company
    if (!company.companyHR.equals(req.authUser._id)) {
        return next(new errorClass("Not allowed to update this company data", 403));
    }
    // update the company details
    const updatedCompany = await companyModel.findByIdAndUpdate(isCompanyExists.id, 
        {
            description,
            industry,
            address,
            numberOfEmployees,
            companyEmail },
        {new : true})
    return res.status(201).json({ msg: "company updated successfully", updatedCompany });
}

export const deleteCompany = async (req, res, next) =>{
    const {companyName } = req.body
     // check if the email is already exists
    const isCompanyExists = await companyModel.findOne({ companyName});
    if(!isCompanyExists){
        return next(new errorClass("company is not exists",409));
    }

    // Ensure the authenticated user is the owner of the company
    if (!company.companyHR.equals(req.authUser._id)) {
        return next(new errorClass("Not allowed to delete this company data", 403));
    }

    const newCompany = await companyModel.findByIdAndDelete(isCompanyExists.id)
    return res.status(201).json({ msg: "company deleted successfully", newCompany });
}

export const getCompanyData = async (req, res, next) =>{
    const { id } = req.params;
    // Find the company by companyId
    const company = await companyModel.findById(id);
    if (!company) {
        return next(new errorClass("Company not found", 404));
    }
    // Ensure the authenticated user is the owner of the company
    if (!company.companyHR.equals(req.authUser._id)) {
        return next(new errorClass("Not allowed to get this company data", 403));
    }
    // Find all jobs related to this company
    const jobs = await jobModel.find({ addedBy : req.authUser._id });

    // Return the company data and related jobs
    return res.status(200).json({ company, jobs });
}


export const searchCompany = async (req, res, next) =>{
    const { companyName } = req.body;

    // Find the company by companyId
    const company = await companyModel.findOne({companyName});
    if (!company) {
        return next(new errorClass("Company not found", 404));
    }

    // Search for companies with a name 
    const companies = await companyModel.find({ companyName: { $regex: companyName} });

    return res.status(200).json({ companies });
}

export const  getApplicationsForJob = async(req, res, next)=>{
    const {jobId } = req.params;

    // Find the job and ensure it belongs to the company owner
    const job = await jobModel.findById(jobId);
    // check if job not found
    if (!job) {
        return next(new errorClass("Job not found", 404));
    }

    // Ensure the authenticated user is the HR who added the job
    if (!job.addedBy.equals(req.authUser._id)) {
        return next(new errorClass("You are not authorized to view applications for this job", 403));
    }

   // Find all applications for the specified job and populate user data
   const applications = await applicationModel.find({ jobId }).populate('user');

    // Return the applications with user data
    return res.status(200).json({ applications });
}

