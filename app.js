import express from "express";
import mainRoute from "./routes/urlRoute.js";
import adminRoute from "./routes/adminRoute.js";
import { errorHandler, defaultError } from "./middlewares/errorHandler.js";
import { connectToDb } from "./database/db.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

await connectToDb();

app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static("public"));

app.set("view engine", "ejs");
app.set("views", "./views");

app.use("/url", mainRoute);
app.use("/admin", adminRoute);

app.use(defaultError);
app.use(errorHandler);

app.listen(5000, () => {
    console.log("Server has started on port 5000!");
})