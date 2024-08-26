import { Schema , model } from "mongoose";
import { systemRoles } from "../../utils/system-roles.utils.js";
import { systemStatus } from "../../utils/system-status.utils.js";


const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 3,
        trim : true
    },
    lastName: {
        type: String,
        required: true
    },
    userName : {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true,
        unique: true
    },
    password : {
        type: String,
        required: true
    },
    recoveryEmail:{
        type: String,
        required: true
    },
    DOB :
    {
        type : String,
        required : true
    },
    mobileNumber : {
        type: Number,
        required: true,
        unique: true,
        min : 11
    },
    role : {
        type: String,
        enum: Object.values(systemRoles),
        default: "user"
    },
    status : {
        type: String,
        enum:  Object.values(systemStatus),
        default: "offline"
    },
    confirmed : {
        type: Boolean,
        default: false
    }
},{
    timestamps: true ,
    versionKey: false
})

const userModel = model("User",userSchema);

export default userModel;