import { Schema , model } from "mongoose";

const applicationSchema = new Schema({
    jobId : {
        type : Schema.Types.ObjectId,
        ref : 'Job'
    },
    userId :{
        type : Schema.Types.ObjectId,
        ref : 'User'
    },
    userTechSkills :{
        type : [String],
        required : true
    },
    userSoftSkills :{
        type : [String],
        required : true
    }
})



const applicationModel = model("application", applicationSchema)

export default applicationModel;