import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import errorHandler from "./utils/errorHandler.js";

const app = express();

let option = {
  origin: process.env.ORIGIN || "*",
  credentials: true,
};

app.use(cors(option));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.json({ limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

import userRouter from "./routes/user.routes.js";
import taskRouter from "./routes/task.routes.js";
import projectRouter from "./routes/project.routes.js";
import progressRouter from "./routes/progress.routes.js";
// route
app.use("/api/v1/users/", userRouter);
app.use("/api/v1/task/", taskRouter);
app.use("/api/v1/project/", projectRouter);
app.use("/api/v1/progress/", progressRouter);

app.use(errorHandler);

export { app };
