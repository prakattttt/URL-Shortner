import mongoose from "mongoose";
import AppError from "../utils/appError";

export const connectToDb = async () => {
    try {
        await mongoose.connect();
    } catch (err) {
        throw new AppError("Unable to connect to the database!", 404);
    }
}