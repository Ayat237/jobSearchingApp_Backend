import mongoose from "mongoose";

const connectionDB = async () => {
    // Connect to MongoDB database
    return mongoose.connect("mongodb://127.0.0.1:27017/jobSearchApp").then(()=>{
        console.log("DB connected successfully");
    }).catch((err) => {
        console.log({msg :"DB connection failed",err});
    })
}

export default connectionDB;