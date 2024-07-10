import { Schema , model } from "mongoose";


const companySchema = new Schema({
    companyName :{
        type : String,
        required : true,
        unique : true
    },
    description : String,
    industry : String,
    address:{
        type : String,
        required : true
    },
    numberOfEmployees : {
        type : Number,
        required : true,
        min : 11,
        max : 20
    },
    companyEmail :{
        type : String,
        required : true,
        unique : true
    },
    companyHR : {
        type: Schema.Types.ObjectId,
        required : true,
        ref : "user"
    }
})


const companyModel = model("company", companySchema)

export default companyModel;