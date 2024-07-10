import mongoose from "mongoose";

const connectionDB = async () => {
    // Connect to MongoDB database
    return mongoose.connect(process.env.CONNECTION_DB_URI).then(()=>{
        console.log("DB connected successfully");
    }).catch((err) => {
        console.log({msg :"DB connection failed",err});
    })
}

export default connectionDB;