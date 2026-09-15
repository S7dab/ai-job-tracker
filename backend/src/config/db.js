import mongoose from "mongoose";

const connectDB = async () => {
    try {
       const db = await mongoose.connect(process.env.ATLAS_URL);

        // console.log(`MongoDB connected successfully on ${db.connection._connectionString}`);
        console.log(`MongoDB connected successfully `);
        // console.log(db.connection._connectionString)
    } catch (error) {
        console.log("MongoDB connection failed");
    }
}


export default connectDB ;