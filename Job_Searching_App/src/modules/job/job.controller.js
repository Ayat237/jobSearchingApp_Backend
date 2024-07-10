import applicationModel from "../../../DB/models/application.model.js";
import companyModel from "../../../DB/models/company.model.js";
import jobModel from "../../../DB/models/job.model.js";
import { errorClass } from "../../../utils/error-class.utils.js";

/**
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @returns {object} => return response { message , newJob }
 * @description   => create new job
 */
export const addJob = async (req, res, next) =>{
    const {jobTitle , jobLocation ,workingTime ,
        seniorityLevel, jobDescription,technicalSkills,softSkills,company} = req.body

    const { _id : addedBy } = req.authUser
    const HR = await jobModel.find({addedBy})
    if(!HR){
        return next(new errorClass("No HR found to create a job",409));
    }

    const companyName =  await jobModel.find({company})
    if(!companyName){
        return next(new errorClass("No company found to create a job",409));
    }
    // create new job
    const newJob = await jobModel.create({
        jobTitle , 
        jobLocation ,
        workingTime ,
        seniorityLevel, 
        jobDescription,
        technicalSkills,
        softSkills,
        addedBy,
        company});
    return res.status(201).json({ msg: "Job created successfully", newJob });
}


export const updateJob = async (req, res, next) =>{
    const {jobTitle , jobLocation ,workingTime ,
        seniorityLevel, jobDescription,technicalSkills,softSkills} = req.body

    const { jobId } = req.params;

    const { _id : addedBy } = req.authUser
    const HR = await jobModel.find({addedBy})
    if(!HR){
        return next(new errorClass("No HR found to create a job",409));
    }
    //update job
    const updateJob = await jobModel.findOneAndUpdate(
        {jobId},
        {jobTitle , 
        jobLocation ,
        workingTime ,
        seniorityLevel, 
        jobDescription,
        technicalSkills,
        softSkills},
        {new : true});
        
    return res.status(201).json({ msg: "Job updated successfully", updateJob });
}


export const deleteJob = async (req, res, next) =>{
    
    const { _id :jobId } = req.params;

    const { _id : addedBy } = req.authUser

    const HR = await jobModel.find({addedBy})
    if(!HR){
        return next(new errorClass("No HR found to create a job",409));
    }
    //delete job
    const deleteJob = await jobModel.findOneAndDelete({jobId});

    if(!deleteJob){
        return next(new errorClass("job already not found to delete",409))
    }
    return res.status(201).json({ msg: "Job deleted successfully", deleteJob });
}

export const  getAllJobsWithCompanies = async (req, res, next) =>{

    const jobs = await jobModel.find().populate('company', 'companyName');

    return res.status(200).json({ jobs });
}

export const  getAllJobWithCompany = async (req, res, next) =>{
    const { companyName } = req.params;
    // Find the company to ensure it exists
    const company = await companyModel.findOne({companyName});
    if (!company) {
        return next(new errorClass("Company not found", 404));
    }

    // Fetch all jobs for the specified company
    const jobs = await jobModel.find({ addedBy : company.companyHR });

    // If no jobs found, return an appropriate response
    if (!jobs || !jobs.length) {
        return res.status(404).json({ message: "No jobs found for the specified company" });
    }

    // Return the jobs associated with the company
    return res.status(200).json({ jobs });
}


export const filterJobs = async (req, res, next) =>{

    const { workingTime, jobLocation, seniorityLevel, jobTitle, technicalSkills } = req.query;

    let filterQuery = {}

    if (workingTime) {
        filterQuery.workingTime = workingTime;
    }
    if (jobLocation) {
        filterQuery.jobLocation = jobLocation;
    }
    if (seniorityLevel) {
        filterQuery.seniorityLevel = seniorityLevel;
    }
    // search on job title, ignore Case-sensitive  in search
    if (jobTitle) {
        filterQuery.jobTitle = { $regex: jobTitle, $options: 'i' }; 
    }
    // split technical skills with comma-separated list
    if (technicalSkills) {
        filterQuery.technicalSkills = { $in: technicalSkills.split(',') };  
    }

    // Find jobs matching jobs with  filterQuery list
    const jobs = await jobModel.find(filterQuery);


    // If no jobs found, return an appropriate response
    if (!jobs || !jobs.length) {
        return next(new errorClass("No jobs found matching the specified categories",409));
    }

    // Return the filtered jobs
    return res.status(200).json({ jobs });
}


export const applyJob = async(req, res, next) => {
    const { userTechSkills, userSoftSkills } = req.body;
    const { jobId } = req.params;
    const { _id: userId } = req.authUser;

    // Check if the application already exists
    const existingApplication = await applicationModel.findOne({jobId,userId });
    if (existingApplication) {
        return next(new errorClass('Application already exists', 409));
    }

    // Create a new application
    const newApplication = await applicationModel.create({
        userId,
        jobId,
        userTechSkills,
        userSoftSkills
    });
    return res.status(201).json({ msg: 'Application submitted successfully', newApplication });
}