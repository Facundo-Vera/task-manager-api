import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import { dbConnect } from "./config/db.js";
import taskRoutes from "./routes/task.routes.js";

const app = express();
const PORT = process.env.PORT;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan(`dev`));
app.use(cookieParser());

app.use("/api/tasks/", taskRoutes);

await dbConnect();

app.listen(PORT, () => console.log(`servidor en linea puerto: ${PORT} ✔`));
