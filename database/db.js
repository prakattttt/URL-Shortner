import mongoose from "mongoose";
import AppError from "../utils/appError.js";

const url = "mongodb://localhost:27017/database_";

export const connectToDb = async () => {
    try {
        await mongoose.connect(url);
    } catch (err) {
        throw new AppError("Unable to connect to the database!", 404);
    }
}