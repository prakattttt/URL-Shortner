import mongoose from "mongoose";

const url = process.env.MONGO_URL;

const connectToDb = async () => {
  try {
    await mongoose.connect(url);
    console.log("Connected to the database!");
  } catch (err) {
    throw new Error("Cannot connect to the database!")
  }
};

export default connectToDb;