import "dotenv/config";
import express from "express";
import morgan from "morgan";
import { dbConnect } from "./src/config/db.js";
import authRoutes from "./src/routes/auth.routes.js";

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan(`dev`));

app.use("/api/auth", authRoutes);

await dbConnect();

app.listen(PORT, () => console.log(`servidor en linea puerto: ${PORT} ✔`));
