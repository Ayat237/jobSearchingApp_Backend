import jobModel from "../../../DB/models/job.model.js";

/**
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @returns {object} => return response { message , newJob }
 * @description   => create new job
 */
export const addJob = async (req, res, next) =>{
    const {jobTitle , jobLocation ,workingTime ,
        seniorityLevel, jobDescription,technicalSkills,softSkills} = req.body

    const { _id : addedBy } = req.authUser

    const HR = await jobModel.find({addedBy})
    if(!HR){
        return next(new errorClass("No HR found to create a job",409));
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
        addedBy});
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
    //update job
    const updateJob = await jobModel.findOneAndDelete({jobId});
    return res.status(201).json({ msg: "Job deleted successfully", updateJob });
}
