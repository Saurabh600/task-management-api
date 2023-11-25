import "dotenv/config";

import express from "express";
import cors from "cors";
import taskRouter from "./routes/task";
import userRouter from "./routes/user";
import { connectToDb } from "./db/config";

// app initialization
const app = express();
const port = process.env.PORT || 8000;

// middlewares
app.use(cors());
app.use(express.json());

// connection to MongoDB
connectToDb();

// setting routes
app.use("/api/task", taskRouter);
app.use("/api/user", userRouter);

// starting server
app.listen(port, () => {
  console.log(`server is listening at http://localhost:${port}/`);
});
