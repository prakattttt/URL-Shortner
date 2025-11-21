import express from "express";
import mainRoute from "./routes/urlRoute.js";
import adminRoute from "./routes/adminRoute.js";
import { notFoundHandler, globalErrorHandler } from "./middlewares/errorHandler.js";
import connectToDb from "./database/db.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import session from "express-session";
import flash from "connect-flash";
import path from "path";

dotenv.config();

const app = express();

await connectToDb();

app.use(cookieParser());

app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, 
      sameSite: "strict",
    },
  })
);

app.use(flash());

app.use((req, res, next) => {
  res.locals.flashErrors = req.flash("errors") || [];
  res.locals.flashSuccess = req.flash("success") || [];
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static("public"));

app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "views"));

app.use("/url", mainRoute);
app.use("/admin", adminRoute);

app.use(notFoundHandler);

app.use(globalErrorHandler);

app.listen(5000, () => {
  console.log("Server has started on port 5000!");
});
