import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    company:{
        type:String,
        required:true
    },position:{
        type:String,
        required:true,
    },location:{
        type:String,
        required:true,
    },status:{
        type:String,
        enum:["Applied","Interview","Offer","Rejected"],
        required:true,
    },applicationDate:{
        type:Date,
        required:true,
    },jobUrl:{
        type:String,
        required:true,
    },notes:{
        type:String,
    },user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    }
});

const Job = mongoose.model("Job",jobSchema);

export default Job