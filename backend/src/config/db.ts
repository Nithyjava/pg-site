import mongoose from "mongoose";
import envFile from "./envFile.js";

const dbConnection = async () =>{

    try {
        await mongoose.connect(envFile.mongoURI);
        console.log("Database connected successfully");
    }catch (error) {
        console.error("Database connection failed:", error);
        process.exit(1);
    }
};

export default dbConnection;