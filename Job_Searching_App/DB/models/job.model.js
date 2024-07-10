import { Schema , model } from "mongoose";
import { jobLocation, systemJobLocations } from "../../utils/system-locations.utils.js";

const jobSchema = new Schema({
    jobTitle :{
        type : String,
        required : true,
        trim : true
    },
    jobLocation : {
        type : String,
        required : true,
        enum : Object.values(systemJobLocations)
    },
    workingTime  :{
        type : String,
        required : true,
        enum : ['full-time', 'part-time']
    },
    seniorityLevel :{
        type : String,
        required : true,
        enum : ['Junior', 'Mid-Level', 'Senior','Team-Lead','CTO']
    },
    jobDescription :String,
    technicalSkills :{
        type : [String],
        required : true
    },
    softSkills :{
        type : [String],
        required : true
    },
    addedBy:{
        type : Schema.Types.ObjectId,
        required: true,
        ref : 'user'
    }
})

const jobModel = model("Job",jobSchema);

export default jobModel;